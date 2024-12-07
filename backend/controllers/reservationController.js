const Reservation = require("../models/Reservation");
const nodemailer = require("nodemailer");
require("dotenv").config(); 


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendEmail = (reservation) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: "averma3262@gmail.com",
    subject: `New Reservation for Table ${reservation.table}`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
        <h2 style="color: #007bff; text-align: center;">New Reservation Alert</h2>
        <p style="font-size: 16px;">A new reservation has been made:</p>
        <ul style="font-size: 16px; line-height: 1.6;">
          <li><strong>Name:</strong> ${reservation.name}</li>
          <li><strong>Email:</strong> ${reservation.email}</li>
          <li><strong>Date:</strong> ${reservation.date}</li>
          <li><strong>Time:</strong> ${reservation.time}</li>
          <li><strong>Guests:</strong> ${reservation.guests}</li>
          <li><strong>Table:</strong> ${reservation.table}</li>
        </ul>
        <p style="margin-top: 20px; font-size: 14px; color: #666;">Please check the reservation system for more details.</p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending email:", error);
    } else {
      console.log("Email sent:", info.response);
    }
  });
};



const sendApprovalEmail = (reservation) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: reservation.email,
    subject: `Your Reservation at Our Restaurant - Approved`,
    html: `
      <div style="font-family: Arial, sans-serif; color: #333; border: 1px solid #ddd; padding: 20px; background-color: #f9f9f9; border-radius: 5px;">
        <h2 style="color: #28a745; text-align: center;">Reservation Approved</h2>
        <p style="font-size: 16px;">Dear <strong>${reservation.name}</strong>,</p>
        <p style="font-size: 16px;">We are pleased to inform you that your reservation has been approved. Below are the details:</p>
        <ul style="font-size: 16px; line-height: 1.6;">
          <li><strong>Date:</strong> ${reservation.date}</li>
          <li><strong>Time:</strong> ${reservation.time}</li>
          <li><strong>Guests:</strong> ${reservation.guests}</li>
          <li><strong>Table:</strong> ${reservation.table}</li>
        </ul>
        <p style="font-size: 16px;">We look forward to serving you!</p>
        <p style="margin-top: 20px; font-size: 14px;">Best regards,<br><strong>Your Restaurant Name</strong></p>
      </div>
    `,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log("Error sending approval email:", error);
    } else {
      console.log("Approval email sent to user:", info.response);
    }
  });
};


exports.getReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};


exports.addReservation = async (req, res) => {
  try {
    const newReservation = new Reservation(req.body);
    const reservation = await newReservation.save();
   
    sendEmail(reservation);
    
    res.json(reservation);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};


exports.approveReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }
    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ message: "Error updating reservation" });
  }
};



exports.approveReservation = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedReservation = await Reservation.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );
    
    if (!updatedReservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    
    sendApprovalEmail(updatedReservation);

    res.json(updatedReservation);
  } catch (err) {
    res.status(500).json({ message: "Error updating reservation" });
  }
};


