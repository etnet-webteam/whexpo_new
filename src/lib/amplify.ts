import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import outputs from '../../amplify_outputs.json';

// Configure Amplify
Amplify.configure(outputs);

// Create GraphQL client
export const client = generateClient();

// Utility function to generate S3 access URL
export const generateS3Url = (s3Key: string): string => {
  const storage = outputs.storage;
  const bucketName = storage.bucket_name;
  const region = storage.aws_region;
  
  // Handle the path based on whether it already has public prefix or not
  let finalKey = s3Key;
  
  // If the key starts with applications/ but not public/applications/, 
  // Amplify will automatically add public/ prefix for guest uploads
  if (s3Key.startsWith('applications/') && !s3Key.startsWith('public/')) {
    finalKey = `public/${s3Key}`;
  }
  
  return `https://${bucketName}.s3.${region}.amazonaws.com/${finalKey}`;
};

// Type definitions for our application data
export interface ApplicationFormData {
  // Part I - Entry Information
  companyNameEng: string;
  companyNameChi: string;
  entryTitleEng: string;
  entryTitleChi: string;
  logoAI: File | null;
  logoJPEG: File | null;
  brandGuideline: File | null;
  companyDescription: string;
  businessRegNo: string;
  incorporationNo: string;
  incorporationDate: string;
  companyAddress: string;
  
  // Part II - Contact Details
  primaryContactName: string;
  primaryContactTitle: string;
  primaryContactPhone: string;
  primaryContactEmail: string;
  secondaryContactName: string;
  secondaryContactTitle: string;
  secondaryContactPhone: string;
  secondaryContactEmail: string;
  
  // Part III - Award Categories
  awardCategory: string;
  
  // Part IV - Judging Materials
  supportingDocument: File | null;
  videoLink: string;
  
  // Declaration
  submissionUsage: boolean;
  applicationDeclaration: boolean;
  patentStatus: string;
  intellectualProperty: string;
  eventAdminCost: boolean;
  verifyCode: string;
}

export interface ApplicationSubmissionData {
  formData: Omit<ApplicationFormData, 'logoAI' | 'logoJPEG' | 'brandGuideline' | 'supportingDocument'>;
  fileUploads: {
    logoAI?: {
      s3Key: string; // S3 object key
      s3Url: string; // Full S3 access URL
      fileName: string; // Original file name
      fileSize: number; // File size in bytes
      uploadedAt: string; // Upload timestamp
    };
    logoJPEG?: {
      s3Key: string;
      s3Url: string;
      fileName: string;
      fileSize: number;
      uploadedAt: string;
    };
    brandGuideline?: {
      s3Key: string;
      s3Url: string;
      fileName: string;
      fileSize: number;
      uploadedAt: string;
    };
    supportingDocument?: {
      s3Key: string;
      s3Url: string;
      fileName: string;
      fileSize: number;
      uploadedAt: string;
    };
  };
  submissionMetadata: {
    submitTime: string;
    userAgent: string;
    ipAddress?: string;
    totalFilesUploaded: number;
    totalFilesAttempted: number;
    uploadErrors?: string[];
  };
} 