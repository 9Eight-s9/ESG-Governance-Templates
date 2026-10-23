/**
 * ESG Circular Economy Audit B.5 — app.js v2.0
 * 58 asset categories across 8 industry sections
 * Pure JS, stateless, no backend
 */
'use strict';

const STATE = {};
const ROUTE_EF = { Reuse: 0.05, Refurbish: 0.25, Recycle: 0.45, Dispose: 0.95 };
// Route EF as fraction of new EF (how much of new EF is consumed by each route)
// Saving = Qty × NewEF × (1 - routeFraction)

document.addEventListener('DOMContentLoaded', function () {
  initState();
  buildAllSections();
  document.getElementById('orgDate').value = new Date().toISOString().slice(0, 10);
  const ltx = document.getElementById('orgLandfillTax');
  if (ltx && !ltx.value) ltx.value = '126.15';
  updateDashboard();
});

/* ── INIT ─────────────────────────────────────────────────── */
function initState() {
  B5_DATA.forEach(sec => {
    sec.items.forEach(item => {
      STATE[item.id] = { qty: 0, efNew: 0, route: '', condition: '', notes: '', partner: '' };
    });
  });
}

/* ── TAB SWITCHING ─────────────────────────────────────────── */
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tabId));
  if (tabId === 'dashboard') setTimeout(drawCharts, 80);
}

/* ── BUILD ALL SECTION PANELS ──────────────────────────────── */
function buildAllSections() {
  const container = document.getElementById('sectionPanels');
  B5_DATA.forEach(sec => {
    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    panel.id = 'panel-' + sec.id;

    // Section header colour mapping
    const headerStyle = {
      A:'background:linear-gradient(135deg,#1e3a8a,#1d4ed8)',
      B:'background:linear-gradient(135deg,#7f1d1d,#b91c1c)',
      C:'background:linear-gradient(135deg,#064e3b,#0f766e)',
      D:'background:linear-gradient(135deg,#4c1d95,#7c3aed)',
      E:'background:linear-gradient(135deg,#0c4a6e,#0891b2)',
      F:'background:linear-gradient(135deg,#78350f,#b45309)',
      G:'background:linear-gradient(135deg,#312e81,#4f46e5)',
      H:'background:linear-gradient(135deg,#064e3b,#0f766e)'
    }[sec.id] || 'background:linear-gradient(135deg,#1e3a8a,#1d4ed8)';

    panel.innerHTML = `
      <div class="panel-scroll">
        <div class="section-header" style="${headerStyle}">
          <div class="ph-left">
            <div class="ph-badge">${sec.icon} Section ${sec.id}</div>
            <div>
              <div class="ph-title">${sec.label}</div>
              <div class="ph-sub">${sec.items.length} asset categories · ${sec.industries.substring(0,60)}…</div>
            </div>
          </div>
          <div class="ph-stats">
            <div class="ph-stat"><span id="sec-co2-${sec.id}">—</span><small>kgCO₂e Saved</small></div>
            <div class="ph-stat"><span id="sec-entered-${sec.id}">0</span><small>Entered</small></div>
          </div>
        </div>
        <div class="scope-note"><strong>Section note:</strong> ${sec.note}</div>
        <div class="assets-stack" id="assets-${sec.id}"></div>
      </div>`;

    container.appendChild(panel);

    // Build asset cards
    const stack = document.getElementById('assets-' + sec.id);
    sec.items.forEach(item => stack.appendChild(buildAssetCard(item, sec)));
  });
}

