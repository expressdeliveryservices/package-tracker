/*
==============================
OPTIONAL EXTENDED DESCRIPTION
==============================
JavaScript for Express Delivery Service website.
Includes hamburger menu, tracking simulation, newsletter, support popup, reviews rotation, and Google Translate.
*/

// Hamburger Menu
function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

// Track Packages
function trackPackage() {
    const number = document.getElementById('trackingNumber').value;
    const tbody = document.getElementById('trackingBody');
    tbody.innerHTML = '';
    if(number){
        const data = [
            {status:'Shipped', location:'New York, NY', datetime:'2025-09-19 08:00', delivery:'2025-09-21'},
            {status:'In Transit', location:'Philadelphia, PA', datetime:'2025-09-19 12:00', delivery:'2025-09-21'},
            {status:'Out for Delivery', location:'Baltimore, MD', datetime:'2025-09-19 16:00', delivery:'2025-09-21'}
        ];
        data.forEach(row=>{
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${number}</td><td>${row.status}</td><td>${row.location}</td><td>${row.datetime}</td><td>${row.delivery}</td>`;
            tbody.appendChild(tr);
        });
    } else alert('Please enter a tracking number.');
}

// Newsletter
function subscribeNewsletter() {
    const email = document.getElementById('newsletterEmail').value;
    if(email) alert("Thank you! Updates will be sent to " + email); 
    else alert("Please enter your email.");
}

// Support Popup
const supportBtn = document.getElementById('supportBtn');
const supportPopup = document.getElementById('supportPopup');
const closeSupportBtn = document.getElementById('closeSupportBtn');
const sendSupportBtn = document.getElementById('sendSupportBtn');

supportBtn.addEventListener('click', () => supportPopup.style.display='block');
closeSupportBtn.addEventListener('click', () => supportPopup.style.display='none');

sendSupportBtn.addEventListener('click', () => {
    const name = document
