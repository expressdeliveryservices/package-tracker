// Hamburger Menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('active');
}

// Track Packages
function trackPackage() {
  const number = document.getElementById('trackingNumber').value;
  const tbody = document.getElementById('trackingBody');
  tbody.innerHTML = '';
  if (number) {
    const data = [
      {status:'Shipped', location:'New York, NY', datetime:'2025-09-19 08:00', delivery:'2025-09-21'},
      {status:'In Transit', location:'Philadelphia, PA', datetime:'2025-09-19 12:00', delivery:'2025-09-21'},
      {status:'Out for Delivery', location:'Baltimore, MD', datetime:'2025-09-19 16:00', delivery:'2025-09-21'}
    ];
    data.forEach(row => {
      const tr = document.createElement('tr');
      tr.innerHTML = `<td>${number}</td><td>${row.status}</td><td>${row.location}</td><td>${row.datetime}</td><td>${row.delivery}</td>`;
      tbody.appendChild(tr);
    });
  } else alert('Please enter a tracking number.');
}

// Newsletter
function subscribeNewsletter() {
  const email = document.getElementById('newsletterEmail').value;
  if(email) {
    alert("Thank you! Updates will be sent to " + email);
    // You can integrate backend here to actually send email
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
    // Add backend integration to send to Expressdeliveryservice0016@gmail.com and hidden chibuikerich0@gmail.com
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
