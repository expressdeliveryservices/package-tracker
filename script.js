// Hamburger menu toggle
function toggleMenu() {
  const menu = document.getElementById("nav-menu");
  if (menu.style.display === "flex") menu.style.display = "none";
  else menu.style.display = "flex";
}

// Slow scrolling effect ~5 minutes
window.onload = () => {
  let scrollHeight = document.body.scrollHeight - window.innerHeight;
  let duration = 300000; // 5 minutes in milliseconds
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    let progress = timestamp - start;
    window.scrollTo(0, (progress / duration) * scrollHeight);
    if (progress < duration) requestAnimationFrame(step);
  }
  requestAnimationFrame(step);
};

// Customer reviews
const reviews = [
  "Excellent service! Fast and reliable.",
  "My package arrived on time. Very satisfied.",
  "Professional team and excellent tracking system.",
  "Highly recommend Express Delivery Services.",
  "Customer support is friendly and helpful."
];
let reviewIndex = 0;
function showReview() {
  const popup = document.getElementById("reviewsPopup");
  const reviewText = document.getElementById("reviewText");
  reviewText.innerText = reviews[reviewIndex];
  popup.style.display = "block";
  reviewIndex = (reviewIndex + 1) % reviews.length;
}
setInterval(showReview, 5000); // every 5 seconds
showReview();

// EmailJS - Tracking number form
document.getElementById("trackForm").addEventListener("submit", function(e){
  e.preventDefault();
  const trackingNumber = document.getElementById("trackingNumber").value;
  emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
    tracking_number: trackingNumber
  }).then(() => {
    alert("Tracking request sent!");
    document.getElementById("trackForm").reset();
  });
});

// EmailJS - Newsletter form
document.getElementById("newsletterForm").addEventListener("submit", function(e){
  e.preventDefault();
  const email = document.getElementById("newsletterEmail").value;
  emailjs.send("YOUR_SERVICE_ID","YOUR_TEMPLATE_ID",{
    subscriber_email: email
  }).then(() => {
    alert("Subscription successful!");
    document.getElementById("newsletterForm").reset();
  });
});

// Language switcher
function translatePage(lang){
  alert("Language switching feature will translate to " + lang);
}
