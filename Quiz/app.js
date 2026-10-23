/**
 * ESG Mastery Quiz — app.js v1.0
 * 20 chapters, 160 questions, left-sidebar tabs
 * Stateless: every load starts blank
 */
'use strict';

// State
const ANSWERS = {};     // { 'ch1-q1': 'B', ... }
let SUBMITTED = false;
let SHOW_REVIEW = false;
let USER_NAME = '';

/* ── INIT ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', function () {
  buildChapterNav();
  buildChapterPanels();
});

/* ── BUILD NAV ────────────────────────────────────────────── */
function buildChapterNav() {
  const container = document.getElementById('chapterNavItems');
  let html = '';
  QUIZ_DATA.forEach((ch, i) => {
    const short = ch.title.replace(/^Chapter \d+:\s*/, '').replace('Phase 1 —', 'Ph1 —').replace('Phase 2 —', 'Ph2 —').replace('Phase 3 —', 'Ph3 —').replace('Phase 4 —', 'Ph4 —').replace('Phase 5 —', 'Ph5 —').replace('Phase 6 —', 'Ph6 —');
    html += `<button class="nav-item" data-tab="ch-${ch.num}" onclick="switchTab('ch-${ch.num}')" id="nav-ch-${ch.num}">
      <span class="nav-icon">${getChIcon(ch.num)}</span>
      <span class="nav-label" title="${ch.title}">Ch ${ch.num}: ${short.substring(0,28)}${short.length>28?'…':''}</span>
      <span class="nav-badge" id="nbadge-${ch.num}" style="display:none"></span>
    </button>`;
  });
  container.innerHTML = html;
}

function getChIcon(n) {
  const icons = ['🌍','🏛','⚖️','📋','🇪🇺','🇺🇸','🌏','💰','🔗','⭐','🎯','🏢','🏗️','📊','🔗','🎯','⚠️','🔥','🤖','🌿'];
  return icons[(n-1) % icons.length];
}

/* ── BUILD PANELS ─────────────────────────────────────────── */
function buildChapterPanels() {
  const container = document.getElementById('chapterPanels');
  QUIZ_DATA.forEach(ch => {
    const panel = document.createElement('div');
    panel.className = 'tab-panel';
    panel.id = 'panel-ch-' + ch.num;
    panel.innerHTML = buildChapterHTML(ch);
    container.appendChild(panel);
  });
}

function buildChapterHTML(ch) {
  const shortTitle = ch.title.replace(/^Chapter \d+:\s*/, '');
  let qHTML = '';
  ch.questions.forEach((q, qi) => {
    const qKey = `ch${ch.num}-q${qi}`;
    qHTML += `
      <div class="q-card" id="qcard-${qKey}">
        <div class="q-top">
          <div class="q-num" id="qnum-${qKey}">${qi+1}</div>
          <div class="q-diff-wrap">
            <span class="q-diff-tag diff-${q.diff}">${q.diff}</span>
            <div class="q-text">${q.q}</div>
          </div>
        </div>
        <div class="q-options" id="qopts-${qKey}">
          ${q.opts.map(opt => `
            <label class="opt-label" id="optlbl-${qKey}-${opt.l}" onclick="selectOpt('${qKey}','${opt.l}')">
              <input type="radio" name="${qKey}" value="${opt.l}"/>
              <div class="opt-radio" id="optradio-${qKey}-${opt.l}"></div>
              <span class="opt-letter">${opt.l}.</span>
              <span class="opt-text">${opt.t}</span>
            </label>`).join('')}
        </div>
        <div class="q-explanation" id="qexpl-${qKey}"></div>
      </div>`;
  });

  return `
    <div class="ch-wrap">
      <div class="ch-header">
        <div>
          <div class="ch-title">Chapter ${ch.num}: ${shortTitle}</div>
          <div class="ch-sub">8 questions · Select one answer per question</div>
        </div>
        <div class="ch-stats">
          <div class="ch-stat"><div class="ch-stat-val" id="ch-answered-${ch.num}">0</div><div class="ch-stat-lbl">Answered</div></div>
          <div class="ch-stat"><div class="ch-stat-val">8</div><div class="ch-stat-lbl">Total</div></div>
        </div>
      </div>
      ${qHTML}
      <div style="display:flex;gap:12px;margin-top:8px;flex-wrap:wrap">
        ${ch.num < 20 ? `<button class="start-btn" style="font-size:0.82rem;padding:10px 22px" onclick="switchTab('ch-${ch.num+1}')">Next: Chapter ${ch.num+1} →</button>` : ''}
        <button class="start-btn" style="font-size:0.82rem;padding:10px 22px;background:linear-gradient(135deg,#16a34a,#059669)" onclick="submitAll()">Submit All &amp; See Results</button>
        ${ch.num === 20 ? `<button class="start-btn" style="font-size:0.82rem;padding:10px 22px;background:linear-gradient(135deg,#b8860b,#daa520)" onclick="printCertificate()">🏆 Print Certificate</button>` : ''}
      </div>
    </div>`;
}

