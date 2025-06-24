document.querySelectorAll('.toggle-info').forEach(button => {
    button.addEventListener('click', function () {
        const info = this.nextElementSibling;
        const isExpanded = info.style.display === 'block';
        info.style.display = isExpanded ? 'none' : 'block';
        this.textContent = isExpanded ? '+' : '-';
    });
});

// Toggle language
const langButtons = document.querySelectorAll('.lang-button');
langButtons.forEach(button => {
    button.addEventListener('click', () => {
        const lang = button.id.split('-')[1];
        langButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        document.querySelectorAll('[data-en]').forEach(el => {
            el.textContent = el.getAttribute(`data-${lang}`);
        });
    });
});
