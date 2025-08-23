// Tailwind dark mode config (if needed in JS)
tailwind.config = {
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#7A43A4',
        secondary: '#6049BC',
      },
    },
  },
};

document.addEventListener('DOMContentLoaded', () => {
  const htmlElement = document.documentElement;

  // Sidebar Elements
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('overlay');
  const sidebarToggle = document.getElementById('sidebar-toggle');

  // Theme Elements
  const themeToggleBtn = document.getElementById('theme-toggle');
  const themeIconSun = document.getElementById('theme-icon-sun');
  const themeIconMoon = document.getElementById('theme-icon-moon');

  // Language Elements
  const langBtn = document.getElementById('langBtn');
  const langMenu = document.getElementById('langMenu');

  // Sidebar toggle state
  let isSidebarOpen = false;

  function openSidebar() {
    isSidebarOpen = true;
    if (sidebar) sidebar.classList.remove('ml-[-320px]');
    if (sidebar) sidebar.classList.add('ml-[2px]');
    if (overlay) overlay.classList.remove('hidden');
  }

  function closeSidebar() {
    isSidebarOpen = false;
    if (sidebar) sidebar.classList.add('ml-[-320px]');
    if (sidebar) sidebar.classList.remove('ml-[2px]');
    if (overlay) overlay.classList.add('hidden');
  }

  function toggleSidebar() {
    isSidebarOpen ? closeSidebar() : openSidebar();
  }

  // Apply Theme
  function applyTheme(theme) {
    if (theme === 'dark') {
      htmlElement.classList.add('dark');
      htmlElement.classList.remove('light');
      if (themeIconSun) themeIconSun.classList.add('hidden');
      if (themeIconMoon) themeIconMoon.classList.remove('hidden');
    } else {
      htmlElement.classList.add('light');
      htmlElement.classList.remove('dark');
      if (themeIconSun) themeIconSun.classList.remove('hidden');
      if (themeIconMoon) themeIconMoon.classList.add('hidden');
    }
  }

  // Sidebar toggle events
  if (sidebarToggle) sidebarToggle.addEventListener('click', toggleSidebar);
  if (overlay) overlay.addEventListener('click', closeSidebar);

  // Theme toggle event
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isDark = htmlElement.classList.contains('dark');
      const newTheme = isDark ? 'light' : 'dark';
      localStorage.setItem('theme', newTheme);
      applyTheme(newTheme);
    });
  }

  // Language dropdown toggle
  if (langBtn && langMenu) {
    langBtn.addEventListener('click', () => {
      langMenu.classList.toggle('hidden');
    });
  }

  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'dark';
  applyTheme(savedTheme);
});

// Google Translate init
function googleTranslateElementInit() {
  new google.translate.TranslateElement(
    { pageLanguage: 'en' },
    'google_translate_element'
  );
}

// Set language function
function setLanguage(lang, flagUrl, name) {
  const langIcon = document.getElementById('langIcon');
  const langName = document.getElementById('langName');
  const langMenu = document.getElementById('langMenu');

  if (langIcon) langIcon.src = flagUrl;
  if (langName) langName.textContent = name;
  if (langMenu) langMenu.classList.add('hidden');

  const select =
    document.querySelector('.goog-te-combo') ||
    document.querySelector('#google_translate_element select');

  if (select) {
    select.value = lang;
    select.dispatchEvent(new Event('change'));
  }
}
