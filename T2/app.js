// ── TAB SWITCHING ─────────────────────────────────────────────
function showTab(name) {
  document.querySelectorAll('.tab-panel').forEach(function(p){ p.classList.remove('active'); });
  document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
  var panel = document.getElementById('tp-' + name);
  if (panel) panel.classList.add('active');
  document.querySelectorAll('.tab-btn').forEach(function(b){
    if (b.getAttribute('data-tab') === name) b.classList.add('active');
  });
  if (name === 'portfolio') { setTimeout(buildPortfolio, 50); }
  if (name === 'scorecard')  { setTimeout(function(){ if(ACTIVE_SUPPLIER) renderScorecard(ACTIVE_SUPPLIER); }, 50); }
}

// ── SCORE HELPERS ─────────────────────────────────────────────
function weightedScore(sup) {
  var total = 0, maxTotal = 0;
  ALL_CRITERIA.forEach(function(c){
    var s = (sup.scores && sup.scores[c.id]) ? sup.scores[c.id] : 0;
    total += s * c.weight;
    maxTotal += c.max * c.weight;
  });
  return maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0;
}

function ratingLabel(score) {
  if (score >= 80) return { label:'⭐ Leading',     color:'#166534', bg:'#dcfce7' };
  if (score >= 60) return { label:'✅ Progressing', color:'#1d4ed8', bg:'#dbeafe' };
  if (score >= 40) return { label:'⚠️ Developing',  color:'#92400e', bg:'#fef3c7' };
  return               { label:'🔴 At Risk',      color:'#dc2626', bg:'#fee2e2' };
}

function pillarScore(sup, pillar) {
  var total = 0, maxTotal = 0;
  SCORE_CRITERIA[pillar].forEach(function(c){
    var s = (sup.scores && sup.scores[c.id]) ? sup.scores[c.id] : 0;
    total += s * c.weight;
    maxTotal += c.max * c.weight;
  });
  return maxTotal > 0 ? Math.round((total / maxTotal) * 100) : 0;
}

// ── SUPPLIER LIST (Tab 1) ──────────────────────────────────────
function buildSupplierList() {
  var wrap = document.getElementById('supplierList');
  if (!wrap) return;
  var sups = Object.values(SUPPLIERS);

  if (sups.length === 0) {
    wrap.innerHTML = '<div class="empty-state">No suppliers added yet. Click "+ Add Supplier" to begin.</div>';
    updatePortfolioStat();
    return;
  }

  // Sort by tier then by score desc
  sups.sort(function(a,b){ return a.tier.localeCompare(b.tier) || weightedScore(b) - weightedScore(a); });

  var html = '';
  var currentTier = '';
  sups.forEach(function(sup){
    if (sup.tier !== currentTier) {
      currentTier = sup.tier;
      var t = SUPPLIER_TIERS.find(function(t){ return t.id === currentTier; });
      if (t) html += '<div class="tier-divider" style="border-left:4px solid ' + t.color + '">' +
        '<span style="color:' + t.color + ';font-weight:800">' + t.label + '</span>' +
        '<span style="color:#64748b;font-size:.75rem;margin-left:8px">' + t.desc + '</span></div>';
    }
    var sc = weightedScore(sup);
    var r = ratingLabel(sc);
    var tier = SUPPLIER_TIERS.find(function(t){ return t.id === sup.tier; });
    html += '<div class="sup-row" onclick="openScorecard(\'' + sup.id + '\')">' +
      '<div class="sup-name">' + sup.name + '<span class="sup-country">' + sup.country + '</span></div>' +
      '<div class="sup-sector">' + sup.sector + '</div>' +
      '<div class="sup-spend">' + fmtSpend(sup.spend, sup.spend_currency) + '</div>' +
      '<div class="sup-score-pill" style="background:' + r.bg + ';color:' + r.color + '">' + sc + '% — ' + r.label + '</div>' +
      '<div class="sup-assessed">' + (sup.assessed ? 'Assessed: ' + sup.assessed : 'Not yet assessed') + '</div>' +
      '<div class="sup-actions">' +
        '<button class="icon-btn" title="Open scorecard" onclick="event.stopPropagation();openScorecard(\'' + sup.id + '\')">📋</button>' +
        '<button class="icon-btn" title="Delete" onclick="event.stopPropagation();deleteSupplier(\'' + sup.id + '\')">🗑</button>' +
      '</div>' +
    '</div>';
  });
  wrap.innerHTML = html;
  updatePortfolioStat();
}

