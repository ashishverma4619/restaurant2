import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, NavLink,  } from "react-router-dom";
import './style.css';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faClipboardList, faCalendarAlt, faPlusCircle, faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

import MenuSection from "./MenuSection";
import OrdersSection from "./OrderSection";
import ReservationsSection from "./ReservationsSection";
import MenuForm from "./MenuForm";

const AdminPanel = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  // Check localStorage for saved credentials on page load
  useEffect(() => {
    const storedUser = localStorage.getItem("username");
    const storedPass = localStorage.getItem("password");
    if (storedUser === "admin" && storedPass === "admin123") {
      setIsAuthenticated(true);
    }
  }, []);

  // Handle login
  const handleLogin = (e) => {
    e.preventDefault();
    if (username === "admin" && password === "admin123") {
      localStorage.setItem("username", username);
      localStorage.setItem("password", password);
      setIsAuthenticated(true);
    } else {
      alert("Invalid username or password");
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("password");
    setIsAuthenticated(false);
    setUsername('');
    setPassword('');
  };

  // Render login form if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="login-container">
        <div className="login-modal">
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin}>
            <div>
              <label>Username:</label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit">Login</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="admin-container">
        <nav className="sidebar">
          <NavLink to="/menu" className="nav-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faUtensils} />
            <span>Menu</span>
          </NavLink>
          <NavLink to="/orders" className="nav-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faClipboardList} />
            <span>Orders</span>
          </NavLink>
          <NavLink to="/reservations" className="nav-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faCalendarAlt} />
            <span>Reservations</span>
          </NavLink>
          <NavLink to="/add-menu" className="nav-link" activeClassName="active-link">
            <FontAwesomeIcon icon={faPlusCircle} />
            <span>Add Menu Item</span>
          </NavLink>
          <button className="logout-button" onClick={handleLogout}>
            <FontAwesomeIcon icon={faSignOutAlt} />
            <span>Logout</span>
          </button>
        </nav>
        <div className="content">
          <h1>Admin Panel</h1>
          <Routes>
            <Route path="/menu" element={<MenuSection />} />
            <Route path="/orders" element={<OrdersSection />} />
            <Route path="/reservations" element={<ReservationsSection />} />
            <Route path="/add-menu" element={<MenuForm />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default AdminPanel;
