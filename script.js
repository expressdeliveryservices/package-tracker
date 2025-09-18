function navigate(page){
    switch(page){
        case 'home': window.location.href="index.html"; break;
        case 'support': window.location.href="tel:+12186908931"; break;
        case 'contact': window.location.href="mailto:Expressdeliveryservice0016@gmail.com"; break;
        case 'tracking':
            document.getElementById("trackingInputSection").scrollIntoView({behavior:"smooth"}); break;
    }
}

function changeLanguage(lang){
    alert(`Language changed to: ${lang}`);
}
