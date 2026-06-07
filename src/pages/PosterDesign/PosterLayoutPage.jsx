import { useState, useEffect, useRef } from "react";

const LAYOUTS = [
  {
    id: "rule-thirds",
    name: "Rule of Thirds",
    desc: "Divide your poster into a 3×3 grid. Place your focal point at one of the four intersections. The eye naturally gravitates to these power points.",
    accent: "#f472b6",
    tip: "Never centre everything by default. Off-centre feels more alive.",
  },
  {
    id: "z-pattern",
    name: "Z-Pattern",
    desc: "The eye scans left-to-right, then diagonally down, then left-to-right again. Place your most important element top-left, least important bottom-right.",
    accent: "#34d399",
    tip: "Used in every newspaper front page ever printed.",
  },
  {
    id: "f-pattern",
    name: "F-Pattern",
    desc: "For text-heavy posters, the eye reads across the top, then scans down the left edge. Keep your strongest visual element top-left.",
    accent: "#fb923c",
    tip: "Eye-tracking studies confirmed this is how people read posters at a glance.",
  },
  {
    id: "golden-ratio",
    name: "Golden Ratio",
    desc: "The 1:1.618 ratio appears throughout nature. Divide your poster at the golden ratio — larger section holds the hero, smaller section holds supporting content.",
    accent: "#c4b5fd",
    tip: "Magazines have used this for over 100 years. It works because it works.",
  },
];

const HIERARCHY_LEVELS = [
  {
    label: "Hero headline",
    size: 72,
    weight: 900,
    opacity: 1,
    desc: "The first thing seen. Must work alone.",
  },
  {
    label: "Sub-headline",
    size: 28,
    weight: 400,
    opacity: 0.75,
    desc: "Supports the headline. Adds context.",
  },
  {
    label: "Body copy",
    size: 14,
    weight: 400,
    opacity: 0.45,
    desc: "For those who want more. Not required reading.",
  },
  {
    label: "Fine print",
    size: 10,
    weight: 300,
    opacity: 0.25,
    desc: "Date, venue, credits. Legal necessity.",
  },
];

