// ═══════════════════════════════════════════════════════════
//  RAGHAV PORTFOLIO — MAIN JS
// ═══════════════════════════════════════════════════════════

/* ── Navbar scroll effect ─────────────────────────────────── */
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.style.background = 'rgba(0,0,0,0.97)';
  } else {
    navbar.style.background = 'rgba(0,0,0,0.85)';
  }
});

/* ── Smooth scroll for nav links ──────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 60; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Scroll reveal ────────────────────────────────────────── */
const revealEls = document.querySelectorAll(
  '.project-box, .experience-card, .about-content, .contact-card, .section-title-outline'
);

revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
);

revealEls.forEach(el => observer.observe(el));

/* ── Avatar mouse parallax ────────────────────────────────── */
const avatar = document.getElementById('hero-avatar');
if (avatar) {
  document.addEventListener('mousemove', e => {
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    const dx = (e.clientX - cx) / cx;
    const dy = (e.clientY - cy) / cy;
    avatar.style.transform = `
      translateX(${dx * 12}px)
      translateY(${dy * 8}px)
      rotate(${dx * 1.5}deg)
    `;
  });
}

/* ── Marquee pause on hover ───────────────────────────────── */
const marqueeContent = document.querySelectorAll('.marquee-content');
const marqueeSection = document.querySelector('.marquee-section');
if (marqueeSection) {
  marqueeSection.addEventListener('mouseenter', () => {
    marqueeContent.forEach(m => m.style.animationPlayState = 'paused');
  });
  marqueeSection.addEventListener('mouseleave', () => {
    marqueeContent.forEach(m => m.style.animationPlayState = 'running');
  });
}

/* ── Contact form handler ─────────────────────────────────── */
async function handleSubmit(e) {
  e.preventDefault();
  const form = document.getElementById('contact-form');
  const btn = document.getElementById('contact-submit');
  const statusEl = document.getElementById('contact-status');

  const name = document.getElementById('contact-name').value.trim();
  const email = document.getElementById('contact-email').value.trim();
  const subject = document.getElementById('contact-subject').value.trim();
  const message = document.getElementById('contact-message').value.trim();

  if (!name || !email || !message) return;

  btn.innerHTML = 'Sending… <span class="btn-arrow">⏳</span>';
  btn.disabled = true;
  if (statusEl) {
    statusEl.textContent = '';
    statusEl.className = 'contact-status';
  }

  try {
    const response = await fetch('https://formsubmit.co/ajax/raghav.s2105@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject || 'Portfolio Inquiry',
        message: message,
        _subject: `New Portfolio Message from ${name}: ${subject || 'General Inquiry'}`,
        _captcha: 'false',
        _template: 'table'
      })
    });

    const data = await response.json();

    if (response.ok || data.success === 'true' || data.success === true) {
      btn.innerHTML = 'Sent! ✓ <span class="btn-arrow"></span>';
      btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
      form.reset();
      if (statusEl) {
        statusEl.textContent = 'Thank you! Your message was sent directly to Raghav.';
        statusEl.className = 'contact-status success';
      }

      setTimeout(() => {
        btn.innerHTML = 'Send message <span class="btn-arrow">↗</span>';
        btn.style.background = '';
        btn.disabled = false;
      }, 4000);
    } else {
      throw new Error(data.message || 'Submission failed');
    }
  } catch (err) {
    console.error('Contact submission error:', err);
    btn.innerHTML = 'Error Sending <span class="btn-arrow">⚠️</span>';
    btn.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    if (statusEl) {
      statusEl.innerHTML = 'Could not send. Please <a href="mailto:raghav.s2105@gmail.com" style="color: #f97c1e; text-decoration: underline;">email me directly</a>.';
      statusEl.className = 'contact-status error';
    }

    setTimeout(() => {
      btn.innerHTML = 'Send message <span class="btn-arrow">↗</span>';
      btn.style.background = '';
      btn.disabled = false;
    }, 4000);
  }
}

/* ── Staggered project card entrance ─────────────────────── */
const projectBoxes = document.querySelectorAll('.project-box');
projectBoxes.forEach((card, i) => {
  card.style.transitionDelay = `${i * 0.1}s`;
});
