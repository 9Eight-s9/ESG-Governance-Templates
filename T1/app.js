/**
 * ESG Materiality Assessment Matrix B.1 — app.js v3.0
 * Tabbed: Dashboard · Guide · Environmental · Social · Governance
 * Pure JS, no framework, no backend, no persistence
 */
'use strict';

const STATE = {};

document.addEventListener('DOMContentLoaded', function () {
  getAllTopics().forEach(t => { STATE[t.id] = { si:0, bs:0, notes:'', owner:'', review:'' }; });
  ESG_DATA.sections.forEach(s => buildPillarTab(s));
  document.getElementById('orgDate').value = new Date().toISOString().slice(0,10);
  refreshAll();
});

/* ── TAB SWITCHING ─────────────────────────────────────────── */
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tabId));
  if (tabId === 'dashboard') setTimeout(drawCharts, 80);
}

/* ── BUILD PILLAR TAB ──────────────────────────────────────── */
function buildPillarTab(section) {
  const stack = document.getElementById('topics-' + section.id);
  if (!stack) return;
  stack.innerHTML = '';
  section.topics.forEach(topic => stack.appendChild(buildTopicCard(topic, section)));
}

function buildTopicCard(topic) {
  const card = document.createElement('div');
  card.className = 'topic-card';
  card.id = 'card-' + topic.id;
  card.innerHTML = `
    <div class="topic-card-top">
      <div class="topic-id-cell">${topic.id}</div>
      <div class="topic-info-cell">
        <div class="topic-name">${topic.name}</div>
        <div class="topic-desc">${topic.desc}</div>
        <div class="topic-industry">🏭 ${topic.industries}</div>
        <button class="guidance-toggle-btn" onclick="toggleGuidance('${topic.id}')">+ Show framework guidance</button>
        <div class="topic-guidance-text" id="guidance-${topic.id}">📋 ${topic.guidance}</div>
      </div>
      <div class="topic-score-cell">
        <div class="combined-big c-none" id="cscore-${topic.id}">—</div>
        <div id="cchip-${topic.id}"><span class="cchip" style="color:#cbd5e1">Not scored</span></div>
      </div>
    </div>
    <div class="topic-sliders">
      <div class="slider-col">
        <div class="slider-head">
          <span class="slider-axis" style="color:#2563eb">Stakeholder Impact (SI)</span>
          <span class="slider-val sval-si" id="si-val-${topic.id}">—</span>
        </div>
        <input type="range" class="esg-slider sl-si" min="0" max="5" step="1" value="0"
          id="si-${topic.id}" oninput="onSlider('${topic.id}','si',this.value)"/>
        <div class="slider-ticks"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
      </div>
      <div class="slider-col">
        <div class="slider-head">
          <span class="slider-axis" style="color:#d97706">Business Significance (BS)</span>
          <span class="slider-val sval-bs" id="bs-val-${topic.id}">—</span>
        </div>
        <input type="range" class="esg-slider sl-bs" min="0" max="5" step="1" value="0"
          id="bs-${topic.id}" oninput="onSlider('${topic.id}','bs',this.value)"/>
        <div class="slider-ticks"><span>0</span><span>1</span><span>2</span><span>3</span><span>4</span><span>5</span></div>
      </div>
      <div class="slider-col notes-meta-col">
        <textarea class="notes-ta" placeholder="Notes / rationale / stakeholder source…"
          id="notes-${topic.id}" oninput="STATE['${topic.id}'].notes=this.value"></textarea>
        <input type="text" class="meta-inp" placeholder="Owner"
          id="owner-${topic.id}" oninput="STATE['${topic.id}'].owner=this.value"/>
        <input type="date" class="meta-inp"
          id="review-${topic.id}" oninput="STATE['${topic.id}'].review=this.value"/>
      </div>
    </div>`;
  return card;
}

/* ── SLIDER HANDLER ────────────────────────────────────────── */
function onSlider(topicId, axis, value) {
  value = parseInt(value, 10);
  STATE[topicId][axis] = value;
  const valEl = document.getElementById(axis + '-val-' + topicId);
  if (valEl) valEl.textContent = value === 0 ? '—' : value;
  updateTopicCard(topicId);
  updatePillarStats(topicId[0]);
  updateProgress();
  updateDashboard();
}

/* ── SCORE LOGIC ───────────────────────────────────────────── */
function calcCombined(si, bs) {
  if (si === 0 && bs === 0) return null;
  const esi = si === 0 ? 1 : si;
  const ebs = bs === 0 ? 1 : bs;
  return parseFloat(((esi * 0.55) + (ebs * 0.45)).toFixed(2));
}