/* ── BUILD ASSET CARD ──────────────────────────────────────── */
function buildAssetCard(item, sec) {
  const card = document.createElement('div');
  card.className = 'asset-card';
  card.id = 'card-' + item.id;

  card.innerHTML = `
    <div class="asset-top">
      <div class="asset-id-cell">${item.id}</div>
      <div class="asset-info-cell">
        <div class="asset-name">${item.name}</div>
        <div class="asset-desc">${item.desc}</div>
        <div class="asset-co2ref">📊 ${item.co2ref}</div>
        <div class="asset-industries">🏭 ${item.industries}</div>
        <div style="margin-top:5px">
          <button class="guid-btn" onclick="toggleGuid('${item.id}')">+ Show guidance &amp; circular partners</button>
          <div class="guid-text" id="guid-${item.id}">
            📋 <strong>Guidance:</strong> ${item.guidance}<br/>
            🤝 <strong>Circular Partners:</strong> ${item.partners}
          </div>
        </div>
      </div>
      <div class="asset-result-cell">
        <div class="result-co2" id="result-${item.id}">—</div>
        <div class="result-unit">kgCO₂e saved</div>
      </div>
    </div>
    <div class="asset-inputs">
      <div class="inp-col">
        <div class="inp-label">Quantity (units)</div>
        <input type="number" class="inp-field" min="0" step="1" placeholder="e.g. 50"
          id="qty-${item.id}" oninput="onInput('${item.id}')"/>
        <div class="inp-hint">Number of items being assessed</div>
      </div>
      <div class="inp-col">
        <div class="inp-label">Embodied Carbon — New (kgCO₂e/unit)</div>
        <input type="number" class="inp-field" min="0" step="any" placeholder="e.g. 85"
          id="ef-${item.id}" oninput="onInput('${item.id}')"/>
        <div class="inp-hint">From WRAP / EPD / guidance above</div>
      </div>
      <div class="inp-col">
        <div class="inp-label">Circular Action Route</div>
        <select class="route-select inp-field" id="route-${item.id}" onchange="onInput('${item.id}')">
          <option value="">Select route…</option>
          <option value="Reuse">♻️ Reuse (in-house or donate)</option>
          <option value="Refurbish">🔧 Refurbish / Remanufacture</option>
          <option value="Recycle">🔄 Recycle (material stream)</option>
          <option value="Dispose">🗑️ Dispose (landfill / incineration)</option>
        </select>
        <div class="inp-hint">See hierarchy in Guide tab</div>
      </div>
      <div class="inp-col">
        <div class="inp-label">Asset Condition (1–5)</div>
        <select class="route-select inp-field" id="cond-${item.id}" onchange="STATE['${item.id}'].condition=this.value">
          <option value="">Select…</option>
          <option value="5">5 — Excellent / As new</option>
          <option value="4">4 — Good / Minor wear</option>
          <option value="3">3 — Fair / Functional</option>
          <option value="2">2 — Poor / Needs repair</option>
          <option value="1">1 — End of life / Scrap</option>
        </select>
        <div class="inp-hint">Influences route viability</div>
      </div>
      <div class="notes-col">
        <textarea class="notes-ta" placeholder="Asset location, age, notes…"
          id="notes-${item.id}" oninput="STATE['${item.id}'].notes=this.value"></textarea>
        <input type="text" class="meta-inp" placeholder="Circular partner confirmed"
          id="partner-${item.id}" oninput="STATE['${item.id}'].partner=this.value"/>
      </div>
    </div>`;

  return card;
}

/* ── INPUT HANDLER ─────────────────────────────────────────── */
function onInput(itemId) {
  const qty   = parseFloat(document.getElementById('qty-'   + itemId)?.value) || 0;
  const ef    = parseFloat(document.getElementById('ef-'    + itemId)?.value) || 0;
  const route = document.getElementById('route-' + itemId)?.value || '';
  const s = STATE[itemId];
  s.qty   = qty;
  s.efNew = ef;
  s.route = route;

  // CO₂e saved = qty × efNew × (1 - routeFraction)
  let saving = null;
  if (qty > 0 && ef > 0 && route) {
    const frac = ROUTE_EF[route] || 1;
    saving = qty * ef * (1 - frac);
    if (saving < 0) saving = 0;
  }
  s.saving = saving;

  // Update result cell
  const resultEl = document.getElementById('result-' + itemId);
  const cardEl   = document.getElementById('card-'   + itemId);
  if (resultEl) {
    if (saving !== null && saving > 0) {
      resultEl.textContent = saving >= 1000 ? (saving / 1000).toFixed(1) + 'k' : saving.toFixed(0);
      resultEl.classList.add('has-val');
      if (cardEl) cardEl.classList.add('has-data');
    } else {
      resultEl.textContent = route === 'Dispose' ? '0' : '—';
      resultEl.classList.remove('has-val');
      if (cardEl) cardEl.classList.remove('has-data');
    }
  }

  // Update section stats
  const sec = B5_DATA.find(s => s.items.some(i => i.id === itemId));
  if (sec) updateSectionStats(sec.id);
  updateProgress();
  updateDashboard();
}

