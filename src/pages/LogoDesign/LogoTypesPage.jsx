import { useState, useEffect } from "react";

const LOGO_TYPES = [
  {
    id: "wordmark",
    name: "Wordmark",
    tagline: "The name IS the logo",
    accent: "#c4b5fd",
    bg: "#1a0a3e",
    desc: "Pure typography. The brand name styled with such intention that the letters become the mark. Requires a distinctive name and exceptional type handling.",
    when: "Strong brand name, short word, distinctive letterforms",
    examples: [
      {
        brand: "GOOGLE",
        style: {
          fontFamily: "sans-serif",
          fontWeight: 700,
          fontSize: 36,
          background:
            "linear-gradient(90deg,#4285f4,#ea4335,#fbbc04,#34a853,#4285f4)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          display: "inline-block",
        },
      },
      {
        brand: "COCA-COLA",
        style: {
          fontFamily: "Georgia,serif",
          fontWeight: 700,
          fontSize: 28,
          color: "#ff2020",
          letterSpacing: -1,
        },
      },
      {
        brand: "NETFLIX",
        style: {
          fontFamily: "Impact,sans-serif",
          fontWeight: 900,
          fontSize: 34,
          color: "#e50914",
          letterSpacing: 2,
        },
      },
      {
        brand: "EBAY",
        style: {
          fontFamily: "Arial,sans-serif",
          fontWeight: 900,
          fontSize: 38,
          background:
            "linear-gradient(90deg,#e53238 25%,#f26122 25% 50%,#0064d2 50% 75%,#86b817 75%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          display: "inline-block",
        },
      },
    ],
  },
  {
    id: "lettermark",
    name: "Lettermark",
    tagline: "Initials as identity",
    accent: "#f9a8d4",
    bg: "#3a0a2e",
    desc: "One or two letters, designed to stand alone. Works when the brand name is too long or when abbreviation becomes iconic.",
    when: "Long company name, memorable initials, global brand",
    examples: [
      {
        brand: "IBM",
        style: {
          fontFamily: "Impact,sans-serif",
          fontWeight: 900,
          fontSize: 44,
          color: "#006699",
          letterSpacing: 4,
        },
      },
      {
        brand: "HP",
        style: {
          fontFamily: "sans-serif",
          fontWeight: 900,
          fontSize: 48,
          color: "#0096d6",
        },
      },
      {
        brand: "LV",
        style: {
          fontFamily: "Georgia,serif",
          fontWeight: 400,
          fontSize: 44,
          color: "#c8a96e",
          letterSpacing: 3,
        },
      },
      {
        brand: "CNN",
        style: {
          fontFamily: "Arial Black,sans-serif",
          fontWeight: 900,
          fontSize: 40,
          color: "#cc0000",
          letterSpacing: 2,
        },
      },
    ],
  },
  {
    id: "pictorial",
    name: "Pictorial Mark",
    tagline: "An image says everything",
    accent: "#fdba74",
    bg: "#2a1a00",
    desc: "A simple, recognisable image. Works when the visual is so connected to the brand it needs no words. Takes years to build this recognition.",
    when: "Established brand, simple memorable image, global audience",
    examples: [
      { brand: "🍎", style: { fontSize: 56 }, isEmoji: true, label: "Apple" },
      { brand: "🐦", style: { fontSize: 56 }, isEmoji: true, label: "Twitter" },
      { brand: "🎯", style: { fontSize: 56 }, isEmoji: true, label: "Target" },
      {
        brand: "🌊",
        style: { fontSize: 56 },
        isEmoji: true,
        label: "Quiksilver",
      },
    ],
  },
  {
    id: "abstract",
    name: "Abstract Mark",
    tagline: "Form without literal meaning",
    accent: "#6ee7b7",
    bg: "#001a1a",
    desc: "A geometric form with no literal meaning. Allows the brand to define what the shape means — no preconceptions. Requires significant investment to build recognition.",
    when: "Global brand, no language barrier needed, conceptual brand values",
    examples: [
      {
        brand: "◉",
        style: { fontSize: 52, color: "#0db7ed" },
        isShape: true,
        label: "Docker-style",
      },
      {
        brand: "⬡",
        style: { fontSize: 52, color: "#ff4800" },
        isShape: true,
        label: "Hexagon mark",
      },
      {
        brand: "◈",
        style: { fontSize: 52, color: "#7c3aed" },
        isShape: true,
        label: "Grid mark",
      },
      {
        brand: "⟁",
        style: { fontSize: 52, color: "#059669" },
        isShape: true,
        label: "Delta mark",
      },
    ],
  },
  {
    id: "combination",
    name: "Combination Mark",
    tagline: "Best of both worlds",
    accent: "#a5f3fc",
    bg: "#001a2e",
    desc: "Symbol + wordmark together. The most flexible logo type — use both together or separate as the brand grows. Most new brands should start here.",
    when: "New brand, needs recognition building, wants flexibility",
    examples: [
      {
        brand: "◉  BRAND",
        style: {
          fontSize: 22,
          color: "#fff",
          fontFamily: "sans-serif",
          fontWeight: 600,
          letterSpacing: 4,
        },
      },
      {
        brand: "▲  STUDIO",
        style: {
          fontSize: 22,
          color: "#c4b5fd",
          fontFamily: "sans-serif",
          fontWeight: 300,
          letterSpacing: 6,
        },
      },
      {
        brand: "● Genesis",
        style: { fontSize: 24, color: "#f9a8d4", fontFamily: "Georgia,serif" },
      },
      {
        brand: "⬡  FORGE",
        style: {
          fontSize: 22,
          color: "#fdba74",
          fontFamily: "sans-serif",
          fontWeight: 800,
          letterSpacing: 5,
        },
      },
    ],
  },
];