function getQuad(score) {
  if (score === null) return 'none';
  if (score >= 3.5)   return 'high';
  if (score >= 2.0)   return 'med';
  return 'low';
}

function updateTopicCard(topicId) {
  const s = STATE[topicId];
  const score = calcCombined(s.si, s.bs);
  const quad  = getQuad(score);
  const scoreEl = document.getElementById('cscore-' + topicId);
  const chipEl  = document.getElementById('cchip-'  + topicId);
  const card    = document.getElementById('card-'   + topicId);
  if (!scoreEl) return;
  scoreEl.className = 'combined-big c-' + quad;
  scoreEl.textContent = score === null ? '—' : score.toFixed(2);
  const chipMap = {
    high: '<span class="cchip chip-high">🔴 HIGH</span>',
    med:  '<span class="cchip chip-med">🟡 MEDIUM</span>',
    low:  '<span class="cchip chip-low">⚪ LOW</span>',
    none: '<span class="cchip" style="color:#cbd5e1;font-size:0.65rem">Not scored</span>'
  };
  chipEl.innerHTML = chipMap[quad];
  if (card) card.className = 'topic-card' + (score !== null ? ' scored-' + quad : '');
}

/* ── PILLAR STATS ──────────────────────────────────────────── */
function updatePillarStats(sectionId) {
  const section = ESG_DATA.sections.find(s => s.id === sectionId);
  if (!section) return;
  let scored = 0, high = 0, med = 0;
  section.topics.forEach(t => {
    const sc = calcCombined(STATE[t.id].si, STATE[t.id].bs);
    if (sc !== null) { scored++; if (sc >= 3.5) high++; else if (sc >= 2.0) med++; }
  });
  const g = id => document.getElementById(id);
  if (g('ph-scored-'+sectionId)) g('ph-scored-'+sectionId).textContent = scored;
  if (g('ph-high-'+sectionId))   g('ph-high-'+sectionId).textContent   = high;
  if (g('ph-med-'+sectionId))    g('ph-med-'+sectionId).textContent    = med;
  const badge = g('badge-' + sectionId);
  if (badge) badge.textContent = scored > 0 ? `${scored}/${section.topics.length}` : section.topics.length;
}

