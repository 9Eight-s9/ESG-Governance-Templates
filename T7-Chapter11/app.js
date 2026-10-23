'use strict';
/* ── STATE ────────────────────────────────────────────────── */
const STATE = {
  s1: {}, s2: {}, s3: {},
  matTopics: {},
  customTopics: [],
  completionFlags: { charter:false, materiality:false, scope1:false, scope2:false, scope3:false, data:false }
};

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  buildFrameworkGrid();
  buildMatTable();
  buildScope1();
  buildScope2();
  buildScope3();
  buildDocChecklist();
  buildAssuranceChecklist();
  buildPlatformGrid();
  CH11.matTopics.forEach(t => { STATE.matTopics[t.id] = { fin: t.defaultFin, imp: t.defaultImp }; });
  drawMatMatrix();
  updateDashboard();
});

/* ── TAB SWITCH ───────────────────────────────────────────── */
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === id));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + id));
  if (id === 'dashboard') setTimeout(updateDashboard, 80);
  if (id === 'materiality') setTimeout(drawMatMatrix, 80);
}

/* ── FRAMEWORK GRID ───────────────────────────────────────── */
function buildFrameworkGrid() {
  const grid = document.getElementById('frameworkGrid');
  if (!grid) return;
  grid.innerHTML = CH11.frameworks.map(f => `
    <label class="fw-item${f.mandatory ? ' selected' : ''}" id="fw-${f.id}">
      <input type="checkbox" ${f.mandatory ? 'checked' : ''} id="fwck-${f.id}" onchange="toggleFramework('${f.id}')"/>
      <div>
        <div class="fw-label">${f.label}${f.mandatory ? ' <span style="color:#dc2626;font-size:0.65rem">●</span>' : ''}</div>
        <div class="fw-desc">${f.desc}</div>
      </div>
    </label>`).join('');
}
function toggleFramework(id) {
  const el = document.getElementById('fw-' + id);
  const ck = document.getElementById('fwck-' + id);
  if (el) el.classList.toggle('selected', ck.checked);
  updateProgress();
}

/* ── MATERIALITY TABLE ────────────────────────────────────── */
function buildMatTable() {
  const wrap = document.getElementById('matTableWrap');
  if (!wrap) return;
  const allTopics = [...CH11.matTopics];
  let html = `<table class="mat-table"><thead><tr>
    <th>Pillar</th><th>ESG Topic</th>
    <th>Financial Significance (1–5)</th><th>Stakeholder/Impact (1–5)</th>
    <th>Score</th><th>Priority</th><th>Include in Register</th>
  </tr></thead><tbody>`;

  allTopics.forEach(t => {
    const fin = t.defaultFin, imp = t.defaultImp;
    const score = fin + imp;
    const { label, cls } = matRating(fin, imp);
    html += `<tr>
      <td><span class="pillar-pill pill-${t.pillar}">${t.pillar}</span></td>
      <td style="font-weight:600;color:#1e293b">${t.topic}</td>
      <td><input type="number" class="score-input" min="1" max="5" value="${fin}"
        id="mat-fin-${t.id}" oninput="onMatScore('${t.id}')"/></td>
      <td><input type="number" class="score-input" min="1" max="5" value="${imp}"
        id="mat-imp-${t.id}" oninput="onMatScore('${t.id}')"/></td>
      <td><span class="mat-score-badge" id="mat-score-${t.id}" style="background:${cls}22;color:${cls}">${score}</span></td>
      <td><span id="mat-label-${t.id}" style="font-size:0.72rem;font-weight:700;color:${cls}">${label}</span></td>
      <td style="text-align:center"><input type="checkbox" ${score >= 6 ? 'checked' : ''} id="mat-include-${t.id}" style="accent-color:#1d4ed8"/></td>
    </tr>`;
  });
  wrap.innerHTML = html + '</tbody></table>';
}

function matRating(fin, imp) {
  if (fin >= 4 && imp >= 4) return { label:'🔴 Priority Material', cls:'#dc2626' };
  if (fin >= 4 || imp >= 4)  return { label:'🟠 Material', cls:'#d97706' };
  if (fin >= 3 || imp >= 3)  return { label:'🟡 Monitor', cls:'#ca8a04' };
  return { label:'⚪ Low Priority', cls:'#94a3b8' };
}

function onMatScore(topicId) {
  const fin = parseInt(document.getElementById('mat-fin-' + topicId)?.value) || 1;
  const imp = parseInt(document.getElementById('mat-imp-' + topicId)?.value) || 1;
  const finC = Math.max(1, Math.min(5, fin));
  const impC = Math.max(1, Math.min(5, imp));
  STATE.matTopics[topicId] = { fin: finC, imp: impC };
  const score = finC + impC;
  const { label, cls } = matRating(finC, impC);
  const badge = document.getElementById('mat-score-' + topicId);
  const lbl   = document.getElementById('mat-label-' + topicId);
  const ck    = document.getElementById('mat-include-' + topicId);
  if (badge) { badge.textContent = score; badge.style.background = cls + '22'; badge.style.color = cls; }
  if (lbl)   { lbl.textContent = label; lbl.style.color = cls; }
  if (ck && score >= 6) ck.checked = true;
  drawMatMatrix();
  updateProgress();
}

function addCustomTopic() {
  const name = prompt('Enter custom topic name:');
  if (!name) return;
  const id = 'custom_' + Date.now();
  STATE.matTopics[id] = { fin: 3, imp: 3 };
  CH11.matTopics.push({ id, pillar: 'E', topic: name, defaultFin: 3, defaultImp: 3 });
  buildMatTable();
}

