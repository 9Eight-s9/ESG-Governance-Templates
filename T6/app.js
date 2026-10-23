'use strict';
const STATE = {};
document.addEventListener('DOMContentLoaded', function () {
  initState(); buildAllSections();
  document.getElementById('orgDate').value = new Date().toISOString().slice(0,10);
  updateDashboard();
});
function initState() {
  B6_DATA.forEach(sec => sec.items.forEach(item => {
    STATE[item.id] = { present:'', likelihood:item.likelihood||3, severity:item.severity||3,
      coshhDone:'', sdsDone:'', competentAppointed:'', lastReview:'', nextReview:'', notes:'', action:'' };
  }));
}
function switchTab(id) {
  document.querySelectorAll('.tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab===id));
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.toggle('active', p.id==='panel-'+id));
  if(id==='dashboard') setTimeout(drawCharts,80);
}
function getRiskRating(score) {
  if(score>=20) return 'Critical'; if(score>=10) return 'High';
  if(score>=5) return 'Medium'; return 'Low';
}
const RISK_COLORS = {Critical:'#dc2626',High:'#ea580c',Medium:'#d97706',Low:'#16a34a'};

function buildAllSections() {
  const container = document.getElementById('sectionPanels');
  B6_DATA.forEach(sec => {
    const panel = document.createElement('div');
    panel.className = 'tab-panel'; panel.id = 'panel-'+sec.id;
    const hdStyle = {A:'background:linear-gradient(135deg,#7f1d1d,#b91c1c)',B:'background:linear-gradient(135deg,#4c1d95,#7c3aed)',
      C:'background:linear-gradient(135deg,#0c4a6e,#0891b2)',D:'background:linear-gradient(135deg,#064e3b,#059669)',
      E:'background:linear-gradient(135deg,#78350f,#b45309)',F:'background:linear-gradient(135deg,#064e3b,#0f766e)',
      G:'background:linear-gradient(135deg,#1e3a8a,#1d4ed8)',H:'background:linear-gradient(135deg,#312e81,#4f46e5)'}[sec.id]||'';
    panel.innerHTML = `<div class="panel-scroll">
      <div class="section-header" style="${hdStyle}">
        <div class="ph-left"><div class="ph-badge">${sec.icon} Section ${sec.id}</div>
          <div><div class="ph-title">${sec.label}</div>
          <div class="ph-sub">${sec.items.length} materials · ${sec.desc.substring(0,60)}…</div></div>
        </div>
        <div class="ph-stats">
          <div class="ph-stat"><span id="sec-critical-${sec.id}">0</span><small>Critical/High</small></div>
          <div class="ph-stat"><span id="sec-entered-${sec.id}">0</span><small>Assessed</small></div>
        </div>
      </div>
      <div class="scope-note"><strong>Legal basis:</strong> ${sec.note}</div>
      <div class="materials-stack" id="mats-${sec.id}"></div>
    </div>`;
    container.appendChild(panel);
    const stack = document.getElementById('mats-'+sec.id);
    sec.items.forEach(item => stack.appendChild(buildMatCard(item,sec)));
  });
}

