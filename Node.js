// node.js
require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const { getPackage, savePackage } = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Nodemailer setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Newsletter subscription
app.post('/api/newsletter', (req, res) => {
  const { email } = req.body;
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email' });
  }
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: 'Expressdeliveryservice0016@gmail.com',
    subject: 'New Newsletter Subscription',
    text: `New subscriber email: ${email}`,
  };
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Email error:', error);
      return res.status(500).json({ error: 'Failed to send email' });
    }
    res.status(200).json({ success: true, message: 'Email sent' });
  });
});

// Get shipment by tracking number
app.get('/api/shipments/:trackingNumber', async (req, res) => {
  try {
    const shipment = await getPackage(req.params.trackingNumber);
    if (!shipment) {
      return res.status(404).json({ error: 'Shipment not found' });
    }
    res.json(shipment);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Save or update shipment
app.post('/api/shipments', async (req, res) => {
  try {
    const shipmentData = req.body;
    if (!shipmentData.trackingNumber) {
      return res.status(400).json({ error: 'Tracking number required' });
    }
    const shipment = await savePackage(shipmentData);
    res.json({ success: true, trackingNumber: shipment.trackingNumber });
  } catch (err) {
    res.status(400).json({ error: 'Invalid data' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => res.send('Backend works!'));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));