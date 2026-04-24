/* =========================================================
   Portfolio stylesheet, Deepansh Sabharwal
   Tokens follow the published specification. No values outside
   the defined scales are introduced.
   ========================================================= */

/* ---------- Reset ---------- */
*, *::before, *::after { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body { -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; text-rendering: optimizeLegibility; }
img, svg { display: block; max-width: 100%; }
button { font: inherit; color: inherit; background: none; border: 0; padding: 0; cursor: pointer; }
a { color: inherit; }

/* ---------- Tokens ---------- */
:root {
  /* Color, light */
  --canvas:         #FAFAF7;
  --paper:          #FFFFFF;
  --ink:            #0A0A09;
  --ink-secondary:  #3D3D3A;
  --ink-tertiary:   #76766F;
  --rule:           #D8D6D0;
  --rule-strong:    #9B9993;
  --signal:         #C2410C;

  /* Space, 4px base */
  --space-1: 4px;
  --space-2: 8px;
  --space-3: 12px;
  --space-4: 16px;
  --space-5: 24px;
  --space-6: 32px;
  --space-8: 48px;
  --space-10: 64px;
  --space-12: 96px;
  --space-16: 128px;

  /* Layout */
  --col-doc: 680px;
  --col-tech: 880px;
  --margin-outer: 80px;

  /* Motion */
  --dur-instant: 80ms;
  --dur-short:   160ms;
  --dur-medium:  240ms;
  --dur-long:    320ms;
  --ease-out:    cubic-bezier(0.22, 0.61, 0.36, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);

  /* Type */
  --font-sans: "Inter", system-ui, -apple-system, "Segoe UI", Roboto, sans-serif;
  --font-serif: "Source Serif 4", Georgia, "Times New Roman", serif;
  --font-mono: "JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
}

@media (prefers-color-scheme: dark) {
  :root {
    --canvas:         #0B0B0A;
    --paper:          #141413;
    --ink:            #F2F1EC;
    --ink-secondary:  #B8B7B1;
    --ink-tertiary:   #7E7D77;
    --rule:           #2A2A27;
    --rule-strong:    #4A4944;
    --signal:         #E8633A;
  }
}

/* ---------- Base ---------- */
body {
  font-family: var(--font-sans);
  font-size: 17px;
  line-height: 28px;
  letter-spacing: 0;
  color: var(--ink);
  background: var(--canvas);
  font-feature-settings: "ss01", "cv11", "tnum" 0;
}

/* ---------- Layout container ---------- */
.container {
  max-width: var(--col-doc);
  margin-left: auto;
  margin-right: auto;
  padding-left: var(--space-5);
  padding-right: var(--space-5);
}
.container--wide { max-width: var(--col-tech); }

/* Full-bleed hairline */
.rule-bleed {
  width: 100%;
  height: 1px;
  background: var(--rule);
  border: 0;
  margin: 0;
}
.rule-centered {
  width: 48px;
  height: 1px;
  background: var(--rule);
  border: 0;
  margin: var(--space-10) auto;
}

/* ---------- Navigation ---------- */
.nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 56px;
  background: color-mix(in srgb, var(--canvas) 92%, transparent);
  backdrop-filter: saturate(140%) blur(8px);
  -webkit-backdrop-filter: saturate(140%) blur(8px);
  border-bottom: 1px solid var(--rule);
  opacity: 0;
  pointer-events: none;
  transition: opacity var(--dur-long) var(--ease-out);
  z-index: 100;
}
.nav.is-visible { opacity: 1; pointer-events: auto; }
.nav__inner {
  max-width: var(--col-tech);
  height: 100%;
  margin: 0 auto;
  padding: 0 var(--space-5);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.nav__mono {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ink-secondary);
  text-decoration: none;
}
.nav__mono:hover { color: var(--ink); }
.nav__links {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}
.nav__link {
  position: relative;
  font-size: 14px;
  line-height: 16px;
  color: var(--ink-secondary);
  text-decoration: none;
  padding: var(--space-2) 0;
  transition: color var(--dur-short) var(--ease-out);
}
.nav__link:hover { color: var(--ink); }
.nav__link::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 2px;
  background: var(--signal);
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform var(--dur-medium) var(--ease-out);
}
.nav__link.is-active {
  color: var(--signal);
}
.nav__link.is-active::after { transform: scaleX(1); }
.nav__sep {
  width: 1px;
  height: 12px;
  background: var(--rule);
  display: inline-block;
}

