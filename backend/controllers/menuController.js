const Menu = require("../models/Menu");
const cloudinary = require("../config/cloudinaryConfig");

exports.getMenu = async (req, res) => {
  try {
    const menu = await Menu.find();
    res.json(menu);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.addMenu = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    let imageUrl = null;
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "restaurant-menu",
      });
      imageUrl = result.secure_url;
    }

    const newItem = new Menu({
      name,
      price,
      category,
      image: imageUrl,
    });

    const menu = await newItem.save();
    res.json(menu);
  } catch (err) {
    res.status(500).send("Server Error");
  }
};

exports.deleteMenu = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the menu item by ID
    const menuItem = await Menu.findById(id);

    if (!menuItem) {
      return res.status(404).send("Menu item not found");
    }

    // Remove the image from Cloudinary if it exists
    if (menuItem.image) {
      const publicId = menuItem.image.split('/').pop().split('.')[0]; // Extract public ID
      await cloudinary.uploader.destroy(`restaurant-menu/${publicId}`);
    }

    // Remove the menu item from the database
    await Menu.findByIdAndDelete(id);

    res.json({ message: "Menu item deleted successfully" });
  } catch (err) {
    res.status(500).send("Server Error");
  }
};
