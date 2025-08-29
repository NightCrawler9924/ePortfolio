// Engineering Portfolio JavaScript

// DOM Elements
const themeToggle = document.getElementById('theme-toggle');
const sunIcon = document.getElementById('sun-icon');
const moonIcon = document.getElementById('moon-icon');
const html = document.documentElement;
const nav = document.querySelector('nav');

// Theme Management
class ThemeManager {
  constructor() {
    this.currentTheme = localStorage.getItem('theme') || 'dark';
    this.init();
  }

  init() {
    this.setTheme(this.currentTheme);
    this.updateIcon();
    this.bindEvents();
  }

  setTheme(theme) {
    html.classList.remove('dark', 'light');
    html.classList.add(theme);
    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
    this.setTheme(newTheme);
    this.updateIcon();
  }

  updateIcon() {
    if (this.currentTheme === 'dark') {
      sunIcon.classList.remove('hidden');
      moonIcon.classList.add('hidden');
    } else {
      sunIcon.classList.add('hidden');
      moonIcon.classList.remove('hidden');
    }
  }

  bindEvents() {
    themeToggle.addEventListener('click', () => this.toggleTheme());
  }
}

// Navigation Management
class NavigationManager {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => this.handleSmoothScroll(e));
    });

    // Scroll effect for navigation
    window.addEventListener('scroll', () => this.handleScrollEffect());
  }

  handleSmoothScroll(e) {
    e.preventDefault();
    const targetId = e.currentTarget.getAttribute('href');
    const target = document.querySelector(targetId);
    
    if (target) {
      const offsetTop = target.offsetTop - 80; // Account for fixed nav
      window.scrollTo({
        top: offsetTop,
        behavior: 'smooth'
      });
    }
  }

  handleScrollEffect() {
    if (window.scrollY > 100) {
      nav.classList.add('bg-engineering-dark');
      nav.classList.remove('bg-engineering-dark/80');
    } else {
      nav.classList.remove('bg-engineering-dark');
      nav.classList.add('bg-engineering-dark/80');
    }
  }
}

// Skill Bar Manager
class SkillBarManager {
  constructor() {
    this.init();
  }

  init() {
    this.animateSkillBars();
  }

  animateSkillBars() {
    const skillBars = document.querySelectorAll('.progress-fill');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const width = entry.target.getAttribute('data-width');
          if (width) {
            // Add a small delay for staggered animation
            setTimeout(() => {
              entry.target.style.width = width;
            }, Math.random() * 500);
          }
        }
      });
    }, { threshold: 0.3 });

    skillBars.forEach(bar => {
      observer.observe(bar);
      bar.style.width = '0%';
    });

    // Fallback after 3 seconds
    setTimeout(() => {
      skillBars.forEach(bar => {
        const width = bar.getAttribute('data-width');
        if (width && bar.style.width === '0%') {
          bar.style.width = width;
        }
      });
    }, 3000);
  }
}

// Contact Form Manager
class ContactManager {
  constructor() {
    this.bindEvents();
  }

  bindEvents() {
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
      contactForm.addEventListener('submit', (e) => this.handleSubmit(e));
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    
    const submitBtn = e.target.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
      this.showSuccessMessage();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
      e.target.reset();
    }, 2000);
  }

  showSuccessMessage() {
    const message = document.createElement('div');
    message.className = 'success-message';
    message.textContent = 'Message sent successfully!';
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--accent-green);
      color: white;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      z-index: 1000;
      animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(message);
    
    setTimeout(() => {
      message.remove();
    }, 3000);
  }
}

// Utility Functions
class Utils {
  static debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  static throttle(func, limit) {
    let inThrottle;
    return function() {
      const args = arguments;
      const context = this;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }

  static isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }
}

// Performance Optimizations
class PerformanceManager {
  constructor() {
    this.init();
  }

  init() {
    this.optimizeImages();
    this.addLazyLoading();
  }

  optimizeImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
      img.loading = 'lazy';
      img.addEventListener('error', () => {
        img.style.display = 'none';
      });
    });
  }

  addLazyLoading() {
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }
}

// Error Handling
class ErrorHandler {
  static init() {
    window.addEventListener('error', (e) => {
      console.error('Global error:', e.error);
    });

    window.addEventListener('unhandledrejection', (e) => {
      console.error('Unhandled promise rejection:', e.reason);
    });
  }
}

// Analytics (if needed)
class Analytics {
  static trackEvent(eventName, data = {}) {
    console.log('Event tracked:', eventName, data);
  }

  static trackPageView(page) {
    this.trackEvent('page_view', { page });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all managers
  const themeManager = new ThemeManager();
  const navigationManager = new NavigationManager();
  const skillBarManager = new SkillBarManager();
  const contactManager = new ContactManager();
  const performanceManager = new PerformanceManager();
  
  // Initialize error handling
  ErrorHandler.init();
  
  // Track page view
  Analytics.trackPageView(window.location.pathname);
  
  // Set static name display (no animation)
  const nameContainer = document.querySelector('.hero-title');
  if (nameContainer) {
    nameContainer.innerHTML = '<span class="text-accent">Deepansh </span><span class="text-primary">Sabharwal</span>';
  }

  // Set page title
  document.title = 'Deepansh Sabharwal | Engineering Portfolio';

  console.log('Engineering Portfolio initialized successfully!');
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    document.title = '👋 Come back! - Deepansh Sabharwal';
  } else {
    document.title = 'Deepansh Sabharwal | Engineering Portfolio';
  }
});

// Handle window resize
window.addEventListener('resize', Utils.debounce(() => {
  console.log('Window resized');
}, 250));

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    ThemeManager,
    NavigationManager,
    SkillBarManager,
    ContactManager,
    Utils
  };
}
