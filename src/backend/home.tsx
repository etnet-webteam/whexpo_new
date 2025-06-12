import { useEffect, useState } from 'react';
import { generateClient } from '@aws-amplify/api';
import { GraphQLResult } from '@aws-amplify/api-graphql';
import {
  Table,
  TableCell,
  TableBody,
  TableHead,
  TableRow,
  Button,
  Flex,
  Heading,
  View,
  Alert,
  Badge,
  TextField,
  SelectField,
  useTheme,
  Text,
  Divider,
} from '@aws-amplify/ui-react';
import ApplicationEditModal from './ApplicationEditModal';

const client = generateClient();

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

interface ApplicationRecord {
  id: string;
  applicationData: string; // JSON string
  createdAt: string;
  updatedAt: string;
  updatedBy?: string;
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

interface ListApplicationsQuery {
  listApplications: {
    items: ApplicationRecord[];
  };
}

interface UpdateApplicationMutation {
  updateApplication: ApplicationRecord;
}

type SortField = 'company' | 'title' | 'category' | 'owner' | 'submissionDate';
type SortDirection = 'asc' | 'desc';

function BackendHome() {
  const [apps, setApps] = useState<Application[]>([]);
  const [sortedApps, setSortedApps] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [expandedRow, setExpandedRow] = useState<string | null>(null);
  const [sortField, setSortField] = useState<SortField>('submissionDate');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const { tokens } = useTheme();

  useEffect(() => {
    fetchApps();
  }, []);

  useEffect(() => {
    // Apply sorting whenever apps, sortField, or sortDirection changes
    const sorted = [...apps].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortField) {
        case 'company':
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
          break;
        case 'title':
          aValue = a.title.toLowerCase();
          bValue = b.title.toLowerCase();
          break;
        case 'category':
          aValue = a.category.toLowerCase();
          bValue = b.category.toLowerCase();
          break;
        case 'owner':
          aValue = (a.owner || '').toLowerCase();
          bValue = (b.owner || '').toLowerCase();
          break;
        case 'submissionDate':
          aValue = new Date(a.rawData.submissionMetadata?.submitTime || a.submissionDate).getTime();
          bValue = new Date(b.rawData.submissionMetadata?.submitTime || b.submissionDate).getTime();
          break;
        default:
          aValue = a.company.toLowerCase();
          bValue = b.company.toLowerCase();
      }

      if (aValue < bValue) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });

