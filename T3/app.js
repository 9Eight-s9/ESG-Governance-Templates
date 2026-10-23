/**
 * ESG Emissions Inventory B.3 — app.js v2.0
 * Tabs: Dashboard · Guide · Scope 1 · Scope 2 · Scope 3
 * Pure JS, stateless, no backend
 */
'use strict';

// STATE: { sourceId: { activity, ef, tco2e, activityLB, efLB, tco2eLB, notes, owner, dataSource } }
const STATE = {};

document.addEventListener('DOMContentLoaded', function () {
  initState();
  buildScope1();
  buildScope2();
  buildScope3();
  document.getElementById('orgDate').value = new Date().toISOString().slice(0,10);
  refreshDashboard();
});

/* ── INIT ─────────────────────────────────────────────────── */
function initState() {
  B3_DATA.scope1.sources.forEach(s => {
    STATE[s.id] = { activity:'', ef:'', tco2e:null, notes:'', owner:'', dataSource:'' };
  });
  B3_DATA.scope2.sources.forEach(s => {
    STATE[s.id] = { activity:'', ef:'', tco2e:null, activityLB:'', efLB:'', tco2eLB:null, notes:'', owner:'', dataSource:'' };
  });
  B3_DATA.scope3Categories.forEach(cat => {
    cat.sources.forEach(s => {
      STATE[s.id] = { activity:'', ef:'', tco2e:null, notes:'', owner:'', dataSource:'' };
    });
  });
}

/* ── TAB SWITCHING ─────────────────────────────────────────── */
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tabId));
  if (tabId === 'dashboard') setTimeout(drawCharts, 80);
}

/* ── BUILD SCOPE 1 ─────────────────────────────────────────── */
function buildScope1() {
  const stack = document.getElementById('sources-S1');
  B3_DATA.scope1.sources.forEach(src => stack.appendChild(buildSourceCard(src, 'S1')));
}

/* ── BUILD SCOPE 2 ─────────────────────────────────────────── */
function buildScope2() {
  const stack = document.getElementById('sources-S2');
  B3_DATA.scope2.sources.forEach(src => stack.appendChild(buildSourceCard(src, 'S2')));
}

/* ── BUILD SCOPE 3 ─────────────────────────────────────────── */
function buildScope3() {
  const stack = document.getElementById('sources-S3');
  B3_DATA.scope3Categories.forEach(cat => {
    const block = document.createElement('div');
    block.className = 's3-category-block';
    block.id = 's3-cat-' + cat.cat;

    const hdr = document.createElement('div');
    hdr.className = 's3-cat-header';
    hdr.style.borderLeft = '5px solid ' + cat.color;
    hdr.innerHTML = `
      <div class="s3-cat-left">
        <div class="s3-cat-num">Cat ${cat.cat}</div>
        <div>
          <div class="s3-cat-name">${cat.name}</div>
          <div class="s3-cat-meta">${cat.method} · Priority: ${cat.priority}</div>
        </div>
      </div>
      <div class="s3-cat-right">
        <div class="s3-cat-total" id="s3cat-total-${cat.cat}">—<small>tCO₂e</small></div>
        <div class="s3-cat-toggle open" id="s3tog-${cat.cat}">▲</div>
      </div>`;
    hdr.addEventListener('click', () => toggleS3Cat(cat.cat));

    const srcDiv = document.createElement('div');
    srcDiv.className = 's3-cat-sources';
    srcDiv.id = 's3-sources-' + cat.cat;
    cat.sources.forEach(src => srcDiv.appendChild(buildSourceCard(src, 'S3')));

    block.appendChild(hdr);
    block.appendChild(srcDiv);
    stack.appendChild(block);
  });
}

function toggleS3Cat(catNum) {
  const src = document.getElementById('s3-sources-' + catNum);
  const tog = document.getElementById('s3tog-' + catNum);
  src.classList.toggle('collapsed');
  tog.classList.toggle('open', !src.classList.contains('collapsed'));
  tog.textContent = src.classList.contains('collapsed') ? '▼' : '▲';
}

