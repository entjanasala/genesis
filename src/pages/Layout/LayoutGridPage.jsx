import { useState, useEffect } from "react";

const GRID_TYPES = [
  {
    name: "Column Grid",
    desc: "The most common grid. Divides the page into equal vertical columns with gutters between them. Used in editorial, web, and app design.",
    cols: 12,
    accent: "#a5f3fc",
  },
  {
    name: "Modular Grid",
    desc: "Both columns AND rows divide the space into modules. Creates a rigid but powerful structure for complex layouts like dashboards.",
    cols: 6,
    rows: 4,
    accent: "#86efac",
  },
  {
    name: "Hierarchical Grid",
    desc: "No strict rules — zones are defined by content need. Used in editorial spreads where images and text need flexible placement.",
    cols: 3,
    accent: "#fda4af",
  },
];

const ALIGNMENT_RULES = [
  {
    title: "Left alignment",
    sub: "Default & safest",
    desc: "The eye naturally starts left. Left-aligned text creates a clean left edge that guides reading. Use for body text always.",
    example: "left",
    accent: "#a5f3fc",
  },
  {
    title: "Centre alignment",
    sub: "For headlines only",
    desc: "Centred text creates symmetry but makes long text hard to read. Reserve for short headlines, titles, and ceremonial text.",
    example: "center",
    accent: "#c4b5fd",
  },
  {
    title: "Right alignment",
    sub: "Use sparingly",
    desc: "Creates tension and direction. Useful for captions, pull quotes, and navigation items — rarely for body text.",
    example: "right",
    accent: "#fda4af",
  },
];

