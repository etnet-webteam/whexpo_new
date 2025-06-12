import { useState, useEffect } from 'react';
import { uploadData } from 'aws-amplify/storage';
import {
  Button,
  Flex,
  TextField,
  SelectField,
  Heading,
  View,
  Alert,
  Divider,
  TextAreaField,
  Text,
} from '@aws-amplify/ui-react';

interface ApplicationSubmissionData {
  formData: {
    companyNameEng: string;
    companyNameChi: string;
    entryTitleEng: string;
    entryTitleChi: string;
    companyDescription: string;
    businessRegNo: string;
    incorporationNo: string;
    incorporationDate: string;
    companyAddress: string;
    primaryContactName: string;
    primaryContactTitle: string;
    primaryContactPhone: string;
    primaryContactEmail: string;
    secondaryContactName: string;
    secondaryContactTitle: string;
    secondaryContactPhone: string;
    secondaryContactEmail: string;
    awardCategory: string;
    videoLink: string;
    submissionUsage: boolean;
    applicationDeclaration: boolean;
    patentStatus: string;
    intellectualProperty: string;
    eventAdminCost: boolean;
    verifyCode: string;
  };
  fileUploads: {
    logoAI?: { s3Key: string; s3Url: string; fileName: string; fileSize: number; uploadedAt: string };
    logoJPEG?: { s3Key: string; s3Url: string; fileName: string; fileSize: number; uploadedAt: string };
    brandGuideline?: { s3Key: string; s3Url: string; fileName: string; fileSize: number; uploadedAt: string };
    supportingDocument?: { s3Key: string; s3Url: string; fileName: string; fileSize: number; uploadedAt: string };
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

interface Application {
  id: string;
  company: string;
  title: string;
  category: string;
  award: string;
  owner?: string;
  contactEmail: string;
  submissionDate: string;
  formattedSubmissionDate: string;
  rawData: ApplicationSubmissionData;
}

interface ApplicationEditModalProps {
  application: Application;
  isOpen: boolean;
  onClose: () => void;
  onSave: (application: Application) => Promise<void>;
}

const ApplicationEditModal: React.FC<ApplicationEditModalProps> = ({
  application,
  isOpen,
  onClose,
  onSave,
}) => {
  const [formData, setFormData] = useState(application.rawData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadingFiles, setUploadingFiles] = useState<{ [key: string]: boolean }>({});

  // Award categories
  const awardCategories = [
    { value: 'beauty-fitness', label: 'Beauty & Fitness' },
    { value: 'health-personal-care', label: 'Health & Personal Care Product' },
    { value: 'health-food-supplement', label: 'Health Food & Supplement' },
    { value: 'health-innovation', label: 'Health Innovation' },
    { value: 'health-protection-planning', label: 'Health Protection & Planning' },
    { value: 'healthy-community', label: 'Healthy Community Partnership' },
    { value: 'healthy-entrepreneurship', label: 'Healthy Entrepreneurship' },
    { value: 'marketing-campaign', label: 'Marketing Campaign' },
    { value: 'medical-professional', label: 'Medical & Professional Service' },
    { value: 'sustainable-csr', label: 'Sustainable Corporate Social Responsibility' },
    { value: 'wellness-therapeutic', label: 'Wellness & Therapeutic' }
  ];

  useEffect(() => {
    setFormData(application.rawData);
  }, [application]);

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({
      ...prev,
      formData: {
        ...prev.formData,
        [field]: value
      }
    }));
  };

