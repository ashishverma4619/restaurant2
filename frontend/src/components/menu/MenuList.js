import React, { useEffect, useState } from "react";
import api from "../../services/api";
import './MenuList.css'; 

const MenuList = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await api.get("/menu");
        setMenu(response.data);
      } catch (error) {
        console.error("Error fetching menu:", error);
      }
    };
    fetchMenu();
  }, []);

  return (
    <div>
      <h2>Menu</h2>
      <div className="menu-container">
        {menu.map((item) => (
          <div key={item._id} className="menu-card">
            <h3>{item.name}</h3>
            <p className="price">${item.price}</p>
            <p className="category">Category: {item.category}</p>
            {item.image && (
              <img
                src={item.image}
                alt={item.name}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuList;
