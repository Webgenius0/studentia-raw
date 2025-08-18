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
     const applyTheme = (theme) => {
       const isDark = theme === 'dark';
       document.documentElement.classList.toggle('dark', isDark);
       document
         .getElementById('theme-icon-sun')
         .classList.toggle('hidden', !isDark);
       document
         .getElementById('theme-icon-moon')
         .classList.toggle('hidden', isDark);
       document.getElementById('logo-dark').classList.toggle('hidden', !isDark);
       document.getElementById('logo-light').classList.toggle('hidden', isDark);
       document
         .getElementById('footer-logo-dark')
         .classList.toggle('hidden', isDark);
       document
         .getElementById('footer-logo-light')
         .classList.toggle('hidden', !isDark);
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
         640: { slidesPerView: 2, spaceBetween: 20 },
         768: { slidesPerView: 3, spaceBetween: 40 },
         1024: { slidesPerView: 3, spaceBetween: 50 }, // Adjusted for better look
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
         trigger.classList.toggle('dark:text-primary', !isActive);
         trigger.classList.toggle('text-[#070622]', !isActive);
       });
       tabContents.forEach((content) => {
         content.classList.toggle('hidden', content.id !== `${tab}-content`);
       });
     };
     tabTriggers.forEach((trigger) =>
       trigger.addEventListener('click', () =>
         setActiveTab(trigger.dataset.tab)
       )
     );
     setActiveTab('monthly'); // Set initial active tab

     // --- TESTIMONIALS ---
     const testimonialsData = [
       {
         name: 'Cameron Williamson',
         role: 'President of Sales',
         text: 'Incredibly useful for students! It offers a variety of resources that make studying for exams a breeze.',
         avatar: 'https://i.pravatar.cc/150?img=4',
       },
       {
         name: 'Ronald Richards',
         role: 'Web Designer',
         text: 'A must-have site for students, ideal for efficient revision and quick report writing! Highly recommended!',
         avatar: 'https://i.pravatar.cc/150?img=5',
       },
       {
         name: 'Devon Lane',
         role: 'Marketing Coordinator',
         text: 'This site is fantastic for learning how to use the humanizer tool; it really eases worries about AI detectors.',
         avatar: 'https://i.pravatar.cc/150?img=6',
       },
       {
         name: 'Annette Black',
         role: 'Dog Trainer',
         text: 'This site is awesome for understanding how to use the humanizer; it really helps us relax about AI detectors.',
         avatar: 'https://i.pravatar.cc/150?img=7',
       },
       {
         name: 'Esther Howard',
         role: 'Marketing Coordinator',
         text: "I can't recommend this website enough! It has truly surpassed my expectations in every aspect.",
         avatar: 'https://i.pravatar.cc/150?img=8',
       },
       {
         name: 'Eleanor Pena',
         role: 'Web Designer',
         text: 'This website is a game-changer for students! It provides a wealth of resources that make studying for exams a breeze.',
         avatar: 'https://i.pravatar.cc/150?img=9',
       },
       {
         name: 'Jacob Jones',
         role: 'President of Sales',
         text: 'An essential site for students, perfect for efficient studying and drafting papers quickly! I highly recommend it.',
         avatar: 'https://i.pravatar.cc/150?img=10',
       },
       {
         name: 'Cameron Williamson',
         role: 'Web Designer',
         text: 'This site is fantastic for learning how to use the humanizer tool; it really eases the worries about AI detectors.',
         avatar: 'https://i.pravatar.cc/150?img=11',
       },
     ];
     const grid = document.getElementById('testimonials-grid');
     const toggleBtn = document.getElementById('testimonials-toggle-btn');
     const fadeEl = document.getElementById('testimonials-fade');
     let showAll = false;

     const renderTestimonials = () => {
       const itemsToShow = showAll
         ? testimonialsData
         : testimonialsData.slice(0, 4);
       grid.innerHTML = itemsToShow
         .map(
           (item) => `
                    <div class="dark:bg-[#060b24]/90 bg-white p-4 border dark:border-white/10 border-gray-200 rounded-[22px] transition-all duration-300 dark:hover:shadow-[0_0_20px_rgba(124,58,237,0.4)]" data-aos="fade-up">
                        <div class="flex items-center gap-3">
                            <img src="${item.avatar}" alt="${item.name}" class="w-10 h-10 rounded-full object-cover"/>
                            <div><p class="font-semibold">${item.name}</p><p class="text-sm text-gray-400">${item.role}</p></div>
                        </div>
                        <p class="text-sm dark:text-gray-300 text-gray-500 mt-3">${item.text}</p>
                    </div>
                `
         )
         .join('');
     };

     toggleBtn.addEventListener('click', () => {
       showAll = !showAll;
       toggleBtn.textContent = showAll ? 'Show Less' : 'Read More';
       fadeEl.classList.toggle('hidden', showAll);
       renderTestimonials();
     });
     renderTestimonials();

     // --- FAQ ACCORDION (Corrected Icons & Design) ---
     const faqData = [
       {
         question: 'What is Student-IA and how does it work?',
         answer:
           'An intelligent educational assistant, Student-IA is a digital tool that helps students solve problems, write content, and better understand their courses.',
       },
       {
         question: 'How can Student-IA help me improve my academic results?',
         answer:
           'By providing instant feedback, personalized study plans, and access to a vast database of knowledge, Student-IA helps you learn more efficiently and effectively.',
       },
       {
         question: 'Is there a free trial available for Student-IA?',
         answer:
           'Yes, we offer a free trial with limited access to features so you can experience the power of Student-IA before committing to a plan.',
       },
     ];
     const accordionContainer = document.getElementById('faq-accordion');
     accordionContainer.innerHTML = faqData
       .map(
         (item, index) => `
                <div class="accordion-item border border-[#433c61] rounded-lg bg-gradient-to-br from-[#2B2B5C]/30 to-[#1A1A3C]/30 backdrop-blur-[10px]">
                    <button class="accordion-trigger w-full flex justify-between items-center text-left text-black dark:text-white font-medium px-4 py-4">
                        <span>${item.question}</span>
                        <div class="relative w-6 h-6 flex items-center justify-center">
                            <svg class="icon-plus w-6 h-6 transition-opacity" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path></svg>
                            <svg class="icon-minus w-6 h-6 absolute transition-opacity opacity-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20 12H4"></path></svg>
                        </div>
                    </button>
                    <div class="accordion-content">
                        <div class="px-4 pb-4 text-gray-600 dark:text-[#BCBCBC]"><div class="w-full border-t border-white/10 my-2"></div>${item.answer}</div>
                    </div>
                </div>
            `
       )
       .join('');

     const accordionItems =
       accordionContainer.querySelectorAll('.accordion-item');
     accordionItems.forEach((item) => {
       const trigger = item.querySelector('.accordion-trigger');
       trigger.addEventListener('click', () => {
         const isOpen = item.classList.contains('open');
         accordionItems.forEach((i) => {
           // Close all others
           i.classList.remove('open');
           i.querySelector('.accordion-content').style.maxHeight = null;
           i.querySelector('.icon-plus').style.opacity = '1';
           i.querySelector('.icon-minus').style.opacity = '0';
         });
         if (!isOpen) {
           item.classList.add('open');
           const content = item.querySelector('.accordion-content');
           content.style.maxHeight = content.scrollHeight + 'px';
           item.querySelector('.icon-plus').style.opacity = '0';
           item.querySelector('.icon-minus').style.opacity = '1';
         }
       });
     });
     if (accordionItems.length > 0)
       accordionItems[0].querySelector('.accordion-trigger').click(); // Open first one by default

     // --- BLOG CAROUSEL (KEEN SLIDER - STYLED TO MATCH IMAGE) ---
     const blogsData = [
       {
         title: 'How Our AI Startup is Transforming Industries',
         date: 'Jul 21',
         tag: 'Technology',
         image: 'https://i.imgur.com/8n11K39.png',
         desc: 'In an age where innovation reigns supreme, artificial intelligence (AI) has emerged as the trailblazer, revolutionizing the way we live, work, and interact.',
       },
       {
         title: 'Notre vision',
         date: 'Jul 21',
         tag: 'Technology',
         image: 'https://i.imgur.com/k2vr75V.png',
         desc: 'In an age where innovation reigns supreme, artificial intelligence (AI) has emerged as the trailblazer, revolutionizing the way we live, work, and interact.',
       },
       {
         title: 'Student-IA',
         date: 'Jul 21',
         tag: 'Technology',
         image: 'https://i.imgur.com/w9zW5cT.png',
         desc: 'In an age where innovation reigns supreme, artificial intelligence (AI) has emerged as the trailblazer, revolutionizing the way we live, work, and interact.',
       },
       {
         title: 'Our Vision Revisited',
         date: 'Jul 21',
         tag: 'Technology',
         image: 'https://i.imgur.com/k2vr75V.png',
         desc: 'In an age where innovation reigns supreme, artificial intelligence (AI) has emerged as the trailblazer, revolutionizing the way we live, work, and interact.',
       },
       {
         title: 'The Future with Student-IA',
         date: 'Jul 21',
         tag: 'Technology',
         image: 'https://i.imgur.com/w9zW5cT.png',
         desc: 'In an age where innovation reigns supreme, artificial intelligence (AI) has emerged as the trailblazer, revolutionizing the way we live, work, and interact.',
       },
     ];
     const carousel = document.getElementById('blog-carousel');
     const dotsContainer = document.getElementById('blog-dots');

     carousel.innerHTML = blogsData
       .map(
         (blog) => `
                <div class="keen-slider__slide">
                    <div class="p-5 border border-gray-200 dark:border-[#3a2c6c] rounded-xl dark:bg-gradient-to-br dark:from-[#221C4A] dark:to-[#3B2B6C] bg-[#EDF0FA] h-full flex flex-col">
                        <img src="${blog.image}" alt="${blog.title}" class="w-full h-[200px] object-cover rounded-lg mb-4">
                        <div class="text-left flex-grow flex flex-col">
                           <div class="flex items-center space-x-2 text-xs text-gray-600 dark:text-gray-400 mb-2">
                               <span class="px-2 py-1 rounded bg-gray-200 dark:bg-white/10">${blog.tag}</span>
                               <span class="rounded-full h-1.5 w-1.5 bg-gray-500 dark:bg-white/50"></span>
                               <span>${blog.date}</span>
                           </div>
                           <h3 class="text-black dark:text-white text-xl font-semibold mb-1 flex-grow">${blog.title}</h3>
                           <p class="text-gray-600 dark:text-[#BCBCBC] text-base font-normal">${blog.desc}</p>
                        </div>
                    </div>
                </div>
            `
       )
       .join('');

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
         dot.className =
           'transition-all duration-300 cursor-pointer rounded-full'; // Reset classes
         if (current === idx) {
           dot.classList.add('w-8', 'h-2.5', 'bg-white');
         } else {
           dot.classList.add('w-2.5', 'h-2.5', 'bg-white/40');
         }
       });
     }
   });



  //  video pleyer


      const video = document.getElementById("videoPlayer");
      const overlay = document.getElementById("playOverlay");

      overlay.addEventListener("click", () => {
        overlay.style.display = "none";
        video.play();
      });

      video.addEventListener("pause", () => {
        overlay.style.display = "flex";
      });

      video.addEventListener("play", () => {
        overlay.style.display = "none";
      });
