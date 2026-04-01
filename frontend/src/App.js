import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Atendimento from './pages/Atendimento';
import Cozinha from './pages/Cozinha';
import Gestao from './pages/Gestao';
import './App.css';

const AppContent = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <>
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route
            path="/atendimento"
            element={
              <ProtectedRoute allowedRoles={['atendente', 'admin']}>
                <Atendimento />
              </ProtectedRoute>
            }
          />

          <Route
            path="/cozinha"
            element={
              <ProtectedRoute allowedRoles={['cozinheiro', 'admin']}>
                <Cozinha />
              </ProtectedRoute>
            }
          />

          <Route
            path="/gestao"
            element={
              <ProtectedRoute allowedRoles={['admin']}>
                <Gestao />
              </ProtectedRoute>
            }
          />

          <Route path="/" element={user ? <Navigate to="/atendimento" /> : <Navigate to="/login" />} />
        </Routes>
      </main>
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
