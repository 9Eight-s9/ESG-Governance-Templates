/**
 * ESG vs CSR Comparison Matrix B.4 — app.js v2.0
 * 6 tabs: Dashboard · Guide · Foundational · Operational · Regulatory · Strategic
 * Pure JS, stateless reference tool — export/import for annotations
 */
'use strict';

// STATE: { dimId: { notes, relevance, rating } }
const STATE = {};

document.addEventListener('DOMContentLoaded', function () {
  initState();
  buildSummaryTable();
  buildAudienceGrid();
  buildAllSections();
});

/* ── INIT ─────────────────────────────────────────────────── */
function initState() {
  B4_DATA.sections.forEach(sec => {
    sec.dimensions.forEach(dim => {
      STATE[dim.id] = { notes:'', relevance:'', rating:'' };
    });
  });
}

/* ── TAB SWITCHING ─────────────────────────────────────────── */
function switchTab(tabId) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id === 'panel-' + tabId));
}

/* ── BUILD SUMMARY TABLE ────────────────────────────────────── */
function buildSummaryTable() {
  const wrap = document.getElementById('summaryTable');
  if (!wrap) return;

  let html = `<table class="summary-table">
    <thead><tr>
      <th style="width:60px">ID</th>
      <th style="width:80px">Section</th>
      <th style="width:180px">Dimension</th>
      <th>ESG</th>
      <th>CSR</th>
      <th>Key Distinction</th>
    </tr></thead><tbody>`;

  B4_DATA.sections.forEach(sec => {
    const sectionBg = { A:'#dbeafe', B:'#ede9fe', C:'#d1fae5', D:'#fef3c7' }[sec.id];
    const sectionTxt = { A:'#1d4ed8', B:'#6d28d9', C:'#065f46', D:'#92400e' }[sec.id];
    sec.dimensions.forEach(dim => {
      html += `<tr onclick="switchTab('${sec.id}')" title="Click to view full analysis in Section ${sec.id}">
        <td class="dim-id">${dim.id}</td>
        <td><span class="st-section" style="background:${sectionBg};color:${sectionTxt}">${sec.icon} ${sec.id}</span></td>
        <td class="st-dim">${dim.label}</td>
        <td class="st-esg">${dim.esg.substring(0,90)}…</td>
        <td class="st-csr">${dim.csr.substring(0,90)}…</td>
        <td class="st-key">${dim.synthesis}</td>
      </tr>`;
    });
  });

  wrap.innerHTML = html + '</tbody></table>';
}

/* ── BUILD AUDIENCE GRID ────────────────────────────────────── */
function buildAudienceGrid() {
  const grid = document.getElementById('audienceGrid');
  if (!grid) return;
  grid.innerHTML = B4_DATA.audiences.map(a => `
    <div class="aud-card">
      <div class="aud-icon">${a.icon}</div>
      <div class="aud-role">${a.role}</div>
      <div class="aud-need">${a.need}</div>
      <div class="aud-sections">Best: ${a.sections}</div>
    </div>`).join('');
}

/* ── BUILD ALL SECTION TABS ─────────────────────────────────── */
function buildAllSections() {
  B4_DATA.sections.forEach(sec => {
    const stack = document.getElementById('dims-' + sec.id);
    if (!stack) return;
    sec.dimensions.forEach(dim => stack.appendChild(buildDimCard(dim, sec)));
  });
}

/* ── BUILD DIMENSION CARD ───────────────────────────────────── */
function buildDimCard(dim, sec) {
  const card = document.createElement('div');
  card.className = 'dim-card';
  card.id = 'dim-' + dim.id;

  card.innerHTML = `
    <div class="dim-card-header">
      <span class="dim-id">${dim.id}</span>
      <span class="dim-label">${dim.label}</span>
    </div>
    <div class="dim-body">
      <div class="dim-col">
        <div class="dim-col-head head-esg">ESG</div>
        <div class="dim-text">${dim.esg}</div>
        <div class="dim-refs">📚 ${dim.refs}</div>
      </div>
      <div class="dim-col">
        <div class="dim-col-head head-csr">CSR</div>
        <div class="dim-text">${dim.csr}</div>
      </div>
      <div class="dim-col synthesis-col">
        <div class="dim-col-head head-key">Key Distinction</div>
        <div class="dim-text">${dim.synthesis}</div>
        <div style="margin-top:14px">
          <div style="font-size:0.68rem;font-weight:700;color:#94a3b8;text-transform:uppercase;letter-spacing:0.05em;margin-bottom:5px">Your Notes / Annotations</div>
          <textarea style="width:100%;min-height:52px;border:1.5px solid #dbeafe;border-radius:7px;padding:7px;font-size:0.76rem;font-family:inherit;color:#1e293b;resize:vertical;background:#fff;transition:border-color 0.15s;line-height:1.5"
            placeholder="Add organisation-specific context, examples, or action points…"
            id="notes-${dim.id}" oninput="STATE['${dim.id}'].notes=this.value"></textarea>
        </div>
      </div>
    </div>`;

  return card;
}

/* ── EXPORT JSON ────────────────────────────────────────────── */
function exportJSON() {
  const payload = {
    meta: { tool:'ESG vs CSR Comparison Matrix B.4', version:'2.0', exported:new Date().toISOString() },
    annotations: {}
  };
  Object.keys(STATE).forEach(id => { payload.annotations[id] = {...STATE[id]}; });
  const blob = new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'ESG_vs_CSR_Matrix_B4_annotations_' + new Date().toISOString().slice(0,10) + '.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── EXPORT CSV ─────────────────────────────────────────────── */
function exportCSV() {
  const rows = [['Dimension ID','Section','Dimension Label','ESG','CSR','Key Distinction','Framework References','Annotations']];
  B4_DATA.sections.forEach(sec => {
    sec.dimensions.forEach(dim => {
      const st = STATE[dim.id];
      rows.push([
        dim.id, sec.label, dim.label,
        dim.esg, dim.csr, dim.synthesis, dim.refs,
        st.notes || ''
      ]);
    });
  });
  const csv = rows.map(r => r.map(c => '"' + String(c).replace(/"/g,'""') + '"').join(',')).join('\n');
  const blob = new Blob([csv],{type:'text/csv'});
  const url  = URL.createObjectURL(blob);
  const a    = document.createElement('a');
  a.href = url;
  a.download = 'ESG_vs_CSR_Matrix_B4_' + new Date().toISOString().slice(0,10) + '.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

/* ── IMPORT JSON ─────────────────────────────────────────────── */
function importJSON() { document.getElementById('importFileInput').click(); }
function handleImport(event) {
  const file = event.target.files[0]; if (!file) return;
  const reader = new FileReader();
  reader.onload = e => {
    try {
      const p = JSON.parse(e.target.result);
      if (!p.annotations) throw new Error('Invalid file format');
      Object.entries(p.annotations).forEach(([id, st]) => {
        if (!STATE[id]) return;
        STATE[id] = { ...STATE[id], ...st };
        const notesEl = document.getElementById('notes-' + id);
        if (notesEl && st.notes) notesEl.value = st.notes;
      });
      alert('Annotations imported successfully.');
    } catch(err) { alert('Import failed: ' + err.message); }
  };
  reader.readAsText(file);
  event.target.value = '';
}