/* ── SECTION STATS ─────────────────────────────────────────── */
function updateSectionStats(secId) {
  const sec = B5_DATA.find(s => s.id === secId);
  if (!sec) return;
  let total = 0, entered = 0;
  sec.items.forEach(item => {
    const s = STATE[item.id];
    if (s.qty > 0) entered++;
    if (s.saving > 0) total += s.saving;
  });
  const co2el = document.getElementById('sec-co2-' + secId);
  const ent   = document.getElementById('sec-entered-' + secId);
  if (co2el) co2el.textContent = total > 0 ? (total >= 1000 ? (total/1000).toFixed(1)+'k' : total.toFixed(0)) : '—';
  if (ent)   ent.textContent   = entered;

  // Update tab badge
  const badge = document.getElementById('badge-' + secId);
  if (badge) badge.textContent = entered > 0 ? entered + '/' + sec.items.length : sec.items.length;
}

/* ── PROGRESS BAR ──────────────────────────────────────────── */
function updateProgress() {
  const total = 58;
  const done  = Object.values(STATE).filter(s => s.qty > 0).length;
  const pct   = Math.round((done / total) * 100);
  document.getElementById('progressFill').style.width  = pct + '%';
  document.getElementById('progressLabel').textContent = done + ' / 58 assets assessed';
  document.getElementById('progressPct').textContent   = pct + '%';
}

