// Keep the footer date up to date.
document.getElementById('year').textContent = new Date().getFullYear();

// Collapsible navigation on smaller screens.
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.getElementById('navigation');
const mobileScreen = window.matchMedia('(max-width: 700px)');

function setMenuOpen(open) {
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.hidden = mobileScreen.matches && !open;
  menuButton.textContent = open ? 'Close' : 'Menu';
}

menuButton.hidden = false;
setMenuOpen(false);
menuButton.addEventListener('click', () => {
  setMenuOpen(menuButton.getAttribute('aria-expanded') !== 'true');
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) setMenuOpen(false);
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && mobileScreen.matches && menuButton.getAttribute('aria-expanded') === 'true') {
    setMenuOpen(false);
    menuButton.focus();
  }
});
mobileScreen.addEventListener('change', () => setMenuOpen(false));

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

// One full-screen slideshow: advance by time, not scroll position.
const cakeScroll = document.querySelector('.cake-scroll');
if (cakeScroll) {
  const photos = [...cakeScroll.querySelectorAll('.parallax-photo')];
  const slideDuration = 2500;
  let currentPhoto = 0;
  let timer;

  function schedulePhoto() {
    window.clearTimeout(timer);
    if (!document.hidden && photos.length > 1) {
      timer = window.setTimeout(() => {
        photos[currentPhoto].hidden = true;
        currentPhoto = (currentPhoto + 1) % photos.length;
        photos[currentPhoto].hidden = false;
        schedulePhoto();
      }, slideDuration);
    }
  }

  document.addEventListener('visibilitychange', schedulePhoto);
  schedulePhoto();
}

// Smooth parallax scroll: the hero logo, the photo gallery, and the bakes
// showcase cutouts each drift at their own depth, lerped toward the
// scroll-driven target every frame so the motion feels fluid rather than
// snapping straight to the scroll position.
const cakeScrollStage = cakeScroll ? cakeScroll.querySelector('.cake-scroll-stage') : null;

const parallaxLayers = [
  { el: document.querySelector('.hero-logo'), depth: 0.22 },
  { el: cakeScrollStage, depth: 0.16 },
  { el: document.querySelector('.cutout-pastries'), depth: -0.18 },
  { el: document.querySelector('.cutout-cake'), depth: 0.22 },
  { el: document.querySelector('.cutout-cookies'), depth: -0.14 },
].filter((layer) => layer.el);

parallaxLayers.forEach((layer) => {
  layer.current = 0;
  layer.target = 0;
});

let parallaxRunning = false;

function computeParallaxTargets() {
  const viewportHeight = window.innerHeight;
  const viewportCenter = viewportHeight / 2;
  parallaxLayers.forEach((layer) => {
    const rect = layer.el.getBoundingClientRect();
    const elementCenter = rect.top + rect.height / 2;
    const progress = Math.max(-1, Math.min(1, (viewportCenter - elementCenter) / viewportHeight));
    layer.target = progress * layer.depth * viewportHeight;
  });
}

function stepParallax() {
  let settled = true;
  parallaxLayers.forEach((layer) => {
    const next = layer.current + (layer.target - layer.current) * 0.08;
    if (Math.abs(layer.target - next) > 0.05) settled = false;
    layer.current = next;
    layer.el.style.setProperty('--parallax-y', `${next.toFixed(2)}px`);
  });
  if (settled) {
    parallaxRunning = false;
  } else {
    window.requestAnimationFrame(stepParallax);
  }
}

function requestParallax() {
  if (reducedMotion.matches || !parallaxLayers.length) return;
  computeParallaxTargets();
  if (!parallaxRunning) {
    parallaxRunning = true;
    window.requestAnimationFrame(stepParallax);
  }
}

function resetParallax() {
  parallaxLayers.forEach((layer) => {
    layer.current = 0;
    layer.target = 0;
    layer.el.style.setProperty('--parallax-y', '0px');
  });
}

if (parallaxLayers.length) {
  if (reducedMotion.matches) {
    resetParallax();
  } else {
    requestParallax();
  }
  window.addEventListener('scroll', requestParallax, { passive: true });
  window.addEventListener('resize', requestParallax);
  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) resetParallax();
    else requestParallax();
  });
}
