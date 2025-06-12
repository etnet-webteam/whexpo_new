import '../lib/amplify'; // Initialize Amplify configuration
import { ApplicationService } from '../services/applicationService';
import { generateSampleData } from '../utils/sampleDataGenerator';

// Function to create a mock file with appropriate MIME type
function createMockFile(fileName: string, content: string, mimeType?: string): File {
  // Determine MIME type based on file extension if not provided
  let type = mimeType || 'text/plain';
  
  if (!mimeType) {
    const extension = fileName.split('.').pop()?.toLowerCase();
    switch (extension) {
      case 'eps':
        type = 'application/postscript';
        break;
      case 'ai':
        type = 'application/illustrator';
        break;
      case 'jpg':
      case 'jpeg':
        type = 'image/jpeg';
        break;
      case 'pdf':
        type = 'application/pdf';
        break;
      case 'ppt':
        type = 'application/vnd.ms-powerpoint';
        break;
      case 'pptx':
        type = 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
        break;
      default:
        type = 'text/plain';
    }
  }
  
  const blob = new Blob([content], { type });
  return new File([blob], fileName, { type });
}

// Function to add mock files to the application data
function addMockFiles(applicationData: any, index: number) { // eslint-disable-line @typescript-eslint/no-explicit-any
  // Create mock files for each application
  applicationData.logoAI = createMockFile(
    `logo_ai_${index + 1}.eps`, 
    `Mock EPS logo file for ${applicationData.companyNameEng}`
  );
  
  applicationData.logoJPEG = createMockFile(
    `logo_jpeg_${index + 1}.jpg`, 
    `Mock JPEG logo file for ${applicationData.companyNameEng}`
  );
  
  applicationData.brandGuideline = createMockFile(
    `brand_guideline_${index + 1}.pdf`, 
    `Mock brand guideline PDF for ${applicationData.companyNameEng}\n\nThis document contains comprehensive brand guidelines including:\n- Logo usage\n- Color palette\n- Typography\n- Design principles`
  );
  
  applicationData.supportingDocument = createMockFile(
    `supporting_doc_${index + 1}.pdf`, 
    `Supporting Document for ${applicationData.entryTitleEng}\n\nCompany: ${applicationData.companyNameEng}\nCategory: ${applicationData.awardCategory}\n\nThis document provides detailed information about our entry including:\n- Project overview\n- Implementation details\n- Impact assessment\n- Future plans`
  );
  
  return applicationData;
}

// Main submission function
export async function submitSampleApplications(skipFiles: boolean = false, useMockUploads: boolean = false) {
  console.log('🚀 Starting submission of 10 sample applications...\n');
  console.log(`Options: skipFiles=${skipFiles}, useMockUploads=${useMockUploads}\n`);
  
  const results = [];
  
  for (let i = 0; i < 10; i++) {
    try {
      console.log(`📝 Submitting application ${i + 1}/10...`);
      
      // Generate sample data
      let applicationData = generateSampleData(i);
      
      // Add mock files only if not skipping
      if (!skipFiles) {
        applicationData = addMockFiles(applicationData, i);
        if (useMockUploads) {
          console.log(`   📎 Will use mock uploads if real uploads fail`);
        }
      } else {
        console.log(`   📎 Skipping file uploads for testing`);
      }
      
      // Submit the application
      const result = useMockUploads && !skipFiles
        ? await ApplicationService.submitApplicationWithMockUploads(applicationData)
        : await ApplicationService.submitApplication(applicationData);
      
      if (result.success) {
        console.log(`✅ Application ${i + 1} submitted successfully!`);
        console.log(`   Company: ${applicationData.companyNameEng}`);
        console.log(`   Application ID: ${result.applicationId}`);
        console.log(`   Category: ${applicationData.awardCategory}\n`);
        
        results.push({
          index: i + 1,
          success: true,
          company: applicationData.companyNameEng,
          applicationId: result.applicationId,
          category: applicationData.awardCategory
        });
      } else {
        console.log(`❌ Application ${i + 1} failed to submit.`);
        console.log(`   Company: ${applicationData.companyNameEng}`);
        console.log(`   Error: ${result.error}\n`);
        
        results.push({
          index: i + 1,
          success: false,
          company: applicationData.companyNameEng,
          error: result.error
        });
      }
      
      // Add a small delay between submissions
      await new Promise(resolve => setTimeout(resolve, 1000));
      
    } catch (error) {
      console.log(`💥 Application ${i + 1} encountered an error:`);
      console.log(`   Error: ${error instanceof Error ? error.message : 'Unknown error'}\n`);
      
      results.push({
        index: i + 1,
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  }
  
  // Summary
  console.log('📊 SUBMISSION SUMMARY');
  console.log('====================\n');
  
  const successful = results.filter(r => r.success);
  const failed = results.filter(r => !r.success);
  
  console.log(`✅ Successful submissions: ${successful.length}/10`);
  console.log(`❌ Failed submissions: ${failed.length}/10\n`);
  
  if (successful.length > 0) {
    console.log('✅ SUCCESSFUL APPLICATIONS:');
    successful.forEach(app => {
      console.log(`   ${app.index}. ${app.company} (ID: ${app.applicationId}) - ${app.category}`);
    });
    console.log('');
  }
  
  if (failed.length > 0) {
    console.log('❌ FAILED APPLICATIONS:');
    failed.forEach(app => {
      console.log(`   ${app.index}. ${app.company || 'Unknown'} - Error: ${app.error}`);
    });
    console.log('');
  }
  
  console.log('🎉 Sample submission process completed!');
  
  return results;
}

// Run the script if called directly
if (typeof window === 'undefined') {
  // Running in Node.js environment
  submitSampleApplications()
    .then(() => process.exit(0))
    .catch((error) => {
      console.error('Script failed:', error);
      process.exit(1);
    });
} 