function CustomerList({ customers }) {
    return (
      <div>
        <h3>Customers</h3>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Contact</th>
              <th>Outstanding</th>
              <th>Due Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td>{customer.name}</td>
                <td>{customer.contact}</td>
                <td>{customer.outstandingAmount}</td>
                <td>{customer.dueDate}</td>
                <td>{customer.paymentStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  
  export default CustomerList;