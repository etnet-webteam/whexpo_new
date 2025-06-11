import { uploadData } from 'aws-amplify/storage';
import { client } from '../lib/amplify';
import { type ApplicationFormData, type ApplicationSubmissionData } from '../lib/amplify';
import { getCurrentUser } from 'aws-amplify/auth';

export class ApplicationService {
  /**
   * Upload a file to S3 and return the key
   */
  private static async uploadFile(file: File, category: string): Promise<string> {
    const timestamp = new Date().getTime();
    const fileName = `${category}/${timestamp}-${file.name}`;
    
    try {
      const result = await uploadData({
        key: fileName,
        data: file,
        options: {
          contentType: file.type
        }
      });
      
      await result.result; // Wait for upload completion
      return fileName; // Return the key we used
    } catch (error) {
      console.error(`Error uploading ${category} file:`, error);
      throw new Error(`Failed to upload ${category} file`);
    }
  }

  /**
   * Submit the application form
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

      // Upload files to S3
      const fileUploads: ApplicationSubmissionData['fileUploads'] = {};
      
      if (formData.logoAI) {
        fileUploads.logoAI = await this.uploadFile(formData.logoAI, 'logos/ai');
      }
      
      if (formData.logoJPEG) {
        fileUploads.logoJPEG = await this.uploadFile(formData.logoJPEG, 'logos/jpeg');
      }
      
      if (formData.brandGuideline) {
        fileUploads.brandGuideline = await this.uploadFile(formData.brandGuideline, 'brand-guidelines');
      }
      
      if (formData.supportingDocument) {
        fileUploads.supportingDocument = await this.uploadFile(formData.supportingDocument, 'supporting-documents');
      }

      // Prepare submission data
      const submissionData: ApplicationSubmissionData = {
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
        fileUploads,
        submissionMetadata: {
          submitTime: new Date().toISOString(),
          userAgent: navigator.userAgent
        }
      };

      // Create the application record
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

      const result = await client.graphql({
        query: createApplicationMutation,
        variables: {
          input: {
            applicationData: JSON.stringify(submissionData),
            updatedBy
          }
        }
      }) as any; // eslint-disable-line @typescript-eslint/no-explicit-any

      return {
        success: true,
        applicationId: result.data.createApplication.id
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
      }) as any;

      return result.data.listApplications.items.map((item: any) => ({
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
      }) as any;

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
} 