/* ── MATERIALITY MATRIX ───────────────────────────────────── */
function drawMatMatrix() {
  const canvas = document.getElementById('matCanvas');
  if (!canvas) return;
  const W = 480, H = 400;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  const pad = { top: 30, right: 20, bottom: 50, left: 55 };
  const plotW = W - pad.left - pad.right;
  const plotH = H - pad.top - pad.bottom;

  // Background quadrants
  const drawQuad = (x, y, w, h, color) => { ctx.fillStyle = color; ctx.fillRect(x, y, w, h); };
  const mx = pad.left + plotW * 0.6, my = pad.top + plotH * 0.4;
  drawQuad(pad.left, pad.top, plotW, plotH, '#f8fafc');
  drawQuad(mx, pad.top, plotW - (mx - pad.left), my - pad.top, '#fff7ed');
  drawQuad(mx, my, plotW - (mx - pad.left), plotH - (my - pad.top), '#fef2f2');
  drawQuad(pad.left, pad.top, mx - pad.left, my - pad.top, '#f0fdf4');

  // Grid lines
  ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1;
  [1,2,3,4,5].forEach(v => {
    const x = pad.left + ((v-1)/4) * plotW;
    const y = pad.top + ((5-v)/4) * plotH;
    ctx.beginPath(); ctx.moveTo(x, pad.top); ctx.lineTo(x, pad.top + plotH); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(pad.left, y); ctx.lineTo(pad.left + plotW, y); ctx.stroke();
  });

  // Axes
  ctx.strokeStyle = '#94a3b8'; ctx.lineWidth = 1.5;
  ctx.beginPath(); ctx.moveTo(pad.left, pad.top); ctx.lineTo(pad.left, pad.top + plotH); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(pad.left, pad.top + plotH); ctx.lineTo(pad.left + plotW, pad.top + plotH); ctx.stroke();

  // Labels
  ctx.fillStyle = '#64748b'; ctx.font = '9px Inter,sans-serif'; ctx.textAlign = 'center';
  [1,2,3,4,5].forEach(v => {
    ctx.fillText(v, pad.left + ((v-1)/4) * plotW, pad.top + plotH + 16);
    ctx.fillText(v, pad.left - 16, pad.top + ((5-v)/4) * plotH + 3);
  });
  ctx.fillText('Financial Significance →', pad.left + plotW / 2, H - 8);
  ctx.save(); ctx.translate(12, pad.top + plotH / 2); ctx.rotate(-Math.PI / 2);
  ctx.fillText('← Stakeholder / Impact', 0, 0); ctx.restore();

  // Quadrant labels
  ctx.font = 'bold 9px Inter,sans-serif';
  ctx.fillStyle = '#16a34a'; ctx.textAlign = 'left';
  ctx.fillText('MONITOR', pad.left + 5, pad.top + 14);
  ctx.fillStyle = '#d97706';
  ctx.fillText('MATERIAL', mx + 5, pad.top + 14);
  ctx.fillStyle = '#dc2626';
  ctx.fillText('PRIORITY MATERIAL', mx + 5, my + 16);

  // Plot topics
  const allT = [...CH11.matTopics];
  const pillarColors = { E: '#16a34a', S: '#1d4ed8', G: '#d97706' };
  allT.forEach(t => {
    const st = STATE.matTopics[t.id];
    if (!st) return;
    const x = pad.left + ((st.fin - 1) / 4) * plotW;
    const y = pad.top + ((5 - st.imp) / 4) * plotH;
    const { cls } = matRating(st.fin, st.imp);
    ctx.beginPath();
    ctx.arc(x, y, 6, 0, Math.PI * 2);
    ctx.fillStyle = cls; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
  });

  // Priority list
  const prList = document.getElementById('matPriorityList');
  if (prList) {
    const priority = allT.filter(t => { const st = STATE.matTopics[t.id]; return st && st.fin >= 4 && st.imp >= 4; });
    const material = allT.filter(t => { const st = STATE.matTopics[t.id]; return st && (st.fin >= 4 || st.imp >= 4) && !(st.fin >= 4 && st.imp >= 4); });
    if (priority.length === 0 && material.length === 0) {
      prList.innerHTML = '<div style="font-size:0.8rem;color:#94a3b8;padding:12px">Score topics in the table above to generate the priority list.</div>';
    } else {
      let html = '<div style="font-size:0.78rem;font-weight:700;color:#1e293b;margin-bottom:8px">Priority Material Topics (both axes ≥4):</div>';
      priority.forEach(t => {
        const st = STATE.matTopics[t.id];
        html += `<div class="mpl-item"><span class="pillar-pill pill-${t.pillar}">${t.pillar}</span><span style="font-weight:600">${t.topic}</span><span style="margin-left:auto;font-size:0.7rem;background:#fee2e2;color:#dc2626;padding:2px 8px;border-radius:20px">Fin:${st.fin} Imp:${st.imp}</span></div>`;
      });
      if (material.length > 0) {
        html += '<div style="font-size:0.78rem;font-weight:700;color:#1e293b;margin:12px 0 8px">Material Topics (one axis ≥4):</div>';
        material.forEach(t => {
          const st = STATE.matTopics[t.id];
          html += `<div class="mpl-item"><span class="pillar-pill pill-${t.pillar}">${t.pillar}</span><span>${t.topic}</span><span style="margin-left:auto;font-size:0.7rem;background:#fff7ed;color:#d97706;padding:2px 8px;border-radius:20px">Fin:${st.fin} Imp:${st.imp}</span></div>`;
        });
      }
      prList.innerHTML = html;
    }
  }
}

