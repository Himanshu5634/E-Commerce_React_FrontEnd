import React from "react";
import "./order.scss"; // Import SCSS file
import { useSelector } from "react-redux";

const Order = () => {
  const orders = useSelector((state) => state.orderSlice.orders);

  return (
    <div className="order-container">
      <h2>My Orders</h2>
      {orders.length === 0 ? (
        <p className="no-orders">No orders found.</p>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div className="order-card" key={index}>
              <h3>Order ID: {order.item.cartItemId}</h3>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong>User:</strong> {order.userId}</p>
              
              <div className="product-info">
                <img src={order.item.thumbnail} alt={order.item.title} />
                <div className="product-details">
                  <p><strong>{order.item.title}</strong></p>
                  <p>{order.description}</p>
                  <p><strong>Category:</strong> {order.item.category}</p>
                  <p><strong>Brand:</strong> {order.item.brand}</p>
                  <p><strong>Price:</strong> ${order.item.price}</p>
                  <p><strong>Quantity:</strong> {order.item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Order;