function fmtSpend(val, currency) {
  if (!val) return '—';
  if (val >= 1000000) return currency + ' ' + (val/1000000).toFixed(1) + 'M';
  if (val >= 1000) return currency + ' ' + (val/1000).toFixed(0) + 'K';
  return currency + ' ' + val;
}

function updatePortfolioStat() {
  var sups = Object.values(SUPPLIERS);
  var el = document.getElementById('portfolioStat');
  if (!el) return;
  var assessed = sups.filter(function(s){ return s.assessed; }).length;
  var atRisk = sups.filter(function(s){ return weightedScore(s) < 40; }).length;
  el.textContent = sups.length + ' suppliers · ' + assessed + ' assessed · ' + atRisk + ' at risk';
}

// ── ADD SUPPLIER MODAL ────────────────────────────────────────
function openAddModal() {
  document.getElementById('addModal').style.display = 'flex';
}
function closeAddModal() {
  document.getElementById('addModal').style.display = 'none';
  document.getElementById('addForm').reset();
}
function saveNewSupplier() {
  var name = document.getElementById('new-name').value.trim();
  if (!name) { alert('Supplier name is required.'); return; }
  var id = 'sup' + Date.now();
  SUPPLIERS[id] = {
    id: id,
    name: name,
    country: document.getElementById('new-country').value || '',
    sector: document.getElementById('new-sector').value || '',
    tier: document.getElementById('new-tier').value || 't2',
    spend: parseFloat(document.getElementById('new-spend').value) || 0,
    spend_currency: document.getElementById('new-currency').value || 'GBP',
    contact: document.getElementById('new-contact').value || '',
    scores: {},
    flags: '',
    action: '',
    assessed: '',
    next: ''
  };
  closeAddModal();
  buildSupplierList();
  openScorecard(id);
}
function deleteSupplier(id) {
  if (!confirm('Delete ' + (SUPPLIERS[id] ? SUPPLIERS[id].name : 'this supplier') + '?')) return;
  delete SUPPLIERS[id];
  if (ACTIVE_SUPPLIER === id) {
    ACTIVE_SUPPLIER = null;
    showTab('suppliers');
  }
  buildSupplierList();
}

// ── SCORECARD (Tab 2) ─────────────────────────────────────────
function openScorecard(id) {
  ACTIVE_SUPPLIER = id;
  showTab('scorecard');
  renderScorecard(id);
}

function renderScorecard(id) {
  var sup = SUPPLIERS[id];
  if (!sup) return;
  var sc = weightedScore(sup);
  var r = ratingLabel(sc);

  // Header
  setEl('sc-name', sup.name);
  setEl('sc-meta', sup.country + ' · ' + sup.sector + ' · ' + (SUPPLIER_TIERS.find(function(t){return t.id===sup.tier;})||{label:sup.tier}).label);
  setEl('sc-score', sc + '%');
  setEl('sc-rating', r.label);
  var hdr = document.getElementById('sc-header');
  if (hdr) hdr.style.borderLeft = '6px solid ' + r.color;

  // Pillar bars
  ['env','soc','gov','engagement'].forEach(function(p){
    var ps = pillarScore(sup, p);
    setEl('pb-' + p, ps + '%');
    var bar = document.getElementById('pbar-' + p);
    if (bar) bar.style.width = ps + '%';
  });

  // Criteria scoring
  var container = document.getElementById('criteriaContainer');
  if (!container) return;

  var pillars = [
    { id:'env',        label:'🌱 Environmental', color:'#166534' },
    { id:'soc',        label:'👥 Social',         color:'#1d4ed8' },
    { id:'gov',        label:'🏛 Governance',     color:'#92400e' },
    { id:'engagement', label:'🤝 Engagement',     color:'#7c3aed' }
  ];

  var html = '';
  pillars.forEach(function(p){
    html += '<div class="pillar-section"><div class="pillar-hd" style="border-left:4px solid ' + p.color + '">' + p.label + ' — Pillar Score: ' +
      '<span style="font-weight:800;color:' + p.color + '">' + pillarScore(sup, p.id) + '%</span></div>';

    SCORE_CRITERIA[p.id].forEach(function(c){
      var val = (sup.scores && sup.scores[c.id]) ? sup.scores[c.id] : 0;
      html += '<div class="crit-row">' +
        '<div class="crit-info">' +
          '<div class="crit-label">' + c.label + ' <span class="crit-weight">weight: ' + c.weight + '</span></div>' +
          '<div class="crit-guidance">' + c.guidance + '</div>' +
          '<div class="crit-framework">' + c.framework + '</div>' +
        '</div>' +
        '<div class="crit-score-col">' +
          '<div class="score-btns">' +
            [1,2,3,4,5].map(function(n){
              return '<button class="score-btn' + (val === n ? ' active' : '') + '" ' +
                'onclick="setScore(\'' + id + '\',\'' + c.id + '\',' + n + ')">' + n + '</button>';
            }).join('') +
          '</div>' +
          '<div class="score-display" id="sd-' + c.id + '">' + (val > 0 ? val + ' / 5' : 'Not scored') + '</div>' +
        '</div>' +
      '</div>';
    });
    html += '</div>';
  });
  container.innerHTML = html;

  // Meta fields
  var v = function(eid){ return document.getElementById(eid); };
  if (v('sc-flags')) v('sc-flags').value = sup.flags || '';
  if (v('sc-action')) v('sc-action').value = sup.action || '';
  if (v('sc-assessed')) v('sc-assessed').value = sup.assessed || '';
  if (v('sc-next')) v('sc-next').value = sup.next || '';

  // Draw radar
  setTimeout(drawRadar, 50);
}

