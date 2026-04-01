import React, { useState, useEffect } from 'react';
import { orderService } from '../services/api';
import '../styles/Cozinha.css';

const Cozinha = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pendente');

  useEffect(() => {
    fetchOrders();
    const interval = setInterval(fetchOrders, 5000); // Atualizar a cada 5 segundos
    return () => clearInterval(interval);
  }, [filter]);

  const fetchOrders = async () => {
    try {
      const response = await orderService.list(filter === 'todos' ? null : filter);
      setOrders(response.data);
    } catch (error) {
      console.error('Erro ao carregar pedidos:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId, newStatus) => {
    try {
      await orderService.updateStatus(orderId, newStatus);
      fetchOrders();
    } catch (error) {
      console.error('Erro ao atualizar pedido:', error);
    }
  };

  if (loading) return <div className="loading">Carregando...</div>;

  return (
    <div className="cozinha-container">
      <h1>👨‍🍳 Módulo de Cozinha</h1>

      <div className="filter-section">
        <button
          className={filter === 'pendente' ? 'active' : ''}
          onClick={() => setFilter('pendente')}
        >
          Pendentes
        </button>
        <button
          className={filter === 'em_preparo' ? 'active' : ''}
          onClick={() => setFilter('em_preparo')}
        >
          Em Preparo
        </button>
        <button
          className={filter === 'todos' ? 'active' : ''}
          onClick={() => setFilter('todos')}
        >
          Todos
        </button>
      </div>

      <div className="orders-board">
        {orders.map(order => (
          <div key={order.id} className={`order-ticket ${order.status}`}>
            <h3>{order.orderNumber}</h3>
            <div className="order-items">
              {order.OrderItems?.map(item => (
                <div key={item.id} className="item">
                  <span>{item.quantity}x {item.Product?.name}</span>
                </div>
              ))}
            </div>
            {order.notes && <p className="notes">📝 {order.notes}</p>}
            <div className="actions">
              <button
                className="btn-preparing"
                onClick={() => updateOrderStatus(order.id, 'em_preparo')}
                disabled={order.status !== 'pendente'}
              >
                Iniciando...
              </button>
              <button
                className="btn-ready"
                onClick={() => updateOrderStatus(order.id, 'pronto')}
                disabled={order.status !== 'em_preparo'}
              >
                Pronto!
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Cozinha;