/* ── PROGRESS ──────────────────────────────────────────────── */
function updateProgress() {
  const all  = getAllTopics();
  const done = all.filter(t => STATE[t.id].si > 0 || STATE[t.id].bs > 0);
  const pct  = Math.round((done.length / all.length) * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = `${done.length} / ${all.length} topics scored`;
  document.getElementById('progressPct').textContent   = pct + '%';
}

/* ── DASHBOARD ─────────────────────────────────────────────── */
function updateDashboard() {
  const all    = getAllScoredTopics();
  const scored = all.filter(t => t.score !== null);
  const high   = scored.filter(t => t.quad === 'high');
  const med    = scored.filter(t => t.quad === 'med');
  const low    = scored.filter(t => t.quad === 'low');
  const doneN  = getAllTopics().filter(t => STATE[t.id].si > 0 || STATE[t.id].bs > 0).length;
  const total  = scored.reduce((a, t) => a + t.score, 0);
  const idx    = scored.length > 0 ? Math.round((total / (scored.length * 5)) * 100) : null;

  document.getElementById('kpiIndex').textContent    = idx !== null ? idx + '%' : '—';
  document.getElementById('kpiHigh').textContent     = high.length;
  document.getElementById('kpiMed').textContent      = med.length;
  document.getElementById('kpiLow').textContent      = low.length;
  document.getElementById('kpiScored').innerHTML     = `${doneN}<span style="font-size:1.1rem;font-weight:500">/35</span>`;
  document.getElementById('kpiScoredSub').textContent = Math.round((doneN/35)*100) + '% complete';
  document.getElementById('kpiIndexSub').textContent  = idx !== null ? interpretIndex(idx) : 'Score topics to calculate';

  renderRankedTable(scored);
  updateInterpretation(idx, high.length, med.length, doneN);
  drawCharts();
}

function interpretIndex(i) {
  if (i >= 70) return 'Very high ESG intensity';
  if (i >= 50) return 'Moderate-high intensity';
  if (i >= 35) return 'Moderate intensity';
  return 'Lower — verify scoring rigour';
}

/* ── RANKED TABLE ──────────────────────────────────────────── */
function renderRankedTable(scored) {
  const wrap = document.getElementById('rankedTable');
  if (!wrap) return;
  if (scored.length === 0) {
    wrap.innerHTML = '<div class="empty-state">No topics scored yet — go to Environmental, Social, or Governance tabs to begin scoring.</div>';
    return;
  }
  const sorted = [...scored].sort((a,b) => b.score - a.score);
  let html = `<table class="ranked-table"><thead><tr>
    <th class="rt-rank">#</th><th>ID</th><th>ESG Topic</th><th>Pillar</th>
    <th style="text-align:center">SI</th><th style="text-align:center">BS</th>
    <th style="text-align:center">Score</th><th>Priority</th><th>Progress</th>
    </tr></thead><tbody>`;
  sorted.forEach((t, i) => {
    const s   = STATE[t.id];
    const pct = Math.round((t.score / 5) * 100);
    const p   = t.id[0];
    html += `<tr>
      <td class="rt-rank">${i+1}</td>
      <td class="rt-id">${t.id}</td>
      <td class="rt-name">${t.name}</td>
      <td><span class="rt-pillar pillar-tag-${p}">${p}</span></td>
      <td style="text-align:center;color:#2563eb;font-weight:700">${s.si||'—'}</td>
      <td style="text-align:center;color:#d97706;font-weight:700">${s.bs||'—'}</td>
      <td class="rt-score score-${t.quad}">${t.score.toFixed(2)}</td>
      <td><span class="rt-chip chip-${t.quad}">${t.quad.toUpperCase()}</span></td>
      <td><div class="rt-bar-wrap"><div class="rt-bar-fill bar-${t.quad}" style="width:${pct}%"></div></div></td>
      </tr>`;
  });
  wrap.innerHTML = html + '</tbody></table>';
}

/* ── INTERPRETATION ────────────────────────────────────────── */
function updateInterpretation(idx, highN, medN, doneN) {
  const body = document.getElementById('interpActionBody');
  if (!body) return;
  if (doneN === 0) { body.textContent = 'Score topics to generate recommendations.'; return; }
  const lines = [];
  if (highN > 0) lines.push(`📌 ${highN} HIGH priority topic${highN>1?'s':''} require board-level ownership, binding targets, and assured disclosure.`);
  if (medN  > 0) lines.push(`📋 ${medN} MEDIUM topic${medN>1?'s':''} require function-level ownership and semi-annual monitoring.`);
  if (doneN < 35) lines.push(`⏳ ${35-doneN} topic${35-doneN>1?'s':''} not yet scored — complete all 35 for a defensible assessment.`);
  if (idx !== null && idx < 40 && doneN === 35) lines.push('⚠️ Materiality Index below 40 with full scoring — revisit with stronger stakeholder engagement evidence.');
  body.innerHTML = lines.join('<br/><br/>');
}

/* ── CHARTS ────────────────────────────────────────────────── */
function drawCharts() { drawPillarChart(); drawMatrixChart(); }

function drawPillarChart() {
  const canvas = document.getElementById('chartPillar');
  if (!canvas || !canvas.parentElement) return;
  const W = canvas.parentElement.offsetWidth || 280, H = 220;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0, 0, W, H);

  const pad = {top:28, right:16, bottom:52, left:38};
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;
  const pillars = [
    {id:'E', label:'Environmental', color:'#15803d'},
    {id:'S', label:'Social',        color:'#b45309'},
    {id:'G', label:'Governance',    color:'#6d28d9'}
  ];
  const maxTopics = 13;
  const groupW = plotW / 3;
  const barW   = Math.min(22, groupW / 4);

  // Grid lines
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  [0,3,6,9,12].forEach(v => {
    const y = pad.top + plotH - (v / maxTopics) * plotH;
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(W-pad.right, y); ctx.stroke();
    ctx.fillStyle='#94a3b8'; ctx.font='9px Inter,sans-serif'; ctx.textAlign='right';
    ctx.fillText(v, pad.left-4, y+3);
  });

  const colHigh = '#16a34a', colMed = '#d97706', colLow = '#94a3b8';

  pillars.forEach((p, gi) => {
    const section = ESG_DATA.sections.find(s => s.id === p.id);
    let high=0, med=0, low=0;
    section.topics.forEach(t => {
      const sc = calcCombined(STATE[t.id].si, STATE[t.id].bs);
      if (sc === null) return;
      if (sc >= 3.5) high++; else if (sc >= 2.0) med++; else low++;
    });

    const gx = pad.left + gi * groupW + groupW / 2;

    const bars = [{v:high,c:colHigh,o:-barW-3},{v:med,c:colMed,o:0},{v:low,c:colLow,o:barW+3}];
    bars.forEach(b => {
      if (b.v === 0) return;
      const bh = (b.v / maxTopics) * plotH;
      const x  = gx + b.o - barW/2;
      const y  = pad.top + plotH - bh;
      ctx.fillStyle = b.c;
      ctx.beginPath();
      if (ctx.roundRect) ctx.roundRect(x, y, barW, bh, [3,3,0,0]);
      else ctx.rect(x, y, barW, bh);
      ctx.fill();
      ctx.fillStyle='#1e293b'; ctx.font='bold 9px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText(b.v, x + barW/2, y - 4);
    });

    // Pillar label
    ctx.fillStyle = p.color; ctx.font='bold 10px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText(p.label, gx, H - pad.bottom + 16);
  });

  // Legend
  const leg = document.getElementById('legendPillar');
  if (leg) leg.innerHTML =
    `<div class="legend-item"><span class="leg-dot" style="background:#16a34a"></span>High Priority</div>
     <div class="legend-item"><span class="leg-dot" style="background:#d97706"></span>Medium</div>
     <div class="legend-item"><span class="leg-dot" style="background:#94a3b8"></span>Low / Monitor</div>`;
}

