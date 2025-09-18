const trackBtn = document.getElementById('trackBtn');
const trackingInput = document.getElementById('trackingInput');
const trackingResult = document.getElementById('trackingResult');

let map = L.map('map').setView([40.7510, -73.9496], 12);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { attribution: '&copy; OpenStreetMap contributors' }).addTo(map);

const hqMarker = L.marker([40.7492, -73.9476]).addTo(map)
    .bindPopup("Express Delivery Services HQ: 47-00 Northern Blvd, Long Island City, NY 11101, USA").openPopup();

let packageMarker;

trackBtn.addEventListener('click', () => {
    const trackingNumber = trackingInput.value;
    const pkg = getPackage(trackingNumber);

    if (!pkg) {
        trackingResult.innerHTML = `<p>Package not found</p>`;
        return;
    }

    if (pkg.currentStage < pkg.statusStages.length - 1) pkg.currentStage += 1;

    let html = '';
    pkg.statusStages.forEach((stage, index) => {
        const indicator = index === pkg.currentStage ? '🟢' : '🔴';
        html += `<p>${indicator} ${stage}</p>`;
    });
    trackingResult.innerHTML = html;

    if (!packageMarker) {
        packageMarker = L.marker([pkg.location.lat, pkg.location.lng]).addTo(map);
    } else {
        packageMarker.setLatLng([pkg.location.lat, pkg.location.lng]);
    }
    map.setView([pkg.location.lat, pkg.location.lng], 13);
});
