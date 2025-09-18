// Example tracking database (you can expand this)
const trackingData = {
  "12345": "In Transit - Expected delivery tomorrow",
  "67890": "Delivered - Signed by customer",
  "54321": "Pending - Waiting for pickup"
};

document.getElementById("tracking-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const id = document.getElementById("tracking-id").value.trim();
  const result = trackingData[id] || "❌ Tracking ID not found";
  document.getElementById("result").innerText = result;
});