function drawMatrixChart() {
  const canvas = document.getElementById('chartMatrix');
  if (!canvas || !canvas.parentElement) return;
  const W = canvas.parentElement.offsetWidth || 500, H = 260;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const pad = {top:30, right:24, bottom:48, left:48};
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  ctx.fillStyle = '#fff'; ctx.fillRect(0,0,W,H);

  // Quadrant shading
  const thX = pad.left + plotW * ((3.5-1)/4);
  const thY = pad.top  + plotH * (1-(3.5-1)/4);
  ctx.fillStyle='rgba(220,252,231,0.45)'; ctx.fillRect(thX,pad.top,W-pad.right-thX,thY-pad.top);
  ctx.fillStyle='rgba(254,249,195,0.4)';  ctx.fillRect(pad.left,thY,W-pad.right-pad.left,H-pad.bottom-thY);
  ctx.fillStyle='rgba(239,246,255,0.4)';  ctx.fillRect(pad.left,pad.top,thX-pad.left,thY-pad.top);

  // Grid
  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  for (let i=1;i<=5;i++) {
    const gx = pad.left + plotW*((i-1)/4);
    const gy = pad.top  + plotH*(1-(i-1)/4);
    ctx.beginPath(); ctx.moveTo(gx,pad.top);    ctx.lineTo(gx,H-pad.bottom); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad.left,gy);   ctx.lineTo(W-pad.right,gy);  ctx.stroke();
    ctx.fillStyle='#94a3b8'; ctx.font='9px Inter,sans-serif';
    ctx.textAlign='center'; ctx.fillText(i, gx, H-pad.bottom+13);
    ctx.textAlign='right';  ctx.fillText(i, pad.left-5, gy+4);
  }

  // Threshold lines
  ctx.strokeStyle='#818cf8'; ctx.lineWidth=1.5; ctx.setLineDash([5,4]);
  ctx.beginPath(); ctx.moveTo(thX,pad.top);   ctx.lineTo(thX,H-pad.bottom); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad.left,thY);  ctx.lineTo(W-pad.right,thY);  ctx.stroke();
  ctx.setLineDash([]);

  // Axis labels
  ctx.fillStyle='#64748b'; ctx.font='10px Inter,sans-serif'; ctx.textAlign='center';
  ctx.fillText('Stakeholder Impact (SI) →', pad.left+plotW/2, H-6);
  ctx.save(); ctx.translate(13,pad.top+plotH/2); ctx.rotate(-Math.PI/2);
  ctx.fillText('Business Significance (BS) ↑',0,0); ctx.restore();

  // HIGH label
  ctx.fillStyle='rgba(21,128,61,0.55)'; ctx.font='bold 9px Inter,sans-serif';
  ctx.textAlign='left'; ctx.fillText('HIGH PRIORITY', thX+6, pad.top+14);

  // Dots
  const colMap = {high:'#16a34a', med:'#d97706', low:'#94a3b8'};
  getAllScoredTopics().forEach(t => {
    const s = STATE[t.id];
    if (s.si===0 && s.bs===0) return;
    const si = s.si||1, bs = s.bs||1;
    const cx = pad.left + plotW*((si-1)/4);
    const cy = pad.top  + plotH*(1-(bs-1)/4);
    ctx.beginPath(); ctx.arc(cx,cy,13,0,Math.PI*2);
    ctx.fillStyle = colMap[t.quad]||'#94a3b8';
    ctx.globalAlpha=0.88; ctx.fill(); ctx.globalAlpha=1;
    ctx.strokeStyle='#fff'; ctx.lineWidth=2; ctx.stroke();
    ctx.fillStyle='#fff'; ctx.font='bold 7px Inter,sans-serif';
    ctx.textAlign='center'; ctx.fillText(t.id,cx,cy+3);
  });
}

