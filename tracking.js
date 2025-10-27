// tracking.js (updated for backend and Leaflet)
const API_BASE_URL = 'https://your-render-app.onrender.com'; // Replace with your Render URL

const trackBtn = document.getElementById('trackBtn');
const trackingInput = document.getElementById('trackingInput');
const trackingResult = document.getElementById('trackingResult');

// Initialize Leaflet map
let map = L.map('receiverMap').setView([40.7532, -73.9496], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

let packageMarker;

// Click event to track package
trackBtn.addEventListener('click', async () => {
  const trackingNumber = trackingInput.value.trim().toUpperCase();
  if (!trackingNumber) {
    trackingResult.innerHTML = "<p>Please enter a tracking number.</p>";
    return;
  }

  try {
    const response = await fetch(`${API_BASE_URL}/shipments/${trackingNumber}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    const pkg = await response.json();

    if (!pkg) {
      trackingResult.innerHTML = "<p>Package not found.</p>";
      return;
    }

    if (!isValidShipment(pkg)) {
      trackingResult.innerHTML = "<p>Invalid shipment data. Please contact support.</p>";
      return;
    }

    trackingResult.innerHTML = generateReceiptContent(pkg);
    trackingResult.style.display = 'block';

    if (pkg.receiver && pkg.receiver.lat && pkg.receiver.lng) {
      const lat = parseFloat(pkg.receiver.lat);
      const lng = parseFloat(pkg.receiver.lng);
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        if (!packageMarker) {
          packageMarker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`Package: ${pkg.trackingNumber}<br>Location: ${pkg.receiver.address || 'Current Location'}`);
        } else {
          packageMarker.setLatLng([lat, lng]).setPopupContent(`Package: ${pkg.trackingNumber}<br>Location: ${pkg.receiver.address || 'Current Location'}`);
        }
        map.setView([lat, lng], 13);
      } else {
        console.warn('Invalid coordinates:', pkg.receiver);
      }
    }
  } catch (err) {
    console.error('Error fetching shipment data:', err);
    trackingResult.innerHTML = "<p>Error fetching shipment data. Please try again later.</p>";
  }
});