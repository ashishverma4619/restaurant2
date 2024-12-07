import React, { useState } from "react";
import api from ".././services/api";
import "./MenuForm.css";  

const MenuForm = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [menuImage, setMenuImage] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // state to manage popup visibility

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("menuImage", menuImage);

    try {
      const response = await api.post("/menu", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Show popup with success message
      setShowPopup(true);

      // Reset form fields
      setName("");
      setPrice("");
      setCategory("");
      setMenuImage(null);

      // Hide popup after 3 seconds
      setTimeout(() => setShowPopup(false), 3000);
    } catch (error) {
      console.error("Error adding menu item:", error);
      alert("Failed to add menu item. Please try again.");
    }
  };

  return (
    <div className="menu-form-container">
      <h2>Add Menu Item</h2>
      <form onSubmit={handleSubmit} className="menu-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="category">Category:</label>
          <input
            id="category"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="menuImage">Image:</label>
          <input
            id="menuImage"
            type="file"
            onChange={(e) => setMenuImage(e.target.files[0])}
            accept="image/*"
          />
        </div>
        <button type="submit" className="submit-btn">Add Item</button>
      </form>

      {/* Popup Box */}
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <span className="checkmark">&#10004;</span>
            <p>Menu item added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuForm;
