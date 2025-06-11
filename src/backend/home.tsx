import React, { useEffect, useState } from 'react';
import { generateClient } from '@aws-amplify/api';
import { withAuthenticator } from '@aws-amplify/ui-react';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const client = generateClient();

interface Application {
  id: string;
  company: string;
  title: string;
  category: string;
  award: string;
  owner?: string;
}

interface ListApplicationsQuery {
  listApplications: {
    items: Application[];
  };
}

interface CreateApplicationMutation {
  createApplication: Application;
}

function BackendHome() {
  const [apps, setApps] = useState<Application[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchApps = async () => {
      try {
        const response = await client.graphql({
          query: `
            query ListApplications {
              listApplications {
                items {
                  id
                  company
                  title
                  category
                  award
                  owner
                }
              }
            }
          `
        }) as GraphQLResult<ListApplicationsQuery>;
        console.log('GraphQL Response:', response);
        if (response.data?.listApplications?.items) {
          setApps(response.data.listApplications.items);
        }
        setError(null);
      } catch (err: any) {
        console.error('Error details:', {
          message: err.message,
          errors: err.errors,
          stack: err.stack
        });

        setError(`Error: ${err.message}`);
      }
    };

    fetchApps();
  }, []);

  const handleCreateSampleApplication = async () => {
    try {
      const response = await client.graphql({
        query: `
          mutation CreateApplication($input: CreateApplicationInput!) {
            createApplication(input: $input) {
              id
              company
              title
              category
              award
              owner
            }
          }
        `,
        variables: {
          input: {
            company: "Sample Company",
            title: "Sample Entry",
            category: "Innovation",
            award: "Best Innovation"
          }
        }
      }) as GraphQLResult<CreateApplicationMutation>;

      console.log('Creation response:', response);
      if (response.data?.createApplication) {
        setApps(prev => [...prev, response.data.createApplication]);
      }
    } catch (err: any) {
      console.error('Creation error details:', {
        message: err.message,
        errors: err.errors,
        stack: err.stack
      });

      setError(`Error: ${err.message}`);
    }
  };

  if (error) {
    return (
      <div className="backend-applications">
        <div className="backend-error">
          <pre>
            {error}
          </pre>
          <button onClick={() => window.location.reload()} className="backend-btn retry">
            Retry
          </button>
        </div>
        <div style={{ marginTop: '2rem' }}>
          <button onClick={handleCreateSampleApplication} className="backend-btn">
            Create Sample Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="backend-applications">
      <div className="backend-header">
        <h1 className="backend-title">Applications</h1>
        <button onClick={handleCreateSampleApplication} className="backend-btn">
          Create Sample Application
        </button>
      </div>

      {apps.length === 0 ? (
        <p className="backend-no-data">No applications found. Click the button above to create a sample application.</p>
      ) : (
        <table className="backend-table">
          <thead>
            <tr className="backend-table-header">
              <th>ID</th>
              <th>Company Name</th>
              <th>Entry Title</th>
              <th>Award Category</th>
              <th>Award Name</th>
              <th>Owner</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.id} className="backend-table-row">
                <td className="backend-table-cell">{app.id}</td>
                <td className="backend-table-cell">{app.company}</td>
                <td className="backend-table-cell">{app.title}</td>
                <td className="backend-table-cell">{app.category}</td>
                <td className="backend-table-cell">{app.award}</td>
                <td className="backend-table-cell">{app.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default withAuthenticator(BackendHome); 