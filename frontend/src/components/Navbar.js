import React from 'react';
import { Link } from 'react-router-dom';
import { FiHome, FiChef, FiBarChart3, FiLogOut, FiMenu } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  if (!user) return null;

  const modules = [
    { path: '/atendimento', label: 'Atendimento', icon: FiHome, roles: ['atendente', 'admin'] },
    { path: '/cozinha', label: 'Cozinha', icon: FiChef, roles: ['cozinheiro', 'admin'] },
    { path: '/gestao', label: 'Gestão', icon: FiBarChart3, roles: ['admin'] }
  ];

  const availableModules = modules.filter(m => m.roles.includes(user.role));

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          🍔 Hamburgueria
        </Link>

        <button 
          className="navbar-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <FiMenu />
        </button>

        <div className={`navbar-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="navbar-links">
            {availableModules.map(module => {
              const Icon = module.icon;
              return (
                <Link
                  key={module.path}
                  to={module.path}
                  className="navbar-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon /> {module.label}
                </Link>
              );
            })}
          </div>

          <div className="navbar-user">
            <span className="user-info">
              {user.name} ({user.role})
            </span>
            <button className="logout-btn" onClick={logout}>
              <FiLogOut /> Sair
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
