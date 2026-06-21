/**
 * config.js — Site identity and accent color configuration
 * justintimeaccesssoftware.com
 *
 * accent:     #2E7D4F  (green)
 * accentDim:  #235E3B  (~15% darker)
 * accentPale: #E5F1EA  (very light tint, used for callout backgrounds)
 */

window.SITE_CONFIG = {
  name:      "Just-in-Time Access Software",
  nameHtml:  "Just-in-Time Access <span>Software</span>",
  domain:    "justintimeaccesssoftware.com",
  tagline:   "Independent guidance for JIT access buyers",
  accent:    "#2E7D4F",
  accentDim: "#235E3B",
  accentPale:"#E5F1EA"
};

(function() {
  var r = document.documentElement;
  r.style.setProperty('--accent',      window.SITE_CONFIG.accent);
  r.style.setProperty('--accent-dim',  window.SITE_CONFIG.accentDim);
  r.style.setProperty('--accent-pale', window.SITE_CONFIG.accentPale);
})();
