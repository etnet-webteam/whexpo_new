import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthenticator } from '@aws-amplify/ui-react';

function Home() {
  const { user } = useAuthenticator();

  return (
    <div className="text-center p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Application Portal 🎉</h1>
      <p className="text-lg mb-2">Hello, {user?.username}!</p>
      <p className="mt-4">
        View or manage your applications on the{' '}
        <Link to="/applications" className="text-blue-500 hover:text-blue-700 underline">
          Applications Page
        </Link>
      </p>
    </div>
  );
}

export default Home; 