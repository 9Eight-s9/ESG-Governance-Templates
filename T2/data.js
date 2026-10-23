var LOGO_B64 = ''; // injected at build time

var SUPPLIER_TIERS = [
  { id:'t1', label:'Tier 1 — Strategic',     desc:'Top 20% by spend · Critical to operations · Direct suppliers',    color:'#dc2626' },
  { id:'t2', label:'Tier 2 — Significant',   desc:'Top 50% by spend · Moderate substitutability',                    color:'#d97706' },
  { id:'t3', label:'Tier 3 — Standard',      desc:'Remaining suppliers · Lower ESG exposure',                         color:'#16a34a' },
  { id:'t4', label:'Sub-supplier (flow-down)',desc:'Tier 1 supplier\'s own material suppliers — indirect exposure',    color:'#7c3aed' }
];

var SCORE_CRITERIA = {
  env: [
    { id:'e1', label:'GHG Emissions Disclosure (Scope 1 & 2)', weight:15, max:5,
      guidance:'5=Verified S1+S2 with limited/reasonable assurance · 4=Reported S1+S2, no assurance · 3=S1 only · 2=Estimated/partial · 1=No disclosure',
      framework:'CSRD ESRS E1 · GHG Protocol · CDP · SBTi' },
    { id:'e2', label:'Scope 3 Disclosure & Supply Chain Engagement', weight:10, max:5,
      guidance:'5=All material S3 categories quantified + supplier engagement programme · 4=Material categories quantified · 3=Screening estimate only · 2=Committed but not started · 1=None',
      framework:'GHG Protocol Scope 3 · CSRD ESRS E1 · BRSR Core' },
    { id:'e3', label:'Science-Based or Net-Zero Target', weight:10, max:5,
      guidance:'5=SBTi validated target (near-term + net-zero) · 4=SBTi committed · 3=Internal net-zero target set · 2=Aspirational language only · 1=No target',
      framework:'SBTi Corporate Standard · ESRS E1 · CDP A-List' },
    { id:'e4', label:'Energy Efficiency & Renewable Energy', weight:8, max:5,
      guidance:'5=>=80% renewable energy + documented efficiency programme · 4=50-79% renewable · 3=Active efficiency programme, <50% renewable · 2=Partial measures · 1=No programme',
      framework:'ESRS E1 · RE100 · BRSR Core Energy KPI' },
    { id:'e5', label:'Water Management', weight:5, max:5,
      guidance:'5=Water stewardship programme with site-level targets in water-stressed areas · 4=Water consumption tracked and reported · 3=Basic metering · 2=Committed only · 1=Not tracked',
      framework:'ESRS E3 · GRI 303 · CDP Water · BRSR Core' },
    { id:'e6', label:'Waste & Circular Economy', weight:5, max:5,
      guidance:'5=Zero-waste-to-landfill achieved/targeted + circular design · 4=Waste tracking + active reduction programme · 3=Recycling only · 2=Contractor managed, no tracking · 1=No programme',
      framework:'ESRS E5 · GRI 306 · BRSR Core Waste KPI' },
    { id:'e7', label:'Chemical & Hazardous Material Management', weight:5, max:5,
      guidance:'5=Full REACH/COSHH compliance + substitution programme for substances of concern · 4=Compliant, registry maintained · 3=Legally compliant only · 2=Partial compliance · 1=Unknown',
      framework:'ESRS E2 · REACH · COSHH · RoHS · WEEE' }
  ],
  soc: [
    { id:'s1', label:'ILO Core Labour Standards Compliance', weight:12, max:5,
      guidance:'5=Third-party audited compliance with all 8 ILO conventions · 4=Self-declared compliance with documented evidence · 3=Code of conduct references ILO · 2=Partial · 1=No evidence',
      framework:'UN Guiding Principles · ILO Core Conventions · ESRS S2 · HRDD Directive' },
    { id:'s2', label:'Living Wage & Fair Pay', weight:8, max:5,
      guidance:'5=Living wage paid to all direct workers + supply chain monitoring · 4=Living wage paid to direct workers · 3=At or above national minimum wage with evidence · 2=Minimum wage only · 1=Below minimum or unknown',
      framework:'ESRS S1 · GRI 202 · ETI Base Code · Living Wage Foundation' },
    { id:'s3', label:'Health & Safety Performance (LTIR/TRIR)', weight:8, max:5,
      guidance:'5=LTIR <0.5 + ISO 45001 certified + near-miss reporting culture · 4=LTIR <1.0 + ISO 45001 · 3=LTIR <2.0 + documented OHS system · 2=Reactive, no system · 1=Incidents undisclosed or LTIR >5',
      framework:'ISO 45001 · ESRS S1 · GRI 403 · BRSR Core OHS KPI' },
    { id:'s4', label:'Diversity, Equity & Inclusion', weight:5, max:5,
      guidance:'5=Board-level DEI targets + pay gap disclosed + supply chain DEI programme · 4=Internal DEI programme + pay gap disclosed · 3=Policy and some metrics · 2=Policy only · 1=No disclosure',
      framework:'ESRS S1 · GRI 405 · BRSR Core · WEPs (UN Women)' },
    { id:'s5', label:'Human Rights Due Diligence (HRDD)', weight:8, max:5,
      guidance:'5=Formal HRDD process per UN Guiding Principles + remedy mechanism · 4=HRDD conducted + salient issues identified · 3=Human rights policy + risk mapping · 2=Policy only · 1=No HRDD',
      framework:'EU CSDDD (CS3D) · ESRS S2/S3/S4 · UN Guiding Principles · German LkSG' },
    { id:'s6', label:'Modern Slavery & Forced Labour', weight:5, max:5,
      guidance:'5=Modern Slavery Act statement + supply chain audit programme + remedy cases · 4=Statement + tier 1 audit coverage · 3=Statement published · 2=Policy but no statement · 1=No action',
      framework:'UK Modern Slavery Act · EU Forced Labour Regulation · ESRS S2 · ILO C29/C105' }
  ],
  gov: [
    { id:'g1', label:'ESG Governance & Board Oversight', weight:5, max:5,
      guidance:'5=Board ESG committee + ESG-linked executive pay + annual ESG report · 4=Board oversight + ESG in remuneration · 3=ESG in management only · 2=Informal responsibility · 1=No governance',
      framework:'ESRS G1 · GRI 2 · ISSB S1 · BRSR Core Governance KPI' },
    { id:'g2', label:'Anti-Bribery & Anti-Corruption', weight:5, max:5,
      guidance:'5=ABC policy + third-party audited compliance + incident reporting · 4=ABC policy + internal audit · 3=Policy only · 2=Informal · 1=No policy',
      framework:'UK Bribery Act · FCPA · ESRS G1 · UN Convention Against Corruption' },
    { id:'g3', label:'Data Privacy & Cybersecurity', weight:3, max:5,
      guidance:'5=ISO 27001 certified + GDPR/data protection compliant + breach response plan · 4=Compliant + documented security programme · 3=Compliant, no formal programme · 2=Partial · 1=Unknown',
      framework:'GDPR · ISO 27001 · ESRS G1 · BRSR Core' },
    { id:'g4', label:'Transparency & ESG Reporting Quality', weight:3, max:5,
      guidance:'5=Externally assured ESG report aligned to GRI/ESRS/ISSB + CDP responder · 4=ESG report aligned to GRI or equivalent · 3=Sustainability section in annual report · 2=Ad hoc disclosure · 1=No ESG reporting',
      framework:'GRI Standards · ESRS · ISSB S1 · CDP · ISAE 3000' }
  ],
  engagement: [
    { id:'n1', label:'Responsiveness to ESG Assessment Requests', weight:2, max:5,
      guidance:'5=Responds within 5 days, complete data · 4=Responds within 14 days · 3=Responds within 30 days · 2=Responds with incomplete data · 1=Non-responsive (auto score: 1)',
      framework:'ESRS VSME · BRSR Core S-E · Supplier Code of Conduct' },
    { id:'n2', label:'Collaboration & Improvement Commitment', weight:2, max:5,
      guidance:'5=Joint emissions reduction roadmap agreed + KPIs tracked · 4=Willing to engage + plan in progress · 3=Open to discussion · 2=Passive compliance only · 1=No engagement',
      framework:'ESRS S2 · SBTi Supply Chain · Science-Based Targets for Suppliers' }
  ]
};

