const reviews=document.querySelectorAll('.review');
let reviewIndex=0;
setInterval(()=>{
    reviews.forEach(r=>r.classList.remove('active'));
    reviews[reviewIndex].classList.add('active');
    reviewIndex=(reviewIndex+1)%reviews.length;
},5000);
