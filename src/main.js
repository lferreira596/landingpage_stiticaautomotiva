// ============================================
//  AquaShine Lava Jato Premium - Main Script
// ============================================

// ---------- Preloader ----------
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('preloader').classList.add('hidden');
  }, 1500);
});

// ---------- Bubble Canvas Background ----------
class BubbleCanvas {
  constructor() {
    this.canvas = document.getElementById('bubbles-canvas');
    this.ctx = this.canvas.getContext('2d');
    this.bubbles = [];
    this.resize();
    this.init();
    this.animate();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  init() {
    const count = Math.min(Math.floor(window.innerWidth / 30), 50);
    for (let i = 0; i < count; i++) {
      this.bubbles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height + this.canvas.height,
        radius: Math.random() * 4 + 1,
        speed: Math.random() * 0.5 + 0.15,
        opacity: Math.random() * 0.15 + 0.03,
        wobble: Math.random() * Math.PI * 2,
        wobbleSpeed: Math.random() * 0.01 + 0.005,
        wobbleRadius: Math.random() * 20 + 10
      });
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.bubbles.forEach(b => {
      b.y -= b.speed;
      b.wobble += b.wobbleSpeed;
      const x = b.x + Math.sin(b.wobble) * b.wobbleRadius;

      if (b.y < -b.radius * 2) {
        b.y = this.canvas.height + b.radius * 2;
        b.x = Math.random() * this.canvas.width;
      }

      // Draw bubble
      this.ctx.beginPath();
      this.ctx.arc(x, b.y, b.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(0, 180, 255, ${b.opacity})`;
      this.ctx.fill();

      // Bubble highlight
      this.ctx.beginPath();
      this.ctx.arc(x - b.radius * 0.3, b.y - b.radius * 0.3, b.radius * 0.3, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${b.opacity * 0.6})`;
      this.ctx.fill();
    });
    requestAnimationFrame(() => this.animate());
  }
}

// ---------- Hero Water Particles ----------
class HeroParticles {
  constructor() {
    this.container = document.getElementById('heroParticles');
    if (!this.container) return;
    this.createParticles();
  }

  createParticles() {
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.style.cssText = `
        position: absolute;
        width: ${Math.random() * 6 + 2}px;
        height: ${Math.random() * 6 + 2}px;
        background: rgba(0, 180, 255, ${Math.random() * 0.3 + 0.05});
        border-radius: 50%;
        left: ${Math.random() * 100}%;
        top: ${Math.random() * 100}%;
        animation: particleFloat ${Math.random() * 8 + 6}s ease-in-out infinite;
        animation-delay: ${Math.random() * 5}s;
      `;
      this.container.appendChild(particle);
    }

