document.getElementById("tracking-form").addEventListener("submit", function(e) {
  e.preventDefault();
  const trackingId = document.getElementById("tracking-id").value;

  fetch("http://localhost:5000/api/track/" + trackingId) // 👈 point to your backend
    .then(res => res.json())
    .then(data => {
      if (data.message === "Package not found") {
        document.getElementById("result").innerHTML = "<p>❌ Tracking number not found</p>";
      } else {
        document.getElementById("result").innerHTML = `
          <h3>Tracking ID: ${data.trackingId}</h3>
          <p><b>Status:</b> ${data.status}</p>
          <p><b>From:</b> ${data.origin} → <b>To:</b> ${data.destination}</p>
          <p><b>Extended Description:</b> ${data.extendedDescription}</p>
          <h4>History:</h4>
          <ul>
            ${data.history.map(h => `<li>${h.date} - ${h.location} - ${h.status} (${h.extendedDescription})</li>`).join("")}
          </ul>
        `;
      }
    })
    .catch(err => {
      document.getElementById("result").innerHTML = "<p>⚠️ Error fetching tracking info.</p>";
      console.error(err);
    });
});