export default function LogoTypesPage({ onBack }) {
  const [active, setActive] = useState(0);
  const current = LOGO_TYPES[active];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing: border-box; }
        .lt-page { min-height:100vh; background:#0a0a0a; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .lt-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(10,10,10,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .lt-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .lt-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .lt-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .lt-lesson-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); text-transform:uppercase; }

        /* HERO */
        .lt-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.06); position:relative; overflow:hidden; }
        .lt-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:14px; }
        .lt-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:20px; }
        .lt-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; }
        .lt-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); line-height:1; pointer-events:none; user-select:none; }

        /* TYPE SELECTOR */
        .lt-selector { display:grid; grid-template-columns:repeat(5,1fr); border-bottom:1px solid rgba(255,255,255,0.06); }
        .lt-sel-btn { padding:24px 20px; cursor:pointer; border:none; background:transparent; text-align:left; border-right:1px solid rgba(255,255,255,0.06); transition:all 0.2s; position:relative; overflow:hidden; }
        .lt-sel-btn:last-child { border-right:none; }
        .lt-sel-btn:hover { background:rgba(255,255,255,0.02); }
        .lt-sel-btn.sel-active { background:rgba(255,255,255,0.03); }
        .lt-sel-num { font-size:10px; letter-spacing:0.12em; color:rgba(255,255,255,0.18); margin-bottom:6px; font-family:'Bebas Neue',sans-serif; }
        .lt-sel-name { font-family:'Bebas Neue',sans-serif; font-size:18px; color:rgba(255,255,255,0.5); letter-spacing:0.04em; transition:color 0.2s; }
        .lt-sel-btn.sel-active .lt-sel-name { color:#fff; }
        .lt-sel-line { position:absolute; bottom:0; left:0; height:2px; width:0; transition:width 0.3s ease; }
        .lt-sel-btn.sel-active .lt-sel-line, .lt-sel-btn:hover .lt-sel-line { width:100%; }

        /* MAIN — 2 col */
        .lt-main { display:grid; grid-template-columns:1fr 1fr; min-height:500px; }
        .lt-info { padding:60px 56px; border-right:1px solid rgba(255,255,255,0.06); }
        .lt-type-tagline { font-family:'DM Serif Display',serif; font-style:italic; font-size:clamp(1.6rem,3vw,2.4rem); margin-bottom:20px; line-height:1.2; }
        .lt-type-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; margin-bottom:28px; }
        .lt-when-label { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:10px; }
        .lt-when { font-size:13px; color:rgba(255,255,255,0.45); line-height:1.7; padding:14px 16px; border-left:2px solid; border-radius:0 4px 4px 0; }

        /* EXAMPLES */
        .lt-examples { padding:60px 56px; display:flex; flex-direction:column; justify-content:center; }
        .lt-examples-label { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:28px; }
        .lt-examples-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }
        .lt-example-card { border-radius:12px; padding:32px 20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; min-height:110px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); transition:all 0.2s; cursor:default; }
        .lt-example-card:hover { background:rgba(255,255,255,0.05); border-color:rgba(255,255,255,0.14); transform:translateY(-2px); }
        .lt-example-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.2); }

        /* COMPARISON */
        .lt-comparison { border-top:1px solid rgba(255,255,255,0.06); padding:60px 56px; }
        .lt-comp-label { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:28px; }
        .lt-comp-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:1px; background:rgba(255,255,255,0.06); border-radius:12px; overflow:hidden; }
        .lt-comp-cell { background:#0a0a0a; padding:28px 16px; text-align:center; cursor:pointer; transition:background 0.2s; }
        .lt-comp-cell:hover { background:#111; }
        .lt-comp-cell.comp-active { background:#111; }
        .lt-comp-type { font-family:'Bebas Neue',sans-serif; font-size:13px; letter-spacing:0.06em; color:rgba(255,255,255,0.35); margin-bottom:14px; }
        .lt-comp-mark { font-family:'DM Serif Display',serif; font-size:24px; color:#fff; min-height:40px; display:flex; align-items:center; justify-content:center; }
        .lt-comp-cell.comp-active .lt-comp-type { color:#fff; }
      `}</style>

      <div className="lt-page">
        <nav className="lt-nav">
          <button className="lt-back" onClick={onBack}>
            ← Back
          </button>
          <span className="lt-nav-title">Logo Types</span>
          <span className="lt-lesson-tag">Lesson 02</span>
        </nav>

        <div className="lt-hero">
          <div className="lt-hero-eyebrow">Logo Design · Lesson 02</div>
          <div className="lt-hero-title">
            FIVE TYPES.
            <br />
            ONE CHOICE.
          </div>
          <p className="lt-hero-sub">
            Every logo in existence belongs to one of five categories. The type
            you choose changes how fast recognition builds — and how much it
            costs to get there.
          </p>
          <div className="lt-hero-num">02</div>
        </div>

        {/* TYPE SELECTOR */}
        <div className="lt-selector">
          {LOGO_TYPES.map((t, i) => (
            <button
              key={i}
              className={`lt-sel-btn${active === i ? " sel-active" : ""}`}
              onClick={() => setActive(i)}
            >
              <div className="lt-sel-num">0{i + 1}</div>
              <div className="lt-sel-name">{t.name}</div>
              <div className="lt-sel-line" style={{ background: t.accent }} />
            </button>
          ))}
        </div>

        {/* MAIN */}
        <div className="lt-main">
          <div className="lt-info">
            <div className="lt-type-tagline" style={{ color: current.accent }}>
              "{current.tagline}"
            </div>
            <p className="lt-type-desc">{current.desc}</p>
            <div className="lt-when-label">Use when</div>
            <div
              className="lt-when"
              style={{
                borderColor: `${current.accent}60`,
                background: `${current.accent}08`,
                color: current.accent,
              }}
            >
              {current.when}
            </div>
          </div>
          <div className="lt-examples">
            <div className="lt-examples-label">Real examples</div>
            <div className="lt-examples-grid">
              {current.examples.map((ex, i) => (
                <div
                  key={i}
                  className="lt-example-card"
                  style={{
                    background: `${current.bg}cc`,
                    borderColor: `${current.accent}20`,
                  }}
                >
                  {ex.isEmoji || ex.isShape ? (
                    <div style={ex.style}>{ex.brand}</div>
                  ) : (
                    <div style={ex.style}>{ex.brand}</div>
                  )}
                  {ex.label && (
                    <div className="lt-example-label">{ex.label}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPARISON ROW */}
        <div className="lt-comparison">
          <div className="lt-comp-label">Side by side — all 5 types</div>
          <div className="lt-comp-grid">
            {LOGO_TYPES.map((t, i) => (
              <div
                key={i}
                className={`lt-comp-cell${active === i ? " comp-active" : ""}`}
                onClick={() => setActive(i)}
              >
                <div className="lt-comp-type">{t.name}</div>
                <div className="lt-comp-mark" style={{ color: t.accent }}>
                  {i === 0 && "Aa"}
                  {i === 1 && "G."}
                  {i === 2 && "🍎"}
                  {i === 3 && "◈"}
                  {i === 4 && "◉ Co"}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
