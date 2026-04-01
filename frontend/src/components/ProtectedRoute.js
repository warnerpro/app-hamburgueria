import React from 'react';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!user) {
    return <div>Não autenticado. Faça login primeiro.</div>;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <div>Acesso negado. Você não tem permissão para acessar esta página.</div>;
  }

  return children;
};

export default ProtectedRoute;
