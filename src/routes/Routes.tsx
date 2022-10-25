import { Routes as ReactDOMRoutes, Route } from 'react-router-dom';

import Home from 'pages/home';
import Login from 'pages/login';
import Order from 'pages/order';
import Product from 'pages/product';
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
    <Route
      path="order"
      element={
        <ProtectedRoute>
          <Order />
        </ProtectedRoute>
      }
    />
    <Route
      path="product"
      element={
        <ProtectedRoute>
          <Product />
        </ProtectedRoute>
      }
    />
  </ReactDOMRoutes>
);

export default Routes;
