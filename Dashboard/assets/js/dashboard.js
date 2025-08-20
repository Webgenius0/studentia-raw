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
   // Data for sidebar navigation
   const sidebarItems = [
     {
       title: 'Writing tools',
       route: 'writing-tools',
       hasSubmenu: true,
       icon: './assets/images/icons/writing-tools-icon.svg',
       subItems: [
         { name: 'Ai Writer', route: 'writing-tools-ai-writers' },
         { name: 'Article Writer', route: 'writing-tools-article-writer' },
         { name: 'Ai Code', route: 'writing-tools-ai-code' },
       ],
     },
     {
       title: 'Revision Tools',
       route: 'revision-tools',
       hasSubmenu: true,
       icon: './assets/images/icons/revision-tools-icon.svg',
       subItems: [
         { name: 'Pdf Scan', route: 'revision-tools-pdf-scan' },
         { name: 'Ai Quiz', route: 'revision-tools-ai-quiz' },
         { name: 'Ai Podcast', route: 'revision-tools-podcast' },
       ],
     },
     {
       title: 'Documents',
       route: 'documents',
       hasSubmenu: true,
       icon: './assets/images/icons/documents-icon.svg',
       subItems: [
         { name: 'All documents', route: 'documents-all' },
         { name: 'All Codes', route: 'documents-codes' },
         { name: 'Workbooks', route: 'documents-workbooks' },
       ],
     },
     {
       title: 'Subscription Panel',
       route: 'subscription-panel',
       hasSubmenu: false,
       icon: './assets/images/icons/subscription-panel-icon.svg',
     },
     {
       title: 'Account',
       route: 'account',
       hasSubmenu: false,
       icon: './assets/images/icons/account-icon.svg',
     },
     {
       title: 'Admin Panel',
       route: 'admin-panel',
       hasSubmenu: false,
       icon: './assets/images/icons/admin-panel-icon.svg',
     },
   ];

   // DOM Elements
   const htmlElement = document.documentElement;
   const sidebar = document.getElementById('sidebar');
   const overlay = document.getElementById('overlay');
   const sidebarToggle = document.getElementById('sidebar-toggle');
   const mainContent = document.getElementById('main-content');
   const sidebarMenu = document.getElementById('sidebar-menu');
   const themeToggleBtn = document.getElementById('theme-toggle');
   const themeIconSun = document.getElementById('theme-icon-sun');
   const themeIconMoon = document.getElementById('theme-icon-moon');
   const langBtn = document.getElementById('langBtn');
   const langMenu = document.getElementById('langMenu');

   // Functions to handle UI state
   let isSidebarOpen = false;

   function closeSidebar() {
     isSidebarOpen = false;
     sidebar.classList.add('ml-[-320px]');
     sidebar.classList.remove('ml-[2px]');
     overlay.classList.add('hidden');
     overlay.classList.remove('translate-x-0');
   }

   function openSidebar() {
     isSidebarOpen = true;
     sidebar.classList.remove('ml-[-320px]');
     sidebar.classList.add('ml-[2px]');
     overlay.classList.remove('hidden');
     overlay.classList.add('translate-x-0');
   }

   function toggleSidebar() {
     if (isSidebarOpen) {
       closeSidebar();
     } else {
       openSidebar();
     }
   }

   function applyTheme(theme) {
     if (theme === 'dark') {
       htmlElement.classList.add('dark');
       htmlElement.classList.remove('light');
       themeIconSun.classList.add('hidden');
       themeIconMoon.classList.remove('hidden');
     } else {
       htmlElement.classList.add('light');
       htmlElement.classList.remove('dark');
       themeIconSun.classList.remove('hidden');
       themeIconMoon.classList.add('hidden');
     }
   }

   // Dynamic content loading
   async function loadContent(route) {
     const url = `${route}.html`;
     try {
       const response = await fetch(url);
       if (!response.ok) {
         throw new Error(`Could not load ${url}`);
       }
       const html = await response.text();
       mainContent.innerHTML = html;
     } catch (error) {
       console.error(error);
       mainContent.innerHTML = `<div class="p-8 text-center text-red-500">
            <h1 class="text-4xl font-bold">Error 404</h1>
            <p class="mt-2 text-xl">Content for "${route}" not found.</p>
          </div>`;
     }
   }

   // Update active links
   function updateActiveLinks() {
     const currentHash = window.location.hash.substring(1) || 'dashboard';

     document.querySelectorAll('.sidebar-link').forEach((link) => {
       const linkRoute = link.getAttribute('data-route');
       const pElement = link.querySelector('p');

       if (linkRoute === currentHash) {
         link.classList.add('bg-gradient-purple');
         pElement.classList.remove(
           'dark:text-[#E6A0E2]',
           'light:text-[#6049BC]'
         );
         pElement.classList.add('text-white');
       } else {
         link.classList.remove('bg-gradient-purple');
         pElement.classList.remove('text-white');
         pElement.classList.add('dark:text-[#E6A0E2]', 'light:text-[#6049BC]');
       }
     });

     document.querySelectorAll('.submenu-item').forEach((link) => {
       const linkRoute = link.getAttribute('data-route');
       const linkP = link.querySelector('p');

       if (linkRoute === currentHash) {
         link.classList.add('dark:bg-[#2D3240]', 'light:bg-gray-200');
         linkP.classList.remove('text-light-dark-70');
         linkP.classList.add('text-light-dark');
       } else {
         link.classList.remove('dark:bg-[#2D3240]', 'light:bg-gray-200');
         linkP.classList.remove('text-light-dark');
         linkP.classList.add('text-light-dark-70');
       }
     });
   }

   // Render the sidebar menu
   function renderSidebar() {
     sidebarMenu.innerHTML = '';
     sidebarItems.forEach((item) => {
       const div = document.createElement('div');
       const isActive = window.location.hash.includes(item.route);

       const mainLink = document.createElement('a');
       mainLink.href = `#${item.route}`;
       mainLink.className = `sidebar-link flex items-center justify-between rounded-[6px] px-4 py-[10px] cursor-pointer
            ${
              isActive
                ? 'bg-gradient-purple'
                : 'border border-[#E6A0E2] hover:dark:bg-[#2D3240] hover:light:bg-gray-100'
            } transition-all duration-300`;
       mainLink.setAttribute('data-route', item.route);
       mainLink.innerHTML = `
            <div class="flex items-center gap-2 cursor-pointer">
              <img src="${item.icon}" alt="icon" />
              <p class="text-base font-medium leading-[132%] tracking-[-0.316px] ${
                isActive
                  ? 'text-white'
                  : 'dark:text-[#E6A0E2] light:text-[#6049BC]'
              }">${item.title}</p>
            </div>
            ${
              item.hasSubmenu
                ? `<img src="./assets/images/icons/lower-arrow-icon.svg" alt="icon" class="hover:scale-110 transition-transform" />`
                : ''
            }
          `;
       div.appendChild(mainLink);

       if (item.hasSubmenu) {
         const submenuContainer = document.createElement('div');
         submenuContainer.className = `submenu flex flex-col gap-1 px-4 mt-2 ${
           isActive ? '' : 'hidden'
         }`;

         item.subItems.forEach((subItem) => {
           const subLink = document.createElement('a');
           subLink.href = `#${subItem.route}`;
           subLink.className = `submenu-item flex items-center gap-4 pl-8 py-3 rounded transition-all duration-300 cursor-pointer`;
           subLink.setAttribute('data-route', subItem.route);
           subLink.innerHTML = `
                <p class="text-sm dark:text-light-dark-70 light:text-light-dark-70">${subItem.name}</p>
              `;
           submenuContainer.appendChild(subLink);
         });
         div.appendChild(submenuContainer);

         mainLink.addEventListener('click', (e) => {
           e.preventDefault();
           const isCurrentlyActive =
             submenuContainer.classList.contains('hidden');
           document
             .querySelectorAll('.submenu')
             .forEach((sub) => sub.classList.add('hidden'));
           if (isCurrentlyActive) {
             submenuContainer.classList.remove('hidden');
           }
           window.location.hash = item.route;
         });
       }
       sidebarMenu.appendChild(div);
     });
   }

   // Initial load and event listeners
   window.addEventListener('hashchange', () => {
     const route = window.location.hash.substring(1) || 'dashboard';
     loadContent(route);
     updateActiveLinks();
   });

   // Sidebar Toggle for Mobile
   sidebarToggle.addEventListener('click', toggleSidebar);
   overlay.addEventListener('click', closeSidebar);

   // Theme Toggle
   themeToggleBtn.addEventListener('click', () => {
     const isDark = htmlElement.classList.contains('dark');
     const newTheme = isDark ? 'light' : 'dark';
     localStorage.setItem('theme', newTheme);
     applyTheme(newTheme);
   });

   // Initial setup
   const initialTheme = localStorage.getItem('theme') || 'dark';
   applyTheme(initialTheme);
   renderSidebar();
   const initialRoute = window.location.hash.substring(1) || 'dashboard';
   loadContent(initialRoute);
   updateActiveLinks();

   
 });


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







