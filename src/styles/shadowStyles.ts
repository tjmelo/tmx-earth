const shadowStyles = `:host {
  --page-bg: #ebebee;
  --panel-bg: #f9fafb;
  --panel-soft: #f3f4f6;
  --panel-alt: #f5f6f8;
  --surface: #ffffff;
  --surface-strong: #f5f5f7;
  --surface-soft: #eef1f3;
  --ink: #1f2328;
  --muted: #737b84;
  --line: #dfe3e8;
  --purple: #7b4ee7;
  --purple-soft: #f2ebff;
  --green: #58b77b;
  --green-soft: #e6f5ec;
  --shadow: rgba(27, 39, 50, 0.08);
  background: var(--page-bg);
  color: var(--ink);
  padding: 1.25rem;
  display: block;
  min-height: 100vh;
  transition: background-color 0.2s ease;
}

:host([data-theme="dark"]) {
  --page-bg: #101418;
  --panel-bg: #171b22;
  --panel-soft: #1d222a;
  --surface: #1f2430;
  --surface-strong: #242c38;
  --surface-soft: #131a22;
  --ink: #edf3f8;
  --muted: #aab5c1;
  --line: rgba(255, 255, 255, 0.08);
  --purple: #b993ff;
  --purple-soft: rgba(185, 147, 255, 0.12);
  --green: #77d7a3;
  --green-soft: rgba(119, 215, 163, 0.14);
  --shadow: rgba(0, 0, 0, 0.28);
}

:host * {
  box-sizing: border-box;
  font-family: "Segoe UI", "Roboto", "Helvetica Neue", Arial, sans-serif;
}

button,
select,
input {
  font: inherit;
}

button:focus-visible,
select:focus-visible,
input:focus-visible {
  outline: 3px solid var(--purple);
  outline-offset: 2px;
}

.app-shell {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0.5rem 0 0;
}

.app-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  width: 100%;
  background: rgba(255, 255, 255, 0.18);
  border: 1px solid var(--line);
  border-radius: 1.125rem;
  padding: 0.75rem 1rem;
  margin-bottom: 1.2rem;
}

.brand-block {
  display: flex;
  align-items: center;
  gap: 0.8rem;
}

.brand-mark {
  width: 2.2rem;
  height: 2.2rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  background: linear-gradient(135deg, #7d53f8, #5d45d6);
  box-shadow: inset 0 0 0 2px rgba(255,255,255,0.6);
}

.brand-mark-inner {
  display: block;
  width: 0.9rem;
  height: 0.9rem;
  border: 2px solid #fff;
  border-radius: 50%;
  position: relative;
}

.brand-mark-inner::before,
.brand-mark-inner::after {
  content: "";
  position: absolute;
  inset: 50% auto auto 50%;
  transform: translate(-50%, -50%);
  width: 1.55rem;
  height: 2px;
  border-radius: 2px;
  background: rgba(255,255,255,0.95);
}

.brand-mark-inner::after {
  transform: translate(-50%, -50%) rotate(90deg);
}

.brand-copy {
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
}

.brand-copy h1 {
  margin: 0;
  font-size: 1.05rem;
  line-height: 1.1;
  font-weight: 700;
  letter-spacing: -0.03em;
}

.brand-copy small {
  color: var(--muted);
  font-size: 0.76rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.theme-toggle-button {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  min-height: 2.4rem;
  padding: 0.5rem 0.85rem 0.5rem 0.7rem;
  border: 1px solid var(--line);
  border-radius: 999px;
  background: rgba(255,255,255,0.72);
  color: var(--ink);
  font-size: 0.96rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s ease, border-color 0.2s ease;
}

.theme-toggle-button:hover {
  background: rgba(255,255,255,0.9);
}

.theme-toggle-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 1.1rem;
  height: 1.1rem;
  font-size: 0.9rem;
  line-height: 1;
}

.theme-toggle-text {
  white-space: nowrap;
}

.info-button {
  border: 1px solid var(--line);
  background: rgba(255,255,255,0.72);
  color: var(--ink);
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
}

.container {
  background: rgba(255,255,255,0.55);
  border: 1px solid var(--line);
  border-radius: 1.125rem;
  padding: 1rem 1.1rem;
  box-shadow: 0 1px 0 var(--shadow);
}

.country-list-panel,
.country-details-panel {
  background: rgba(255,255,255,0.22);
}

.country-selector-shell {
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.country-selector-label {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  color: var(--muted);
  text-transform: uppercase;
}

.select-field-wrap {
  position: relative;
}

.country-selector {
  appearance: none;
  -webkit-appearance: none;
  width: 100%;
  min-height: 3.2rem;
  border: 1px solid var(--line);
  border-radius: 0.95rem;
  padding: 0.9rem 3rem 0.9rem 1rem;
  background: var(--surface);
  color: var(--ink);
  font-size: 1.04rem;
  box-shadow: inset 0 1px 0 rgba(0,0,0,0.01);
}

.select-chevron {
  position: absolute;
  right: 1rem;
  top: 50%;
  transform: translateY(-50%);
  color: var(--muted);
  font-size: 1.45rem;
  line-height: 1;
  pointer-events: none;
}

.country-selector option {
  color: var(--ink);
  background: var(--surface);
}

.country-details-panel {
  margin-top: 1.3rem;
  padding: 1.2rem 1.1rem 0.9rem;
}

.country-details-content {
  display: flex;
  flex-direction: column;
}

.country-profile {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.country-hero {
  display: grid;
  grid-template-columns: minmax(320px, 1.1fr) minmax(400px, 1.5fr);
  gap: 1.5rem;
  align-items: start;
}

.flag-frame {
  background: #f8f9fb;
  border: 1px solid var(--line);
  border-radius: 1.2rem;
  overflow: hidden;
  min-height: 260px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  box-shadow: 0 1px 0 var(--shadow);
}

.flag-frame img {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 235px;
  object-fit: cover;
  background: #f0f2f5;
}

.flag-caption {
  display: inline-flex;
  align-items: center;
  padding: 0.65rem 0.9rem;
  font-size: 0.74rem;
  color: var(--muted);
  background: rgba(255,255,255,0.4);
  border-top: 1px solid var(--line);
}

.country-overview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-top: 0.4rem;
}

.country-overview h2 {
  margin: 0;
  font-size: clamp(2.2rem, 3vw, 3rem);
  line-height: 1;
  letter-spacing: -0.05em;
  font-weight: 800;
}

.country-badges {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  flex-wrap: wrap;
}

.country-badges span {
  display: inline-flex;
  align-items: center;
  height: 1.9rem;
  padding: 0 0.8rem;
  border-radius: 999px;
  background: var(--surface-soft);
  color: var(--muted);
  border: 1px solid var(--line);
  font-size: 0.76rem;
  font-weight: 600;
}

.country-badges .badge-muted {
  background: var(--purple-soft);
  color: var(--purple);
  border-color: rgba(123, 78, 231, 0.2);
}

.country-description {
  margin: 0;
  line-height: 1.5;
  color: var(--muted);
  max-width: 60ch;
  font-size: 1.04rem;
}

.country-stat-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.stat-card {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  min-height: 94px;
  padding: 1rem 0.9rem;
  border: 1px solid var(--line);
  border-radius: 0.8rem;
  background: rgba(255,255,255,0.35);
  min-width: 0;
}

.stat-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2.45rem;
  height: 2.45rem;
  min-width: 2.45rem;
  border-radius: 0.7rem;
  flex-shrink: 0;
}

.stat-icon svg {
  width: 1.45rem;
  height: 1.45rem;
  display: block;
}

.stat-icon.people { background: #f3ebff; color: #7d53f8; }
.stat-icon.area { background: #ebf9ef; color: #58b77b; }
.stat-icon.capital { background: #fff4d6; color: #d99a00; }
.stat-icon.language { background: #edf5ff; color: #4d86ff; }

.stat-card div {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  min-width: 0;
}

.stat-card small {
  color: var(--muted);
  font-size: 0.64rem;
  font-weight: 700;
  letter-spacing: 0.08em;
}

.stat-card strong {
  line-height: 1.2;
  font-size: 1.08rem;
  font-weight: 700;
  color: var(--ink);
  word-break: break-word;
  overflow-wrap: anywhere;
}

.stat-card em {
  font-style: normal;
  color: var(--muted);
  font-size: 0.74rem;
}

.country-info-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 1.3rem;
  margin-top: 0.2rem;
}

.info-panel {
  background: rgba(255,255,255,0.28);
  border: 1px solid var(--line);
  border-radius: 1rem;
  padding: 1rem 1.1rem 0.8rem;
}

.panel-title {
  margin-bottom: 0.8rem;
  font-size: 0.76rem;
  font-weight: 800;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--muted);
}

.row-list {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.row-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--line);
}

.row-item:last-child {
  border-bottom: none;
}

.row-label {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  color: var(--muted);
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.row-value {
  color: var(--ink);
  font-size: 0.97rem;
  font-weight: 600;
  text-align: right;
}

.map-panel {
  display: flex;
  flex-direction: column;
}

.map-block {
  position: relative;
  flex: 1;
  min-height: 240px;
  border-radius: 1rem;
  background:
    radial-gradient(circle at 50% 50%, rgba(125,83,248,0.15), transparent 45%),
    linear-gradient(180deg, #f4f6f7, #e9edf0);
  border: 1px solid var(--line);
  overflow: hidden;
}

.map-block::before {
  content: "";
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle at 28% 30%, rgba(255,255,255,0.9) 0 2%, transparent 2.5%),
    radial-gradient(circle at 12% 22%, rgba(255,255,255,0.9) 0 3.5%, transparent 4%),
    radial-gradient(circle at 60% 70%, rgba(255,255,255,0.9) 0 4%, transparent 4.5%),
    radial-gradient(circle at 70% 30%, rgba(255,255,255,0.9) 0 3%, transparent 3.5%);
  opacity: 0.45;
}

.map-dot {
  position: absolute;
  left: 50%;
  top: 55%;
  width: 1rem;
  height: 1rem;
  margin-left: -0.5rem;
  margin-top: -0.5rem;
  border-radius: 50%;
  background: var(--purple);
  box-shadow: 0 0 0 8px rgba(123,78,231,0.18);
}

@media (max-width: 900px) {
  .country-hero,
  .country-info-grid {
    grid-template-columns: 1fr;
  }

  .country-stat-grid {
    grid-template-columns: repeat(2, minmax(160px, 1fr));
  }
}

@media (max-width: 560px) {
  :host {
    padding: 0.8rem;
  }

  .app-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .header-actions {
    width: 100%;
    justify-content: flex-end;
  }

  .country-stat-grid {
    grid-template-columns: 1fr;
  }

  .row-item {
    flex-direction: column;
    align-items: flex-start;
  }

  .row-value {
    text-align: left;
  }
}
`

export default shadowStyles