/* ── BUILD SOURCE CARD ─────────────────────────────────────── */
function buildSourceCard(src, scopeKey) {
  const isS2 = scopeKey === 'S2';
  const isS2LB = src.isS2LB;
  const isS2MB = src.isS2MB;

  const card = document.createElement('div');
  card.className = 'source-card' + (isS2 ? ' s2-card' : '');
  card.id = 'card-' + src.id;

  // Second input row for S2 location-based if this is market-based card
  const extraInputs = (isS2MB || isS2LB) ? `
    <div class="inp-col">
      <div class="inp-label">${isS2MB ? 'Loc-Based kWh (for comparison)' : 'Market-Based kWh (if applicable)'}</div>
      <input type="number" class="inp-field" min="0" step="any" placeholder="kWh"
        id="actLB-${src.id}" oninput="onInputLB('${src.id}',this.value)"
        title="${isS2MB ? 'Enter same kWh as location-based (S2-01)' : 'Enter kWh under market-based EF'}"/>
      <div class="inp-hint">${isS2MB ? 'Ref: S2-01 figure. Apply market EF above.' : 'Apply residual mix or contracted EF.'}</div>
    </div>` : '';

  card.innerHTML = `
    <div class="source-top">
      <div class="source-id-cell">${src.id}</div>
      <div class="source-info-cell">
        <div class="source-name">${src.name}</div>
        <div class="source-desc">${src.desc}</div>
        <div class="source-ef-inline">EF: ${src.ef}</div>
        <div class="source-industries">🏭 ${src.industries}</div>
        <button class="guid-btn" onclick="toggleGuid('${src.id}')">+ Show guidance</button>
        <div class="guid-text" id="guid-${src.id}">📋 ${src.guidance}</div>
      </div>
      <div class="source-result-cell">
        <div class="result-tco2" id="result-${src.id}">—</div>
        <div class="result-unit">tCO₂e</div>
      </div>
    </div>
    <div class="source-inputs">
      <div class="inp-col">
        <div class="inp-label">Activity Data</div>
        <input type="number" class="inp-field" min="0" step="any" placeholder="${src.unit}"
          id="act-${src.id}" oninput="onInput('${src.id}',this.value)"
          title="Enter activity quantity in ${src.unit}"/>
        <div class="inp-hint">Unit: ${src.unit}</div>
      </div>
      <div class="inp-col">
        <div class="inp-label">Emission Factor (kgCO₂e / unit)</div>
        <input type="number" class="inp-field" min="0" step="any" placeholder="e.g. 0.18254"
          id="ef-${src.id}" oninput="onInput('${src.id}',this.value)"
          title="Enter EF in kgCO₂e per unit. See guidance above for source."/>
        <div class="inp-hint">Source: ${src.efSource}</div>
      </div>
      ${extraInputs}
      <div class="notes-col">
        <textarea class="notes-ta" placeholder="Data source / assumptions / data quality…"
          id="notes-${src.id}" oninput="STATE['${src.id}'].notes=this.value"></textarea>
        <input type="text" class="meta-inp" placeholder="Data source / system"
          id="ds-${src.id}" oninput="STATE['${src.id}'].dataSource=this.value"/>
        <input type="text" class="meta-inp" placeholder="Owner"
          id="owner-${src.id}" oninput="STATE['${src.id}'].owner=this.value"/>
      </div>
    </div>`;
  return card;
}

/* ── INPUT HANDLERS ────────────────────────────────────────── */
function onInput(srcId, val) {
  const s = STATE[srcId];
  const actEl = document.getElementById('act-' + srcId);
  const efEl  = document.getElementById('ef-'  + srcId);
  s.activity = actEl ? parseFloat(actEl.value) || 0 : 0;
  s.ef       = efEl  ? parseFloat(efEl.value)  || 0 : 0;
  // tCO₂e = activity × EF (kg) / 1000
  s.tco2e = (s.activity > 0 && s.ef > 0) ? (s.activity * s.ef) / 1000 : null;
  updateResultCell(srcId);
  updateScopeStats();
  refreshDashboard();
}

function onInputLB(srcId, val) {
  // For S2 dual reporting: secondary kWh field
  const s = STATE[srcId];
  s.activityLB = parseFloat(val) || 0;
  // tco2eLB uses same EF (user should enter market-based EF in ef field for S2-02)
  const ef = parseFloat(document.getElementById('ef-' + srcId)?.value) || 0;
  s.tco2eLB = (s.activityLB > 0 && ef > 0) ? (s.activityLB * ef) / 1000 : null;
  refreshDashboard();
}

