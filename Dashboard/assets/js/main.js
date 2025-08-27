// ---------------- GOOGLE TRANSLATE ----------------
function googleTranslateElementInit() {
  const translateElement = document.getElementById('google_translate_element');
  if (translateElement) {
    new google.translate.TranslateElement(
      { pageLanguage: 'en' },
      'google_translate_element'
    );
  }
}

// Dropdown toggle & set language
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');
if (langBtn && langMenu) {
  langBtn.addEventListener('click', () => langMenu.classList.toggle('hidden'));
}

function setLanguage(lang, flagUrl, name) {
  const langIcon = document.getElementById('langIcon');
  const langName = document.getElementById('langName');
  const menu = document.getElementById('langMenu');

  if (langIcon) langIcon.src = flagUrl;
  if (langName) langName.textContent = name;
  if (menu) menu.classList.add('hidden');

  const select =
    document.querySelector('.goog-te-combo') ||
    document.querySelector('#google_translate_element select');
  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  }
}

// ---------------- DOM CONTENT LOADED ----------------
document.addEventListener('DOMContentLoaded', function () {
  // --- INITIALIZE AOS ---
  if (typeof AOS !== 'undefined') AOS.init({ once: true, duration: 800 });

  // --- THEME TOGGLE ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  if (themeToggleBtn) {
    const applyTheme = (theme) => {
      const isDark = theme === 'dark';
      document.documentElement.classList.toggle('dark', isDark);

      const toggles = [
        ['theme-icon-sun', !isDark],
        ['theme-icon-moon', isDark],
        ['logo-dark', !isDark],
        ['logo-light', isDark],
        ['footer-logo-dark', isDark],
        ['footer-logo-light', !isDark],
      ];
      toggles.forEach(([id, hide]) => {
        const el = document.getElementById(id);
        if (el) el.classList.toggle('hidden', hide);
      });

      // How does it work background
      document
        .querySelectorAll('.how-bg-dark')
        .forEach((el) => el.classList.toggle('hidden', !isDark));
      document
        .querySelectorAll('.how-bg-white')
        .forEach((el) => el.classList.toggle('hidden', isDark));
    };

    const currentTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(currentTheme);

    themeToggleBtn.addEventListener('click', () => {
      const newTheme = document.documentElement.classList.contains('dark')
        ? 'light'
        : 'dark';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  }

  // --- NAVBAR ACTIVE LINKS & STICKY ---
  const navLinks = document.querySelectorAll('.nav-link');
  const navbar = document.getElementById('navbar');

  if (navLinks.length > 0) {
    const setActiveNav = () => {
      const scrollPos = window.scrollY + 100;
      navLinks.forEach((link) => {
        const href = link.getAttribute('href');
        if (!href.startsWith('#')) return; // ignore external links

        const section = document.querySelector(href);
        if (
          section &&
          scrollPos >= section.offsetTop &&
          scrollPos < section.offsetTop + section.offsetHeight
        ) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

    };
    window.addEventListener('scroll', setActiveNav);
    setActiveNav();
  }

  if (navbar) {
    const handleStickyNav = () => {
      const threshold = window.innerWidth < 768 ? 83 : 92;
      navbar.classList.toggle('md:sticky', window.scrollY > threshold);
      navbar.classList.toggle('md:top-0', window.scrollY > threshold);
    };
    window.addEventListener('scroll', handleStickyNav);
    handleStickyNav();
  }

  // --- MOBILE MENU ---
  const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
  const mobileMenuSheet = document.getElementById('mobile-menu-sheet');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileMenuTrigger && mobileMenuSheet && mobileMenuOverlay) {
    const openMobileMenu = () => {
      mobileMenuSheet.classList.remove('-translate-x-full');
      mobileMenuOverlay.classList.remove('hidden');
    };
    const closeMobileMenu = () => {
      mobileMenuSheet.classList.add('-translate-x-full');
      mobileMenuOverlay.classList.add('hidden');
    };

    mobileMenuTrigger.addEventListener('click', openMobileMenu);
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
    mobileLinks.forEach((link) =>
      link.addEventListener('click', closeMobileMenu)
    );
  }

  // --- TYPING EFFECT ---
  const typingElement = document.getElementById('typing-effect');
  if (typingElement) {
    const words = [
      'Article Generator',
      'Content Improver',
      'Image Analyzer',
      'AI Chat with PDF',
      'AI Web Analyzer',
      'And Many More!',
    ];
    let wordIndex = 0,
      charIndex = 0,
      isDeleting = false;

    function type() {
      const currentWord = words[wordIndex];
      let displayText = currentWord.substring(0, charIndex);
      typingElement.innerHTML = `${displayText}<span class="typing-cursor">&nbsp;</span>`;

      if (!isDeleting && charIndex < currentWord.length) {
        charIndex++;
        setTimeout(type, 150);
      } else if (isDeleting && charIndex > 0) {
        charIndex--;
        setTimeout(type, 100);
      } else {
        isDeleting = !isDeleting;
        if (!isDeleting) wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, isDeleting ? 1500 : 500);
      }
    }
    type();
  }

  // --- VIDEO MODAL ---
  const videoThumbnail = document.getElementById('video-thumbnail');
  const videoModal = document.getElementById('video-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const bannerVideo = document.getElementById('banner-video');

  if (videoThumbnail && videoModal && closeModalBtn && bannerVideo) {
    videoThumbnail.addEventListener('click', () => {
      videoModal.classList.remove('hidden');
      videoModal.classList.add('flex');
      bannerVideo.play();
    });
    const closeModal = () => {
      videoModal.classList.add('hidden');
      videoModal.classList.remove('flex');
      bannerVideo.pause();
      bannerVideo.currentTime = 0;
    };
    closeModalBtn.addEventListener('click', closeModal);
    videoModal.addEventListener('click', (e) => {
      if (e.target === videoModal) closeModal();
    });
  }

  // --- SWIPER COVERFLOW ---
  if (document.querySelector('.swiper_container')) {
    new Swiper('.swiper_container', {
      effect: 'coverflow',
      grabCursor: true,
      centeredSlides: true,
      loop: true,
      slidesPerView: 1,
      coverflowEffect: { rotate: 0, stretch: 0, depth: 100, modifier: 2.5 },
      pagination: { el: '.swiper-pagination', clickable: true },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      breakpoints: {
        640: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 3, spaceBetween: 40 },
        1024: { slidesPerView: 4, spaceBetween: 50 },
      },
    });
  }

  // --- COUNTER ANIMATION ---
  const workSmarterSection = document.getElementById('work-smarter-section');
  if (workSmarterSection) {
    const stats = [
      { id: 'stat-1', end: 12000, format: (n) => `${Math.round(n / 1000)}K` },
      { id: 'stat-2', end: 98, format: (n) => `${Math.round(n)}%` },
      { id: 'stat-3', end: 25, format: (n) => `${Math.round(n)}` },
      { id: 'stat-4', end: 92, format: (n) => `${Math.round(n)}%` },
    ];
    const animateCounter = (el, start, end, duration, formatFn) => {
      let startTime = null;
      const step = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        el.textContent = formatFn(start + progress * (end - start));
        if (progress < 1) window.requestAnimationFrame(step);
      };
      window.requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          stats.forEach((stat) => {
            const el = document.getElementById(stat.id);
            if (el) animateCounter(el, 0, stat.end, 2000, stat.format);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(workSmarterSection);
  }

  // --- PRICING TABS ---
  const tabTriggers = document.querySelectorAll('.pricing-tab-trigger');
  const tabContents = document.querySelectorAll('.pricing-tab-content');
  if (tabTriggers.length > 0 && tabContents.length > 0) {
    const setActiveTab = (tab) => {
      tabTriggers.forEach((trigger) => {
        const isActive = trigger.dataset.tab === tab;
        trigger.classList.toggle(
          'dark:bg-[linear-gradient(180deg,_#7A43A4_0%,_#6049BC_100%)]',
          isActive
        );
        trigger.classList.toggle('bg-[#7A43A4]', isActive);
        trigger.classList.toggle('text-white', isActive);
        trigger.classList.toggle('dark:text-[#7A43A4]', !isActive);
        trigger.classList.toggle('text-[#070622]', !isActive);
      });
      tabContents.forEach((content) =>
        content.classList.toggle('hidden', content.id !== `${tab}-content`)
      );
    };
    tabTriggers.forEach((trigger) =>
      trigger.addEventListener('click', () => setActiveTab(trigger.dataset.tab))
    );
    setActiveTab('monthly');
  }

  // --- ACCORDION TESTIMONIALS ---
  const accordionItems = document.querySelectorAll('.accordion-item');
  if (accordionItems.length > 0) {
    accordionItems.forEach((item) => {
      const trigger = item.querySelector('.accordion-trigger');
      trigger.addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        accordionItems.forEach((i) => {
          i.classList.remove('open');
          const content = i.querySelector('.accordion-content');
          if (content) content.style.maxHeight = null;
          const plus = i.querySelector('.icon-plus');
          if (plus) plus.style.opacity = '1';
          const minus = i.querySelector('.icon-minus');
          if (minus) minus.style.opacity = '0';
        });

        if (!isOpen) {
          item.classList.add('open');
          const content = item.querySelector('.accordion-content');
          if (content) content.style.maxHeight = content.scrollHeight + 'px';
          const plus = item.querySelector('.icon-plus');
          if (plus) plus.style.opacity = '0';
          const minus = item.querySelector('.icon-minus');
          if (minus) minus.style.opacity = '1';
        }
      });
    });
    accordionItems[0].querySelector('.accordion-trigger').click();
  }

  // --- BLOG CAROUSEL (KEEN SLIDER) ---
  const dotsContainer = document.getElementById('blog-dots');
  if (document.getElementById('blog-carousel') && dotsContainer) {
    const keenSlider = new KeenSlider('#blog-carousel', {
      loop: true,
      slides: { perView: 1, spacing: 16 },
      breakpoints: {
        '(min-width: 768px)': { slides: { perView: 2, spacing: 20 } },
        '(min-width: 1024px)': { slides: { perView: 3, spacing: 24 } },
      },
      slideChanged(slider) {
        updateDots(slider.track.details.rel);
      },
      created(slider) {
        const slidesCount = slider.track.details.slides.length;
        for (let i = 0; i < slidesCount; i++) {
          const dot = document.createElement('button');
          dot.addEventListener('click', () => slider.moveToIdx(i));
          dotsContainer.appendChild(dot);
        }
        updateDots(0);
        setInterval(() => {
          slider.next();
        }, 4000);
      },
    });

    function updateDots(current) {
      const dots = dotsContainer.querySelectorAll('button');
      dots.forEach((dot, idx) => {
        dot.className =
          'transition-all duration-300 cursor-pointer rounded-full';
        if (current === idx) {
          dot.classList.add(
            'w-8',
            'h-2.5',
            'bg-[#6049bc]',
            'dark:bg-[#6049bc]'
          );
        } else {
          dot.classList.add(
            'w-2.5',
            'h-2.5',
            'bg-[#070622]',
            'dark:bg-[#F9F9F9]'
          );
        }
      });
    }
  }

  // --- VIDEO PLAYER OVERLAY ---
  const video = document.getElementById('videoPlayer');
  const overlay = document.getElementById('playOverlay');
  if (video && overlay) {
    overlay.addEventListener('click', () => {
      overlay.style.display = 'none';
      video.play();
    });
    video.addEventListener('pause', () => {
      overlay.style.display = 'flex';
    });
    video.addEventListener('play', () => {
      overlay.style.display = 'none';
    });
  }
});
