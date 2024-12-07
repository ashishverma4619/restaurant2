import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../services/api";

const MenuSection = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get("/menu");
        setMenuItems(response.data);
        toast.success("Menu items loaded successfully!");
      } catch (error) {
        console.error("Error fetching menu items:", error);
        toast.error("Failed to fetch menu items!");
      }
    };
    fetchMenu();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this item?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/menu/${id}`);
      setMenuItems((prevItems) => prevItems.filter((item) => item._id !== id)); // Update UI
      toast.success("Menu item deleted successfully!");
    } catch (error) {
      console.error("Error deleting menu item:", error);
      toast.error("Failed to delete menu item!");
    }
  };

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
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px",
  };

  const listItemStyle = {
    backgroundColor: "#fff",
    padding: "15px",
    borderRadius: "6px",
    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };

  const imageStyle = {
    width: "100%",
    height: "200px",
    objectFit: "cover",
    borderRadius: "6px",
    marginBottom: "10px",
  };

  const deleteButtonStyle = {
    marginTop: "10px",
    padding: "8px 12px",
    backgroundColor: "#e74c3c",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "14px",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Menu Items</h2>
      <ul style={listStyle}>
        {menuItems.map((item) => (
          <li key={item._id} style={listItemStyle}>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
                style={imageStyle}
              />
            )}
            <div>
              <strong>{item.name}</strong>
              <p>Price: ${item.price}</p>
              <button
                style={deleteButtonStyle}
                onClick={() => handleDelete(item._id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
      <ToastContainer position="top-right" autoClose={3000} />
    </section>
  );
};

export default MenuSection;
