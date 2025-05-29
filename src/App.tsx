import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import routes from './routes/routes';

function App() {
  // Create a router instance with our routes configuration
  const router = createBrowserRouter(routes);
  
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
