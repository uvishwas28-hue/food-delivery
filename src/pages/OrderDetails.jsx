import { Link, useParams } from 'react-router-dom'
import { initialOrders } from '../data/initialOrders'

function formatCurrency(amount) {
  return `₹${amount.toFixed(2)}`
}

function formatDate(value) {
  if (!value) return '—'
  return new Date(value).toLocaleString()
}

function DetailRow({ label, value }) {
  return (
    <div className="detail-row">
      <span className="detail-label">{label}</span>
      <span className="detail-value">{value}</span>
    </div>
  )
}

function OrderDetails() {
  const { id } = useParams()
  const order = initialOrders.find((o) => o.id === id)

  if (!order) {
    return (
      <div className="card">
        <h1>Order not found</h1>
        <p className="subtitle">No order exists with ID {id}.</p>
        <Link to="/orders" className="btn">
          Back to Orders
        </Link>
      </div>
    )
  }

  return (
    <div>
      <div className="page-header">
        <div>
          <h1>Order {order.id}</h1>
          <p className="subtitle">
            Placed on {formatDate(order.placedAt)} ·{' '}
            <span className={`badge status-${order.status.toLowerCase().replace(/\s+/g, '-')}`}>
              {order.status}
            </span>
          </p>
        </div>
        <Link to="/orders" className="btn secondary">
          Back to Orders
        </Link>
      </div>

      <div className="grid details-grid">
        <div className="card">
          <h2>Customer</h2>
          <DetailRow label="Name" value={order.customer.name} />
          <DetailRow label="Phone" value={order.customer.phone} />
          <DetailRow label="Email" value={order.customer.email} />
        </div>

        <div className="card">
          <h2>Restaurant</h2>
          <DetailRow label="Name" value={order.restaurant.name} />
          <DetailRow label="Cuisine" value={order.restaurant.cuisine} />
          <DetailRow label="Location" value={order.restaurant.location} />
        </div>

        <div className="card">
          <h2>Delivery</h2>
          <DetailRow label="Address" value={order.deliveryAddress.line1} />
          <DetailRow label="City" value={order.deliveryAddress.city} />
          <DetailRow label="Pincode" value={order.deliveryAddress.pincode} />
          <DetailRow label="Delivered At" value={formatDate(order.deliveredAt)} />
          <DetailRow label="Instructions" value={order.instructions || '—'} />
        </div>

        <div className="card">
          <h2>Payment & Partner</h2>
          <DetailRow label="Method" value={order.payment.method} />
          <DetailRow label="Payment Status" value={order.payment.status} />
          <DetailRow label="Transaction ID" value={order.payment.transactionId || '—'} />
          <DetailRow label="Delivery Partner" value={order.deliveryPartner.name || '—'} />
          <DetailRow label="Partner Phone" value={order.deliveryPartner.phone || '—'} />
          <DetailRow label="Vehicle" value={order.deliveryPartner.vehicle || '—'} />
        </div>
      </div>

      <div className="card">
        <h2>Items</h2>
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Item</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Line Total</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((item) => (
                <tr key={item.name}>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{formatCurrency(item.price)}</td>
                  <td>{formatCurrency(item.quantity * item.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="totals">
          <DetailRow label="Subtotal" value={formatCurrency(order.subtotal)} />
          <DetailRow label="Delivery Fee" value={formatCurrency(order.deliveryFee)} />
          <DetailRow label="Tax" value={formatCurrency(order.tax)} />
          <DetailRow label="Discount" value={`- ${formatCurrency(order.discount)}`} />
          <div className="detail-row total-row">
            <span className="detail-label">Total</span>
            <span className="detail-value">{formatCurrency(order.total)}</span>
          </div>
        </div>
      </div>

      <div className="card">
        <h2>Feedback</h2>
        <DetailRow label="Rating" value={order.rating ? `${order.rating} / 5` : 'Not rated'} />
        <DetailRow label="Comments" value={order.feedback || 'No feedback provided.'} />
      </div>
    </div>
  )
}

export default OrderDetails
