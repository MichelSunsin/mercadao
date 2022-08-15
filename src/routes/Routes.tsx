import { Routes as ReactDOMRoutes, Route } from 'react-router-dom';

import Home from 'pages/home';
import Login from 'pages/login';
import Order from 'pages/order';
import ProtectedRoute from 'routes/ProtectedRoute';

const Routes = () => (
  <ReactDOMRoutes>
    <Route path="/login" element={<Login />} />
    <Route
      path="home"
      element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      }
    />
    <Route
      path="order"
      element={
        <ProtectedRoute>
          <Order />
        </ProtectedRoute>
      }
    />
  </ReactDOMRoutes>
);

export default Routes;
