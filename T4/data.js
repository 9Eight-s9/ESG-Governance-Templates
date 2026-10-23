/**
 * ESG vs CSR Comparison Matrix B.4 — data.js v2.0
 * 22 dimensions: 6 Foundational · 6 Operational · 5 Regulatory · 5 Strategic
 */

const B4_DATA = {

  audiences: [
    { icon:'🏛', role:'Board Directors & Non-Executives',
      need:'Need to understand why "we already do CSR" is not a valid defence against ESG regulatory obligations, and what board-level ESG governance actually requires versus a CSR committee.',
      sections:'All four sections — particularly B (governance accountability) and C (regulatory obligations)' },
    { icon:'💼', role:'CFOs & Finance Directors',
      need:'Need to explain to the audit committee why ESG disclosures require assurance, why cost of capital is affected by ESG ratings, and why M&A due diligence now includes ESG data rooms.',
      sections:'Section B (assurance, financial integration) and Section D (capital, M&A, index)' },
    { icon:'📊', role:'Institutional Investors & Analysts',
      need:'Need to articulate to portfolio companies why their CSR report does not satisfy ESG data requests, and what specific data points are required under which frameworks.',
      sections:'Section A (information architecture) and Section D (capital markets, index)' },
    { icon:'🎓', role:'MBA Students & Academics',
      need:'Need the intellectual history and philosophical distinction to understand the field, not just the operational differences. ESG emerged from finance; CSR from ethics — this shapes everything.',
      sections:'Section A (origin, purpose) and Section C (regulatory evolution)' },
    { icon:'⚖️', role:'Legal & Compliance Teams',
      need:'Need to understand precisely which ESG obligations are legally enforceable (with civil/criminal consequences) and which CSR obligations are advisory. Critical for multi-jurisdictional compliance planning.',
      sections:'Section C (all five regulatory dimensions) — primary reference for compliance use' },
    { icon:'🌏', role:'Emerging Market Practitioners',
      need:'Need to understand how the ESG/CSR distinction plays out in India (BRSR vs Companies Act CSR spending), Singapore (SGX requirements), and across ASEAN without assuming EU frameworks apply directly.',
      sections:'Section C (India, Asia-Pacific dimensions) and Section B (legal status)' },
    { icon:'📢', role:'Communications & PR Teams',
      need:'Need to understand why describing ESG disclosures as "our CSR report" creates regulatory and greenwashing risk, and how to communicate ESG credibly without conflating the two disciplines.',
      sections:'Section A (negative disclosure) and Section D (greenwashing liability)' },
    { icon:'🏭', role:'Supply Chain & Procurement',
      need:'Need to understand why supplier ESG assessments (EcoVadis, CDP Supply Chain, CSDDD HRDD) are legal obligations under ESG frameworks, while CSR supplier codes are voluntary aspirations.',
      sections:'Section C (supply chain legal obligations) and Section B (scope of coverage)' },
  ],

  sections: [
    {
      id:'A', label:'Foundational Differences', icon:'🏛', color:'#1d4ed8', colorLight:'#eff6ff',
      desc:'The philosophical and structural origins that distinguish ESG from CSR at the most fundamental level.',
      dimensions: [
        {
          id:'A01', label:'Origin & Intellectual Heritage',
          esg:'Investor-led — coined in the 2004 UN Global Compact report Who Cares Wins, co-authored by major financial institutions (HSBC, Deutsche Bank, Citigroup, Morgan Stanley). Designed to address systemic investment risk, not corporate ethics. Rooted in Modern Portfolio Theory and the concept of financially material non-financial risk.',
          csr:'Company-led — emerged in the 1950s–1970s from corporate philanthropy traditions, Freeman\'s stakeholder theory (1984), and public relations practice. Howard Bowen\'s Social Responsibilities of the Businessman (1953) is often cited as the origin. Designed to demonstrate corporate citizenship and social legitimacy.',
          synthesis:'ESG came from finance looking inward at risk. CSR came from companies looking outward at reputation. This origin determines everything about how each discipline functions.',
          refs:'Who Cares Wins (2004) · Freeman (1984) Strategic Management: A Stakeholder Approach · Bowen (1953)'
        },
        {
          id:'A02', label:'Primary Purpose',
          esg:'Measure and manage non-financial risks and opportunities that are financially material to investors, lenders, and capital markets. ESG is a risk management and value creation discipline — it exists to improve investment decision-making and capital allocation efficiency.',
          csr:'Demonstrate corporate citizenship, social contribution, and ethical behaviour to employees, communities, media, and general public. CSR is a legitimacy and reputation discipline — it exists to build social licence to operate and positive brand associations.',
          synthesis:'ESG = risk management. CSR = reputation management. The distinction determines who sets the agenda, what data is collected, and how success is measured.',
          refs:'ISSB IFRS S1 ¶2 (sustainability-related risks and opportunities) · GRI 3 (material topics and impacts)'
        },
        {
          id:'A03', label:'Primary Audience',
          esg:'Institutional investors, equity and debt analysts, credit rating agencies, regulators, banks and lenders, ESG index providers (MSCI, S&P, FTSE Russell), and insurers. ESG information is capital allocation information designed for financially sophisticated users who will use it to price risk and allocate capital.',
          csr:'General public, employees, local communities, NGOs, media, customers, and elected officials. CSR information is stakeholder communication designed to build relationships, manage reputation, and maintain social licence.',
          synthesis:'Different audiences require fundamentally different information: financial materiality vs community impact narrative. The same organisation produces both — but they are not interchangeable documents.',
          refs:'ISSB IFRS S1 ¶5 (primary users: investors, lenders, creditors) · GRI 3 ¶27 (stakeholder identification)'
        },
        {
          id:'A04', label:'Information Architecture',
          esg:'Structured, comparable, quantitative data: tCO₂e (GHG Protocol), LTIR (lost-time injury rate), gender pay gap %, board independence %, Scope 3 category totals, water intensity per unit revenue, waste diversion rates. Designed for cross-company comparison, time-series analysis, and financial modelling. Standardised by GRI, ISSB, SASB, ESRS, and BRSR.',
          csr:'Qualitative narratives, activity reports, case studies, volunteer hours, charitable donations, community beneficiary counts, employee engagement survey quotations. Designed for storytelling and relationship-building. Not standardised — each company defines its own metrics.',
          synthesis:'ESG is data infrastructure. CSR is communications infrastructure. Both can be dishonest — but ESG is harder to fake when subject to external assurance by a qualified auditor under ISAE 3000.',
          refs:'GHG Protocol Corporate Standard · SASB Standards (77 industries) · BRSR Core 39 KPIs · ESRS E1–E5 S1–S4 G1 disclosure requirements'
        },
        {
          id:'A05', label:'Time Horizon',
          esg:'Medium to long-term (3–10+ years) — aligned to institutional investment holding periods, SBTi target horizons (2030 near-term, 2050 net-zero), regulatory disclosure cycles, and physical climate risk scenario timelines. ESG embeds in long-term strategy, capital allocation, and enterprise risk management.',
          csr:'Short to medium-term (1–3 years) — typically annual programme cycles aligned to corporate communications calendars, with activities planned quarter-by-quarter. CSR is operational programming: this year\'s volunteer hours, this year\'s charitable grants, this year\'s community events.',
          synthesis:'ESG is strategy. CSR is programming. A company can have outstanding annual CSR programming and a catastrophically inadequate ESG position simultaneously — these are entirely different time horizons and objectives.',
          refs:'SBTi Corporate Net-Zero Standard (2030/2050 targets) · TCFD scenario analysis (1.5°C and 3°C pathways) · ISSB IFRS S2 climate scenario requirements'
        },
        {
          id:'A06', label:'Treatment of Negative Impacts',
          esg:'Mandatory disclosure of material negative impacts under double materiality (CSRD/ESRS, GRI 3). Companies must disclose actual and potential adverse impacts on the environment, workers, communities, and supply chains — regardless of whether those impacts reflect well on the company. Material omissions are assurance failures and regulatory violations.',
          csr:'Companies choose which negatives to acknowledge — typically structured to emphasise positives. CSR reports are self-selected collections of good news, not balanced assessments. A company with a mining operation and a tailings dam safety problem can publish a CSR report focusing entirely on its community school funding programme.',
          synthesis:'ESG must include negatives. CSR is curated. This asymmetry is the single most important operational difference for understanding why ESG credibility requires assurance while CSR credibility relies on brand trust.',
          refs:'ESRS 1 ¶29–47 (double materiality — both impact and financial) · GRI 3 ¶19 (adverse impacts on sustainable development) · CSRD Recital 29'
        },
      ]
    },
    {
      id:'B', label:'Operational Differences', icon:'⚙️', color:'#7c3aed', colorLight:'#f5f3ff',
      desc:'How ESG and CSR work in practice across data collection, governance, accountability, and financial reporting.',
      dimensions: [
        {
          id:'B01', label:'Measurability & Standardisation',
          esg:'High — global standards provide consistent, comparable metrics across companies and time periods. GHG Protocol provides tCO₂e. GRI provides topic-specific disclosures. SASB provides 77 industry-specific KPI sets. BRSR Core provides 39 assured KPIs. ISSB IFRS S1/S2 provides the investor-facing baseline. Investors can compare ESG data across companies the way they compare P/E ratios.',
          csr:'Low to medium — typically narrative, self-defined, and not standardised across organisations. Charitable donation amounts, volunteer hours, and community beneficiary counts are common CSR metrics but governed by no mandatory standard and not comparable across companies. ISO 26000 provides CSR guidance but no measurable outputs.',
          synthesis:'ESG is comparable across companies. CSR is not. This makes ESG useful for investment decisions and index construction; CSR useful for employee pride and community relations. They measure different things for different audiences.',
          refs:'GHG Protocol Corporate Standard (ghgprotocol.org) · GRI Standards (globalreporting.org) · SASB Standards (sasb.org) · ISO 26000:2010 (guidance, not requirements)'
        },
        {
          id:'B02', label:'Governance Accountability',
          esg:'Board-level ownership is mandatory under CSRD/ESRS 2 (board oversight of sustainability), ISSB IFRS S1 (governance pillar requires board processes disclosure), and BRSR Core (principle 1 on governance). Specific committee mandate, skills matrix alignment to ESG risks, ESG-linked executive compensation, and regular board reporting are required. ESG governance failures can trigger board-level regulatory and legal liability.',
          csr:'Typically owned by the CSR, sustainability, or communications function with limited board oversight. A CSR Manager reporting to the Communications Director has no formal accountability mechanism to the board or shareholders. No regulatory framework requires a board CSR committee or board-level CSR skills disclosure.',
          synthesis:'ESG is a governance obligation. CSR is a management activity. The accountability structure — who is responsible, to whom, and with what consequences — is categorically different.',
          refs:'ESRS 2 GOV-1 (board oversight) · ISSB IFRS S1 ¶17 (governance disclosures) · BRSR Principle 1 · UK Corporate Governance Code 2024 (ESG in skills matrix)'
        },
        {
          id:'B03', label:'External Assurance',
          esg:'Mandatory assurance required under CSRD (limited assurance from FY2024, progressing to reasonable assurance), BRSR Core (third-party assurance from FY2023–24 for top 150 Indian listed companies), Singapore SGX (for climate disclosures), and Australia ASRS. Assurance follows ISAE 3000 (general non-financial) and ISAE 3410 (GHG specifically). Assurance providers are regulated: PCAOB (US), FRC (UK), IAASB internationally.',
          csr:'Almost entirely self-declared and voluntary. The few CSR reports that undergo external review typically receive stakeholder verification panels or limited desktop reviews — not ISAE-standard assurance. No regulatory body mandates CSR report assurance. The term "third-party verified" in CSR contexts often means an NGO partner review, not a regulated assurance engagement.',
          synthesis:'ESG is audited under regulated professional standards. CSR is not. This difference in assurance rigour is the most direct explanation for why ESG data is used by credit rating agencies and CSR data is not.',
          refs:'ISAE 3000 (Revised): Assurance Engagements Other Than Audits · ISAE 3410: Assurance on GHG Statements · CSRD Article 34 (assurance of sustainability reporting) · AA1000 Assurance Standard (CSR verification — different from ISAE)'
        },
        {
          id:'B04', label:'Legal Status & Enforceability',
          esg:'Increasingly mandatory: CSRD (50,000+ EU companies, FY2024–2028 phasing), SEC climate rules (US public companies), BRSR Core (India top 150 listed companies from FY2023–24), SGX (Singapore listed companies), ASRS (Australia Group 1 from FY2025), California SB 253 (Scope 1/2/3 for $1B+ companies). Non-compliance triggers regulatory enforcement, fines, and in some cases criminal liability.',
          csr:'Voluntarily undertaken globally. Exceptions: UK Modern Slavery Act Section 54 (large companies must publish a modern slavery statement — a disclosure with limited enforcement and no civil liability). India Companies Act Section 135 (2% CSR spend for qualifying companies — this is mandatory philanthropy spending, not ESG disclosure). No comprehensive mandatory CSR reporting framework exists in any major economy.',
          synthesis:'ESG has enforcement. CSR does not. A company that misrepresents CSR performance faces reputational consequences. A company that misrepresents ESG performance under CSRD, BRSR, or SEC rules faces regulatory prosecution.',
          refs:'EU CSRD Directive 2022/2464 · SEBI BRSR Core Circular · California SB 253 (Climate Corporate Data Accountability Act) · UK Modern Slavery Act 2015 Section 54 · India Companies Act 2013 Section 135'
        },
        {
          id:'B05', label:'Scope of Coverage',
          esg:'Comprehensive and structured by framework: must cover all three pillars (Environmental, Social, Governance) and all material topics within each. ESRS requires assessment of all 10 topic standards (E1–E5, S1–S4, G1) even if some are deemed not material — with documented rationale for any exclusion. BRSR Core covers 39 specific KPIs across all pillars. No selective cherry-picking of comfortable topics.',
          csr:'Company-determined scope — organisations choose which social and environmental activities to highlight based on what is most presentable. A company can produce a 100-page CSR report covering only philanthropy and employee volunteering while making no disclosure about supply chain labour conditions, board governance gaps, or Scope 3 GHG emissions.',
          synthesis:'ESG scope is defined by frameworks and regulators. CSR scope is defined by the company\'s communications team. This distinction determines whether uncomfortable realities are disclosed or hidden.',
          refs:'ESRS 1 ¶17 (all sustainability matters must be assessed) · GRI 3 ¶11 (comprehensive list of topics for assessment) · BRSR Core 39 KPI list · SASB Materiality Map (sasb.org)'
        },
        {
          id:'B06', label:'Integration with Financial Reporting',
          esg:'Deeply integrated by design: ISSB standards are developed by the IFRS Foundation specifically for inclusion in annual financial reports alongside IFRS financial statements. CSRD requires a consolidated sustainability statement as part of the management report within annual accounts. ESG data feeds into credit ratings (Moody\'s, S&P), equity valuations, green bond frameworks, and M&A due diligence.',
          csr:'Published as standalone CSR or sustainability reports, separate from annual financial reports. CSR data does not feed into credit ratings, equity valuations, loan pricing, or M&A due diligence in any systematic or verifiable way. Some companies include a brief CSR summary in their annual report — this is cosmetic, not structural integration.',
          synthesis:'ESG is financial. CSR is communications. The most direct test: would a Goldman Sachs analyst or Moody\'s credit rating methodology cite this in a model? ESG data yes; CSR narrative no.',
          refs:'IFRS Foundation (2021): ISSB created to deliver sustainability standards alongside IFRS financial standards · CSRD Article 19a (consolidated sustainability statement) · Moody\'s ESG methodology documentation'
        },
      ]
    },
    {
      id:'C', label:'Regulatory & Legal Context', icon:'⚖️', color:'#0f766e', colorLight:'#f0fdf4',
      desc:'The specific regulatory frameworks governing ESG and CSR across the world\'s major economies.',
      dimensions: [
        {
          id:'C01', label:'European Union Framework',
          esg:'CSRD (Directive 2022/2464) — mandatory for ~50,000 companies from FY2024–2028 phasing. ESRS covers E1 (climate), E2 (pollution), E3 (water), E4 (biodiversity), E5 (circular economy), S1 (own workforce), S2 (value chain workers), S3 (affected communities), S4 (consumers), G1 (conduct). Limited assurance mandatory. EU Taxonomy Regulation defines sustainable economic activities. SFDR governs ESG claims in financial products.',
          csr:'No mandatory EU CSR reporting framework. The EU CSR Communication (2011) and EU CSR Strategy (2021) are voluntary policy statements, not enforceable regulations. ISO 26000 (Social Responsibility standard) is referenced in EU CSR guidance but is guidance, not a regulation, and has no assurance requirement. The European Sustainability Reporting Standards (ESRS) under CSRD are ESG standards — not CSR standards.',
          synthesis:'In the EU, ESG is a legal obligation with criminal enforcement potential. CSR is a voluntary practice. The terms are not interchangeable under EU law — describing CSRD obligations as "CSR reporting" is legally imprecise and may constitute regulatory misrepresentation.',
          refs:'EU CSRD Directive 2022/2464 (OJ L322) · ESRS Standards (EFRAG) · EU Taxonomy Regulation 2020/852 · SFDR Regulation 2019/2088 · EU CSR Communication COM(2011)681'
        },
        {
          id:'C02', label:'United States Framework',
          esg:'SEC Climate Disclosure Rules (March 2024, SEC Release 33-11275) — currently legally challenged but Scope 1 and 2 obligations remain active for large accelerated filers pending final resolution. California SB 253 (Climate Corporate Data Accountability Act) requires Scope 1, 2, AND 3 disclosure for companies with revenues above US$1 billion doing business in California — effective 2026. California SB 261 requires biennial TCFD-aligned climate risk disclosure for $500M+ revenue companies.',
          csr:'No US mandatory CSR reporting framework at federal or state level. FTC Green Guides (16 CFR Part 260, 2012, under revision) govern environmental marketing claims but do not require comprehensive CSR reporting. State ESG-related anti-ESG legislation (Texas SB 13, Florida HB 3, etc.) restricts ESG considerations in state investment decisions — these target ESG investment activities, not CSR communications.',
          synthesis:'In the US, ESG has emerging mandatory disclosure elements at state level (California is de facto national for large companies) and contested federal requirements. CSR has no mandatory reporting framework and faces minimal enforcement consequences for exaggeration.',
          refs:'SEC Release 33-11275 (March 2024) · California SB 253 (effective 2026) · California SB 261 · FTC Green Guides 16 CFR Part 260 · Texas SB 13 (2021)'
        },
        {
          id:'C03', label:'India Framework',
          esg:'BRSR (Business Responsibility and Sustainability Reporting) — mandatory for NSE/BSE top 1,000 listed companies from FY2022–23. BRSR Core (39 assured KPIs including Scope 1, 2, water intensity, gender pay ratio, LTIR, CSR spend as % of profit) mandatory for top 150 from FY2023–24 with third-party assurance. Value chain coverage of significant suppliers required. SEBI-regulated and enforced through stock exchange listing obligations.',
          csr:'India\'s Companies Act 2013 Section 135 requires companies with net worth ≥₹500 crore, turnover ≥₹1,000 crore, or net profit ≥₹5 crore to spend 2% of average net profits on CSR activities in Schedule VII (education, health, environment, poverty alleviation). This is mandatory philanthropic spending — not ESG disclosure. Non-spend must be explained to shareholders. There is no requirement to measure or disclose CSR impact in ESG terms.',
          synthesis:'India has created a distinctive hybrid: mandatory ESG disclosure (BRSR Core) and mandatory CSR spending (Companies Act). These are entirely separate legal obligations. BRSR is administered by SEBI; CSR spending is administered by MCA. A company can be BRSR-compliant with poor ESG performance and CSR-compliant with no ESG measurement whatsoever.',
          refs:'SEBI Circular SEBI/HO/CFD/CFD-SEC-2/P/CIR/2023/122 (BRSR Core) · Companies Act 2013 Section 135 · Companies (CSR Policy) Rules 2014 · Schedule VII (permitted CSR activities)'
        },
        {
          id:'C04', label:'Asia-Pacific Framework',
          esg:'Singapore: SGX Listing Rules require ISSB-aligned climate disclosures for all listed companies (2023–2025 phasing). Carbon tax escalating to S$45/tCO₂e by 2026. Australia: ASRS mandatory ISSB-aligned disclosure from FY2025 (Group 1: large companies). Japan: TCFD-aligned disclosure mandatory for Prime Market listed companies from April 2023. Japan\'s GPIF (~US$200B AUM) requires asset managers to sign the Stewardship Code. ASEAN Taxonomy (2021) uses traffic-light system.',
          csr:'Most Asia-Pacific jurisdictions reference ISO 26000 and voluntary CSR frameworks. Japan\'s Keidanren (Federation of Economic Organizations) has issued voluntary CSR guidelines. South Korea\'s K-ESG Guidelines (2021) are government-issued but voluntary. China\'s Green Finance Taxonomy is developing. The Philippines, Malaysia, and Thailand have voluntary sustainability reporting frameworks — none with mandatory assurance.',
          synthesis:'Across Asia-Pacific, ESG is rapidly becoming mandatory through capital market regulators. CSR remains voluntary guidance. The regulatory gap is widening as ISSB alignment accelerates across the region — what was voluntary ESG guidance in 2020 is mandatory ESG disclosure by 2026.',
          refs:'SGX Listing Rules — Sustainability Reporting (2023) · Australian Treasury ASRS Final Policy (2024) · Japan FSA TCFD Implementation Guidance · ASEAN Taxonomy for Sustainable Finance (2021)'
        },
        {
          id:'C05', label:'Supply Chain Legal Obligations',
          esg:'EU CSDDD (Corporate Sustainability Due Diligence Directive, 2024) — mandatory human rights and environmental due diligence for large EU-linked companies from 2027, with civil liability for failures causing harm to identified victims. ESRS S2 (workers in value chain) requires supply chain working conditions disclosure. US UFLPA (Uyghur Forced Labor Prevention Act, 2021) creates customs enforcement liability for products made with forced labour in Xinjiang. California Transparency in Supply Chains Act.',
          csr:'UK Modern Slavery Act 2015 Section 54 requires large companies (turnover >£36M) to publish an annual modern slavery statement — a narrative disclosure with minimal enforcement and no civil liability for supply chain abuses. Voluntary CSR codes (ETI Base Code, UN Global Compact, Business and Human Rights 2030 Agenda) are aspirational commitments with no legal enforcement mechanism.',
          synthesis:'ESG supply chain obligations are becoming legally enforceable with civil and criminal liability for identified harms. CSR supply chain obligations remain aspirational statements. EU CSDDD represents the decisive global shift from CSR-style voluntary commitments to ESG-style legally accountable due diligence.',
          refs:'EU CSDDD Directive 2024/1760 · ESRS S2 (Workers in Value Chain) · US UFLPA (Public Law 117-78) · UK Modern Slavery Act 2015 Section 54 · ETI Base Code'
        },
      ]
    },
    {
      id:'D', label:'Strategic & Financial Implications', icon:'📈', color:'#b45309', colorLight:'#fffbeb',
      desc:'What the ESG vs CSR distinction means for capital access, enterprise value, talent, and legal liability.',
      dimensions: [
        {
          id:'D01', label:'Cost of Capital Impact',
          esg:'Documented and measurable: companies with strong ESG ratings access cheaper debt through green bonds (greenium of 5–15bps documented in multiple markets), sustainability-linked loans with lower margins tied to ESG KPI performance, and ESG-linked revolving credit facilities. MSCI research (2020) documents that companies with higher ESG ratings had lower cost of capital over 10 years. BlackRock\'s Larry Fink (2020 CEO Letter): "Climate risk is investment risk." India\'s Sovereign Green Bond (2023) demonstrated a documented greenium.',
          csr:'No documented systematic effect on cost of capital. Credit rating agencies (Moody\'s, S&P, Fitch) do not include CSR report quality in their rating methodologies. CSR report volume and narrative quality do not appear in equity valuation models. A comprehensive CSR programme without ESG quantitative data is invisible to capital markets.',
          synthesis:'ESG affects the price of money. CSR does not. This single distinction makes ESG a CFO and board issue and CSR a communications manager issue. The financial consequence of strong ESG is measurable in basis points; the financial consequence of strong CSR is in brand surveys.',
          refs:'BlackRock CEO Letter (2020) · MSCI ESG Research: Cost of Capital Analysis · IFC Green Bond Pricing in Primary Markets · India Sovereign Green Bond: RBI (2023)'
        },
        {
          id:'D02', label:'M&A Due Diligence',
          esg:'ESG due diligence is now standard in PE and strategic M&A transactions. ESRS and ISSB have created standardised ESG data points that buyers request through data rooms. ESG liabilities — climate transition stranded assets, supply chain human rights violations under CSDDD exposure, governance failures — are quantified as enterprise value adjustments and warranty and indemnity (W&I) insurance clauses. Major PE firms (KKR, Blackstone, CVC) include ESG in investment committee approval processes.',
          csr:'CSR due diligence does not exist as a formal M&A process. A company\'s history of charitable donations, employee volunteering programmes, and community investment activities is not a line item in a sale and purchase agreement or a warranty clause. CSR reports are not reviewed in legal due diligence. A buyer acquiring a company with a strong CSR programme does not pay a premium for it.',
          synthesis:'ESG creates M&A value and liability. CSR does not. When acquiring a company, ESG risks (stranded assets, regulatory penalties, supply chain liabilities) travel with the transaction and affect enterprise value. CSR programmes do not.',
          refs:'ILPA ESG Due Diligence Questionnaire · Bain Capital ESG Integration Framework · KPMG M&A ESG Due Diligence Practice · EU CSDDD — civil liability for acquirers inheriting due diligence obligations'
        },
        {
          id:'D03', label:'Index Inclusion & Passive Capital',
          esg:'ESG ratings (MSCI, Sustainalytics, S&P Global ESG, LSEG Refinitiv) determine inclusion in ESG indices (MSCI ACWI ESG Leaders, FTSE4Good, S&P 500 ESG, Nifty100 ESG, DJSI). Index exclusions reduce passive ownership from ESG-mandated funds (which managed approximately US$3.1 trillion at end-2023). The Tesla/ExxonMobil S&P 500 ESG Index controversy (2022) illustrated how ESG criteria mechanically affect index membership regardless of PR positioning.',
          csr:'CSR performance has no systematic effect on index inclusion or exclusion. MSCI, S&P Global ESG, Sustainalytics, and Bloomberg do not have CSR scoring methodologies — they have ESG scoring methodologies. A company with a comprehensive CSR report but no GHG data, no board ESG oversight disclosure, and no SASB-aligned KPIs will not score better on any major rating agency methodology.',
          synthesis:'ESG determines index membership and passive capital allocation. CSR does not. ESG index exclusion triggers automatic selling by passive funds tracking those indices — a direct, mechanical, and measurable share price consequence.',
          refs:'S&P 500 ESG Index Rebalancing (2022) · MSCI ESG Ratings Methodology · FTSE4Good Inclusion Criteria · Morningstar Global ESG Fund Flows (2023)'
        },
        {
          id:'D04', label:'Talent Attraction & Retention',
          esg:'Strong ESG performance — particularly on Social KPIs (DEI representation, gender pay equity, occupational health and safety, employee wellbeing, whistleblower protection) — is documented to improve employee engagement, reduce voluntary turnover, and support talent attraction in competitive markets. ESRS S1 requires employers to disclose actual working conditions data that job candidates and employees can independently evaluate. ESG pay-linked targets create accountability for HR outcomes.',
          csr:'CSR programmes (volunteering days, charitable matching, community projects, employee giving) have positive effects on employer branding and employee pride surveys — but weaker documented effects on actual working conditions, pay equity, and career progression. Employees and job candidates increasingly distinguish between companies that fund community schools and companies that promote equitably and pay fairly.',
          synthesis:'ESG Social KPIs measure what employees actually experience. CSR activities measure what companies choose to fund externally. Both matter for employer brand — but only ESG creates accountability for the working conditions that determine whether employees stay or leave.',
          refs:'ESRS S1 (Own Workforce: working conditions, pay, health, diversity) · GRI 401, 402, 403, 405 · Willis Towers Watson ESG and Employee Engagement Survey (2024)'
        },
        {
          id:'D05', label:'Greenwashing Liability',
          esg:'ESG greenwashing creates regulatory, securities law, and reputational exposure with documented financial consequences. EU Green Claims Directive (2024): pre-substantiation with LCA evidence required before any claim, fines up to 4% of global annual turnover. ASIC Australia: Vanguard Investments Australia AUD 12.9 million penalty (2024) for misleading ESG exclusion claims. SEC/BaFin: DWS Group USD 40 million settlement (2023) — first major ESG securities fraud action. UK ASA: greenwashing advertising enforcement escalating.',
          csr:'Misleading CSR claims are subject to advertising standards (ASA in UK, FTC in US) and consumer protection law — but enforcement is rare, penalties are minimal, and the threshold for regulatory action is high. CSR report embellishment — presenting partial information as comprehensive performance, using anecdote instead of data — is normal industry practice with very limited legal consequence.',
          synthesis:'ESG greenwashing is financially and legally dangerous. CSR exaggeration is common practice with minimal consequence. This asymmetry — created by the assurance requirement, regulatory oversight, and securities law application to ESG — is why ESG credibility requires structural assurance while CSR credibility relies primarily on stakeholder goodwill.',
          refs:'EU Green Claims Directive (2024) · ASIC v Vanguard (2024) · SEC v DWS Group (2023) · FTC Green Guides 16 CFR Part 260 · UK ASA Environmental Claims Guidance'
        },
      ]
    },
  ]
};
