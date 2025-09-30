// Hamburger Menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

// Shipments array
let shipments = [];

// Load shipments from JSON
async function loadShipments() {
  try {
    const response = await fetch('https://expressdeliveryservices.github.io/shipments.json');
    if (!response.ok) throw new Error('Failed to fetch shipment data');
    shipments = await response.json();
    console.log('Shipments loaded:', shipments);
  } catch (err) {
    console.error(err);
    shipments = [];
  }
}

// Track Package (updated version)
async function trackPackage() {
  const input = document.getElementById('trackingNumber');
  const trackingDiv = document.getElementById('shipmentTracking');
  const contentDiv = document.getElementById('shipmentContent');

  if (!input) return;
  const number = input.value.trim();
  if (!number) { alert('Please enter a tracking number.'); return; }

  await loadShipments();

  const shipment = shipments.find(s => (s.trackingNumber || '').toLowerCase() === number.toLowerCase());
  if (!shipment) {
    alert('No shipment found for this tracking number.');
    trackingDiv.style.display = 'none';
    contentDiv.style.display = 'none';
    return;
  }

  trackingDiv.style.display = 'block';
  trackingDiv.innerHTML = '<div class="header">Tracking...</div>';
  contentDiv.style.display = 'none';

  setTimeout(() => {
    trackingDiv.innerHTML = '<div class="header">Tracking Shipment...</div>';

    setTimeout(() => {
      const safe = val => val || 'Unknown';
      trackingDiv.style.display = 'none';
      contentDiv.style.display = 'block';
      contentDiv.innerHTML = `
        <div style="position:relative;">
          <div class="watermark">CERTIFIED TRUE COPY</div>
          <div class="header">
            <div class="company-name">${safe(shipment.receipt?.companyName)}</div>
            <div class="logo"><img src="https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1855.jpeg" alt="Company Logo"></div>
          </div>
          <div class="section-title">Shipment</div>
          <div class="details">
            <label>Tracking Number:</label><span>${safe(shipment.trackingNumber)}</span><br>
            <label>Order ID:</label><span>${safe(shipment.orderId)}</span><br>
            <label>Content:</label><span>${safe(shipment.content)}</span><br>
            <label>Origin:</label><span>${safe(shipment.origin)}</span><br>
            <label>Destination:</label><span>${safe(shipment.destination)}</span><br>
            <label>Est. Delivery:</label><span>${safe(shipment.estDeliveryDate)}</span><br>
            <label>Transport Mode:</label><span>${safe(shipment.modeOfTransport)}</span><br>
            <label>Shipment Type:</label><span>${safe(shipment.typeOfShipment)}</span><br>
            <label>Quantity:</label><span>${safe(shipment.quantity)}</span>
          </div>
          <div class="section-title">Payment</div>
          <div class="details">
            <label>Amount:</label><span>$${safe(shipment.receipt?.amount)}</span><br>
            <label>Payment Mode:</label><span>${safe(shipment.paymentMode)}</span><br>
            <label>Payment Method:</label><span>${safe(shipment.paymentMethod)}</span><br>
            <img src="https://raw.githubusercontent.com/expressdeliveryservices/package-tracker/refs/heads/main/IMG_1860.jpeg" class="payment-img" alt="Payment Icon">
          </div>
          <div class="section-title">Sender</div>
          <div class="details">
            <label>Name:</label><span>${safe(shipment.sender?.name)}</span><br>
            <label>Address:</label><span>${safe(shipment.sender?.address)}</span>
          </div>
          <div class="section-title">Receiver</div>
          <div class="details">
            <label>Name:</label><span>${safe(shipment.receiver?.name)}</span><br>
            <label>Address:</label><span>${safe(shipment.receiver?.address)}</span><br>
            <label>Mobile:</label><span>${safe(shipment.receiver?.mobile)}</span>
          </div>
          <div class="section-title">Authorization</div>
          <div class="details">
            <label>Signed by:</label><span>${safe(shipment.signedBy)}</span><br>
            <label>Stamp Date:</label><span>${safe(shipment.officialStampDate)}</span><br>
            <label>Stamp:</label><span>${shipment.officialStamp ? `<img src="${shipment.officialStamp}" class="signature-img" alt="Signature Stamp">` : 'Not provided'}</span>
          </div>
          <div class="total">Total: $${safe(shipment.receipt?.amount)}</div>
          <div class="footer">Issued: ${new Date().toLocaleString()}</div>
        </div>
      `;
    }, 5000);
  }, 5000);
}

// Newsletter
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if(email) {
    alert("Thank you! Updates will be sent to " + email);
  } else alert("Please enter your email.");
}

// Support Popup
function openSupport() { document.getElementById('supportPopup').style.display='block'; }
function closeSupport() { document.getElementById('supportPopup').style.display='none'; }
function sendSupport() {
  const name = document.getElementById('supportName').value;
  const email = document.getElementById('supportEmail').value;
  const msg = document.getElementById('supportMessage').value;
  if(name && email && msg) {
    alert("Message sent! We'll contact you at " + email);
    closeSupport();
  } else alert("Please fill in all fields.");
}

// Customer Reviews
const reviews = [
  {name:'Alice Johnson', text:'Excellent delivery service! Fast and reliable.'},
  {name:'Michael Smith', text:'My package arrived ahead of time, very professional.'},
  {name:'Samantha Lee', text:'Customer support was very helpful and responsive.'},
  {name:'David Brown', text:'Tracking system is accurate and easy to use.'},
  {name:'Linda White', text:'Highly recommend Express Delivery Service for all shipments.'},
  {name:'John Doe', text:'Packages arrived safely every time. Great experience!'}
];
let reviewIndex = 0;
function showReview() {
  const board = document.getElementById('reviewsBoard');
  board.innerHTML = `<div class="review"><strong>${reviews[reviewIndex].name}:</strong> ${reviews[reviewIndex].text}</div>`;
  reviewIndex = (reviewIndex + 1) % reviews.length;
}
showReview();
setInterval(showReview, 5000);

// Google Translate
function googleTranslateElementInit() {
  new google.translate.TranslateElement({pageLanguage:'en'},'google_translate_element');
}