export default function LayoutGridPage({ onBack }) {
  const [activeGrid, setActiveGrid] = useState(0);
  const [activeAlign, setActiveAlign] = useState(0);
  const [showBaseline, setShowBaseline] = useState(false);
  const grid = GRID_TYPES[activeGrid];
  const align = ALIGNMENT_RULES[activeAlign];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');
        .lg-page { min-height:100vh; background:#06080f; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); overflow-x:hidden; }
        .lg-nav { display:flex; align-items:center; justify-content:space-between; padding:18px 48px; position:sticky; top:0; background:rgba(6,8,15,0.9); backdrop-filter:blur(24px); border-bottom:0.5px solid rgba(255,255,255,0.06); z-index:100; }
        .lg-back { background:none; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.45); padding:8px 20px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .lg-back:hover { color:#fff; border-color:rgba(255,255,255,0.25); }
        .lg-nav-label { font-family:'DM Serif Display',serif; font-size:16px; color:rgba(255,255,255,0.6); }
        .lg-lesson-tag { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.2); }

        /* HERO */
        .lg-hero { position:relative; padding:80px 48px 60px; border-bottom:0.5px solid rgba(255,255,255,0.06); overflow:hidden; }
        .lg-hero-lines { position:absolute; inset:0; pointer-events:none; }
        .lg-hl { position:absolute; left:0; right:0; height:0.5px; background:linear-gradient(to right, transparent 5%, rgba(165,243,252,0.07) 30%, rgba(165,243,252,0.07) 70%, transparent 95%); }
        .lg-vl { position:absolute; top:0; bottom:0; width:0.5px; background:linear-gradient(to bottom, transparent 10%, rgba(165,243,252,0.05) 50%, transparent 90%); }
        .lg-hero-inner { position:relative; z-index:1; max-width:640px; }
        .lg-eyebrow { font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; display:flex; align-items:center; gap:12px; }
        .lg-eyebrow::after { content:''; flex:0 0 40px; height:0.5px; background:rgba(255,255,255,0.2); }
        .lg-hero-title { font-family:'DM Serif Display',serif; font-size:clamp(3rem,7vw,6rem); font-weight:400; line-height:0.95; letter-spacing:-0.03em; color:#fff; margin-bottom:24px; }
        .lg-hero-title em { font-style:italic; color:#a5f3fc; display:block; }
        .lg-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:480px; }
        .lg-hero-num { position:absolute; right:48px; bottom:-20px; font-family:'DM Serif Display',serif; font-size:clamp(6rem,15vw,14rem); color:transparent; -webkit-text-stroke:0.5px rgba(165,243,252,0.08); line-height:1; pointer-events:none; user-select:none; }

        /* SECTIONS */
        .lg-section { padding:72px 48px; border-bottom:0.5px solid rgba(255,255,255,0.06); }
        .lg-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .lg-section-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.2rem); color:#fff; letter-spacing:-0.02em; }
        .lg-section-line { flex:1; height:0.5px; background:rgba(255,255,255,0.07); }
        .lg-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* GRID TABS */
        .lg-tabs { display:flex; gap:8px; margin-bottom:28px; }
        .lg-tab { padding:8px 20px; border-radius:999px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:0.5px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); }
        .lg-tab.active { background:rgba(165,243,252,0.1); border-color:rgba(165,243,252,0.3); color:#a5f3fc; }

        /* GRID VISUAL */
        .lg-grid-layout { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:start; }
        .lg-grid-visual { position:relative; height:200px; border:0.5px solid rgba(255,255,255,0.08); border-radius:16px; overflow:hidden; background:rgba(255,255,255,0.02); }
        .lg-gcol { position:absolute; top:0; bottom:0; background:rgba(165,243,252,0.05); transition:all 0.3s; }
        .lg-gline { position:absolute; top:0; bottom:0; width:0.5px; background:rgba(165,243,252,0.15); }
        .lg-grow { position:absolute; left:0; right:0; height:0.5px; background:rgba(134,239,172,0.1); }
        .lg-grid-info { display:flex; flex-direction:column; gap:12px; }
        .lg-grid-name { font-family:'DM Serif Display',serif; font-size:22px; color:#fff; margin-bottom:4px; }
        .lg-grid-desc { font-size:13px; color:rgba(255,255,255,0.35); line-height:1.75; }

        /* ALIGNMENT DEMO */
        .lg-align-tabs { display:flex; gap:8px; margin-bottom:24px; }
        .lg-align-tab { padding:8px 20px; border-radius:999px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:0.5px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); }
        .lg-align-tab.active { border-color:rgba(165,243,252,0.3); color:#a5f3fc; background:rgba(165,243,252,0.08); }
        .lg-align-layout { display:grid; grid-template-columns:1fr 1fr; gap:32px; align-items:center; }
        .lg-align-preview { border:0.5px solid rgba(255,255,255,0.08); border-radius:16px; padding:32px; background:rgba(255,255,255,0.02); }
        .lg-align-headline { font-family:'DM Serif Display',serif; font-size:28px; color:#fff; margin-bottom:12px; transition:text-align 0.3s; }
        .lg-align-body { font-size:13px; color:rgba(255,255,255,0.35); line-height:1.75; transition:text-align 0.3s; }
        .lg-align-info { display:flex; flex-direction:column; gap:10px; }
        .lg-align-title { font-family:'DM Serif Display',serif; font-size:22px; color:#fff; margin-bottom:4px; }
        .lg-align-sub { font-size:11px; letter-spacing:0.1em; text-transform:uppercase; margin-bottom:10px; }
        .lg-align-desc { font-size:13px; color:rgba(255,255,255,0.35); line-height:1.75; }

        /* BASELINE TOGGLE */
        .lg-baseline-wrap { position:relative; border:0.5px solid rgba(255,255,255,0.08); border-radius:16px; padding:40px 36px; background:rgba(255,255,255,0.02); overflow:hidden; }
        .lg-baseline-lines { position:absolute; inset:0; pointer-events:none; }
        .lg-bline { position:absolute; left:0; right:0; height:0.5px; background:rgba(134,239,172,0.15); transition:opacity 0.3s; }
        .lg-baseline-text { position:relative; z-index:1; font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.4rem); color:#fff; line-height:1.6; }
        .lg-toggle { display:flex; align-items:center; gap:10px; margin-bottom:20px; cursor:pointer; width:fit-content; }
        .lg-toggle-track { width:36px; height:20px; border-radius:10px; border:0.5px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.04); position:relative; transition:background 0.2s; }
        .lg-toggle-track.on { background:rgba(134,239,172,0.25); border-color:rgba(134,239,172,0.4); }
        .lg-toggle-thumb { width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,0.4); position:absolute; top:2px; left:2px; transition:all 0.2s; }
        .lg-toggle-track.on .lg-toggle-thumb { left:18px; background:#86efac; }
        .lg-toggle-label { font-size:12px; color:rgba(255,255,255,0.35); }

        /* RULES */
        .lg-rules { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .lg-rule { border-radius:16px; padding:22px; border:1px solid; }
        .lg-rule-num { font-family:'DM Serif Display',serif; font-size:32px; margin-bottom:10px; }
        .lg-rule-title { font-size:14px; font-weight:500; color:rgba(255,255,255,0.85); margin-bottom:7px; }
        .lg-rule-text { font-size:12px; color:rgba(255,255,255,0.35); line-height:1.7; }
      `}</style>

      <div className="lg-page">
        <nav className="lg-nav">
          <button className="lg-back" onClick={onBack}>
            ← Back
          </button>
          <span className="lg-nav-label">Grid & Alignment</span>
          <span className="lg-lesson-tag">Lesson 01</span>
        </nav>

        {/* HERO */}
        <div className="lg-hero">
          <div className="lg-hero-lines">
            {[25, 50, 75].map((p, i) => (
              <div key={i} className="lg-hl" style={{ top: `${p}%` }} />
            ))}
            {[20, 40, 60, 80].map((p, i) => (
              <div key={i} className="lg-vl" style={{ left: `${p}%` }} />
            ))}
          </div>
          <div className="lg-hero-inner">
            <div className="lg-eyebrow">Layout · Lesson 01</div>
            <h1 className="lg-hero-title">
              Grid &<br />
              <em>Alignment</em>
            </h1>
            <p className="lg-hero-sub">
              Every element in your design should connect to an invisible
              structure. Grids are not constraints — they're freedom with
              boundaries.
            </p>
          </div>
          <div className="lg-hero-num">01</div>
        </div>

        {/* GRID TYPES */}
        <div className="lg-section">
          <div className="lg-section-header">
            <div className="lg-section-title">Grid Systems</div>
            <div className="lg-section-line" />
          </div>
          <p className="lg-section-sub">
            Different layouts demand different grids. Know which one to reach
            for.
          </p>
          <div className="lg-tabs">
            {GRID_TYPES.map((g, i) => (
              <button
                key={i}
                className={`lg-tab${activeGrid === i ? " active" : ""}`}
                onClick={() => setActiveGrid(i)}
              >
                {g.name}
              </button>
            ))}
          </div>
          <div className="lg-grid-layout">
            <div className="lg-grid-visual">
              {Array.from({ length: grid.cols + 1 }).map((_, i) => (
                <div
                  key={i}
                  className="lg-gline"
                  style={{ left: `${(i / grid.cols) * 100}%` }}
                />
              ))}
              {Array.from({ length: grid.cols }).map((_, i) => (
                <div
                  key={i}
                  className="lg-gcol"
                  style={{
                    left: `${(i / grid.cols) * 100 + 0.3}%`,
                    width: `${(1 / grid.cols) * 100 - 0.6}%`,
                  }}
                />
              ))}
              {grid.rows &&
                Array.from({ length: grid.rows + 1 }).map((_, i) => (
                  <div
                    key={i}
                    className="lg-grow"
                    style={{ top: `${(i / grid.rows) * 100}%` }}
                  />
                ))}
            </div>
            <div className="lg-grid-info">
              <div className="lg-grid-name">{grid.name}</div>
              <div className="lg-grid-desc">{grid.desc}</div>
            </div>
          </div>
        </div>

        {/* ALIGNMENT */}
        <div className="lg-section">
          <div className="lg-section-header">
            <div className="lg-section-title">Text Alignment</div>
            <div className="lg-section-line" />
          </div>
          <p className="lg-section-sub">
            Alignment is not just aesthetic — it's a readability decision.
          </p>
          <div className="lg-align-tabs">
            {ALIGNMENT_RULES.map((a, i) => (
              <button
                key={i}
                className={`lg-align-tab${activeAlign === i ? " active" : ""}`}
                onClick={() => setActiveAlign(i)}
              >
                {a.title}
              </button>
            ))}
          </div>
          <div className="lg-align-layout">
            <div className="lg-align-preview">
              <div
                className="lg-align-headline"
                style={{ textAlign: align.example }}
              >
                Design with intention
              </div>
              <div
                className="lg-align-body"
                style={{ textAlign: align.example }}
              >
                The way you align text communicates structure, personality, and
                purpose. Every choice signals something to the reader.
              </div>
            </div>
            <div className="lg-align-info">
              <div className="lg-align-title">{align.title}</div>
              <div className="lg-align-sub" style={{ color: align.accent }}>
                {align.sub}
              </div>
              <div className="lg-align-desc">{align.desc}</div>
            </div>
          </div>
        </div>

        {/* BASELINE GRID */}
        <div className="lg-section">
          <div className="lg-section-header">
            <div className="lg-section-title">Baseline Grid</div>
            <div className="lg-section-line" />
          </div>
          <p className="lg-section-sub">
            Toggle the baseline grid to see how text snaps to invisible
            horizontal lines — the secret of vertical rhythm.
          </p>
          <div
            className="lg-toggle"
            onClick={() => setShowBaseline(!showBaseline)}
          >
            <div className={`lg-toggle-track${showBaseline ? " on" : ""}`}>
              <div className="lg-toggle-thumb" />
            </div>
            <span className="lg-toggle-label">
              {showBaseline ? "Baseline grid visible" : "Show baseline grid"}
            </span>
          </div>
          <div className="lg-baseline-wrap">
            <div
              className="lg-baseline-lines"
              style={{ opacity: showBaseline ? 1 : 0 }}
            >
              {Array.from({ length: 12 }).map((_, i) => (
                <div
                  key={i}
                  className="lg-bline"
                  style={{ top: `${(i + 1) * 8.33}%` }}
                />
              ))}
            </div>
            <div className="lg-baseline-text">
              Typography sits on the baseline.
              <br />
              Every line of text aligns to
              <br />
              the same invisible grid.
            </div>
          </div>
        </div>

        {/* RULES */}
        <div className="lg-section" style={{ borderBottom: "none" }}>
          <div className="lg-section-header">
            <div className="lg-section-title">Key Rules</div>
            <div className="lg-section-line" />
          </div>
          <div className="lg-rules">
            {[
              {
                n: "8px",
                title: "The 8-point grid",
                text: "Base all sizing and spacing on multiples of 8. 8, 16, 24, 32, 48, 64. This creates natural harmony across your design.",
                bg: "rgba(165,243,252,0.07)",
                border: "rgba(165,243,252,0.2)",
                accent: "#a5f3fc",
              },
              {
                n: "→",
                title: "Consistent gutters",
                text: "Gutters between columns should be consistent throughout. 16px for mobile, 24px for tablet, 32px for desktop is a reliable default.",
                bg: "rgba(134,239,172,0.07)",
                border: "rgba(134,239,172,0.2)",
                accent: "#86efac",
              },
              {
                n: "∅",
                title: "Break the grid with purpose",
                text: "Once the grid is established, breaking it becomes meaningful. A full-bleed image or offset element creates deliberate tension.",
                bg: "rgba(253,164,175,0.07)",
                border: "rgba(253,164,175,0.2)",
                accent: "#fda4af",
              },
            ].map((r, i) => (
              <div
                key={i}
                className="lg-rule"
                style={{ background: r.bg, borderColor: r.border }}
              >
                <div className="lg-rule-num" style={{ color: r.accent }}>
                  {r.n}
                </div>
                <div className="lg-rule-title">{r.title}</div>
                <div className="lg-rule-text">{r.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