    // Add CSS animation
    const style = document.createElement('style');
    style.textContent = `
      @keyframes particleFloat {
        0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.3; }
        25% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1.2); opacity: 0.6; }
        50% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0.8); opacity: 0.2; }
        75% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1.1); opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }
}

// ---------- Navbar Scroll ----------
class Navbar {
  constructor() {
    this.navbar = document.getElementById('navbar');
    this.hamburger = document.getElementById('hamburger');
    this.navLinks = document.getElementById('navLinks');
    this.links = document.querySelectorAll('.nav-link');
    this.sections = document.querySelectorAll('section[id]');

    this.initScroll();
    this.initMobile();
    this.initActiveLink();
  }

  initScroll() {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      this.navbar.classList.toggle('scrolled', currentScroll > 60);
      lastScroll = currentScroll;
    });
  }

  initMobile() {
    this.hamburger.addEventListener('click', () => {
      this.hamburger.classList.toggle('active');
      this.navLinks.classList.toggle('open');
      document.body.style.overflow = this.navLinks.classList.contains('open') ? 'hidden' : '';
    });

    this.links.forEach(link => {
      link.addEventListener('click', () => {
        this.hamburger.classList.remove('active');
        this.navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  initActiveLink() {
    window.addEventListener('scroll', () => {
      let current = '';
      this.sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
          current = section.getAttribute('id');
        }
      });

      this.links.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    });
  }
}

// ---------- Scroll Animations ----------
class ScrollAnimations {
  constructor() {
    this.elements = document.querySelectorAll('[data-animate]');
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = entry.target.dataset.delay || 0;
            setTimeout(() => {
              entry.target.classList.add('visible');
            }, parseInt(delay));
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    this.elements.forEach(el => this.observer.observe(el));
  }
}

// ---------- Counter Animation ----------
class CounterAnimation {
  constructor() {
    this.counters = document.querySelectorAll('[data-count]');
    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.animateCounter(entry.target);
            this.observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    this.counters.forEach(counter => this.observer.observe(counter));
  }

  animateCounter(element) {
    const target = parseInt(element.dataset.count);
    const duration = 2000;
    const start = performance.now();

    const easeOutQuart = t => 1 - Math.pow(1 - t, 4);

    const update = (currentTime) => {
      const elapsed = currentTime - start;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutQuart(progress);
      const current = Math.floor(easedProgress * target);
      element.textContent = current.toLocaleString('pt-BR');

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target.toLocaleString('pt-BR');
      }
    };

    requestAnimationFrame(update);
  }
}

// ---------- Testimonial Slider ----------
class TestimonialSlider {
  constructor() {
    this.track = document.getElementById('testimonialTrack');
    this.dotsContainer = document.getElementById('testimonialDots');
    this.prevBtn = document.getElementById('prevTestimonial');
    this.nextBtn = document.getElementById('nextTestimonial');

    if (!this.track) return;

    this.cards = this.track.querySelectorAll('.testimonial-card');
    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();

    this.createDots();
    this.initControls();
    this.initAutoplay();

    window.addEventListener('resize', () => {
      this.cardsPerView = this.getCardsPerView();
      this.createDots();
      this.goTo(0);
    });
  }

  getCardsPerView() {
    if (window.innerWidth <= 640) return 1;
    if (window.innerWidth <= 1024) return 2;
    return 3;
  }

  createDots() {
    const totalDots = Math.max(1, this.cards.length - this.cardsPerView + 1);
    this.dotsContainer.innerHTML = '';
    for (let i = 0; i < totalDots; i++) {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => this.goTo(i));
      this.dotsContainer.appendChild(dot);
    }
  }

  goTo(index) {
    const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
    this.currentIndex = Math.max(0, Math.min(index, maxIndex));

    const card = this.cards[0];
    if (!card) return;
    const cardWidth = card.offsetWidth + 24; // gap
    this.track.style.transform = `translateX(-${this.currentIndex * cardWidth}px)`;

    const dots = this.dotsContainer.querySelectorAll('.dot');
    dots.forEach((d, i) => d.classList.toggle('active', i === this.currentIndex));
  }

  initControls() {
    this.prevBtn.addEventListener('click', () => this.goTo(this.currentIndex - 1));
    this.nextBtn.addEventListener('click', () => this.goTo(this.currentIndex + 1));
  }

  initAutoplay() {
    setInterval(() => {
      const maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
      this.goTo(this.currentIndex >= maxIndex ? 0 : this.currentIndex + 1);
    }, 5000);
  }
}

// ---------- Smooth Scroll ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ---------- Mouse Glow Effect on Cards ----------
document.querySelectorAll('.service-card, .plan-card, .step-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--mouse-x', `${x}%`);
    card.style.setProperty('--mouse-y', `${y}%`);
    card.style.backgroundImage = `radial-gradient(600px circle at ${x}% ${y}%, rgba(0, 102, 255, 0.06), transparent 40%)`;
  });

  card.addEventListener('mouseleave', () => {
    card.style.backgroundImage = '';
  });
});

// ---------- Parallax Effect on Hero ----------
window.addEventListener('scroll', () => {
  const scrolled = window.scrollY;
  const hero = document.querySelector('.hero');
  if (hero && scrolled < hero.offsetHeight) {
    hero.style.backgroundPositionY = `${scrolled * 0.4}px`;
  }
});

// ---------- Initialize Everything ----------
document.addEventListener('DOMContentLoaded', () => {
  new BubbleCanvas();
  new HeroParticles();
  new Navbar();
  new ScrollAnimations();
  new CounterAnimation();
  new TestimonialSlider();
});
