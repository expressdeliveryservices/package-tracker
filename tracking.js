const express = require("express");
const router = express.Router();
const Package = require("../models/Package");

// Create a package
router.post("/create", async (req, res) => {
  try {
    const newPackage = new Package(req.body);
    await newPackage.save();
    res.json({ message: "Package created successfully", package: newPackage });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get tracking info
router.get("/:trackingNumber", async (req, res) => {
  try {
    const pkg = await Package.findOne({ trackingNumber: req.params.trackingNumber });
    if (!pkg) return res.status(404).json({ message: "Tracking number not found" });
    res.json(pkg);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update package
router.post("/update", async (req, res) => {
  try {
    const { trackingNumber, update } = req.body;
    const pkg = await Package.findOne({ trackingNumber });
    if (!pkg) return res.status(404).json({ message: "Package not found" });
    pkg.updates.push(update);
    await pkg.save();
    res.json({ message: "Update added", package: pkg });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