/* ---------- Identity block ---------- */
.identity {
  padding-top: var(--space-12);
  padding-bottom: var(--space-10);
}
.identity__meta {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ink-tertiary);
  margin-bottom: var(--space-12);
  text-transform: uppercase;
}
.identity__name {
  font-size: 40px;
  line-height: 48px;
  font-weight: 600;
  letter-spacing: -0.02em;
  margin: 0 0 var(--space-3) 0;
}
.identity__lede {
  font-size: 19px;
  line-height: 32px;
  font-weight: 400;
  color: var(--ink-secondary);
  margin: 0 0 var(--space-8) 0;
  max-width: 54ch;
}
.identity__lede strong { font-weight: 600; color: var(--ink); }

.kv {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--space-3) var(--space-5);
  margin-bottom: var(--space-6);
}
.kv__label {
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-tertiary);
  padding-top: var(--space-1);
}
.kv__value {
  font-size: 17px;
  line-height: 24px;
  color: var(--ink);
}
.kv__value--mono {
  font-family: var(--font-mono);
  font-size: 15px;
}

.identity__links {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-6);
  flex-wrap: wrap;
}

/* ---------- Link treatment ---------- */
.link {
  color: var(--signal);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 3px;
  transition: text-decoration-thickness var(--dur-short) var(--ease-out);
}
.link:hover { text-decoration-thickness: 2px; }
.link:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
  border-radius: 2px;
}
.link__sep {
  color: var(--ink-tertiary);
  user-select: none;
}

/* ---------- Section header ---------- */
.section {
  padding-top: var(--space-12);
  padding-bottom: var(--space-10);
}
.section__eyebrow {
  font-size: 13px;
  line-height: 16px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-tertiary);
  margin-bottom: var(--space-4);
  display: block;
  font-family: var(--font-mono);
}
.section__title {
  font-size: 28px;
  line-height: 36px;
  font-weight: 600;
  letter-spacing: -0.015em;
  color: var(--ink);
  margin: 0 0 var(--space-3) 0;
}
.section__lede {
  font-size: 19px;
  line-height: 32px;
  color: var(--ink-secondary);
  margin: 0 0 var(--space-10) 0;
  max-width: 54ch;
}

/* ---------- Case study ---------- */
.case {
  margin-bottom: var(--space-10);
}
.case + .case { padding-top: var(--space-10); }
.case__head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-tertiary);
  margin-bottom: var(--space-4);
}
.case__title {
  font-size: 22px;
  line-height: 32px;
  font-weight: 600;
  letter-spacing: -0.01em;
  color: var(--ink);
  margin: 0 0 var(--space-3) 0;
}
.case__problem {
  font-size: 19px;
  line-height: 32px;
  color: var(--ink-secondary);
  margin: 0 0 var(--space-6) 0;
  max-width: 54ch;
}
.case__fields {
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: var(--space-4) var(--space-5);
  margin-bottom: var(--space-6);
}
.case__field-label {
  font-size: 13px;
  line-height: 24px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-tertiary);
}
.case__field-value {
  font-size: 17px;
  line-height: 28px;
  color: var(--ink);
}
.case__field-value p { margin: 0 0 var(--space-3) 0; }
.case__field-value p:last-child { margin-bottom: 0; }
.case__field-value ul {
  margin: 0;
  padding-left: var(--space-4);
  color: var(--ink-secondary);
}
.case__field-value ul li { margin-bottom: var(--space-1); }
.case__field-value code {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink);
  background: var(--paper);
  padding: 1px 4px;
  border: 1px solid var(--rule);
  border-radius: 2px;
}
.case__stack {
  font-family: var(--font-mono);
  font-size: 14px;
  color: var(--ink-secondary);
}
.case__stack span + span::before {
  content: " · ";
  color: var(--ink-tertiary);
}
.case__actions {
  display: flex;
  gap: var(--space-5);
  margin-top: var(--space-5);
}
.case__placeholder {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--signal);
  padding: var(--space-1) var(--space-2);
  border: 1px dashed var(--signal);
  border-radius: 2px;
  display: inline-block;
}

/* ---------- Metrics table ---------- */
.metrics {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-4);
  font-family: var(--font-mono);
  font-size: 14px;
}
.metrics th, .metrics td {
  text-align: left;
  padding: var(--space-2) var(--space-3);
  border-bottom: 1px solid var(--rule);
}
.metrics th {
  font-weight: 500;
  color: var(--ink-tertiary);
  letter-spacing: 0.04em;
  text-transform: uppercase;
  font-size: 12px;
}
.metrics td:last-child {
  text-align: right;
  color: var(--ink);
  font-variant-numeric: tabular-nums;
}

