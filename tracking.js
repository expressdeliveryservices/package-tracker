document.getElementById('track-btn').addEventListener('click', async () => {
  const trackingNumber = document.getElementById('tracking-input').value;
  const res = await fetch('/track', {
    method: 'POST',
    headers: {'Content-Type':'application/json'},
    body: JSON.stringify({ trackingNumber })
  });
  const data = await res.json();
  document.getElementById('tracking-result').innerText = data.status ? 
    `Status: ${data.status} | Location: ${data.location}` : "Tracking number not found";
});