/* ── DASHBOARD ─────────────────────────────────────────────── */
function updateDashboard() {
  let totalSaving = 0, totalReuse = 0, totalDiverted = 0, totalUnits = 0;
  const sectionSavings = {};
  const routeCounts = { Reuse: 0, Refurbish: 0, Recycle: 0, Dispose: 0 };
  const topItems = [];

  B5_DATA.forEach(sec => {
    let secSaving = 0;
    sec.items.forEach(item => {
      const s = STATE[item.id];
      if (s.qty > 0) {
        totalUnits += s.qty;
        if (s.saving > 0) { totalSaving += s.saving; secSaving += s.saving; }
        if (s.route === 'Reuse' || s.route === 'Refurbish') totalReuse += s.qty;
        if (s.route && s.route !== 'Dispose') totalDiverted += s.qty;
        if (s.route) routeCounts[s.route] = (routeCounts[s.route] || 0) + s.qty;
        if (s.saving > 0) topItems.push({ name: item.name, secId: sec.id, saving: s.saving, route: s.route });
      }
    });
    sectionSavings[sec.id] = secSaving;
  });

  const fmt = v => v > 0 ? (v >= 1000 ? (v/1000).toFixed(1) + 'k' : v.toFixed(0)) : '—';
  document.getElementById('kpiCO2').textContent       = fmt(totalSaving / 1000); // convert to tCO2e
  document.getElementById('kpiCO2').nextElementSibling.textContent = 'tCO₂e Saved';
  const co2kg = totalSaving;
  document.getElementById('kpiCO2').textContent = co2kg >= 1000 ? (co2kg/1000).toFixed(2) + ' t' : co2kg.toFixed(0) + ' kg';

  document.getElementById('kpiAssets').textContent = Object.values(STATE).filter(s => s.qty > 0).length;
  document.getElementById('kpiAssetsSub').textContent = 'of 58 categories';
  document.getElementById('kpiReuse').textContent    = totalReuse > 0    ? totalReuse    : '—';
  document.getElementById('kpiLandfill').textContent  = totalDiverted > 0 ? totalDiverted : '—';
  document.getElementById('kpiDivertPct').textContent = totalUnits > 0 ? Math.round((totalDiverted/totalUnits)*100) + '%' : '—';

  // Intensity
  const budget   = parseFloat(document.getElementById('orgBudget')?.value)      || 0;
  const emps     = parseFloat(document.getElementById('orgEmployees')?.value)    || 0;
  const floor    = parseFloat(document.getElementById('orgFloor')?.value)        || 0;
  const taxRate  = parseFloat(document.getElementById('orgLandfillTax')?.value)  || 126.15;
  const dispUnits= routeCounts['Dispose'] || 0;
  // Estimate weight: rough 50kg/unit average for landfill tax
  const dispTonnes = dispUnits * 0.05; // 50kg average
  const taxAvoided = (totalDiverted * 0.05) * taxRate;

  document.getElementById('kpiLandfillCost').textContent = taxAvoided > 0 ? '£' + taxAvoided.toFixed(0) : '—';
  document.getElementById('kpiPerHead').textContent  = (co2kg > 0 && emps > 0) ? (co2kg/emps).toFixed(1) : '—';
  document.getElementById('kpiPerM2').textContent    = (co2kg > 0 && floor > 0) ? (co2kg/floor).toFixed(2) : '—';

  const doneN = Object.values(STATE).filter(s => s.qty > 0).length;
  document.getElementById('kpiEntered').innerHTML    = doneN + '<span style="font-size:0.9rem">/58</span>';
  document.getElementById('kpiEnteredSub').textContent = Math.round(doneN/58*100) + '% complete';

  // Top savings table
  buildTopSavingsTable(topItems);

  // Interpretation
  updateInterp(co2kg, totalDiverted, totalUnits, doneN);

  // Charts
  drawCharts(sectionSavings, routeCounts);
}

/* ── TOP SAVINGS TABLE ─────────────────────────────────────── */
function buildTopSavingsTable(items) {
  const wrap = document.getElementById('topSavingsTable');
  if (!wrap) return;
  if (items.length === 0) {
    wrap.innerHTML = '<div class="empty-state">Enter asset data in the section tabs to see ranked savings opportunities.</div>';
    return;
  }
  items.sort((a, b) => b.saving - a.saving);
  const top = items.slice(0, 12);
  const max = top[0].saving;
  const routeColors = { Reuse:'#16a34a', Refurbish:'#d97706', Recycle:'#2563eb', Dispose:'#dc2626' };

  let html = `<table class="ranked-table"><thead><tr>
    <th>#</th><th>Asset Name</th><th>Section</th><th>Route</th>
    <th style="text-align:right">kgCO₂e Saved</th><th>Relative Impact</th>
  </tr></thead><tbody>`;
  top.forEach((item, i) => {
    const barW = Math.round((item.saving / max) * 100);
    const col  = routeColors[item.route] || '#64748b';
    html += `<tr>
      <td style="font-weight:800;color:#94a3b8">${i+1}</td>
      <td style="font-weight:600;color:#1e293b">${item.name}</td>
      <td><span style="background:#eff6ff;color:#1d4ed8;font-size:0.7rem;font-weight:700;padding:2px 7px;border-radius:4px">${item.secId}</span></td>
      <td><span style="color:${col};font-size:0.8rem;font-weight:600">${item.route}</span></td>
      <td style="text-align:right;font-weight:700;color:#16a34a">${item.saving.toFixed(0)}</td>
      <td><div class="rt-bar-wrap"><div class="rt-bar-fill" style="width:${barW}%;background:${col}"></div></div></td>
    </tr>`;
  });
  wrap.innerHTML = html + '</tbody></table>';
}