function buildMatCard(item, sec) {
  const card = document.createElement('div');
  card.className = 'mat-card'; card.id = 'card-'+item.id;
  const defL = item.likelihood||3, defS = item.severity||3;
  const defScore = defL*defS, defRating = getRiskRating(defScore);
  card.innerHTML = `
    <div class="mat-top">
      <div class="mat-id-cell">${item.id}</div>
      <div class="mat-info-cell">
        <div class="mat-name">${item.name}</div>
        <div class="mat-desc">${item.desc}</div>
        <div style="margin-top:5px">
          <span class="mat-legal">⚖️ ${item.legal.substring(0,90)}…</span>
          <span class="mat-frameworks">📋 ${item.frameworks}</span>
        </div>
        <button class="guid-btn" onclick="toggleGuid('${item.id}')">+ Show legal obligations, controls &amp; competent persons</button>
        <div class="guid-text" id="guid-${item.id}">
          <strong>⚖️ Full Legal Basis:</strong> ${item.legal}<br/><br/>
          <strong>🔧 Management Controls:</strong> ${item.control}<br/><br/>
          <strong>👤 Competent Persons / Partners:</strong> ${item.competent}
        </div>
      </div>
      <div class="mat-result-cell">
        <div class="result-score has-val" id="score-${item.id}">${defScore}</div>
        <div class="result-label">Risk Score</div>
        <div class="result-risk-pill risk-${defRating}" id="rating-${item.id}"
          style="background:${RISK_COLORS[defRating]}22;color:${RISK_COLORS[defRating]}">${defRating}</div>
      </div>
    </div>
    <div class="mat-inputs">
      <div class="inp-col">
        <div class="inp-label">Present on Site</div>
        <select class="inp-field" id="present-${item.id}" onchange="onInput('${item.id}')">
          <option value="">Select…</option>
          <option value="Yes">✅ Yes — confirmed</option>
          <option value="No">❌ No — absent</option>
          <option value="Unknown">❓ Unknown — survey needed</option>
          <option value="Suspected">⚠️ Suspected — testing required</option>
        </select>
      </div>
      <div class="inp-col">
        <div class="inp-label">Likelihood (1–5)</div>
        <input type="number" class="inp-field" min="1" max="5" step="1"
          id="like-${item.id}" value="${defL}" oninput="onInput('${item.id}')"/>
        <div class="inp-hint">1=Rare · 5=Certain</div>
      </div>
      <div class="inp-col">
        <div class="inp-label">Severity (1–5)</div>
        <input type="number" class="inp-field" min="1" max="5" step="1"
          id="sev-${item.id}" value="${defS}" oninput="onInput('${item.id}')"/>
        <div class="inp-hint">1=Negligible · 5=Fatal</div>
      </div>
      <div class="inp-col">
        <div class="inp-label">COSHH Done</div>
        <select class="inp-field" id="coshh-${item.id}" onchange="STATE['${item.id}'].coshhDone=this.value;updateDashboard()">
          <option value="">Select…</option>
          <option value="Yes">✅ Yes — current</option>
          <option value="Due">⚠️ Due for review</option>
          <option value="No">❌ Not done</option>
          <option value="NA">N/A</option>
        </select>
      </div>
      <div class="inp-col">
        <div class="inp-label">Notes / Actions</div>
        <textarea class="notes-ta" placeholder="Current controls, actions required, responsible person…"
          id="notes-${item.id}" oninput="STATE['${item.id}'].notes=this.value"></textarea>
      </div>
      <div class="inp-col">
        <div class="inp-label">Next Review Date</div>
        <input type="date" class="meta-inp" id="review-${item.id}" oninput="STATE['${item.id}'].nextReview=this.value" style="border:1.5px solid #e2e8f0;border-radius:7px;padding:7px 9px;font-size:0.82rem;font-family:inherit;background:#fff;width:100%"/>
        <div class="inp-hint" style="margin-top:4px">
          <input type="text" class="meta-inp" id="action-${item.id}" placeholder="Priority action…"
            oninput="STATE['${item.id}'].action=this.value"/>
        </div>
      </div>
    </div>`;
  return card;
}

function onInput(itemId) {
  const present = document.getElementById('present-'+itemId)?.value || '';
  const L = Math.max(1, Math.min(5, parseInt(document.getElementById('like-'+itemId)?.value)||1));
  const S = Math.max(1, Math.min(5, parseInt(document.getElementById('sev-'+itemId)?.value)||1));
  const score = L*S;
  const rating = getRiskRating(score);
  const st = STATE[itemId];
  st.present = present; st.likelihood = L; st.severity = S;

  const scoreEl  = document.getElementById('score-'+itemId);
  const ratingEl = document.getElementById('rating-'+itemId);
  const cardEl   = document.getElementById('card-'+itemId);
  if(scoreEl) scoreEl.textContent = score;
  if(ratingEl){ ratingEl.textContent = rating; ratingEl.className = 'result-risk-pill risk-'+rating;
    ratingEl.style.background = RISK_COLORS[rating]+'22'; ratingEl.style.color = RISK_COLORS[rating]; }
  if(cardEl){ cardEl.className = 'mat-card'+(present?(' risk-'+rating):''); if(present) cardEl.classList.add('has-data'); }

  const sec = B6_DATA.find(s => s.items.some(i=>i.id===itemId));
  if(sec) updateSectionStats(sec.id);
  updateProgress();
  updateDashboard();
}

