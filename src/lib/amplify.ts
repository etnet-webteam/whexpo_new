import { Amplify } from 'aws-amplify';
import { generateClient } from 'aws-amplify/api';
import outputs from '../../amplify_outputs.json';

// Configure Amplify
Amplify.configure(outputs);

// Create GraphQL client
export const client = generateClient();

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
    logoAI?: string; // S3 URL after upload
    logoJPEG?: string; // S3 URL after upload
    brandGuideline?: string; // S3 URL after upload
    supportingDocument?: string; // S3 URL after upload
  };
  submissionMetadata: {
    submitTime: string;
    userAgent: string;
    ipAddress?: string;
  };
} 