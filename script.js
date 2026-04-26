(function () {
  'use strict';

  /* ── NAV: appears on scroll ── */
  var nav = document.getElementById('nav');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) nav.classList.add('scrolled');
    else nav.classList.remove('scrolled');
  }, { passive: true });

  /* ── HERO CANVAS: flowing particle field ── */
  var canvas = document.getElementById('fpga-canvas');
  if (canvas) {
    var ctx = canvas.getContext('2d');
    var W, H, particles = [];

    function resize() {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener('resize', resize, { passive: true });

    function mkParticles() {
      particles = [];
      var count = Math.floor((W * H) / 18000);
      for (var i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - .5) * .4,
          vy: (Math.random() - .5) * .4,
          r: Math.random() * 1.5 + .5
        });
      }
    }
    mkParticles();

    function drawFrame() {
      ctx.clearRect(0, 0, W, H);
      /* Draw grid lines */
      ctx.strokeStyle = 'rgba(124,252,138,.025)';
      ctx.lineWidth = 1;
      var gridSize = 48;
      for (var x = 0; x < W; x += gridSize) {
        ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
      }
      for (var y = 0; y < H; y += gridSize) {
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
      }
      /* Draw particles and connections */
      particles.forEach(function (p) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = W; if (p.x > W) p.x = 0;
        if (p.y < 0) p.y = H; if (p.y > H) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(124,252,138,.5)';
        ctx.fill();
      });
      /* Draw connections between nearby particles */
      var maxDist = 90;
      for (var i = 0; i < particles.length; i++) {
        for (var j = i + 1; j < particles.length; j++) {
          var dx = particles[i].x - particles[j].x;
          var dy = particles[i].y - particles[j].y;
          var d = Math.sqrt(dx * dx + dy * dy);
          if (d < maxDist) {
            var alpha = (1 - d / maxDist) * 0.12;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = 'rgba(124,252,138,' + alpha + ')';
            ctx.lineWidth = .7;
            ctx.stroke();
          }
        }
      }
      requestAnimationFrame(drawFrame);
    }
    drawFrame();
    window.addEventListener('resize', mkParticles, { passive: true });
  }

  /* ── FPGA SVG ANIMATION ── */
  var fpgaRunBtn = document.getElementById('fpga-run-btn');
  var fpgaStatus = document.getElementById('fpga-status');
  var fmaxVal    = document.getElementById('fmax-val');
  var utilVal    = document.getElementById('util-val');
  var fpgaBtnDot = document.getElementById('fpga-btn-dot');
  var simRunning = false;
  var simTimeout = null;

  var lutIds   = ['lut-0', 'lut-1', 'lut-2', 'lut-3'];
  var outIds   = ['out-0', 'out-1', 'out-2', 'out-3'];
  var pathIds  = ['path-0','path-1','path-2','path-3','path-4','path-5','path-6','path-7'];
  var ipathIds = ['ipath-0','ipath-1','ipath-2'];

  function getEl(id) { return document.getElementById(id); }

  function resetSim() {
    lutIds.concat(outIds).forEach(function (id) {
      var el = getEl(id);
      if (el) el.classList.remove('active');
    });
    pathIds.concat(ipathIds).forEach(function (id) {
      var el = getEl(id);
      if (el) el.classList.remove('active');
    });
    var fab = document.querySelector('.fabric');
    if (fab) fab.classList.remove('active');
    var clk = getEl('clk-line');
    if (clk) clk.classList.remove('active');
  }

  function runSim() {
    if (simRunning) {
      simRunning = false;
      clearTimeout(simTimeout);
      resetSim();
      fpgaRunBtn.classList.remove('running');
      fpgaStatus.textContent = 'IDLE';
      fpgaStatus.classList.remove('running');
      fmaxVal.textContent = '—';
      utilVal.textContent = '—';
      fpgaRunBtn.firstElementChild.nextSibling.textContent = ' Run simulation';
      return;
    }
    simRunning = true;
    fpgaRunBtn.classList.add('running');
    fpgaStatus.textContent = 'RUNNING';
    fpgaStatus.classList.add('running');
    fpgaRunBtn.firstElementChild.nextSibling.textContent = ' Stop simulation';

    var step = 0;
    var sequence = [
      function () {
        var clk = getEl('clk-line');
        if (clk) clk.classList.add('active');
        getEl('lut-0') && getEl('lut-0').classList.add('active');
      },
      function () {
        getEl('path-0') && getEl('path-0').classList.add('active');
        getEl('lut-1') && getEl('lut-1').classList.add('active');
      },
      function () {
        getEl('path-1') && getEl('path-1').classList.add('active');
        document.querySelector('.fabric') && document.querySelector('.fabric').classList.add('active');
        getEl('ipath-0') && getEl('ipath-0').classList.add('active');
      },
      function () {
        getEl('lut-2') && getEl('lut-2').classList.add('active');
        getEl('path-2') && getEl('path-2').classList.add('active');
        getEl('ipath-1') && getEl('ipath-1').classList.add('active');
      },
      function () {
        getEl('lut-3') && getEl('lut-3').classList.add('active');
        getEl('path-3') && getEl('path-3').classList.add('active');
        getEl('ipath-2') && getEl('ipath-2').classList.add('active');
      },
      function () {
        getEl('path-4') && getEl('path-4').classList.add('active');
        getEl('out-0')  && getEl('out-0').classList.add('active');
        getEl('path-5') && getEl('path-5').classList.add('active');
        getEl('out-1')  && getEl('out-1').classList.add('active');
        fmaxVal.textContent = '127';
      },
      function () {
        getEl('path-6') && getEl('path-6').classList.add('active');
        getEl('out-2')  && getEl('out-2').classList.add('active');
        getEl('path-7') && getEl('path-7').classList.add('active');
        getEl('out-3')  && getEl('out-3').classList.add('active');
        utilVal.textContent = '~2%';
        fpgaStatus.textContent = 'DONE · 127 MHz';
      }
    ];

    function next() {
      if (!simRunning) return;
      if (step < sequence.length) {
        sequence[step]();
        step++;
        simTimeout = setTimeout(next, 300);
      } else {
        simTimeout = setTimeout(function () {
          if (simRunning) {
            step = 0;
            resetSim();
            fmaxVal.textContent = '127';
            utilVal.textContent = '~2%';
            next();
          }
        }, 1800);
      }
    }
    next();
  }

  if (fpgaRunBtn) fpgaRunBtn.addEventListener('click', runSim);

  /* ── FSM INTERACTION ── */
  var FSM_DATA = {
    init:  { title: 'S0 · INIT', body: 'Power-up state. Configuration registers are set to known values. Transitions to IDLE only when the guard module validates that period and duty constraints are satisfied.' },
    idle:  { title: 'S1 · IDLE', body: 'Output is driven low. Waits for an enable signal while the guard module continuously monitors configuration. An invalid configuration cannot reach RUN.' },
    run:   { title: 'S2 · RUN',  body: 'PWM generator is active. The combinational guard module validates period and duty every clock cycle. Any violation produces a single-cycle, irreversible transition to FAULT.' },
    fault: { title: 'S3 · FAULT', body: 'Latched fault state. Output is driven low. Fault signal is asserted on an external pin. No transition is accepted except an explicit externally-asserted recovery sequence — there is no software path out.' },
    safe:  { title: 'S4 · SAFE', body: 'Post-recovery verification state. Returns to IDLE only after the guard module re-validates the configuration. Prevents immediate re-entry to RUN on a marginal configuration.' }
  };

  var fsmPanel = document.getElementById('fsm-panel');
  document.querySelectorAll('.fsm-state').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var node = btn.getAttribute('data-node');
      document.querySelectorAll('.fsm-state').forEach(function (b) { b.classList.remove('is-active'); });
      btn.classList.add('is-active');
      if (fsmPanel && FSM_DATA[node]) {
        var d = FSM_DATA[node];
        fsmPanel.innerHTML = '<h4>' + d.title + '</h4><p>' + d.body + '</p>';
        fsmPanel.classList.add('is-open');
      }
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); btn.click(); }
    });
  });

  /* ── COPY TO CLIPBOARD ── */
  document.querySelectorAll('.copy-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;
      function confirm() {
        var original = btn.textContent;
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('copied');
        }, 1600);
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(confirm);
      } else {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); confirm(); } catch (e) {}
        document.body.removeChild(ta);
      }
    });
  });

  /* ── SMOOTH ANCHOR SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var top = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

})();
