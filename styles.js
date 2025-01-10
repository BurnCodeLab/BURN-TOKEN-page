// Style.js

// Apply glowing effect to text elements
const applyGlowEffect = () => {
  const glowElements = document.querySelectorAll('.glow-text');
  glowElements.forEach((el) => {
    el.style.textShadow = `0 0 10px #fff, 0 0 20px #ff00ff, 0 0 30px #ff00ff, 0 0 40px #ff00ff`;
  });
};

// Add active class to animated grid background
const animateGridBackground = () => {
  const gridBackground = document.querySelector('.grid-background');
  if (gridBackground) {
    gridBackground.classList.add('animated');
  }
};

// Button hover animations
const addButtonHoverEffect = () => {
  const buttons = document.querySelectorAll('button');
  buttons.forEach((button) => {
    button.addEventListener('mouseover', () => {
      button.style.transform = 'scale(1.1)';
      button.style.transition = 'transform 0.2s ease-in-out';
    });

    button.addEventListener('mouseout', () => {
      button.style.transform = 'scale(1)';
    });
  });
};

// IntersectionObserver animations
const addScrollAnimations = () => {
  const scrollItems = document.querySelectorAll('.scroll-item');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          entry.target.style.transition = 'opacity 0.5s ease-out, transform 0.5s ease-out';
        } else {
          entry.target.style.opacity = '0';
          entry.target.style.transform = 'translateY(20px)';
        }
      });
    },
    { threshold: 0.5 }
  );

  scrollItems.forEach((item) => observer.observe(item));
};

// Initialize styles on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  applyGlowEffect();
  animateGridBackground();
  addButtonHoverEffect();
  addScrollAnimations();
});
