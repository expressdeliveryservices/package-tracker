let descExpanded = true;
function toggleDescription() {
    const content = document.getElementById('ext-desc-content');
    const btn = document.getElementById('desc-btn');
    if(descExpanded) {
        content.style.height = '60px';
        content.style.overflow = 'hidden';
        btn.innerText = 'Show More';
    } else {
        content.style.height = 'auto';
        content.style.overflow = 'visible';
        btn.innerText = 'Show Less';
    }
    descExpanded = !descExpanded;
}
