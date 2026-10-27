/* Independent Carbon Calculator. No dependencies on other tool folders. */
'use strict';
(() => {
  const DATA=window.ESG_DATA;
  const KIND='carbon';
  const TOOL='Everyday ESG Carbon Calculator';
  const STORAGE_KEY='snk-esg-standalone-carbon-calculator-v1';
  const carbonTemplate=row=>({...row,origin:'Chapter 24 table',quantity:'',factor:'',factorUnit:row.unit,source:'',year:'',region:'',method:'',quality:'Measured',notes:'',include:true});
  function fresh(){return {profile:{name:'',location:'',from:'',to:'',boundary:'Household',allocation:'',omissions:''},carbon:DATA.carbonSources.map(carbonTemplate)};}
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
    function carbonRow(r) {
      obj(r);const out={id:key(r.id),name:str(r.name),unit:str(r.unit,100),origin:choice(r.origin,['Chapter 24 table','User entry']),quantity:num(r.quantity),factor:num(r.factor),factorUnit:str(r.factorUnit,100),source:str(r.source),year:year(r.year),region:str(r.region),method:str(r.method),quality:choice(r.quality,['Measured','Estimated']),notes:str(r.notes),include:bool(r.include)};
      if(out.origin!=='User entry'){const source=DATA.carbonSources.find(s=>s.id===out.id);if(!source||source.name!==out.name)fail();}return out;
    }
    const p=obj(input.profile); const result={profile:{name:str(p.name),location:str(p.location),from:date(p.from),to:date(p.to),boundary:choice(p.boundary,['Household','Person','Other']),allocation:str(p.allocation),omissions:str(p.omissions)},carbon:list(input.carbon,100,carbonRow)}; if(result.profile.from&&result.profile.to&&result.profile.to<result.profile.from) fail(); return result;
  }
  function rowResult(r) {
    if(!r.include)return {value:null,status:'Excluded by you'};
    if(!r.name.trim()||!r.unit.trim()||!numeric(r.quantity)||!numeric(r.factor))return {value:null,status:'Incomplete: name, quantity, activity unit and factor required'};
    if(r.unit.trim().toLowerCase()!==r.factorUnit.trim().toLowerCase())return {value:null,status:'Incomplete: activity and factor denominator units must match'};
    if(!r.source.trim()||!r.region.trim()||!r.method.trim()||! /^(19\d{2}|20\d{2}|21\d{2}|2200)$/.test(r.year))return {value:null,status:'Incomplete: factor source, year, geography and method required'};
    const value=Number(r.quantity)*Number(r.factor);
    return Number.isFinite(value)?{value,status:'Documented entry · '+r.quality}:{value:null,status:'Invalid: numeric result exceeds supported range'};
  }

  function carbonSummary(s) {
    const results=s.carbon.map(rowResult), values=results.filter(r=>r.value!==null);
    const total=values.reduce((a,r)=>a+r.value,0);
    return {total:values.length&&Number.isFinite(total)?total:null,ready:values.length,incomplete:results.filter((r,i)=>r.value===null&&s.carbon[i].include).length,excluded:s.carbon.filter(r=>!r.include).length};
  }

  function renderProfile() {
    const p=state.profile;
    $('#profile').innerHTML=field('Household / person name','profile','name',p.name)+field('Location','profile','location',p.location)+select('Boundary','profile','boundary',p.boundary,['Household','Person','Other'])+field('Period start','profile','from',p.from,'date')+field('Period end','profile','to',p.to,'date')+field('Allocation / shared-use method','profile','allocation',p.allocation)+field('Omissions, uncertainty & circumstances','profile','omissions',p.omissions,'textarea');
  }

  function renderCarbon() {
    $('#carbon-rows').innerHTML=state.carbon.map(r=>`<article class="card carbon-row" data-row="${r.id}"><div class="row-title"><div><span class="tag">${esc(r.origin)}</span><h3>${esc(r.name||'Your source')}</h3></div><div class="result" id="result-${r.id}"></div></div><div class="grid three">${r.origin==='User entry'?field('Source name','carbon','name',r.name):''}${field('Activity quantity','carbon','quantity',r.quantity,'number')}${field('Activity unit','carbon','unit',r.unit,'text','maxlength="100"')}${field('Factor · kg CO₂e per unit','carbon','factor',r.factor,'number')}${field('Factor denominator unit','carbon','factorUnit',r.factorUnit,'text','maxlength="100"')}${field('Factor source / document reference','carbon','source',r.source)}${field('Factor year','carbon','year',r.year,'number','max="2200"')}${field('Factor geography','carbon','region',r.region)}${select('Activity data quality','carbon','quality',r.quality,['Measured','Estimated'])}</div><details><summary>Method, evidence & assumptions (required for calculation)</summary><div class="grid two">${field('Method / scope / compatibility notes','carbon','method',r.method,'textarea')}${field('Evidence, allocation, overlap & uncertainty','carbon','notes',r.notes,'textarea')}</div></details><div class="row-actions"><label class="check"><input type="checkbox" data-group="carbon" data-key="include" ${r.include?'checked':''}>Include this source</label>${r.origin==='User entry'?`<button class="danger" data-command="remove-carbon" data-id="${r.id}">Remove source</button>`:''}</div></article>`).join('');
    refreshCarbon();
  }

  function refreshCarbon() {
    const s=carbonSummary(state);
    $('#carbon-summary').innerHTML=stat(s.total===null?'—':fmt(s.total),'Included subtotal · kg CO₂e')+stat(s.total===null?'—':fmt(s.total/1000),'Included subtotal · tonnes CO₂e')+stat(s.ready+' / '+state.carbon.length,'Documented rows')+stat(s.incomplete+' incomplete',s.excluded+' excluded · incomplete rows omitted');
    state.carbon.forEach(r=>{const el=$('#result-'+r.id);if(!el)return;const v=rowResult(r);el.innerHTML=`${v.value===null?'—':fmt(v.value)+' kg CO₂e'}<small>${esc(v.status)}</small>`;});
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
  function renderTool(){renderProfile();renderCarbon();}
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
