import { Routes as ReactDOMRoutes, Route } from 'react-router-dom';

import Home from 'pages/home';
import Login from 'pages/login';
import ProtectedRoute from 'routes/ProtectedRoute';

const Routes = () => (
  <ReactDOMRoutes>
    <Route path="/login" element={<Login />} />
    <Route
      path="*"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
  </ReactDOMRoutes>
);

export default Routes;
