import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const AppRoutes: React.FC = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route
        path="/dashboard"
        element={
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        }
      />
      {/* Página 404 */}
      <Route
        path="*"
        element={<div className="p-8 text-center text-2xl">404 - Página no encontrada</div>}
      />
    </Routes>
  </Router>
);

export default AppRoutes;