function setScore(supId, critId, val) {
  var sup = SUPPLIERS[supId];
  if (!sup) return;
  if (!sup.scores) sup.scores = {};
  sup.scores[critId] = val;
  // Update button highlights
  document.querySelectorAll('.score-btn').forEach(function(btn){
    // handled by re-render
  });
  // Re-render scorecard
  renderScorecard(supId);
  buildSupplierList();
}

function saveMeta(id) {
  var sup = SUPPLIERS[id];
  if (!sup) return;
  sup.flags  = (document.getElementById('sc-flags')   || {}).value || '';
  sup.action = (document.getElementById('sc-action')  || {}).value || '';
  sup.assessed = (document.getElementById('sc-assessed') || {}).value || '';
  sup.next   = (document.getElementById('sc-next')    || {}).value || '';
  buildSupplierList();
  alert('Saved.');
}

// ── RADAR CHART ───────────────────────────────────────────────
function drawRadar() {
  var canvas = document.getElementById('radarCanvas');
  if (!canvas || !canvas.getContext) return;
  var sup = SUPPLIERS[ACTIVE_SUPPLIER];
  if (!sup) return;

  var W = 300, H = 300, cx = W/2, cy = H/2, R = 110;
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, W, H);

  var axes = [
    { label:'Environment', val: pillarScore(sup,'env')/100 },
    { label:'Social',      val: pillarScore(sup,'soc')/100 },
    { label:'Governance',  val: pillarScore(sup,'gov')/100 },
    { label:'Engagement',  val: pillarScore(sup,'engagement')/100 }
  ];
  var n = axes.length;
  var angles = axes.map(function(_, i){ return (i/n)*2*Math.PI - Math.PI/2; });

  // Grid circles
  [0.25,0.5,0.75,1].forEach(function(f){
    ctx.beginPath();
    angles.forEach(function(a, i){
      var x = cx + Math.cos(a)*R*f, y = cy + Math.sin(a)*R*f;
      i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
    });
    ctx.closePath();
    ctx.strokeStyle = '#e2e8f0'; ctx.lineWidth = 1; ctx.stroke();
    if (f < 1) {
      ctx.fillStyle = '#94a3b8'; ctx.font = '8px Inter,sans-serif'; ctx.textAlign = 'center';
      ctx.fillText(Math.round(f*100)+'%', cx + Math.cos(angles[0])*R*f + 12, cy + Math.sin(angles[0])*R*f);
    }
  });

  // Axis lines
  ctx.strokeStyle = '#cbd5e1'; ctx.lineWidth = 1;
  angles.forEach(function(a){
    ctx.beginPath(); ctx.moveTo(cx, cy);
    ctx.lineTo(cx + Math.cos(a)*R, cy + Math.sin(a)*R); ctx.stroke();
  });

  // Data polygon
  ctx.beginPath();
  axes.forEach(function(ax, i){
    var x = cx + Math.cos(angles[i])*R*ax.val;
    var y = cy + Math.sin(angles[i])*R*ax.val;
    i===0 ? ctx.moveTo(x,y) : ctx.lineTo(x,y);
  });
  ctx.closePath();
  ctx.fillStyle = 'rgba(29,78,216,0.18)'; ctx.fill();
  ctx.strokeStyle = '#1d4ed8'; ctx.lineWidth = 2; ctx.stroke();

  // Dots
  axes.forEach(function(ax, i){
    var x = cx + Math.cos(angles[i])*R*ax.val;
    var y = cy + Math.sin(angles[i])*R*ax.val;
    ctx.beginPath(); ctx.arc(x, y, 5, 0, 2*Math.PI);
    ctx.fillStyle = '#1d4ed8'; ctx.fill();
    ctx.strokeStyle = '#fff'; ctx.lineWidth = 1.5; ctx.stroke();
  });

  // Labels
  ctx.fillStyle = '#1e293b'; ctx.font = 'bold 10px Inter,sans-serif';
  var labelOffset = 20;
  axes.forEach(function(ax, i){
    var x = cx + Math.cos(angles[i])*(R+labelOffset);
    var y = cy + Math.sin(angles[i])*(R+labelOffset);
    ctx.textAlign = Math.cos(angles[i]) > 0.1 ? 'left' : (Math.cos(angles[i]) < -0.1 ? 'right' : 'center');
    ctx.textBaseline = Math.sin(angles[i]) > 0.1 ? 'top' : (Math.sin(angles[i]) < -0.1 ? 'bottom' : 'middle');
    ctx.fillText(ax.label, x, y);
    ctx.fillStyle = '#64748b'; ctx.font = '9px Inter,sans-serif';
    ctx.fillText(Math.round(ax.val*100)+'%', x, y + (Math.sin(angles[i]) >= 0 ? 12 : -12));
    ctx.fillStyle = '#1e293b'; ctx.font = 'bold 10px Inter,sans-serif';
  });
}

