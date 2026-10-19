// ============================================
// 수완뿌리학원 - Interactive Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // === Page Loader (Fast + Session Aware) ===
  const loader = document.getElementById('page-loader');
  if (loader) {
    if (sessionStorage.getItem('suwan_visited')) {
      loader.classList.add('hidden');
    } else {
      sessionStorage.setItem('suwan_visited', '1');
      window.addEventListener('load', () => {
        setTimeout(() => {
          loader.classList.add('hidden');
        }, 350);
      });
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 1200);
    }
  }


  // === Header Scroll Effect ===
  const header = document.getElementById('header');

  if (header) {
    const updateHeader = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader();
  }


  // === Mobile Navigation Toggle ===
  const navToggle = document.getElementById('nav-toggle');
  const navList = document.getElementById('nav-list');

  if (navToggle && navList) {
    navToggle.addEventListener('click', () => {
      navList.classList.toggle('open');
      navToggle.classList.toggle('active');
    });

    navList.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navList.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }


  // === Hero Stats Count-Up Animation ===
  const statNumbers = document.querySelectorAll('.stat-number[data-count]');
  statNumbers.forEach(el => {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    if (!isNaN(target)) {
      let current = 0;
      const duration = 1100;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        current = Math.round(eased * target);
        el.textContent = `${current}${suffix}`;
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = `${target}${suffix}`;
        }
      };
      requestAnimationFrame(step);
    }
  });


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
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach((el, index) => {
    el.style.transitionDelay = `${(index % 4) * 0.08}s`;
    observerAnim.observe(el);
  });


  // === Tab Switching (Hot Programs) ===
  const tabs = document.querySelectorAll('.hot-tab');
  const contents = document.querySelectorAll('.hot-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      contents.forEach(content => {
        content.classList.remove('active');
        if (content.getAttribute('data-content') === targetTab) {
          content.classList.add('active');
        }
      });
    });
  });


  // === Video Lightbox Modal ===
  const videoCards = document.querySelectorAll('.video-card[data-video-id]');
  const videoModal = document.getElementById('video-modal');
  const videoIframe = document.getElementById('video-modal-iframe');
  const videoTitle = document.getElementById('video-modal-title');
  const videoExt = document.getElementById('video-modal-ext');
  const videoClose = document.getElementById('video-modal-close');

  const closeVideoModal = () => {
    if (!videoModal) return;
    videoModal.classList.remove('open');
    videoModal.setAttribute('aria-hidden', 'true');
    if (videoIframe) videoIframe.src = '';
  };

  videoCards.forEach(card => {
    card.addEventListener('click', () => {
      const videoId = card.getAttribute('data-video-id');
      const title = card.getAttribute('data-video-title') || '동영상 보기';
      if (videoModal && videoIframe && videoId) {
        videoTitle.textContent = title;
        videoExt.href = `https://www.youtube.com/watch?v=${videoId}`;
        videoIframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`;
        videoModal.classList.add('open');
        videoModal.setAttribute('aria-hidden', 'false');
      }
    });
  });

  if (videoClose) {
    videoClose.addEventListener('click', closeVideoModal);
  }
  if (videoModal) {
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeVideoModal();
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeVideoModal();
  });


  // === Scroll to Top Button ===
  const scrollTopBtn = document.getElementById('scroll-top');

  if (scrollTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 500) {
        scrollTopBtn.classList.add('visible');
      } else {
        scrollTopBtn.classList.remove('visible');
      }
    }, { passive: true });

    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }


  // === Smooth Scroll for Anchor Links ===
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
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
        heroBg.style.transform = `scale(1.02) translateY(${scrollY * 0.12}px)`;
      }
    }, { passive: true });
  }

});
