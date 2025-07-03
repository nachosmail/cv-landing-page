// Toggle language
document.querySelectorAll('.lang-button').forEach(button => {
  button.addEventListener('click', () => {
    const lang = button.id.split('-')[1];
    document.querySelectorAll('.lang-button').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    document.querySelectorAll('[data-en]').forEach(el => {
      el.textContent = el.getAttribute(`data-${lang}`);
    });
  });
});

// Carousel behavior
document.addEventListener('DOMContentLoaded', () => {
  const carouselSwitch = document.getElementById('carousel-switch');
  const container = document.querySelector('.experience-container');
  const themeToggle = document.getElementById('theme-toggle');
  const contactForm = document.getElementById('contact-form');
  let interval = null;

  function startCarousel() {
    const items = container.querySelectorAll('.experience-item');
    let index = 0;
    items.forEach(item => item.style.display = 'none');
    items[index].style.display = 'flex';

    interval = setInterval(() => {
      items[index].style.display = 'none';
      index = (index + 1) % items.length;
      items[index].style.display = 'flex';
    }, 14000);
  }

  function stopCarousel() {
    clearInterval(interval);
    document.querySelectorAll('.experience-item').forEach(item => {
      item.style.display = 'flex';
    });
  }

  if (carouselSwitch) {
    carouselSwitch.addEventListener('change', (e) => {
      if (e.target.checked) {
        container.classList.add('carousel');
        startCarousel();
      } else {
        container.classList.remove('carousel');
        stopCarousel();
      }
    });
  }

  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
      themeToggle.textContent = '☀️';
    }
    themeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const isDark = document.body.classList.contains('dark-mode');
      themeToggle.textContent = isDark ? '☀️' : '🌙';
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      alert('Message sent!');
      contactForm.reset();
    });
  }
});