// Pre-populated example suppliers for demo
var DEMO_SUPPLIERS = [
  { id:'sup001', name:'Apex Manufacturing Ltd', country:'UK', sector:'Manufacturing', tier:'t1', spend:4200000, spend_currency:'GBP', contact:'Sarah Chen', scores:{e1:4,e2:3,e3:3,e4:3,e5:2,e6:3,e7:4,s1:4,s2:3,s3:4,s4:3,s5:3,s6:4,g1:3,g2:4,g3:3,g4:3,n1:4,n2:3}, flags:'', action:'', assessed:'2026-03-15', next:'2027-03-15' },
  { id:'sup002', name:'Green Logistics GmbH', country:'Germany', sector:'Logistics', tier:'t1', spend:2800000, spend_currency:'EUR', contact:'Marco Bauer', scores:{e1:5,e2:4,e3:4,e4:5,e5:3,e6:4,e7:3,s1:5,s2:4,s3:5,s4:4,s5:4,s6:4,g1:4,g2:4,g3:4,g4:5,n1:5,n2:4}, flags:'', action:'', assessed:'2026-01-20', next:'2027-01-20' },
  { id:'sup003', name:'TechSource Pvt Ltd', country:'India', sector:'IT Services', tier:'t2', spend:950000, spend_currency:'INR', contact:'Priya Mehta', scores:{e1:2,e2:1,e3:1,e4:2,e5:3,e6:2,e7:3,s1:3,s2:2,s3:3,s4:2,s5:2,s6:2,g1:2,g2:3,g3:3,g4:2,n1:3,n2:2}, flags:'Living wage below benchmark · No SBTi commitment · No HRDD', action:'Engagement letter sent · Request BRSR Core disclosure · Target SBTi committed by Q2 2027', assessed:'2025-11-10', next:'2026-11-10' }
];

var S1_TIERS_DATA = {};
SUPPLIER_TIERS.forEach(function(t){ S1_TIERS_DATA[t.id] = []; });

var ALL_CRITERIA = [];
['env','soc','gov','engagement'].forEach(function(pillar){
  SCORE_CRITERIA[pillar].forEach(function(c){ ALL_CRITERIA.push({...c, pillar:pillar}); });
});

// State
var SUPPLIERS = {}; // id -> supplier object
var ACTIVE_SUPPLIER = null;