function updateSectionStats(secId) {
  const sec = B6_DATA.find(s=>s.id===secId); if(!sec) return;
  let critHigh=0, entered=0;
  sec.items.forEach(item=>{
    const st = STATE[item.id];
    if(st.present){ entered++;
      const r = getRiskRating(st.likelihood*st.severity);
      if(r==='Critical'||r==='High') critHigh++;
    }
  });
  const ch = document.getElementById('sec-critical-'+secId);
  const en = document.getElementById('sec-entered-'+secId);
  if(ch) ch.textContent = critHigh;
  if(en) en.textContent = entered;
  const badge = document.getElementById('badge-'+secId);
  if(badge) badge.textContent = entered>0 ? entered+'/'+sec.items.length : sec.items.length;
}

function updateProgress() {
  const done = Object.values(STATE).filter(s=>s.present).length;
  document.getElementById('progressFill').style.width = (done/29*100)+'%';
  document.getElementById('progressLabel').textContent = done+' / 29 materials assessed';
  document.getElementById('progressPct').textContent = Math.round(done/29*100)+'%';
}

function updateDashboard() {
  let critical=0,high=0,medium=0,low=0,total=0,coshhDue=0,sdsCount=0,legalActive=0;
  const bySection = {};
  B6_DATA.forEach(sec=>{ bySection[sec.id]={Critical:0,High:0,Medium:0,Low:0};
    sec.items.forEach(item=>{
      const st = STATE[item.id];
      if(st.present&&st.present!=='No'){ total++;
        const score = st.likelihood*st.severity;
        const rating = getRiskRating(score);
        if(rating==='Critical'){critical++; bySection[sec.id].Critical++;}
        else if(rating==='High'){high++; bySection[sec.id].High++;}
        else if(rating==='Medium'){medium++; bySection[sec.id].Medium++;}
        else{low++; bySection[sec.id].Low++;}
        if(st.coshhDone==='No'||st.coshhDone==='Due') coshhDue++;
        sdsCount++;
        legalActive++;
      }
    });
  });
  document.getElementById('kpiCritical').textContent = critical;
  document.getElementById('kpiHigh').textContent = high;
  document.getElementById('kpiMedium').textContent = medium;
  document.getElementById('kpiLow').textContent = low;
  document.getElementById('kpiTotal').textContent = total;
  document.getElementById('kpiCoshh').textContent = coshhDue;
  document.getElementById('kpiSds').textContent = sdsCount;
  document.getElementById('kpiLegal').textContent = legalActive;
  const entered = Object.values(STATE).filter(s=>s.present).length;
  document.getElementById('kpiEntered').innerHTML = entered+'<span style="font-size:0.9rem">/29</span>';
  document.getElementById('kpiEnteredSub').textContent = Math.round(entered/29*100)+'% assessed';
  buildPriorityTable();
  updateInterp(critical,high,medium,low,total);
  drawCharts(bySection);
}

function buildPriorityTable() {
  const wrap = document.getElementById('priorityTable'); if(!wrap) return;
  const rows = [];
  B6_DATA.forEach(sec=>sec.items.forEach(item=>{
    const st=STATE[item.id];
    if(st.present&&st.present!=='No'){
      const score=st.likelihood*st.severity, rating=getRiskRating(score);
      if(rating==='Critical'||rating==='High') rows.push({id:item.id,name:item.name,sec:sec.label,rating,score,action:st.action||'—',review:st.nextReview||'Not set',coshh:st.coshhDone||'—'});
    }
  }));
  if(rows.length===0){ wrap.innerHTML='<div class="empty-state">No Critical or High risk materials assessed yet. Complete material entries in the section tabs.</div>'; return; }
  rows.sort((a,b)=>b.score-a.score);
  let html=`<table class="ranked-table"><thead><tr><th>ID</th><th>Material</th><th>Section</th><th>Risk</th><th>Score</th><th>COSHH</th><th>Priority Action</th><th>Next Review</th></tr></thead><tbody>`;
  rows.forEach(r=>{
    const col=RISK_COLORS[r.rating];
    html+=`<tr><td style="font-weight:800;color:#94a3b8">${r.id}</td>
      <td style="font-weight:600;color:#1e293b">${r.name}</td>
      <td style="font-size:0.73rem;color:#64748b">${r.sec}</td>
      <td><span class="risk-pill risk-${r.rating}" style="background:${col}22;color:${col}">${r.rating}</span></td>
      <td style="font-weight:800;color:${col};text-align:center">${r.score}</td>
      <td style="font-size:0.77rem">${r.coshh}</td>
      <td style="font-size:0.77rem;color:#475569">${r.action}</td>
      <td style="font-size:0.77rem;color:#94a3b8">${r.review}</td>
    </tr>`;
  });
  wrap.innerHTML=html+'</tbody></table>';
}

