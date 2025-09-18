// Handles sidebar navigation actions

function navigate(page) {
    switch(page) {
        case 'home':
            // Redirect to home page (change URL if different)
            window.location.href = "index.html";
            break;
        case 'support':
            // Open phone dialer with the support number
            window.location.href = "tel:+12186908931";
            break;
        case 'contact':
            // Open default mail client with your email
            window.location.href = "mailto:Expressdeliveryservice0016@gmail.com";
            break;
        case 'tracking':
            // Scroll smoothly to the tracking section on the page
            const trackingSection = document.getElementById("trackingInput");
            if (trackingSection) {
                trackingSection.scrollIntoView({ behavior: "smooth" });
            }
            break;
        default:
            console.log("Unknown navigation option");
    }
}

// Language switching placeholder
function changeLanguage(lang) {
    alert(`Language changed to: ${lang}`);
}