/* ── SCOPE 1 ──────────────────────────────────────────────── */
function buildScope1() {
  const stack = document.getElementById('s1-stack');
  if (!stack) return;
  CH11.scope1Sources.forEach(src => {
    STATE.s1[src.id] = { activity: 0, ef: 0, tco2e: null, dq: '', notes: '' };
    const card = document.createElement('div');
    card.className = 'src-card'; card.id = 'src-' + src.id;
    card.innerHTML = `
      <div class="src-top">
        <div class="src-id">${src.id}</div>
        <div class="src-info">
          <div class="src-name">${src.name}</div>
          <div class="src-desc">${src.desc}</div>
          <div class="src-ef">EF: ${src.ef} · Unit: ${src.unit}</div>
          <button class="guid-btn" onclick="toggleGuid('${src.id}')">+ Data collection guidance</button>
          <div class="guid-text" id="guid-${src.id}">📋 ${src.hint}</div>
        </div>
        <div class="src-result">
          <div class="res-val" id="res-${src.id}">—</div>
          <div class="res-unit">tCO₂e</div>
        </div>
      </div>
      <div class="src-inputs">
        <div class="inp-col">
          <div class="inp-label">Activity (${src.unit})</div>
          <input type="number" class="inp-field" min="0" step="any" placeholder="e.g. 45000"
            id="act-${src.id}" oninput="onS1('${src.id}')"/>
          <div class="inp-hint">Enter measured or estimated activity quantity</div>
        </div>
        <div class="inp-col">
          <div class="inp-label">Emission Factor (kgCO₂e/unit)</div>
          <input type="number" class="inp-field" min="0" step="any" placeholder="e.g. 0.18254"
            id="ef-${src.id}" oninput="onS1('${src.id}')"/>
          <div class="inp-hint">Select EF from DEFRA/EPA/BEE for your geography</div>
        </div>
        <div class="inp-col">
          <div class="inp-label">Data Quality</div>
          <select class="inp-field" id="dq-${src.id}" onchange="STATE.s1['${src.id}'].dq=this.value;updateProgress()">
            <option value="">Select…</option>
            <option value="Measured">✅ Measured (metered/invoiced)</option>
            <option value="Calculated">📐 Calculated (engineering estimate)</option>
            <option value="Estimated">📊 Estimated (spend-based proxy)</option>
            <option value="Not applicable">N/A — not present at this site</option>
          </select>
          <div class="inp-hint">Assurance providers require this flag for every data point</div>
        </div>
        <div class="inp-col">
          <div class="inp-label">Base Year</div>
          <input type="text" class="inp-field" placeholder="e.g. FY 2025-26"
            id="by-${src.id}" oninput="STATE.s1['${src.id}'].baseYear=this.value"/>
        </div>
        <div class="inp-col">
          <div class="inp-label">Notes / Source</div>
          <input type="text" class="inp-field" placeholder="e.g. Gas meter readings Jan–Dec 2025"
            id="notes-${src.id}" oninput="STATE.s1['${src.id}'].notes=this.value"/>
        </div>
      </div>`;
    stack.appendChild(card);
  });
}

function onS1(id) {
  const act = parseFloat(document.getElementById('act-' + id)?.value) || 0;
  const ef  = parseFloat(document.getElementById('ef-'  + id)?.value) || 0;
  const tco2 = act > 0 && ef > 0 ? (act * ef) / 1000 : null;
  STATE.s1[id].activity = act; STATE.s1[id].ef = ef; STATE.s1[id].tco2e = tco2;
  updateSrcResult(id, tco2);
  updateS1Total();
  updateProgress();
  updateDashboard();
}

/* ── SCOPE 2 ──────────────────────────────────────────────── */
function buildScope2() {
  const stack = document.getElementById('s2-stack');
  if (!stack) return;
  CH11.scope2Sources.forEach(src => {
    STATE.s2[src.id] = { actLB: 0, efLB: 0, actMB: 0, efMB: 0, tco2eLB: null, tco2eMB: null, dq: '', notes: '' };
    const card = document.createElement('div');
    card.className = 'src-card'; card.id = 'src-' + src.id;
    card.innerHTML = `
      <div class="src-top">
        <div class="src-id">${src.id}</div>
        <div class="src-info">
          <div class="src-name">${src.name}</div>
          <div class="src-desc">${src.desc}</div>
          <div class="src-ef">EF Ref: ${src.efLB || src.efMB} · Unit: ${src.unit}</div>
          <button class="guid-btn" onclick="toggleGuid('${src.id}')">+ Dual reporting guidance</button>
          <div class="guid-text" id="guid-${src.id}">📋 ${src.hint}</div>
        </div>
        <div class="src-result">
          <div class="res-val" id="res-${src.id}">—</div>
          <div class="res-unit">tCO₂e (LB)</div>
        </div>
      </div>
      <div class="src-inputs s2-inputs">
        <div class="inp-col">
          <div class="inp-label">Activity — kWh</div>
          <input type="number" class="inp-field" min="0" step="any" placeholder="e.g. 2400000"
            id="actLB-${src.id}" oninput="onS2('${src.id}')"/>
          <div class="inp-hint">kWh from invoices or smart meters</div>
        </div>
        <div class="inp-col">
          <div class="inp-label">Location-Based EF (kgCO₂e/kWh)</div>
          <input type="number" class="inp-field" min="0" step="any" placeholder="e.g. 0.20705"
            id="efLB-${src.id}" oninput="onS2('${src.id}')"/>
          <div class="inp-hint">National grid EF (DEFRA/IEA/CEA)</div>
        </div>
        <div class="inp-col">
          <div class="inp-label">Market-Based EF (kgCO₂e/kWh)</div>
          <input type="number" class="inp-field" min="0" step="any" placeholder="0 if 100% renewable verified"
            id="efMB-${src.id}" oninput="onS2('${src.id}')"/>
          <div class="inp-hint">0 = I-REC/GO covered · residual mix if no instrument</div>
        </div>
        <div class="inp-col">
          <div class="inp-label">Data Quality</div>
          <select class="inp-field" id="dq2-${src.id}" onchange="STATE.s2['${src.id}'].dq=this.value">
            <option value="">Select…</option>
            <option>✅ Measured</option>
            <option>📐 Calculated</option>
            <option>📊 Estimated</option>
            <option>N/A</option>
          </select>
        </div>
        <div class="inp-col">
          <div class="inp-label">Notes</div>
          <input type="text" class="inp-field" placeholder="e.g. Site-level metered data"
            id="notes2-${src.id}" oninput="STATE.s2['${src.id}'].notes=this.value"/>
        </div>
      </div>`;
    stack.appendChild(card);
  });
}

