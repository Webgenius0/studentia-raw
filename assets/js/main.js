// Google Translate init
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en' },
    'google_translate_element'
  );
}

// Dropdown toggle
const langBtn = document.getElementById('langBtn');
const langMenu = document.getElementById('langMenu');

langBtn.addEventListener('click', () => {
  langMenu.classList.toggle('hidden');
});

// Set language
function setLanguage(lang, flagUrl, name) {
  document.getElementById('langIcon').src = flagUrl; // works if flagUrl is .svg/.png
  document.getElementById('langName').textContent = name;
  document.getElementById('langMenu').classList.add('hidden');

  const select =
    document.querySelector('.goog-te-combo') ||
    document.querySelector('#google_translate_element select');

  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  }
}

document.addEventListener('DOMContentLoaded', function () {
  // --- INITIALIZE AOS ---
  AOS.init({ once: true, duration: 800 });

  // --- NAVBAR & THEME LOGIC (from previous conversion) ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const navLinks = document.querySelectorAll('.nav-link');
  function setActiveNav() {
    const scrollPos = window.scrollY + 100;

    navLinks.forEach((link) => {
      const section = document.querySelector(link.getAttribute('href'));
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
  }

  window.addEventListener('scroll', setActiveNav);
  setActiveNav();
 const applyTheme = (theme) => {
   const isDark = theme === 'dark';
   document.documentElement.classList.toggle('dark', isDark);

   const sunIcon = document.getElementById('theme-icon-sun');
   const moonIcon = document.getElementById('theme-icon-moon');
   if (sunIcon) sunIcon.classList.toggle('hidden', !isDark);
   if (moonIcon) moonIcon.classList.toggle('hidden', isDark);

   const logoDark = document.getElementById('logo-dark');
   const logoLight = document.getElementById('logo-light');
   if (logoDark) logoDark.classList.toggle('hidden', !isDark);
   if (logoLight) logoLight.classList.toggle('hidden', isDark);
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

  // --- MOBILE MENU LOGIC (FIXED) ---
  const mobileMenuTrigger = document.getElementById('mobile-menu-trigger');
  const mobileMenuSheet = document.getElementById('mobile-menu-sheet');
  const mobileMenuOverlay = document.getElementById('mobile-menu-overlay');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
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
  const navbar = document.getElementById('navbar');
  const handleStickyNav = () => {
    let threshold = window.innerWidth < 768 ? 83 : 92;
    navbar.classList.toggle('md:sticky', window.scrollY > threshold);
    navbar.classList.toggle('md:top-0', window.scrollY > threshold);
  };
  window.addEventListener('scroll', handleStickyNav);
  handleStickyNav();

  // --- TYPING EFFECT ---
  const typingElement = document.getElementById('typing-effect');
  const words = [
    'Article Generator',
    'Content Improver',
    'Image Analyzer',
    'AI Chat with PDF',
    'AI Web Analyzer',
    'And Many More!',
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

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
      if (!isDeleting) {
        wordIndex = (wordIndex + 1) % words.length;
      }
      setTimeout(type, isDeleting ? 1500 : 500);
    }
  }
  type();

  // --- VIDEO MODAL ---
  const videoThumbnail = document.getElementById('video-thumbnail');
  const videoModal = document.getElementById('video-modal');
  const closeModalBtn = document.getElementById('close-modal-btn');
  const bannerVideo = document.getElementById('banner-video');

  videoThumbnail?.addEventListener('click', () => {
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

  // --- NEW COVERFLOW SLIDER ---
  new Swiper('.swiper_container', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    loop: true,
    slidesPerView: 1, // Default for mobile
    coverflowEffect: {
      rotate: 0,
      stretch: 0,
      depth: 100,
      modifier: 2.5,
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      640: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40,
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50,
      },
    },
  });

  // --- COUNTER ANIMATION ---
  const stats = [
    { id: 'stat-1', end: 12000, format: (n) => `${Math.round(n / 1000)}K` },
    { id: 'stat-2', end: 98, format: (n) => `${Math.round(n)}%` },
    { id: 'stat-3', end: 25, format: (n) => `${Math.round(n)}` },
    { id: 'stat-4', end: 92, format: (n) => `${Math.round(n)}%` },
  ];
  const workSmarterSection = document.getElementById('work-smarter-section');
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
          animateCounter(el, 0, stat.end, 2000, stat.format);
        });
        observer.disconnect();
      }
    },
    { threshold: 0.5 }
  );
  observer.observe(workSmarterSection);

  // --- PRICING TABS ---
  const tabTriggers = document.querySelectorAll('.pricing-tab-trigger');
  const tabContents = document.querySelectorAll('.pricing-tab-content');
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
    tabContents.forEach((content) => {
      content.classList.toggle('hidden', content.id !== `${tab}-content`);
    });
  };
  tabTriggers.forEach((trigger) =>
    trigger.addEventListener('click', () => setActiveTab(trigger.dataset.tab))
  );
  setActiveTab('monthly'); // Set initial active tab

  // --- TESTIMONIALS ---
  const accordionItems = document.querySelectorAll('.accordion-item');

  accordionItems.forEach((item) => {
    const trigger = item.querySelector('.accordion-trigger');
    trigger.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');

      // Close all others
      accordionItems.forEach((i) => {
        i.classList.remove('open');
        i.querySelector('.accordion-content').style.maxHeight = null;
        i.querySelector('.icon-plus').style.opacity = '1';
        i.querySelector('.icon-minus').style.opacity = '0';
      });

      // Open this one
      if (!isOpen) {
        item.classList.add('open');
        const content = item.querySelector('.accordion-content');
        content.style.maxHeight = content.scrollHeight + 'px';
        item.querySelector('.icon-plus').style.opacity = '0';
        item.querySelector('.icon-minus').style.opacity = '1';
      }
    });
  });

  // Open first item by default
  if (accordionItems.length > 0)
    accordionItems[0].querySelector('.accordion-trigger').click();

  // --- BLOG CAROUSEL (KEEN SLIDER - STYLED TO MATCH IMAGE) ---
  const dotsContainer = document.getElementById('blog-dots');

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
      // Autoplay
      setInterval(() => {
        slider.next();
      }, 4000);
    },
  });

  function updateDots(current) {
    const dots = dotsContainer.querySelectorAll('button');
    dots.forEach((dot, idx) => {
      dot.className = 'transition-all duration-300 cursor-pointer rounded-full'; // Reset classes

      if (current === idx) {
        dot.classList.add('w-8', 'h-2.5', 'bg-[#6049bc]', 'dark:bg-[#6049bc]');
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
});

//  video pleyer

const video = document.getElementById('videoPlayer');
const overlay = document.getElementById('playOverlay');

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
