const express = require("express");
const router = express.Router();
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinaryConfig");
const menuController = require("../controllers/menuController");

// Cloudinary Storage Configuration
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "restaurant-menu",
    allowed_formats: ["jpg", "jpeg", "png","avif"],
  },
});
const upload = multer({ storage });

// Routes
router.get("/", menuController.getMenu);
router.post("/", upload.single("menuImage"), menuController.addMenu);
router.delete("/:id", menuController.deleteMenu); // Corrected to router.delete

module.exports = router;
