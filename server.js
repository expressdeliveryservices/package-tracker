const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./db');
const path = require('path');

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname)); // serve index.html & static files

// Sample tracking API
app.post('/track', async (req, res) => {
  const { trackingNumber } = req.body;
  const data = await db.getTracking(trackingNumber); // from db.js
  res.json(data || { status: 'Not Found' });
});

// Newsletter subscription API
app.post('/subscribe', async (req, res) => {
  const { email } = req.body;
  await db.addSubscriber(email);
  res.json({ success: true });
});

// Serve index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
