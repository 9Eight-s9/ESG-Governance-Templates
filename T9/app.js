/* Independent Monthly Tracker. No dependencies on other tool folders. */
'use strict';
(() => {
  const DATA=window.ESG_DATA;
  const KIND='monthly';
  const TOOL='Everyday ESG Monthly Tracker';
  const STORAGE_KEY='snk-esg-standalone-monthly-tracker-v1';
  function fresh(){return {monthly:{year:String(new Date().getFullYear()),indicators:[]}};}
  function validate(input) {
    const fail=()=>{throw new Error('Invalid backup entries. Current data were kept.');};
    const obj=v=>{if(!v||typeof v!=='object'||Array.isArray(v))fail();return v;};
    const str=(v,max=4000)=>{if(typeof v!=='string'||v.length>max)fail();return v;};
    const num=v=>{str(v,100);if(v!==''&&!numeric(v))fail();return v;};
    const year=v=>{str(v,4);if(v!==''&&!/^(19\d{2}|20\d{2}|21\d{2}|2200)$/.test(v))fail();return v;};
    const date=v=>{str(v,10);if(!dateValid(v))fail();return v;};
    const bool=v=>{if(typeof v!=='boolean')fail();return v;};
    const choice=(v,items)=>{if(!items.includes(v))fail();return v;};
    const key=v=>{str(v,100);if(!/^[a-zA-Z0-9_-]+$/.test(v))fail();return v;};
    const list=(v,max,fn)=>{if(!Array.isArray(v)||v.length>max)fail();const a=v.map(fn);if(new Set(a.map(r=>r.id)).size!==a.length)fail();return a;};
    obj(input);
    function indicatorRow(r) {
      obj(r);if(!Array.isArray(r.values)||r.values.length!==12)fail();return {id:key(r.id),name:str(r.name),unit:str(r.unit,100),pillar:choice(r.pillar??'Other',['Environmental','Social','Governance','Other']),baseline:num(r.baseline),target:num(r.target),direction:choice(r.direction,['Lower','Higher','Observe']),values:r.values.map(num),notes:str(r.notes)};
    }
    const m=obj(input.monthly);return {monthly:{year:year(m.year),indicators:list(m.indicators,60,indicatorRow)}};
  }
  function indicatorResult(r) {
    const i=r.values.reduce((last,v,j)=>numeric(v)?j:last,-1);
    if(i<0)return {latest:null,month:null,change:null,percent:null};
    const latest=Number(r.values[i]);const change=numeric(r.baseline)?latest-Number(r.baseline):null;
    return {latest,month:DATA.months[i],change,percent:change!==null&&Number(r.baseline)!==0?change/Number(r.baseline)*100:null};
  }

  function renderIndicators() {
    $('#tracking-year').value=state.monthly.year;
    $('#indicator-rows').innerHTML=state.monthly.indicators.length?state.monthly.indicators.map(r=>`<article class="card indicator-row" data-row="${r.id}"><span class="tag">User-defined indicator</span><div class="grid three">${field('Indicator name','indicators','name',r.name)}${field('Unit','indicators','unit',r.unit,'text','maxlength="100"')}${select('ESG pillar','indicators','pillar',r.pillar,['Environmental','Social','Governance','Other'])}${select('Desired direction','indicators','direction',r.direction,['Lower','Higher','Observe'])}${field('Comparable monthly baseline','indicators','baseline',r.baseline,'number')}${field('Monthly target (optional)','indicators','target',r.target,'number')}${field('Measurement method / circumstances','indicators','notes',r.notes,'textarea')}</div><div class="table-scroll"><table class="monthly-table"><caption>${esc(r.name||'Indicator')} · <span class="year-label">${esc(state.monthly.year||'Year not set')}</span></caption><thead><tr>${DATA.months.map(m=>`<th scope="col">${m}</th>`).join('')}</tr></thead><tbody><tr>${r.values.map((v,i)=>`<td><input type="number" min="0" step="any" data-group="values" data-index="${i}" aria-label="${esc(r.name||'Indicator')} ${DATA.months[i]}" value="${esc(v)}"></td>`).join('')}</tr></tbody></table></div><div id="monthly-result-${r.id}" class="monthly-result"></div><div class="monthly-chart" id="chart-${r.id}" aria-hidden="true"></div><div class="row-actions"><button class="danger" data-command="remove-indicator" data-id="${r.id}">Remove indicator</button></div></article>`).join(''):'<div class="empty"><h3>No indicators yet</h3><p>Add an indicator with a unit, baseline and monthly observations. Chapter 24 recommends three non-carbon indicators; Chapters 25–26 encourage meaningful evidence and self-reflection.</p></div>';
    refreshIndicators();
  }

  function refreshIndicators() {
    state.monthly.indicators.forEach(r=>{
      const v=indicatorResult(r);const el=$('#monthly-result-'+r.id), chart=$('#chart-'+r.id);if(!el)return;
      const missing=12-r.values.filter(numeric).length;
      let text=v.latest===null?'No observations entered.':`Latest populated month: ${v.month} · ${fmt(v.latest)} ${r.unit}. `;
      if(!r.name.trim()||!r.unit.trim())text+=' Define the indicator name and unit before interpreting the values.';
      else if(v.change!==null){text+=` Change from baseline: ${v.change>0?'+':''}${fmt(v.change)} ${r.unit}`+(v.percent===null?' (percentage undefined at zero baseline).':` (${v.percent>0?'+':''}${fmt(v.percent)}%).`);}
      else if(v.latest!==null)text+=' Add a comparable monthly baseline to see change.';
      if(numeric(r.target)&&v.latest!==null&&r.name.trim()&&r.unit.trim()&&r.direction!=='Observe')text+=' '+((r.direction==='Lower'?v.latest<=Number(r.target):v.latest>=Number(r.target))?'Your target is met.':'Your target is not yet met.');
      el.textContent=text+` ${missing} month(s) missing. No annual total is inferred.`;
      const max=Math.max(...r.values.filter(numeric).map(Number),1);
      chart.innerHTML=r.values.map((n,i)=>`<div class="bar-column ${numeric(n)?'':'missing'}"><i style="height:${numeric(n)?Math.max(2,Number(n)/max*85):2}%"></i><small>${DATA.months[i]}</small></div>`).join('');
    });
  }
  const $=(s,root=document)=>root.querySelector(s);
  const $$=(s,root=document)=>[...root.querySelectorAll(s)];
  const esc=v=>String(v??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const id=()=> 'user-'+(window.crypto?.randomUUID?.()||Date.now().toString(36)+Math.random().toString(36).slice(2));
  const fmt=v=>Number.isFinite(v)?v.toLocaleString(undefined,{maximumFractionDigits:4}):'—';
  const numeric=v=>typeof v==='string'&&v.trim()!==''&&Number.isFinite(Number(v))&&Number(v)>=0;
  const dateValid=v=>v===''||/^\d{4}-\d{2}-\d{2}$/.test(v)&&!Number.isNaN(Date.parse(v))&&new Date(v+'T12:00:00Z').toISOString().slice(0,10)===v;
  const stat=(v,label)=>`<div class="stat"><strong>${esc(v)}</strong><span>${esc(label)}</span></div>`;
  function field(label,group,key,value,type='text',extra='') {
    const attrs=`data-group="${group}" data-key="${key}" ${type==='number'?'min="0" step="any"':''} ${extra}`;
    return `<label>${label}${type==='textarea'?`<textarea ${attrs} maxlength="4000">${esc(value)}</textarea>`:`<input type="${type}" ${attrs} value="${esc(value)}" ${type==='text'&&!extra.includes('maxlength')?'maxlength="4000"':''}>`}</label>`;
  }
  function select(label,group,key,value,options) {
    return `<label>${label}<select aria-label="${esc(label)}" data-group="${group}" data-key="${key}">${options.map(v=>`<option ${v===value?'selected':''}>${esc(v)}</option>`).join('')}</select></label>`;
  }
  let state=fresh(),saveBlocked=false,timer;
  try{const raw=localStorage.getItem(STORAGE_KEY);if(raw)state=validate(JSON.parse(raw));}catch{saveBlocked=true;}
  function notify(message){$('#notice').textContent=message;clearTimeout(timer);timer=setTimeout(()=>$('#notice').textContent='',6500);}
  function save(){
    if(saveBlocked){$('#save-status').textContent='Stored entries could not be read. Autosave is paused. Export your current entries, then Import or Reset to replace the stored record.';return;}
    try{localStorage.setItem(STORAGE_KEY,JSON.stringify(state));$('#save-status').textContent='Saved for this tool in this browser · '+new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});}
    catch{$('#save-status').textContent='Browser saving is unavailable. Export a backup before closing.';}
  }
  function renderTool(){renderIndicators();}
  function download(content,name,type){const url=URL.createObjectURL(new Blob([content],{type})),a=document.createElement('a');a.href=url;a.download=name;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1500);}
  function csvCell(v){let s=String(v??'');if(/^\s*[=+\-@]/.test(s))s="'"+s;return '"'+s.replace(/"/g,'""')+'"';}
  function flatten(value,path='',rows=[]){
    if(value&&typeof value==='object')Object.entries(value).forEach(([k,v])=>flatten(v,path?path+'.'+k:k,rows));
    else rows.push([path,value??'']);return rows;
  }
  function csvRows(){
    const rows=[['Tool',TOOL],['Exported',new Date().toISOString()],['Field / record path','Value'],...flatten(state)];
    if(KIND==='carbon'){rows.push([],['Source ID','Source','kg CO2e','Status']);state.carbon.forEach(r=>{const v=rowResult(r);rows.push([r.id,r.name,v.value,v.status]);});rows.push(['Included subtotal kg CO2e',carbonSummary(state).total]);}
    if(KIND==='monthly'){rows.push([],['Indicator','Unit','Latest month','Latest value','Change','Change %']);state.monthly.indicators.forEach(r=>{const v=indicatorResult(r);rows.push([r.name,r.unit,v.month,v.latest,v.change,v.percent]);});}
    return rows;
  }
  function parseBackup(payload){
    if(payload?.tool===TOOL&&payload.version===DATA.version)return validate(payload.state);
    if(payload?.tool==='Everyday ESG Action Toolkit'&&[1,2].includes(payload.version))return validate(payload.state);
    throw new Error('Use a backup from this tool or the earlier combined toolkit.');
  }
  async function importFile(file){
    if(!file)return;try{
      if(file.size>2*1024*1024)throw new Error('Maximum backup size is 2 MB.');
      const next=parseBackup(JSON.parse(await file.text()));
      if(!confirm('Replace this tool’s entries with the validated backup? Other tools are unaffected. Export first if needed.'))return;
      state=next;saveBlocked=false;renderTool();save();notify('Imported this tool’s entries. Derived results were recalculated.');
    }catch(e){notify('Import failed. '+e.message);}
  }
  function route(){const guide=location.hash==='#sources';$('#sources').hidden=!guide;$('#'+KIND).hidden=guide;$$('.tabs a').forEach(a=>{if(a.hash===(guide?'#sources':'#'+KIND))a.setAttribute('aria-current','page');else a.removeAttribute('aria-current');});}
  function updateInput(e){
    const el=e.target,group=el.dataset.group,key=el.dataset.key;if(!group)return;
    const row=el.closest('[data-row]'),rid=row?.dataset.row;
    const target=group==='profile'?state.profile:group==='days'?state.challenge?.days.find(r=>r.id===rid):group==='values'||group==='indicators'?state.monthly?.indicators.find(r=>r.id===rid):state[group]?.find(r=>r.id===rid);if(!target)return;
    let value=el.type==='checkbox'?el.checked:el.value;
    if(el.type==='number'){const invalid=el.validity.badInput||value!==''&&!numeric(value)||key==='year'&&value!==''&&!/^(19\d{2}|20\d{2}|21\d{2}|2200)$/.test(value);el.setCustomValidity(invalid?'Enter a valid non-negative number (year 1900–2200).':'');if(invalid)value='';}
    if(group==='values')target.values[Number(el.dataset.index)]=value;else target[key]=value;
    if(KIND==='carbon'){refreshCarbon();const p=state.profile,end=$('[data-key="to"]');end?.setCustomValidity(p.from&&p.to&&p.to<p.from?'End date must be on or after start date.':'');}
    if(KIND==='checklist'){refreshActionProgress();if(key==='title')$('.row-title h3',row).textContent=value||'Your action';}
    if(KIND==='challenge'){if(key==='activity'){target.origin='User entry';if(!value.trim())target.done=false;const cb=$('[data-key="done"]',row);cb.disabled=!value.trim();cb.checked=target.done;$('#origin-'+rid).textContent=target.origin;}row.classList.toggle('done',target.done);refreshChallenge();}
    if(KIND==='monthly')refreshIndicators();save();
  }
  function command(cmd,rid){
    const stamp=new Date().toISOString().slice(0,10),prefix=DATA.toolId+'_'+stamp;
    if(cmd==='export'){try{validate(state);}catch{notify('Check invalid numbers and dates before exporting.');return;}download(JSON.stringify({tool:TOOL,version:DATA.version,exportedAt:new Date().toISOString(),state},null,2),prefix+'.json','application/json');}
    else if(cmd==='csv')download('\uFEFF'+csvRows().map(r=>r.map(csvCell).join(',')).join('\r\n'),prefix+'.csv','text/csv;charset=utf-8');
    else if(cmd==='import')$('#import-file').click();
    else if(cmd==='print')window.print();
    else if(cmd==='reset'){if(!confirm('Reset this tool’s entries? Other tools are unaffected. Export first if needed.'))return;state=fresh();saveBlocked=false;renderTool();save();notify('This tool was reset.');}
    else if(cmd==='add-carbon'&&KIND==='carbon'){if(state.carbon.length>=100)return notify('Maximum 100 sources.');state.carbon.push({...carbonTemplate({id:id(),name:'',unit:''}),origin:'User entry'});renderTool();save();}
    else if(cmd==='add-action'&&KIND==='checklist'){if(state.actions.length>=300)return notify('Maximum 300 actions.');state.actions.push({id:id(),title:'',text:'',origin:'User entry',pillar:'Environmental',status:'Not started',baseline:'',target:'',owner:'',review:'',notes:''});$('#pillar-filter').value='All';$('#action-search').value='';renderTool();save();}
    else if(cmd==='add-indicator'&&KIND==='monthly'){if(state.monthly.indicators.length>=60)return notify('Maximum 60 indicators.');state.monthly.indicators.push({id:id(),name:'',unit:'',pillar:'Other',baseline:'',target:'',direction:'Observe',values:Array(12).fill(''),notes:''});renderTool();save();}
    else if(cmd.startsWith('remove-')){if(!confirm('Remove this personal entry?'))return;if(KIND==='carbon')state.carbon=state.carbon.filter(r=>r.id!==rid||r.origin!=='User entry');if(KIND==='checklist')state.actions=state.actions.filter(r=>r.id!==rid||r.origin!=='User entry');if(KIND==='monthly')state.monthly.indicators=state.monthly.indicators.filter(r=>r.id!==rid);renderTool();save();}
  }
  document.addEventListener('input',updateInput);
  document.addEventListener('click',e=>{const b=e.target.closest('[data-command]');if(b)command(b.dataset.command,b.dataset.id);});
  document.addEventListener('change',e=>{
    const el=e.target;
    if(el.id==='import-file'){importFile(el.files[0]);el.value='';}
    if(KIND==='checklist'&&el.id==='pillar-filter')renderActions();
    if(KIND==='challenge'){
      if(el.id==='challenge-start'){state.challenge.start=el.value;renderChallenge();save();}
      if(el.dataset.copyDay&&el.value){const a=DATA.actions.find(a=>a.id===el.value),d=state.challenge.days.find(d=>d.id===el.dataset.copyDay);if(a&&d){d.activity=a.title+': '+a.text;d.origin=a.origin+' · copied source practice';d.done=false;renderChallenge();save();}}
    }
    if(KIND==='monthly'&&el.id==='tracking-year'){
      if(!/^(19\d{2}|20\d{2}|21\d{2}|2200)$/.test(el.value)){el.value=state.monthly.year;notify('Enter a year from 1900 to 2200.');return;}
      if(state.monthly.indicators.some(r=>r.values.some(numeric))&&!confirm('Relabel existing observations with this year? This does not create a new set of yearly data.')){el.value=state.monthly.year;return;}
      state.monthly.year=el.value;$$('.year-label').forEach(l=>l.textContent=el.value);save();
    }
  });
  if(KIND==='checklist')$('#action-search').addEventListener('input',renderActions);
  window.addEventListener('hashchange',route);
  let printing=false,closed=[],filter='',search='';
  window.addEventListener('beforeprint',()=>{
    if(printing)return;printing=true;
    if(KIND==='checklist'){filter=$('#pillar-filter').value;search=$('#action-search').value;$('#pillar-filter').value='All';$('#action-search').value='';renderActions();}
    closed=$$('details:not([open])');closed.forEach(d=>d.open=true);
    $$('textarea').forEach(t=>{const p=document.createElement('div');p.className='print-text';p.textContent=t.value||'—';t.after(p);});
  });
  window.addEventListener('afterprint',()=>{closed.forEach(d=>d.open=false);$$('.print-text').forEach(p=>p.remove());if(KIND==='checklist'){$('#pillar-filter').value=filter;$('#action-search').value=search;renderActions();}printing=false;});
  $('#chapter-reference').innerHTML=DATA.chapters.map(ch=>`<article class="card chapter-reference"><span class="tag">${esc(ch.pillar)} · Chapter ${ch.number}</span><h3>${esc(ch.title)}</h3><details><summary>Read the complete source chapter</summary>${ch.paragraphs.map(p=>`<p>${esc(p)}</p>`).join('')}</details></article>`).join('');
  const logo=$('#logo-slot img');if(logo)logo.addEventListener('error',()=>{$('#logo-slot').textContent='Logo unavailable: check assets/logo.png';});
  renderTool();route();if(saveBlocked)save();
  window.ESG_CORE=Object.freeze({fresh,validate,parseBackup,csvCell});
})();