// ── PORTFOLIO (Tab 3) ─────────────────────────────────────────
function buildPortfolio() {
  var sups = Object.values(SUPPLIERS);
  var container = document.getElementById('tp-portfolio');
  if (!container) return;

  if (sups.length === 0) {
    container.innerHTML = '<div class="empty-state">Add suppliers to generate portfolio view.</div>';
    return;
  }

  // KPIs
  var total = sups.length;
  var assessed = sups.filter(function(s){ return s.assessed; }).length;
  var avg = total > 0 ? Math.round(sups.reduce(function(a,s){ return a + weightedScore(s); }, 0) / total) : 0;
  var atRisk = sups.filter(function(s){ return weightedScore(s) < 40; }).length;
  var leading = sups.filter(function(s){ return weightedScore(s) >= 80; }).length;

  setEl('pf-total', total);
  setEl('pf-assessed', assessed + ' / ' + total);
  setEl('pf-avg', avg + '%');
  setEl('pf-atrisk', atRisk);
  setEl('pf-leading', leading);

  // Score distribution chart
  try { drawPortfolioChart(sups); } catch(e) {}

  // Tier breakdown
  buildTierBreakdown(sups);

  // Action required list
  buildActionList(sups);

  // Scope 3 Cat 1 exposure
  buildS3Exposure(sups);
}

