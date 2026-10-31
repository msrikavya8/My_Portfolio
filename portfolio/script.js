/**
 * SRI KAVYA MANNE - PORTFOLIO SCRIPT
 * Handles Theme Toggling, Mobile Drawer, ScrollSpy, Scroll Reveal,
 * Certificate Modal, Project Previews, and Accessible Form Validation.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================================
     1. Theme Toggle (Dark & Light Mode) with LocalStorage Persistence
     ========================================================================== */
  const themeToggleBtn = document.getElementById('themeToggle');
  const htmlRoot = document.documentElement;

  // Retrieve saved theme or system preference
  const getPreferredTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme');
    if (savedTheme) {
      return savedTheme;
    }
    return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
  };

  const applyTheme = (theme) => {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
    if (themeToggleBtn) {
      const isLight = theme === 'light';
      themeToggleBtn.setAttribute('aria-label', isLight ? 'Switch to dark theme' : 'Switch to light theme');
      themeToggleBtn.setAttribute('title', isLight ? 'Switch to dark theme' : 'Switch to light theme');
    }
  };

  // Initialize theme
  applyTheme(getPreferredTheme());

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
    });
  }

  /* ==========================================================================
     2. Mobile Drawer Navigation
     ========================================================================== */
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const drawerCloseBtn = document.getElementById('drawerCloseBtn');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerBackdrop = document.getElementById('mobileDrawerBackdrop');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  const openDrawer = () => {
    mobileDrawer.classList.add('active');
    mobileDrawerBackdrop.classList.add('active');
    hamburgerBtn.setAttribute('aria-expanded', 'true');
    mobileDrawer.setAttribute('aria-hidden', 'false');
    mobileDrawerBackdrop.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = () => {
    mobileDrawer.classList.remove('active');
    mobileDrawerBackdrop.classList.remove('active');
    hamburgerBtn.setAttribute('aria-expanded', 'false');
    mobileDrawer.setAttribute('aria-hidden', 'true');
    mobileDrawerBackdrop.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  if (hamburgerBtn) hamburgerBtn.addEventListener('click', openDrawer);
  if (drawerCloseBtn) drawerCloseBtn.addEventListener('click', closeDrawer);
  if (mobileDrawerBackdrop) mobileDrawerBackdrop.addEventListener('click', closeDrawer);

  drawerLinks.forEach((link) => {
    link.addEventListener('click', closeDrawer);
  });

  /* ==========================================================================
     3. Active Section ScrollSpy & Header Shadow
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.nav-link');
  const siteHeader = document.getElementById('header');

  const updateActiveSection = () => {
    const scrollPosition = window.scrollY + 120;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPosition >= top && scrollPosition < top + height) {
        desktopNavLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });

        drawerLinks.forEach((link) => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
        });
      }
    });

    // Add subtle shadow to header when scrolled
    if (siteHeader) {
      if (window.scrollY > 30) {
        siteHeader.style.boxShadow = 'var(--shadow-sm)';
      } else {
        siteHeader.style.boxShadow = 'none';
      }
    }
  };

  window.addEventListener('scroll', updateActiveSection, { passive: true });
  updateActiveSection();

  /* ==========================================================================
     4. Scroll Reveal Animations (Intersection Observer)
     ========================================================================== */
  const revealElements = document.querySelectorAll('[data-reveal]');

  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => revealObserver.observe(el));
  } else {
    // Fallback if browser lacks IntersectionObserver
    revealElements.forEach((el) => el.classList.add('revealed'));
  }

  /* ==========================================================================
     5. Back to Top Floating Button
     ========================================================================== */
  const backToTopBtn = document.getElementById('backToTopBtn');

  if (backToTopBtn) {
    window.addEventListener(
      'scroll',
      () => {
        if (window.scrollY > 350) {
          backToTopBtn.classList.add('visible');
        } else {
          backToTopBtn.classList.remove('visible');
        }
      },
      { passive: true }
    );

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    });
  }

  /* ==========================================================================
     6. Certificate Viewer Modal
     ========================================================================== */
  const certModal = document.getElementById('certModal');
  const modalCertTitle = document.getElementById('modalCertTitle');
  const modalCertOrg = document.getElementById('modalCertOrg');
  const modalCertBody = document.getElementById('modalCertBody');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const viewCertButtons = document.querySelectorAll('.view-cert-btn');

  let previousActiveElement = null;

  const openCertModal = (title, org, desc) => {
    previousActiveElement = document.activeElement;
    modalCertTitle.textContent = title;
    modalCertOrg.textContent = `Issued by ${org}`;

    modalCertBody.innerHTML = `
      <div class="cert-modal-card">
        <div class="cert-modal-header-box">
          <span class="cert-modal-org-tag">${org}</span>
          <span class="cert-verified-pill">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
            Verified Credential
          </span>
        </div>
        <h4 class="cert-modal-name">${title}</h4>
        <p class="cert-modal-desc">${desc}</p>
        <div class="cert-modal-meta-grid">
          <div class="cert-meta-item">
            <span class="cert-meta-label">Recipient</span>
            <span class="cert-meta-val">Sri Kavya Manne</span>
          </div>
          <div class="cert-meta-item">
            <span class="cert-meta-label">Issuing Organization</span>
            <span class="cert-meta-val">${org}</span>
          </div>
          <div class="cert-meta-item">
            <span class="cert-meta-label">Status</span>
            <span class="cert-meta-val" style="color: var(--color-success);">Completed</span>
          </div>
          <div class="cert-meta-item">
            <span class="cert-meta-label">Credential Type</span>
            <span class="cert-meta-val">Professional / Academic</span>
          </div>
        </div>
      </div>
    `;

    certModal.classList.add('active');
    certModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    modalCloseBtn.focus();
  };

  const closeCertModal = () => {
    certModal.classList.remove('active');
    certModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  };

  viewCertButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const title = btn.getAttribute('data-title');
      const org = btn.getAttribute('data-org');
      const desc = btn.getAttribute('data-desc');
      openCertModal(title, org, desc);
    });
  });

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeCertModal);
  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) closeCertModal();
    });
  }

  /* ==========================================================================
     7. Project Interactive Preview Modal
     ========================================================================== */
  const projectModal = document.getElementById('projectModal');
  const modalProjectTitle = document.getElementById('modalProjectTitle');
  const modalProjectSubtitle = document.getElementById('modalProjectSubtitle');
  const modalProjectContent = document.getElementById('modalProjectContent');
  const projectModalCloseBtn = document.getElementById('projectModalCloseBtn');
  const projectPreviewButtons = document.querySelectorAll('.project-preview-btn');

  const projectDetails = {
    '1': {
      title: 'Team Collaboration Dashboard',
      subtitle: 'Frontend Application • HTML, CSS, Vanilla JavaScript',
      summary:
        'An interactive single-page dashboard designed for engineering teams to organize workflows, monitor milestone velocity, and track task distributions.',
      features: [
        'Organized projects, team members, and project statuses in one unified interface.',
        'Implemented project add, search, and delete functions, with Completed, Running, and Pending status tracking.',
        'Presented project progress, technology skills, and team-member contributions through visual summaries.',
        'Zero-dependency Vanilla JavaScript with persistent DOM state management.'
      ],
      github: 'https://github.com/msrikavya8',
      demoNote:
        'To connect your live deployment (e.g. GitHub Pages or Vercel), update the Live Demo link in index.html with your URL.'
    },
    '2': {
      title: 'Placement Preparation Portal',
      subtitle: 'Educational Resource Platform • HTML, CSS, Vanilla JavaScript',
      summary:
        'A comprehensive web portal crafted for Computer Science students to systematically prepare for campus recruitment and technical interviews.',
      features: [
        'Organized aptitude, coding, mock-test, and technical-interview preparation resources.',
        'Created dedicated resource sections and interactive buttons for straightforward navigation.',
        'Used JavaScript to support navigation and user interactions alongside the HTML/CSS interface.',
        'Curated technical question banks for Java, SQL, DBMS, OOP, and Web Technologies.'
      ],
      github: 'https://github.com/msrikavya8',
      demoNote:
        'To connect your live deployment (e.g. GitHub Pages or Netlify), update the Live Demo link in index.html with your URL.'
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectDetails[projectId];
    if (!data) return;

    previousActiveElement = document.activeElement;
    modalProjectTitle.textContent = data.title;
    modalProjectSubtitle.textContent = data.subtitle;

    modalProjectContent.innerHTML = `
      <p style="font-size: 0.98rem; color: var(--text-secondary); line-height: 1.65;">${data.summary}</p>
      <div>
        <h4 style="font-size: 0.88rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--text-primary); margin-bottom: 10px;">Key Capabilities & Implementation</h4>
        <ul class="features-list" style="margin-left: 6px;">
          ${data.features.map(f => `<li style="font-size: 0.88rem; color: var(--text-secondary); margin-bottom: 8px;">${f}</li>`).join('')}
        </ul>
      </div>
      <div class="modal-note" style="margin-top: 14px;">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
        <span>${data.demoNote}</span>
      </div>
      <div style="display: flex; gap: 12px; margin-top: 16px;">
        <a href="${data.github}" target="_blank" rel="noopener noreferrer" class="btn btn-primary btn-sm btn-full">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
          Visit GitHub Repository
        </a>
      </div>
    `;

    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    projectModalCloseBtn.focus();
  };

  const closeProjectModal = () => {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    if (previousActiveElement) {
      previousActiveElement.focus();
    }
  };

  projectPreviewButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const pid = btn.getAttribute('data-project');
      openProjectModal(pid);
    });
  });

  if (projectModalCloseBtn) projectModalCloseBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  // Global Escape key listener for modals & drawer
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (certModal && certModal.classList.contains('active')) closeCertModal();
      if (projectModal && projectModal.classList.contains('active')) closeProjectModal();
      if (mobileDrawer && mobileDrawer.classList.contains('active')) closeDrawer();
    }
  });

  /* ==========================================================================
     8. Contact Form Client-Side Validation & Direct Dispatch
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('contactName');
  const emailInput = document.getElementById('contactEmail');
  const subjectInput = document.getElementById('contactSubject');
  const messageInput = document.getElementById('contactMessage');
  const formStatusAlert = document.getElementById('formStatusAlert');
  const submitBtn = document.getElementById('submitBtn');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const subjectError = document.getElementById('subjectError');
  const messageError = document.getElementById('messageError');

  // Email format validator regex
  const isValidEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateField = (input, errorEl, condition, errorMsg) => {
    if (condition) {
      input.classList.remove('input-error');
      errorEl.textContent = '';
      return true;
    } else {
      input.classList.add('input-error');
      errorEl.textContent = errorMsg;
      return false;
    }
  };

  // Live input validation on blur / input
  if (nameInput) {
    nameInput.addEventListener('input', () => {
      validateField(nameInput, nameError, nameInput.value.trim().length >= 2, 'Please enter at least 2 characters.');
    });
  }

  if (emailInput) {
    emailInput.addEventListener('input', () => {
      validateField(emailInput, emailError, isValidEmail(emailInput.value.trim()), 'Please provide a valid email address.');
    });
  }

  if (subjectInput) {
    subjectInput.addEventListener('input', () => {
      validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3, 'Please enter a descriptive subject (at least 3 characters).');
    });
  }

  if (messageInput) {
    messageInput.addEventListener('input', () => {
      validateField(messageInput, messageError, messageInput.value.trim().length >= 10, 'Message must be at least 10 characters long.');
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Perform full validation check
      const isNameValid = validateField(nameInput, nameError, nameInput.value.trim().length >= 2, 'Please enter at least 2 characters.');
      const isEmailValid = validateField(emailInput, emailError, isValidEmail(emailInput.value.trim()), 'Please provide a valid email address.');
      const isSubjectValid = validateField(subjectInput, subjectError, subjectInput.value.trim().length >= 3, 'Please enter a descriptive subject.');
      const isMessageValid = validateField(messageInput, messageError, messageInput.value.trim().length >= 10, 'Message must be at least 10 characters long.');

      if (!isNameValid || !isEmailValid || !isSubjectValid || !isMessageValid) {
        // Focus first invalid input
        if (!isNameValid) nameInput.focus();
        else if (!isEmailValid) emailInput.focus();
        else if (!isSubjectValid) subjectInput.focus();
        else if (!isMessageValid) messageInput.focus();
        return;
      }

      // Safe, transparent client-side dispatch via mailto:
      // Does not pretend messages are delivered to an imaginary database.
      const recipient = 'msrikavyachowdary064@gmail.com';
      const senderName = encodeURIComponent(nameInput.value.trim());
      const senderEmail = encodeURIComponent(emailInput.value.trim());
      const emailSubject = encodeURIComponent(`[Portfolio Contact] ${subjectInput.value.trim()}`);
      const emailBody = encodeURIComponent(
        `Hi Sri Kavya,\n\n${messageInput.value.trim()}\n\n---\nFrom: ${decodeURIComponent(senderName)} (${decodeURIComponent(senderEmail)})`
      );

      const mailtoUrl = `mailto:${recipient}?subject=${emailSubject}&body=${emailBody}`;

      // Show user-friendly confirmation alert
      formStatusAlert.className = 'form-alert success';
      formStatusAlert.style.display = 'block';
      formStatusAlert.innerHTML = `
        <strong>Thank you, ${nameInput.value.trim()}!</strong><br>
        Opening your default email app with your pre-filled message to <code>${recipient}</code>...
      `;

      // Trigger mailto link
      setTimeout(() => {
        window.location.href = mailtoUrl;
      }, 400);

      // Reset form after short delay
      setTimeout(() => {
        contactForm.reset();
        [nameInput, emailInput, subjectInput, messageInput].forEach(inp => inp.classList.remove('input-error'));
      }, 1500);
    });
  }

});