function updateInterp(crit,high,med,low,total) {
  const body=document.getElementById('interpBody'); if(!body) return;
  if(total===0){body.textContent='Complete material assessments to generate compliance recommendations.';return;}
  const lines=[];
  if(crit>0) lines.push(`🔴 <strong>${crit} Critical risk material(s)</strong> identified — immediate action required. Escalate to Board. Do not allow continued exposure. Commission independent assessment within 24 hours.`);
  if(high>0) lines.push(`🟠 <strong>${high} High risk material(s)</strong> require priority action plans within 30 days. Engineering controls or substitution. Senior management sign-off required.`);
  if(total>=15) lines.push(`📋 Register coverage is comprehensive (${total}/29 assessed). Ensure COSHH assessments are current for all Present materials before next regulatory inspection.`);
  if(crit===0&&high===0&&total>0) lines.push(`✅ No Critical or High risk materials assessed — maintain routine controls and annual review cycle for all Medium and Low risk materials.`);
  body.innerHTML=lines.join('<br/><br/>')||'Good progress — continue completing section assessments.';
}

function drawCharts(bySection) {
  drawRiskChart(bySection);
  drawStatusChart();
}

function drawRiskChart(bySection) {
  const canvas=document.getElementById('chartRisk'); if(!canvas) return;
  const W=canvas.parentElement.offsetWidth||260, H=220;
  canvas.width=W; canvas.height=H;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#f8fafc'; ctx.fillRect(0,0,W,H);
  const secs=B6_DATA.map(s=>({id:s.id,color:s.color,total:Object.values(bySection[s.id]||{}).reduce((a,v)=>a+v,0)}));
  const maxVal=Math.max(...secs.map(s=>s.total),1);
  const pad={top:28,right:12,bottom:40,left:40};
  const plotW=W-pad.left-pad.right, plotH=H-pad.top-pad.bottom;
  const bw=Math.max(14,(plotW/secs.length)-8);
  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  [0,0.5,1].forEach(f=>{
    const y=pad.top+plotH*(1-f);
    ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(W-pad.right,y); ctx.stroke();
    ctx.fillStyle='#94a3b8'; ctx.font='8px Inter,sans-serif'; ctx.textAlign='right';
    ctx.fillText(Math.round(maxVal*f),pad.left-3,y+3);
  });
  secs.forEach((s,i)=>{
    const bh=Math.max(2,(s.total/maxVal)*plotH);
    const x=pad.left+i*(plotW/secs.length)+(plotW/secs.length-bw)/2;
    const y=pad.top+plotH-bh;
    if(s.total>0){ctx.fillStyle=s.color; if(ctx.roundRect)ctx.roundRect(x,y,bw,bh,[3,3,0,0]);else ctx.rect(x,y,bw,bh); ctx.fill();}
    ctx.fillStyle=s.color; ctx.font='bold 9px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText(s.id,x+bw/2,H-pad.bottom+14);
    if(s.total>0){ctx.fillStyle='#1e293b'; ctx.font='bold 8px Inter,sans-serif'; ctx.fillText(s.total,x+bw/2,y-4);}
  });
}