function drawPortfolioChart(sups) {
  var canvas = document.getElementById('portfolioChart');
  if (!canvas || !canvas.getContext) return;
  var W = canvas.parentElement.offsetWidth || 400, H = 260;
  canvas.width = W; canvas.height = H;
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0,0,W,H);

  var buckets = [
    { label:'At Risk\n<40%',    range:[0,40],  color:'#fca5a5', count:0 },
    { label:'Developing\n40-60%',range:[40,60], color:'#fde68a', count:0 },
    { label:'Progressing\n60-80%',range:[60,80],color:'#93c5fd', count:0 },
    { label:'Leading\n≥80%',    range:[80,101], color:'#86efac', count:0 }
  ];
  sups.forEach(function(s){
    var sc = weightedScore(s);
    buckets.forEach(function(b){ if(sc >= b.range[0] && sc < b.range[1]) b.count++; });
  });

  var maxCount = Math.max.apply(null, buckets.map(function(b){return b.count;})) || 1;
  var pad = {t:20,r:16,b:50,l:40};
  var pW = W-pad.l-pad.r, pH = H-pad.t-pad.b;
  var bw = Math.min(80, (pW/buckets.length)-16);

  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  [0,Math.ceil(maxCount/2),maxCount].forEach(function(v){
    var y = pad.t + pH*(1-v/maxCount);
    ctx.beginPath(); ctx.moveTo(pad.l,y); ctx.lineTo(W-pad.r,y); ctx.stroke();
    ctx.fillStyle='#94a3b8'; ctx.font='9px Inter,sans-serif'; ctx.textAlign='right';
    ctx.fillText(v, pad.l-4, y+3);
  });

  buckets.forEach(function(b, i){
    var bh = (b.count/maxCount)*pH;
    var x = pad.l + i*(pW/buckets.length) + (pW/buckets.length-bw)/2;
    var y = pad.t + pH - bh;
    ctx.fillStyle = b.color;
    if (ctx.roundRect) { ctx.beginPath(); ctx.roundRect(x,y,bw,bh,[4,4,0,0]); ctx.fill(); }
    else ctx.fillRect(x,y,bw,bh);
    if (b.count > 0) {
      ctx.fillStyle='#1e293b'; ctx.font='bold 11px Inter,sans-serif'; ctx.textAlign='center';
      ctx.fillText(b.count, x+bw/2, y-6);
    }
    ctx.fillStyle='#475569'; ctx.font='9px Inter,sans-serif'; ctx.textAlign='center';
    b.label.split('\n').forEach(function(line, li){
      ctx.fillText(line, x+bw/2, H-pad.b+14+li*12);
    });
  });
}

function buildTierBreakdown(sups) {
  var wrap = document.getElementById('tierBreakdown');
  if (!wrap) return;
  var html = '';
  SUPPLIER_TIERS.slice(0,3).forEach(function(tier){
    var ts = sups.filter(function(s){ return s.tier === tier.id; });
    if (ts.length === 0) return;
    var tavg = ts.length > 0 ? Math.round(ts.reduce(function(a,s){ return a+weightedScore(s);},0)/ts.length) : 0;
    var totalSpend = ts.reduce(function(a,s){ return a+(s.spend||0);}, 0);
    html += '<div class="tier-kpi-card" style="border-top:4px solid ' + tier.color + '">' +
      '<div class="tkc-tier" style="color:' + tier.color + '">' + tier.label + '</div>' +
      '<div class="tkc-count">' + ts.length + ' suppliers</div>' +
      '<div class="tkc-score">Avg score: <strong>' + tavg + '%</strong></div>' +
      '<div class="tkc-spend">Total spend: ' + fmtSpend(totalSpend, '') + '</div>' +
    '</div>';
  });
  wrap.innerHTML = html || '<div class="empty-state">No tier data.</div>';
}

function buildActionList(sups) {
  var wrap = document.getElementById('actionList');
  if (!wrap) return;
  var atRisk = sups.filter(function(s){ return weightedScore(s) < 40; })
    .sort(function(a,b){ return weightedScore(a)-weightedScore(b); });
  if (atRisk.length === 0) {
    wrap.innerHTML = '<div style="color:#16a34a;font-size:.82rem;padding:12px">No At Risk suppliers identified.</div>';
    return;
  }
  wrap.innerHTML = atRisk.map(function(s){
    var sc = weightedScore(s);
    return '<div class="action-row" onclick="openScorecard(\'' + s.id + '\')">' +
      '<div><strong>' + s.name + '</strong> <span style="color:#64748b;font-size:.76rem">' + s.country + ' · ' + s.sector + '</span></div>' +
      '<div style="font-size:.75rem;color:#dc2626;margin-top:2px">' + sc + '% — ' + ratingLabel(sc).label + '</div>' +
      (s.flags ? '<div style="font-size:.72rem;color:#92400e;margin-top:4px">Flags: ' + s.flags + '</div>' : '') +
      (s.action ? '<div style="font-size:.72rem;color:#1d4ed8;margin-top:2px">Actions: ' + s.action + '</div>' : '') +
    '</div>';
  }).join('');
}