/* ── INTERPRETATION ────────────────────────────────────────── */
function updateInterp(co2kg, diverted, total, doneN) {
  const body = document.getElementById('interpActionBody');
  if (!body) return;
  if (doneN === 0) { body.textContent = 'Enter asset data to generate recommendations.'; return; }
  const lines = [];
  const pct = total > 0 ? Math.round((diverted/total)*100) : 0;
  if (pct >= 90) lines.push('✅ Excellent diversion rate (' + pct + '%) — exceeds ESRS E5 and WRAP targets. Document circular partner confirmations for GRI 306-4 disclosure.');
  else if (pct >= 75) lines.push('👍 Good diversion rate (' + pct + '%). Review remaining Dispose-route assets to identify further circular opportunities.');
  else if (pct > 0)   lines.push('⚠️ Diversion rate is ' + pct + '% — below the 90% WRAP target. Identify highest-volume Dispose-route assets and engage circular partners.');
  if (co2kg > 10000) lines.push('🌍 CO₂e savings exceed 10 tonnes — reportable under ESRS E5 (circular economy metrics) and GRI 306-4 (waste diverted from disposal).');
  if (doneN < 20)    lines.push('⏳ Early stage — complete your most relevant sections first (typically 2–4 for most organisations). Use the section tabs to add assets.');
  if (doneN >= 40)   lines.push('📋 Comprehensive audit — ' + doneN + '/58 categories assessed. Export CSV for ESRS E5 and GRI 306 disclosure, and JSON to save and resume.');
  body.innerHTML = lines.join('<br/><br/>') || 'Continue entering data — recommendations will appear as more assets are assessed.';
}

/* ── CHARTS ────────────────────────────────────────────────── */
function drawCharts(sectionSavings, routeCounts) {
  drawSectionChart(sectionSavings);
  drawRouteChart(routeCounts);
}

function drawSectionChart(savings) {
  const canvas = document.getElementById('chartSection');
  if (!canvas) return;
  const W = canvas.parentElement.offsetWidth || 260, H = 220;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0,0,W,H);

  const bars = B5_DATA.map(sec => ({ label: sec.id, val: savings[sec.id] || 0, col: sec.color }));
  const maxVal = Math.max(...bars.map(b => b.val), 1);
  const pad = {top:28,right:12,bottom:40,left:48};
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const bw = Math.max(12, (plotW / bars.length) - 8);

  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  [0,0.5,1].forEach(f => {
    const y = pad.top + plotH*(1-f);
    ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(W-pad.right,y); ctx.stroke();
    const v = maxVal*f;
    ctx.fillStyle='#94a3b8'; ctx.font='8px Inter,sans-serif'; ctx.textAlign='right';
    ctx.fillText(v>=1000?(v/1000).toFixed(0)+'k':v.toFixed(0), pad.left-3, y+3);
  });

  bars.forEach((b, i) => {
    const bh = Math.max(2, (b.val/maxVal)*plotH);
    const x  = pad.left + i*(plotW/bars.length) + (plotW/bars.length - bw)/2;
    const y  = pad.top + plotH - bh;
    if (b.val > 0) {
      ctx.fillStyle = b.col;
      if (ctx.roundRect) ctx.roundRect(x,y,bw,bh,[3,3,0,0]); else ctx.rect(x,y,bw,bh);
      ctx.fill();
      ctx.fillStyle='#1e293b'; ctx.font='bold 8px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText(b.val>=1000?(b.val/1000).toFixed(0)+'k':b.val.toFixed(0), x+bw/2, y-4);
    }
    ctx.fillStyle=b.col; ctx.font='9px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText(b.label, x+bw/2, H-pad.bottom+14);
  });
}