function updateResultCell(srcId) {
  const s   = STATE[srcId];
  const el  = document.getElementById('result-' + srcId);
  const card = document.getElementById('card-' + srcId);
  if (!el) return;
  if (s.tco2e !== null && s.tco2e > 0) {
    el.textContent = formatT(s.tco2e);
    el.classList.add('has-val');
    if (card) card.classList.add('has-data');
  } else {
    el.textContent = '—';
    el.classList.remove('has-val');
    if (card) card.classList.remove('has-data');
  }
}

function formatT(v) {
  if (v === null || v === undefined) return '—';
  if (v >= 1000) return (v/1000).toFixed(1) + 'k';
  if (v >= 100)  return v.toFixed(0);
  if (v >= 10)   return v.toFixed(1);
  return v.toFixed(2);
}

function toggleGuid(srcId) {
  const el  = document.getElementById('guid-' + srcId);
  const btn = el.previousElementSibling;
  el.classList.toggle('show');
  btn.textContent = el.classList.contains('show') ? '− Hide guidance' : '+ Show guidance';
}

/* ── SCOPE STATS ────────────────────────────────────────────── */
function updateScopeStats() {
  // S1 total
  let s1t = 0, s1n = 0;
  B3_DATA.scope1.sources.forEach(s => {
    const v = STATE[s.id].tco2e;
    if (v > 0) { s1t += v; s1n++; }
  });
  const s1d = document.getElementById('s1-total-display');
  const s1e = document.getElementById('s1-entered');
  if (s1d) s1d.textContent = s1t > 0 ? formatT(s1t) : '—';
  if (s1e) s1e.textContent = s1n;

  // S2 totals (location-based = S2-01 tco2e; market-based = S2-02 tco2e)
  let s2lbt = 0, s2mbt = 0, s2n = 0;
  B3_DATA.scope2.sources.forEach(s => {
    const st = STATE[s.id];
    if (s.isS2LB && st.tco2e > 0) { s2lbt += st.tco2e; s2n++; }
    if (s.isS2MB && st.tco2e > 0) { s2mbt += st.tco2e; }
    if (!s.isS2LB && !s.isS2MB && st.tco2e > 0) { s2lbt += st.tco2e; s2n++; }
  });
  const s2lbd = document.getElementById('s2lb-total-display');
  const s2mbd = document.getElementById('s2mb-total-display');
  const s2e   = document.getElementById('s2-entered');
  if (s2lbd) s2lbd.textContent = s2lbt > 0 ? formatT(s2lbt) : '—';
  if (s2mbd) s2mbd.textContent = s2mbt > 0 ? formatT(s2mbt) : '—';
  if (s2e)   s2e.textContent   = s2n;

  // S3 totals per category
  let s3t = 0, s3n = 0;
  B3_DATA.scope3Categories.forEach(cat => {
    let catTotal = 0;
    cat.sources.forEach(s => {
      const v = STATE[s.id].tco2e;
      if (v > 0) { catTotal += v; s3t += v; s3n++; }
    });
    const el = document.getElementById('s3cat-total-' + cat.cat);
    if (el) el.innerHTML = catTotal > 0 ? formatT(catTotal) + '<small>tCO₂e</small>' : '—<small>tCO₂e</small>';
  });
  const s3d = document.getElementById('s3-total-display');
  const s3e = document.getElementById('s3-entered');
  if (s3d) s3d.textContent = s3t > 0 ? formatT(s3t) : '—';
  if (s3e) s3e.textContent = s3n;

  // Badge counts
  const updateBadge = (id, entered, total) => {
    const el = document.getElementById(id);
    if (el) el.textContent = entered > 0 ? entered + '/' + total : total;
  };
  updateBadge('badge-S1', s1n, 9);
  updateBadge('badge-S2', s2n, 5);
  updateBadge('badge-S3', s3n, 42);
}

