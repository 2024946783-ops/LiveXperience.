/**
 * ==========================================================================
 * LIVEXPERIENCE SYSTEM REENGINEERING ENGINE (A11Y, ROUTING, & CONTROLS)
 * ==========================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
  initLoader();
  initNavigation();
  initA11yEngine();
  initSearchEngine();
  initBackToTop();
  injectFooterTelemetry();
  trackScrollSections();
});

/* Global Page Loading Component Interceptor */
function initLoader() {
  const loader = document.getElementById('loaderOverlay');
  if (loader) {
    window.addEventListener('load', () => {
      setTimeout(() => {
        loader.classList.add('hidden');
      }, 300);
    });
    // Fallback if load event already completed
    if (document.readyState === 'complete') {
      loader.classList.add('hidden');
    }
  }
}

/* Navigation Mechanics Manager */
function initNavigation() {
  const navbar = document.getElementById('navbarHeader');
  const hamburger = document.getElementById('hamburgerBtn');
  const navLinks = document.getElementById('navLinksContainer');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      hamburger.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });

    // Close on overlay element click sequence
    document.addEventListener('click', (e) => {
      if (!navLinks.contains(e.target) && !hamburger.contains(e.target) && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // Inject Structural Active Page Highlights Match Rules
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(link => {
    if (link.getAttribute('href') === currentPath) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* Accessibility Control Layer Interface Engine Matrix (WCAG 2.1 Compliance) */
function initA11yEngine() {
  const body = document.body;
  let currentFontSize = 100;

  window.toggleTheme = function(themeType) {
    document.documentElement.setAttribute('data-theme', themeType);
    localStorage.setItem('lx-theme', themeType);
    showToast(`Switched to standard ${themeType} display interface standard.`);
  };

  window.adjustFontSize = function(direction) {
    currentFontSize += direction * 10;
    if(currentFontSize < 80) currentFontSize = 80;
    if(currentFontSize > 140) currentFontSize = 140;
    body.style.fontSize = `${currentFontSize}%`;
    showToast(`Font layout size set to normal bounds scaling: ${currentFontSize}%`);
  };

  window.toggleTextMode = function() {
    const isTextOnly = document.documentElement.toggleAttribute('data-text-mode');
    showToast(isTextOnly ? "Text‑only layout sequence parsing active." : "Multimedia default layout components operational.");
  };

  // Restore stored parameters configuration values
  const cachedTheme = localStorage.getItem('lx-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', cachedTheme);
}

/* Dynamic Live Content Site Content Search Optimization Crawler Interface */
function initSearchEngine() {
  const searchIndex = [
    { title: "Taylor Swift Concert", url: "portfolio.html", tags: "music event live pop pop-star axiata ticket admission tickets" },
    { title: "Coldplay Live Stadium Event", url: "portfolio.html", tags: "rock music show stadium bukit jalil premium admission tickets" },
    { title: "Corporate Ticketing Solutions", url: "service.html", tags: "scalp dashboard database monitoring support architecture analytics api features" },
    { title: "Fakulti Pengurusan Maklumat Academic Portfolio Center", url: "about.html", tags: "author student profile id supervisor objective uitm credentials" },
    { title: "Multimedia Operational Reels Showcase", url: "gallery.html", tags: "images laser optics venue matrix sound acoustics performance photos capture" },
    { title: "Press Release Aggregator Post Room", url: "news..html", tags: "network cluster maintenance scale logs tech releases dynamic articles blog updates" },
    { title: "Client Service Help Desk Support Room", url: "contact.html", tags: "inquiry email mail feedback interactive input validation maps ticket numbers queries" }
  ];

  window.toggleSearchOverlay = function(activate) {
    const overlay = document.getElementById('globalSearchOverlay');
    if(overlay) {
      overlay.classList.toggle('active', activate);
      if(activate) {
        setTimeout(() => document.getElementById('mainSearchInputField').focus(), 200);
      }
    }
  };

  window.executeSearchQuery = function(queryStr) {
    const resultsContainer = document.getElementById('searchResultsDisplayBox');
    if(!resultsContainer) return;
    resultsContainer.innerHTML = '';
    
    if(!queryStr.trim()) return;
    
    const matches = searchIndex.filter(item => 
      item.title.toLowerCase().includes(queryStr.toLowerCase()) || 
      item.tags.toLowerCase().includes(queryStr.toLowerCase())
    );

    if(matches.length === 0) {
      resultsContainer.innerHTML = `<p style="color:var(--text-secondary); text-align:center; padding:20px;">No exact indexing entry found matching parameters matching criteria sequence.</p>`;
      return;
    }

    matches.forEach(match => {
      const itemNode = document.createElement('a');
      itemNode.className = 'search-result-item';
      itemNode.href = match.url;
      itemNode.innerHTML = `
        <h4>${match.title}</h4>
        <p style="font-size:0.85rem; color:var(--text-secondary); margin-top:4px;">Target Gateway Destination Link: ${match.url}</p>
      `;
      resultsContainer.appendChild(itemNode);
    });
  };
}

/* Floating Return Mechanics Interface Component */
function initBackToTop() {
  const btt = document.getElementById('backToTopBtn');
  window.addEventListener('scroll', () => {
    if(window.scrollY > 300) {
      btt.classList.add('visible');
    } else {
      btt.classList.remove('visible');
    }
  });
  if(btt) {
    btt.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

/* Auto Telemetry Tracker & Automated Footer Timestamps Matrix Manager Engine */
function injectFooterTelemetry() {
  const targetYearNode = document.getElementById('telemetryCurrentYear');
  if(targetYearNode) targetYearNode.textContent = new Date().getFullYear();

  const lastUpdateNode = document.getElementById('telemetryDynamicTimestamp');
  if(lastUpdateNode) {
    // Generates a verifiable historic update marker sequence trace bound to session
    const syncTime = new Date(document.lastModified);
    lastUpdateNode.textContent = syncTime.toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  }
}

/* Global Dynamic Toast Engine Utility */
window.showToast = function(msgString) {
  const container = document.getElementById('globalToastSystemContainer');
  if(!container) return;
  const node = document.createElement('div');
  node.className = 'toast';
  node.innerHTML = `<span>${msgString}</span><button onclick="this.parentElement.remove()" style="background:transparent; border:none; color:white; margin-left:15px; cursor:pointer;">&times;</button>`;
  container.appendChild(node);
  setTimeout(() => { if(node) node.remove(); }, 4000);
};

/* Tracks Active Sections on Scroll for Contextual Indicators */
function trackScrollSections() {
  const sections = document.querySelectorAll('section[id]');
  if(sections.length === 0) return;
  window.addEventListener('scroll', () => {
    let scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const targetAnchor = document.querySelector(`.nav-links a[href*='${sectionId}']`);
      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        if(targetAnchor) targetAnchor.classList.add('active');
      } else {
        if(targetAnchor) targetAnchor.classList.remove('active');
      }
    });
  });
}