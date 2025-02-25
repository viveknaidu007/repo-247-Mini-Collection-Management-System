function NotificationCenter({ notifications }) {
    return (
      <div>
        <h3>Notifications</h3>
        <ul>
          {notifications.map((notif, index) => (
            <li key={index}>
              {notif.type === 'NEW_CUSTOMER' && `New customer added: ${notif.data.name}`}
              {notif.type === 'PAYMENT_RECEIVED' && `Payment received for customer ${notif.data.customerId}`}
            </li>
          ))}
        </ul>
      </div>
    );
  }
  
  export default NotificationCenter;