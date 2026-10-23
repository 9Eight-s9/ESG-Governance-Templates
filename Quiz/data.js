/* ESG Mastery Quiz — data.js — 20 chapters, 160 questions */
const QUIZ_DATA = [
  {
    num: 1,
    title: 'Chapter 1: What Is ESG and Why Does It Matter?',
    questions: [
      {
        q: 'The term ESG was first used in a 2004 UN-commissioned report. What was its central argument?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Companies have a legal obligation to act ethically'},
          {l:'B', t:'Environmental, social, and governance factors are financially material to investment performance'},
          {l:'C', t:'Governments should regulate corporate environmental behavior more strictly'},
          {l:'D', t:'Shareholders should have more control over executive pay'},
        ],
        ans: 'B',
        expl: 'Who Cares Wins was written for institutional investors. Its core claim was financial: companies managing ESG factors well were better positioned for long-term performance.'
      },
      {
        q: 'Which best describes the difference between ESG and CSR?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'ESG is mandatory; CSR is voluntary'},
          {l:'B', t:'ESG is focused on financial risk and return; CSR is primarily reputational and voluntary'},
          {l:'C', t:'ESG covers only environmental factors'},
          {l:'D', t:'ESG is used by investors; CSR by governments'},
        ],
        ans: 'B',
        expl: 'ESG is a financial risk management discipline. CSR is a voluntary social commitment. Conflating the two is one of the most common errors in practice.'
      },
      {
        q: 'Milton Friedman\'s shareholder primacy doctrine argued that:',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Corporations must balance shareholder and employee interests'},
          {l:'B', t:'Corporations should prioritize long-term value'},
          {l:'C', t:'The sole social responsibility of business is to increase its profits, within the rules of the game'},
          {l:'D', t:'Environmental protection should be the primary obligation of business'},
        ],
        ans: 'C',
        expl: 'Friedman\'s 1970 essay made a stark argument: executives are agents of shareholders; spending shareholder money on social causes without consent is an unauthorized tax.'
      },
      {
        q: 'R. Edward Freeman\'s stakeholder theory is described as a strategic argument. Why?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Freeman believed ethics were irrelevant to business'},
          {l:'B', t:'Freeman argued that managing stakeholder relationships was necessary for long-term competitive success'},
          {l:'C', t:'Freeman was writing for government policymakers'},
          {l:'D', t:'Stakeholder theory applies only to non-profits'},
        ],
        ans: 'B',
        expl: 'Freeman\'s insight: any stakeholder group can damage company prospects if the relationship breaks down. Stakeholder management is a strategic necessity, not a moral luxury.'
      },
      {
        q: 'The Business Roundtable\'s 2019 statement is significant because:',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'It created a new legal obligation for US corporations'},
          {l:'B', t:'181 CEOs formally abandoned the Friedman Doctrine as their stated corporate philosophy'},
          {l:'C', t:'It introduced mandatory ESG reporting in the US'},
          {l:'D', t:'It established the first global ESG disclosure standard'},
        ],
        ans: 'B',
        expl: 'The statement was symbolic, not legal. It created no enforceable obligation. But it represented the organized voice of American capitalism conceding that shareholder primacy alone was inadequate.'
      },
      {
        q: 'Which three forces make ESG urgent in the 2020s?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Tech innovation, demographic change, and globalization'},
          {l:'B', t:'Physical climate consequences; regulatory expansion; and institutional investor pressure'},
          {l:'C', t:'Political pressure from governments, NGOs, and trade unions'},
          {l:'D', t:'Rising consumer activism, media scrutiny, and academic research'},
        ],
        ans: 'B',
        expl: 'These three forces are mutually reinforcing. Physical losses make the financial case. Regulation makes disclosure mandatory. Investor pressure changes the cost of capital.'
      },
      {
        q: 'Unilever\'s Sustainable Living Brands grew 69% faster than the rest of the portfolio. A sceptic might argue:',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Sustainable brands are inherently more profitable'},
          {l:'B', t:'The growth could reflect factors unrelated to sustainability \u2014 stronger marketing, category tailwinds \u2014 rather than sustainability positioning itself'},
          {l:'C', t:'Unilever\'s data is fabricated'},
          {l:'D', t:'Sustainable brands operate in less competitive markets'},
        ],
        ans: 'B',
        expl: 'Correlation is not causation. These brands also had strong marketing and were in high-growth categories. Disentangling the sustainability effect is genuinely difficult.'
      },
      {
        q: 'Volkswagen had an A rating from MSCI before Dieselgate. What does this reveal?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'MSCI is corrupt'},
          {l:'B', t:'ESG scores measure what companies disclose, not what they actually do \u2014 governance failures embedded in culture are invisible to reported-data-only methodologies'},
          {l:'C', t:'Volkswagen\'s emissions were within legal limits before 2015'},
          {l:'D', t:'ESG ratings are useless'},
        ],
        ans: 'B',
        expl: 'This is a structural limitation: ratings are constrained by the quality and completeness of disclosures. Embedded cultural problems rarely appear in sustainability reports. CHAPTER 2 \u2014 The Three Pillars Multiple Choice Questions'
      },
    ]
  },
  {
    num: 2,
    title: 'Chapter 2: The Three Pillars',
    questions: [
      {
        q: 'Purchased electricity falls under which GHG Protocol scope?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Scope 1'},
          {l:'B', t:'Scope 2'},
          {l:'C', t:'Scope 3'},
          {l:'D', t:'Scope 4'},
        ],
        ans: 'B',
        expl: 'Scope 2 covers indirect emissions from purchased electricity, heat, steam, and cooling.'
      },
      {
        q: 'Employee business air travel is classified as:',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Scope 1'},
          {l:'B', t:'Scope 2'},
          {l:'C', t:'Scope 3 \u2014 Category 6'},
          {l:'D', t:'Scope 3 \u2014 Category 1'},
        ],
        ans: 'C',
        expl: 'Scope 3 Category 6 covers business travel; Category 1 covers purchased goods and services.'
      },
      {
        q: 'Scope 3 typically represents what share of a company\'s emissions footprint?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'10–20%'},
          {l:'B', t:'30–50%'},
          {l:'C', t:'70–90%'},
          {l:'D', t:'Over 95%'},
        ],
        ans: 'C',
        expl: 'Scope 3 often accounts for 70–90% of corporate emissions, making it significant but difficult to measure and manage.'
      },
      {
        q: 'According to the WEF, how much global GDP depends significantly on nature?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'US$10 trillion'},
          {l:'B', t:'US$25 trillion'},
          {l:'C', t:'US$44 trillion'},
          {l:'D', t:'US$80 trillion'},
        ],
        ans: 'C',
        expl: 'Over US$44 trillion, more than half of global GDP, is moderately or highly dependent on nature.'
      },
      {
        q: 'Which ESRS standard covers resource use and the circular economy?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'ESRS E1'},
          {l:'B', t:'ESRS E3'},
          {l:'C', t:'ESRS E5'},
          {l:'D', t:'ESRS S2'},
        ],
        ans: 'C',
        expl: 'ESRS E5 addresses resource use, waste, and circular economy practices.'
      },
      {
        q: 'What is a company\'s \"social license to operate\"?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'A government permit'},
          {l:'B', t:'Community acceptance of its operations'},
          {l:'C', t:'A UN certification'},
          {l:'D', t:'An ISO standard'},
        ],
        ans: 'B',
        expl: 'Social license is informal but critical; losing community support can seriously disrupt operations and projects.'
      },
      {
        q: 'What was the primary failure behind Volkswagen\'s Dieselgate scandal?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Environmental'},
          {l:'B', t:'Social'},
          {l:'C', t:'Governance'},
          {l:'D', t:'All three equally'},
        ],
        ans: 'C',
        expl: 'Dieselgate primarily exposed governance failures, including inadequate oversight, accountability, and challenge.'
      },
      {
        q: 'What ESG rating did MSCI give Volkswagen when Dieselgate was disclosed?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'CCC'},
          {l:'B', t:'BB'},
          {l:'C', t:'A'},
          {l:'D', t:'AAA'},
        ],
        ans: 'C',
        expl: 'The A rating highlights a key limitation of ESG ratings: reported data may not reveal deeper governance and cultural risks. CHAPTER 3 \u2014 Materiality: What Gets Measured and Why Multiple Choice Questions'
      },
    ]
  },
  {
    num: 3,
    title: 'Chapter 3: Materiality \u2014 What Gets Measured and Why',
    questions: [
      {
        q: 'Under ISSB, an ESG issue is material if it:',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Affects the natural environment'},
          {l:'B', t:'Could reasonably affect the company\'s financial position, performance, or value'},
          {l:'C', t:'Is reported by competitors'},
          {l:'D', t:'Appears in GRI Standards'},
        ],
        ans: 'B',
        expl: 'ISSB applies a financial materiality lens: information is material if it could influence reasonable investor decisions.'
      },
      {
        q: 'Which framework requires double materiality?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'ISSB IFRS S1/S2'},
          {l:'B', t:'SEC Climate Rules'},
          {l:'C', t:'CSRD/ESRS'},
          {l:'D', t:'TCFD'},
        ],
        ans: 'C',
        expl: 'CSRD/ESRS applies double materiality, assessing both financial effects and the company\'s impacts on people and the environment.'
      },
      {
        q: 'What is dynamic materiality?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Changing thresholds without approval'},
          {l:'B', t:'Materiality evolving as risks, regulation, and stakeholder expectations change'},
          {l:'C', t:'A weighting technique'},
          {l:'D', t:'Different thresholds across business units'},
        ],
        ans: 'B',
        expl: 'ESG materiality changes over time. Issues such as data privacy and circularity can become material as regulation, risks, and expectations evolve.'
      },
      {
        q: 'Why can office furniture appear in ESG materiality assessments?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'CSRD mandates furniture-spending disclosure'},
          {l:'B', t:'ESRS E5, landfill costs, and embodied carbon create material impacts'},
          {l:'C', t:'Furniture is classified as hazardous'},
          {l:'D', t:'Reuse reduces Scope 2 emissions'},
        ],
        ans: 'B',
        expl: 'Circularity requirements, disposal costs, and embodied carbon can make furniture a relevant ESG issue.'
      },
      {
        q: 'Why is genuine stakeholder engagement important in materiality assessment?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Regulators require a minimum number of responses'},
          {l:'B', t:'Different stakeholders experience ESG impacts differently'},
          {l:'C', t:'Surveys require minimum responses'},
          {l:'D', t:'Peer reports are unreliable'},
        ],
        ans: 'B',
        expl: 'Investors, employees, communities, and customers may identify very different material issues. Desk reviews alone can miss these perspectives.'
      },
      {
        q: 'A materiality matrix identifies 30 high-priority topics. What does this suggest?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Comprehensive ESG analysis'},
          {l:'B', t:'Poor prioritization that weakens the matrix'},
          {l:'C', t:'GRI compliance'},
          {l:'D', t:'No material ESG risks'},
        ],
        ans: 'B',
        expl: 'A materiality matrix should prioritize decision-critical issues. Too many "high-priority" topics reduce its value as a strategic tool.'
      },
      {
        q: 'Which frameworks require board-level validation of materiality?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'GRI only'},
          {l:'B', t:'CSRD/ESRS, ISSB IFRS S1, and India\'s BRSR Core'},
          {l:'C', t:'UN Global Compact only'},
          {l:'D', t:'TCFD only'},
        ],
        ans: 'B',
        expl: 'Materiality determines significant reporting commitments, making board-level oversight an important governance responsibility.'
      },
      {
        q: 'A software CFO says data privacy is the company\'s only material ESG issue. What is the strongest response?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Software companies are exempt from ESG reporting'},
          {l:'B', t:'Other issues may also be material, including Scope 3, DEI, AI ethics, and governance'},
          {l:'C', t:'Environmental materiality applies only to manufacturers'},
          {l:'D', t:'Data privacy covers all Social issues'},
        ],
        ans: 'B',
        expl: 'A robust materiality assessment must consider the full range of relevant ESG impacts and risks rather than assuming one issue is sufficient. CHAPTER 4 \u2014 The Global Reporting Frameworks Multiple Choice Questions'
      },
    ]
  },
  {
    num: 4,
    title: 'Chapter 4: The Global Reporting Frameworks',
    questions: [
      {
        q: 'What are the ISSB\'s first two standards, and what does each cover?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'IFRS S1 \u2014 Climate; IFRS S2 \u2014 General sustainability'},
          {l:'B', t:'IFRS S1 \u2014 General sustainability; IFRS S2 \u2014 Climate disclosures'},
          {l:'C', t:'GRI S1 \u2014 Financial materiality; GRI S2 \u2014 Impact materiality'},
          {l:'D', t:'TCFD S1 \u2014 Governance; TCFD S2 \u2014 Strategy'},
        ],
        ans: 'B',
        expl: 'IFRS S1 sets general sustainability disclosure requirements; IFRS S2 focuses specifically on climate. Both were published in June 2023.'
      },
      {
        q: 'What does double materiality mean under GRI?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Reporting every ESG issue twice'},
          {l:'B', t:'Assessing both financial impact and impact on people and the environment'},
          {l:'C', t:'Using separate environmental and social reports'},
          {l:'D', t:'Applying two frameworks in multiple countries'},
        ],
        ans: 'B',
        expl: 'Double materiality considers both how ESG issues affect the company and how the company affects people and the environment.'
      },
      {
        q: 'Which tool identifies financially material ESG issues by industry?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'GRI stakeholder guidance'},
          {l:'B', t:'SASB Materiality Map'},
          {l:'C', t:'TCFD scenario analysis'},
          {l:'D', t:'CDP Climate questionnaire'},
        ],
        ans: 'B',
        expl: 'The SASB Materiality Map identifies financially material ESG issues across 77 industry categories and supports the industry-specific layer of ISSB reporting.'
      },
      {
        q: 'What happened to the TCFD framework after its 2023 dissolution?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'It was replaced by GRI'},
          {l:'B', t:'It was absorbed into ISSB, particularly IFRS S2'},
          {l:'C', t:'It was replaced by CDP'},
          {l:'D', t:'It continued under the FSB'},
        ],
        ans: 'B',
        expl: 'IFRS S2 builds on TCFD\'s four pillars and scenario analysis. Organisations using TCFD already have much of the required architecture.'
      },
      {
        q: 'What does a CDP A score represent?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Net-zero achievement'},
          {l:'B', t:'Leadership-level climate disclosure and management'},
          {l:'C', t:'FTSE 100 eligibility'},
          {l:'D', t:'Exemption from CSRD'},
        ],
        ans: 'B',
        expl: 'An A score reflects leadership-level climate disclosure and action. It also has commercial relevance because major organisations use CDP data to assess suppliers.'
      },
      {
        q: 'What does TNFD\'s LEAP approach provide?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'A financial-sector lending framework'},
          {l:'B', t:'A systematic process to identify nature-related dependencies, impacts, risks, and opportunities'},
          {l:'C', t:'A CDP forest-disclosure framework'},
          {l:'D', t:'A carbon-accounting methodology'},
        ],
        ans: 'B',
        expl: 'LEAP means Locate, Evaluate, Assess, Prepare. It helps organisations identify where they interact with nature and translate those dependencies and impacts into risk and disclosure.'
      },
      {
        q: 'An Indian IT company must meet BRSR Core, provide Scope 3 data to European clients, and complete CDP Climate disclosure. What is the key insight?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Each requires completely separate data'},
          {l:'B', t:'The requirements substantially overlap and can use shared ESG data'},
          {l:'C', t:'The company should choose one framework'},
          {l:'D', t:'BRSR Core replaces all others'},
        ],
        ans: 'B',
        expl: 'ESG frameworks are layers, not competitors. A well-designed data program can collect core information once and map it across BRSR, GHG Protocol, CDP, and client requirements.'
      },
      {
        q: 'Why is nature-related risk moving toward formal ISSB standards?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'TNFD requested ISSB takeover'},
          {l:'B', t:'Nature-related risks are financially material, while voluntary disclosure remains inconsistent'},
          {l:'C', t:'The EU mandated it through CSRD'},
          {l:'D', t:'The G20 mandated it in 2024'},
        ],
        ans: 'B',
        expl: 'Nature-related dependencies and risks can be financially material, while voluntary frameworks may not provide the consistent, comparable information investors need. CHAPTER 5 \u2014 European Regulation Multiple Choice Questions'
      },
    ]
  },
  {
    num: 5,
    title: 'Chapter 5: European Regulation',
    questions: [
      {
        q: 'Approximately how many companies will report under CSRD?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Around 1,000'},
          {l:'B', t:'Around 11,000'},
          {l:'C', t:'Around 50,000'},
          {l:'D', t:'All EU companies'},
        ],
        ans: 'C',
        expl: 'CSRD expands reporting from about 11,000 companies under NFRD to around 50,000, covering large EU companies, listed SMEs, and qualifying non-EU companies.'
      },
      {
        q: 'Which ESRS covers resource use and the circular economy?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'ESRS E1'},
          {l:'B', t:'ESRS E5'},
          {l:'C', t:'ESRS S1'},
          {l:'D', t:'ESRS G1'},
        ],
        ans: 'B',
        expl: 'ESRS E5 covers resource use, waste, and circularity, making issues such as furniture, e-waste, and food waste relevant even to office-based companies.'
      },
      {
        q: 'What distinguishes an SFDR Article 9 fund from an Article 8 fund?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Article 9 funds are larger'},
          {l:'B', t:'Article 9 has sustainable investment as an explicit objective; Article 8 promotes ESG characteristics'},
          {l:'C', t:'Article 9 excludes fossil fuels'},
          {l:'D', t:'Article 9 is regulated by the ECB'},
        ],
        ans: 'B',
        expl: 'Article 9 carries a stronger sustainability objective and disclosure burden, while Article 8 promotes ESG characteristics without sustainability being the explicit investment objective.'
      },
      {
        q: 'What three tests must an activity pass to be EU Taxonomy-aligned?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'High ESG score, green certification, and CSRD compliance'},
          {l:'B', t:'Substantial contribution, Do No Significant Harm, and minimum social safeguards'},
          {l:'C', t:'Carbon neutrality, renewable energy, and supply-chain transparency'},
          {l:'D', t:'ISSB, SBTi, and CDP alignment'},
        ],
        ans: 'B',
        expl: 'All three tests must be met. Strong performance in one environmental area does not qualify an activity if it significantly harms another.'
      },
      {
        q: 'A Japanese company earns €200 million from EU sales but has no EU subsidiary or branch. Is it subject to CSRD?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'No \u2014 only EU companies qualify'},
          {l:'B', t:'No \u2014 EU employees are required'},
          {l:'C', t:'Yes \u2014 from 2028, if it also has a qualifying large EU subsidiary or branch'},
          {l:'D', t:'Yes \u2014 immediately from 2024'},
        ],
        ans: 'C',
        expl: 'Non-EU companies must meet the EU revenue threshold and have a qualifying EU subsidiary or branch. The relevant application is from financial year 2028, subject to proposed changes.'
      },
      {
        q: 'Why is Scope 3 particularly difficult for manufacturers?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'CSRD does not require Scope 3'},
          {l:'B', t:'Purchased goods often dominate emissions and require complex supplier data'},
          {l:'C', t:'Scope 3 requires satellite data'},
          {l:'D', t:'No GHG Protocol methodology exists'},
        ],
        ans: 'B',
        expl: 'Category 1 emissions from purchased goods can represent 70–80% of a manufacturer\'s footprint, requiring extensive supplier data or uncertain spend-based estimates.'
      },
      {
        q: 'Does the 2025 Omnibus simplification mean companies can defer CSRD preparation?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Yes \u2014 CSRD is largely eliminated'},
          {l:'B', t:'No \u2014 core double materiality and ESRS requirements remain'},
          {l:'C', t:'Yes \u2014 all deadlines are suspended'},
          {l:'D', t:'Only double materiality is being removed'},
        ],
        ans: 'B',
        expl: 'The Omnibus proposes scope and data-point changes, but the core CSRD/ESRS architecture remains. Deferring preparation can increase implementation risk and cost.'
      },
      {
        q: 'How does EU Taxonomy alignment create commercial value beyond compliance?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'It reduces corporate tax'},
          {l:'B', t:'It can improve access to green finance and ESG investment capital'},
          {l:'C', t:'It guarantees government contracts'},
          {l:'D', t:'It removes CSRD requirements'},
        ],
        ans: 'B',
        expl: 'Taxonomy alignment can strengthen access to green financing and ESG-focused investment pools, potentially creating a cost-of-capital and capital-access advantage. CHAPTER 6 \u2014 The United States and the Americas Multiple Choice Questions'
      },
    ]
  },
  {
    num: 6,
    title: 'Chapter 6: The United States and the Americas',
    questions: [
      {
        q: 'How do the SEC\'s March 2024 climate rules differ from California SB 253?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'SEC requires Scope 3 for all companies'},
          {l:'B', t:'California requires Scope 3 for qualifying companies; SEC requires it only when material or tied to a Scope 3 target'},
          {l:'C', t:'SEC applies only in California'},
          {l:'D', t:'SEC rules are temporary'},
        ],
        ans: 'B',
        expl: 'SB 253 requires Scope 1, 2, and 3 disclosure for qualifying companies, while the SEC limits Scope 3 to material cases or companies with a Scope 3 target.'
      },
      {
        q: 'Why does California SB 253 effectively act as a national standard for large US companies?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'All states adopted it'},
          {l:'B', t:'California\'s economic scale means most large companies doing significant US business are likely subject to it'},
          {l:'C', t:'The SEC endorsed it'},
          {l:'D', t:'It applies to every US company regardless of California operations'},
        ],
        ans: 'B',
        expl: 'Companies with revenues above $1 billion that do business in California are covered, making the rule difficult for large national companies to avoid.'
      },
      {
        q: 'What did the Wharton study find about Texas anti-ESG bond legislation?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'No financial impact'},
          {l:'B', t:'Reduced competition and added an estimated $303–$532 million in interest costs in eight months'},
          {l:'C', t:'Increased competition'},
          {l:'D', t:'Eliminated ESG influence at no cost'},
        ],
        ans: 'B',
        expl: 'Excluding major underwriters reduced competition and increased borrowing costs for Texas municipalities.'
      },
      {
        q: 'What is the core fiduciary-duty argument of the anti-ESG movement?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'ESG is illegal under US securities law'},
          {l:'B', t:'ESG integration violates the duty to maximize beneficiaries\' financial returns'},
          {l:'C', t:'ESG reporting is too costly for small companies'},
          {l:'D', t:'ESG is unsuitable for public markets'},
        ],
        ans: 'B',
        expl: 'Critics argue that ESG factors can prioritize non-financial goals over returns. Supporters counter that material ESG risks can directly affect financial performance.'
      },
      {
        q: 'Why did several major US financial institutions reduce participation in climate-finance coalitions in 2024–2025?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'They concluded climate risk was immaterial'},
          {l:'B', t:'Political and legal pressure, including antitrust threats from Republican-led states, increased the risk of collective climate commitments'},
          {l:'C', t:'The coalitions were dissolved by UNFCCC'},
          {l:'D', t:'Investor demand declined substantially'},
        ],
        ans: 'B',
        expl: 'State attorneys general raised potential antitrust concerns around collective decarbonization commitments, creating legal and political exposure for participating institutions.'
      },
      {
        q: 'How should a multinational operating in California and Texas approach ESG disclosure?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Follow only its headquarters state'},
          {l:'B', t:'Build for the most demanding applicable requirements and frame ESG as financial risk management'},
          {l:'C', t:'Wait for the Supreme Court'},
          {l:'D', t:'Disclose only when investors request it'},
        ],
        ans: 'B',
        expl: 'A common data framework can support California Scope 3, EU CSRD, and Indian BRSR requirements while positioning ESG as material risk management rather than ideology.'
      },
      {
        q: 'What does California SB 261 require?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Gender pay-gap reporting'},
          {l:'B', t:'Biennial TCFD-aligned climate-risk reporting for companies with revenues above $500 million doing business in California'},
          {l:'C', t:'Annual Scope 3 reporting for all California companies'},
          {l:'D', t:'NYSE board-diversity reporting'},
        ],
        ans: 'B',
        expl: 'SB 261 requires qualifying companies to publish climate-related financial risk disclosures every two years, covering governance, strategy, risk management, and metrics.'
      },
      {
        q: 'What does dropping the term "ESG" while retaining climate and governance analysis indicate?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'ESG investing has been abandoned'},
          {l:'B', t:'Strategic reframing: retaining ESG analysis while using less politically controversial language'},
          {l:'C', t:'SEC banned the term ESG'},
          {l:'D', t:'Firms have shifted to purely financial analysis'},
        ],
        ans: 'B',
        expl: 'The analytical substance remains, but firms increasingly use terms such as material risk management and long-term value creation to reduce political and legal exposure. CHAPTER 7 \u2014 Asia-Pacific and India Multiple Choice Questions'
      },
    ]
  },
  {
    num: 7,
    title: 'Chapter 7: Asia-Pacific and India',
    questions: [
      {
        q: 'What distinguishes India\'s BRSR Core from many comparable frameworks?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Mandatory carbon neutrality by 2030'},
          {l:'B', t:'Third-party assurance of 39 key KPIs, including value-chain ESG coverage'},
          {l:'C', t:'Board approval of every ESG disclosure'},
          {l:'D', t:'Mandatory EU Taxonomy alignment'},
        ],
        ans: 'B',
        expl: 'BRSR Core makes assured ESG data a substantive accountability mechanism, including assessment of significant suppliers\' ESG performance.'
      },
      {
        q: 'Why does Singapore\'s S$45/tCO₂e carbon tax in 2026 matter beyond disclosure?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'It exempts companies from ISSB'},
          {l:'B', t:'It creates a direct financial cost for Scope 1 and 2 emissions'},
          {l:'C', t:'It requires EU Taxonomy investments'},
          {l:'D', t:'It applies to Scope 3 emissions'},
        ],
        ans: 'B',
        expl: 'Carbon pricing turns emissions into a direct financial cost, making reductions economically valuable rather than merely reputational.'
      },
      {
        q: 'From which year did Japan require TCFD-aligned climate disclosure for Prime Market companies?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'2020'},
          {l:'B', t:'2023'},
          {l:'C', t:'2025'},
          {l:'D', t:'2030'},
        ],
        ans: 'B',
        expl: 'From April 2023, Prime Market companies were required to include TCFD-aligned climate disclosures covering governance, strategy, risk management, and metrics.'
      },
      {
        q: 'For Australia\'s Group 1 entities, when does Scope 3 disclosure become mandatory?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'FY2025'},
          {l:'B', t:'FY2026, with first-year relief allowing reasonable estimates'},
          {l:'C', t:'FY2030'},
          {l:'D', t:'Never; it remains voluntary'},
        ],
        ans: 'B',
        expl: 'Australia phases in Scope 3 from FY2026 for Group 1 entities, recognizing the difficulty of establishing reliable primary data.'
      },
      {
        q: 'How does the ASEAN Taxonomy differ from the EU Taxonomy?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'ASEAN is legally binding; EU is voluntary'},
          {l:'B', t:'ASEAN uses green/amber/red classifications, including transitional activities'},
          {l:'C', t:'ASEAN covers only financial services'},
          {l:'D', t:'ASEAN excludes DNSH'},
        ],
        ans: 'B',
        expl: 'The amber category recognizes transitional activities and reflects Southeast Asia\'s differing development and energy-transition realities.'
      },
      {
        q: 'What does ESG framework convergence in methodology\u2014but not materiality scope\u2014mean?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'All frameworks use identical emissions factors'},
          {l:'B', t:'Frameworks increasingly share GHG Protocol, TCFD, and SASB foundations, but differ between financial and double materiality'},
          {l:'C', t:'Governance has converged but environmental metrics have not'},
          {l:'D', t:'Convergence applies only to equity markets'},
        ],
        ans: 'B',
        expl: 'Measurement methods increasingly converge, but CSRD\'s double-materiality approach requires companies to report broader impacts on people and the environment, beyond financial effects on the company.'
      },
      {
        q: 'Why is Scope 3 Category 11 especially important for automotive companies?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'It covers manufacturing waste'},
          {l:'B', t:'It covers emissions from the use of sold vehicles over their operating lives'},
          {l:'C', t:'It covers employee commuting'},
          {l:'D', t:'It covers steel and aluminum suppliers'},
        ],
        ans: 'B',
        expl: 'Category 11 captures lifetime fuel or electricity use of sold vehicles and can dominate an automaker\'s Scope 3 footprint, directly linking emissions to the EV transition.'
      },
      {
        q: 'What is the most efficient ESG data strategy for a company subject to BRSR Core, SGX, and CSRD requirements?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Build three separate systems'},
          {l:'B', t:'Build one GHG Protocol/ISSB/SASB-based dataset and map it to each framework'},
          {l:'C', t:'Apply CSRD globally and ignore others'},
          {l:'D', t:'Report only under BRSR Core'},
        ],
        ans: 'B',
        expl: '"Build once, map many" avoids duplicate data collection. A common ESG data foundation can generate different disclosures, with CSRD adding the broader double-materiality requirements. These two chapters are now aligned with the same shortened Masterclass quiz format used for Chapters 1–5, without changing the intended questions or answers. CHAPTER 8 \u2014 ESG Investment Strategies Multiple Choice Questions'
      },
    ]
  },
  {
    num: 8,
    title: 'Chapter 8: ESG Investment Strategies',
    questions: [
      {
        q: 'Which ESG approach selects the strongest ESG performers within each sector rather than excluding entire sectors?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Negative screening'},
          {l:'B', t:'Best-in-class selection (positive screening)'},
          {l:'C', t:'Thematic investing'},
          {l:'D', t:'Impact investing'},
        ],
        ans: 'B',
        expl: '. Best-in-class selection (positive screening) \u2014 This approach invests in ESG leaders within each sector and underweights or excludes laggards, encouraging improvement rather than simply excluding entire sectors.'
      },
      {
        q: 'What two requirements distinguish impact investing from other ESG approaches?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'High returns and low risk'},
          {l:'B', t:'Intentionality and additionality'},
          {l:'C', t:'Fossil-fuel exclusion and third-party verification'},
          {l:'D', t:'ISSB reporting and CDP A-rating'},
        ],
        ans: 'B',
        expl: '. Intentionality and additionality \u2014 The investor must intentionally seek a positive outcome, and the investment must contribute an outcome that would not otherwise have occurred.'
      },
      {
        q: 'ESG funds outperformed in early 2020 but underperformed in 2022. What primarily explains both outcomes?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Better ESG analysis in 2020 and worse analysis in 2022'},
          {l:'B', t:'Energy-sector exposure and ESG funds\' systematic underweighting of energy stocks'},
          {l:'C', t:'Interest-rate changes'},
          {l:'D', t:'Regulatory changes'},
        ],
        ans: 'B',
        expl: '. Energy-sector exposure \u2014 ESG funds\' lower exposure to fossil-fuel producers helped when oil prices collapsed in 2020 but hurt when energy prices surged in 2022.'
      },
      {
        q: 'What best describes Climate Action 100+?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'A regulatory body'},
          {l:'B', t:'An investor coalition representing more than $60 trillion in assets that coordinates engagement with major emitters'},
          {l:'C', t:'A renewable-energy investment fund'},
          {l:'D', t:'A climate-rating agency'},
        ],
        ans: 'B',
        expl: '. A major investor coalition with documented engagement outcomes \u2014 Coordinated shareholder engagement gives investors greater influence over climate governance and disclosure at high-emitting companies.'
      },
      {
        q: 'What is the strongest rebuttal to the argument that negative screening is ineffective because another investor simply buys the shares?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'It is only a moral strategy'},
          {l:'B', t:'At sufficient scale, exclusion shrinks the investor base and can raise the company\'s cost of capital'},
          {l:'C', t:'The argument is entirely correct'},
          {l:'D', t:'It works only in bond markets'},
        ],
        ans: 'B',
        expl: '. At scale, exclusion can raise the cost of capital \u2014 When major capital pools and ESG indices exclude a company, demand can fall, potentially reducing valuation and increasing its cost of equity.'
      },
      {
        q: 'What gap was the ILPA ESG Data Convergence Initiative created to address?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'ESG standards for sovereign bonds'},
          {l:'B', t:'Lack of standardized, comparable ESG data across private-equity portfolios'},
          {l:'C', t:'Climate scenario analysis in public markets'},
          {l:'D', t:'Differences between public-company ESG ratings'},
        ],
        ans: 'B',
        expl: '. Standardized ESG data across private equity \u2014 Private companies have fewer disclosure obligations, making comparable ESG measurement difficult. The initiative established common metrics for private-market portfolios.'
      },
      {
        q: 'What does Larry Fink\'s reduced use of the term "ESG" while retaining terms such as "materiality" and "long-term value creation" reflect?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'BlackRock abandoned ESG investing'},
          {l:'B', t:'Strategic reframing to maintain the investment approach while reducing US political and legal exposure'},
          {l:'C', t:'The SEC banned the term ESG'},
          {l:'D', t:'ESG became a European trademark'},
        ],
        ans: 'B',
        expl: '. Substantive approach maintained, language adapted \u2014 The underlying analysis of climate, governance, and regulatory risks remains, while the terminology is reframed to reduce political and legal exposure.'
      },
      {
        q: 'Which Friedman Doctrine critique does ESG integration most directly rebut?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Executives should be elected by stakeholders'},
          {l:'B', t:'Considering ESG factors violates fiduciary duty'},
          {l:'C', t:'Corporations should pay more taxes'},
          {l:'D', t:'Shareholders are not primary beneficiaries'},
        ],
        ans: 'B',
        expl: '. Considering ESG factors violates fiduciary duty \u2014 If material climate, governance, and supply-chain risks affect financial returns, considering them is part of thorough financial analysis and can support, rather than violate, fiduciary duty. CHAPTER 9 \u2014 Sustainable Finance Instruments Multiple Choice Questions'
      },
    ]
  },
  {
    num: 9,
    title: 'Chapter 9: Sustainable Finance Instruments',
    questions: [
      {
        q: 'What is the fundamental difference between a green bond and a sustainability-linked bond (SLB)?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Green bonds are government-only; SLBs are corporate-only'},
          {l:'B', t:'Green bonds restrict use of proceeds to eligible green projects; SLBs allow general use but adjust the coupon based on sustainability performance'},
          {l:'C', t:'Green bonds are regulated by SEC; SLBs by ESMA'},
          {l:'D', t:'Green bonds automatically have lower interest rates'},
        ],
        ans: 'B',
        expl: '. Green bonds restrict proceeds; SLBs link coupons to performance \u2014 Green bonds are defined by how proceeds are used, while SLBs use a financial mechanism tied to sustainability targets.'
      },
      {
        q: 'What are the four core components of the ICMA Green Bond Principles?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Green projects, offsets, targets, certification'},
          {l:'B', t:'Use of proceeds, project evaluation and selection, management of proceeds, and reporting'},
          {l:'C', t:'Board oversight, stakeholders, materiality, assurance'},
          {l:'D', t:'Eligible categories, greenium, registration, audit'},
        ],
        ans: 'B',
        expl: '. Use of proceeds, project evaluation, management, and reporting \u2014 These establish eligibility, selection, tracking, and transparency for green bond proceeds.'
      },
      {
        q: 'Why might an oil and gas company\'s SLB KPI measuring renewable energy in its own operations be considered weak?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Oil companies cannot issue bonds'},
          {l:'B', t:'It measures a small operational impact while ignoring the dominant Scope 3 Category 11 emissions from sold fossil fuels'},
          {l:'C', t:'A 15% target is too ambitious'},
          {l:'D', t:'ICMA prohibits SLBs for oil companies'},
        ],
        ans: 'B',
        expl: '. The KPI may be immaterial to the company\'s main climate impact \u2014 For oil companies, Scope 3 Category 11 emissions from the use of sold fossil fuels can dominate the footprint. A KPI should address material environmental impacts.'
      },
      {
        q: 'What distinguishes the EU Green Bond Standard (EuGBS) from the ICMA Green Bond Principles?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'EuGBS bonds must be denominated in euros'},
          {l:'B', t:'EuGBS requires 85% of proceeds to align with the EU Taxonomy, ESMA-accredited reviewers, and a confirmed final allocation report'},
          {l:'C', t:'EuGBS applies only to sovereign issuers'},
          {l:'D', t:'EuGBS excludes non-European issuers'},
        ],
        ans: 'B',
        expl: '. 85% Taxonomy alignment, accredited reviewers, and final allocation confirmation \u2014 EuGBS sets a stricter standard through EU Taxonomy technical criteria, DNSH requirements, and regulated external review.'
      },
      {
        q: 'What did the greenium on India\'s inaugural sovereign green bond demonstrate?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Indian government bonds always have lower yields'},
          {l:'B', t:'Investors may accept a slightly lower return for environmental use-of-proceeds and greater transparency'},
          {l:'C', t:'Green bonds are risk-free'},
          {l:'D', t:'Only developing-country sovereigns achieve greeniums'},
        ],
        ans: 'B',
        expl: '. Environmental credentials can command a market premium \u2014 India\'s modest greenium showed that investors may value environmental credentials beyond regulatory requirements.'
      },
      {
        q: 'What is a second-party opinion (SPO) in green bond issuance?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'A second audit after errors are found'},
          {l:'B', t:'An independent assessment of whether the green bond framework aligns with ICMA Principles'},
          {l:'C', t:'A credit rating'},
          {l:'D', t:'A second bond tranche'},
        ],
        ans: 'B',
        expl: '. An independent alignment assessment, not an audit \u2014 An SPO evaluates the issuer\'s framework against ICMA principles; it does not guarantee the environmental performance of funded projects.'
      },
      {
        q: 'What investment challenge does blended finance address?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Compliance with ISSB and GRI'},
          {l:'B', t:'Mobilizing private capital where the risk-return profile is insufficient without public or concessional support'},
          {l:'C', t:'Issuing bonds in non-euro currencies'},
          {l:'D', t:'Measuring Scope 3 emissions'},
        ],
        ans: 'B',
        expl: '. Making commercially viable investments in higher-risk markets or sectors \u2014 Public or concessional capital can provide guarantees or first-loss protection, improving the risk-return profile for private investors.'
      },
      {
        q: 'Two green bonds have equal credit quality and yield: one follows ICMA GBP with a positive SPO; the other follows EuGBS with an ESMA-accredited reviewer. What is the key difference?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'No meaningful difference'},
          {l:'B', t:'EuGBS provides stronger assurance through 85% EU Taxonomy alignment, DNSH criteria, and regulated external review'},
          {l:'C', t:'ICMA is more credible because it is older'},
          {l:'D', t:'EuGBS is riskier because of regulation'},
        ],
        ans: 'B',
        expl: '. EuGBS provides stronger technical assurance \u2014 EuGBS requires stricter Taxonomy alignment and regulated review, while an ICMA-only bond can use broader green categories and voluntary SPOs. CHAPTER 10 \u2014 ESG Ratings Multiple Choice Questions'
      },
    ]
  },
  {
    num: 10,
    title: 'Chapter 10: ESG Ratings',
    questions: [
      {
        q: 'Berg, Kölbel, and Rigobon (2019) found average pairwise correlation of about 0.54 among major ESG rating agencies. Why does this matter?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'ESG ratings are fraudulent'},
          {l:'B', t:'Different providers can produce materially different investment portfolios'},
          {l:'C', t:'ESG ratings are twice as useful as credit ratings'},
          {l:'D', t:'Agencies generally agree'},
        ],
        ans: 'B',
        expl: '. Different providers can produce different portfolios \u2014 A 0.54 correlation shows substantial disagreement, meaning the choice of ESG rating provider can significantly influence investment decisions.'
      },
      {
        q: 'Which source contributes most to ESG rating divergence?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Weight divergence'},
          {l:'B', t:'Scope divergence, about 56% of total divergence'},
          {l:'C', t:'Measurement divergence'},
          {l:'D', t:'All three equally'},
        ],
        ans: 'B',
        expl: '. Scope divergence at ~56% \u2014 Providers often assess different indicators, meaning they may be measuring different aspects of the same company rather than simply scoring the same information differently.'
      },
      {
        q: 'MSCI rated Volkswagen A when the Dieselgate fraud emerged in 2015. What does this reveal about ESG ratings?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'MSCI ratings are deliberately inaccurate'},
          {l:'B', t:'Ratings can rely on disclosed information and miss hidden fraud or culture-based governance failures'},
          {l:'C', t:'MSCI excludes governance factors'},
          {l:'D', t:'Automotive companies are always overrated'},
        ],
        ans: 'B',
        expl: '. Ratings can miss undisclosed fraud and governance failures \u2014 Disclosure-based ratings cannot reliably identify misconduct deliberately hidden from corporate reporting, highlighting the value of controversy and alternative data.'
      },
      {
        q: 'Why can the issuer-pays model create an ESG rating conflict of interest?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Issuers always pay more than investors'},
          {l:'B', t:'Revenue dependence on rated companies can create pressure for ratings that are commercially acceptable'},
          {l:'C', t:'Issuers can sue agencies for negative ratings'},
          {l:'D', t:'Ratings are updated annually'},
        ],
        ans: 'B',
        expl: '. Revenue dependence can create conflicts \u2014 Like the pre-2008 credit-rating model, dependence on issuers for revenue can create incentives that undermine rating independence.'
      },
      {
        q: 'S&P removed Tesla from its S&P 500 ESG Index in 2022 while retaining ExxonMobil. What does this illustrate?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Fossil-fuel companies have better ESG performance'},
          {l:'B', t:'ESG inclusion is methodology-specific; Tesla\'s social and governance weaknesses outweighed its environmental strengths under S&P\'s methodology'},
          {l:'C', t:'The index favors traditional industries'},
          {l:'D', t:'EV companies cannot qualify'},
        ],
        ans: 'B',
        expl: '. ESG index inclusion is methodology-specific \u2014 ESG ratings assess multiple dimensions. Under S&P\'s methodology, Tesla\'s social and governance issues outweighed its environmental strengths.'
      },
      {
        q: 'What is the halo effect in ESG ratings?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'A stock-price rise after a positive ESG rating'},
          {l:'B', t:'Assuming strong performance on measured factors implies strong performance on unmeasured factors'},
          {l:'C', t:'An unjustifiably high rating'},
          {l:'D', t:'The reputation gained from sustainability reporting'},
        ],
        ans: 'B',
        expl: '. Inflating unmeasured dimensions based on measured performance \u2014 The halo effect can create scores that overstate overall ESG performance by assuming that strength in one area implies strength elsewhere.'
      },
      {
        q: 'How does satellite imagery change ESG data?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'It only measures physical climate risk'},
          {l:'B', t:'It provides independent physical evidence of environmental performance such as deforestation, methane emissions, and facility activity'},
          {l:'C', t:'It is too expensive for routine analysis'},
          {l:'D', t:'It measures only Scope 1 emissions'},
        ],
        ans: 'B',
        expl: '. Independent physical data beyond corporate disclosure \u2014 Satellite and alternative data can show what companies physically do, helping validate disclosures and detect potential greenwashing.'
      },
      {
        q: 'Which combination best mitigates ESG rating limitations?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Use only the largest rating agency'},
          {l:'B', t:'Use multiple providers, controversy data, industry-specific materiality frameworks, and alternative data'},
          {l:'C', t:'Rely only on company reports'},
          {l:'D', t:'Average all available ratings'},
        ],
        ans: 'B',
        expl: '. Multiple providers + controversy + industry-specific + alternative data \u2014 Combining these sources addresses rating divergence, real-time controversies, generic scoring limitations, and dependence on corporate disclosures. CHAPTER 11  Phase 1 \u2014 Baselining, Materiality and Program Design CHAPTER 11 \u2014 ESG Program Implementation Multiple Choice Questions'
      },
    ]
  },
  {
    num: 11,
    title: 'Chapter 11: Phase 1 \u2014 Baselining, Materiality and Programme Design',
    questions: [
      {
        q: 'What is the correct sequence for building an ESG program?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Report first, then assess data needs'},
          {l:'B', t:'Set targets first, then conduct materiality assessment'},
          {l:'C', t:'Materiality assessment → baseline → governance → targets → reporting'},
          {l:'D', t:'Assurance → materiality → reporting'},
        ],
        ans: 'C',
        expl: '. Materiality → baseline → governance → targets → reporting \u2014 Each step builds on the previous one: materiality identifies what matters, the baseline measures it, governance creates accountability, targets set direction, and reporting communicates results.'
      },
      {
        q: 'How must Scope 2 emissions be reported under the GHG Protocol?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Direct and indirect'},
          {l:'B', t:'Gross and net'},
          {l:'C', t:'Location-based and market-based'},
          {l:'D', t:'Primary and secondary'},
        ],
        ans: 'C',
        expl: '. Location-based and market-based \u2014 Location-based uses grid-average emission factors, while market-based reflects specific electricity contracts and instruments such as PPAs and RECs.'
      },
      {
        q: 'Why should a company screen Scope 3 emissions before collecting primary data?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Primary data requires a special license'},
          {l:'B', t:'Screening identifies the largest categories and directs data-collection resources to them'},
          {l:'C', t:'Regulators require screening first'},
          {l:'D', t:'GHG Protocol excludes some categories'},
        ],
        ans: 'B',
        expl: '. Screening identifies the largest categories \u2014 Spend-based screening can reveal the categories contributing most to the footprint, allowing limited resources to focus where improved data quality matters most.'
      },
      {
        q: 'Why is Scope 3 Category 6 (business travel) generally easier to calculate than Category 1 (purchased goods and services)?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Business travel is less important'},
          {l:'B', t:'Travel systems provide detailed activity data, while Category 1 requires estimating embedded carbon across many suppliers and products'},
          {l:'C', t:'DEFRA has no Category 1 factors'},
          {l:'D', t:'Category 6 is not required under CSRD'},
        ],
        ans: 'B',
        expl: '. Travel systems provide better activity data \u2014 Flight, hotel, and transport records can be matched to emission factors, whereas Category 1 involves complex supplier and product-level estimates.'
      },
      {
        q: 'Why does the credibility of Ørsted\'s 2006 baseline matter when assessing its 2023 reduction claim?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'2006 was a high-emission year'},
          {l:'B', t:'A verified baseline makes the reduction independently auditable and prevents retrospective adjustment'},
          {l:'C', t:'SBTi requires base years within 15 years'},
          {l:'D', t:'Danish regulations required the 2006 baseline'},
        ],
        ans: 'B',
        expl: '. A verified baseline makes reduction claims auditable \u2014 A fixed, documented baseline provides a reliable starting point against which reported reductions can be independently assessed.'
      },
      {
        q: 'What four elements should a Program Charter define?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Strategy, targets, disclosure, assurance'},
          {l:'B', t:'Reporting scope, applicable frameworks, ownership, and timeline'},
          {l:'C', t:'Carbon budget, social commitments, governance, reporting'},
          {l:'D', t:'Materiality matrix, stakeholders, inventory, board approval'},
        ],
        ans: 'B',
        expl: '. Scope · frameworks · ownership · timeline \u2014 These define what is covered, which rules apply, who is responsible, and when activities must occur.'
      },
      {
        q: 'Why do many companies use 2019 rather than 2020 or 2021 as their GHG base year?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'2019 had unusually low emissions'},
          {l:'B', t:'COVID-19 made 2020–21 unusually low in travel, energy, and production emissions'},
          {l:'C', t:'SBTi prohibits 2020 base years'},
          {l:'D', t:'DEFRA only publishes factors from 2019'},
        ],
        ans: 'B',
        expl: '. COVID made 2020–21 anomalously low \u2014 Using those years could understate normal operational emissions and make subsequent reduction claims or targets misleading.'
      },
      {
        q: 'A company\'s materiality matrix shows the same high-priority topics for three consecutive years, all already being measured. What concern should this raise?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Evidence of a stable, well-run program'},
          {l:'B', t:'A red flag that the assessment may be confirming existing priorities rather than identifying new material risks'},
          {l:'C', t:'Evidence that no new ESG risks exist'},
          {l:'D', t:'Normal CSRD practice'},
        ],
        ans: 'B',
        expl: '. Potentially predetermined outcomes \u2014 Materiality is dynamic. A process that never identifies new issues may indicate that management is validating existing activities rather than genuinely testing emerging risks. CHAPTER 12 \u2014 Phase 2: Governance Structure and Accountability Multiple Choice Questions'
      },
    ]
  },
  {
    num: 12,
    title: 'Chapter 12: Phase 2 \u2014 Governance Structure and Accountability',
    questions: [
      {
        q: 'Under CSRD, ISSB IFRS S1, and BRSR Core, what board-governance information must companies disclose?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Board members signing the UN Global Compact'},
          {l:'B', t:'How the board oversees sustainability risks and opportunities, including responsible committees, meeting frequency, and relevant competencies'},
          {l:'C', t:'Sustainability team compensation'},
          {l:'D', t:'Whether the board has achieved net zero'},
        ],
        ans: 'B',
        expl: '. Board oversight, committees, frequency, and competencies \u2014 The frameworks require substantive disclosure of how sustainability oversight actually operates, not simply a statement of board commitment.'
      },
      {
        q: 'A chemicals company\'s board has no climate or sustainability expertise despite significant climate and water risks. What governance concern does this raise?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'The board is legally prohibited from ESG oversight'},
          {l:'B', t:'The board may lack the expertise needed to effectively challenge management on material ESG risks'},
          {l:'C', t:'External consultants completely resolve the issue'},
          {l:'D', t:'One training session is sufficient'},
        ],
        ans: 'B',
        expl: '. The board may lack the expertise to challenge management \u2014 Effective oversight requires directors who can understand and critically assess management\'s responses to material sustainability risks.'
      },
      {
        q: 'Why might an investor reject "employee engagement score" and "publication of the sustainability report" as genuine ESG pay metrics?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Neither is an ESG topic'},
          {l:'B', t:'They are not directly linked to material ESG outcomes; one measures satisfaction and the other task completion'},
          {l:'C', t:'The weightings are too high'},
          {l:'D', t:'ESG metrics belong only in long-term incentives'},
        ],
        ans: 'B',
        expl: '. Neither directly measures material ESG performance \u2014 Genuine ESG incentives should be material, ambitious, and independently verifiable rather than simply rewarding activity or reporting completion.'
      },
      {
        q: 'What does the EU Whistleblower Protection Directive require companies with 50+ employees to provide?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Public disclosure of all reports'},
          {l:'B', t:'Secure reporting channels, acknowledgement within 7 days, feedback within 3 months, and retaliation protection'},
          {l:'C', t:'A 10% reward from recovered fines'},
          {l:'D', t:'Direct reporting to ESMA'},
        ],
        ans: 'B',
        expl: '. Secure channels · 7-day acknowledgement · 3-month feedback · protection \u2014 These are core operational requirements, including protection against retaliation.'
      },
      {
        q: 'What is the relevance of COSO ERM to ESG governance?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'It replaces GRI'},
          {l:'B', t:'It integrates material ESG risks into the principal enterprise risk register alongside other business risks'},
          {l:'C', t:'It applies only to financial companies'},
          {l:'D', t:'It is mandatory for CSRD reporters'},
        ],
        ans: 'B',
        expl: '. ESG risks belong in the principal risk register \u2014 COSO ERM supports treating physical climate, transition, social, and other material ESG risks as core business risks rather than a separate sustainability category.'
      },
      {
        q: 'What governance principle does Patagonia\'s 2022 ownership restructure illustrate?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'All companies should become nonprofits'},
          {l:'B', t:'Structural governance mechanisms can make ESG commitments more durable than policies or statements'},
          {l:'C', t:'ESG requires founder control'},
          {l:'D', t:'The model applies only to private companies'},
        ],
        ans: 'B',
        expl: '. Structural mechanisms create greater durability \u2014 Embedding purpose into ownership and legal structures makes commitments harder for future management or owners to reverse.'
      },
      {
        q: 'What does it mean when an ESG program is inadequately institutionalized because it depends on one sustainability manager?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Multiple sustainability staff are legally required'},
          {l:'B', t:'The program may fail when that person leaves because processes, governance, and ownership are not embedded in organisational systems'},
          {l:'C', t:'CSRD prohibits single-person programs'},
          {l:'D', t:'The manager\'s salary is too low'},
        ],
        ans: 'B',
        expl: '. Processes and ownership are not institutionalized \u2014 A durable program requires documented processes, cross-functional ownership, independent governance, and board oversight so it can survive personnel changes.'
      },
      {
        q: 'What ESG weighting in executive incentives is typically recommended as a meaningful behavioral incentive?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'1–2% of total compensation'},
          {l:'B', t:'5–10% of annual bonus only'},
          {l:'C', t:'15–20% of annual incentive and 10–15% of long-term incentive'},
          {l:'D', t:'50% of total compensation'},
        ],
        ans: 'C',
        expl: '. 15–20% annual incentive and 10–15% long-term incentive \u2014 These levels are intended to make ESG performance financially meaningful rather than merely symbolic. CHAPTER 13 \u2014 Phase 3: Office and Infrastructure ESG Multiple Choice Questions'
      },
    ]
  },
  {
    num: 13,
    title: 'Chapter 13: Phase 3 \u2014 Office and Infrastructure ESG',
    questions: [
      {
        q: 'Under which ESRS standard is office furniture circularity and waste management reportable?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'ESRS E1 \u2014 Climate Change'},
          {l:'B', t:'ESRS E3 \u2014 Water and Marine Resources'},
          {l:'C', t:'ESRS E5 \u2014 Resource Use and Circular Economy'},
          {l:'D', t:'ESRS S1 \u2014 Own Workforce'},
        ],
        ans: 'C',
        expl: '. ESRS E5 \u2014 Resource Use and Circular Economy \u2014 Covers material consumption, waste, diversion rates, and circular economy practices, including furniture disposal and circular procurement.'
      },
      {
        q: 'WRAP\'s 2025 study found that refurbishing an office task chair instead of replacing it saves approximately how much embodied carbon?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'5 kgCO₂e'},
          {l:'B', t:'40 kgCO₂e'},
          {l:'C', t:'200 kgCO₂e'},
          {l:'D', t:'500 kgCO₂e'},
        ],
        ans: 'B',
        expl: '. Approximately 40 kgCO₂e per chair \u2014 Refurbishment avoids about 40 kgCO₂e compared with manufacturing a new equivalent chair. At scale, the savings can be significant.'
      },
      {
        q: 'NANDO AI achieves over 95% accuracy in identifying waste composition. Why does this matter for ESG reporting?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Regulators require 95% accuracy for all ESG data'},
          {l:'B', t:'It replaces estimated waste data with measured data aligned to GRI 306 and ESRS E5, reducing ESG data uncertainty'},
          {l:'C', t:'AI data is exempt from external assurance'},
          {l:'D', t:'It reduces waste collection costs by 95%'},
        ],
        ans: 'B',
        expl: '. Replaces estimated composition data with measured data \u2014 Objective, documented measurement is more defensible for assured ESG reporting than manually estimated waste composition.'
      },
      {
        q: 'The Control of Asbestos Regulations 2012 (UK) requires building owners to do what for occupied offices?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Remove all asbestos immediately'},
          {l:'B', t:'Commission a Type 1 Management Survey, assess ACM condition, and maintain a documented management plan'},
          {l:'C', t:'Evacuate the building if asbestos is identified'},
          {l:'D', t:'Disclose asbestos in annual financial reports'},
        ],
        ans: 'B',
        expl: '. Type 1 Management Survey, condition assessment, and management plan \u2014 The requirement is to identify and manage asbestos safely. Removal is required when materials are in poor condition or may be disturbed.'
      },
      {
        q: 'Which ESG frameworks are directly relevant to hazardous material management in offices?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'GRI 403, ESRS S1, and ESRS E2'},
          {l:'B', t:'Only ESRS E2'},
          {l:'C', t:'Only GRI 403'},
          {l:'D', t:'SEC climate rules and TCFD'},
        ],
        ans: 'A',
        expl: '. GRI 403, ESRS S1, and ESRS E2 \u2014 Hazardous materials span workforce health and safety, pollution, substances of concern, and hazardous waste, making this a multi-framework ESG issue.'
      },
      {
        q: 'A refurbishment survey discovers asbestos-containing ceiling tile adhesive, adding 12 weeks and £850,000 to the project. What ESG governance principle does this illustrate?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Asbestos surveys are optional'},
          {l:'B', t:'Physical ESG due diligence should occur before project design, as early identification avoids major delays and disruption'},
          {l:'C', t:'Asbestos management is purely legal compliance'},
          {l:'D', t:'BREEAM requires discovery of all building hazards'},
        ],
        ans: 'B',
        expl: '. Pre-project physical due diligence is dramatically cheaper than mid-project discovery \u2014 ESG-aligned procurement identifies physical risks before design and construction, allowing them to be incorporated into project planning.'
      },
      {
        q: 'Why does organic office food waste in landfill generate a more potent greenhouse gas than CO₂?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Food waste contains methane when sent to landfill'},
          {l:'B', t:'Anaerobic decomposition produces methane, approximately 80× more potent than CO₂ over 20 years'},
          {l:'C', t:'Food waste contains plastics that emit nitrous oxide'},
          {l:'D', t:'Landfills concentrate greenhouse gas emissions'},
        ],
        ans: 'B',
        expl: '. Anaerobic decomposition produces methane \u2014 about 80× more potent than CO₂ over 20 years \u2014 Landfill conditions generate methane, while aerobic composting produces a significantly smaller climate impact.'
      },
      {
        q: 'Airthings for Business and Awair Element are used for which ESG-relevant function?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Calculating Scope 2 emissions'},
          {l:'B', t:'Continuous indoor air-quality monitoring of CO₂, VOCs, PM2.5, temperature, and humidity'},
          {l:'C', t:'Processing ESG data for CSRD'},
          {l:'D', t:'Managing supplier ESG assessments'},
        ],
        ans: 'B',
        expl: '. Continuous IAQ monitoring \u2014 Real-time measurements provide evidence for occupant health and wellbeing management under GRI 403 and ESRS S1. CHAPTER 14 \u2014 Phase 4: ESG Data Architecture, Dashboards and External Publication Multiple Choice Questions'
      },
    ]
  },
  {
    num: 14,
    title: 'Chapter 14: Phase 4 \u2014 ESG Data Architecture, Dashboards and External Publication',
    questions: [
      {
        q: 'What is the correct sequence for building ESG data infrastructure?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Select the platform first'},
          {l:'B', t:'Design data governance first, then select and configure the platform'},
          {l:'C', t:'Conduct assurance first'},
          {l:'D', t:'Use spreadsheets for three years, then migrate'},
        ],
        ans: 'B',
        expl: '. Design governance first, then implement the platform \u2014 Governance should define ownership, controls, processes, and evidence requirements before technology is configured.'
      },
      {
        q: 'Which four components are essential to ESG data governance?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Platform, assurer, reporting calendar, board approval'},
          {l:'B', t:'Data ownership, collection calendar, review hierarchy, documentation standard'},
          {l:'C', t:'Materiality matrix, stakeholder survey, emissions inventory, assurance'},
          {l:'D', t:'GRI, CDP, SBTi, ISSB'},
        ],
        ans: 'B',
        expl: '. Ownership · collection calendar · review hierarchy · documentation standard \u2014 These establish who owns each data point, when it is collected, who approves it, and how calculations are documented.'
      },
      {
        q: 'Workiva\'s primary competitive advantage for CSRD reporters is:',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Lowest cost per user'},
          {l:'B', t:'XBRL tagging for digital filings and an audit trail for assured disclosures'},
          {l:'C', t:'Scope 3 Category 15 PCAF calculations'},
          {l:'D', t:'NANDO AI integration'},
        ],
        ans: 'B',
        expl: '. XBRL tagging and audit trail \u2014 Its disclosure infrastructure supports version control, approval workflows, and source documentation required for regulatory and assured reporting.'
      },
      {
        q: 'What does a non-response to a CDP questionnaire communicate?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'The company has no emissions'},
          {l:'B', t:'The company is exempt from climate disclosure'},
          {l:'C', t:'A public F score for failure to disclose, which can be used as a negative signal'},
          {l:'D', t:'The company uses another framework'},
        ],
        ans: 'C',
        expl: '. A public F score \u2014 failure to disclose \u2014 CDP publishes non-response status, making it a visible negative signal for investors and rating agencies.'
      },
      {
        q: 'A board dashboard shows 12 ESG KPIs, all green. The CFO asks why targets are always met. What is the most likely governance problem?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Exceptional ESG culture'},
          {l:'B', t:'Targets are too easy, or only strong-performing metrics are shown'},
          {l:'C', t:'The ESG platform is highly accurate'},
          {l:'D', t:'The ESG program is complete'},
        ],
        ans: 'B',
        expl: '. Targets set for achievability, or cherry-picked metrics \u2014 A perpetually green dashboard can indicate weak targets or omitted material areas where performance is poor.'
      },
      {
        q: 'What is the difference between limited and reasonable assurance?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Limited covers environment; reasonable covers all ESG'},
          {l:'B', t:'Limited gives a negative conclusion; reasonable gives a positive conclusion and requires substantially more evidence'},
          {l:'C', t:'Limited is internal; reasonable is external'},
          {l:'D', t:'Limited is voluntary; reasonable is always mandatory'},
        ],
        ans: 'B',
        expl: '. Limited = negative conclusion; Reasonable = positive conclusion \u2014 Limited assurance means nothing came to the assurer\'s attention indicating material misstatement; reasonable assurance provides a positive conclusion on fair presentation.'
      },
      {
        q: 'Which external publication approach is most important for improving MSCI and Sustainalytics ESG ratings?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Publish a PDF sustainability report'},
          {l:'B', t:'Comprehensive CDP response, GRI database registration, and an investor-facing machine-readable ESG data hub'},
          {l:'C', t:'Issue an ICMA-aligned green bond'},
          {l:'D', t:'Submit a UN Global Compact Communication on Progress'},
        ],
        ans: 'B',
        expl: '. CDP + GRI database + machine-readable ESG data hub \u2014 These channels improve the visibility, accessibility, and usability of ESG data for rating agencies and investors.'
      },
      {
        q: 'A company manages ESG data in Excel, but its assurer has flagged data-lineage and formula errors for two consecutive years. What is the strongest counter-argument?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'CSRD bans Excel'},
          {l:'B', t:'Repeated assurance concerns show the spreadsheet approach cannot provide a reliable audit trail; platform investment may cost less than continued remediation and credibility loss'},
          {l:'C', t:'Excel cannot calculate Scope 3'},
          {l:'D', t:'BRSR Core requires a platform'},
        ],
        ans: 'B',
        expl: '. Assurance concerns demonstrate inadequate data lineage and controls \u2014 The issue is not data volume but audit trail, version control, and approval workflows. Repeated assurance findings are strong evidence that the current approach is inadequate. CHAPTER 15 \u2014 Phase 5: Supply Chain Decarbonisation and Scope 3 Management Multiple Choice Questions'
      },
    ]
  },
  {
    num: 15,
    title: 'Chapter 15: Phase 5 \u2014 Supply Chain Decarbonisation and Scope 3 Management',
    questions: [
      {
        q: 'For a large consumer goods company, which Scope 3 category is most likely to represent the largest share of emissions?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Category 6 \u2014 Business travel'},
          {l:'B', t:'Category 7 \u2014 Employee commuting'},
          {l:'C', t:'Category 1 \u2014 Purchased goods and services'},
          {l:'D', t:'Category 13 \u2014 Downstream leased assets'},
        ],
        ans: 'C',
        expl: '. Category 1 \u2014 Purchased goods and services \u2014 Embodied carbon in raw materials, packaging, chemicals, and textiles typically dominates consumer goods emissions, making Category 1 the key supply-chain decarbonisation priority.'
      },
      {
        q: 'Why are EcoVadis assessments preferred over bilateral supplier questionnaires?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'They are free for suppliers'},
          {l:'B', t:'One assessment can be shared with multiple buyers, reducing supplier questionnaire fatigue'},
          {l:'C', t:'They are mandatory under CSRD'},
          {l:'D', t:'They replace primary Scope 3 Category 1 data collection'},
        ],
        ans: 'B',
        expl: '. One assessment, shared with multiple buyers \u2014 This reduces supplier compliance burden while providing standardised and comparable ESG data.'
      },
      {
        q: 'What measurable outcome does the SBTi supplier engagement approach require?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'All suppliers achieve net zero by 2030'},
          {l:'B', t:'A specified percentage of supplier spend has SBTi-validated targets by a specified year'},
          {l:'C', t:'All supplier emissions reach zero'},
          {l:'D', t:'Suppliers match the buyer\'s emissions intensity'},
        ],
        ans: 'B',
        expl: '. Specified % of supplier spend with validated SBTi targets \u2014 The approach creates a measurable supplier-engagement metric and drives decarbonisation within suppliers\' own operations.'
      },
      {
        q: 'Which product categories are initially covered by the EU Carbon Border Adjustment Mechanism (CBAM)?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'All manufactured goods'},
          {l:'B', t:'Cement, iron and steel, aluminium, fertilisers, electricity, and hydrogen'},
          {l:'C', t:'Only goods from countries without carbon pricing'},
          {l:'D', t:'Fossil fuels and aviation fuel'},
        ],
        ans: 'B',
        expl: '. Cement, iron and steel, aluminium, fertilisers, electricity, and hydrogen \u2014 These carbon-intensive sectors were selected because of their high carbon-leakage risk. Financial charges based on EU ETS prices apply from 2026.'
      },
      {
        q: 'A retailer imports 10,000 tonnes of steel annually at 1.8 tCO₂e/tonne. At €65/tCO₂e, what is the approximate annual CBAM cost?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'€65,000'},
          {l:'B', t:'€1.17 million \u2014 with a potential €585,000 annual saving from sourcing steel at 0.9 tCO₂e/tonne'},
          {l:'C', t:'€18 million'},
          {l:'D', t:'€650,000'},
        ],
        ans: 'B',
        expl: '. Approximately €1.17 million \u2014 10,000 × 1.8 × €65 = €1.17 million. Halving carbon intensity would roughly halve the cost, creating a direct commercial incentive for lower-carbon sourcing.'
      },
      {
        q: 'When is an ESG Supplier Code of Conduct legally enforceable?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'When published on the company website'},
          {l:'B', t:'When incorporated into the supplier contract, with audit rights and specified consequences for non-compliance'},
          {l:'C', t:'When signed and notarised by the supplier CEO'},
          {l:'D', t:'When registered with a trade association'},
        ],
        ans: 'B',
        expl: '. Contractual incorporation + audit rights + specified consequences \u2014 Together, these make the code a binding contractual obligation and provide mechanisms to verify and enforce compliance.'
      },
      {
        q: 'Apple\'s Supplier Clean Energy Program represents supplier transformation rather than assessment. Why does this matter for Scope 3 Category 1?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'There is no meaningful difference'},
          {l:'B', t:'Assessment improves data; transformation through renewable energy, technical assistance, and financing actually reduces emissions'},
          {l:'C', t:'Transformation is only possible for technology companies'},
          {l:'D', t:'Assessment is required by CSRD; transformation is voluntary'},
        ],
        ans: 'B',
        expl: '. Assessment produces better data; transformation produces actual emissions reduction \u2014 Questionnaires measure emissions, but only changes to supplier energy sources, processes, and efficiency reduce the underlying Scope 3 emissions.'
      },
      {
        q: 'What does Scope 3 Category 15 \u2014 Investments \u2014 represent?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Pension portfolio emissions only'},
          {l:'B', t:'Financed emissions from loans, equity investments, and insurance underwriting, typically calculated using PCAF'},
          {l:'C', t:'Emissions from capital goods purchased'},
          {l:'D', t:'Downstream distribution emissions'},
        ],
        ans: 'B',
        expl: '. Financed emissions from loans, equity, and underwriting \u2014 Category 15 is especially significant for financial institutions because financed emissions can vastly exceed their own operational emissions. PCAF provides the calculation methodology. CHAPTER 16 \u2014 Phase 6: Target Setting, Progress Tracking and Continuous Improvement Multiple Choice Questions'
      },
    ]
  },
  {
    num: 16,
    title: 'Chapter 16: Phase 6 \u2014 Target Setting, Progress Tracking and Continuous Improvement',
    questions: [
      {
        q: 'What two-target structure does the SBTi Net-Zero Standard require?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Net zero by 2030 for Scope 1 and by 2050 for all scopes'},
          {l:'B', t:'Near-term: 42%+ Scope 1 and 2 reduction by 2030; long-term: 90–95% reduction across Scope 1, 2, and material Scope 3 by 2050, with permanent removal for residual emissions'},
          {l:'C', t:'Carbon neutrality by 2030 through offsets; net zero by 2050'},
          {l:'D', t:'50% Scope 1 reduction followed by 100% reductions through offsets'},
        ],
        ans: 'B',
        expl: '. 42%+ near-term reduction; 90–95% long-term reduction with permanent removal \u2014 Near-term targets drive immediate action, while the long-term target requires deep value-chain decarbonisation and permanent removal of residual emissions.'
      },
      {
        q: 'What is the critical difference between "carbon neutral" and a validated SBTi net-zero target?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'There is no meaningful difference'},
          {l:'B', t:'Carbon neutral can rely on carbon credits; SBTi net zero requires 90–95% actual emissions reduction plus permanent removal of residual emissions'},
          {l:'C', t:'Carbon neutral is more demanding'},
          {l:'D', t:'Net zero applies only to Scope 1'},
        ],
        ans: 'B',
        expl: '. Carbon neutral = offsets; Net zero = physical transformation + permanent removal \u2014 Offsets can compensate for emissions without reducing them, whereas SBTi net zero requires substantial physical emissions reductions.'
      },
      {
        q: 'A company reduces Scope 1 and 2 emissions by 3% annually against an SBTi target requiring 5%. What should its RAG status be?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Green'},
          {l:'B', t:'Amber'},
          {l:'C', t:'Red'},
          {l:'D', t:'Grey'},
        ],
        ans: 'B',
        expl: '. Amber \u2014 below the required pace \u2014 The company is falling behind its committed trajectory. Amber should trigger management review and corrective action before the gap becomes critical.'
      },
      {
        q: 'A company moves its net-zero target from 2040 to 2045 and changes its base year from 2019 to 2021. What should an ESG analyst ask?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'No questions \u2014 revisions are normal'},
          {l:'B', t:'Why was the target extended? Why was the base year changed? Is the new base year more favourable? Has SBTi validation been updated? Is the change transparently explained?'},
          {l:'C', t:'Whether the difference will be offset'},
          {l:'D', t:'Whether the European Commission approved it'},
        ],
        ans: 'B',
        expl: '. Scrutinise the extension, base-year change, SBTi validation, and transparency \u2014 Target changes may reflect genuine reassessment or weakened ambition. A lower-emission base year can make progress appear stronger than it is.'
      },
      {
        q: 'When should the annual ESG assurance engagement normally occur?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'1., before data collection'},
          {l:'B', t:'4. and after year-close, once data is collected, consolidated, and internally reviewed'},
          {l:'C', t:'2., during data collection'},
          {l:'D', t:'Always alongside the financial audit in 1.'},
        ],
        ans: 'B',
        expl: '. 4. and after year-close \u2014 Assurance requires a complete, reviewed dataset. The typical sequence is data collection → consolidation/review → assurance → publication.'
      },
      {
        q: 'How long does a company have under the SBTi commitment process to submit validated targets after signing its commitment letter?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'6 months'},
          {l:'B', t:'12 months'},
          {l:'C', t:'24 months'},
          {l:'D', t:'5 years'},
        ],
        ans: 'C',
        expl: '. Twenty-four months \u2014 SBTi provides 24 months from commitment-letter signing to submit validated science-based targets, creating a public accountability timeline.'
      },
      {
        q: 'Ørsted moved its Scope 1 and 2 net-zero target from 2040 to 2025 and explained the revision transparently. What does this demonstrate?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Targets should always be revised upward'},
          {l:'B', t:'Transparent acceleration strengthens ESG credibility by demonstrating dynamic, evidence-based target management'},
          {l:'C', t:'Companies should initially set conservative targets'},
          {l:'D', t:'SBTi validation must always be reapplied'},
        ],
        ans: 'B',
        expl: '. Transparent acceleration strengthens credibility \u2014 Updating targets based on improved performance and clearly explaining the methodology demonstrates management rigor rather than greenwashing.'
      },
      {
        q: 'Which combination represents a complete annual investor ESG engagement approach?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Publishing the ESG report'},
          {l:'B', t:'Rating-agency and investor data provision, honest ESG reporting including gaps, and AGM/shareholder-resolution preparation'},
          {l:'C', t:'Attending one ESG conference'},
          {l:'D', t:'Issuing a green bond'},
        ],
        ans: 'B',
        expl: '. Data provision + honest narrative + AGM preparation \u2014 Together these address ESG ratings, investor confidence, and shareholder engagement throughout the annual cycle. CHAPTER 17 \u2014 Greenwashing, Greenhushing and ESG Fraud Multiple Choice Questions'
      },
    ]
  },
  {
    num: 17,
    title: 'Chapter 17: Greenwashing, Greenhushing and ESG Fraud',
    questions: [
      {
        q: 'Which best describes greenwashing?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Any discussion of environmental topics'},
          {l:'B', t:'Misleading, unsubstantiated, selectively presented, or false sustainability claims'},
          {l:'C', t:'An unaudited sustainability report'},
          {l:'D', t:'Failure to achieve a net-zero target'},
        ],
        ans: 'B',
        expl: '. Misleading, unsubstantiated, or selectively presented environmental claims \u2014 Greenwashing is the gap between the impression created and reality. Even a single unsupported claim can constitute greenwashing.'
      },
      {
        q: 'What distinguishes the EU Green Claims Directive from earlier environmental marketing regulation?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'It bans environmental claims'},
          {l:'B', t:'It requires companies to substantiate claims with lifecycle evidence before making them'},
          {l:'C', t:'It requires environmental claims in XBRL'},
          {l:'D', t:'It applies only to carbon claims'},
        ],
        ans: 'B',
        expl: '. Pre-substantiation \u2014 companies must prove claims before making them \u2014 The approach shifts compliance from reactive enforcement to proactive verification, requiring documented evidence before publication.'
      },
      {
        q: 'DWS Group paid USD 40 million in penalties to US and German regulators in 2023. What was the specific allegation?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'DWS invested in companies excluded by its ESG screens'},
          {l:'B', t:'DWS overstated ESG integration in its Annual Report and marketing, claiming over USD 459 billion in ESG-integrated assets despite allegedly superficial integration'},
          {l:'C', t:'DWS failed to disclose its carbon footprint'},
          {l:'D', t:'DWS issued a non-compliant green bond'},
        ],
        ans: 'B',
        expl: '. Overstating ESG integration where practice was allegedly superficial \u2014 The case demonstrated that misrepresenting ESG practices in financial disclosures can create securities-enforcement risk.'
      },
      {
        q: 'What is greenhushing, and why is it a market failure?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Exaggerating ESG performance'},
          {l:'B', t:'Genuine ESG performers choosing not to communicate their performance, limiting market information'},
          {l:'C', t:'Reporting ESG data only to regulators'},
          {l:'D', t:'Publishing inaccessible ESG data'},
        ],
        ans: 'B',
        expl: '. Genuine performers going silent \u2014 Greenhushing can prevent capital markets from distinguishing strong ESG performers from weaker ones, distorting efficient capital allocation.'
      },
      {
        q: 'A retailer advertises clothing as "CFC-free." Which greenwashing category does this represent?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Vague or unsubstantiated claim'},
          {l:'B', t:'Selective disclosure'},
          {l:'C', t:'Irrelevant claim \u2014 presenting a legal baseline as a voluntary achievement'},
          {l:'D', t:'Misleading carbon offset claim'},
        ],
        ans: 'C',
        expl: '. Irrelevant claim \u2014 CFCs have been banned for decades \u2014 Presenting a legally required baseline as a sustainability achievement creates a misleading impression of differentiated environmental performance.'
      },
      {
        q: 'What principle did the DWS case establish about the Chief Sustainability Officer?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'CSOs cannot make whistleblower disclosures'},
          {l:'B', t:'CSOs can act as whistleblowers, and their professional judgement on ESG disclosure accuracy can have legal significance'},
          {l:'C', t:'CSOs are personally liable for all greenwashing'},
          {l:'D', t:'CSOs must be qualified accountants'},
        ],
        ans: 'B',
        expl: '. CSOs can be whistleblowers, with legally significant ESG judgement \u2014 The DWS case demonstrated that concerns raised by sustainability professionals about ESG disclosure accuracy can trigger regulatory investigations and enforcement.'
      },
      {
        q: 'A company claims carbon neutrality through carbon credits and markets this as "net-zero leadership." What is the most accurate description?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Accurate if the credits are Gold Standard certified'},
          {l:'B', t:'Potentially misleading \u2014 conflating carbon neutrality through offsets with net zero through physical emissions reduction'},
          {l:'C', t:'Acceptable because carbon neutrality is recognized'},
          {l:'D', t:'Greenwashing only for companies with fewer than 500 employees'},
        ],
        ans: 'B',
        expl: '. Potentially misleading offset claim \u2014 Carbon neutrality achieved through offsets does not necessarily reduce actual emissions. Presenting it as evidence of net-zero transformation can create a misleading impression of climate progress.'
      },
      {
        q: 'What greenwashing risk does the "materiality of claim relative to overall performance" test address?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Claiming carbon performance when water is more material'},
          {l:'B', t:'Selective disclosure \u2014 disproportionately highlighting a minor improvement while omitting larger negative impacts'},
          {l:'C', t:'Using an incorrect emissions factor'},
          {l:'D', t:'Using unverified supplier data'},
        ],
        ans: 'B',
        expl: '. Selective disclosure \u2014 A claim can be individually accurate yet misleading if it highlights a minor improvement while creating the impression of broader sustainability transformation. CHAPTER 18 \u2014 The Anti-ESG Backlash Multiple Choice Questions'
      },
    ]
  },
  {
    num: 18,
    title: 'Chapter 18: The Anti-ESG Backlash',
    questions: [
      {
        q: 'What is the strongest fiduciary-duty argument against ESG integration?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'ESG is illegal under US federal law'},
          {l:'B', t:'Using ESG criteria for non-financial objectives can breach the duty to act in beneficiaries\' best financial interests, particularly if returns are reduced'},
          {l:'C', t:'ESG is legal only for private investors'},
          {l:'D', t:'ESG is too complex for investment managers'},
        ],
        ans: 'B',
        expl: '. ESG may deviate from the duty to maximize beneficiaries\' financial interests \u2014 The strength of this argument depends on whether ESG is treated as non-financial or as financially material risk. If ESG risks affect returns, considering them can fulfil rather than breach fiduciary duty.'
      },
      {
        q: 'What is the strongest ESG response to the political-neutrality argument?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'The argument has no merit'},
          {l:'B', t:'ESG contains judgements about future energy systems and corporate obligations; scientific consensus, financial risk, and policy judgement must be clearly distinguished'},
          {l:'C', t:'ESG decisions are democratically made by shareholders'},
          {l:'D', t:'The argument applies only to government pension funds'},
        ],
        ans: 'B',
        expl: '. ESG embeds judgements that must be distinguished from science and financial risk \u2014 Climate policy involves genuine political debate. ESG is more defensible when it clearly separates scientific evidence, financial risk assessment, and policy choices.'
      },
      {
        q: 'What financial consequence followed Texas Senate Bill 13 (2021), which restricted contracting with financial companies that "boycott" fossil fuels?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Texas borrowing costs fell'},
          {l:'B', t:'Municipal borrowing costs increased as major underwriters were excluded; Wharton estimated USD 303–532 million in additional costs over eight months'},
          {l:'C', t:'There was no measurable impact'},
          {l:'D', t:'State finances improved'},
        ],
        ans: 'B',
        expl: '. Higher municipal borrowing costs from reduced competition \u2014 Excluding major underwriters reduced competition in Texas\'s municipal bond market, increasing borrowing costs.'
      },
      {
        q: 'Which action formed part of the second Trump administration\'s anti-ESG federal approach?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Requiring SBTi net-zero targets'},
          {l:'B', t:'Reviewing/removing ESG requirements, de-prioritizing SEC climate enforcement, and revising ERISA ESG guidance'},
          {l:'C', t:'Joining the EU Taxonomy'},
          {l:'D', t:'Requiring GRI reports from federal contractors'},
        ],
        ans: 'B',
        expl: '. Review/remove ESG requirements, de-prioritize SEC enforcement, and revise ERISA guidance \u2014 The administration targeted the regulatory infrastructure supporting ESG in corporate disclosure, pension investment, and federal contracting.'
      },
      {
        q: 'Why did several major US banks withdraw from the Net Zero Banking Alliance in 2024–2025?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'They concluded climate change was not financially material'},
          {l:'B', t:'Republican state attorneys general raised antitrust concerns over coordinated climate-finance commitments, creating legal and political risk'},
          {l:'C', t:'The NZBA was dissolved by the UN'},
          {l:'D', t:'Institutional investors required withdrawal'},
        ],
        ans: 'B',
        expl: '. Antitrust threats created material legal risk \u2014 Even where the underlying legal argument was considered weak, litigation uncertainty made NZBA membership a liability-management issue for several institutions.'
      },
      {
        q: 'BlackRock increasingly replaced "ESG" with terms such as "material risk management" and "long-term value creation." What does this represent?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Abandonment of ESG investing'},
          {l:'B', t:'Defensive communication adaptation to reduce US political exposure while retaining substantive ESG risk analysis'},
          {l:'C', t:'SEC prohibition of the term ESG'},
          {l:'D', t:'A new proprietary investment framework'},
        ],
        ans: 'B',
        expl: '. Communication adaptation \u2014 underlying analysis remained \u2014 The terminology changed, while assessment of climate, governance, regulatory, and other material risks remained part of the investment analysis.'
      },
      {
        q: 'What emerging mechanism addresses concerns about democratic accountability in large passive asset managers?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Mandatory quarterly ESG reporting'},
          {l:'B', t:'Pass-through voting, allowing investors to direct voting on selected resolutions'},
          {l:'C', t:'Democratic election of ESG rating agencies'},
          {l:'D', t:'Limiting passive ownership to 5%'},
        ],
        ans: 'B',
        expl: '. Pass-through voting \u2014 It allows eligible investors to exercise greater influence over voting decisions rather than delegating all voting authority to the asset manager.'
      },
      {
        q: 'Europe\'s CSRD double-materiality requirement reflects which corporate-governance model?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Shareholder primacy'},
          {l:'B', t:'Stakeholder capitalism \u2014 obligations extend to employees, communities, and the environment'},
          {l:'C', t:'Financial materialism'},
          {l:'D', t:'Regulatory minimalism'},
        ],
        ans: 'B',
        expl: '. Stakeholder capitalism \u2014 Double materiality requires companies to report both how sustainability issues affect the company and how the company\'s activities affect people and the environment. Absolutely. I\'ll apply the same "compress, don\'t change" rule: all questions, answers, facts, learning objectives, examples, and difficulty levels remain intact. I\'m only tightening the language and making the explanations sharper and more professional. # CHAPTER 19 \u2014 AI, Technology and the Future of ESG Data ## Multiple Choice Questions'
      },
    ]
  },
  {
    num: 19,
    title: 'Chapter 19: AI, Technology and the Future of ESG Data',
    questions: [
      {
        q: 'What key limitation of conventional ESG analysis can AI and satellite technology address?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'ESG analysis is too expensive for small companies'},
          {l:'B', t:'It measures disclosure quality more than underlying performance, making undisclosed or misleading impacts largely invisible'},
          {l:'C', t:'ESG analysis requires too many human analysts'},
          {l:'D', t:'ESG frameworks are too complex without AI'},
        ],
        ans: 'B',
        expl: '. Disclosure quality rather than underlying performance \u2014 Volkswagen illustrated this gap: strong ESG scores coexisted with undisclosed environmental fraud. Satellite imagery, IoT sensors, and supply-chain platforms provide independently observed data beyond company disclosures. ---'
      },
      {
        q: 'What pattern has satellite methane detection found in oil and gas emissions reporting?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Companies consistently overreport methane emissions'},
          {l:'B', t:'Actual methane emissions are systematically higher than self-reported figures in multiple major producing basins'},
          {l:'C', t:'Satellite data confirms self-reported figures are accurate'},
          {l:'D', t:'Methane emissions have declined to zero'},
        ],
        ans: 'B',
        expl: '. Actual emissions exceed self-reported figures \u2014 Satellite studies show a systematic gap between observed and reported methane emissions. Differences can reflect methodology, detection thresholds, and coverage, not necessarily fraud. ---'
      },
      {
        q: 'Why has the UFLPA accelerated investment in supply-chain mapping?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'It requires AI-generated supply-chain maps'},
          {l:'B', t:'Its rebuttable presumption regarding Xinjiang forced labour makes supply-chain traceability a legal compliance requirement with commercial consequences'},
          {l:'C', t:'It provides tax incentives for supply-chain AI'},
          {l:'D', t:'It requires monthly supply-chain disclosures to US Customs'},
        ],
        ans: 'B',
        expl: '. Legal compliance requires supply-chain traceability \u2014 Importers must demonstrate that goods do not involve Xinjiang forced labour. Without visibility beyond Tier 1, this is difficult, creating a strong commercial incentive for supply-chain mapping. ---'
      },
      {
        q: 'An AI system produces a CSRD-aligned disclosure containing a material Scope 3 Category 1 error. Who is responsible?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'The AI software provider'},
          {l:'B', t:'The company \u2014 disclosure accountability cannot be delegated to AI'},
          {l:'C', t:'The company and AI provider equally'},
          {l:'D', t:'No one'},
        ],
        ans: 'B',
        expl: '. The company \u2014 AI may execute the reporting process, but it does not transfer legal accountability. The company signs the disclosure, the board approves it, and the assurance process examines it. ---'
      },
      {
        q: 'What level of global data-center electricity consumption does the IEA estimate by 2030?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'10–20 TWh'},
          {l:'B', t:'100–200 TWh'},
          {l:'C', t:'650–1,000 TWh \u2014 roughly Japan\'s current annual consumption'},
          {l:'D', t:'10,000 TWh'},
        ],
        ans: 'C',
        expl: '. 650–1,000 TWh \u2014 The IEA\'s estimate represents more than a doubling from 2022 levels, driven substantially by AI infrastructure. At the midpoint, data centres would consume roughly 3% of global electricity generation. ---'
      },
      {
        q: 'What Scope 3 obligation does Global Forest Watch most directly support?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Category 6 \u2014 business travel'},
          {l:'B', t:'Category 1 \u2014 purchased goods and services, including verification of zero-deforestation commitments'},
          {l:'C', t:'Category 11 \u2014 use of sold products'},
          {l:'D', t:'Category 15 \u2014 financed emissions'},
        ],
        ans: 'B',
        expl: '. Category 1 \u2014 purchased goods and services \u2014 Satellite forest-cover data can independently verify deforestation risks associated with palm oil, soy, cattle, timber, and other forest-risk commodities against supplier commitments. ---'
      },
      {
        q: 'What is the "AI energy paradox" for ESG professionals?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'AI is too expensive for ESG analysis'},
          {l:'B', t:'AI\'s energy and water footprint creates ESG impacts that companies using AI for ESG should also measure and disclose'},
          {l:'C', t:'AI cannot calculate carbon emissions accurately'},
          {l:'D', t:'AI\'s energy use eliminates all carbon savings it identifies'},
        ],
        ans: 'B',
        expl: '. AI creates its own ESG footprint \u2014 Companies using AI to improve ESG performance must also account for the energy and water impacts of the AI infrastructure. Cloud services and infrastructure can create relevant Scope 3 impacts. ---'
      },
      {
        q: 'How does agentic AI differ from analytical AI?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Agentic AI is more accurate'},
          {l:'B', t:'Agentic AI takes autonomous action within defined parameters; analytical AI generates outputs for human action'},
          {l:'C', t:'Agentic AI works only for financial analysis'},
          {l:'D', t:'Agentic AI requires no human oversight'},
        ],
        ans: 'B',
        expl: '. Agentic AI takes autonomous action \u2014 An analytical system may identify an ESG gap for human review, while an agentic system could automatically trigger supplier engagement or update disclosures. Agentic AI therefore requires clearly defined authority, controls, approvals, and error handling. --- # CHAPTER 20 \u2014 Nature, Biodiversity and the Future of ESG ## Multiple Choice Questions'
      },
    ]
  },
  {
    num: 20,
    title: 'Chapter 20: Nature, Biodiversity and the Future of ESG',
    questions: [
      {
        q: 'What value of global GDP does the WEF estimate is moderately or highly dependent on nature and ecosystem services?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'US$5 trillion'},
          {l:'B', t:'US$22 trillion'},
          {l:'C', t:'More than US$44 trillion \u2014 over half of global GDP'},
          {l:'D', t:'US$100 trillion'},
        ],
        ans: 'C',
        expl: '. More than US$44 trillion \u2014 The WEF\'s *Nature Risk Rising* report established that more than US$44 trillion of economic value generation depends moderately or highly on nature. This makes nature risk a mainstream financial concern. ---'
      },
      {
        q: 'What does the TNFD LEAP methodology stand for?',
        diff: 'Foundation',
        opts: [
          {l:'A', t:'Lend, Engage, Assess, Publish'},
          {l:'B', t:'Locate, Evaluate, Assess, Prepare'},
          {l:'C', t:'List, Examine, Analyze, Present'},
          {l:'D', t:'Link, Estimate, Account, Promote'},
        ],
        ans: 'B',
        expl: '. Locate, Evaluate, Assess, Prepare \u2014 LEAP provides a structured approach to nature-risk assessment. Its location-first approach is distinctive because nature-related risks are strongly geographically specific. ---'
      },
      {
        q: 'Why are biodiversity credits likely to develop as regional rather than global markets?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'WTO rules prohibit them'},
          {l:'B', t:'Biodiversity is inherently local and requires geographic equivalence'},
          {l:'C', t:'They are too complex for institutional investors'},
          {l:'D', t:'They apply only to tropical regions'},
        ],
        ans: 'B',
        expl: '. Biodiversity is inherently local \u2014 Unlike carbon, which mixes globally in the atmosphere, biodiversity is not geographically fungible. Restoring one ecosystem cannot directly compensate for destroying a fundamentally different ecosystem elsewhere. ---'
      },
      {
        q: 'What type of ESG risk does the Kunming-Montreal Global Biodiversity Framework\'s 30-by-30 target create for land-dependent industries?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Physical nature risk'},
          {l:'B', t:'Transition risk from regulatory responses to biodiversity loss'},
          {l:'C', t:'Reputational risk only'},
          {l:'D', t:'Social risk only'},
        ],
        ans: 'B',
        expl: '. Transition risk \u2014 Land-use restrictions, habitat protection, and elimination of environmentally harmful subsidies can create financial consequences for agriculture, mining, forestry, and other land-dependent businesses.'
      },
      {
        q: 'What does the 2021–2022 Taiwan semiconductor drought demonstrate about water risk?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Semiconductor companies should relocate to wetter regions'},
          {l:'B', t:'Water scarcity can disrupt production and create supply-chain risk far beyond the directly affected company'},
          {l:'C', t:'Water risk affects only agriculture'},
          {l:'D', t:'Taiwan should invest in desalination'},
        ],
        ans: 'B',
        expl: '. Production and supply-chain risk \u2014 TSMC\'s water constraints demonstrated how physical water risk can disrupt semiconductor production and propagate through global supply chains. Companies dependent on semiconductors can therefore face indirect material water risk.'
      },
      {
        q: 'What does the "just transition" concept require?',
        diff: 'Intermediate',
        opts: [
          {l:'A', t:'Transition as quickly as possible regardless of disruption'},
          {l:'B', t:'A fair transition for workers and communities dependent on high-carbon industries'},
          {l:'C', t:'Reliance primarily on carbon pricing'},
          {l:'D', t:'Permanent fossil-fuel employment subsidies'},
        ],
        ans: 'B',
        expl: '. A fair transition for workers and communities \u2014 A just transition addresses retraining, income support, community investment, and participation in transition decisions so environmental progress does not disproportionately burden vulnerable communities.'
      },
      {
        q: 'Which ESG strategy is most robust across both convergence and fragmentation scenarios for 2035?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'Optimizing ESG communications and current disclosure compliance'},
          {l:'B', t:'Building genuine performance, measurement, governance, nature-risk understanding, and supply-chain visibility'},
          {l:'C', t:'Waiting for regulatory certainty'},
          {l:'D', t:'Choosing one dominant framework'},
        ],
        ans: 'B',
        expl: '. Build genuine underlying performance \u2014 Real performance remains robust whether standards converge or fragment. Companies that optimize only for disclosure requirements remain exposed when standards change or independent data reveals gaps between reporting and reality.'
      },
      {
        q: 'What is the key ESG governance lesson from Patagonia\'s 2022 ownership restructure?',
        diff: 'Advanced',
        opts: [
          {l:'A', t:'All companies should transfer ownership to non-profits'},
          {l:'B', t:'Structural governance mechanisms make ESG commitments more durable than policies or statements'},
          {l:'C', t:'Private companies make better ESG decisions'},
          {l:'D', t:'ESG commitments require founder control'},
        ],
        ans: 'B',
        expl: '. Structural mechanisms are more durable \u2014 Patagonia demonstrates the value of embedding ESG commitments into governance and ownership structures. For other organisations, this could mean stronger board mandates, ESG-linked incentives with claw backs, or contractual stakeholder commitments.'
      },
    ]
  },
];
