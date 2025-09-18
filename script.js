async function trackPackage() {
  const num = document.getElementById("trackingInput").value;
  const res = await fetch(`https://your-backend-url.onrender.com/api/track/${num}`);
  if (res.status === 404) {
    document.getElementById("result").innerHTML = "<p>Tracking number not found</p>";
    return;
  }
  const pkg = await res.json();
  renderTracking(pkg);
}

function renderTracking(pkg) {
  let html = `<h3>Tracking Number: ${pkg.trackingNumber}</h3>`;
  html += `<p><b>Destination:</b> ${pkg.destination}</p><ul>`;
  pkg.updates.forEach(u => {
    html += `<li>${u.time} - ${u.location} - ${u.status}</li>`;
  });
  html += "</ul>";
  document.getElementById("result").innerHTML = html;
}