    setSortedApps(sorted);
  }, [apps, sortField, sortDirection]);

  const formatSubmissionDate = (dateString: string): string => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const fetchApps = async () => {
    try {
      setLoading(true);
      const response = await client.graphql({
        query: `
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
        `
      }) as GraphQLResult<ListApplicationsQuery>;
      
      if (response.data?.listApplications?.items) {
        const processedApps = response.data.listApplications.items
          .map(record => {
            try {
              const submissionData: ApplicationSubmissionData = JSON.parse(record.applicationData);
              const submissionDate = submissionData.submissionMetadata?.submitTime || record.createdAt;
              return {
                id: record.id,
                company: submissionData.formData.companyNameEng || 'Unknown Company',
                title: submissionData.formData.entryTitleEng || 'Unknown Entry',
                category: submissionData.formData.awardCategory || 'Unknown Category',
                award: submissionData.formData.awardCategory || 'Unknown Award',
                owner: submissionData.formData.primaryContactName || 'Unknown Contact',
                contactEmail: submissionData.formData.primaryContactEmail || '',
                submissionDate: submissionDate,
                formattedSubmissionDate: formatSubmissionDate(submissionDate),
                rawData: submissionData,
              } as Application;
            } catch (parseError) {
              console.error('Error parsing application data for ID:', record.id, parseError);
              return {
                id: record.id,
                company: 'Parse Error',
                title: 'Parse Error',
                category: 'Unknown',
                award: 'Unknown',
                owner: 'Unknown',
                contactEmail: '',
                submissionDate: record.createdAt,
                formattedSubmissionDate: formatSubmissionDate(record.createdAt),
                rawData: {} as ApplicationSubmissionData,
              } as Application;
            }
          });
        
        setApps(processedApps);
      }
      setError(null);
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch applications';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return '↕️';
    }
    return sortDirection === 'asc' ? '↑' : '↓';
  };

  const handleEdit = (app: Application) => {
    setEditingApp(app);
  };

  const handleSaveEdit = async (updatedApp: Application) => {
    try {
      // Update the submission data with all the edited information
      const updatedSubmissionData = {
        ...updatedApp.rawData,
        formData: {
          ...updatedApp.rawData.formData,
          ...updatedApp.rawData.formData, // Preserve existing formData
          // The updatedApp will contain all the form fields from the modal
        }
      };

      const response = await client.graphql({
        query: `
          mutation UpdateApplication($input: UpdateApplicationInput!) {
            updateApplication(input: $input) {
              id
              applicationData
              createdAt
              updatedAt
              updatedBy
            }
          }
        `,
        variables: {
          input: {
            id: updatedApp.id,
            applicationData: JSON.stringify(updatedSubmissionData),
            updatedBy: 'backend-admin',
          }
        }
      }) as GraphQLResult<UpdateApplicationMutation>;

      if (response.data?.updateApplication) {
        // Refresh the applications list to show updated data
        await fetchApps();
        setEditingApp(null);
      }
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to update application';
      setError(errorMessage);
    }
  };

  // Filter applications based on search and category
  const filteredApps = sortedApps.filter(app => {
    const matchesSearch = !searchTerm || 
      app.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.owner?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.contactEmail.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = !filterCategory || app.category === filterCategory;
    
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const categories = Array.from(new Set(apps.map(app => app.category))).filter(Boolean);

  const getCategoryDisplayName = (category: string) => {
    const categoryMap: Record<string, string> = {
      'beauty-fitness': 'Beauty & Fitness',
      'health-personal-care': 'Health & Personal Care',
      'health-food-supplement': 'Health Food & Supplement',
      'health-innovation': 'Health Innovation',
      'health-protection-planning': 'Health Protection & Planning',
      'healthy-community': 'Healthy Community Partnership',
      'healthy-entrepreneurship': 'Healthy Entrepreneurship',
      'marketing-campaign': 'Marketing Campaign',
      'medical-professional': 'Medical & Professional Service',
      'sustainable-csr': 'Sustainable CSR',
      'wellness-therapeutic': 'Wellness & Therapeutic',
    };
    return categoryMap[category] || category;
  };

  const handleViewDetails = (appId: string) => {
    setExpandedRow(expandedRow === appId ? null : appId);
  };

  const renderFileInfo = (fileInfo: { s3Key: string; s3Url: string; fileName: string; fileSize: number; uploadedAt: string } | undefined, label: string) => {
    if (!fileInfo) return null;
    return (
      <View marginBottom="0.5rem">
        <Text fontWeight="bold">{label}:</Text>
        <Text fontSize="0.875rem">
          📎 {fileInfo.fileName} ({(fileInfo.fileSize / 1024 / 1024).toFixed(1)}MB)
        </Text>
        {fileInfo.s3Url && (
          <Button
            size="small"
            variation="link"
            onClick={() => window.open(fileInfo.s3Url, '_blank')}
          >
            Download
          </Button>
        )}
      </View>
    );
  };

  if (loading) {
    return (
      <View padding="2rem">
        <Heading level={3}>Loading applications...</Heading>
      </View>
    );
  }

  return (
    <View padding="1.5rem">
      <Flex direction="column" gap="1rem">
        <Heading level={2}>2025 Health Partnership Awards - Applications</Heading>
        
        {error && (
          <Alert variation="error" isDismissible onDismiss={() => setError(null)}>
            {error}
          </Alert>
        )}

        {/* Search and Filter Controls */}
        <View className="search-controls">
          <Flex className="form-controls-row" gap="1rem" wrap="wrap" alignItems="end">
            <View className="form-control-item">
              <TextField
                label="Search Applications"
                placeholder="Search by company, title, contact, or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </View>
            <View className="form-control-item" style={{ minWidth: '200px' }}>
              <SelectField
                label="Filter by Category"
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                placeholder="All Categories"
              >
                <option value="">All Categories</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryDisplayName(category)}
                  </option>
                ))}
              </SelectField>
            </View>
            <View style={{ minWidth: '120px' }}>
              <Button onClick={fetchApps} variation="primary" width="100%">
                Refresh
              </Button>
            </View>
          </Flex>
        </View>

        {/* Results count */}
        <Flex justifyContent="space-between" alignItems="center">
          <Badge variation="info">
            {filteredApps.length} of {apps.length} applications
          </Badge>
        </Flex>

        {/* Applications Table */}
        {filteredApps.length === 0 ? (
          <View 
            textAlign="center" 
            padding="3rem"
            backgroundColor={tokens.colors.background.secondary}
            borderRadius={tokens.radii.medium}
          >
            <Heading level={4} color={tokens.colors.font.secondary}>
              {apps.length === 0 ? 'No applications found. Applications submitted through the 2025 form will appear here.' : 'No applications match your search criteria'}
            </Heading>
          </View>
        ) : (
          <View className="table-container">
            <Table
              caption=""
              highlightOnHover={true}
            >
            <TableHead>
              <TableRow>
                <TableCell as="th">
                  <Button
                    variation="link"
                    onClick={() => handleSort('company')}
                    size="small"
                    style={{ fontWeight: 'bold', color: 'inherit' }}
                  >
                    Company {getSortIcon('company')}
                  </Button>
                </TableCell>
                <TableCell as="th">
                  <Button
                    variation="link"
                    onClick={() => handleSort('title')}
                    size="small"
                    style={{ fontWeight: 'bold', color: 'inherit' }}
                  >
                    Entry Title {getSortIcon('title')}
                  </Button>
                </TableCell>
                <TableCell as="th">
                  <Button
                    variation="link"
                    onClick={() => handleSort('category')}
                    size="small"
                    style={{ fontWeight: 'bold', color: 'inherit' }}
                  >
                    Category {getSortIcon('category')}
                  </Button>
                </TableCell>
                <TableCell as="th">
                  <Button
                    variation="link"
                    onClick={() => handleSort('owner')}
                    size="small"
                    style={{ fontWeight: 'bold', color: 'inherit' }}
                  >
                    Contact {getSortIcon('owner')}
                  </Button>
                </TableCell>
                <TableCell as="th">
                  <Button
                    variation="link"
                    onClick={() => handleSort('submissionDate')}
                    size="small"
                    style={{ fontWeight: 'bold', color: 'inherit' }}
                  >
                    Submit Date {getSortIcon('submissionDate')}
                  </Button>
                </TableCell>
                <TableCell as="th">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApps.map((app) => (
                <>
                  <TableRow key={app.id}>
                    <TableCell>
                      <Text fontWeight="bold">
                        {app.rawData.formData?.companyNameChi || app.company}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Text>
                        {app.rawData.formData?.entryTitleChi || app.title}
                      </Text>
                    </TableCell>
                    <TableCell>
                      <Badge variation="info">{getCategoryDisplayName(app.category)}</Badge>
                    </TableCell>
                    <TableCell>
                      <Flex direction="column">
                        <Text>{app.owner}</Text>
                        <Text fontSize="0.875rem" color={tokens.colors.font.secondary}>
                          {app.contactEmail}
                        </Text>
                      </Flex>
                    </TableCell>
                    <TableCell>{app.formattedSubmissionDate}</TableCell>
                    <TableCell>
                      <Flex gap="0.5rem" className="table-action-buttons">
                        <Button
                          size="small"
                          variation="primary"
                          onClick={() => handleViewDetails(app.id)}
                        >
                          {expandedRow === app.id ? 'Hide' : 'View'} Details
                        </Button>
                        <Button
                          size="small"
                          variation="primary"
                          onClick={() => handleEdit(app)}
                        >
                          Edit
                        </Button>
                      </Flex>
                    </TableCell>
                  </TableRow>
                  {expandedRow === app.id && (
                    <TableRow>
                      <TableCell colSpan={6}>
                        <View padding="1rem" backgroundColor={tokens.colors.background.secondary}>
                          <Flex direction="column" gap="1rem">
                            {/* Company Information */}
                            <View>
                              <Heading level={5} marginBottom="0.5rem">Company Information</Heading>
                              <Divider marginBottom="0.5rem" />
                              <Flex direction="column" gap="0.5rem">
                                <Text><strong>Business Reg No:</strong> {app.rawData.formData?.businessRegNo}</Text>
                                <Text><strong>Incorporation No:</strong> {app.rawData.formData?.incorporationNo}</Text>
                                <Text><strong>Incorporation Date:</strong> {app.rawData.formData?.incorporationDate}</Text>
                                <Text><strong>Address:</strong> {app.rawData.formData?.companyAddress}</Text>
                                <Text><strong>Description:</strong></Text>
                                <Text fontSize="0.875rem" style={{ whiteSpace: 'pre-wrap' }}>
                                  {app.rawData.formData?.companyDescription}
                                </Text>
                              </Flex>
                            </View>
                            
                            {/* Contact Information */}
                            <View>
                              <Heading level={5} marginBottom="0.5rem">Contact Information</Heading>
                              <Divider marginBottom="0.5rem" />
                              <Flex direction="column" gap="1rem">
                                <View>
                                  <Text fontWeight="bold">Primary Contact:</Text>
                                  <Text>{app.rawData.formData?.primaryContactName} - {app.rawData.formData?.primaryContactTitle}</Text>
                                  <Text>📞 {app.rawData.formData?.primaryContactPhone}</Text>
                                  <Text>📧 {app.rawData.formData?.primaryContactEmail}</Text>
                                </View>
                                <View>
                                  <Text fontWeight="bold">Secondary Contact:</Text>
                                  <Text>{app.rawData.formData?.secondaryContactName} - {app.rawData.formData?.secondaryContactTitle}</Text>
                                  <Text>📞 {app.rawData.formData?.secondaryContactPhone}</Text>
                                  <Text>📧 {app.rawData.formData?.secondaryContactEmail}</Text>
                                </View>
                              </Flex>
                            </View>
                            
                            {/* Files & Documents */}
                            <View>
                              <Heading level={5} marginBottom="0.5rem">Files & Documents</Heading>
                              <Divider marginBottom="0.5rem" />
                              <Flex direction="column" gap="0.5rem">
                                {renderFileInfo(app.rawData.fileUploads?.logoAI, 'Logo AI/EPS')}
                                {renderFileInfo(app.rawData.fileUploads?.logoJPEG, 'Logo JPEG')}
                                {renderFileInfo(app.rawData.fileUploads?.brandGuideline, 'Brand Guideline')}
                                {renderFileInfo(app.rawData.fileUploads?.supportingDocument, 'Supporting Document')}
                                {app.rawData.formData?.videoLink && (
                                  <View>
                                    <Text fontWeight="bold">Video Link:</Text>
                                    <Button
                                      size="small"
                                      variation="link"
                                      onClick={() => window.open(app.rawData.formData.videoLink, '_blank')}
                                    >
                                      {app.rawData.formData.videoLink}
                                    </Button>
                                  </View>
                                )}
                              </Flex>
                            </View>

                            {/* Submission Details */}
                            <View>
                              <Heading level={5} marginBottom="0.5rem">Submission Details</Heading>
                              <Divider marginBottom="0.5rem" />
                              <Flex direction="column" gap="0.5rem">
                                <Text><strong>Submission Time:</strong> {app.formattedSubmissionDate}</Text>
                                <Text><strong>Files Uploaded:</strong> {app.rawData.submissionMetadata?.totalFilesUploaded || 0} / {app.rawData.submissionMetadata?.totalFilesAttempted || 0}</Text>
                                <Text><strong>Patent Status:</strong> {app.rawData.formData?.patentStatus}</Text>
                                <Text><strong>IP Status:</strong> {app.rawData.formData?.intellectualProperty}</Text>
                                {app.rawData.submissionMetadata?.uploadErrors && app.rawData.submissionMetadata.uploadErrors.length > 0 && (
                                  <View>
                                    <Text fontWeight="bold" color="red">Upload Errors:</Text>
                                    {app.rawData.submissionMetadata.uploadErrors.map((error, idx) => (
                                      <Text key={idx} fontSize="0.875rem" color="red">{error}</Text>
                                    ))}
                                  </View>
                                )}
                              </Flex>
                            </View>
                          </Flex>
                        </View>
                      </TableCell>
                    </TableRow>
                  )}
                </>
              ))}
            </TableBody>
          </Table>
          </View>
        )}

        {/* Edit Modal */}
        {editingApp && (
          <ApplicationEditModal
            application={editingApp}
            isOpen={!!editingApp}
            onClose={() => setEditingApp(null)}
            onSave={handleSaveEdit}
          />
        )}
      </Flex>
    </View>
  );
}

export default BackendHome; 