import { useState } from 'react';
import axios from 'axios';

function CustomerForm({ onCustomerAdded }) {
  const [customer, setCustomer] = useState({
    name: '', contact: '', outstandingAmount: '', dueDate: '',
  });
  const [file, setFile] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/customers`, customer, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      onCustomerAdded();
      setCustomer({ name: '', contact: '', outstandingAmount: '', dueDate: '' });
    } catch (error) {
      alert('Failed to add customer');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/customers/upload`, formData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      onCustomerAdded();
      setFile(null);
    } catch (error) {
      alert('File upload failed');
    }
  };

  return (
    <div>
      <h3>Add Customer</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={customer.name}
          onChange={(e) => setCustomer({ ...customer, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Contact"
          value={customer.contact}
          onChange={(e) => setCustomer({ ...customer, contact: e.target.value })}
        />
        <input
          type="number"
          placeholder="Outstanding Amount"
          value={customer.outstandingAmount}
          onChange={(e) => setCustomer({ ...customer, outstandingAmount: e.target.value })}
        />
        <input
          type="date"
          value={customer.dueDate}
          onChange={(e) => setCustomer({ ...customer, dueDate: e.target.value })}
        />
        <button type="submit">Add</button>
      </form>
      <h3>Upload Customers</h3>
      <form onSubmit={handleFileUpload}>
        <input type="file" onChange={(e) => setFile(e.target.files[0])} />
        <button type="submit">Upload</button>
      </form>
    </div>
  );
}

export default CustomerForm;