/* ── PROGRESS BAR ──────────────────────────────────────────── */
function updateProgress() {
  const all = Object.values(STATE);
  const done = all.filter(s => s.activity && parseFloat(s.activity) > 0).length;
  const pct = Math.round((done / 56) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = done + ' / 56 sources entered';
  document.getElementById('progressPct').textContent = pct + '%';
}

/* ── DASHBOARD ─────────────────────────────────────────────── */
function refreshDashboard() {
  updateProgress();
  updateScopeStats();

  // Compute totals
  let s1Total = 0, s2LBTotal = 0, s2MBTotal = 0, s3Total = 0;
  B3_DATA.scope1.sources.forEach(s => { if (STATE[s.id].tco2e > 0) s1Total += STATE[s.id].tco2e; });
  B3_DATA.scope2.sources.forEach(s => {
    const v = STATE[s.id].tco2e;
    if (v > 0) {
      if (s.isS2LB) s2LBTotal += v;
      else if (s.isS2MB) s2MBTotal += v;
      else s2LBTotal += v;
    }
  });
  B3_DATA.scope3Categories.forEach(cat => {
    cat.sources.forEach(s => { if (STATE[s.id].tco2e > 0) s3Total += STATE[s.id].tco2e; });
  });

  const grandTotal = s1Total + s2LBTotal + s3Total;

  // KPI cards
  const fmt = (v) => v > 0 ? formatT(v) : '—';
  document.getElementById('kpiTotal').textContent = fmt(grandTotal);
  document.getElementById('kpiS1').textContent    = fmt(s1Total);
  document.getElementById('kpiS2LB').textContent  = fmt(s2LBTotal);
  document.getElementById('kpiS2MB').textContent  = fmt(s2MBTotal);
  document.getElementById('kpiS3').textContent    = fmt(s3Total);

  if (grandTotal > 0) {
    document.getElementById('kpiS1pct').textContent = pct(s1Total, grandTotal) + '% of total';
    document.getElementById('kpiS2LBpct').textContent = pct(s2LBTotal, grandTotal) + '% of total';
    document.getElementById('kpiS3pct').textContent = pct(s3Total, grandTotal) + '% of total';
  }

  // Intensity
  const rev  = parseFloat(document.getElementById('orgRevenue')?.value) || 0;
  const emp  = parseFloat(document.getElementById('orgEmployees')?.value) || 0;
  document.getElementById('kpiIntRev').textContent  = (grandTotal > 0 && rev > 0) ? (grandTotal/rev).toFixed(1) : '—';
  document.getElementById('kpiIntEmp').textContent  = (grandTotal > 0 && emp > 0) ? (grandTotal/emp).toFixed(2) : '—';
  document.getElementById('kpiS3share').textContent = (grandTotal > 0 && s3Total > 0) ? pct(s3Total, grandTotal) + '%' : '—';

  const doneN = Object.values(STATE).filter(s => s.activity && parseFloat(s.activity) > 0).length;
  document.getElementById('kpiSourcesEntered').innerHTML = doneN + '<span style="font-size:0.9rem">/56</span>';
  document.getElementById('kpiSourcesSub').textContent   = Math.round(doneN/56*100) + '% complete';

  // S3 category table
  buildS3Table(s3Total);

  // Interpretation
  updateInterp(grandTotal, s1Total, s2LBTotal, s3Total, doneN);

  // Charts
  drawCharts(s1Total, s2LBTotal, s2MBTotal, s3Total);
}

function pct(v, total) {
  return total > 0 ? Math.round((v/total)*100) : 0;
}

/* ── S3 CATEGORY TABLE ─────────────────────────────────────── */
function buildS3Table(s3Total) {
  const wrap = document.getElementById('s3CategoryTable');
  if (!wrap) return;
  const rows = [];
  B3_DATA.scope3Categories.forEach(cat => {
    let catT = 0;
    cat.sources.forEach(s => { if (STATE[s.id].tco2e > 0) catT += STATE[s.id].tco2e; });
    if (catT > 0) rows.push({ cat, total: catT });
  });
  if (rows.length === 0) {
    wrap.innerHTML = '<div class="empty-state">Enter Scope 3 data to see category breakdown.</div>';
    return;
  }
  rows.sort((a,b) => b.total - a.total);
  let html = `<table class="ranked-table"><thead><tr>
    <th>Cat</th><th>Category Name</th><th>Priority</th>
    <th style="text-align:right">tCO₂e</th><th>% of S3</th><th>% of Total</th><th>Progress</th>
    </tr></thead><tbody>`;
  rows.forEach((r, i) => {
    const pS3 = pct(r.total, s3Total);
    const barW = pS3;
    html += `<tr>
      <td><span style="background:#1e3a8a;color:#fff;font-size:0.68rem;font-weight:700;padding:2px 7px;border-radius:4px">${r.cat.cat}</span></td>
      <td style="font-weight:600;color:#1e293b">${r.cat.name}</td>
      <td><span style="font-size:0.7rem;color:#7c3aed">${r.cat.priority}</span></td>
      <td style="text-align:right;font-weight:700;color:#1d4ed8">${r.total.toFixed(1)}</td>
      <td style="font-weight:600">${pS3}%</td>
      <td style="color:#94a3b8">${pct(r.total, Object.values(STATE).reduce((a,s) => a + (s.tco2e||0), 0))}%</td>
      <td><div class="rt-bar-wrap"><div class="rt-bar-fill" style="background:#1d4ed8;width:${barW}%"></div></div></td>
    </tr>`;
  });
  wrap.innerHTML = html + '</tbody></table>';
}

/* ── INTERPRETATION ────────────────────────────────────────── */
function updateInterp(total, s1, s2, s3, doneN) {
  const body = document.getElementById('interpActionBody');
  if (!body) return;
  if (doneN === 0 || total === 0) {
    body.textContent = 'Enter emission data across all three scopes to generate framework alignment recommendations.';
    return;
  }
  const lines = [];
  const s3Pct = pct(s3, total);
  if (s3Pct < 50 && s3 > 0) lines.push('⚠️ Scope 3 is ' + s3Pct + '% of total — typically 70–90% for most organisations. Review whether all material Scope 3 categories have been captured.');
  if (s3Pct >= 70) lines.push('✅ Scope 3 represents ' + s3Pct + '% of total — consistent with GHG Protocol expectations for most industries.');
  if (s1 > 0) lines.push('📋 Scope 1 data entered. Ensure refrigerant leak logs (F-Gas records) and process emission calculations are verified by an engineer.');
  if (s2 > 0) lines.push('⚡ Scope 2 location-based entered. Ensure market-based is also reported (S2-02) for SBTi, CDP, and RE100 compliance.');
  if (doneN >= 30) lines.push('✅ Good coverage — ' + doneN + '/56 sources entered. Focus remaining effort on highest-impact uncompleted categories.');
  if (doneN < 14) lines.push('⏳ Early stage — complete Scope 1 and 2 first, then run spend-based Scope 3 screening across all 15 categories.');
  body.innerHTML = lines.join('<br/><br/>') || 'Keep entering data — recommendations will appear as more sources are completed.';
}

/* ── CHARTS ────────────────────────────────────────────────── */
function updateDashboard() { refreshDashboard(); }

function drawCharts(s1t, s2lbt, s2mbt, s3t) {
  if (arguments.length === 0) {
    // Recalculate
    let s1=0,s2lb=0,s2mb=0,s3=0;
    B3_DATA.scope1.sources.forEach(s => { if (STATE[s.id].tco2e>0) s1+=STATE[s.id].tco2e; });
    B3_DATA.scope2.sources.forEach(s => {
      const v=STATE[s.id].tco2e;
      if(v>0){ if(s.isS2LB) s2lb+=v; else if(s.isS2MB) s2mb+=v; else s2lb+=v; }
    });
    B3_DATA.scope3Categories.forEach(cat=>cat.sources.forEach(s=>{if(STATE[s.id].tco2e>0)s3+=STATE[s.id].tco2e;}));
    drawCharts(s1,s2lb,s2mb,s3);
    return;
  }
  drawScopeChart(s1t,s2lbt,s2mbt,s3t);
  drawS3Chart();
}

function drawScopeChart(s1,s2lb,s2mb,s3) {
  const canvas = document.getElementById('chartScope');
  if (!canvas || !canvas.parentElement) return;
  const W = canvas.parentElement.offsetWidth || 260, H = 220;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0,0,W,H);

  const bars = [
    {label:'Scope 1',val:s1,col:'#b91c1c'},
    {label:'S2 Loc.',val:s2lb,col:'#b45309'},
    {label:'S2 Mkt.',val:s2mb,col:'#15803d'},
    {label:'Scope 3',val:s3,col:'#1d4ed8'},
  ];
  const maxVal = Math.max(...bars.map(b=>b.val), 1);
  const pad = {top:28,right:16,bottom:46,left:48};
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const bw = (plotW / bars.length) - 10;

  // Grid
  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  [0,0.25,0.5,0.75,1].forEach(f => {
    const y = pad.top + plotH*(1-f);
    ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(W-pad.right,y); ctx.stroke();
    ctx.fillStyle='#94a3b8'; ctx.font='8px Inter,sans-serif'; ctx.textAlign='right';
    const v = maxVal*f;
    ctx.fillText(v>=1000?(v/1000).toFixed(0)+'k':v.toFixed(0), pad.left-3, y+3);
  });

  bars.forEach((b, i) => {
    const bh = (b.val/maxVal)*plotH;
    const x  = pad.left + i*(plotW/bars.length) + 8;
    const y  = pad.top + plotH - bh;
    if (b.val > 0) {
      ctx.fillStyle = b.col;
      if (ctx.roundRect) ctx.roundRect(x,y,bw,bh,[3,3,0,0]);
      else ctx.rect(x,y,bw,bh);
      ctx.fill();
      ctx.fillStyle='#1e293b'; ctx.font='bold 9px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText(formatT(b.val), x+bw/2, y-5);
    }
    ctx.fillStyle = b.col; ctx.font='9px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText(b.label, x+bw/2, H-pad.bottom+14);
  });
}