function drawStatusChart() {
  const canvas=document.getElementById('chartStatus'); if(!canvas) return;
  const W=canvas.parentElement.offsetWidth||400, H=220;
  canvas.width=W; canvas.height=H;
  const ctx=canvas.getContext('2d');
  ctx.fillStyle='#fff'; ctx.fillRect(0,0,W,H);
  const bars=[];
  B6_DATA.forEach(sec=>{
    const assessed=sec.items.filter(item=>STATE[item.id].present&&STATE[item.id].present!=='No').length;
    bars.push({label:sec.id,assessed,total:sec.items.length,col:sec.color});
  });
  const maxVal=Math.max(...bars.map(b=>b.total),1);
  const pad={top:28,right:12,bottom:40,left:40};
  const plotW=W-pad.left-pad.right, plotH=H-pad.top-pad.bottom;
  const bw=Math.max(14,(plotW/bars.length)-10);
  ctx.strokeStyle='#e2e8f0'; ctx.lineWidth=1;
  [0,0.5,1].forEach(f=>{
    const y=pad.top+plotH*(1-f);
    ctx.beginPath(); ctx.moveTo(pad.left,y); ctx.lineTo(W-pad.right,y); ctx.stroke();
  });
  bars.forEach((b,i)=>{
    const x=pad.left+i*(plotW/bars.length)+(plotW/bars.length-bw)/2;
    // Total (background)
    const yTotal=pad.top+plotH-(b.total/maxVal)*plotH;
    ctx.fillStyle=b.col+'33'; ctx.beginPath();
    if(ctx.roundRect)ctx.roundRect(x,yTotal,bw,(b.total/maxVal)*plotH,[3,3,0,0]);else ctx.rect(x,yTotal,bw,(b.total/maxVal)*plotH);
    ctx.fill();
    // Assessed (foreground)
    if(b.assessed>0){
      const yAss=pad.top+plotH-(b.assessed/maxVal)*plotH;
      const bh=(b.assessed/maxVal)*plotH;
      ctx.fillStyle=b.col; if(ctx.roundRect)ctx.roundRect(x,yAss,bw,bh,[3,3,0,0]);else ctx.rect(x,yAss,bw,bh); ctx.fill();
    }
    ctx.fillStyle=b.col; ctx.font='bold 9px Inter,sans-serif'; ctx.textAlign='center';
    ctx.fillText(b.label,x+bw/2,H-pad.bottom+14);
    ctx.fillStyle='#475569'; ctx.font='8px Inter,sans-serif';
    ctx.fillText(b.assessed+'/'+b.total,x+bw/2,H-pad.bottom+25);
  });
}

function toggleGuid(id){
  const el=document.getElementById('guid-'+id), btn=el.previousElementSibling;
  el.classList.toggle('show');
  btn.textContent=el.classList.contains('show')?'− Hide legal obligations, controls & competent persons':'+ Show legal obligations, controls & competent persons';
}

