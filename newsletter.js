<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="robots" content="index, follow">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="icon" type="image/png" href="/favicon.png" sizes="32x32">

  <title>JIT Approval Friction Calculator | Just-in-Time Access Software</title>
  <meta name="description" content="Calculate the engineering hours and dollars lost annually to JIT approval friction, see what automation actually recovers at different adoption levels, and surface incident-driven exposure separately from routine labor cost.">
  <link rel="canonical" href="https://justintimeaccesssoftware.com/tools/approval-friction-calculator/">

  <meta property="og:title" content="JIT Approval Friction Calculator | Just-in-Time Access Software">
  <meta property="og:description" content="Calculate engineering hours and dollars lost annually to JIT approval friction, and what automation recovers at different adoption levels.">
  <meta property="og:url" content="https://justintimeaccesssoftware.com/tools/approval-friction-calculator/">
  <meta property="og:type" content="website">

  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "JIT Approval Friction Calculator",
    "applicationCategory": "BusinessApplication",
    "url": "https://justintimeaccesssoftware.com/tools/approval-friction-calculator/",
    "publisher": { "@type": "Organization", "name": "Just-in-Time Access Software", "url": "https://justintimeaccesssoftware.com" }
  }
  </script>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">

  <style>:root{--accent:#2E7D4F;--accent-dim:#235E3B;--accent-pale:#E5F1EA}</style>
  <link rel="stylesheet" href="/styles.css">
  <script src="/config.js" defer></script>

  <style>
    .calc-form { max-width: 560px; }
    .field-group { margin-bottom: 1.2rem; }
    .field-label { font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; color: var(--charcoal); margin-bottom: 0.3rem; }
    .field-desc { font-size: 11px; color: var(--mid); margin-bottom: 0.4rem; }
    .field-input {
      width: 100%; max-width: 200px; font-family: inherit; font-size: 13px;
      background: var(--surface); border: 1px solid var(--border); color: var(--charcoal);
      padding: 8px 10px; outline: none; box-sizing: border-box;
    }
    .field-input:focus { border-color: var(--accent); }
    .field-error { font-size: 11px; color: #991b1b; margin-top: 0.3rem; display: none; }
    .field-error.visible { display: block; }

    .calc-btn {
      background: var(--accent); color: #fff; font-family: inherit;
      font-size: 12px; font-weight: 700; letter-spacing: 0.04em;
      border: none; padding: 10px 24px; cursor: pointer; margin-top: 0.5rem;
    }
    .calc-btn:hover { background: var(--accent-dim); }
    .calc-btn-outline { background: transparent; color: var(--accent); border: 1px solid var(--accent); }

    .advanced-toggle {
      font-size: 11px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase;
      color: var(--accent); background: none; border: none; cursor: pointer; padding: 0;
      margin: 0.8rem 0; text-decoration: underline;
    }
    .advanced-section { display: none; border-left: 2px solid var(--accent); padding-left: 1rem; margin-bottom: 1rem; }
    .advanced-section.visible { display: block; }

    .results-block { display: none; margin-top: 2rem; max-width: 620px; }
    .results-block.visible { display: block; }
    .results-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); margin-bottom: 1.5rem; }
    .result-cell { background: var(--surface); padding: 1rem; }
    .result-cell-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--faint); margin-bottom: 0.3rem; }
    .result-cell-value { font-size: 22px; font-weight: 700; color: var(--charcoal); }
    .result-cell-unit { font-size: 11px; color: var(--mid); }
    .result-cell-highlight .result-cell-value { color: var(--accent); }
    .result-interpretation { font-size: 12px; line-height: 1.7; margin-bottom: 1.5rem; }

    .sens-table { width: 100%; border-collapse: collapse; font-size: 12px; margin-bottom: 1.5rem; }
    .sens-table th { text-align: left; font-size: 10px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--mid); padding: 6px 10px; border-bottom: 1px solid var(--charcoal); }
    .sens-table td { padding: 6px 10px; border-bottom: var(--hairline); }
    .sens-table tr.sens-current td { background: var(--accent-pale); font-weight: 700; }

    .incident-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--border); margin: 1rem 0; }
    .incident-grid .result-cell { background: var(--surface); }

    .methodology { border: var(--hairline); border-left: 3px solid var(--accent); background: var(--surface); padding: 14px 18px; margin: 1.5rem 0; font-size: 12px; line-height: 1.7; color: var(--mid); }
    .methodology summary { cursor: pointer; font-weight: 700; color: var(--accent); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; }
    .methodology[open] summary { margin-bottom: 10px; }
    .methodology code { background: var(--bg); padding: 1px 4px; font-size: 11px; }

    .export-gate { margin-top: 1.5rem; border: 1px solid var(--border); padding: 1.2rem; }
    .export-gate-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent); margin-bottom: 0.5rem; }
    .export-gate-form.newsletter-form { margin-top: 0.75rem; }

    @media print {
      .topbar, .sidebar, .breadcrumb, .calc-form, #recalc-btn, .export-gate, .advanced-toggle { display: none !important; }
      .layout { padding-top: 0; }
      .main { margin-left: 0; padding: 0; }
      body { background: #fff; }
    }
  </style>
</head>
<body>

  <header class="topbar">
    <div class="topbar-brand">Just-in-Time Access <span>Software</span></div>
    <div class="topbar-divider"></div>
    <div class="topbar-tagline">an independent guide to JIT access software</div>
    <div class="topbar-right"><a href="/subscribe">Subscribe</a></div>
  </header>

  <div class="layout">
    <nav class="sidebar" aria-label="Site navigation"><div id="sidebar-nav"></div></nav>

    <main class="main">
      <article class="content">

        <div class="breadcrumb">
          <a href="/">Home</a>
          <span class="breadcrumb-sep">/</span>
          <a href="/tools/">Tools</a>
          <span class="breadcrumb-sep">/</span>
          <span>Approval Friction Calculator</span>
        </div>

        <span class="page-label">Tool</span>
        <h1>Approval Friction Calculator</h1>
        <p class="lead">JIT approval workflows add latency to every access request. Across an engineering team, that latency compounds into real labor cost, and during incidents, into something more expensive than labor. Enter your team's parameters to see what approval friction actually costs today, and what different levels of automation would recover.</p>

        <div class="calc-form" id="calc-form">

          <div class="field-group">
            <div class="field-label">Engineering team size</div>
            <div class="field-desc">Number of engineers who use JIT access regularly</div>
            <input type="number" class="field-input" id="team-size" min="1" max="10000" placeholder="e.g. 50">
          </div>

          <div class="field-group">
            <div class="field-label">Weekly access requests per engineer</div>
            <div class="field-desc">Average number of JIT access requests per engineer per week</div>
            <input type="number" class="field-input" id="requests-per-week" min="1" max="100" placeholder="e.g. 3">
          </div>

          <div class="field-group">
            <div class="field-label">Average manual approval wait time (minutes)</div>
            <div class="field-desc">Minutes from request to access grant when a human approver is in the loop. Include time to context-switch, compose the request, and wait for a response.</div>
            <input type="number" class="field-input" id="wait-minutes" min="1" max="480" placeholder="e.g. 20">
          </div>

          <div class="field-group">
            <div class="field-label">Automatable request percentage (%)</div>
            <div class="field-desc">Percentage of requests that follow predictable, low-risk patterns a policy engine could auto-approve</div>
            <input type="number" class="field-input" id="automatable-pct" min="0" max="100" placeholder="e.g. 40">
          </div>

          <div class="field-group">
            <div class="field-label">Residual friction on automated requests (minutes)</div>
            <div class="field-desc">Automated requests aren't instant; a policy engine still evaluates the request. Typically under a minute.</div>
            <input type="number" class="field-input" id="residual-minutes" min="0" max="60" placeholder="e.g. 1" value="1">
          </div>

          <div class="field-group">
            <div class="field-label">Loaded hourly engineer cost ($)</div>
            <div class="field-desc">Fully loaded cost per engineering hour, salary plus overhead, not just base wage</div>
            <input type="number" class="field-input" id="hourly-cost" min="1" max="1000" placeholder="e.g. 90">
          </div>

          <button type="button" class="advanced-toggle" id="advanced-toggle">+ Add incident-driven exposure (optional)</button>

          <div class="advanced-section" id="advanced-section">
            <div class="field-group">
              <div class="field-label">Share of requests during declared incidents (%)</div>
              <div class="field-desc">Percentage of weekly access requests that occur during an active incident, not routine work</div>
              <input type="number" class="field-input" id="incident-pct" min="0" max="100" placeholder="e.g. 10">
            </div>
            <div class="field-group">
              <div class="field-label">Estimated downtime cost per minute ($)</div>
              <div class="field-desc">What a minute of the affected system being degraded or unavailable costs the business, separate from engineer wages</div>
              <input type="number" class="field-input" id="downtime-cost" min="0" max="100000" placeholder="e.g. 500">
            </div>
          </div>

          <div class="field-error" id="field-error">Please fill in team size, requests per week, manual wait time, and loaded hourly cost.</div>

          <button type="button" class="calc-btn" id="calc-btn">Calculate Friction Cost</button>
        </div>

        <div class="results-block" id="results-block">

          <div class="results-grid">
            <div class="result-cell result-cell-highlight">
              <div class="result-cell-label">Annual Cost Today</div>
              <div class="result-cell-value" id="r-annual-cost"></div>
              <div class="result-cell-unit">at current automation level</div>
            </div>
            <div class="result-cell result-cell-highlight">
              <div class="result-cell-label">Annual $ Recoverable</div>
              <div class="result-cell-value" id="r-recoverable-cost"></div>
              <div class="result-cell-unit">vs. zero automation baseline</div>
            </div>
            <div class="result-cell">
              <div class="result-cell-label">Annual Hours Lost</div>
              <div class="result-cell-value" id="r-annual-hours"></div>
              <div class="result-cell-unit">at current automation level</div>
            </div>
            <div class="result-cell">
              <div class="result-cell-label">Requests per Year</div>
              <div class="result-cell-value" id="r-total-requests"></div>
              <div class="result-cell-unit">total access requests</div>
            </div>
          </div>

          <div class="result-interpretation" id="r-interpretation"></div>

          <h3 style="font-size:13px; margin-bottom:0.5rem;">Recovery at different automation levels</h3>
          <table class="sens-table" id="sens-table">
            <thead>
              <tr><th>Automation</th><th>Annual hours</th><th>Annual cost</th><th>$ recovered vs. 0%</th></tr>
            </thead>
            <tbody id="sens-tbody"></tbody>
          </table>

          <div id="incident-results" style="display:none;">
            <h3 style="font-size:13px; margin-bottom:0.5rem;">Incident-driven exposure</h3>
            <p style="font-size:11px; color:var(--mid); margin-bottom:0.6rem;">This is a separate exposure figure, not added to the labor cost above. It estimates the cost of approval delay specifically during declared incidents, where the cost is degraded production time, not engineer wages.</p>
            <div class="incident-grid">
              <div class="result-cell">
                <div class="result-cell-label">Incident Requests / Year</div>
                <div class="result-cell-value" id="r-incident-requests"></div>
              </div>
              <div class="result-cell">
                <div class="result-cell-label">Est. Annual Downtime Exposure</div>
                <div class="result-cell-value" id="r-incident-cost"></div>
              </div>
            </div>
          </div>

          <details class="methodology">
            <summary>How this is calculated</summary>
            <p>Weekly requests = team size &times; requests per engineer per week. Each week's requests split into manual (1 &minus; automatable%) and automated (automatable%) shares. Weekly friction hours = (manual requests &times; manual wait minutes + automated requests &times; residual minutes) &divide; 60. Annual figures multiply weekly results by 52. Annual cost = annual hours &times; loaded hourly cost. The zero-automation baseline applies the manual wait time to 100% of requests; recoverable $ is the difference between that baseline and the current-automation figure.</p>
            <p style="margin-top:8px;">Incident exposure (if provided) applies the incident-share percentage to weekly requests, multiplies by manual wait minutes, converts to minutes, and multiplies by the downtime cost per minute. This is reported separately because it reflects business downtime cost, not labor cost, and summing the two would double-count the same time window from two different cost bases.</p>
          </details>

          <div class="export-gate">
            <div class="export-gate-label">Export results</div>
            <p style="font-size:11px; color:var(--mid); margin:0 0 0.5rem;">Subscribe to The Independent Defender for a printable one-page summary of these results, ready to forward to a budget owner.</p>
            <div class="export-gate-form newsletter-form">
              <input type="email" placeholder="your@email.com" aria-label="Email address">
              <button type="button">Subscribe &amp; Unlock PDF</button>
            </div>
          </div>

          <button type="button" class="calc-btn calc-btn-outline" id="recalc-btn" style="margin-top:1rem;">Recalculate</button>
        </div>

      </article>
    </main>
  </div>

  <footer><div class="footer-inner"><span class="page-label">Just-in-Time Access Software</span><p>An independent publication. Built by <a href="https://machinesandwords.com">Machines &amp; Words</a>.</p></div></footer>

  <script src="/nav.js"></script>
  <script src="/newsletter.js"></script>
  <script>
  (function() {
    let calcResults = {};

    function fmt(n) {
      return Math.round(n).toLocaleString(undefined, { maximumFractionDigits: 0 });
    }
    function fmtMoney(n) {
      return '$' + fmt(n);
    }

    document.getElementById('advanced-toggle').addEventListener('click', function() {
      const section = document.getElementById('advanced-section');
      const open = section.classList.toggle('visible');
      this.textContent = (open ? '\u2212 Hide' : '+ Add') + ' incident-driven exposure (optional)';
    });

    function frictionHoursFor(weeklyRequests, autoPct, waitMins, residualMins) {
      const manual = weeklyRequests * (1 - autoPct / 100);
      const automated = weeklyRequests * (autoPct / 100);
      return ((manual * waitMins) + (automated * residualMins)) / 60;
    }

    document.getElementById('calc-btn').addEventListener('click', calculate);

    function calculate() {
      const teamSize = parseFloat(document.getElementById('team-size').value) || 0;
      const reqPerWeek = parseFloat(document.getElementById('requests-per-week').value) || 0;
      const waitMins = parseFloat(document.getElementById('wait-minutes').value) || 0;
      const autoPct = parseFloat(document.getElementById('automatable-pct').value) || 0;
      const residualMins = parseFloat(document.getElementById('residual-minutes').value) || 0;
      const hourlyCost = parseFloat(document.getElementById('hourly-cost').value) || 0;
      const incidentPct = parseFloat(document.getElementById('incident-pct').value) || 0;
      const downtimeCost = parseFloat(document.getElementById('downtime-cost').value) || 0;

      const errorEl = document.getElementById('field-error');
      if (!teamSize || !reqPerWeek || !waitMins || !hourlyCost) {
        errorEl.classList.add('visible');
        return;
      }
      errorEl.classList.remove('visible');

      const weeklyRequests = teamSize * reqPerWeek;
      const totalRequests = weeklyRequests * 52;

      const weeklyHoursCurrent = frictionHoursFor(weeklyRequests, autoPct, waitMins, residualMins);
      const annualHoursCurrent = weeklyHoursCurrent * 52;
      const annualCostCurrent = annualHoursCurrent * hourlyCost;

      const weeklyHoursBaseline = frictionHoursFor(weeklyRequests, 0, waitMins, residualMins);
      const annualHoursBaseline = weeklyHoursBaseline * 52;
      const annualCostBaseline = annualHoursBaseline * hourlyCost;

      const recoverableCost = annualCostBaseline - annualCostCurrent;

      calcResults = {
        teamSize, reqPerWeek, waitMins, autoPct, residualMins, hourlyCost, incidentPct, downtimeCost,
        weeklyRequests, totalRequests, annualHoursCurrent, annualCostCurrent, annualCostBaseline, recoverableCost
      };

      document.getElementById('r-annual-cost').textContent = fmtMoney(annualCostCurrent);
      document.getElementById('r-recoverable-cost').textContent = fmtMoney(recoverableCost);
      document.getElementById('r-annual-hours').textContent = fmt(annualHoursCurrent);
      document.getElementById('r-total-requests').textContent = fmt(totalRequests);

      const fte = annualHoursCurrent / 2000;
      let interp = '';
      if (annualCostCurrent < 25000) {
        interp = `At ${fmtMoney(annualCostCurrent)} per year, approval friction is a modest line item for this team. Reaching ${autoPct}% automation recovers ${fmtMoney(recoverableCost)} annually against a zero-automation baseline.`;
      } else if (annualCostCurrent < 150000) {
        interp = `At ${fmtMoney(annualCostCurrent)} per year, roughly ${fmt(fte * 10) / 10} full-time-equivalent engineers worth of time, approval friction is a real and budgetable cost. Automation covering ${autoPct}% of requests recovers ${fmtMoney(recoverableCost)} annually relative to no automation at all.`;
      } else {
        interp = `At ${fmtMoney(annualCostCurrent)} per year, more than ${fmt(fte)} full-time-equivalent engineers worth of time, approval friction is a material cost for this team. At ${autoPct}% automation, ${fmtMoney(recoverableCost)} is recoverable annually relative to a fully manual baseline. For a team this size, policy automation isn't optional overhead; it's a prerequisite for JIT access being operationally sustainable.`;
      }
      document.getElementById('r-interpretation').textContent = interp;

      const sensLevels = [0, 25, 50, 75, 90];
      const tbody = document.getElementById('sens-tbody');
      tbody.innerHTML = '';
      sensLevels.forEach(function(level) {
        const wHours = frictionHoursFor(weeklyRequests, level, waitMins, residualMins);
        const aHours = wHours * 52;
        const aCost = aHours * hourlyCost;
        const recovered = annualCostBaseline - aCost;
        const tr = document.createElement('tr');
        if (level === Math.round(autoPct / 25) * 25 && Math.abs(level - autoPct) < 13) {
          tr.className = 'sens-current';
        }
        tr.innerHTML = '<td>' + level + '%</td><td>' + fmt(aHours) + ' hrs</td><td>' + fmtMoney(aCost) + '</td><td>' + fmtMoney(recovered) + '</td>';
        tbody.appendChild(tr);
      });

      const incidentResultsEl = document.getElementById('incident-results');
      if (incidentPct > 0 && downtimeCost > 0) {
        const incidentRequestsPerYear = totalRequests * (incidentPct / 100);
        const incidentMinutesPerYear = incidentRequestsPerYear * waitMins;
        const incidentExposure = incidentMinutesPerYear * downtimeCost;
        document.getElementById('r-incident-requests').textContent = fmt(incidentRequestsPerYear);
        document.getElementById('r-incident-cost').textContent = fmtMoney(incidentExposure);
        incidentResultsEl.style.display = '';
        calcResults.incidentExposure = incidentExposure;
        calcResults.incidentRequestsPerYear = incidentRequestsPerYear;
      } else {
        incidentResultsEl.style.display = 'none';
      }

      document.getElementById('calc-form').style.display = 'none';
      document.getElementById('results-block').classList.add('visible');
    }

    document.getElementById('recalc-btn').addEventListener('click', function() {
      document.getElementById('calc-form').style.display = '';
      document.getElementById('results-block').classList.remove('visible');
    });

    // ── Export gate: newsletter.js handles subscribe; this fires after success ──
    window._onExportGateSuccess = function(form) {
      if (form && form.closest('.export-gate')) {
        setTimeout(function() { window.print(); }, 600);
      }
    };
  })();
  </script>
</body>
</html>