function buildS3Exposure(sups) {
  var wrap = document.getElementById('s3Exposure');
  if (!wrap) return;
  var t1 = sups.filter(function(s){ return s.tier === 't1'; });
  var total1Spend = t1.reduce(function(a,s){ return a+(s.spend||0);},0);
  var covered1Spend = t1.filter(function(s){ return s.assessed && (s.scores&&s.scores.e2>0); }).reduce(function(a,s){ return a+(s.spend||0);},0);
  var pct = total1Spend > 0 ? Math.round(covered1Spend/total1Spend*100) : 0;
  wrap.innerHTML = '<div class="s3-kpi">' +
    '<div class="s3-label">Tier 1 Supplier Spend Coverage for Scope 3 Cat 1</div>' +
    '<div class="s3-bar-wrap"><div class="s3-bar-fill" style="width:' + pct + '%"></div></div>' +
    '<div class="s3-pct"><strong>' + pct + '%</strong> of Tier 1 spend has Scope 3 data (<em>target: >67% per BRSR Core; >80% for SBTi supplier engagement</em>)</div>' +
  '</div>';
}

// ── GUIDANCE (Tab 4) ──────────────────────────────────────────
// Static content in HTML

// ── UTILITIES ─────────────────────────────────────────────────
function setEl(id, val) { var el=document.getElementById(id); if(el) el.textContent=val; }

// ── EXPORT / IMPORT / RESET ───────────────────────────────────
function doExportJSON() {
  var data = { meta:{tool:'ESG Supplier Scorecard B.2',v:'1.0',exported:new Date().toISOString()}, suppliers:SUPPLIERS };
  dl(JSON.stringify(data,null,2), 'ESG_SupplierScorecard_' + new Date().toISOString().slice(0,10) + '.json', 'application/json');
}
function doExportCSV() {
  var rows=[['Supplier Name','Country','Sector','Tier','Spend','Currency','Overall Score %','Rating','Assessed Date','Next Assessment']];
  var pillarCols = [
    ['Environment Score %', function(s){ return pillarScore(s,'env'); }],
    ['Social Score %', function(s){ return pillarScore(s,'soc'); }],
    ['Governance Score %', function(s){ return pillarScore(s,'gov'); }],
    ['Engagement Score %', function(s){ return pillarScore(s,'engagement'); }]
  ];
  var critCols = ALL_CRITERIA.map(function(c){ return [c.label, function(s){ return (s.scores&&s.scores[c.id])||0; }]; });
  var allCols = rows[0].concat(pillarCols.map(function(c){return c[0];})).concat(critCols.map(function(c){return c[0];}));
  rows[0] = allCols;
  Object.values(SUPPLIERS).forEach(function(s){
    var sc = weightedScore(s);
    var row = [s.name,s.country,s.sector,s.tier,s.spend||0,s.spend_currency||'',sc,ratingLabel(sc).label.replace(/[⭐✅⚠️🔴]/g,'').trim(),s.assessed||'',s.next||''];
    pillarCols.forEach(function(c){ row.push(c[1](s)); });
    critCols.forEach(function(c){ row.push(c[1](s)); });
    rows.push(row);
  });
  dl(rows.map(function(r){return r.map(function(v){return '"'+String(v).replace(/"/g,'""')+'"';}).join(',');}).join('\n'),
     'ESG_SupplierScorecard.csv','text/csv');
}
function doImportJSON() { document.getElementById('importFile').click(); }
function doReset() {
  if (!confirm('Reset all supplier data? This cannot be undone.')) return;
  SUPPLIERS = {}; ACTIVE_SUPPLIER = null;
  buildSupplierList(); showTab('suppliers');
}
function doLoadDemo() {
  DEMO_SUPPLIERS.forEach(function(s){ SUPPLIERS[s.id] = JSON.parse(JSON.stringify(s)); });
  buildSupplierList();
  alert('3 demo suppliers loaded. Click any supplier to open their scorecard.');
}
function dl(content, filename, type) {
  var a = document.createElement('a');
  a.href = URL.createObjectURL(new Blob([content],{type:type}));
  a.download = filename;
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
}

// ── INIT ──────────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', function() {
  document.getElementById('importFile').addEventListener('change', function(e){
    var file = e.target.files[0]; if(!file) return;
    var reader = new FileReader();
    reader.onload = function(ev){
      try {
        var p = JSON.parse(ev.target.result);
        if (p.suppliers) { Object.assign(SUPPLIERS, p.suppliers); buildSupplierList(); alert('Imported.'); }
      } catch(err) { alert('Import failed: ' + err.message); }
    };
    reader.readAsText(file);
    e.target.value = '';
  });
  buildSupplierList();
});
