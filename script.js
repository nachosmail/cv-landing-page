document.querySelectorAll('.toggle-info').forEach(button => {
    button.addEventListener('click', function() {
        const info = this.nextElementSibling;
        const isExpanded = info.style.display === 'block';
        info.style.display = isExpanded ? 'none' : 'block';
        this.textContent = isExpanded ? '+' : '-';
    });
});