function onS2(id) {
  const actLB = parseFloat(document.getElementById('actLB-' + id)?.value) || 0;
  const efLB  = parseFloat(document.getElementById('efLB-'  + id)?.value) || 0;
  const efMB  = parseFloat(document.getElementById('efMB-'  + id)?.value) || 0;
  const tco2LB = actLB > 0 && efLB > 0 ? (actLB * efLB) / 1000 : null;
  const tco2MB = actLB > 0 ? (actLB * efMB) / 1000 : null;
  STATE.s2[id].actLB = actLB; STATE.s2[id].efLB = efLB; STATE.s2[id].efMB = efMB;
  STATE.s2[id].tco2eLB = tco2LB; STATE.s2[id].tco2eMB = tco2MB;
  updateSrcResult(id, tco2LB);
  updateS2Total();
  updateProgress();
  updateDashboard();
}

/* ── SCOPE 3 ──────────────────────────────────────────────── */
function buildScope3() {
  const wrap = document.getElementById('s3-categories');
  if (!wrap) return;
  CH11.scope3Categories.forEach(cat => {
    STATE.s3['cat' + cat.cat] = { materiality: '', screening: 0, primary: 0, method: '', dq: '', notes: '' };
    const block = document.createElement('div');
    block.className = 's3-cat';
    const priorityColors = { 'HIGH': '#dc2626', 'MEDIUM': '#d97706', 'LOW': '#94a3b8', 'CRITICAL — financial sector': '#7c3aed', 'HIGH — service firms': '#dc2626', 'HIGH — product manufacturers': '#dc2626', 'MEDIUM — real estate': '#d97706', 'HIGH — franchise models': '#dc2626', 'MEDIUM — tenants': '#d97706', 'LOW–MEDIUM': '#94a3b8', 'LOW': '#94a3b8' };
    const pc = priorityColors[cat.priority] || '#64748b';
    block.innerHTML = `
      <div class="s3-cat-hd" onclick="toggleS3Cat(${cat.cat})">
        <span class="s3-cat-num">Cat ${cat.cat}</span>
        <span class="s3-cat-name">${cat.name}</span>
        <span class="s3-cat-badge" style="background:${pc}22;color:${pc}">${cat.priority}</span>
        <span class="s3-cat-total-disp" id="s3cat-disp-${cat.cat}">—</span>
        <span class="s3-toggle open" id="s3tog-${cat.cat}">▲</span>
      </div>
      <div class="s3-cat-body" id="s3body-${cat.cat}">
        <div class="fg">
          <div class="inp-label">Materiality Assessment</div>
          <select class="inp-field" id="s3mat-${cat.cat}" onchange="onS3('${cat.cat}')">
            <option value="">Select…</option>
            <option value="Material">✅ Material — include in baseline</option>
            <option value="Likely material">⚠️ Likely material — screening needed</option>
            <option value="Not material">⬜ Not material — document rationale</option>
            <option value="Not assessed">❓ Not yet assessed</option>
          </select>
          <div class="inp-hint">ESRS E1 requires all 15 assessed (even if not material)</div>
        </div>
        <div class="fg">
          <div class="inp-label">Screening Estimate (tCO₂e)</div>
          <input type="number" class="inp-field" min="0" step="any" placeholder="Spend-based estimate"
            id="s3screen-${cat.cat}" oninput="onS3('${cat.cat}')"/>
          <div class="inp-hint">Method: ${cat.method}</div>
        </div>
        <div class="fg">
          <div class="inp-label">Primary Data (tCO₂e)</div>
          <input type="number" class="inp-field" min="0" step="any" placeholder="Calculated if material"
            id="s3primary-${cat.cat}" oninput="onS3('${cat.cat}')"/>
          <div class="inp-hint">EF source: ${cat.ef_source}</div>
        </div>
        <div class="fg">
          <div class="inp-label">Notes / Data Source</div>
          <input type="text" class="inp-field" placeholder="e.g. Supplier PCF data / spend-based"
            id="s3notes-${cat.cat}" oninput="STATE.s3['cat${cat.cat}'].notes=this.value"/>
          <div style="margin-top:6px">
            <select class="inp-field" id="s3dq-${cat.cat}" onchange="STATE.s3['cat${cat.cat}'].dq=this.value">
              <option value="">Data quality…</option>
              <option>✅ Supplier primary data</option>
              <option>📐 Activity-based (quantity × EF)</option>
              <option>📊 Spend-based (MRIO)</option>
              <option>📍 Estimation only</option>
            </select>
          </div>
        </div>
      </div>`;
    wrap.appendChild(block);
  });
}

