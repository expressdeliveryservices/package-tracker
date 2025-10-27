// tracking.js
// Get HTML elements
const trackBtn = document.getElementById('trackBtn');
const trackingInput = document.getElementById('trackingInput');
const trackingResult = document.getElementById('trackingResult');

// Initialize Leaflet map
let map;
try {
  map = L.map('map').setView([40.7510, -73.9496], 12);
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
  }).addTo(map);

  // HQ marker
  const hqMarker = L.marker([40.7492, -73.9476]).addTo(map)
    .bindPopup("HQ: 47-00 Northern Blvd, Long Island City, NY 11101")
    .openPopup();
} catch (err) {
  console.error('Error initializing map:', err);
  trackingResult.innerHTML = "<p>Error loading map. Please try again later.</p>";
}

let packageMarker;

// Click event to track package
trackBtn.addEventListener('click', async () => {
  const trackingNumber = trackingInput.value.trim().toUpperCase();
  if (!trackingNumber) {
    trackingResult.innerHTML = "<p>Please enter a tracking number.</p>";
    return;
  }

  try {
    // Fetch shipment data
    const response = await fetch('/assets/shipments.json'); // Update to local path
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const shipments = await response.json();
    const pkg = shipments.find(s => (s.tracking_number || '').toString().toUpperCase() === trackingNumber);

    if (!pkg) {
      trackingResult.innerHTML = "<p>Package not found.</p>";
      return;
    }

    // Validate shipment data
    if (!isValidShipment(pkg)) {
      trackingResult.innerHTML = "<p>Invalid shipment data. Please contact support.</p>";
      return;
    }

    // Display shipment details using generateReceiptContent
    trackingResult.innerHTML = generateReceiptContent(pkg);
    trackingResult.style.display = 'block';

    // Update map marker if coordinates exist
    if (pkg.location && pkg.location.lat && pkg.location.lng) {
      const lat = parseFloat(pkg.location.lat);
      const lng = parseFloat(pkg.location.lng);
      if (!isNaN(lat) && !isNaN(lng) && lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180) {
        if (!packageMarker) {
          packageMarker = L.marker([lat, lng]).addTo(map)
            .bindPopup(`Package: ${pkg.tracking_number}<br>Location: ${pkg.location.address || 'Current Location'}`);
        } else {
          packageMarker.setLatLng([lat, lng]).setPopupContent(`Package: ${pkg.tracking_number}<br>Location: ${pkg.location.address || 'Current Location'}`);
        }
        map.setView([lat, lng], 13);
      } else {
        console.warn('Invalid coordinates:', pkg.location);
      }
    }

  } catch (err) {
    console.error('Error fetching shipment data:', err);
    trackingResult.innerHTML = "<p>Error fetching shipment data. Please try again later.</p>";
  }
});

// Validate shipment data
function isValidShipment(shipment) {
  const requiredFields = [
    'tracking_number', 'sender', 'receiver', 'status', 'origin',
    'destination', 'expected_delivery', 'extended_description'
  ];
  const missingFields = requiredFields.filter(field => {
    const value = shipment[field];
    return value === undefined || value === null || value === '' || value === 'N/A';
  });
  if (missingFields.length > 0) {
    console.warn(`Validation failed for shipment: Missing fields: ${missingFields.join(', ')}`);
    return false;
  }
  return true;
}
