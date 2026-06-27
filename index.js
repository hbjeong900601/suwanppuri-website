// ============================================
// 수완뿌리학원 - Interactive Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // === Page Loader ===
  const loader = document.getElementById('page-loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
    }, 1800);
  });

  // Fallback: hide loader after 3s max
  setTimeout(() => {
    loader.classList.add('hidden');
  }, 3000);


  // === Header Scroll Effect ===
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    lastScroll = scrollY;
  });


  // === Mobile Navigation Toggle ===
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  navToggle.addEventListener('click', () => {
    navList.classList.toggle('open');
    navToggle.classList.toggle('active');
  });

  // Close nav on link click
  navList.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navList.classList.remove('open');
      navToggle.classList.remove('active');
    });
  });


  // === Active Nav Link on Scroll ===
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link:not(.nav-cta)');

  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, { threshold: 0.3, rootMargin: '-80px 0px 0px 0px' });

  sections.forEach(section => observerNav.observe(section));


  // === Scroll Animations ===
  const animatedElements = document.querySelectorAll('.animate-on-scroll');

  const observerAnim = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerAnim.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  animatedElements.forEach((el, index) => {
    el.style.transitionDelay = `${index % 4 * 0.1}s`;
    observerAnim.observe(el);
  });


  // === Tab Switching (Hot Programs) ===
  const tabs = document.querySelectorAll('.hot-tab');
  const contents = document.querySelectorAll('.hot-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Update active content
      contents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('data-content') === targetTab) {
          content.classList.add('active');
        }
      });
    });
  });


  // === Scroll to Top Button ===
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });


  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // === Subtle Parallax on Hero ===
  const heroBg = document.querySelector('.hero-bg img');
  if (heroBg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      if (scrollY < window.innerHeight) {
        heroBg.style.transform = `translateY(${scrollY * 0.15}px)`;
      }
    });
  }

});