function toggleS3Cat(cat) {
  const body = document.getElementById('s3body-' + cat);
  const tog  = document.getElementById('s3tog-'  + cat);
  body.classList.toggle('collapsed');
  tog.classList.toggle('open', !body.classList.contains('collapsed'));
  tog.textContent = body.classList.contains('collapsed') ? '▼' : '▲';
}

function onS3(cat) {
  const screen  = parseFloat(document.getElementById('s3screen-'  + cat)?.value) || 0;
  const primary = parseFloat(document.getElementById('s3primary-' + cat)?.value) || 0;
  const matVal  = document.getElementById('s3mat-' + cat)?.value || '';
  STATE.s3['cat' + cat].screening  = screen;
  STATE.s3['cat' + cat].primary    = primary;
  STATE.s3['cat' + cat].materiality = matVal;
  const best = primary > 0 ? primary : screen;
  const disp = document.getElementById('s3cat-disp-' + cat);
  if (disp) disp.textContent = best > 0 ? fmtT(best) + ' tCO₂e' : '—';
  updateS3Total();
  updateProgress();
  updateDashboard();
}

/* ── DOC CHECKLIST ────────────────────────────────────────── */
function buildDocChecklist() {
  const wrap = document.getElementById('docChecklist');
  if (!wrap) return;
  const items = [
    'Emission factor name, version, and source URL recorded per data point',
    'Activity data traceable to invoice/meter/system export',
    'Calculation methodology documented (formula and factors)',
    'Boundary approach (operational/financial control) documented',
  ];
  wrap.innerHTML = items.map((t, i) => `
    <div class="cl-item"><input type="checkbox" id="doc-${i}"/><span>${t}</span></div>`).join('');
}

/* ── PLATFORM GRID ────────────────────────────────────────── */
function buildPlatformGrid() {
  const grid = document.getElementById('platformGrid');
  if (!grid) return;
  grid.innerHTML = CH11.platforms.map(p => `
    <div class="plat-card">
      <div class="plat-name">${p.name}</div>
      <div class="plat-best">Best for: ${p.best}</div>
      <div class="plat-strength">${p.strength}</div>
    </div>`).join('');
}

/* ── ASSURANCE CHECKLIST ──────────────────────────────────── */
function buildAssuranceChecklist() {
  const wrap = document.getElementById('assuranceChecklist');
  if (!wrap) return;
  wrap.innerHTML = CH11.assuranceChecklist.map(item => `
    <div class="cl-item">
      <input type="checkbox" id="${item.id}" onchange="updateProgress()"/>
      ${item.must ? '<span class="cl-must">MUST</span>' : ''}
      <span>${item.text}</span>
    </div>`).join('');
}

/* ── TOTALS ───────────────────────────────────────────────── */
function updateS1Total() {
  let total = 0;
  CH11.scope1Sources.forEach(s => { if (STATE.s1[s.id].tco2e > 0) total += STATE.s1[s.id].tco2e; });
  const el = document.getElementById('s1-total'); if (el) el.textContent = fmtT(total);
  const bar = document.getElementById('s1-total-bar'); if (bar) bar.textContent = fmtT(total);
}
function updateS2Total() {
  let lb = 0, mb = 0;
  CH11.scope2Sources.forEach(s => { if (STATE.s2[s.id].tco2eLB > 0) lb += STATE.s2[s.id].tco2eLB; if (STATE.s2[s.id].tco2eMB > 0) mb += STATE.s2[s.id].tco2eMB; });
  const el = document.getElementById('s2-total'); if (el) el.textContent = fmtT(lb) + ' LB';
  const elLB = document.getElementById('s2-lb-total'); if (elLB) elLB.textContent = fmtT(lb);
  const elMB = document.getElementById('s2-mb-total'); if (elMB) elMB.textContent = fmtT(mb);
}
function updateS3Total() {
  let total = 0, cats = 0;
  CH11.scope3Categories.forEach(c => {
    const st = STATE.s3['cat' + c.cat];
    const best = st.primary > 0 ? st.primary : st.screening;
    if (best > 0) { total += best; cats++; }
  });
  const el = document.getElementById('s3-total'); if (el) el.textContent = fmtT(total);
  const bar = document.getElementById('s3-total-bar'); if (bar) bar.textContent = fmtT(total);
  const cc = document.getElementById('s3-catcount'); if (cc) cc.textContent = cats;
}

function fmtT(v) {
  if (!v || v <= 0) return '—';
  if (v >= 1000) return (v/1000).toFixed(1) + 'k';
  return v.toFixed(1);
}

function updateSrcResult(id, tco2) {
  const el = document.getElementById('res-' + id);
  const card = document.getElementById('src-' + id);
  if (!el) return;
  if (tco2 !== null && tco2 > 0) {
    el.textContent = fmtT(tco2); el.classList.add('has-val');
    if (card) card.classList.add('has-data');
  } else {
    el.textContent = '—'; el.classList.remove('has-val');
    if (card) card.classList.remove('has-data');
  }
}

