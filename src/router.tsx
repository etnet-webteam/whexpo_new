import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from './pages/Home';
import BackendHome from './backend/home';
import BackendLayout from './backend/BackendLayout';
import Form2025 from './pages/2025/Form';
import Home2025 from './pages/2025/Home';
import Winner2025 from './pages/2025/Winner';
import Judges2025 from './pages/2025/Judges';
import Highlights2025 from './pages/2025/Highlights';
import Column2025 from './pages/2025/Column';
import Events2025 from './pages/2025/Events';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'backend/*',
        element: <BackendLayout />,
        children: [
          {
            index: true,
            element: <BackendHome />,
          },
        ],
      },
      // Standalone form route (isolated from other 2025 pages)
      {
        path: '2025/form',
        element: <Form2025 />,
      },
      {
        path: '2025',
        children: [
          {
            index: true,
            element: <Home2025 />,
          },
          {
            path: 'winner',
            element: <Winner2025 />,
          },
          {
            path: 'judges',
            element: <Judges2025 />,
          },
          {
            path: 'highlights',
            element: <Highlights2025 />,
          },
          {
            path: 'column',
            element: <Column2025 />,
          },
          {
            path: 'events',
            element: <Events2025 />,
          },
        ],
      },
    ],
  },
]); 