(function () {
  // Toggle Theme
  const THEME_KEY = 'theme';
  const btnDesktop = document.getElementById('theme-toggle-desktop');
  const btnMobile = document.getElementById('theme-toggle-mobile');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  function currentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'dark';
  }

  function setTheme(theme) {
    localStorage.setItem(THEME_KEY, theme);
    applyTheme(theme);
  }

  function toggleTheme() {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
  }

  (function initTheme() {
    const saved = localStorage.getItem(THEME_KEY) || 'dark';
    applyTheme(saved);
    btnDesktop?.addEventListener('click', toggleTheme);
    btnMobile?.addEventListener('click', toggleTheme);
  })();

  //  Global loader
  const globalLoader = document.getElementById('global-loader');
  let globalLoaderTimer = null;

  function showGlobalLoader(durationMs = 300) {
    if (!globalLoader) return;
    globalLoader.style.display = 'flex';
    if (globalLoaderTimer) clearTimeout(globalLoaderTimer);
    globalLoaderTimer = setTimeout(() => {
      globalLoader.style.display = 'none';
      globalLoaderTimer = null;
    }, Math.max(0, durationMs | 0));
  }

  // Expose for tools to use
  window.showGlobalLoader = showGlobalLoader;

  (function showOnReload() {
    showGlobalLoader(300);
    window.addEventListener('load', () => {
      setTimeout(() => { if (globalLoader) globalLoader.style.display = 'none'; }, 300);
    });
  })();

})();
