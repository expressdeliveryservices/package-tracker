// Toggle sidebar options
function toggleSidebarOption(id){
  const elem = document.getElementById(id);
  elem.style.display = elem.style.display==="block"?"none":"block";
}

// Tracking simulation
function trackPackage(){
  const number = document.getElementById('trackingNumber').value;
  const result = document.getElementById('trackingResult');
  const status = document.getElementById('statusIndicator');
  if(number){
    status.textContent = "🟢 In Transit";
    result.textContent = "Your package is on the way! Estimated delivery: 2-3 days.";
  } else {
    status.textContent = "🔴 Not Found";
    result.textContent = "";
  }
}

// Leaflet map
var map = L.map('map').setView([40.749825, -73.941], 12); // HQ
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
  attribution:'&copy; OpenStreetMap contributors'
}).addTo(map);
var hqMarker = L.marker([40.749825,-73.941]).addTo(map).bindPopup("Express Delivery Services HQ");

// Truck animation with curved paths
const truckRoutes = [
  {name:"Truck 1", coords:[[40.749825,-73.941],[40.754,-73.95],[40.758,-73.96],[40.762,-73.955]]},
  {name:"Truck 2", coords:[[40.749825,-73.941],[40.745,-73.935],[40.740,-73.92],[40.738,-73.915]]}
];
const trucks = [];
function getBezierPoint(p0,p1,p2,t){
  const lat = (1-t)*(1-t)*p0[0]+2*(1-t)*t*p1[0]+t*t*p2[0];
  const lng = (1-t)*(1-t)*p0[1]+2*(1-t)*t*p1[1]+t*t*p2[1];
  return [lat,lng];
}
truckRoutes.forEach(route=>{
  const marker = L.marker(route.coords[0], {icon:L.icon({iconUrl:'assets/truck.png',iconSize:[32,32]})}).addTo(map).bindPopup(route.name);
  trucks.push({marker:marker, route:route.coords, segment:0, progress:0, speed:0.005+Math.random()*0.003});
});
function moveTrucksBezier(){
  trucks.forEach(truck=>{
    const route=truck.route, n=route.length;
    const p0=route[truck.segment];
    const p2=route[(truck.segment+1)%n];
    const offsetLat=(Math.random()-0.5)*0.002, offsetLng=(Math.random()-0.5)*0.002;
    const p1=[(p0[0]+p2[0])/2+offsetLat, (p0[1]+p2[1])/2+offsetLng];
    const pos=getBezierPoint(p0,p1,p2,truck.progress);
    truck.marker.setLatLng(pos);
    truck.progress+=truck.speed;
    if(truck.progress>=1){ truck.progress=0; truck.segment=(truck.segment+1)%n; }
  });
}
setInterval(moveTrucksBezier,50);

// Customer reviews
const reviews=[
  {text:"Fast delivery! Very satisfied.", author:"Alice"},
  {text:"Great tracking system.", author:"Bob"},
  {text:"Excellent customer support.", author:"Charlie"},
  {text:"Package arrived safely.", author:"Diana"},
  {text:"Reliable service.", author:"Ethan"},
  {text:"Loved the live map feature!", author:"Fiona"},
  {text:"Easy to use website.", author:"George"},
  {text:"Highly recommended.", author:"Hannah"},
  {text:"Will use again.", author:"Ian"},
  {text:"Fantastic experience.", author:"Jane"}
];
let reviewIndex=0;
function showReview(){ 
  const rText=document.getElementById('reviewText'); 
  const rAuthor=document.getElementById('reviewAuthor'); 
  rText.textContent=reviews[reviewIndex].text; 
  rAuthor.textContent="- "+reviews[reviewIndex].author; 
  reviewIndex=(reviewIndex+1)%reviews.length; 
}
setInterval(showReview,5000); 
showReview();

// Newsletter
function subscribeNewsletter(){ 
  const email=document.getElementById('newsletterEmail').value; 
  const msg=document.getElementById('newsletterMsg'); 
  if(email){ msg.textContent="Subscribed successfully!"; msg.style.color="limegreen"; } 
  else { msg.textContent="Please enter a valid email."; msg.style.color="red"; } 
}

// Live chat
function toggleChat(){ 
  const chat=document.getElementById('chatBox'); 
  chat.style.display=chat.style.display==="flex"?"none":"flex"; 
}
function sendMessage(){ 
  const input=document.getElementById('chatInput'); 
  const messages=document.getElementById('chatMessages'); 
  if(input.value.trim()!==""){ 
    const userMsg=document.createElement('div'); 
    userMsg.className="chat-message user-msg"; 
    userMsg.textContent=input.value; 
    messages.appendChild(userMsg); 
    messages.scrollTop=messages.scrollHeight;
    setTimeout(()=>{ 
      const botMsg=document.createElement('div'); 
      botMsg.className="chat-message bot-msg"; 
      botMsg.textContent="Thank you for contacting Express Delivery Services. We will reply shortly."; 
      messages.appendChild(botMsg); 
      messages.scrollTop=messages.scrollHeight; 
    },500); 
    input.value=""; 
  } 
}

// Language switcher
function changeLanguage(){ 
  const lang=document.getElementById('languageSelect').value; 
  const heading=document.getElementById('homeHeading'); 
  if(lang==="es"){heading.textContent="Rastrea tu paquete";} 
  else if(lang==="fr"){heading.textContent="Suivez votre colis";} 
  else if(lang==="de"){heading.textContent="Verfolgen Sie Ihr Paket";} 
  else if(lang==="pt"){heading.textContent="Rastreie seu pacote";} 
  else{heading.textContent="Track Your Package";} 
}
