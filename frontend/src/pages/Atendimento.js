import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import '../styles/Atendimento.css';

const Atendimento = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newOrder, setNewOrder] = useState({ customerId: '', items: [] });

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await orderService.list();
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    try {
      await orderService.create(newOrder);
      setNewOrder({ customerId: '', items: [] });
      fetchOrders();
    } catch (error) {
      console.error('Erro ao criar pedido:', error);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="atendimento-container">
      <h1>📋 Módulo de Atendimento</h1>

      <div className="orders-section">
        <h2>Pedidos</h2>
        <div className="orders-grid">
          {orders.map(order => (
            <div key={order.id} className="order-card">
              <h3>{order.orderNumber}</h3>
              <p>Status: <span className={`status ${order.status}`}>{order.status}</span></p>
              <p>Total: R$ {parseFloat(order.totalAmount).toFixed(2)}</p>
              <small>Criado em: {new Date(order.createdAt).toLocaleDateString('pt-BR')}</small>
            </div>
          ))}
        </div>
      </div>

      <div className="new-order-section">
        <h2>Novo Pedido</h2>
        <form onSubmit={handleCreateOrder}>
          <input
            type="text"
            placeholder="ID do Cliente (opcional)"
            value={newOrder.customerId}
            onChange={(e) => setNewOrder({ ...newOrder, customerId: e.target.value || null })}
          />
          <button type="submit">Criar Pedido</button>
        </form>
      </div>
    </div>
  );
};

export default Atendimento;
