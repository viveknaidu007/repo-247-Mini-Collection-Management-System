import { useState } from 'react';
import axios from 'axios';

function PaymentForm({ customers, onPaymentProcessed }) {
  const [payment, setPayment] = useState({ customerId: '', amount: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/payments`, payment, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      onPaymentProcessed();
      setPayment({ customerId: '', amount: '' });
    } catch (error) {
      alert('Payment failed');
    }
  };

  return (
    <div>
      <h3>Process Payment</h3>
      <form onSubmit={handleSubmit}>
        <select
          value={payment.customerId}
          onChange={(e) => setPayment({ ...payment, customerId: e.target.value })}
        >
          <option value="">Select Customer</option>
          {customers.map((c) => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Amount"
          value={payment.amount}
          onChange={(e) => setPayment({ ...payment, amount: e.target.value })}
        />
        <button type="submit">Process</button>
      </form>
    </div>
  );
}

export default PaymentForm;