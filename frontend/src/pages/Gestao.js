import React, { useState, useEffect } from 'react';
import { productService, customerService, userService } from '../services/api';
import '../styles/Gestao.css';

const Gestao = () => {
  const [activeTab, setActiveTab] = useState('produtos');
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadData();
  }, [activeTab]);

  const loadData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'produtos') {
        const response = await productService.list();
        setProducts(response.data);
      } else if (activeTab === 'clientes') {
        const response = await customerService.list();
        setCustomers(response.data);
      }
    } catch (error) {
      console.error('Erro ao carregar dados:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este produto?')) {
      try {
        await productService.delete(id);
        loadData();
      } catch (error) {
        console.error('Erro ao deletar produto:', error);
      }
    }
  };

  const handleDeleteCustomer = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar este cliente?')) {
      try {
        await customerService.delete(id);
        loadData();
      } catch (error) {
        console.error('Erro ao deletar cliente:', error);
      }
    }
  };

  return (
    <div className="gestao-container">
      <h1>📊 Módulo de Gestão</h1>

      <div className="tabs">
        <button
          className={`tab ${activeTab === 'produtos' ? 'active' : ''}`}
          onClick={() => setActiveTab('produtos')}
        >
          Produtos
        </button>
        <button
          className={`tab ${activeTab === 'clientes' ? 'active' : ''}`}
          onClick={() => setActiveTab('clientes')}
        >
          Clientes
        </button>
        <button
          className={`tab ${activeTab === 'relatorios' ? 'active' : ''}`}
          onClick={() => setActiveTab('relatorios')}
        >
          Relatórios
        </button>
      </div>

      {loading ? (
        <div className="loading">Carregando...</div>
      ) : (
        <div className="tab-content">
          {activeTab === 'produtos' && (
            <div className="section">
              <h2>Gerenciar Produtos</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Categoria</th>
                    <th>Preço</th>
                    <th>Disponível</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(product => (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{product.category}</td>
                      <td>R$ {parseFloat(product.price).toFixed(2)}</td>
                      <td>{product.available ? '✅' : '❌'}</td>
                      <td>
                        <button className="btn-edit">Editar</button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'clientes' && (
            <div className="section">
              <h2>Gerenciar Clientes</h2>
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Nome</th>
                    <th>Email</th>
                    <th>Telefone</th>
                    <th>Status</th>
                    <th>Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {customers.map(customer => (
                    <tr key={customer.id}>
                      <td>{customer.name}</td>
                      <td>{customer.email || '-'}</td>
                      <td>{customer.phone || '-'}</td>
                      <td>{customer.status}</td>
                      <td>
                        <button className="btn-edit">Editar</button>
                        <button
                          className="btn-delete"
                          onClick={() => handleDeleteCustomer(customer.id)}
                        >
                          Deletar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'relatorios' && (
            <div className="section">
              <h2>Relatórios</h2>
              <div className="stats-grid">
                <div className="stat-card">
                  <h3>Total de Pedidos</h3>
                  <p className="stat-value">0</p>
                </div>
                <div className="stat-card">
                  <h3>Faturamento</h3>
                  <p className="stat-value">R$ 0,00</p>
                </div>
                <div className="stat-card">
                  <h3>Clientes</h3>
                  <p className="stat-value">{customers.length}</p>
                </div>
                <div className="stat-card">
                  <h3>Produtos</h3>
                  <p className="stat-value">{products.length}</p>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Gestao;
