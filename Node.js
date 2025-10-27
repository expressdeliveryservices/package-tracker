require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB error:', err));

// Shipment Schema
const shipmentSchema = new mongoose.Schema({
  trackingNumber: { type: String, unique: true, required: true },
  content: String,
  origin: String,
  destination: String,
  estDeliveryDate: String,
  modeOfTransport: String,
  typeOfShipment: String,
  quantity: String,
  paymentMode: String,
  receipt: { companyName: String, amount: Number },
  sender: { name: String, address: String },
  receiver: { name: String, address: String, mobile: String, lat: Number, lng: Number },
  officialStamp: String,
  stampDate: String,
  timeline: [{ time: String, description: String, status: String, completed: Boolean }]
});
const Shipment = mongoose.model('Shipment', shipmentSchema);

// Routes
app.get('/api/test', (req, res) => res.send('Backend works!'));

// Get all shipments (for admin dropdown, if needed)
app.get('/api/shipments', async (req, res) => {
  try {
    const shipments = await Shipment.find();
    res.json(shipments);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get shipment by tracking number
app.get('/api/shipments/:trackingNumber', async (req, res) => {
  try {
    const shipment = await Shipment.findOne({ trackingNumber: req.params.trackingNumber });
    if (!shipment) return res.status(404).json({ error: 'Shipment not found' });
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save or update shipment
app.post('/api/shipments', async (req, res) => {
  try {
    const shipmentData = req.body;
    if (!shipmentData.trackingNumber) return res.status(400).json({ error: 'Tracking number required' });
    const shipment = await Shipment.findOneAndUpdate(
      { trackingNumber: shipmentData.trackingNumber },
      shipmentData,
      { upsert: true, new: true }
    );
    res.json({ success: true, trackingNumber: shipment.trackingNumber });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));