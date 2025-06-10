import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import { Amplify } from 'aws-amplify';
import awsconfig from './aws-exports';
import Applications from './Applications';
import BackendLayout from './BackendLayout';
import Home from './Home';

// Configure Amplify
Amplify.configure(awsconfig);

function App() {
  return (
    <Authenticator>
      <BrowserRouter>
        <Routes>
          <Route element={<BackendLayout />}>
            <Route index element={<Home />} />
            <Route path="applications" element={<Applications />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Authenticator>
  );
}

export default App;
