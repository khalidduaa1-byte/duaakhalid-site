// Interactive Animations & UI/UX Enhancements for Duaa Khalid Portfolio

document.addEventListener('DOMContentLoaded', () => {

  // 1. Animated Metric Counters (IntersectionObserver)
  const statsSection = document.querySelector('.stats');
  if (statsSection) {
    const numElements = statsSection.querySelectorAll('.n');
    
    const animateCount = (el, target, duration = 1500) => {
      const isFormatted = target.includes(',');
      const rawNum = parseInt(target.replace(/,/g, ''), 10);
      let start = 0;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        // Ease out quadratic formula
        const easeProgress = 1 - (1 - progress) * (1 - progress);
        const current = Math.floor(easeProgress * rawNum);
        
        el.textContent = isFormatted ? current.toLocaleString() : String(current).padStart(2, '0');

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      };

      requestAnimationFrame(step);
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          numElements.forEach(el => {
            const targetVal = el.getAttribute('data-target') || el.textContent.trim();
            el.setAttribute('data-target', targetVal);
            animateCount(el, targetVal);
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(statsSection);
  }

  // 2. 3D Cursor Spotlight & Card Tilt Effect
  const tiltCards = document.querySelectorAll('.proj .shot, .target-card, .catalog-window, .hb-terminal');
  
  tiltCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      
      const rotateX = ((y - centerY) / centerY) * -5; // max 5deg tilt
      const rotateY = ((x - centerX) / centerX) * 5;
      
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.015, 1.015, 1.015)`;
      card.style.transition = 'transform 0.1s ease-out';
      
      // Dynamic radial spotlight
      card.style.backgroundImage = `radial-gradient(circle at ${x}px ${y}px, rgba(240, 52, 25, 0.08) 0%, transparent 70%)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
      card.style.transition = 'transform 0.5s ease';
      card.style.backgroundImage = 'none';
    });
  });

  // 3. Floating Status Bar / Dock Reveal on Scroll
  const floatingDock = document.createElement('div');
  floatingDock.className = 'floating-dock';
  floatingDock.innerHTML = `
    <div class="dock-content">
      <span class="dock-dot"></span>
      <span class="dock-text">DUBAI &rarr; NEW YORK &middot; Open to AI &amp; Product Roles</span>
      <a href="mailto:khalidduaa1@gmail.com" class="dock-btn">GET IN TOUCH</a>
    </div>
  `;
  document.body.appendChild(floatingDock);

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      floatingDock.classList.add('visible');
    } else {
      floatingDock.classList.remove('visible');
    }
  });

  // 4. Smooth Anchor Link Scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          targetEl.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

});
