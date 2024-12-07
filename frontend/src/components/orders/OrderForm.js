import React, { useState } from "react";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OrderForm = () => {
  const [items, setItems] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [total, setTotal] = useState(0);

  const menuItems = [
    { name: "Burger", category: "Fast Food", price: 5 },
    { name: "Pizza", category: "Italian Food", price: 10 },
    { name: "Pasta", category: "Italian Food", price: 8 },
    { name: "Butter Chicken", category: "Indian Food", price: 12 },
    { name: "Paneer Tikka", category: "Indian Food", price: 7 },
    { name: "Full Thali", category: "Full Thali", price: 15 }
  ];

  const handleOrder = async () => {
    try {
      await api.post("/orders", { items, total });
      toast.success("Order placed successfully!");
      setItems([{ name: "", quantity: 1, price: 0 }]);
      setTotal(0);
    } catch (error) {
      toast.error("Error placing order:", error);
    }
  };

  const handleItemSelect = (item) => {
    setItems([...items, { name: item.name, quantity: 1, price: item.price }]);
    setTotal(total + item.price); 
  };

  return (
    <div style={{ display: "flex", gap: "30px", padding: "20px", justifyContent: "space-between" }}>
      {/* Menu on the Left */}
      <div style={{ width: "40%", backgroundColor: "#f4f4f4", padding: "20px", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h3 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Menu</h3>
        {menuItems.map((item, index) => (
          <div key={index} style={{ marginBottom: "15px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: "16px", color: "#333" }}>{item.name} ({item.category})</span>
            <span style={{ fontSize: "16px", color: "#333" }}>${item.price}</span>
            <button
              onClick={() => handleItemSelect(item)}
              style={{
                backgroundColor: "#4CAF50",
                color: "white",
                padding: "5px 10px",
                fontSize: "14px",
                border: "none",
                borderRadius: "4px",
                cursor: "pointer"
              }}
            >
              Add
            </button>
          </div>
        ))}
      </div>

      {/* Order Form on the Right */}
      <div style={{ width: "55%", padding: "20px", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Place Order</h2>
        {items.map((item, index) => (
          <div key={index} style={{ marginBottom: "15px", display: "flex", gap: "10px", flexDirection: "column" }}>
            <input
              type="text"
              placeholder="Item name"
              value={item.name}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].name = e.target.value;
                setItems(newItems);
              }}
              style={{ padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ddd" }}
              disabled
            />
            <input
              type="number"
              placeholder="Quantity"
              value={item.quantity}
              onChange={(e) => {
                const newItems = [...items];
                newItems[index].quantity = parseInt(e.target.value, 10);
                setItems(newItems);
                setTotal(
                  newItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
                ); // Recalculate total based on quantity
              }}
              style={{ padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>
        ))}
        <div style={{ marginBottom: "20px" }}>
          <label style={{ fontSize: "16px", color: "#333" }}>Total:</label>
          <input
            type="number"
            value={total}
            onChange={(e) => setTotal(parseFloat(e.target.value) || 0)}
            style={{ padding: "10px", fontSize: "16px", borderRadius: "4px", border: "1px solid #ddd" }}
            disabled
          />
        </div>
        <button
          onClick={handleOrder}
          style={{
            backgroundColor: "#e67e22",
            color: "white",
            padding: "10px 20px",
            fontSize: "16px",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
            width: "100%"
          }}
        >
          Place Order
        </button>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default OrderForm;
