import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Authenticator } from '@aws-amplify/ui-react';
import App from "./App.tsx";
import Home from './Home';
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import '@aws-amplify/ui-react/styles.css';

Amplify.configure(outputs);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Authenticator>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/backend" element={<App />} />
      </Routes>
    </BrowserRouter>
    </Authenticator>
  </React.StrictMode>
);