/* ---------- Technical deep-dive ---------- */
.deepdive {
  padding-top: var(--space-12);
  padding-bottom: var(--space-12);
}
.deepdive__prose {
  font-family: var(--font-serif);
  font-size: 19px;
  line-height: 32px;
  color: var(--ink);
  max-width: 64ch;
  margin: 0 auto var(--space-8);
}
.deepdive__prose p { margin: 0 0 var(--space-5) 0; }
.deepdive__prose p:last-child { margin-bottom: 0; }

/* Diagram */
.diagram {
  margin: var(--space-8) 0;
}
.diagram__svg {
  width: 100%;
  height: auto;
  display: block;
}
.diagram__caption {
  font-size: 14px;
  line-height: 20px;
  color: var(--ink-tertiary);
  margin-top: var(--space-3);
  text-align: center;
  font-family: var(--font-mono);
}
.node {
  cursor: pointer;
  transition: opacity var(--dur-medium) var(--ease-out);
}
.node rect {
  fill: var(--paper);
  stroke: var(--rule-strong);
  stroke-width: 1;
  transition: stroke var(--dur-medium) var(--ease-out), stroke-width var(--dur-medium) var(--ease-out);
}
.node text {
  font-family: var(--font-mono);
  font-size: 13px;
  fill: var(--ink);
}
.node text.sub {
  font-size: 11px;
  fill: var(--ink-tertiary);
}
.diagram.is-hovering .node:not(.is-active) { opacity: 0.3; }
.node.is-active rect {
  stroke: var(--signal);
  stroke-width: 2;
}
.edge {
  stroke: var(--rule-strong);
  stroke-width: 1;
  fill: none;
  transition: opacity var(--dur-medium) var(--ease-out);
}
.diagram.is-hovering .edge:not(.is-active) { opacity: 0.2; }
.edge.is-active { stroke: var(--signal); }

.diagram__panel {
  border: 1px solid var(--rule);
  background: var(--paper);
  padding: var(--space-5);
  margin-top: var(--space-5);
  display: none;
}
.diagram__panel.is-open { display: block; }
.diagram__panel h4 {
  font-size: 15px;
  font-weight: 600;
  margin: 0 0 var(--space-2) 0;
  color: var(--ink);
  font-family: var(--font-mono);
}
.diagram__panel p {
  font-size: 15px;
  line-height: 24px;
  color: var(--ink-secondary);
  margin: 0;
}

/* Code block */
.code {
  position: relative;
  background: var(--paper);
  border: 1px solid var(--rule);
  border-radius: 2px;
  margin: var(--space-6) 0;
  overflow: hidden;
}
.code__lang {
  position: absolute;
  top: var(--space-3);
  right: var(--space-4);
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-tertiary);
}
.code pre {
  margin: 0;
  padding: var(--space-5) var(--space-6);
  overflow-x: auto;
  font-family: var(--font-mono);
  font-size: 15px;
  line-height: 24px;
  color: var(--ink);
}
.code .tok-kw   { color: var(--ink); font-weight: 600; }
.code .tok-str  { color: var(--ink-secondary); }
.code .tok-num  { color: var(--ink-secondary); }
.code .tok-com  { color: var(--ink-tertiary); font-style: italic; }
.code .tok-op   { color: var(--ink); }

/* ---------- Archive table ---------- */
.archive {
  width: 100%;
  border-collapse: collapse;
  margin-top: var(--space-6);
}
.archive th, .archive td {
  text-align: left;
  padding: var(--space-4) var(--space-3);
  border-bottom: 1px solid var(--rule);
  vertical-align: top;
}
.archive thead th {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-tertiary);
  padding-top: 0;
  padding-bottom: var(--space-3);
}
.archive td.year {
  font-family: var(--font-mono);
  font-variant-numeric: tabular-nums;
  color: var(--ink-tertiary);
  width: 64px;
}
.archive td.kind {
  font-size: 14px;
  color: var(--ink-secondary);
  width: 140px;
}
.archive td.title {
  font-size: 17px;
  line-height: 24px;
  color: var(--ink);
}
.archive td.action {
  width: 96px;
  text-align: right;
  font-family: var(--font-mono);
  font-size: 14px;
  white-space: nowrap;
}