function drawRouteChart(routeCounts) {
  const canvas = document.getElementById('chartRoute');
  if (!canvas) return;
  const W = canvas.parentElement.offsetWidth || 420, H = 220;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,W,H);

  const routes = [
    {label:'Reuse', val: routeCounts['Reuse']||0, col:'#16a34a'},
    {label:'Refurbish', val: routeCounts['Refurbish']||0, col:'#d97706'},
    {label:'Recycle', val: routeCounts['Recycle']||0, col:'#2563eb'},
    {label:'Dispose', val: routeCounts['Dispose']||0, col:'#dc2626'},
  ];
  const total = routes.reduce((a,r) => a+r.val, 0);
  if (total === 0) {
    ctx.fillStyle='#94a3b8'; ctx.font='13px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText('Enter asset routes to see distribution', W/2, H/2);
    return;
  }

  const pad = {top:28,right:16,bottom:40,left:48};
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const maxVal = Math.max(...routes.map(r => r.val));
  const bw = (plotW / routes.length) - 16;

  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  [0,0.5,1].forEach(f => {
    const y = pad.top + plotH*(1-f);
    ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(W-pad.right,y); ctx.stroke();
    ctx.fillStyle='#94a3b8'; ctx.font='8px Inter,sans-serif'; ctx.textAlign='right';
    ctx.fillText(Math.round(maxVal*f), pad.left-3, y+3);
  });

  routes.forEach((r, i) => {
    const bh = maxVal > 0 ? (r.val/maxVal)*plotH : 0;
    const x  = pad.left + i*(plotW/routes.length) + 8;
    const y  = pad.top + plotH - bh;
    if (r.val > 0) {
      ctx.fillStyle = r.col;
      if (ctx.roundRect) ctx.roundRect(x,y,bw,bh,[3,3,0,0]); else ctx.rect(x,y,bw,bh);
      ctx.fill();
      ctx.fillStyle='#1e293b'; ctx.font='bold 9px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText(r.val + ' units', x+bw/2, y-4);
    }
    ctx.fillStyle=r.col; ctx.font='bold 9px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText(r.label, x+bw/2, H-pad.bottom+14);
    if (total > 0) {
      ctx.fillStyle='#94a3b8'; ctx.font='8px Inter,sans-serif';
      ctx.fillText(Math.round((r.val/total)*100)+'%', x+bw/2, H-pad.bottom+25);
    }
  });
}

/* ── TOGGLE GUIDANCE ───────────────────────────────────────── */
function toggleGuid(itemId) {
  const el  = document.getElementById('guid-'  + itemId);
  const btn = el.previousElementSibling;
  el.classList.toggle('show');
  btn.textContent = el.classList.contains('show') ? '− Hide guidance & circular partners' : '+ Show guidance & circular partners';
}

/* ── RESET ─────────────────────────────────────────────────── */
function resetAll() {
  if (!confirm('Reset all asset data? This cannot be undone.')) return;
  Object.keys(STATE).forEach(id => {
    STATE[id] = { qty: 0, efNew: 0, route: '', condition: '', notes: '', partner: '', saving: null };
    ['qty','ef','route','cond','notes','partner'].forEach(f => {
      const el = document.getElementById(f+'-'+id);
      if (el) el.value = '';
    });
    const res  = document.getElementById('result-' + id);
    const card = document.getElementById('card-'   + id);
    if (res)  { res.textContent = '—'; res.classList.remove('has-val'); }
    if (card)   card.classList.remove('has-data');
  });
  ['orgName','orgIndustry','orgPeriod','orgLead','orgSite','orgFloor','orgBudget','orgEmployees','orgFramework'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value = '';
  });
  const trig = document.getElementById('orgTrigger'); if (trig) trig.selectedIndex = 0;
  document.getElementById('orgLandfillTax').value = '126.15';
  document.getElementById('orgDate').value = new Date().toISOString().slice(0,10);
  B5_DATA.forEach(sec => updateSectionStats(sec.id));
  updateProgress();
  updateDashboard();
}

