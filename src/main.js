import { Application } from 'https://esm.sh/@splinetool/runtime';
import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  // ── Load Spline 3D Robot ──
  const canvas = document.getElementById('canvas3d');
  if (canvas) {
    const spline = new Application(canvas);
    spline.load('https://prod.spline.design/w9T5GwYLaD8fUGfg/scene.splinecode')
      .then(() => {
        console.log('Spline robot loaded!');
      })
      .catch((err) => {
        console.error('Spline load error:', err);
      });

    // Relay pointer events from the entire page to the canvas
    window.addEventListener('pointermove', (e) => {
      if (e.target !== canvas) {
        canvas.dispatchEvent(new PointerEvent('pointermove', {
          bubbles: true,
          clientX: e.clientX,
          clientY: e.clientY,
        }));
      }
    });
  }

  // ── Smooth scroll for "WHO AM I" nav link ──
  const navLinks = document.querySelectorAll('.nav-link[data-target]');
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      const targetId = link.getAttribute('data-target');
      const targetEl = document.getElementById(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ── Handle active state for menu items ──
  const menuItems = document.querySelectorAll('.nav-links li');
  menuItems.forEach(item => {
    item.addEventListener('click', () => {
      menuItems.forEach(i => {
        i.classList.remove('active');
        const a = i.querySelector('a');
        if (a && a.textContent.startsWith('| ')) {
          a.textContent = a.textContent.substring(2);
        }
      });
      item.classList.add('active');
      const a = item.querySelector('a');
      if (a && !a.textContent.startsWith('| ')) {
        a.textContent = '| ' + a.textContent;
      }
    });
  });
});
