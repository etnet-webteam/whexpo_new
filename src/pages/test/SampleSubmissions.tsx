import React, { useState } from 'react';
import { submitSampleApplications } from '../../scripts/submitSampleApplications';
import { generateSampleData } from '../../utils/sampleDataGenerator';
import { ApplicationService } from '../../services/applicationService';

const SampleSubmissions: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [skipFiles, setSkipFiles] = useState(true); // Default to skip files for easier testing
  const [useMockUploads, setUseMockUploads] = useState(false);

  const addLog = (message: string) => {
    setLogs(prev => [...prev, `${new Date().toLocaleTimeString()}: ${message}`]);
  };

  const handleRunSubmissions = async () => {
    setIsRunning(true);
    setResults([]);
    setLogs([]);
    
    try {
      addLog('🚀 Starting sample submissions...');
      
      // Override console.log to capture logs
      const originalLog = console.log;
      console.log = (...args: any[]) => {
        const message = args.map(arg => 
          typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
        ).join(' ');
        addLog(message);
        originalLog(...args);
      };

      const submissionResults = await submitSampleApplications(skipFiles, useMockUploads);
      setResults(submissionResults);
      
      // Restore original console.log
      console.log = originalLog;
      
      addLog('✅ All submissions completed!');
    } catch (error) {
      addLog(`❌ Error during submissions: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsRunning(false);
    }
  };

  const successCount = results.filter(r => r.success).length;
  const failureCount = results.filter(r => !r.success).length;

  return (
    <div style={{ 
      padding: '20px', 
      maxWidth: '1200px', 
      margin: '0 auto',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1>Sample Application Submissions Test</h1>
      <p>This page allows you to submit 10 sample applications to test the backend functionality.</p>
      
      <div style={{ marginBottom: '20px' }}>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
            <input
              type="checkbox"
              checked={skipFiles}
              onChange={(e) => setSkipFiles(e.target.checked)}
              disabled={isRunning}
            />
            Skip file uploads (recommended for testing)
          </label>
          
          {!skipFiles && (
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: '24px' }}>
              <input
                type="checkbox"
                checked={useMockUploads}
                onChange={(e) => setUseMockUploads(e.target.checked)}
                disabled={isRunning}
              />
              Use mock uploads if real uploads fail
            </label>
          )}
          
          <small style={{ color: '#666', marginLeft: '24px' }}>
            {skipFiles 
              ? 'Applications will be submitted without files for faster testing' 
              : useMockUploads 
                ? 'Will try real uploads first, then fallback to mock uploads for testing'
                : 'Applications will include real file uploads (requires storage permissions)'
            }
          </small>
        </div>
        
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <button 
            onClick={handleRunSubmissions}
            disabled={isRunning}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: isRunning ? '#ccc' : '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isRunning ? 'not-allowed' : 'pointer'
            }}
          >
            {isRunning ? '🔄 Running Submissions...' : '🚀 Run Sample Submissions'}
          </button>
          
          <button 
            onClick={async () => {
              setIsRunning(true);
              setLogs([]);
              addLog('🧪 Testing new S3 URL schema with mock uploads...');
              
              try {
                const testData = generateSampleData(0);
                
                // Add mock files
                const createMockFile = (fileName: string, content: string): File => {
                  const blob = new Blob([content], { type: 'text/plain' });
                  return new File([blob], fileName, { type: 'text/plain' });
                };
                
                testData.logoAI = createMockFile('test-logo.ai', 'Mock AI file');
                testData.logoJPEG = createMockFile('test-logo.jpg', 'Mock JPEG file');
                testData.brandGuideline = createMockFile('test-brand.pdf', 'Mock PDF file');
                testData.supportingDocument = createMockFile('test-support.pdf', 'Mock support doc');
                
                const result = await ApplicationService.submitApplicationWithMockUploads(testData);
                
                if (result.success) {
                  addLog(`✅ Test submission successful! ID: ${result.applicationId}`);
                  addLog('📁 Checking application data for S3 URLs...');
                  
                  // Fetch the application to see the S3 URLs
                  const app = await ApplicationService.getApplication(result.applicationId!);
                  if (app?.applicationData?.fileUploads) {
                    const appData = app.applicationData;
                    addLog('\n📊 S3 URL Information:');
                    
                    Object.entries(appData.fileUploads).forEach(([fileType, fileInfo]) => {
                      if (fileInfo && typeof fileInfo === 'object' && 'fileName' in fileInfo) {
                        addLog(`\n${fileType}:`);
                        addLog(`  📎 File: ${fileInfo.fileName} (${fileInfo.fileSize} bytes)`);
                        addLog(`  🔑 S3 Key: ${fileInfo.s3Key}`);
                        addLog(`  🌐 S3 URL: ${fileInfo.s3Url}`);
                        addLog(`  ⏰ Uploaded: ${fileInfo.uploadedAt}`);
                      }
                    });
                    
                    addLog(`\n📈 Upload Summary:`);
                    addLog(`  Total Files: ${appData.submissionMetadata?.totalFilesAttempted || 0}`);
                    addLog(`  Successful: ${appData.submissionMetadata?.totalFilesUploaded || 0}`);
                  }
                } else {
                  addLog(`❌ Test submission failed: ${result.error}`);
                }
              } catch (error) {
                addLog(`💥 Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
              } finally {
                setIsRunning(false);
              }
            }}
            disabled={isRunning}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: isRunning ? '#ccc' : '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isRunning ? 'not-allowed' : 'pointer'
            }}
          >
            🧪 Test S3 URL Schema
          </button>
          
          <button 
            onClick={async () => {
              setIsRunning(true);
              setLogs([]);
              addLog('🔥 Testing REAL S3 uploads (files will actually be uploaded to bucket)...');
              
              try {
                const testData = generateSampleData(0);
                
                // Add mock files
                const createMockFile = (fileName: string, content: string): File => {
                  const blob = new Blob([content], { type: 'text/plain' });
                  return new File([blob], fileName, { type: 'text/plain' });
                };
                
                testData.logoAI = createMockFile('REAL-test-logo.ai', 'This is a REAL file upload test for AI logo');
                testData.logoJPEG = createMockFile('REAL-test-logo.jpg', 'This is a REAL file upload test for JPEG logo');
                testData.brandGuideline = createMockFile('REAL-test-brand.pdf', 'This is a REAL file upload test for brand guideline PDF');
                testData.supportingDocument = createMockFile('REAL-test-support.pdf', 'This is a REAL file upload test for supporting document');
                
                addLog('🚀 Attempting real S3 uploads...');
                const result = await ApplicationService.submitApplicationWithRealUploads(testData);
                
                if (result.success) {
                  addLog(`✅ REAL upload test successful! ID: ${result.applicationId}`);
                  addLog('📁 Files should now be visible in your S3 bucket!');
                  
                  // Fetch the application to see the real S3 URLs
                  const app = await ApplicationService.getApplication(result.applicationId!);
                  if (app?.applicationData?.fileUploads) {
                    const appData = app.applicationData;
                    addLog('\n🎯 REAL S3 Upload Results:');
                    
                    Object.entries(appData.fileUploads).forEach(([fileType, fileInfo]) => {
                      if (fileInfo && typeof fileInfo === 'object' && 'fileName' in fileInfo) {
                        addLog(`\n${fileType}:`);
                        addLog(`  📎 File: ${fileInfo.fileName}`);
                        addLog(`  🌐 S3 URL: ${fileInfo.s3Url}`);
                        addLog(`  ✅ Status: ACTUALLY UPLOADED TO S3!`);
                      }
                    });
                    
                    addLog(`\n🎊 SUCCESS! Check your S3 bucket for these files:`);
                    addLog(`   Bucket: amplify-amplifyvitereactt-whexpoapplicationstorage-msgwobtz08zz`);
                    addLog(`   Region: ap-east-1`);
                  }
                } else {
                  addLog(`❌ Real upload test failed: ${result.error}`);
                  addLog('💡 This is likely due to expired AWS credentials or permissions issues');
                }
              } catch (error) {
                addLog(`💥 Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
                addLog('💡 Common causes: expired AWS credentials, insufficient permissions, or network issues');
              } finally {
                setIsRunning(false);
              }
            }}
            disabled={isRunning}
            style={{
              padding: '12px 24px',
              fontSize: '16px',
              backgroundColor: isRunning ? '#ccc' : '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: isRunning ? 'not-allowed' : 'pointer'
            }}
          >
            🔥 Test REAL S3 Uploads
          </button>
        </div>
      </div>

      {results.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Summary</h3>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
            gap: '10px',
            marginBottom: '20px'
          }}>
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#d4edda', 
              border: '1px solid #c3e6cb',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <strong>✅ Successful</strong><br/>
              {successCount}/10
            </div>
            <div style={{ 
              padding: '15px', 
              backgroundColor: '#f8d7da', 
              border: '1px solid #f5c6cb',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <strong>❌ Failed</strong><br/>
              {failureCount}/10
            </div>
          </div>
        </div>
      )}

      {results.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <h3>Results</h3>
          <div style={{ 
            display: 'grid', 
            gap: '10px',
            maxHeight: '400px',
            overflowY: 'auto',
            border: '1px solid #ddd',
            padding: '10px',
            borderRadius: '4px'
          }}>
            {results.map((result, index) => (
              <div 
                key={index}
                style={{
                  padding: '10px',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  backgroundColor: result.success ? '#d4edda' : '#f8d7da'
                }}
              >
                <strong>#{result.index}</strong> - {result.company || 'Unknown Company'}
                {result.success ? (
                  <div>
                    <div>✅ <strong>Success</strong></div>
                    <div><small>ID: {result.applicationId}</small></div>
                    <div><small>Category: {result.category}</small></div>
                  </div>
                ) : (
                  <div>
                    <div>❌ <strong>Failed</strong></div>
                    <div><small>Error: {result.error}</small></div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <h3>Logs</h3>
        <div style={{
          backgroundColor: '#f8f9fa',
          border: '1px solid #dee2e6',
          borderRadius: '4px',
          padding: '15px',
          height: '400px',
          overflowY: 'auto',
          fontFamily: 'monospace',
          fontSize: '14px',
          whiteSpace: 'pre-wrap'
        }}>
          {logs.length === 0 ? (
            <div style={{ color: '#6c757d' }}>No logs yet. Click "Run Sample Submissions" to start.</div>
          ) : (
            logs.map((log, index) => (
              <div key={index} style={{ marginBottom: '2px' }}>
                {log}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SampleSubmissions; 