/* ── SELECT OPTION ────────────────────────────────────────── */
function selectOpt(qKey, letter) {
  if (SUBMITTED) return;
  ANSWERS[qKey] = letter;

  // Update UI for this question
  const ch = parseInt(qKey.split('-')[0].replace('ch',''));
  const opts = QUIZ_DATA[ch-1].questions[parseInt(qKey.split('-')[1].replace('q',''))].opts;

  opts.forEach(o => {
    const lbl = document.getElementById(`optlbl-${qKey}-${o.l}`);
    if (lbl) lbl.className = 'opt-label' + (o.l === letter ? ' selected' : '');
  });

  const qnum = document.getElementById('qnum-' + qKey);
  if (qnum) qnum.className = 'q-num q-answered';
  const card = document.getElementById('qcard-' + qKey);
  if (card) card.className = 'q-card answered';

  updateChStats(ch);
  updateGlobalProgress();
}

/* ── UPDATE STATS ─────────────────────────────────────────── */
function updateChStats(chNum) {
  const ch = QUIZ_DATA[chNum-1];
  let answered = 0;
  ch.questions.forEach((q, qi) => {
    if (ANSWERS[`ch${chNum}-q${qi}`]) answered++;
  });
  const el = document.getElementById('ch-answered-' + chNum);
  if (el) el.textContent = answered;

  // Update nav badge
  const badge = document.getElementById('nbadge-' + chNum);
  if (badge) {
    if (answered === 8) {
      badge.className = 'nav-badge nav-badge-done';
      badge.textContent = '✓';
      badge.style.display = '';
    } else if (answered > 0) {
      badge.className = 'nav-badge nav-badge-part';
      badge.textContent = answered;
      badge.style.display = '';
    } else {
      badge.style.display = 'none';
    }
  }
}

function updateGlobalProgress() {
  const total = 160;
  const answered = Object.keys(ANSWERS).length;
  document.getElementById('spAnswered').textContent = answered;
  document.getElementById('spFill').style.width = (answered/total*100) + '%';
}

function updateName() {
  USER_NAME = document.getElementById('userName').value.trim();
}

/* ── TAB SWITCH ───────────────────────────────────────────── */
function switchTab(tabId) {
  document.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const panel = document.getElementById('panel-' + tabId);
  if (panel) panel.classList.add('active');
  const navBtn = document.querySelector(`[data-tab="${tabId}"]`);
  if (navBtn) navBtn.classList.add('active');
  document.getElementById('mainContent').scrollTop = 0;
}

/* ── SUBMIT ───────────────────────────────────────────────── */
function submitAll() {
  if (SUBMITTED) { switchTab('results'); return; }

  const answered = Object.keys(ANSWERS).length;
  if (answered < 1) {
    alert('Please answer at least one question before submitting.');
    return;
  }
  if (answered < 160) {
    const go = confirm(`You have answered ${answered} of 160 questions. Unanswered questions will be marked incorrect. Submit now?`);
    if (!go) return;
  }

  SUBMITTED = true;
  buildResults();
  switchTab('results');
  document.getElementById('resultsBadge').style.display = '';
}

