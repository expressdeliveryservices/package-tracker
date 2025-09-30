// Get HTML elements
const trackBtn = document.getElementById('trackBtn');
const trackingInput = document.getElementById('trackingInput');
const trackingResult = document.getElementById('trackingResult');

// Initialize Leaflet map
let map = L.map('map').setView([40.7510, -73.9496], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

// HQ marker
const hqMarker = L.marker([40.7492, -73.9476]).addTo(map)
    .bindPopup("HQ: 47-00 Northern Blvd, Long Island City, NY 11101")
    .openPopup();

let packageMarker;

// Click event to track package
trackBtn.addEventListener('click', async () => {
    const trackingNumber = trackingInput.value.trim();
    if (!trackingNumber) return alert("Enter a tracking number");

    try {
        // Fetch shipment data from admin folder
        const response = await fetch('https://yourusername.github.io/package-tracker/admin/shipments.json');
        if (!response.ok) throw new Error("Failed to fetch shipment data");

        const shipments = await response.json();
        const pkg = shipments.find(s => s.tracking_number.toUpperCase() === trackingNumber.toUpperCase());

        if (!pkg) {
            trackingResult.innerHTML = "<p>Package not found</p>";
            return;
        }

        // Display shipment details
        trackingResult.innerHTML = `
            <h3>Shipment Details</h3>
            <p><strong>Tracking Number:</strong> ${pkg.tracking_number}</p>
            <p><strong>Sender:</strong> ${pkg.sender}</p>
            <p><strong>Receiver:</strong> ${pkg.receiver}</p>
            <p><strong>Status:</strong> ${pkg.status}</p>
            <p><strong>Origin:</strong> ${pkg.origin}</p>
            <p><strong>Destination:</strong> ${pkg.destination}</p>
            <p><strong>Expected Delivery:</strong> ${pkg.expected_delivery}</p>
            <p><strong>Note:</strong> ${pkg.extended_description}</p>
        `;

        // Update map marker if coordinates exist
        if (pkg.location && pkg.location.lat && pkg.location.lng) {
            if (!packageMarker) {
                packageMarker = L.marker([pkg.location.lat, pkg.location.lng]).addTo(map);
            } else {
                packageMarker.setLatLng([pkg.location.lat, pkg.location.lng]);
            }
            map.setView([pkg.location.lat, pkg.location.lng], 13);
        }

    } catch (err) {
        console.error(err);
        trackingResult.innerHTML = "<p>Error fetching shipment data. Try again later.</p>";
    }
});
