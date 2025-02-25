import { useState, useEffect } from 'react';
import axios from 'axios';
import CustomerList from '../components/CustomerList';
import CustomerForm from '../components/CustomerForm';
import PaymentForm from '../components/PaymentForm';
import NotificationCenter from '../components/NotificationCenter';

function Dashboard() {
  const [customers, setCustomers] = useState([]);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    fetchCustomers();
    setupWebSocket();
  }, []);

  const fetchCustomers = async () => {
    const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/customers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
    });
    setCustomers(data);
  };

  const setupWebSocket = () => {
    const ws = new WebSocket('ws://localhost:5000');
    ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      setNotifications((prev) => [...prev, message]);
      fetchCustomers(); // Refresh customers on update
    };
  };

  return (
    <div className="container">
      <h1>Collection Management</h1>
      <CustomerForm onCustomerAdded={fetchCustomers} />
      <PaymentForm customers={customers} onPaymentProcessed={fetchCustomers} />
      <CustomerList customers={customers} />
      <NotificationCenter notifications={notifications} />
    </div>
  );
}

export default Dashboard;