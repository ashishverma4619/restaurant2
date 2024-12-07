import React from "react";
import "./HomePage.css";  
import {Link} from "react-router-dom"
function HomePage() {
  return (
    <div className="home-page">
   
      <div className="video-background">
        <video autoPlay muted loop className="video">
          <source src="https://videocdn.cdnpk.net/videos/6b032fd6-7548-4376-845f-f28eec522886/horizontal/previews/clear/small.mp4?token=exp=1733400678~hmac=9cc331b9c1cf469c50a8a848a7a77b1f80cef0ef481c87d2f29d9a833b09e1fe" type="video/mp4" />
        </video>
      </div>

      {/* Black overlay */}
      <div className="video-overlay"></div>

      <div className="content">
        <h1>Welcome to Our Restaurant</h1>
        <p>Experience the finest dining with exquisite flavors and exceptional service. Come for the food, stay for the experience.</p>
        <Link to="/reservation" className="btn">Reserve a Table</Link>
      </div>
    </div>
  );
}

export default HomePage;
