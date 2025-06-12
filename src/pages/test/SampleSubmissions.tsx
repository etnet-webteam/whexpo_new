import React, { useState } from 'react';
import { submitSampleApplications } from '../../scripts/submitSampleApplications';

const SampleSubmissions: React.FC = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [logs, setLogs] = useState<string[]>([]);
  const [skipFiles, setSkipFiles] = useState(true); // Default to skip files for easier testing

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

      const submissionResults = await submitSampleApplications(skipFiles);
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
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <input
              type="checkbox"
              checked={skipFiles}
              onChange={(e) => setSkipFiles(e.target.checked)}
              disabled={isRunning}
            />
            Skip file uploads (recommended for testing)
          </label>
          <small style={{ color: '#666', marginLeft: '24px' }}>
            {skipFiles ? 'Applications will be submitted without files for faster testing' : 'Applications will include mock file uploads (may require storage permissions)'}
          </small>
        </div>
        
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