/* ── PROGRESS ─────────────────────────────────────────────── */
function updateProgress() {
  const scores = [];
  // Charter
  const charterFields = ['ch-orgName','ch-boundary','ch-lead','ch-approvalDate'];
  scores.push(charterFields.filter(id => document.getElementById(id)?.value).length / charterFields.length);
  // Materiality
  const matDone = Object.values(STATE.matTopics).filter(t => t.fin && t.imp).length;
  scores.push(matDone / CH11.matTopics.length);
  // S1
  const s1Done = CH11.scope1Sources.filter(s => STATE.s1[s.id]?.activity > 0).length;
  scores.push(s1Done / CH11.scope1Sources.length);
  // S2
  const s2Done = CH11.scope2Sources.filter(s => STATE.s2[s.id]?.actLB > 0).length;
  scores.push(s2Done / CH11.scope2Sources.length);
  // S3
  const s3Done = CH11.scope3Categories.filter(c => STATE.s3['cat'+c.cat]?.materiality).length;
  scores.push(s3Done / CH11.scope3Categories.length);
  // Data
  const dataFields = ['d-s1owner','d-s2owner','d-s3owner'];
  scores.push(dataFields.filter(id => document.getElementById(id)?.value).length / dataFields.length);

  const avg = scores.reduce((a,b) => a+b, 0) / scores.length;
  const pct = Math.round(avg * 100);
  document.getElementById('progressFill').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = `Phase 1 completion: ${pct}%`;
  const started = scores.filter(s => s > 0).length;
  document.getElementById('progressPct').textContent = started + ' / 6 sections started';
}

/* ── DASHBOARD ────────────────────────────────────────────── */
function updateDashboard() {
  let s1t = 0, s2lbt = 0, s2mbt = 0, s3t = 0;
  CH11.scope1Sources.forEach(s => { if (STATE.s1[s.id]?.tco2e > 0) s1t += STATE.s1[s.id].tco2e; });
  CH11.scope2Sources.forEach(s => { if (STATE.s2[s.id]?.tco2eLB > 0) s2lbt += STATE.s2[s.id].tco2eLB; if (STATE.s2[s.id]?.tco2eMB > 0) s2mbt += STATE.s2[s.id].tco2eMB; });
  CH11.scope3Categories.forEach(c => { const st = STATE.s3['cat'+c.cat]; const b = st?.primary > 0 ? st.primary : st?.screening || 0; if (b > 0) s3t += b; });
  const total = s1t + s2lbt + s3t;

  setEl('db-s1', fmtT(s1t)); setEl('db-s2lb', fmtT(s2lbt)); setEl('db-s2mb', fmtT(s2mbt));
  setEl('db-s3', fmtT(s3t)); setEl('db-total', fmtT(total));

  // Section cards
  const s1Entries = CH11.scope1Sources.filter(s => STATE.s1[s.id]?.activity > 0).length;
  setEl('db-s1-status', s1t > 0 ? `${fmtT(s1t)} tCO₂e` : s1Entries > 0 ? 'In progress' : 'Not started');
  setEl('db-s1-detail', `${s1Entries}/${CH11.scope1Sources.length} source categories entered`);
  const s2Entries = CH11.scope2Sources.filter(s => STATE.s2[s.id]?.actLB > 0).length;
  setEl('db-s2-status', s2lbt > 0 ? `${fmtT(s2lbt)} tCO₂e LB / ${fmtT(s2mbt)} MB` : s2Entries > 0 ? 'In progress' : 'Not started');
  setEl('db-s2-detail', `${s2Entries}/${CH11.scope2Sources.length} energy sources entered`);
  const s3Assessed = CH11.scope3Categories.filter(c => STATE.s3['cat'+c.cat]?.materiality).length;
  setEl('db-s3-status', s3t > 0 ? `${fmtT(s3t)} tCO₂e (${s3Assessed} cats assessed)` : s3Assessed > 0 ? `${s3Assessed} categories assessed` : 'Not started');
  setEl('db-s3-detail', `${s3Assessed}/15 GHG Protocol categories assessed`);
  const charterName = document.getElementById('ch-orgName')?.value;
  setEl('db-charter-status', charterName ? `${charterName} — charter in progress` : 'Not started');
  setEl('db-charter-detail', document.getElementById('ch-boundary')?.value ? 'Boundary defined: ' + document.getElementById('ch-boundary').value : 'Boundary not yet selected');
  const matAssessed = Object.values(STATE.matTopics).filter(t => t.fin && t.imp).length;
  setEl('db-mat-status', matAssessed > 0 ? `${matAssessed}/${CH11.matTopics.length} topics scored` : 'Not started');
  const priority = Object.entries(STATE.matTopics).filter(([_,t]) => t.fin >= 4 && t.imp >= 4).length;
  setEl('db-mat-detail', priority > 0 ? `${priority} priority material topics identified` : 'Score topics to identify priorities');
  const dataOwners = ['d-s1owner','d-s2owner','d-s3owner'].filter(id => document.getElementById(id)?.value).length;
  setEl('db-data-status', dataOwners > 0 ? `${dataOwners}/3 key data owners named` : 'Not started');
  setEl('db-data-detail', document.getElementById('d-platform')?.value ? 'Platform: ' + document.getElementById('d-platform').value : 'Platform not yet selected');

  // Next steps
  updateNextSteps(s1t, s2lbt, s3t, charterName, s3Assessed);
  drawDashboardCharts(s1t, s2lbt, s2mbt, s3t);
}

function setEl(id, val) { const el = document.getElementById(id); if (el) el.textContent = val; }

