const toggleBtn = document.getElementById('darkModeToggle');

function updateToggleIcon(mode) {
  if (mode === 'dark') {
    toggleBtn.innerHTML = '<i class="fas fa-moon text-yellow-400"></i>';
    toggleBtn.setAttribute('title', 'Switch to Light Mode');
  } else {
    toggleBtn.innerHTML = '<i class="fas fa-sun text-orange-400"></i>';
    toggleBtn.setAttribute('title', 'Switch to Dark Mode');
  }
}

function applyTheme(mode) {
  const body = document.body;
  body.setAttribute('data-theme', mode);

  if (toggleBtn) {
    toggleBtn.style.background = mode === 'dark' ? '#1e293b' : '#e2e8f0';
    toggleBtn.style.color = mode === 'dark' ? '#ffd166' : '#1f2937';
  }

  const hero = document.getElementById('heroSection');
  if (hero) {
    if (mode === 'dark') {
      hero.style.background = 'linear-gradient(to bottom, #0f172a, #000000, #1e293b)';
      hero.style.color = '#ffffff';
    } else {
      hero.style.background = 'linear-gradient(to bottom, #ffffff, #f8fafc, #e2e8f0)';
      hero.style.color = '#0f172a';
    }
  }

  localStorage.setItem('site-theme', mode);
  updateToggleIcon(mode);
}

function getInitialTheme() {
  const saved = localStorage.getItem('site-theme');
  if (saved) return saved;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  return prefersDark ? 'dark' : 'light';
}

const initialTheme = getInitialTheme();
applyTheme(initialTheme);

toggleBtn.addEventListener('click', () => {
  const current = document.body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
});
