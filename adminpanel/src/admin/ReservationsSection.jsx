import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../services/api";

const ReservationsSection = () => {
  const [reservations, setReservations] = useState([]);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await api.get("/reservations");
        setReservations(response.data);
      } catch (error) {
        console.error("Error fetching reservations:", error);
        toast.error("Failed to fetch reservations!");
      }
    };
    fetchReservations();
  }, []);

  const approveReservation = async (id) => {
    try {
      await api.patch(`/reservations/${id}`, { status: "approved" });
      setReservations((prev) =>
        prev.map((reservation) =>
          reservation._id === id ? { ...reservation, status: "approved" } : reservation
        )
      );
      toast.success("Reservation approved successfully!");
    } catch (error) {
      console.error("Error approving reservation:", error);
      toast.error("Failed to approve reservation.");
    }
  };

  // Inline styles
  const sectionStyle = {
    padding: "20px",
    backgroundColor: "#f4f4f9",
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

  const cardStyle = {
    backgroundColor: "#fff",
    marginBottom: "20px",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  };

  const cardHeaderStyle = {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "15px",
    fontSize: "18px",
    fontWeight: "bold",
    color: "#333",
  };

  const cardBodyStyle = {
    fontSize: "16px",
    color: "#555",
    marginBottom: "10px",
  };

  const buttonStyle = {
    padding: "8px 16px",
    fontSize: "14px",
    backgroundColor: "#4caf50",
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    transition: "background-color 0.3s",
  };

  const disabledButtonStyle = {
    backgroundColor: "#ccc",
    cursor: "not-allowed",
  };

  return (
    <section style={sectionStyle}>
      <h2 style={headingStyle}>Reservations</h2>
      <ul style={listStyle}>
        {reservations.map((reservation) => (
          <li key={reservation._id} style={cardStyle}>
            <div style={cardHeaderStyle}>
              <span>{reservation.name}</span>
              <span>{reservation.status === "approved" ? "Approved" : "Pending"}</span>
            </div>
            <div style={cardBodyStyle}>
              <p><strong>Email:</strong>{reservation.email}</p>
              <p><strong>Date:</strong> {reservation.date}</p>
              <p><strong>Time:</strong> {reservation.time}</p>
              <p><strong>Table:</strong>{reservation.table}</p>
              <p><strong>Guests:</strong>{reservation.guests}</p>
            </div>
            <button
              onClick={() => approveReservation(reservation._id)}
              disabled={reservation.status === "approved"}
              style={{
                ...buttonStyle,
                ...(reservation.status === "approved" ? disabledButtonStyle : {}),
              }}
            >
              {reservation.status === "approved" ? "Approved" : "Approve"}
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default ReservationsSection;