/* ── REVIEW ANSWERS ───────────────────────────────────────── */
function showReview() {
  SHOW_REVIEW = true;
  QUIZ_DATA.forEach((ch, ci) => {
    ch.questions.forEach((q, qi) => {
      const qKey = `ch${ch.num}-q${qi}`;
      const userAns = ANSWERS[qKey] || null;
      const correct = q.ans;
      const card = document.getElementById('qcard-' + qKey);
      if (!card) return;

      // Colour options
      q.opts.forEach(o => {
        const lbl = document.getElementById(`optlbl-${qKey}-${o.l}`);
        if (!lbl) return;
        if (o.l === correct) {
          lbl.className = 'opt-label opt-correct';
        } else if (o.l === userAns && userAns !== correct) {
          lbl.className = 'opt-label opt-wrong';
        } else {
          lbl.className = 'opt-label';
        }
      });

      // Question num colour
      const qnum = document.getElementById('qnum-' + qKey);
      if (qnum) {
        if (!userAns) qnum.className = 'q-num q-incorrect';
        else if (userAns === correct) qnum.className = 'q-num q-correct';
        else qnum.className = 'q-num q-incorrect';
      }

      // Card border
      if (card) {
        if (!userAns || userAns !== correct) card.className = 'q-card incorrect';
        else card.className = 'q-card correct';
      }

      // Explanation
      const explEl = document.getElementById('qexpl-' + qKey);
      if (explEl) {
        const isCorrect = userAns === correct;
        explEl.className = 'q-explanation show' + (isCorrect ? '' : ' wrong-expl');
        explEl.innerHTML = `<strong>${isCorrect ? '✅ Correct!' : `❌ Correct answer: ${correct}`}</strong> — ${q.expl}`;
      }
    });
  });
}

/* ── BUILD RESULTS ────────────────────────────────────────── */
function buildResults() {
  let totalCorrect = 0;
  const chScores = QUIZ_DATA.map(ch => {
    let correct = 0;
    ch.questions.forEach((q, qi) => {
      if (ANSWERS[`ch${ch.num}-q${qi}`] === q.ans) correct++;
    });
    totalCorrect += correct;
    return { num: ch.num, title: ch.title, correct, total: 8 };
  });

  const pct = Math.round((totalCorrect / 160) * 100);
  const grade = pct >= 85 ? 'A' : pct >= 70 ? 'B' : pct >= 55 ? 'C' : 'D';
  const gradeLabel = pct >= 85 ? 'Distinction' : pct >= 70 ? 'Merit' : pct >= 55 ? 'Pass' : 'Needs Work';
  const name = USER_NAME || 'Participant';

  // Update certificate data
  document.getElementById('certName').textContent = name;
  document.getElementById('certScore').textContent = `${totalCorrect}/160`;
  document.getElementById('certPct').textContent   = `${pct}%`;
  document.getElementById('certGrade').textContent = gradeLabel;
  document.getElementById('certDate').textContent  = new Date().toLocaleDateString('en-GB', {year:'numeric',month:'long',day:'numeric'});

  // Chapter score cards
  let chCardsHTML = '';
  chScores.forEach(cs => {
    const cp = Math.round((cs.correct/cs.total)*100);
    chCardsHTML += `<div class="ch-res-card">
      <div class="crc-num">Chapter ${cs.num}</div>
      <div class="crc-score">${cs.correct}/${cs.total}</div>
      <div class="crc-pct">${cp}%</div>
      <div class="crc-bar"><div class="crc-fill" style="width:${cp}%"></div></div>
    </div>`;
  });

  const wrap = document.getElementById('resultsWrap');
  wrap.innerHTML = `
    <div class="results-content">
      <div class="results-hero">
        <div class="rh-name">${escHtml(name)}</div>
        <div class="rh-sub">ESG Mastery Chapter Assessment — ${new Date().toLocaleDateString('en-GB',{year:'numeric',month:'long',day:'numeric'})}</div>
        <div class="rh-score-row">
          <div class="rh-score-box">
            <div class="rh-val grade-${grade}">${totalCorrect}</div>
            <div class="rh-lbl">Correct (of 160)</div>
          </div>
          <div class="rh-score-box">
            <div class="rh-val grade-${grade}">${pct}%</div>
            <div class="rh-lbl">Score</div>
          </div>
          <div class="rh-score-box">
            <div class="rh-val grade-${grade}">${gradeLabel}</div>
            <div class="rh-lbl">Grade</div>
          </div>
        </div>
      </div>

      <div class="results-actions">
        <button class="ra-btn ra-review" onclick="reviewAnswers()">📝 Review All Answers</button>
        <button class="ra-btn ra-cert" onclick="showCertificate()">🏆 View Certificate</button>
        <button class="ra-btn ra-print" onclick="printQuiz()">🖨 Print Questions &amp; Answers</button>
        <button class="ra-btn ra-cert" onclick="printCertificate()">🖨 Print Certificate</button>
      </div>

      <div style="background:#fff;border-radius:12px;padding:20px 24px;margin-bottom:20px;border:1.5px solid #e2e8f0;box-shadow:0 2px 8px rgba(0,0,0,0.06)">
        <div style="font-size:0.78rem;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.07em;margin-bottom:12px">Score by Chapter</div>
        <div class="ch-results-grid">${chCardsHTML}</div>
      </div>

      <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:14px 16px;font-size:0.79rem;color:#78350f;line-height:1.6">
        <strong>📋 Review Note:</strong> Click <em>Review All Answers</em> to see correct answers and explanations for every question across all chapters. On print, correct answers are shown automatically. Navigate to any chapter tab to see individual question results highlighted in green (correct) and red (incorrect).
      </div>
    </div>`;
}