  const handleFileUpload = async (field: string, file: File | null) => {
    if (!file) return;

    setUploadingFiles(prev => ({ ...prev, [field]: true }));
    
    try {
      const fileName = `${application.id}/${field}/${file.name}`;
      await uploadData({
        key: fileName,
        data: file,
      });

      const fileInfo = {
        s3Key: fileName,
        s3Url: '', // Will be populated when needed
        fileName: file.name,
        fileSize: file.size,
        uploadedAt: new Date().toISOString(),
      };

      setFormData(prev => ({
        ...prev,
        fileUploads: {
          ...prev.fileUploads,
          [field]: fileInfo
        }
      }));

    } catch (uploadError) {
      console.error('File upload error:', uploadError);
      setError(`Failed to upload ${field}: ${uploadError instanceof Error ? uploadError.message : 'Unknown error'}`);
    } finally {
      setUploadingFiles(prev => ({ ...prev, [field]: false }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.formData.companyNameEng.trim() || !formData.formData.entryTitleEng.trim()) {
      setError('Company name and entry title are required');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const updatedApplication: Application = {
        ...application,
        rawData: formData,
        company: formData.formData.companyNameEng,
        title: formData.formData.entryTitleEng,
        category: formData.formData.awardCategory,
        owner: formData.formData.primaryContactName,
        contactEmail: formData.formData.primaryContactEmail,
      };

      await onSave(updatedApplication);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to save application';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setFormData(application.rawData);
    setError('');
    onClose();
  };

  const renderFileField = (field: string, label: string, accept: string) => {
    const currentFile = formData.fileUploads[field as keyof typeof formData.fileUploads];
    const isUploading = uploadingFiles[field];

    return (
      <View marginBottom="1rem">
        <Text fontWeight="bold" marginBottom="0.5rem">{label}</Text>
        {currentFile && (
          <View marginBottom="0.5rem" padding="0.5rem" backgroundColor="rgba(0,0,0,0.05)" borderRadius="0.25rem">
            <Text fontSize="0.875rem">
              📎 {currentFile.fileName} ({(currentFile.fileSize / 1024 / 1024).toFixed(1)}MB)
            </Text>
            <Text fontSize="0.75rem" color="gray">
              Uploaded: {new Date(currentFile.uploadedAt).toLocaleString()}
            </Text>
          </View>
        )}
        <input
          type="file"
          accept={accept}
          onChange={(e) => {
            const file = e.target.files?.[0] || null;
            if (file) handleFileUpload(field, file);
          }}
          disabled={isUploading}
          style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px' }}
        />
        {isUploading && <Text fontSize="0.875rem" color="blue">Uploading...</Text>}
      </View>
    );
  };

  if (!isOpen) return null;

  return (
    <View className="application-modal-overlay">
      <View className="application-modal" style={{ maxWidth: '800px', maxHeight: '90vh', overflow: 'auto' }}>
        <Flex direction="column" gap="1rem">
          <Flex justifyContent="space-between" alignItems="center">
            <Heading level={4}>Edit Application - {formData.formData.companyNameEng}</Heading>
            <Button
              variation="link"
              onClick={handleClose}
              size="small"
            >
              ×
            </Button>
          </Flex>
          
          <Divider />

          {error && (
            <Alert variation="error" isDismissible onDismiss={() => setError('')}>
              {error}
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <View style={{ maxHeight: '60vh', overflow: 'auto', padding: '1rem' }}>
              <Flex direction="column" gap="1rem">
                {/* Company Information */}
                <View>
                  <Heading level={5} marginBottom="1rem">Company Information</Heading>
                  <Divider marginBottom="1rem" />
                  <Flex direction="column" gap="1rem">
                    <TextField
                      label="Company Name (English)*"
                      value={formData.formData.companyNameEng}
                      onChange={(e) => handleInputChange('companyNameEng', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Company Name (Chinese)"
                      value={formData.formData.companyNameChi}
                      onChange={(e) => handleInputChange('companyNameChi', e.target.value)}
                    />
                    
                    <TextField
                      label="Entry Title (English)*"
                      value={formData.formData.entryTitleEng}
                      onChange={(e) => handleInputChange('entryTitleEng', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Entry Title (Chinese)"
                      value={formData.formData.entryTitleChi}
                      onChange={(e) => handleInputChange('entryTitleChi', e.target.value)}
                    />
                    
                    <TextAreaField
                      label="Company Description*"
                      value={formData.formData.companyDescription}
                      onChange={(e) => handleInputChange('companyDescription', e.target.value)}
                      rows={5}
                      required
                    />
                    
                    <TextField
                      label="Business Registration No.*"
                      value={formData.formData.businessRegNo}
                      onChange={(e) => handleInputChange('businessRegNo', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Certificate of Incorporation No.*"
                      value={formData.formData.incorporationNo}
                      onChange={(e) => handleInputChange('incorporationNo', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Date of Incorporation*"
                      type="date"
                      value={formData.formData.incorporationDate}
                      onChange={(e) => handleInputChange('incorporationDate', e.target.value)}
                      required
                    />
                    
                    <TextAreaField
                      label="Company Address*"
                      value={formData.formData.companyAddress}
                      onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                      rows={3}
                      required
                    />
                  </Flex>
                </View>

                {/* Contact Information */}
                <View>
                  <Heading level={5} marginBottom="1rem">Contact Information</Heading>
                  <Divider marginBottom="1rem" />
                  <Flex direction="column" gap="1rem">
                    <Heading level={6}>Primary Contact</Heading>
                    <TextField
                      label="Name*"
                      value={formData.formData.primaryContactName}
                      onChange={(e) => handleInputChange('primaryContactName', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Title*"
                      value={formData.formData.primaryContactTitle}
                      onChange={(e) => handleInputChange('primaryContactTitle', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Phone*"
                      value={formData.formData.primaryContactPhone}
                      onChange={(e) => handleInputChange('primaryContactPhone', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Email*"
                      type="email"
                      value={formData.formData.primaryContactEmail}
                      onChange={(e) => handleInputChange('primaryContactEmail', e.target.value)}
                      required
                    />

                    <Divider />
                    
                    <Heading level={6}>Secondary Contact</Heading>
                    <TextField
                      label="Name*"
                      value={formData.formData.secondaryContactName}
                      onChange={(e) => handleInputChange('secondaryContactName', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Title*"
                      value={formData.formData.secondaryContactTitle}
                      onChange={(e) => handleInputChange('secondaryContactTitle', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Phone*"
                      value={formData.formData.secondaryContactPhone}
                      onChange={(e) => handleInputChange('secondaryContactPhone', e.target.value)}
                      required
                    />
                    
                    <TextField
                      label="Email*"
                      type="email"
                      value={formData.formData.secondaryContactEmail}
                      onChange={(e) => handleInputChange('secondaryContactEmail', e.target.value)}
                      required
                    />
                  </Flex>
                </View>

                {/* Award Category */}
                <View>
                  <Heading level={5} marginBottom="1rem">Award Category & Materials</Heading>
                  <Divider marginBottom="1rem" />
                  <Flex direction="column" gap="1rem">
                    <SelectField
                      label="Award Category*"
                      value={formData.formData.awardCategory}
                      onChange={(e) => handleInputChange('awardCategory', e.target.value)}
                      required
                    >
                      <option value="">Select a category</option>
                      {awardCategories.map(category => (
                        <option key={category.value} value={category.value}>
                          {category.label}
                        </option>
                      ))}
                    </SelectField>
                    
                    <TextField
                      label="Video Link"
                      type="url"
                      value={formData.formData.videoLink}
                      onChange={(e) => handleInputChange('videoLink', e.target.value)}
                      placeholder="https://"
                    />
                  </Flex>
                </View>

                {/* File Uploads */}
                <View>
                  <Heading level={5} marginBottom="1rem">File Uploads</Heading>
                  <Divider marginBottom="1rem" />
                  <Flex direction="column" gap="1rem">
                    {renderFileField('logoAI', 'Logo AI/EPS File*', '.ai,.eps')}
                    {renderFileField('logoJPEG', 'Logo JPEG File*', '.jpg,.jpeg')}
                    {renderFileField('brandGuideline', 'Brand Guideline (max 5MB)*', '.pdf,.doc,.docx')}
                    {renderFileField('supportingDocument', 'Supporting Document (max 5MB)*', '.pdf,.ppt,.pptx')}
                  </Flex>
                </View>

                {/* Declarations */}
                <View>
                  <Heading level={5} marginBottom="1rem">Declarations</Heading>
                  <Divider marginBottom="1rem" />
                  <Flex direction="column" gap="1rem">
                    <View>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={formData.formData.submissionUsage}
                          onChange={(e) => handleInputChange('submissionUsage', e.target.checked)}
                          required
                        />
                        <Text>Submission Usage Agreement*</Text>
                      </label>
                    </View>
                    
                    <View>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={formData.formData.applicationDeclaration}
                          onChange={(e) => handleInputChange('applicationDeclaration', e.target.checked)}
                          required
                        />
                        <Text>Application Declaration*</Text>
                      </label>
                    </View>
                    
                    <SelectField
                      label="Patent Status*"
                      value={formData.formData.patentStatus}
                      onChange={(e) => handleInputChange('patentStatus', e.target.value)}
                      required
                    >
                      <option value="">Select patent status</option>
                      <option value="no-patent">No Patent</option>
                      <option value="has-patent">Has Patent</option>
                      <option value="patent-pending">Patent Pending</option>
                    </SelectField>
                    
                    <SelectField
                      label="Intellectual Property Status*"
                      value={formData.formData.intellectualProperty}
                      onChange={(e) => handleInputChange('intellectualProperty', e.target.value)}
                      required
                    >
                      <option value="">Select IP status</option>
                      <option value="no-dispute">No Dispute</option>
                      <option value="has-dispute">Has Dispute</option>
                    </SelectField>
                    
                    <View>
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        <input
                          type="checkbox"
                          checked={formData.formData.eventAdminCost}
                          onChange={(e) => handleInputChange('eventAdminCost', e.target.checked)}
                          required
                        />
                        <Text>Event Administration Cost Agreement*</Text>
                      </label>
                    </View>
                    
                    <TextField
                      label="Verification Code"
                      value={formData.formData.verifyCode}
                      onChange={(e) => handleInputChange('verifyCode', e.target.value)}
                    />
                  </Flex>
                </View>
              </Flex>
            </View>

            <Divider marginTop="1rem" />

            <Flex gap="0.5rem" justifyContent="flex-end" marginTop="1rem">
              <Button
                type="button"
                variation="link"
                onClick={handleClose}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variation="primary"
                isLoading={isLoading}
                loadingText="Saving..."
              >
                Save Changes
              </Button>
            </Flex>
          </form>
        </Flex>
      </View>
    </View>
  );
};

export default ApplicationEditModal; 