function resetAll(){
  if(!confirm('Reset all material data? This cannot be undone.')) return;
  Object.keys(STATE).forEach(id=>{
    STATE[id]={present:'',likelihood:3,severity:3,coshhDone:'',sdsDone:'',competentAppointed:'',lastReview:'',nextReview:'',notes:'',action:''};
    ['present','like','sev','coshh','notes','review','action'].forEach(f=>{const el=document.getElementById(f+'-'+id);if(el)el.value='';});
    // Reset score display to default
    const item=B6_DATA.flatMap(s=>s.items).find(i=>i.id===id);
    if(item){
      const defScore=(item.likelihood||3)*(item.severity||3);
      const defRating=getRiskRating(defScore);
      const scoreEl=document.getElementById('score-'+id), ratingEl=document.getElementById('rating-'+id), cardEl=document.getElementById('card-'+id);
      if(scoreEl){scoreEl.textContent=defScore;scoreEl.classList.add('has-val');}
      if(ratingEl){ratingEl.textContent=defRating;ratingEl.className='result-risk-pill risk-'+defRating;ratingEl.style.background=RISK_COLORS[defRating]+'22';ratingEl.style.color=RISK_COLORS[defRating];}
      if(cardEl) cardEl.className='mat-card';
    }
  });
  ['orgName','orgSite','orgIndustry','orgLead','orgFramework','orgEmployees'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  document.getElementById('orgJurisdiction').selectedIndex=0;
  document.getElementById('orgDate').value=new Date().toISOString().slice(0,10);
  B6_DATA.forEach(sec=>updateSectionStats(sec.id));
  updateProgress(); updateDashboard();
}

function exportJSON(){
  const payload={meta:{tool:'ESG Hazardous Material Register B.6',version:'2.0',exported:new Date().toISOString(),
    org:{name:document.getElementById('orgName').value,site:document.getElementById('orgSite').value,
      industry:document.getElementById('orgIndustry').value,date:document.getElementById('orgDate').value,
      lead:document.getElementById('orgLead').value,framework:document.getElementById('orgFramework').value,
      jurisdiction:document.getElementById('orgJurisdiction').value,employees:document.getElementById('orgEmployees').value}},data:{}};
  Object.keys(STATE).forEach(id=>{payload.data[id]={...STATE[id]};});
  const blob=new Blob([JSON.stringify(payload,null,2)],{type:'application/json'});
  const url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=(document.getElementById('orgName').value||'ESG').replace(/\s+/g,'_')+'_HazmatRegister_B6_'+new Date().toISOString().slice(0,10)+'.json';
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}

function exportCSV(){
  const rows=[['ID','Section','Material Name','Present','Likelihood','Severity','Risk Score','Risk Rating','COSHH Assessment','Next Review','Priority Action','Notes','Legal Basis','Frameworks']];
  B6_DATA.forEach(sec=>sec.items.forEach(item=>{
    const st=STATE[item.id];
    rows.push([item.id,sec.label,item.name,st.present||'',st.likelihood,st.severity,st.likelihood*st.severity,
      getRiskRating(st.likelihood*st.severity),st.coshhDone||'',st.nextReview||'',st.action||'',st.notes||'',item.legal,item.frameworks]);
  }));
  const csv=rows.map(r=>r.map(c=>'"'+String(c).replace(/"/g,'""')+'"').join(',')).join('\n');
  const blob=new Blob([csv],{type:'text/csv'}), url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=(document.getElementById('orgName').value||'ESG').replace(/\s+/g,'_')+'_HazmatRegister_B6_'+new Date().toISOString().slice(0,10)+'.csv';
  document.body.appendChild(a); a.click(); document.body.removeChild(a); URL.revokeObjectURL(url);
}

function importJSON(){document.getElementById('importFileInput').click();}
function handleImport(event){
  const file=event.target.files[0]; if(!file) return;
  const reader=new FileReader();
  reader.onload=e=>{
    try{
      const p=JSON.parse(e.target.result); if(!p.data) throw new Error('Invalid format');
      if(p.meta?.org){const o=p.meta.org;
        const map={name:'orgName',site:'orgSite',industry:'orgIndustry',date:'orgDate',lead:'orgLead',framework:'orgFramework',jurisdiction:'orgJurisdiction',employees:'orgEmployees'};
        Object.entries(map).forEach(([k,elId])=>{const el=document.getElementById(elId);if(el&&o[k]!==undefined)el.value=o[k];});
      }
      Object.entries(p.data).forEach(([id,st])=>{
        if(!STATE[id]) return; STATE[id]={...STATE[id],...st};
        const setEl=(f,v)=>{const el=document.getElementById(f+'-'+id);if(el)el.value=v||'';};
        setEl('present',st.present); setEl('like',st.likelihood); setEl('sev',st.severity);
        setEl('coshh',st.coshhDone); setEl('notes',st.notes); setEl('review',st.nextReview); setEl('action',st.action);
        // Update display
        const score=(st.likelihood||3)*(st.severity||3), rating=getRiskRating(score);
        const scoreEl=document.getElementById('score-'+id), ratingEl=document.getElementById('rating-'+id), cardEl=document.getElementById('card-'+id);
        if(scoreEl){scoreEl.textContent=score;scoreEl.classList.add('has-val');}
        if(ratingEl){ratingEl.textContent=rating;ratingEl.className='result-risk-pill risk-'+rating;ratingEl.style.background=RISK_COLORS[rating]+'22';ratingEl.style.color=RISK_COLORS[rating];}
        if(cardEl&&st.present){cardEl.className='mat-card risk-'+rating+' has-data';}
      });
      B6_DATA.forEach(sec=>updateSectionStats(sec.id));
      updateProgress(); updateDashboard();
      alert('Imported successfully.');
    }catch(err){alert('Import failed: '+err.message);}
  };
  reader.readAsText(file); event.target.value='';
}
window.addEventListener('resize',()=>{if(document.getElementById('panel-dashboard').classList.contains('active'))drawCharts({});});