export default function PosterLayoutPage({ onBack }) {
  const [activeLayout, setActiveLayout] = useState(0);
  const [showGuides, setShowGuides] = useState(true);
  const [activeHLevel, setActiveHLevel] = useState(null);
  const [posterText, setPosterText] = useState("GENESIS");
  const [posterSub, setPosterSub] = useState("Design Studio");
  const [posterBg, setPosterBg] = useState("#1a0a2e");
  const [posterAccent, setPosterAccent] = useState("#f472b6");
  const layout = LAYOUTS[activeLayout];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const bgs = [
    "#1a0a2e",
    "#0a1a2e",
    "#0a2a1a",
    "#1a0808",
    "#0a0a0a",
    "#1a1808",
  ];
  const accents = [
    "#f472b6",
    "#34d399",
    "#fb923c",
    "#c4b5fd",
    "#38bdf8",
    "#fde68a",
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .pl-page { min-height:100vh; background:#0a0a0a; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .pl-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(10,10,10,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .pl-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .pl-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .pl-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .pl-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); text-transform:uppercase; }

        .pl-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.08); position:relative; overflow:hidden; }
        .pl-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 25% 50%, rgba(244,114,182,0.06) 0%, transparent 55%); }
        .pl-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:14px; }
        .pl-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .pl-hero-title em { color:#f472b6; font-style:normal; }
        .pl-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .pl-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); line-height:1; pointer-events:none; user-select:none; }

        .pl-section { padding:72px 56px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .pl-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .pl-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; letter-spacing:0.02em; }
        .pl-section-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .pl-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* LAYOUT SELECTOR */
        .pl-layout-tabs { display:flex; gap:8px; margin-bottom:28px; flex-wrap:wrap; }
        .pl-layout-tab { padding:8px 18px; border-radius:3px; font-size:11px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); letter-spacing:0.06em; }
        .pl-layout-tab.active { border-color:rgba(244,114,182,0.4); color:#f472b6; background:rgba(244,114,182,0.08); }

        /* LAYOUT DEMO */
        .pl-layout-demo { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .pl-demo-canvas { position:relative; aspect-ratio:2/3; border:1px solid rgba(255,255,255,0.08); border-radius:8px; overflow:hidden; background:#111; }
        .pl-guide-line-v { position:absolute; top:0; bottom:0; width:1px; background:rgba(244,114,182,0.3); pointer-events:none; }
        .pl-guide-line-h { position:absolute; left:0; right:0; height:1px; background:rgba(244,114,182,0.3); pointer-events:none; }
        .pl-power-dot { position:absolute; width:12px; height:12px; border-radius:50%; border:2px solid #f472b6; background:rgba(244,114,182,0.2); transform:translate(-50%,-50%); pointer-events:none; }
        .pl-z-arrow { position:absolute; pointer-events:none; }
        .pl-demo-info { display:flex; flex-direction:column; justify-content:center; gap:16px; }
        .pl-demo-name { font-family:'Bebas Neue',sans-serif; font-size:32px; color:#fff; margin-bottom:4px; }
        .pl-demo-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.8; }
        .pl-demo-tip { padding:14px 18px; border-radius:6px; border-left:2px solid; font-size:13px; line-height:1.65; font-style:italic; }

        /* GUIDE TOGGLE */
        .pl-toggle { display:flex; align-items:center; gap:10px; cursor:pointer; margin-bottom:20px; width:fit-content; }
        .pl-toggle-track { width:36px; height:20px; border-radius:10px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.04); position:relative; transition:all 0.2s; }
        .pl-toggle-track.on { background:rgba(244,114,182,0.2); border-color:rgba(244,114,182,0.4); }
        .pl-toggle-thumb { width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,0.4); position:absolute; top:2px; left:2px; transition:all 0.2s; }
        .pl-toggle-track.on .pl-toggle-thumb { left:18px; background:#f472b6; }
        .pl-toggle-label { font-size:12px; color:rgba(255,255,255,0.35); }

        /* HIERARCHY */
        .pl-hierarchy { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .pl-hier-list { display:flex; flex-direction:column; gap:0; }
        .pl-hier-item { display:flex; align-items:center; gap:16px; padding:20px 0; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; transition:padding-left 0.2s; }
        .pl-hier-item:last-child { border-bottom:none; }
        .pl-hier-item:hover, .pl-hier-item.active-h { padding-left:8px; }
        .pl-hier-size { font-size:10px; letter-spacing:0.1em; color:rgba(255,255,255,0.2); width:36px; flex-shrink:0; }
        .pl-hier-label { flex:1; color:rgba(255,255,255,0.7); font-size:14px; transition:color 0.2s; }
        .pl-hier-item:hover .pl-hier-label, .pl-hier-item.active-h .pl-hier-label { color:#fff; }
        .pl-hier-bar { height:2px; flex-shrink:0; border-radius:1px; }
        .pl-hier-preview { display:flex; flex-direction:column; justify-content:center; padding:28px; border:1px solid rgba(255,255,255,0.07); border-radius:8px; background:#0d0d12; min-height:200px; gap:8px; }

        /* POSTER BUILDER */
        .pl-builder { display:grid; grid-template-columns:1fr 1fr; gap:0; border-top:1px solid rgba(255,255,255,0.08); }
        .pl-builder-controls { padding:60px 56px; border-right:1px solid rgba(255,255,255,0.08); }
        .pl-builder-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; margin-bottom:8px; }
        .pl-builder-sub { font-size:13px; color:rgba(255,255,255,0.3); line-height:1.7; margin-bottom:36px; }
        .pl-ctrl { margin-bottom:22px; }
        .pl-ctrl-label { font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:10px; }
        .pl-text-input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:4px; padding:9px 14px; color:#fff; font-size:16px; font-family:'Bebas Neue',sans-serif; width:100%; outline:none; letter-spacing:0.05em; }
        .pl-text-input:focus { border-color:rgba(255,255,255,0.25); }
        .pl-swatch-row { display:flex; gap:7px; flex-wrap:wrap; }
        .pl-swatch { width:24px; height:24px; border-radius:4px; cursor:pointer; border:2px solid transparent; transition:all 0.15s; }
        .pl-swatch.active { border-color:#fff; transform:scale(1.15); }
        .pl-dot-swatch { width:24px; height:24px; border-radius:50%; cursor:pointer; border:2px solid transparent; transition:all 0.15s; }
        .pl-dot-swatch.active { border-color:#fff; transform:scale(1.15); }

        .pl-builder-preview { padding:60px 56px; display:flex; align-items:center; justify-content:center; background:#0d0d12; }
        .pl-poster-wrap { width:200px; height:280px; border-radius:8px; overflow:hidden; position:relative; border:1px solid rgba(255,255,255,0.1); }
      `}</style>

      <div className="pl-page">
        <nav className="pl-nav">
          <button className="pl-back" onClick={onBack}>
            ← Back
          </button>
          <span className="pl-nav-title">Layout & Visual Hierarchy</span>
          <span className="pl-tag">Lesson 01</span>
        </nav>

        <div className="pl-hero">
          <div className="pl-hero-bg" />
          <div className="pl-hero-eyebrow">Poster Creation · Lesson 01</div>
          <div className="pl-hero-title">
            LAYOUT &<br />
            <em>HIERARCHY</em>
          </div>
          <p className="pl-hero-sub">
            Before a single element is placed, you need a skeleton. The
            invisible structure that tells the eye where to go — and in what
            order.
          </p>
          <div className="pl-hero-num">01</div>
        </div>

        {/* LAYOUT SYSTEMS */}
        <div className="pl-section">
          <div className="pl-section-header">
            <div className="pl-section-title">Layout Systems</div>
            <div className="pl-section-line" />
          </div>
          <p className="pl-section-sub">
            Every great poster follows an invisible structure. Choose your
            system before you start placing elements.
          </p>
          <div className="pl-toggle" onClick={() => setShowGuides(!showGuides)}>
            <div className={`pl-toggle-track${showGuides ? " on" : ""}`}>
              <div className="pl-toggle-thumb" />
            </div>
            <span className="pl-toggle-label">
              {showGuides ? "Guides visible" : "Show guides"}
            </span>
          </div>
          <div className="pl-layout-tabs">
            {LAYOUTS.map((l, i) => (
              <button
                key={i}
                className={`pl-layout-tab${activeLayout === i ? " active" : ""}`}
                onClick={() => setActiveLayout(i)}
              >
                {l.name}
              </button>
            ))}
          </div>
          <div className="pl-layout-demo">
            <div className="pl-demo-canvas">
              {/* content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: "#111",
                  display: "flex",
                  flexDirection: "column",
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 28,
                    color: "#fff",
                    lineHeight: 0.9,
                    marginBottom: 8,
                  }}
                >
                  POSTER
                  <br />
                  TITLE
                </div>
                <div
                  style={{
                    fontSize: 10,
                    color: "rgba(255,255,255,0.35)",
                    marginBottom: "auto",
                  }}
                >
                  Subtitle text here
                </div>
                <div
                  style={{
                    fontSize: 8,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.15em",
                  }}
                >
                  DATE · VENUE · INFO
                </div>
              </div>
              {/* guides */}
              {showGuides && activeLayout === 0 && (
                <>
                  <div className="pl-guide-line-v" style={{ left: "33.33%" }} />
                  <div className="pl-guide-line-v" style={{ left: "66.66%" }} />
                  <div className="pl-guide-line-h" style={{ top: "33.33%" }} />
                  <div className="pl-guide-line-h" style={{ top: "66.66%" }} />
                  {[
                    [33.33, 33.33],
                    [66.66, 33.33],
                    [33.33, 66.66],
                    [66.66, 66.66],
                  ].map(([x, y], i) => (
                    <div
                      key={i}
                      className="pl-power-dot"
                      style={{ left: `${x}%`, top: `${y}%` }}
                    />
                  ))}
                </>
              )}
              {showGuides && activeLayout === 1 && (
                <svg
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                >
                  <path
                    d="M 10% 15% L 90% 15%"
                    stroke="#f472b6"
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                    fill="none"
                    markerEnd="url(#arrow)"
                  />
                  <path
                    d="M 90% 15% L 10% 50%"
                    stroke="#f472b6"
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                    fill="none"
                  />
                  <path
                    d="M 10% 50% L 90% 85%"
                    stroke="#f472b6"
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                    fill="none"
                  />
                  <circle cx="10%" cy="15%" r="4" fill="#f472b6" />
                  <circle cx="90%" cy="15%" r="4" fill="#f472b6" />
                  <circle cx="10%" cy="50%" r="4" fill="#f472b6" />
                  <circle cx="90%" cy="85%" r="4" fill="#f472b6" />
                  <text
                    x="50%"
                    y="94%"
                    textAnchor="middle"
                    fontSize="7"
                    fill="rgba(244,114,182,0.6)"
                    letterSpacing="1"
                  >
                    Z-PATTERN
                  </text>
                </svg>
              )}
              {showGuides && activeLayout === 2 && (
                <svg
                  style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    pointerEvents: "none",
                  }}
                >
                  <path
                    d="M 10% 20% L 90% 20%"
                    stroke="#fb923c"
                    strokeWidth="2"
                    strokeDasharray="4,3"
                    fill="none"
                  />
                  <path
                    d="M 10% 20% L 10% 80%"
                    stroke="#fb923c"
                    strokeWidth="2"
                    strokeDasharray="4,3"
                    fill="none"
                  />
                  <path
                    d="M 10% 50% L 70% 50%"
                    stroke="#fb923c"
                    strokeWidth="1.5"
                    strokeDasharray="4,3"
                    fill="none"
                  />
                  <text
                    x="50%"
                    y="94%"
                    textAnchor="middle"
                    fontSize="7"
                    fill="rgba(251,146,60,0.6)"
                    letterSpacing="1"
                  >
                    F-PATTERN
                  </text>
                </svg>
              )}
              {showGuides && activeLayout === 3 && (
                <>
                  <div
                    className="pl-guide-line-v"
                    style={{
                      left: "61.8%",
                      background: "rgba(196,181,253,0.4)",
                    }}
                  />
                  <div
                    className="pl-guide-line-h"
                    style={{
                      top: "61.8%",
                      background: "rgba(196,181,253,0.4)",
                    }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 4,
                      left: "63%",
                      fontSize: 8,
                      color: "rgba(196,181,253,0.6)",
                      letterSpacing: "0.1em",
                    }}
                  >
                    1.618
                  </div>
                </>
              )}
            </div>
            <div className="pl-demo-info">
              <div className="pl-demo-name" style={{ color: layout.accent }}>
                {layout.name}
              </div>
              <div className="pl-demo-desc">{layout.desc}</div>
              <div
                className="pl-demo-tip"
                style={{
                  borderColor: `${layout.accent}50`,
                  background: `${layout.accent}08`,
                  color: layout.accent,
                }}
              >
                💡 {layout.tip}
              </div>
            </div>
          </div>
        </div>

        {/* HIERARCHY */}
        <div className="pl-section">
          <div className="pl-section-header">
            <div className="pl-section-title">Visual Hierarchy</div>
            <div className="pl-section-line" />
          </div>
          <p className="pl-section-sub">
            Size is the most powerful hierarchy tool. Click each level to see
            how it functions in the poster.
          </p>
          <div className="pl-hierarchy">
            <div className="pl-hier-list">
              {HIERARCHY_LEVELS.map((h, i) => (
                <div
                  key={i}
                  className={`pl-hier-item${activeHLevel === i ? " active-h" : ""}`}
                  onClick={() => setActiveHLevel(activeHLevel === i ? null : i)}
                >
                  <div className="pl-hier-size">{h.size}px</div>
                  <div className="pl-hier-label">{h.label}</div>
                  <div
                    className="pl-hier-bar"
                    style={{
                      width: `${h.opacity * 80}px`,
                      background: `rgba(244,114,182,${h.opacity})`,
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="pl-hier-preview">
              {HIERARCHY_LEVELS.map((h, i) => (
                <div
                  key={i}
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: Math.min(h.size, 36),
                    fontWeight: h.weight,
                    opacity:
                      activeHLevel === null
                        ? h.opacity
                        : activeHLevel === i
                          ? 1
                          : 0.1,
                    color: activeHLevel === i ? "#f472b6" : "#fff",
                    lineHeight: 1,
                    transition: "opacity 0.3s, color 0.3s",
                    letterSpacing: "0.02em",
                  }}
                >
                  {h.label}
                </div>
              ))}
              {activeHLevel !== null && (
                <div
                  style={{
                    marginTop: 12,
                    padding: "10px 14px",
                    background: "rgba(244,114,182,0.08)",
                    borderLeft: "2px solid #f472b6",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.6,
                  }}
                >
                  {HIERARCHY_LEVELS[activeHLevel].desc}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* POSTER BUILDER */}
        <div className="pl-builder">
          <div className="pl-builder-controls">
            <div className="pl-builder-title">
              BUILD YOUR
              <br />
              POSTER
            </div>
            <p className="pl-builder-sub">
              Apply the layout principles. Edit the content and see your poster
              update live.
            </p>
            <div className="pl-ctrl">
              <div className="pl-ctrl-label">Headline</div>
              <input
                className="pl-text-input"
                value={posterText}
                onChange={(e) => setPosterText(e.target.value)}
                placeholder="GENESIS"
                maxLength={12}
              />
            </div>
            <div className="pl-ctrl">
              <div className="pl-ctrl-label">Sub-headline</div>
              <input
                className="pl-text-input"
                value={posterSub}
                onChange={(e) => setPosterSub(e.target.value)}
                placeholder="Design Studio"
                maxLength={20}
                style={{
                  fontFamily: "'DM Sans',sans-serif",
                  fontSize: 14,
                  letterSpacing: "0.02em",
                }}
              />
            </div>
            <div className="pl-ctrl">
              <div className="pl-ctrl-label">Background</div>
              <div className="pl-swatch-row">
                {bgs.map((c) => (
                  <div
                    key={c}
                    className={`pl-swatch${posterBg === c ? " active" : ""}`}
                    style={{ background: c }}
                    onClick={() => setPosterBg(c)}
                  />
                ))}
              </div>
            </div>
            <div className="pl-ctrl">
              <div className="pl-ctrl-label">Accent colour</div>
              <div className="pl-swatch-row">
                {accents.map((c) => (
                  <div
                    key={c}
                    className={`pl-dot-swatch${posterAccent === c ? " active" : ""}`}
                    style={{ background: c }}
                    onClick={() => setPosterAccent(c)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="pl-builder-preview">
            <div className="pl-poster-wrap">
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: posterBg,
                  transition: "background 0.3s",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.07'/%3E%3C/svg%3E")`,
                  opacity: 0.5,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at 60% 30%, ${posterAccent}25 0%, transparent 60%)`,
                  transition: "background 0.3s",
                }}
              />
              {/* rule of thirds guides on poster */}
              <div
                style={{
                  position: "absolute",
                  left: "33.33%",
                  top: 0,
                  bottom: 0,
                  width: "0.5px",
                  background: `${posterAccent}20`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "66.66%",
                  top: 0,
                  bottom: 0,
                  width: "0.5px",
                  background: `${posterAccent}20`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "33.33%",
                  left: 0,
                  right: 0,
                  height: "0.5px",
                  background: `${posterAccent}20`,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "66.66%",
                  left: 0,
                  right: 0,
                  height: "0.5px",
                  background: `${posterAccent}20`,
                }}
              />
              {/* content */}
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  padding: "18px 16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div
                  style={{
                    fontSize: 8,
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: `${posterAccent}80`,
                  }}
                >
                  Genesis Design
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: "clamp(2rem,8vw,2.8rem)",
                      lineHeight: 0.88,
                      color: "#fff",
                      marginBottom: 8,
                      letterSpacing: "0.02em",
                    }}
                  >
                    {posterText || "GENESIS"}
                  </div>
                  <div
                    style={{
                      width: 24,
                      height: "1.5px",
                      background: posterAccent,
                      marginBottom: 8,
                      transition: "background 0.3s",
                    }}
                  />
                  <div
                    style={{
                      fontSize: 10,
                      color: "rgba(255,255,255,0.5)",
                      letterSpacing: "0.06em",
                    }}
                  >
                    {posterSub || "Design Studio"}
                  </div>
                </div>
                <div
                  style={{
                    fontSize: 7,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                  }}
                >
                  2024 · COLLECTION
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
