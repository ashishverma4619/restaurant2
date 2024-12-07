import React, { useState, useEffect } from "react";
import api from "../services/api";

const OrdersSection = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await api.get("/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);


  const sectionStyle = {
    padding: "20px",
    backgroundColor: "#f9f9f9",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "900px",
    margin: "0 auto",
  };

  const headingStyle = {
    textAlign: "center",
    fontSize: "24px",
    color: "#333",
    marginBottom: "20px",
  };

  const listStyle = {
    listStyleType: "none",
    padding: "0",
  };

  const listItemStyle = {
    backgroundColor: "#fff",
    marginBottom: "10px",
    padding: "15px",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
  };

  const orderDetailsStyle = {
    fontSize: "16px",
    color: "#555",
    marginTop: "10px",
  };

  const itemsListStyle = {
    listStyleType: "none",
    paddingLeft: "20px",
    fontSize: "14px",
    color: "#777",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Orders</h2>
      <ul style={listStyle}>
        {orders.map((order) => (
          <li key={order._id} style={listItemStyle}>
            <div style={orderDetailsStyle}>
              <strong>Order ID:</strong> {order._id} <br />
              <strong>Total:</strong> ${order.total}
            </div>
            <ul style={itemsListStyle}>
              {order.items.map((item, idx) => (
                <li key={idx}>
                  <strong>{item.name}</strong> - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default OrdersSection;
