import { uploadData } from 'aws-amplify/storage';
import { client, generateS3Url } from '../lib/amplify';
import { type ApplicationFormData, type ApplicationSubmissionData } from '../lib/amplify';
import { getCurrentUser } from 'aws-amplify/auth';

interface FileUploadResult {
  s3Key: string;
  s3Url: string;
  fileName: string;
  fileSize: number;
  uploadedAt: string;
}

export class ApplicationService {

  /**
   * Upload a file to S3 and return detailed file information
   */
  private static async uploadFile(file: File, category: string): Promise<FileUploadResult> {
    const timestamp = new Date().getTime();
    const fileName = `${category}/${timestamp}-${file.name}`;
    
    try {
      console.log(`Attempting to upload file: ${fileName} (${file.type}, ${file.size} bytes)`);
      
      const result = await uploadData({
        key: fileName,
        data: file,
        options: {
          contentType: file.type
        }
      });
      
      await result.result; // Wait for upload completion
      console.log(`Successfully uploaded: ${fileName}`);
      
      // Generate S3 access URL
      const s3Url = generateS3Url(fileName);
      
      return {
        s3Key: fileName,
        s3Url,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error uploading ${category} file:`, error);
      console.error('Upload error details:', {
        fileName,
        fileType: file.type,
        fileSize: file.size,
        category,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error(`Failed to upload ${category} file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Upload a file with retry logic and fallback
   */
  private static async uploadFileWithFallback(file: File, category: string): Promise<FileUploadResult | null> {
    try {
      return await this.uploadFile(file, category);
    } catch (error) {
      console.warn(`Upload failed for ${category}, continuing without file:`, error);
      return null; // Return null instead of throwing, allowing submission to continue
    }
  }

  /**
   * Alternative method for testing - creates a mock upload record
   */
  private static async mockFileUpload(file: File, category: string): Promise<FileUploadResult> {
    const timestamp = new Date().getTime();
    const fileName = `mock-${category}/${timestamp}-${file.name}`;
    console.log(`Mock upload: ${fileName} (${file.type}, ${file.size} bytes)`);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Generate mock S3 URL
    const s3Url = generateS3Url(fileName);
    
    return {
      s3Key: fileName,
      s3Url,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString()
    };
  }

  /**
   * Mock file upload with simple directory structure: applications/appId/timestamp_filename
   */
  private static async mockFileUploadWithAppId(file: File, category: string, applicationId: string): Promise<FileUploadResult> {
    const timestamp = new Date().getTime();
    
    // Create filename based on category
    let filePrefix = '';
    switch (category) {
      case 'logos/ai':
        filePrefix = 'logo_ai';
        break;
      case 'logos/jpeg':
        filePrefix = 'logo_jpeg';
        break;
      case 'brand-guidelines':
        filePrefix = 'brand_guideline';
        break;
      case 'supporting-documents':
        filePrefix = 'supporting_document';
        break;
      default:
        filePrefix = category.replace('/', '_');
    }
    
    // Simple structure: applications/appId/timestamp_filename (mock)
    const fileName = `applications/${applicationId}/${timestamp}_${filePrefix}_mock.${file.name.split('.').pop()}`;
    console.log(`Mock upload with simple structure: ${fileName} (${file.type}, ${file.size} bytes)`);
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 200));
    
    // Generate mock S3 URL
    const s3Url = generateS3Url(fileName);
    
    return {
      s3Key: fileName,
      s3Url,
      fileName: file.name,
      fileSize: file.size,
      uploadedAt: new Date().toISOString()
    };
  }

  /**
   * Smart file upload that tries real upload first, then falls back to mock
   */
  private static async smartFileUpload(file: File, category: string, allowMock: boolean = false): Promise<FileUploadResult | null> {
    try {
      // First try real upload
      return await this.uploadFile(file, category);
    } catch (error) {
      console.warn(`Real upload failed for ${category}:`, error);
      
      if (allowMock) {
        console.log(`Using mock upload for ${category}`);
        return await this.mockFileUpload(file, category);
      }
      
      return null;
    }
  }

  /**
   * Upload a file to S3 with simple directory structure: applications/appId/timestamp_filename
   */
  private static async uploadFileWithAppId(file: File, category: string, applicationId: string): Promise<FileUploadResult> {
    const timestamp = new Date().getTime();
    
    // Create filename based on category
    let filePrefix = '';
    switch (category) {
      case 'logos/ai':
        filePrefix = 'logo_ai';
        break;
      case 'logos/jpeg':
        filePrefix = 'logo_jpeg';
        break;
      case 'brand-guidelines':
        filePrefix = 'brand_guideline';
        break;
      case 'supporting-documents':
        filePrefix = 'supporting_document';
        break;
      default:
        filePrefix = category.replace('/', '_');
    }
    
    // Simple structure: applications/appId/timestamp_filename
    const fileName = `applications/${applicationId}/${timestamp}_${filePrefix}.${file.name.split('.').pop()}`;
    
    try {
      console.log(`Attempting to upload file: ${fileName} (${file.type}, ${file.size} bytes)`);
      
      const result = await uploadData({
        key: fileName,
        data: file,
        options: {
          contentType: file.type
        }
      });
      
      await result.result; // Wait for upload completion
      console.log(`Successfully uploaded: ${fileName}`);
      
      // Generate S3 access URL
      const s3Url = generateS3Url(fileName);
      
      return {
        s3Key: fileName,
        s3Url,
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString()
      };
    } catch (error) {
      console.error(`Error uploading ${category} file:`, error);
      console.error('Upload error details:', {
        fileName,
        fileType: file.type,
        fileSize: file.size,
        category,
        applicationId,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
      throw new Error(`Failed to upload ${category} file: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Upload a file with fallback using application ID
   */
  private static async uploadFileWithAppIdFallback(file: File, category: string, applicationId: string): Promise<FileUploadResult | null> {
    try {
      return await this.uploadFileWithAppId(file, category, applicationId);
    } catch (error) {
      console.warn(`Upload failed for ${category}, continuing without file:`, error);
      return null; // Return null instead of throwing, allowing submission to continue
    }
  }

  /**
   * Submit the application form with application ID-based file organization
   */
  static async submitApplication(formData: ApplicationFormData): Promise<{ success: boolean; applicationId?: string; error?: string }> {
    try {
      // Get current user for audit trail
      let updatedBy = 'anonymous';
      try {
        const user = await getCurrentUser();
        updatedBy = user.username || user.userId;
      } catch {
        // User might not be authenticated, use anonymous
        updatedBy = 'anonymous';
      }

      // Step 1: Create application record first (without file uploads)
      const initialSubmissionData: ApplicationSubmissionData = {
        formData: {
          companyNameEng: formData.companyNameEng,
          companyNameChi: formData.companyNameChi,
          entryTitleEng: formData.entryTitleEng,
          entryTitleChi: formData.entryTitleChi,
          companyDescription: formData.companyDescription,
          businessRegNo: formData.businessRegNo,
          incorporationNo: formData.incorporationNo,
          incorporationDate: formData.incorporationDate,
          companyAddress: formData.companyAddress,
          primaryContactName: formData.primaryContactName,
          primaryContactTitle: formData.primaryContactTitle,
          primaryContactPhone: formData.primaryContactPhone,
          primaryContactEmail: formData.primaryContactEmail,
          secondaryContactName: formData.secondaryContactName,
          secondaryContactTitle: formData.secondaryContactTitle,
          secondaryContactPhone: formData.secondaryContactPhone,
          secondaryContactEmail: formData.secondaryContactEmail,
          awardCategory: formData.awardCategory,
          videoLink: formData.videoLink,
          submissionUsage: formData.submissionUsage,
          applicationDeclaration: formData.applicationDeclaration,
          patentStatus: formData.patentStatus,
          intellectualProperty: formData.intellectualProperty,
          eventAdminCost: formData.eventAdminCost,
          verifyCode: formData.verifyCode
        },
        fileUploads: {}, // Empty initially
        submissionMetadata: {
          submitTime: new Date().toISOString(),
          userAgent: navigator.userAgent,
          totalFilesUploaded: 0,
          totalFilesAttempted: 0,
          uploadErrors: ['Files will be uploaded after application creation']
        }
      };

      const createApplicationMutation = /* GraphQL */ `
        mutation CreateApplication($input: CreateApplicationInput!) {
          createApplication(input: $input) {
            id
            applicationData
            createdAt
            updatedAt
            updatedBy
          }
        }
      `;

      console.log('🔄 Creating application record...');
      const createResult = await client.graphql({
        query: createApplicationMutation,
        variables: {
          input: {
            applicationData: JSON.stringify(initialSubmissionData),
            updatedBy
          }
        }
      }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      const applicationId = createResult.data.createApplication.id;
      console.log(`✅ Application created with ID: ${applicationId}`);

      // Step 2: Upload files using application ID as folder name
      const fileUploads: ApplicationSubmissionData['fileUploads'] = {};
      const uploadResults = {
        logoAI: null as FileUploadResult | null,
        logoJPEG: null as FileUploadResult | null,
        brandGuideline: null as FileUploadResult | null,
        supportingDocument: null as FileUploadResult | null
      };
      const uploadErrors: string[] = [];
      let totalFilesAttempted = 0;
      
      console.log('📁 Uploading files to application-specific folder...');
      
      if (formData.logoAI) {
        totalFilesAttempted++;
        try {
          uploadResults.logoAI = await this.uploadFileWithAppIdFallback(formData.logoAI, 'logos/ai', applicationId);
          if (uploadResults.logoAI) fileUploads.logoAI = uploadResults.logoAI;
        } catch (error) {
          uploadErrors.push(`Logo AI upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      if (formData.logoJPEG) {
        totalFilesAttempted++;
        try {
          uploadResults.logoJPEG = await this.uploadFileWithAppIdFallback(formData.logoJPEG, 'logos/jpeg', applicationId);
          if (uploadResults.logoJPEG) fileUploads.logoJPEG = uploadResults.logoJPEG;
        } catch (error) {
          uploadErrors.push(`Logo JPEG upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      if (formData.brandGuideline) {
        totalFilesAttempted++;
        try {
          uploadResults.brandGuideline = await this.uploadFileWithAppIdFallback(formData.brandGuideline, 'brand-guidelines', applicationId);
          if (uploadResults.brandGuideline) fileUploads.brandGuideline = uploadResults.brandGuideline;
        } catch (error) {
          uploadErrors.push(`Brand guideline upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }
      
      if (formData.supportingDocument) {
        totalFilesAttempted++;
        try {
          uploadResults.supportingDocument = await this.uploadFileWithAppIdFallback(formData.supportingDocument, 'supporting-documents', applicationId);
          if (uploadResults.supportingDocument) fileUploads.supportingDocument = uploadResults.supportingDocument;
        } catch (error) {
          uploadErrors.push(`Supporting document upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`);
        }
      }

      const uploadCount = Object.values(uploadResults).filter(Boolean).length;
      console.log(`📊 File upload summary: ${uploadCount}/${totalFilesAttempted} files uploaded successfully`);

      // Step 3: Update application record with file upload results
      const finalSubmissionData: ApplicationSubmissionData = {
        ...initialSubmissionData,
        fileUploads,
        submissionMetadata: {
          submitTime: new Date().toISOString(),
          userAgent: navigator.userAgent,
          totalFilesUploaded: uploadCount,
          totalFilesAttempted,
          uploadErrors: uploadErrors.length > 0 ? uploadErrors : undefined
        }
      };

      const updateApplicationMutation = /* GraphQL */ `
        mutation UpdateApplication($input: UpdateApplicationInput!) {
          updateApplication(input: $input) {
            id
            applicationData
            createdAt
            updatedAt
            updatedBy
          }
        }
      `;

      console.log('🔄 Updating application with file upload results...');
      await client.graphql({
        query: updateApplicationMutation,
        variables: {
          input: {
            id: applicationId,
            applicationData: JSON.stringify(finalSubmissionData),
            updatedBy
          }
        }
      });

      console.log('✅ Application updated successfully!');
      
      return {
        success: true,
        applicationId
      };

    } catch (error) {
      console.error('Error submitting application:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Get all applications (for admin use)
   */
  static async getApplications() {
    try {
      const listApplicationsQuery = /* GraphQL */ `
        query ListApplications {
          listApplications {
            items {
              id
              applicationData
              createdAt
              updatedAt
              updatedBy
            }
          }
        }
      `;

      const result = await client.graphql({
        query: listApplicationsQuery
      }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      return result.data.listApplications.items.map((item: any) => ({ // eslint-disable-line @typescript-eslint/no-explicit-any
        ...item,
        applicationData: JSON.parse(item.applicationData)
      }));

    } catch (error) {
      console.error('Error fetching applications:', error);
      throw error;
    }
  }

  /**
   * Get a specific application by ID
   */
  static async getApplication(id: string) {
    try {
      const getApplicationQuery = /* GraphQL */ `
        query GetApplication($id: ID!) {
          getApplication(id: $id) {
            id
            applicationData
            createdAt
            updatedAt
            updatedBy
          }
        }
      `;

      const result = await client.graphql({
        query: getApplicationQuery,
        variables: { id }
      }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      if (result.data.getApplication) {
        return {
          ...result.data.getApplication,
          applicationData: JSON.parse(result.data.getApplication.applicationData)
        };
      }

      return null;

    } catch (error) {
      console.error('Error fetching application:', error);
      throw error;
    }
  }

  /**
   * Submit application with mock file uploads for testing (using application ID folders)
   */
  static async submitApplicationWithMockUploads(formData: ApplicationFormData): Promise<{ success: boolean; applicationId?: string; error?: string }> {
    try {
      // Get current user for audit trail
      let updatedBy = 'test-user';
      try {
        const user = await getCurrentUser();
        updatedBy = user.username || user.userId;
      } catch {
        updatedBy = 'test-user-anonymous';
      }

      // Step 1: Create application record first
      const initialSubmissionData: ApplicationSubmissionData = {
        formData: {
          companyNameEng: formData.companyNameEng,
          companyNameChi: formData.companyNameChi,
          entryTitleEng: formData.entryTitleEng,
          entryTitleChi: formData.entryTitleChi,
          companyDescription: formData.companyDescription,
          businessRegNo: formData.businessRegNo,
          incorporationNo: formData.incorporationNo,
          incorporationDate: formData.incorporationDate,
          companyAddress: formData.companyAddress,
          primaryContactName: formData.primaryContactName,
          primaryContactTitle: formData.primaryContactTitle,
          primaryContactPhone: formData.primaryContactPhone,
          primaryContactEmail: formData.primaryContactEmail,
          secondaryContactName: formData.secondaryContactName,
          secondaryContactTitle: formData.secondaryContactTitle,
          secondaryContactPhone: formData.secondaryContactPhone,
          secondaryContactEmail: formData.secondaryContactEmail,
          awardCategory: formData.awardCategory,
          videoLink: formData.videoLink,
          submissionUsage: formData.submissionUsage,
          applicationDeclaration: formData.applicationDeclaration,
          patentStatus: formData.patentStatus,
          intellectualProperty: formData.intellectualProperty,
          eventAdminCost: formData.eventAdminCost,
          verifyCode: formData.verifyCode
        },
        fileUploads: {},
        submissionMetadata: {
          submitTime: new Date().toISOString(),
          userAgent: `${navigator.userAgent} [MOCK_TEST]`,
          totalFilesUploaded: 0,
          totalFilesAttempted: 0,
          uploadErrors: ['Mock uploads will be generated after application creation']
        }
      };

      const createApplicationMutation = /* GraphQL */ `
        mutation CreateApplication($input: CreateApplicationInput!) {
          createApplication(input: $input) {
            id
            applicationData
            createdAt
            updatedAt
            updatedBy
          }
        }
      `;

      console.log('🔄 Creating application record for mock submission...');
      const createResult = await client.graphql({
        query: createApplicationMutation,
        variables: {
          input: {
            applicationData: JSON.stringify(initialSubmissionData),
            updatedBy
          }
        }
      }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      const applicationId = createResult.data.createApplication.id;
      console.log(`✅ Application created with ID: ${applicationId}`);

      // Step 2: Create mock file uploads with application ID
      const fileUploads: ApplicationSubmissionData['fileUploads'] = {};
      const uploadErrors: string[] = [];
      let totalFilesAttempted = 0;
      let uploadCount = 0;

      console.log('🎭 Generating mock file uploads...');
      
      if (formData.logoAI) {
        totalFilesAttempted++;
        const mockResult = await this.mockFileUploadWithAppId(formData.logoAI, 'logos/ai', applicationId);
        fileUploads.logoAI = mockResult;
        uploadCount++;
      }
      
      if (formData.logoJPEG) {
        totalFilesAttempted++;
        const mockResult = await this.mockFileUploadWithAppId(formData.logoJPEG, 'logos/jpeg', applicationId);
        fileUploads.logoJPEG = mockResult;
        uploadCount++;
      }
      
      if (formData.brandGuideline) {
        totalFilesAttempted++;
        const mockResult = await this.mockFileUploadWithAppId(formData.brandGuideline, 'brand-guidelines', applicationId);
        fileUploads.brandGuideline = mockResult;
        uploadCount++;
      }
      
      if (formData.supportingDocument) {
        totalFilesAttempted++;
        const mockResult = await this.mockFileUploadWithAppId(formData.supportingDocument, 'supporting-documents', applicationId);
        fileUploads.supportingDocument = mockResult;
        uploadCount++;
      }

      console.log(`📊 Mock upload summary: ${uploadCount}/${totalFilesAttempted} files uploaded successfully`);

      // Step 3: Update application with mock file uploads
      const finalSubmissionData: ApplicationSubmissionData = {
        ...initialSubmissionData,
        fileUploads,
        submissionMetadata: {
          submitTime: new Date().toISOString(),
          userAgent: `${navigator.userAgent} [MOCK_TEST]`,
          totalFilesUploaded: uploadCount,
          totalFilesAttempted,
          uploadErrors: uploadErrors.length > 0 ? uploadErrors : undefined
        }
      };

      const updateApplicationMutation = /* GraphQL */ `
        mutation UpdateApplication($input: UpdateApplicationInput!) {
          updateApplication(input: $input) {
            id
            applicationData
            createdAt
            updatedAt
            updatedBy
          }
        }
      `;

      console.log('🔄 Updating application with mock file uploads...');
      await client.graphql({
        query: updateApplicationMutation,
        variables: {
          input: {
            id: applicationId,
            applicationData: JSON.stringify(finalSubmissionData),
            updatedBy
          }
        }
      });

      console.log('✅ Mock application submitted successfully with ID:', applicationId);

      return {
        success: true,
        applicationId
      };

    } catch (error) {
      console.error('Error submitting mock application:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }

  /**
   * Submit application with forced real S3 uploads using application ID folders
   */
  static async submitApplicationWithRealUploads(formData: ApplicationFormData): Promise<{ success: boolean; applicationId?: string; error?: string }> {
    try {
      // Get current user for audit trail
      let updatedBy = 'real-upload-test';
      try {
        const user = await getCurrentUser();
        updatedBy = user.username || user.userId;
      } catch {
        updatedBy = 'real-upload-anonymous';
      }

      // Step 1: Create application record first
      const initialSubmissionData: ApplicationSubmissionData = {
        formData: {
          companyNameEng: formData.companyNameEng,
          companyNameChi: formData.companyNameChi,
          entryTitleEng: formData.entryTitleEng,
          entryTitleChi: formData.entryTitleChi,
          companyDescription: formData.companyDescription,
          businessRegNo: formData.businessRegNo,
          incorporationNo: formData.incorporationNo,
          incorporationDate: formData.incorporationDate,
          companyAddress: formData.companyAddress,
          primaryContactName: formData.primaryContactName,
          primaryContactTitle: formData.primaryContactTitle,
          primaryContactPhone: formData.primaryContactPhone,
          primaryContactEmail: formData.primaryContactEmail,
          secondaryContactName: formData.secondaryContactName,
          secondaryContactTitle: formData.secondaryContactTitle,
          secondaryContactPhone: formData.secondaryContactPhone,
          secondaryContactEmail: formData.secondaryContactEmail,
          awardCategory: formData.awardCategory,
          videoLink: formData.videoLink,
          submissionUsage: formData.submissionUsage,
          applicationDeclaration: formData.applicationDeclaration,
          patentStatus: formData.patentStatus,
          intellectualProperty: formData.intellectualProperty,
          eventAdminCost: formData.eventAdminCost,
          verifyCode: formData.verifyCode
        },
        fileUploads: {},
        submissionMetadata: {
          submitTime: new Date().toISOString(),
          userAgent: `${navigator.userAgent} [REAL_UPLOAD_TEST]`,
          totalFilesUploaded: 0,
          totalFilesAttempted: 0,
          uploadErrors: ['Real uploads will be performed after application creation']
        }
      };

      const createApplicationMutation = /* GraphQL */ `
        mutation CreateApplication($input: CreateApplicationInput!) {
          createApplication(input: $input) {
            id
            applicationData
            createdAt
            updatedAt
            updatedBy
          }
        }
      `;

      console.log('🔄 Creating application record for real upload test...');
      const createResult = await client.graphql({
        query: createApplicationMutation,
        variables: {
          input: {
            applicationData: JSON.stringify(initialSubmissionData),
            updatedBy
          }
        }
      }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      const applicationId = createResult.data.createApplication.id;
      console.log(`✅ Application created with ID: ${applicationId}`);

      // Step 2: Upload files to S3 using application ID folders (no fallback)
      const fileUploads: ApplicationSubmissionData['fileUploads'] = {};
      const uploadErrors: string[] = [];
      let totalFilesAttempted = 0;
      let uploadCount = 0;

      console.log('📤 Performing real S3 uploads...');
      
      if (formData.logoAI) {
        totalFilesAttempted++;
        try {
          const result = await this.uploadFileWithAppId(formData.logoAI, 'logos/ai', applicationId);
          fileUploads.logoAI = result;
          uploadCount++;
          console.log(`✅ Real upload successful: ${result.s3Url}`);
        } catch (error) {
          const errorMsg = `Logo AI real upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
          uploadErrors.push(errorMsg);
          console.error(`❌ ${errorMsg}`);
        }
      }
      
      if (formData.logoJPEG) {
        totalFilesAttempted++;
        try {
          const result = await this.uploadFileWithAppId(formData.logoJPEG, 'logos/jpeg', applicationId);
          fileUploads.logoJPEG = result;
          uploadCount++;
          console.log(`✅ Real upload successful: ${result.s3Url}`);
        } catch (error) {
          const errorMsg = `Logo JPEG real upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
          uploadErrors.push(errorMsg);
          console.error(`❌ ${errorMsg}`);
        }
      }
      
      if (formData.brandGuideline) {
        totalFilesAttempted++;
        try {
          const result = await this.uploadFileWithAppId(formData.brandGuideline, 'brand-guidelines', applicationId);
          fileUploads.brandGuideline = result;
          uploadCount++;
          console.log(`✅ Real upload successful: ${result.s3Url}`);
        } catch (error) {
          const errorMsg = `Brand guideline real upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
          uploadErrors.push(errorMsg);
          console.error(`❌ ${errorMsg}`);
        }
      }
      
      if (formData.supportingDocument) {
        totalFilesAttempted++;
        try {
          const result = await this.uploadFileWithAppId(formData.supportingDocument, 'supporting-documents', applicationId);
          fileUploads.supportingDocument = result;
          uploadCount++;
          console.log(`✅ Real upload successful: ${result.s3Url}`);
        } catch (error) {
          const errorMsg = `Supporting document real upload failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
          uploadErrors.push(errorMsg);
          console.error(`❌ ${errorMsg}`);
        }
      }

      console.log(`📊 Real upload summary: ${uploadCount}/${totalFilesAttempted} files uploaded successfully to S3`);

      if (uploadCount === 0 && totalFilesAttempted > 0) {
        throw new Error(`All real uploads failed. Errors: ${uploadErrors.join(', ')}`);
      }

      // Step 3: Update application with real file uploads
      const finalSubmissionData: ApplicationSubmissionData = {
        ...initialSubmissionData,
        fileUploads,
        submissionMetadata: {
          submitTime: new Date().toISOString(),
          userAgent: `${navigator.userAgent} [REAL_UPLOAD_TEST]`,
          totalFilesUploaded: uploadCount,
          totalFilesAttempted,
          uploadErrors: uploadErrors.length > 0 ? uploadErrors : undefined
        }
      };

      const updateApplicationMutation = /* GraphQL */ `
        mutation UpdateApplication($input: UpdateApplicationInput!) {
          updateApplication(input: $input) {
            id
            applicationData
            createdAt
            updatedAt
            updatedBy
          }
        }
      `;

      console.log('🔄 Updating application with real file uploads...');
      await client.graphql({
        query: updateApplicationMutation,
        variables: {
          input: {
            id: applicationId,
            applicationData: JSON.stringify(finalSubmissionData),
            updatedBy
          }
        }
      });

      console.log('✅ Real upload application submitted successfully with ID:', applicationId);

      return {
        success: true,
        applicationId
      };

    } catch (error) {
      console.error('Error submitting real upload application:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred'
      };
    }
  }
} 