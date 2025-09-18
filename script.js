document.addEventListener('DOMContentLoaded', () => {
  // Toggle floating menu
  const menuToggle = document.getElementById('menu-toggle');
  const menuContent = document.getElementById('menu-content');
  menuToggle.addEventListener('click', () => menuContent.classList.toggle('active'));

  // Slider function (for reviews)
  function initSlider(sliderSelector) {
    const slider = document.querySelector(sliderSelector);
    if (!slider) return;
    const reviews = slider.querySelectorAll('.review');
    const prevBtn = slider.querySelector('.prev');
    const nextBtn = slider.querySelector('.next');
    let current = 0;

    function show(index) {
      reviews.forEach((rev, i) => rev.classList.toggle('active', i === index));
    }

    prevBtn.addEventListener('click', () => {
      current = (current - 1 + reviews.length) % reviews.length;
      show(current);
    });

    nextBtn.addEventListener('click', () => {
      current = (current + 1) % reviews.length;
      show(current);
    });

    setInterval(() => {
      current = (current + 1) % reviews.length;
      show(current);
    }, 5000);
  }

  // Initialize sliders
  initSlider('.reviews-slider'); // floating menu
  initSlider('.reviews-section .reviews-slider'); // main section

  // Track package dummy
  document.getElementById('tracking-form').addEventListener('submit', function(e){
    e.preventDefault();
    const trackingId = document.getElementById('tracking-id').value;
    document.getElementById('result').innerText = `Tracking ID: ${trackingId} – Status: In Transit 🚚`;
  });

  // Submit new review
  const reviewForm = document.getElementById('review-form');
  if (reviewForm) {
    reviewForm.addEventListener('submit', function(e){
      e.preventDefault();
      const name = document.getElementById('reviewer-name').value;
      const text = document.getElementById('review-text').value;

      const newReview = document.createElement('div');
      newReview.classList.add('review', 'active');
      newReview.textContent = `"${text}" – ${name}`;

      const slider = document.querySelector('.reviews-section .reviews-slider');
      slider.querySelectorAll('.review').forEach(r => r.classList.remove('active'));
      slider.appendChild(newReview);

      reviewForm.reset();
    });
  }
});