function drawS3Chart() {
  const canvas = document.getElementById('chartS3');
  if (!canvas || !canvas.parentElement) return;
  const W = canvas.parentElement.offsetWidth || 450, H = 220;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,W,H);

  const cats = [];
  B3_DATA.scope3Categories.forEach(cat => {
    let t = 0;
    cat.sources.forEach(s => { if (STATE[s.id].tco2e > 0) t += STATE[s.id].tco2e; });
    if (t > 0) cats.push({name:'Cat '+cat.cat, val:t, col:cat.color});
  });
  if (cats.length === 0) {
    ctx.fillStyle='#94a3b8'; ctx.font='13px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText('Enter Scope 3 data to see category chart', W/2, H/2);
    return;
  }

  cats.sort((a,b)=>b.val-a.val);
  const maxVal = cats[0].val;
  const pad = {top:28,right:16,bottom:46,left:54};
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const bw = Math.min(38, (plotW/cats.length) - 6);

  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  [0,0.5,1].forEach(f => {
    const y = pad.top+plotH*(1-f);
    ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(W-pad.right,y); ctx.stroke();
    const v = maxVal*f;
    ctx.fillStyle='#94a3b8'; ctx.font='8px Inter,sans-serif'; ctx.textAlign='right';
    ctx.fillText(v>=1000?(v/1000).toFixed(0)+'k':v.toFixed(0), pad.left-3,y+3);
  });

  cats.forEach((c,i) => {
    const bh = (c.val/maxVal)*plotH;
    const x = pad.left + i*(plotW/cats.length) + (plotW/cats.length - bw)/2;
    const y = pad.top + plotH - bh;
    ctx.fillStyle=c.col;
    if (ctx.roundRect) ctx.roundRect(x,y,bw,bh,[3,3,0,0]);
    else ctx.rect(x,y,bw,bh);
    ctx.fill();
    ctx.fillStyle='#1e293b'; ctx.font='bold 8px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText(formatT(c.val), x+bw/2, y-4);
    ctx.fillStyle=c.col; ctx.font='9px Inter,sans-serif';
    ctx.fillText(c.name, x+bw/2, H-pad.bottom+14);
  });
}

