import React from 'react';
import { createRoot } from 'react-dom/client';
import AppRouter from './router/AppRouter';
import { AuthProvider } from './context/AuthContext';

const container = document.getElementById('root');
console.log('ROOT:', container);

const root = createRoot(container);
root.render(
  <React.StrictMode>
    <AuthProvider>
      <AppRouter />
    </AuthProvider>
  </React.StrictMode>
);
