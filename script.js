/* ================================================================
   DEEPANSH SABHARWAL — PORTFOLIO SCRIPT
   - WebGL particle canvas (hero background)
   - Mobile hamburger nav
   - Smooth scroll
   - Intersection observer fade-ins
   ================================================================ */

(function () {
  'use strict';

  /* ── MOBILE NAV ── */
  var hamburger = document.getElementById('hamburger');
  var mobileNav = document.getElementById('mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      mobileNav.classList.toggle('open');
    });
    mobileNav.querySelectorAll('.mobile-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
      });
    });
  }

  /* ── SMOOTH SCROLL ── */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var id = a.getAttribute('href');
      if (id === '#') return;
      var target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        var offset = target.getBoundingClientRect().top + window.scrollY - 64;
        window.scrollTo({ top: offset, behavior: 'smooth' });
      }
    });
  });

  /* ── SCROLL FADE-IN ── */
  var fadeEls = document.querySelectorAll(
    '.proj-featured, .proj-card, .skill-group, .cert-card, .about-block, .intro-chips'
  );
  fadeEls.forEach(function (el) {
    el.style.opacity = '0';
    el.style.transform = 'translateY(22px)';
    el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
  });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.07 });
    fadeEls.forEach(function (el) { observer.observe(el); });
  } else {
    fadeEls.forEach(function (el) {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
  }

  /* ── WEBGL PARTICLE CANVAS ── */
  var canvas = document.getElementById('canvas');
  if (!canvas) return;

  var gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  if (!gl) { canvas.style.display = 'none'; return; }

  function resize() {
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }
  resize();
  window.addEventListener('resize', resize, { passive: true });

  /* Shaders */
  var VS = [
    'attribute vec2 aPos;',
    'attribute float aSize;',
    'attribute float aPhase;',
    'uniform float uTime;',
    'uniform vec2 uMouse;',
    'void main() {',
    '  vec2 p = aPos;',
    '  p.x += sin(uTime * 0.35 + aPhase * 1.7) * 0.018;',
    '  p.y += cos(uTime * 0.42 + aPhase * 1.2) * 0.014;',
    '  vec2 d = p - uMouse;',
    '  float dist = length(d);',
    '  if (dist < 0.3) p += normalize(d) * (0.3 - dist) * 0.1;',
    '  gl_Position = vec4(p, 0.0, 1.0);',
    '  float wave = sin(uTime * 1.1 + aPhase) * 0.5 + 0.5;',
    '  gl_PointSize = aSize * (0.55 + wave * 0.7);',
    '}'
  ].join('\n');

  var FS = [
    'precision mediump float;',
    'void main() {',
    '  vec2 c = gl_PointCoord - 0.5;',
    '  float d = length(c);',
    '  if (d > 0.5) discard;',
    '  float a = smoothstep(0.5, 0.05, d) * 0.5;',
    '  vec3 col = mix(vec3(0.22, 0.74, 0.98), vec3(0.55, 0.9, 1.0), d * 1.8);',
    '  gl_FragColor = vec4(col, a);',
    '}'
  ].join('\n');

  function mkShader(type, src) {
    var s = gl.createShader(type);
    gl.shaderSource(s, src);
    gl.compileShader(s);
    return s;
  }

  var prog = gl.createProgram();
  gl.attachShader(prog, mkShader(gl.VERTEX_SHADER, VS));
  gl.attachShader(prog, mkShader(gl.FRAGMENT_SHADER, FS));
  gl.linkProgram(prog);
  gl.useProgram(prog);

  /* Particles */
  var N = 200;
  var pos    = new Float32Array(N * 2);
  var sizes  = new Float32Array(N);
  var phases = new Float32Array(N);

  for (var i = 0; i < N; i++) {
    pos[i * 2]     = Math.random() * 2 - 1;
    pos[i * 2 + 1] = Math.random() * 2 - 1;
    sizes[i]       = 1.5 + Math.random() * 3.5;
    phases[i]      = Math.random() * Math.PI * 2;
  }

  function mkBuf(data) {
    var b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    return b;
  }

  function bindAttr(buf, name, size) {
    var loc = gl.getAttribLocation(prog, name);
    if (loc < 0) return;
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  }

  bindAttr(mkBuf(pos),    'aPos',   2);
  bindAttr(mkBuf(sizes),  'aSize',  1);
  bindAttr(mkBuf(phases), 'aPhase', 1);

  var uTime  = gl.getUniformLocation(prog, 'uTime');
  var uMouse = gl.getUniformLocation(prog, 'uMouse');

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE);

  var mouse = [0, 0];
  window.addEventListener('mousemove', function (e) {
    mouse[0] =  (e.clientX / window.innerWidth)  * 2 - 1;
    mouse[1] = -(e.clientY / window.innerHeight) * 2 + 1;
  }, { passive: true });

  var t0 = null;
  function frame(ts) {
    if (!t0) t0 = ts;
    var t = (ts - t0) / 1000;
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, t);
    gl.uniform2fv(uMouse, mouse);
    gl.drawArrays(gl.POINTS, 0, N);
    requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);

})();