function updateNextSteps(s1t, s2lbt, s3t, charterName, s3Assessed) {
  const body = document.getElementById('dns-content');
  if (!body) return;
  const steps = [];
  if (!charterName) steps.push('📋 <strong>Start with the Programme Charter</strong> — define your reporting boundary, applicable frameworks, and board approval process. This is the legal and governance foundation for everything that follows.');
  if (s1t === 0) steps.push('🔥 <strong>Complete Scope 1 baseline</strong> — collect gas meter readings, fuel delivery records, and F-Gas service logs. Aim for Measured data quality on all major sources.');
  if (s2lbt === 0) steps.push('⚡ <strong>Complete Scope 2 dual reporting</strong> — both location-based and market-based figures are required by GHG Protocol, ESRS E1, and CDP. Pull electricity invoices by site.');
  if (s3Assessed < 5) steps.push('🌐 <strong>Screen all 15 Scope 3 categories</strong> — run spend-based estimates first. Typically 1–3 categories represent 80%+ of Scope 3. Identify those, then invest in primary data collection.');
  if (s1t > 0 && s2lbt > 0 && s3t > 0) steps.push('✅ <strong>Emissions baseline complete</strong> — arrange third-party verification before using these figures for SBTi submission or regulatory disclosure. Engage your assurance provider now.');
  if (steps.length === 0) steps.push('🎯 Phase 1 is progressing well. Next: finalise assurance provider engagement, complete governance design (Chapter 12), and begin target-setting against the verified baseline.');
  body.innerHTML = steps.join('<br/><br/>');
}

function drawDashboardCharts(s1, s2lb, s2mb, s3) {
  drawScopeChart(s1, s2lb, s2mb, s3);
  drawCompletionChart();
}

function drawScopeChart(s1, s2lb, s2mb, s3) {
  const canvas = document.getElementById('dbChartScope'); if (!canvas) return;
  const W = canvas.parentElement.offsetWidth || 340, H = 240;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#f8fafc'; ctx.fillRect(0,0,W,H);
  const bars = [{l:'Scope 1',v:s1,c:'#b91c1c'},{l:'S2 LB',v:s2lb,c:'#d97706'},{l:'S2 MB',v:s2mb,c:'#16a34a'},{l:'Scope 3',v:s3,c:'#1d4ed8'}];
  const maxV = Math.max(...bars.map(b=>b.v),1);
  const pad = {t:28,r:12,b:44,l:52};
  const pW = W-pad.l-pad.r, pH = H-pad.t-pad.b;
  const bw = Math.max(18,(pW/bars.length)-14);
  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  [0,.5,1].forEach(f=>{const y=pad.t+pH*(1-f);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(W-pad.r,y);ctx.stroke();
    ctx.fillStyle='#94a3b8';ctx.font='8px Inter,sans-serif';ctx.textAlign='right';const v=maxV*f;ctx.fillText(v>=1000?(v/1000).toFixed(0)+'k':v.toFixed(0),pad.l-3,y+3);});
  bars.forEach((b,i)=>{
    const bh=Math.max(2,(b.v/maxV)*pH);
    const x=pad.l+i*(pW/bars.length)+(pW/bars.length-bw)/2;
    const y=pad.t+pH-bh;
    if(b.v>0){ctx.fillStyle=b.c;if(ctx.roundRect)ctx.roundRect(x,y,bw,bh,[3,3,0,0]);else ctx.rect(x,y,bw,bh);ctx.fill();
      ctx.fillStyle='#1e293b';ctx.font='bold 8px Inter,sans-serif';ctx.textAlign='center';ctx.fillText(fmtT(b.v),x+bw/2,y-4);}
    ctx.fillStyle=b.c;ctx.font='8px Inter,sans-serif';ctx.textAlign='center';ctx.fillText(b.l,x+bw/2,H-pad.b+14);
  });
}

function drawCompletionChart() {
  const canvas = document.getElementById('dbChartCompletion'); if (!canvas) return;
  const W = canvas.parentElement.offsetWidth || 340, H = 240;
  canvas.width = W; canvas.height = H;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H);
  const sections = [
    {l:'Charter', pct: (['ch-orgName','ch-boundary','ch-lead','ch-approvalDate'].filter(id=>document.getElementById(id)?.value).length/4)*100},
    {l:'Materiality', pct: (Object.values(STATE.matTopics).filter(t=>t.fin&&t.imp).length/CH11.matTopics.length)*100},
    {l:'Scope 1', pct: (CH11.scope1Sources.filter(s=>STATE.s1[s.id]?.activity>0).length/CH11.scope1Sources.length)*100},
    {l:'Scope 2', pct: (CH11.scope2Sources.filter(s=>STATE.s2[s.id]?.actLB>0).length/CH11.scope2Sources.length)*100},
    {l:'Scope 3', pct: (CH11.scope3Categories.filter(c=>STATE.s3['cat'+c.cat]?.materiality).length/CH11.scope3Categories.length)*100},
    {l:'Data Infra', pct: (['d-s1owner','d-s2owner','d-s3owner'].filter(id=>document.getElementById(id)?.value).length/3)*100},
  ];
  const cols = ['#4f46e5','#d97706','#b91c1c','#d97706','#1d4ed8','#059669'];
  const pad={t:20,r:14,b:44,l:52};
  const pW=W-pad.l-pad.r, pH=H-pad.t-pad.b;
  const bw=Math.max(16,(pW/sections.length)-12);
  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  [0,50,100].forEach(f=>{const y=pad.t+pH*(1-f/100);ctx.beginPath();ctx.moveTo(pad.l,y);ctx.lineTo(W-pad.r,y);ctx.stroke();
    ctx.fillStyle='#94a3b8';ctx.font='8px Inter,sans-serif';ctx.textAlign='right';ctx.fillText(f+'%',pad.l-3,y+3);});
  sections.forEach((s,i)=>{
    const bh=Math.max(2,(s.pct/100)*pH);
    const x=pad.l+i*(pW/sections.length)+(pW/sections.length-bw)/2;
    const y=pad.t+pH-bh;
    ctx.fillStyle=s.pct>0?cols[i]:'#e2e8f0';
    if(ctx.roundRect)ctx.roundRect(x,pad.t+pH-bh,bw,bh,[3,3,0,0]);else ctx.rect(x,y,bw,bh); ctx.fill();
    if(s.pct>5){ctx.fillStyle='#1e293b';ctx.font='bold 8px Inter,sans-serif';ctx.textAlign='center';ctx.fillText(Math.round(s.pct)+'%',x+bw/2,y-4);}
    ctx.fillStyle='#475569';ctx.font='8px Inter,sans-serif';ctx.textAlign='center';ctx.fillText(s.l,x+bw/2,H-pad.b+14);
  });
}

