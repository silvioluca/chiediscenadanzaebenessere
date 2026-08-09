// Chi è di scena — interazioni condivise

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const nav = document.querySelector('.main-nav');
  const body = document.body;

  // header: stato "solid" dopo lo scroll, e stato "on-dark" solo quando
  // il top della pagina è ancora sopra una sezione scura (es. l'hero)
  const heroEl = document.querySelector('[data-on-dark]');
  const updateHeader = () => {
    const y = window.scrollY;
    header.classList.toggle('solid', y > 40);
    if (heroEl) {
      const stillOverDark = y < heroEl.offsetHeight - 90;
      header.classList.toggle('on-dark', stillOverDark);
    } else {
      header.classList.remove('on-dark');
    }
  };
  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  // menu mobile
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.classList.toggle('open', open);
      body.classList.toggle('menu-open', open);
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.classList.remove('open');
      body.classList.remove('menu-open');
    }));
  }

  // reveal on scroll
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('in'));
  }

  // anno corrente nel footer
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();
});
