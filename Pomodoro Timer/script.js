(function () {
  'use strict';

  /* ---- DOM ---- */
  const shell         = document.getElementById('phoneShell');
  const timerDisplay  = document.getElementById('timerDisplay');
  const progressRing  = document.getElementById('progressRing');
  const mainBtn       = document.getElementById('mainBtn');
  const statusLabel   = document.getElementById('statusLabel');
  const timerInner    = document.getElementById('timerInner');
  const modalOverlay  = document.getElementById('modalOverlay');
  const musicBtn      = document.getElementById('musicBtn');
  const musicIcon     = document.getElementById('musicIcon');

  /* ---- RING ---- */
  const R             = 116;
  const CIRCUMFERENCE = 2 * Math.PI * R;

  /* ---- STATE ---- */
  let studyTotalSec = 25 * 60;
  let breakTotalSec =  3 * 60;
  let remainingSec  = studyTotalSec;
  let totalSec      = studyTotalSec;
  let phase         = 'study';
  let appState      = 'ready';
  let intervalId    = null;
  let musicOn       = true;

  /* ---- INIT ---- */
  progressRing.style.strokeDasharray  = CIRCUMFERENCE;
  progressRing.style.strokeDashoffset = 0;
  updateDisplay();
  drawRing(1);

  /* ---- HELPERS ---- */
  function pad(n) { return String(Math.floor(n)).padStart(2, '0'); }
  function fmt(s) { return pad(Math.floor(s / 60)) + ':' + pad(s % 60); }
  function updateDisplay() { timerDisplay.textContent = fmt(remainingSec); }

  function drawRing(progress) {
    progress = Math.min(1, Math.max(0, progress));
    progressRing.style.strokeDashoffset = CIRCUMFERENCE * (1 - progress);
    progressRing.style.opacity = 0.1 + progress * 0.9;
  }

  /* ---- TIMER ---- */
  function startTimer() { if (!intervalId) intervalId = setInterval(tick, 1000); }
  function pauseTimer()  { clearInterval(intervalId); intervalId = null; }

  function tick() {
    if (remainingSec <= 0) { handlePhaseEnd(); return; }
    remainingSec--;
    updateDisplay();
    drawRing(remainingSec / totalSec);
  }

  function handlePhaseEnd() {
    pauseTimer();
    if (phase === 'study') {
      setPhase('break');
      totalSec = remainingSec = breakTotalSec;
      statusLabel.textContent = 'Istirahat Sebentar...';
      mainBtn.textContent = 'Mulai Istirahat!';
    } else {
      setPhase('study');
      totalSec = remainingSec = studyTotalSec;
      statusLabel.textContent = 'Ayo Mulai!';
      mainBtn.textContent = 'Mulai!';
    }
    setState('ready'); updateDisplay(); drawRing(1);
  }

  function resetTimer() {
    pauseTimer();
    setPhase('study');
    totalSec = remainingSec = studyTotalSec;
    updateDisplay(); drawRing(1);
    setState('ready');
    statusLabel.textContent = 'Ayo Mulai!';
    mainBtn.textContent = 'Mulai!';
  }

  function setState(s) { appState = s; shell.dataset.state = s; }
  function setPhase(p) { phase = p; shell.dataset.phase = p; }

  /* ---- MAIN BUTTON ---- */
  mainBtn.addEventListener('click', function () {
    if (appState === 'ready' || appState === 'paused') {
      setState('running');
      statusLabel.textContent = phase === 'study' ? 'Sedang Belajar...' : 'Sedang Istirahat...';
      mainBtn.textContent = 'Menyerah';
      startTimer();
    } else if (appState === 'running') {
      resetTimer();
    }
  });

  /* ---- KLIK TIMER → pause / buka modal (gambar) ---- */
  timerInner.addEventListener('click', function () {
    if (appState === 'running') {
      pauseTimer();
      setState('paused');
      statusLabel.textContent = 'Dijeda...';
      mainBtn.textContent = 'Lanjutkan';
    } else {
      modalOverlay.classList.add('visible');
    }
  });

  /* ---- TUTUP MODAL klik di luar sheet ---- */
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) modalOverlay.classList.remove('visible');
  });

  /* ---- MUSIC TOGGLE ---- */
  musicBtn.addEventListener('click', function () {
    musicOn = !musicOn;
    musicIcon.src = musicOn ? 'assets/MusicPlay.svg' : 'assets/MusicOff.svg';
    musicIcon.alt = musicOn ? 'music on' : 'music off';
  });

  /* ---- STATUS BAR CLOCK ---- */
  function updateClock() {
    var now = new Date();
    var el = document.querySelector('.status-bar .time');
    if (el) el.textContent = pad(now.getHours()) + ':' + pad(now.getMinutes());
  }
  updateClock();
  setInterval(updateClock, 10000);

  /* ---- NAV ---- */
  document.querySelectorAll('.nav-item').forEach(function (item) {
    item.addEventListener('click', function () {
      document.querySelectorAll('.nav-item').forEach(function (n) {
        n.classList.remove('active', 'nav-pomodoro');
      });
      item.classList.add('active');
      if (item.dataset.nav === 'pomodoro') item.classList.add('nav-pomodoro');
    });
  });

})();