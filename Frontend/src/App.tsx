// src/App.tsx
import React from 'react';
import AppRoutes from './routes';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <AppRoutes />
    </div>
  );
};

export default App;
