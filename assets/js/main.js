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