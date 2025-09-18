const mongoose = require("mongoose");

const updateSchema = new mongoose.Schema({
  time: String,
  location: String,
  status: String
});

const packageSchema = new mongoose.Schema({
  trackingNumber: { type: String, required: true, unique: true },
  destination: { type: String, required: true },
  updates: [updateSchema]
});

module.exports = mongoose.model("Package", packageSchema);