/* ---------- Certifications list ---------- */
.certs {
  list-style: none;
  padding: 0;
  margin: var(--space-5) 0 0 0;
  border-top: 1px solid var(--rule);
}
.certs li {
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: var(--space-5);
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--rule);
  align-items: baseline;
}
.certs__issuer {
  font-family: var(--font-mono);
  font-size: 13px;
  letter-spacing: 0.04em;
  color: var(--ink-tertiary);
  text-transform: uppercase;
}
.certs__name {
  font-size: 17px;
  color: var(--ink);
}
.certs__action {
  font-family: var(--font-mono);
  font-size: 14px;
}

/* ---------- Contact ---------- */
.contact__rows {
  border-top: 1px solid var(--rule);
  margin-top: var(--space-5);
}
.contact__row {
  display: grid;
  grid-template-columns: 120px 1fr auto;
  gap: var(--space-5);
  padding: var(--space-4) 0;
  border-bottom: 1px solid var(--rule);
  align-items: baseline;
}
.contact__label {
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: var(--ink-tertiary);
}
.contact__value {
  font-family: var(--font-mono);
  font-size: 15px;
  color: var(--ink);
  word-break: break-all;
}
.btn-copy {
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-secondary);
  border: 1px solid var(--rule);
  padding: var(--space-1) var(--space-2);
  border-radius: 2px;
  transition: border-color var(--dur-short) var(--ease-out), color var(--dur-short) var(--ease-out);
}
.btn-copy:hover {
  border-color: var(--rule-strong);
  color: var(--ink);
}
.btn-copy:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 2px;
}
.btn-copy.is-copied {
  color: var(--signal);
  border-color: var(--signal);
}

/* ---------- Footer ---------- */
.footer {
  border-top: 1px solid var(--rule);
  margin-top: var(--space-12);
  padding: var(--space-8) 0;
}
.footer__inner {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: var(--space-5);
  align-items: center;
  font-family: var(--font-mono);
  font-size: 13px;
  color: var(--ink-tertiary);
  letter-spacing: 0.04em;
}
.footer__inner > :nth-child(1) { text-align: left; }
.footer__inner > :nth-child(2) { text-align: center; }
.footer__inner > :nth-child(3) { text-align: right; }

/* ---------- Grid overlay ---------- */
.grid-overlay {
  position: fixed;
  inset: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity var(--dur-short) var(--ease-out);
  z-index: 200;
  display: flex;
  justify-content: center;
}
.grid-overlay.is-visible { opacity: 1; }
.grid-overlay__inner {
  width: 100%;
  max-width: calc(var(--col-tech) + var(--space-10));
  height: 100%;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: var(--space-5);
  padding: 0 var(--space-5);
}
.grid-overlay__col {
  background: color-mix(in srgb, var(--signal) 8%, transparent);
  border-left: 1px dashed color-mix(in srgb, var(--signal) 40%, transparent);
  border-right: 1px dashed color-mix(in srgb, var(--signal) 40%, transparent);
}

/* ---------- Responsive ---------- */
@media (max-width: 960px) {
  .container, .container--wide {
    padding-left: var(--space-5);
    padding-right: var(--space-5);
  }
  .identity__name { font-size: 34px; line-height: 40px; }
  .section__title { font-size: 24px; line-height: 32px; }
  .identity__meta { margin-bottom: var(--space-10); }
}

@media (max-width: 640px) {
  :root { --margin-outer: 20px; }
  .identity { padding-top: var(--space-10); }
  .identity__meta { flex-direction: column; align-items: flex-start; gap: var(--space-1); }
  .identity__name { font-size: 30px; line-height: 36px; }
  .kv, .case__fields { grid-template-columns: 1fr; gap: var(--space-1); }
  .kv__label, .case__field-label {
    grid-column: 1;
  }
  .kv__value, .case__field-value { grid-column: 1; margin-bottom: var(--space-3); }
  .case__head { flex-direction: column; align-items: flex-start; gap: var(--space-1); }
  .case__actions { flex-direction: column; gap: var(--space-2); }
  .archive td.kind { display: none; }
  .certs li { grid-template-columns: 1fr auto; gap: var(--space-2); }
  .certs__issuer { grid-column: 1 / -1; }
  .contact__row { grid-template-columns: 1fr auto; gap: var(--space-2); }
  .contact__label { grid-column: 1 / -1; }
  .footer__inner { grid-template-columns: 1fr; text-align: left; gap: var(--space-2); }
  .footer__inner > * { text-align: left !important; }
  .nav__links { gap: var(--space-3); }
  .nav__sep { display: none; }
}

/* ---------- Reduced motion ---------- */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}

/* ---------- Focus base ---------- */
:focus-visible {
  outline: 2px solid var(--signal);
  outline-offset: 3px;
  border-radius: 2px;
}
