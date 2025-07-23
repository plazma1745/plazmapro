
// Smooth scrolling function
function scrollToSection(sectionId) {
  const element = document.getElementById(sectionId);
  element.scrollIntoView({ behavior: 'smooth' });
}

// Form submission handler
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(form);
      const name = form.querySelector('input[type="text"]').value;
      const phone = form.querySelector('input[type="tel"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const message = form.querySelector('textarea').value;
      
      // Simple validation
      if (!name || !phone || !email || !message) {
        alert('Пожалуйста, заполните все поля');
        return;
      }
      
      // Simulate form submission
      const submitButton = form.querySelector('button[type="submit"]');
      const originalText = submitButton.textContent;
      
      submitButton.textContent = 'Отправляется...';
      submitButton.disabled = true;
      
      setTimeout(() => {
        alert('Спасибо за заявку! Мы свяжемся с вами в ближайшее время.');
        form.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
      }, 2000);
    });
  }
  
  // Navbar scroll effect
  window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
      navbar.style.background = 'rgba(26, 26, 26, 0.95)';
      navbar.style.backdropFilter = 'blur(10px)';
    } else {
      navbar.style.background = '#1a1a1a';
      navbar.style.backdropFilter = 'none';
    }
  });
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);
  
  // Observe service cards
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
  
  // Counter animation for stats
  const stats = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  stats.forEach(stat => {
    statsObserver.observe(stat);
  });
  
  function animateCounter(element) {
    const target = element.textContent;
    const isNumber = /^\d+$/.test(target);
    
    if (isNumber) {
      const targetNumber = parseInt(target);
      let current = 0;
      const increment = targetNumber / 50;
      
      const timer = setInterval(() => {
        current += increment;
        if (current >= targetNumber) {
          element.textContent = targetNumber + '+';
          clearInterval(timer);
        } else {
          element.textContent = Math.floor(current) + '+';
        }
      }, 30);
    }
  }
});

// Mobile menu toggle (if needed in future)
function toggleMobileMenu() {
  const navMenu = document.querySelector('.nav-menu');
  navMenu.classList.toggle('mobile-active');
}

// Particle effect for hero section
function createParticles() {
  const hero = document.querySelector('.hero');
  const particleCount = 50;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.className = 'particle';
    particle.style.cssText = `
      position: absolute;
      width: 2px;
      height: 2px;
      background: #ff6b35;
      border-radius: 50%;
      top: ${Math.random() * 100}%;
      left: ${Math.random() * 100}%;
      opacity: ${Math.random() * 0.5 + 0.3};
      animation: float ${Math.random() * 10 + 5}s linear infinite;
    `;
    hero.appendChild(particle);
  }
}

// Add CSS for particle animation
const style = document.createElement('style');
style.textContent = `
  @keyframes float {
    0% { transform: translateY(100vh) rotate(0deg); }
    100% { transform: translateY(-100vh) rotate(360deg); }
  }
`;
document.head.appendChild(style);

// Initialize particles when page loads
document.addEventListener('DOMContentLoaded', createParticles);