/* ── HELPERS ───────────────────────────────────────────────── */
function getAllTopics() {
  return ESG_DATA.sections.flatMap(s => s.topics);
}
function getAllScoredTopics() {
  return getAllTopics().map(t => {
    const sc = STATE[t.id] ? calcCombined(STATE[t.id].si, STATE[t.id].bs) : null;
    return {id:t.id, name:t.name, score:sc, quad:getQuad(sc)};
  });
}
function refreshAll() {
  getAllTopics().forEach(t => updateTopicCard(t.id));
  ESG_DATA.sections.forEach(s => updatePillarStats(s.id));
  updateProgress();
  updateDashboard();
}
function toggleGuidance(topicId) {
  const el  = document.getElementById('guidance-' + topicId);
  const btn = el.previousElementSibling;
  el.classList.toggle('show');
  btn.textContent = el.classList.contains('show') ? '− Hide guidance' : '+ Show framework guidance';
}

/* ── RESET ─────────────────────────────────────────────────── */
function resetAll() {
  if (!confirm('Reset all scores? This cannot be undone.')) return;
  getAllTopics().forEach(t => {
    STATE[t.id] = {si:0,bs:0,notes:'',owner:'',review:''};
    ['si','bs'].forEach(ax => {
      const sl = document.getElementById(ax+'-'+t.id);
      const vl = document.getElementById(ax+'-val-'+t.id);
      if (sl) sl.value = 0;
      if (vl) vl.textContent = '—';
    });
    ['notes','owner','review'].forEach(f => {
      const el = document.getElementById(f+'-'+t.id);
      if (el) el.value = '';
    });
  });
  ['orgName','orgIndustry','orgPeriod','orgLead','orgFramework'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  document.getElementById('orgDate').value = new Date().toISOString().slice(0,10);
  refreshAll();
}

/* ── EXPORT ────────────────────────────────────────────────── */
function exportJSON() {
  const payload = {
    meta: { tool:'ESG Materiality Matrix B.1', version:'3.0', exported:new Date().toISOString(),
      org: {
        name:     document.getElementById('orgName').value,
        industry: document.getElementById('orgIndustry').value,
        period:   document.getElementById('orgPeriod').value,
        lead:     document.getElementById('orgLead').value,
        framework:document.getElementById('orgFramework').value,
        date:     document.getElementById('orgDate').value
      }
    },
    scores: {}
  };
  Object.keys(STATE).forEach(id => { payload.scores[id] = {...STATE[id]}; });
  const blob = new Blob([JSON.stringify(payload,null,2)], {type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  const org  = (document.getElementById('orgName').value||'ESG').replace(/\s+/g,'_');
  a.href = url;
  a.download = org + '_MaterialityB1_' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── IMPORT ────────────────────────────────────────────────── */
function importJSON() { document.getElementById('importFileInput').click(); }
function handleImport(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const p = JSON.parse(e.target.result);
      if (!p.scores) throw new Error('Invalid file');
      if (p.meta?.org) {
        Object.entries(p.meta.org).forEach(([f,v]) => {
          const el = document.getElementById('org'+f.charAt(0).toUpperCase()+f.slice(1));
          if (el && v) el.value = v;
        });
      }
      Object.entries(p.scores).forEach(([id,s]) => {
        if (!STATE[id]) return;
        STATE[id] = { si:parseInt(s.si)||0, bs:parseInt(s.bs)||0,
          notes:s.notes||'', owner:s.owner||'', review:s.review||'' };
        ['si','bs'].forEach(ax => {
          const sl = document.getElementById(ax+'-'+id);
          const vl = document.getElementById(ax+'-val-'+id);
          if (sl) sl.value = STATE[id][ax];
          if (vl) vl.textContent = STATE[id][ax]===0 ? '—' : STATE[id][ax];
        });
        ['notes','owner','review'].forEach(f => {
          const el = document.getElementById(f+'-'+id);
          if (el) el.value = STATE[id][f];
        });
      });
      refreshAll();
      alert('Imported successfully.');
    } catch(err) { alert('Import failed: ' + err.message); }
  };
  reader.readAsText(file);
  event.target.value = '';
}

window.addEventListener('resize', drawCharts);
