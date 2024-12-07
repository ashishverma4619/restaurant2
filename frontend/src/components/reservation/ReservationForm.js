import React, { useState } from "react";
import api from "../../services/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ReservationForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(1);
  const [selectedTable, setSelectedTable] = useState(null);

  const handleReservation = async () => {
    if (!selectedTable) {
      alert("Please select a table.");
      return;
    }

    try {
      const reservationData = {
        name,
        email,
        date,
        time,
        guests,
        table: selectedTable,
        status: "pending", // default status for new reservation
      };
      // Send reservation data to the backend
      await api.post("/reservations", reservationData);
      toast.success("Reservation made successfully!");
      setName("");
      setEmail("");
      setDate("");
      setTime("");
      setGuests(1);
      setSelectedTable(null);
    } catch (error) {
      toast.error("Error making reservation:", error);
    }
  };

  // Generate table numbers and mark first 10 as VIP
  const generateTables = () => {
    const tables = [];
    for (let i = 1; i <= 100; i++) {
      tables.push({
        number: i,
        isVIP: i <= 10,
      });
    }
    return tables;
  };

  return (
    <div>
      <div style={{ marginBottom: "40px" }}>
        {/* Table Selection */}
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Select a Table</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(10, 1fr)", gap: "10px", padding: "0 20px" }}>
          {generateTables().map((table) => (
            <div
              key={table.number}
              style={{
                padding: "10px",
                backgroundColor: table.number === selectedTable ? "#27ae60" : (table.isVIP ? "#f1c40f" : "#3498db"),
                color: "white",
                borderRadius: "4px",
                textAlign: "center",
                cursor: "pointer",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                fontWeight: "bold",
              }}
              onClick={() => setSelectedTable(table.number)}
            >
              Table {table.number} {table.isVIP ? "(VIP)" : ""}
            </div>
          ))}
        </div>
      </div>

      {/* Reservation Form */}
      <div style={{ padding: "20px", maxWidth: "500px", margin: "0 auto", backgroundColor: "#f9f9f9", borderRadius: "8px", boxShadow: "0 4px 8px rgba(0,0,0,0.1)" }}>
        <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Reserve a Table</h2>
        <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} style={inputStyle} />
        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={inputStyle} />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={inputStyle} />
        <input type="number" placeholder="Guests" value={guests} onChange={(e) => setGuests(parseInt(e.target.value, 10) )} style={inputStyle} />
        <button onClick={handleReservation} style={buttonStyle}>Reserve</button>
      </div>
      <ToastContainer/>
    </div>
  
  );
};

// Inline CSS for input fields
const inputStyle = {
  padding: "10px",
  fontSize: "16px",
  borderRadius: "4px",
  border: "1px solid #ddd",
  width: "100%",
  marginBottom: "15px",
  boxSizing: "border-box",
};

const buttonStyle = {
  backgroundColor: "#e67e22",
  color: "white",
  padding: "10px 20px",
  fontSize: "16px",
  border: "none",
  borderRadius: "4px",
  cursor: "pointer",
  width: "100%",
  marginTop: "20px",
};

export default ReservationForm;
