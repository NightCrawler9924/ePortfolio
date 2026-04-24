/* =========================================================
   Portfolio script. Minimal, no framework.
   Functional transitions only: nav appearance, section tracking,
   diagram highlight, copy affordance, grid overlay toggle.
   ========================================================= */
(function () {
  'use strict';

  /* ---------- Nav visibility after scroll threshold ---------- */
  var nav = document.getElementById('nav');
  var threshold = 200;
  function onScroll() {
    if (!nav) return;
    if (window.scrollY > threshold) {
      nav.classList.add('is-visible');
    } else {
      nav.classList.remove('is-visible');
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- Active section tracking ---------- */
  var sectionIds = ['work', 'systems', 'archive', 'about', 'contact'];
  var sections = sectionIds
    .map(function (id) { return document.getElementById(id); })
    .filter(Boolean);
  var links = document.querySelectorAll('.nav__link');

  if ('IntersectionObserver' in window && sections.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var id = entry.target.id;
          links.forEach(function (l) {
            l.classList.toggle('is-active', l.getAttribute('data-section') === id);
          });
        }
      });
    }, { rootMargin: '-30% 0px -60% 0px', threshold: 0 });
    sections.forEach(function (s) { observer.observe(s); });
  }

  /* ---------- Smooth anchor scroll with nav offset ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (!id || id === '#') return;
      var target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      var offset = target.getBoundingClientRect().top + window.scrollY - 72;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    });
  });

  /* ---------- Diagram interaction ---------- */
  var diagram = document.getElementById('diagram');
  var panel = document.getElementById('diagram-panel');

  var NODE_META = {
    init:  {
      title: 'INIT',
      body: 'Power-up state. Configuration registers are driven to known values. Releases to IDLE only when period and duty pass the guard module, ensuring no invalid state reaches the output stage.'
    },
    idle: {
      title: 'IDLE',
      body: 'Output is driven low. The FSM waits for an external enable. The guard module is still active, so a configuration that becomes invalid while IDLE cannot transition to RUN.'
    },
    run: {
      title: 'RUN',
      body: 'The PWM generator is active. The guard module observes period and duty every cycle. Any violation produces a single-cycle, irreversible transition to FAULT.'
    },
    fault: {
      title: 'FAULT',
      body: 'Latched state. Output is driven low and the fault signal is asserted on an external pin. No transition is accepted except an explicit recovery sequence, which can be gated by higher-level supervision.'
    },
    safe: {
      title: 'SAFE',
      body: 'Post-recovery verification. Returns to IDLE only after the configuration has been re-validated, preventing immediate re-entry to RUN on a marginal configuration.'
    }
  };

  var EDGES_BY_NODE = {
    init:  ['init-idle'],
    idle:  ['init-idle', 'idle-run', 'safe-idle'],
    run:   ['idle-run', 'run-fault'],
    fault: ['run-fault', 'fault-safe'],
    safe:  ['fault-safe', 'safe-idle']
  };

  function highlightNode(nodeId) {
    if (!diagram) return;
    diagram.classList.add('is-hovering');
    diagram.querySelectorAll('.node').forEach(function (n) {
      n.classList.toggle('is-active', n.getAttribute('data-node') === nodeId);
    });
    var edges = EDGES_BY_NODE[nodeId] || [];
    diagram.querySelectorAll('.edge').forEach(function (e) {
      var id = e.getAttribute('data-edge');
      e.classList.toggle('is-active', edges.indexOf(id) !== -1);
    });
  }

  function clearHighlight() {
    if (!diagram) return;
    diagram.classList.remove('is-hovering');
    diagram.querySelectorAll('.node.is-active, .edge.is-active').forEach(function (el) {
      el.classList.remove('is-active');
    });
  }

  function showPanel(nodeId) {
    if (!panel) return;
    var meta = NODE_META[nodeId];
    if (!meta) { panel.classList.remove('is-open'); return; }
    panel.innerHTML = '<h4>' + meta.title + '</h4><p>' + meta.body + '</p>';
    panel.classList.add('is-open');
  }

  if (diagram) {
    diagram.querySelectorAll('.node').forEach(function (node) {
      var id = node.getAttribute('data-node');

      node.addEventListener('mouseenter', function () { highlightNode(id); });
      node.addEventListener('mouseleave', clearHighlight);
      node.addEventListener('focus', function () { highlightNode(id); });
      node.addEventListener('blur', clearHighlight);

      var activate = function () { highlightNode(id); showPanel(id); };
      node.addEventListener('click', activate);
      node.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          activate();
        }
      });
    });
  }

  /* ---------- Copy to clipboard ---------- */
  document.querySelectorAll('.btn-copy').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var text = btn.getAttribute('data-copy');
      if (!text) return;
      var done = function () {
        var original = btn.textContent;
        btn.textContent = 'copied';
        btn.classList.add('is-copied');
        setTimeout(function () {
          btn.textContent = original;
          btn.classList.remove('is-copied');
        }, 1500);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, function () {
          legacyCopy(text);
          done();
        });
      } else {
        legacyCopy(text);
        done();
      }
    });
  });

  function legacyCopy(text) {
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.position = 'absolute';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); } catch (e) { /* noop */ }
    document.body.removeChild(ta);
  }

  /* ---------- Grid overlay, press 'g' ---------- */
  var overlay = document.getElementById('grid-overlay');
  document.addEventListener('keydown', function (e) {
    // Ignore if user is typing in a field
    var t = e.target;
    if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
    if (e.key === 'g' || e.key === 'G') {
      if (!overlay) return;
      overlay.classList.toggle('is-visible');
    }
  });

})();
