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

function Applications() {
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
      <div className="p-6">
        <div className="text-red-600 mb-4">
          <pre className="whitespace-pre-wrap font-mono text-sm bg-gray-100 p-4 rounded">
            {error}
          </pre>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
        <div className="mt-8">
          <button
            onClick={handleCreateSampleApplication}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Create Sample Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 w-full overflow-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Applications</h1>
        <button
          onClick={handleCreateSampleApplication}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          Create Sample Application
        </button>
      </div>

      {apps.length === 0 ? (
        <p>No applications found. Click the button above to create a sample application.</p>
      ) : (
        <table className="min-w-full bg-white rounded shadow">
          <thead>
            <tr className="bg-gray-100 text-left font-semibold text-sm uppercase">
              <th className="p-3">ID</th>
              <th className="p-3">Company Name</th>
              <th className="p-3">Entry Title</th>
              <th className="p-3">Award Category</th>
              <th className="p-3">Award Name</th>
              <th className="p-3">Owner</th>
            </tr>
          </thead>
          <tbody>
            {apps.map((app) => (
              <tr key={app.id} className="border-t">
                <td className="p-3">{app.id}</td>
                <td className="p-3">{app.company}</td>
                <td className="p-3">{app.title}</td>
                <td className="p-3">{app.category}</td>
                <td className="p-3">{app.award}</td>
                <td className="p-3">{app.owner}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default withAuthenticator(Applications);