/* ── EXPORT JSON ─────────────────────────────────────────── */
function exportJSON() {
  const payload = {
    meta: {
      tool:'ESG Circular Economy Audit B.5', version:'2.0', exported: new Date().toISOString(),
      org: {
        name:      document.getElementById('orgName').value,
        industry:  document.getElementById('orgIndustry').value,
        period:    document.getElementById('orgPeriod').value,
        trigger:   document.getElementById('orgTrigger').value,
        framework: document.getElementById('orgFramework').value,
        lead:      document.getElementById('orgLead').value,
        site:      document.getElementById('orgSite').value,
        floor:     document.getElementById('orgFloor').value,
        budget:    document.getElementById('orgBudget').value,
        employees: document.getElementById('orgEmployees').value,
        landfillTax: document.getElementById('orgLandfillTax').value,
        date:      document.getElementById('orgDate').value,
      }
    },
    data: {}
  };
  Object.keys(STATE).forEach(id => { payload.data[id] = {...STATE[id]}; });
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const org  = (document.getElementById('orgName').value||'ESG').replace(/\s+/g,'_');
  a.href = url;
  a.download = org + '_CircularEconomy_B5_' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── EXPORT CSV ─────────────────────────────────────────── */
function exportCSV() {
  const org = document.getElementById('orgName').value || 'Organisation';
  const rows = [['Asset ID','Section','Asset Name','Industries','Quantity','Embodied Carbon New (kgCO₂e/unit)','Circular Route','Condition','kgCO₂e Saved','Circular Partners','Notes','Partner Confirmed']];
  B5_DATA.forEach(sec => {
    sec.items.forEach(item => {
      const s = STATE[item.id];
      rows.push([
        item.id, sec.label, item.name, item.industries,
        s.qty || '', s.efNew || '', s.route || '', s.condition || '',
        s.saving !== null ? s.saving.toFixed(2) : '',
        item.partners, s.notes || '', s.partner || ''
      ]);
    });
  });
  const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g,'""') + '"').join(',')).join('\n');
  const blob = new Blob([csv], {type:'text/csv'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = org.replace(/\s+/g,'_') + '_CircularEconomy_B5_' + new Date().toISOString().slice(0,10) + '.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── IMPORT ─────────────────────────────────────────────── */
function importJSON() { document.getElementById('importFileInput').click(); }
function handleImport(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const p = JSON.parse(e.target.result);
      if (!p.data) throw new Error('Invalid file format');
      if (p.meta?.org) {
        const o = p.meta.org;
        const map = {name:'orgName',industry:'orgIndustry',period:'orgPeriod',trigger:'orgTrigger',
          framework:'orgFramework',lead:'orgLead',site:'orgSite',floor:'orgFloor',
          budget:'orgBudget',employees:'orgEmployees',landfillTax:'orgLandfillTax',date:'orgDate'};
        Object.entries(map).forEach(([k,elId]) => {
          const el = document.getElementById(elId);
          if (el && o[k] !== undefined) el.value = o[k];
        });
      }
      Object.entries(p.data).forEach(([id, st]) => {
        if (!STATE[id]) return;
        STATE[id] = { ...STATE[id], ...st };
        const set = (f,v) => { const el = document.getElementById(f+'-'+id); if (el) el.value = v || ''; };
        set('qty', st.qty); set('ef', st.efNew); set('route', st.route);
        set('cond', st.condition); set('notes', st.notes); set('partner', st.partner);
        // Recalc
        if (st.qty && st.efNew && st.route) {
          const frac = ROUTE_EF[st.route] || 1;
          STATE[id].saving = st.qty * st.efNew * (1 - frac);
          const res = document.getElementById('result-' + id);
          if (res && STATE[id].saving > 0) {
            res.textContent = STATE[id].saving >= 1000 ? (STATE[id].saving/1000).toFixed(1)+'k' : STATE[id].saving.toFixed(0);
            res.classList.add('has-val');
            const card = document.getElementById('card-'+id);
            if (card) card.classList.add('has-data');
          }
        }
      });
      B5_DATA.forEach(sec => updateSectionStats(sec.id));
      updateProgress();
      updateDashboard();
      alert('Imported successfully.');
    } catch(err) { alert('Import failed: ' + err.message); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

window.addEventListener('resize', () => { if (document.getElementById('panel-dashboard').classList.contains('active')) drawCharts({}); });