/* ── TOGGLE GUIDANCE ──────────────────────────────────────── */
function toggleGuid(id) {
  const el = document.getElementById('guid-' + id);
  const btn = el.previousElementSibling;
  el.classList.toggle('show');
  btn.textContent = el.classList.contains('show') ? '− Hide guidance' : '+ Data collection guidance';
}

/* ── RESET ────────────────────────────────────────────────── */
function resetAll() {
  if (!confirm('Reset all Phase 1 data? This cannot be undone.')) return;
  document.querySelectorAll('input:not([type=checkbox]), select, textarea').forEach(el => {
    if (el.type !== 'submit') el.value = '';
  });
  document.querySelectorAll('input[type=checkbox]').forEach(el => el.checked = false);
  Object.keys(STATE.s1).forEach(id => { STATE.s1[id] = { activity:0, ef:0, tco2e:null, dq:'', notes:'' }; updateSrcResult(id, null); });
  Object.keys(STATE.s2).forEach(id => { STATE.s2[id] = { actLB:0, efLB:0, actMB:0, efMB:0, tco2eLB:null, tco2eMB:null, dq:'', notes:'' }; updateSrcResult(id, null); });
  Object.keys(STATE.s3).forEach(id => { STATE.s3[id] = { materiality:'', screening:0, primary:0, method:'', dq:'', notes:'' }; });
  CH11.matTopics.forEach(t => { STATE.matTopics[t.id] = { fin: t.defaultFin, imp: t.defaultImp }; });
  document.querySelectorAll('.src-card').forEach(c => c.classList.remove('has-data'));
  CH11.scope3Categories.forEach(c => { const el = document.getElementById('s3cat-disp-'+c.cat); if(el) el.textContent='—'; });
  updateS1Total(); updateS2Total(); updateS3Total();
  buildMatTable();
  drawMatMatrix();
  updateProgress();
  updateDashboard();
}

/* ── EXPORT / IMPORT ──────────────────────────────────────── */
function exportJSON() {
  const payload = { meta:{tool:'ESG Phase 1 Toolkit Ch11',version:'1.0',exported:new Date().toISOString()}, state:STATE };
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([JSON.stringify(payload,null,2)],{type:'application/json'}));
  a.download='ESG_Phase1_Toolkit_'+(document.getElementById('ch-orgName')?.value||'ESG').replace(/\s+/g,'_')+'_'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
function exportCSV() {
  const rows=[['Section','Item','Value']];
  rows.push(['Charter','Organisation',document.getElementById('ch-orgName')?.value||'']);
  rows.push(['Charter','Boundary',document.getElementById('ch-boundary')?.value||'']);
  CH11.scope1Sources.forEach(s=>{rows.push(['Scope 1',s.name,STATE.s1[s.id]?.tco2e?.toFixed(2)||'']);});
  CH11.scope2Sources.forEach(s=>{rows.push(['Scope 2 (LB)',s.name,STATE.s2[s.id]?.tco2eLB?.toFixed(2)||'']);});
  CH11.scope3Categories.forEach(c=>{const st=STATE.s3['cat'+c.cat];const v=(st?.primary||st?.screening||0).toFixed(2);rows.push(['Scope 3','Cat '+c.cat+': '+c.name,v]);});
  CH11.matTopics.forEach(t=>{const st=STATE.matTopics[t.id];rows.push(['Materiality',t.topic,'Fin:'+st.fin+' Imp:'+st.imp]);});
  const csv=rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const a=document.createElement('a');
  a.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));
  a.download='ESG_Phase1_Data_'+(document.getElementById('ch-orgName')?.value||'ESG').replace(/\s+/g,'_')+'.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}
function importJSON(){document.getElementById('importFileInput').click();}
function handleImport(e){
  const file=e.target.files[0]; if(!file) return;
  new FileReader().onload=(ev=>{
    try { const p=JSON.parse(ev.target.result); if(p.state) { Object.assign(STATE,p.state); alert('Imported.'); updateDashboard(); } }
    catch(err){alert('Import failed: '+err.message);}
  }); new FileReader().readAsText(file); e.target.value='';
}
window.addEventListener('resize',()=>{if(document.getElementById('panel-dashboard').classList.contains('active'))drawDashboardCharts(0,0,0,0);});
