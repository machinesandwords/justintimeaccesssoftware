/**
 * newsletter.js — justintimeaccesssoftware.com
 * Wires all .newsletter-form elements on the page to the Cloudflare Worker.
 * Also handles export-gate forms on tool pages (.export-form).
 * Drop in site root. No dependencies.
 */

(function () {
  const WORKER_URL = 'https://newsletter.justintimeaccesssoftware.com/subscribe';
  const GROUP_ID   = '189858273326793780';

  function wire(form) {
    const input  = form.querySelector('input[type="email"]');
    const button = form.querySelector('button');
    if (!input || !button) return;

    if (form.dataset.wired) return;
    form.dataset.wired = 'true';

    button.addEventListener('click', function () {
      const email = input.value.trim();

      if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        setStatus(form, 'error', 'Please enter a valid email address.');
        return;
      }

      setStatus(form, 'loading', '');
      button.disabled = true;

      fetch(WORKER_URL, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email: email, group_id: GROUP_ID }),
      })
        .then(function (res) { return res.json(); })
        .then(function (data) {
          if (data.message === 'Subscribed') {
            setStatus(form, 'success', "You're in. Check your inbox.");
            input.value = '';
            if (typeof window._onExportGateSuccess === 'function') {
              window._onExportGateSuccess(form);
            }
          } else {
            setStatus(form, 'error', 'Something went wrong. Please try again.');
            button.disabled = false;
          }
        })
        .catch(function () {
          setStatus(form, 'error', 'Something went wrong. Please try again.');
          button.disabled = false;
        });
    });
  }

  function setStatus(form, state, message) {
    let status = form.querySelector('.newsletter-status');
    if (!status) {
      status = document.createElement('p');
      status.className = 'newsletter-status';
      status.style.cssText = 'font-size:11px; margin-top:8px; margin-bottom:0;';
      form.parentNode.insertBefore(status, form.nextSibling);
    }
    status.style.color = state === 'success' ? 'var(--accent)'
                       : state === 'error'   ? '#991b1b'
                       : 'var(--faint)';
    status.textContent = state === 'loading' ? 'Subscribing...' : message;
  }

  function init() {
    document.querySelectorAll('.newsletter-form').forEach(wire);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();