function reviewAnswers() {
  showReview();
  // Flash chapters — switch to ch1 to show they can browse
  switchTab('ch-1');
  setTimeout(() => {
    alert('Review mode active! Navigate the chapters using the left sidebar to see correct answers highlighted in green and explanations for each question.');
  }, 200);
}

/* ── CERTIFICATE ──────────────────────────────────────────── */
function showCertificate() {
  document.getElementById('certModal').style.display = 'flex';
}
function closeCert() {
  document.getElementById('certModal').style.display = 'none';
}

/* ── RESET ────────────────────────────────────────────────── */
function resetAll() {
  if (!confirm('Reset all answers and start over? This cannot be undone.')) return;

  // Clear answer state
  Object.keys(ANSWERS).forEach(k => delete ANSWERS[k]);
  SUBMITTED = false;
  SHOW_REVIEW = false;
  USER_NAME = '';

  // Clear name input
  const nameEl = document.getElementById('userName');
  if (nameEl) nameEl.value = '';

  // Reset global progress bar
  const spFill = document.getElementById('spFill');
  if (spFill) spFill.style.width = '0%';
  const spAns = document.getElementById('spAnswered');
  if (spAns) spAns.textContent = '0';

  // Hide results badge
  const rb = document.getElementById('resultsBadge');
  if (rb) rb.style.display = 'none';

  // Reset all chapter panels — rebuild them fresh to wipe all state cleanly
  const container = document.getElementById('chapterPanels');
  if (container) {
    container.innerHTML = '';
    buildChapterPanels();
  }

  // Reset all nav badges
  QUIZ_DATA.forEach(ch => {
    const badge = document.getElementById('nbadge-' + ch.num);
    if (badge) badge.style.display = 'none';
    const answeredEl = document.getElementById('ch-answered-' + ch.num);
    if (answeredEl) answeredEl.textContent = '0';
  });

  // Reset results panel to placeholder
  const rw = document.getElementById('resultsWrap');
  if (rw) rw.innerHTML = `
    <div class="results-placeholder">
      <div style="font-size:3rem;margin-bottom:16px">🏆</div>
      <h2>Results &amp; Certificate</h2>
      <p>Complete the quiz and click <strong>Submit All</strong> to see your results and generate your certificate.</p>
      <button class="start-btn" onclick="submitAll()" style="margin-top:20px">Submit All Answers</button>
    </div>`;

  switchTab('intro');
}

/* ── PRINT: QUIZ QUESTIONS & ANSWERS ─────────────────────── */
function printQuiz() {
  // Force review mode so answers are visible
  if (SUBMITTED) {
    showReview();
  } else {
    const go = confirm('Answers are only shown in print when the quiz has been submitted.\n\nSubmit now and print with answers, or cancel to print blank questions?');
    if (go) {
      submitAll();
      showReview();
    }
  }
  // Apply print-quiz class, print, then remove
  document.body.classList.remove('print-cert');
  document.body.classList.add('print-quiz');
  setTimeout(function () {
    window.print();
    setTimeout(function () {
      document.body.classList.remove('print-quiz');
    }, 1000);
  }, 300);
}

/* ── PRINT: CERTIFICATE ONLY ─────────────────────────────── */
function printCertificate() {
  if (!SUBMITTED) {
    alert('Please submit the quiz first to generate your certificate.');
    return;
  }
  const name = document.getElementById('userName').value.trim();
  if (!name) {
    alert('Please enter your name in the sidebar before printing the certificate.');
    document.getElementById('userName').focus();
    return;
  }
  // Make sure cert modal is visible in DOM (even if not showing)
  document.getElementById('certModal').style.display = 'flex';
  document.body.classList.remove('print-quiz');
  document.body.classList.add('print-cert');
  setTimeout(function () {
    window.print();
    setTimeout(function () {
      document.body.classList.remove('print-cert');
      document.getElementById('certModal').style.display = 'none';
    }, 1000);
  }, 300);
}

/* ── HELPERS ──────────────────────────────────────────────── */
function escHtml(s) {
  return s.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