/* ── RESET ─────────────────────────────────────────────────── */
function resetAll() {
  if (!confirm('Reset all data? This cannot be undone.')) return;
  Object.keys(STATE).forEach(id => {
    STATE[id] = { activity:'', ef:'', tco2e:null, notes:'', owner:'', dataSource:'' };
    ['act','ef','notes','ds','owner','actLB'].forEach(f => {
      const el = document.getElementById(f+'-'+id);
      if (el) el.value = '';
    });
    updateResultCell(id);
  });
  ['orgName','orgIndustry','orgPeriod','orgBaseYear','orgLead','orgRevenue','orgEmployees','orgProduction','orgFramework'].forEach(id => {
    const el = document.getElementById(id); if (el) el.value='';
  });
  const bd = document.getElementById('orgBoundary'); if (bd) bd.selectedIndex=0;
  const as = document.getElementById('orgAssurance'); if (as) as.selectedIndex=0;
  document.getElementById('orgDate').value = new Date().toISOString().slice(0,10);
  refreshDashboard();
}

/* ── EXPORT JSON ─────────────────────────────────────────── */
function exportJSON() {
  const payload = {
    meta: { tool:'ESG Emissions Inventory B.3', version:'2.0', exported:new Date().toISOString(),
      org: {
        name:      document.getElementById('orgName').value,
        industry:  document.getElementById('orgIndustry').value,
        period:    document.getElementById('orgPeriod').value,
        baseYear:  document.getElementById('orgBaseYear').value,
        boundary:  document.getElementById('orgBoundary').value,
        framework: document.getElementById('orgFramework').value,
        assurance: document.getElementById('orgAssurance').value,
        lead:      document.getElementById('orgLead').value,
        date:      document.getElementById('orgDate').value,
        revenue:   document.getElementById('orgRevenue').value,
        employees: document.getElementById('orgEmployees').value,
      }
    },
    data: {}
  };
  Object.keys(STATE).forEach(id => { payload.data[id] = {...STATE[id]}; });
  const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const org  = (document.getElementById('orgName').value||'ESG').replace(/\s+/g,'_');
  a.href = url;
  a.download = org + '_EmissionsInventory_B3_' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── EXPORT CSV ─────────────────────────────────────────── */
function exportCSV() {
  const org = document.getElementById('orgName').value || 'Organisation';
  const rows = [['Source ID','Source Name','Scope','Activity','Activity Unit','Emission Factor','EF Source','tCO2e','Notes','Data Source','Owner']];
  const allSrc = [
    ...B3_DATA.scope1.sources.map(s=>({...s,scope:'Scope 1'})),
    ...B3_DATA.scope2.sources.map(s=>({...s,scope:'Scope 2'})),
    ...B3_DATA.scope3Categories.flatMap(cat=>cat.sources.map(s=>({...s,scope:'Scope 3 Cat '+cat.cat})))
  ];
  allSrc.forEach(src => {
    const st = STATE[src.id];
    rows.push([src.id, src.name, src.scope,
      st.activity||'', src.unit, st.ef||'', src.efSource,
      st.tco2e!==null ? st.tco2e.toFixed(4) : '',
      st.notes||'', st.dataSource||'', st.owner||'']);
  });
  const csv = rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href=url; a.download=org.replace(/\s+/g,'_')+'_EmissionsInventory_B3_'+new Date().toISOString().slice(0,10)+'.csv';
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
        const map = {name:'orgName',industry:'orgIndustry',period:'orgPeriod',
          baseYear:'orgBaseYear',boundary:'orgBoundary',framework:'orgFramework',
          assurance:'orgAssurance',lead:'orgLead',date:'orgDate',revenue:'orgRevenue',employees:'orgEmployees'};
        Object.entries(map).forEach(([k,elId]) => {
          const el = document.getElementById(elId);
          if (el && o[k] !== undefined) el.value = o[k];
        });
      }
      Object.entries(p.data).forEach(([id, st]) => {
        if (!STATE[id]) return;
        STATE[id] = { ...STATE[id], ...st };
        const actEl  = document.getElementById('act-'   + id);
        const efEl   = document.getElementById('ef-'    + id);
        const notesEl= document.getElementById('notes-' + id);
        const dsEl   = document.getElementById('ds-'    + id);
        const ownEl  = document.getElementById('owner-' + id);
        if (actEl)   actEl.value   = st.activity   || '';
        if (efEl)    efEl.value    = st.ef          || '';
        if (notesEl) notesEl.value = st.notes       || '';
        if (dsEl)    dsEl.value    = st.dataSource  || '';
        if (ownEl)   ownEl.value   = st.owner       || '';
        updateResultCell(id);
      });
      refreshDashboard();
      alert('Imported successfully.');
    } catch(err) { alert('Import failed: ' + err.message); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

window.addEventListener('resize', () => drawCharts());
