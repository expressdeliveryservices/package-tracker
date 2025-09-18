const reviews = [
    {name: 'John Doe', comment: 'Fast and reliable service!', rating: 5},
    {name: 'Jane Smith', comment: 'Package arrived on time!', rating: 4},
    {name: 'Alice Brown', comment: 'Great tracking system.', rating: 5},
    {name: 'Bob White', comment: 'Professional staff.', rating: 4},
    {name: 'Charlie Green', comment: 'Highly recommended!', rating: 5}
];

const reviewsContainer = document.getElementById('reviewsContainer');
let reviewIndex = 0;

function showReview() {
    const r = reviews[reviewIndex];
    const stars = '⭐'.repeat(r.rating);
    reviewsContainer.innerHTML = `
        <div class="review">
            <div class="customerName">${r.name}</div>
            <div class="customerComment">${r.comment}</div>
            <div class="rating">${stars}</div>
        </div>`;
    reviewIndex = (reviewIndex + 1) % reviews.length;
}

showReview();
setInterval(showReview, 5000);
