/**
 * nav.js — Shared sidebar navigation
 * justintimeaccesssoftware.com
 * Injected into every page. Edit once, updates everywhere.
 */

(function() {
  const nav = `
    <div class="nav-section">
      <div class="nav-section-label">Why</div>
      <a href="/why/" class="nav-item depth-0">The vault solves the wrong problem</a>
    </div>

    <div class="nav-divider"></div>

    <div class="nav-section">
      <div class="nav-section-label">Landscape</div>
      <a href="/landscape/" class="nav-item depth-0">Market overview</a>
      <a href="/landscape/market-direction/" class="nav-item depth-1">&#9500; Market direction</a>
      <a href="/landscape/vendor-index/" class="nav-item depth-1">&#9500; Vendor index</a>
      <a href="/landscape/vendor-comparison/" class="nav-item depth-1">&#9500; Vendor comparison</a>
      <a href="/landscape/regulatory-pressures/" class="nav-item depth-1">&#9492; Regulatory pressures</a>
    </div>


    <div class="nav-divider"></div>

    <div class="nav-section">
      <div class="nav-section-label">Tools</div>
      <a href="/tools/" class="nav-item depth-0">All tools</a>
      <a href="/tools/vendor-comparison/" class="nav-item depth-1">&#9500; Vendor comparison</a>
      <a href="/tools/architecture-fit/" class="nav-item depth-1">&#9500; Architecture fit</a>
      <a href="/tools/approval-friction-calculator/" class="nav-item depth-1">&#9500; Approval friction</a>
      <a href="/tools/policy-sprawl-index/" class="nav-item depth-1">&#9500; Policy sprawl index</a>
      <a href="/tools/jit-velocity-calculator/" class="nav-item depth-1">&#9492; JIT velocity calculator</a>
    </div>

    <div class="nav-divider"></div>

    <div class="nav-section">
      <div class="nav-section-label">Comparisons</div>
      <a href="/comparisons/" class="nav-item depth-0">All comparisons</a>
      <a href="/comparisons/cyberark-vs-beyondtrust/" class="nav-item depth-1">&#9500; Palo Alto (CyberArk) vs. BeyondTrust</a>
      <a href="/comparisons/britive-vs-apono/" class="nav-item depth-1">&#9500; Britive vs. Apono</a>
      <a href="/comparisons/jit-native-vs-pam-with-jit/" class="nav-item depth-1">&#9500; JIT-native vs. PAM-with-JIT</a>
      <a href="/comparisons/" class="nav-item depth-1">&#9492; more</a>
    </div>

    <div class="nav-divider"></div>

    <div class="nav-section">
      <div class="nav-section-label">Guides</div>
      <a href="/guides/" class="nav-item depth-0">All guides</a>
      <a href="/guides/jit-nhi-convergence/" class="nav-item depth-1">&#9500; JIT and NHI convergence</a>
      <a href="/guides/pam-replacement-vs-jit-overlay/" class="nav-item depth-1">&#9500; PAM replacement vs. overlay</a>
      <a href="/guides/zombie-session-revocation/" class="nav-item depth-1">&#9500; Zombie session revocation</a>
      <a href="/guides/" class="nav-item depth-1">&#9492; more</a>
    </div>

    <div class="nav-divider"></div>

    <div class="nav-section">
      <a href="/subscribe/" class="nav-item depth-0 nav-subscribe">Subscribe &rarr;</a>
    </div>
  `;

  const container = document.getElementById('sidebar-nav');
  if (container) {
    container.innerHTML = nav;

    const path = window.location.pathname;
    const links = container.querySelectorAll('a.nav-item');
    links.forEach(link => {
      const href = link.getAttribute('href');
      if (href === path || (href !== '/' && path.startsWith(href))) {
        link.classList.add('active');
      }
    });
  }

})();
