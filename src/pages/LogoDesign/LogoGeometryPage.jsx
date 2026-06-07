import { useState, useEffect } from "react";

const SHAPES = [
  {
    id: "circle",
    symbol: "●",
    name: "Circle",
    accent: "#c4b5fd",
    bg: "#1a0a3e",
    emotion: "Unity · Infinity · Community · Warmth",
    why: "No beginning, no end. The eye travels around it forever — creating a sense of completeness and eternity. Circles feel approachable and safe.",
    brands: [
      {
        name: "Olympics",
        note: "Five rings = five continents, united",
        color: "#4285f4",
      },
      {
        name: "Target",
        note: "Bullseye — precision within unity",
        color: "#cc0000",
      },
      {
        name: "BMW",
        note: "Spinning propeller — motion in a circle",
        color: "#0066b1",
      },
      { name: "Firefox", note: "A fox circling a globe", color: "#ff6611" },
    ],
    dontUse:
      "Law firms, financial institutions, military — circles feel too soft and approachable for authority-based brands.",
  },
  {
    id: "triangle",
    symbol: "▲",
    name: "Triangle",
    accent: "#f9a8d4",
    bg: "#3a0a2e",
    emotion: "Power · Direction · Energy · Precision",
    why: "Triangles point. They force the eye in a direction, creating momentum and forward motion. Pointing up = aspiration. Pointing right = progress.",
    brands: [
      {
        name: "Adidas",
        note: "Three stripes forming a mountain — goals",
        color: "#000",
      },
      {
        name: "Delta Airlines",
        note: "Greek letter D — direction, movement",
        color: "#003366",
      },
      {
        name: "Mitsubishi",
        note: "Three diamonds — strength × 3",
        color: "#cc0000",
      },
      {
        name: "Google Play",
        note: "Play button triangle — forward",
        color: "#01875f",
      },
    ],
    dontUse:
      "Healthcare, wellness, counselling — triangles feel aggressive and confrontational in caring contexts.",
  },
  {
    id: "square",
    symbol: "■",
    name: "Square & Rectangle",
    accent: "#fdba74",
    bg: "#2a1a00",
    emotion: "Stability · Trust · Order · Professionalism",
    why: "Four equal sides in balance. Squares suggest reliability, safety, and structure. The mathematical precision communicates order and dependability.",
    brands: [
      {
        name: "Microsoft",
        note: "Four coloured squares — four products united",
        color: "#00a4ef",
      },
      {
        name: "American Express",
        note: "Blue square — financial solidity",
        color: "#016fcf",
      },
      {
        name: "IKEA",
        note: "Blue rectangle — practical, affordable, stable",
        color: "#0058a3",
      },
      {
        name: "Adobe",
        note: "Red square — creative authority",
        color: "#ff0000",
      },
    ],
    dontUse:
      "Children's brands, entertainment, creative agencies — squares feel too rigid and corporate for playful contexts.",
  },
  {
    id: "negative",
    symbol: "◑",
    name: "Negative Space",
    accent: "#6ee7b7",
    bg: "#001a1a",
    emotion: "Intelligence · Duality · Discovery · Cleverness",
    why: "Hidden shapes create a moment of discovery. Once seen, they can't be unseen — making the brand permanently memorable. It says: we designed this carefully.",
    brands: [
      { name: "FedEx", note: "Arrow hidden between E and x", color: "#ff6600" },
      {
        name: "NBC",
        note: "Peacock in negative between the coloured wings",
        color: "#e1261c",
      },
      {
        name: "Toblerone",
        note: "Bear hidden in the Matterhorn mountain",
        color: "#8b4513",
      },
      {
        name: "Amazon",
        note: "Arrow from A to Z — we sell everything",
        color: "#ff9900",
      },
    ],
    dontUse:
      "Works for any industry — but only if the hidden element reinforces the brand message. Never hide a shape just to be clever.",
  },
];

export default function LogoGeometryPage({ onBack }) {
  const [activeShape, setActiveShape] = useState(0);
  const [negSpaceRevealed, setNegSpaceRevealed] = useState(false);
  const shape = SHAPES[activeShape];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    setNegSpaceRevealed(false);
  }, [activeShape]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .lg-page { min-height:100vh; background:#0a0a0a; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .lg-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(10,10,10,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .lg-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .lg-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .lg-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .lg-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); text-transform:uppercase; }

        /* HERO */
        .lg-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.06); position:relative; overflow:hidden; }
        .lg-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:14px; }
        .lg-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:20px; }
        .lg-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; }
        .lg-hero-shapes { position:absolute; right:56px; top:50%; transform:translateY(-50%); display:flex; gap:20px; opacity:0.12; pointer-events:none; }
        .lg-hero-shape { font-size:80px; line-height:1; }

        /* SHAPE SELECTOR */
        .lg-sel { display:grid; grid-template-columns:repeat(4,1fr); border-bottom:1px solid rgba(255,255,255,0.06); }
        .lg-sel-btn { padding:28px 24px; cursor:pointer; border:none; border-right:1px solid rgba(255,255,255,0.06); background:transparent; text-align:left; transition:all 0.2s; position:relative; overflow:hidden; }
        .lg-sel-btn:last-child { border-right:none; }
        .lg-sel-btn:hover { background:rgba(255,255,255,0.02); }
        .lg-sel-btn.sel-active { background:rgba(255,255,255,0.03); }
        .lg-sel-icon { font-size:32px; margin-bottom:10px; display:block; transition:transform 0.3s; }
        .lg-sel-btn.sel-active .lg-sel-icon { transform:scale(1.2); }
        .lg-sel-name { font-family:'Bebas Neue',sans-serif; font-size:20px; color:rgba(255,255,255,0.5); letter-spacing:0.04em; transition:color 0.2s; }
        .lg-sel-btn.sel-active .lg-sel-name { color:#fff; }
        .lg-sel-line { position:absolute; bottom:0; left:0; height:2px; width:0; transition:width 0.3s; }
        .lg-sel-btn.sel-active .lg-sel-line { width:100%; }

        /* MAIN */
        .lg-main { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(255,255,255,0.06); }
        .lg-info { padding:60px 56px; border-right:1px solid rgba(255,255,255,0.06); }
        .lg-big-shape { font-size:100px; margin-bottom:20px; display:block; line-height:1; }
        .lg-emotion { font-size:12px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:20px; font-weight:500; }
        .lg-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; margin-bottom:28px; }
        .lg-dont { padding:14px 18px; border-radius:4px; border-left:3px solid rgba(251,113,133,0.5); background:rgba(251,113,133,0.06); }
        .lg-dont-label { font-size:10px; letter-spacing:0.16em; text-transform:uppercase; color:rgba(251,113,133,0.7); margin-bottom:6px; }
        .lg-dont-text { font-size:12px; color:rgba(255,255,255,0.32); line-height:1.65; }

        /* BRANDS */
        .lg-brands-col { padding:60px 56px; }
        .lg-brands-label { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:24px; }
        .lg-brand-list { display:flex; flex-direction:column; gap:0; }
        .lg-brand-item { display:flex; align-items:center; gap:16px; padding:18px 0; border-bottom:1px solid rgba(255,255,255,0.05); transition:padding-left 0.2s; cursor:default; }
        .lg-brand-item:last-child { border-bottom:none; }
        .lg-brand-item:hover { padding-left:6px; }
        .lg-brand-dot { width:10px; height:10px; border-radius:50%; flex-shrink:0; }
        .lg-brand-name { font-size:15px; font-weight:500; color:#fff; min-width:110px; }
        .lg-brand-note { font-size:12px; color:rgba(255,255,255,0.28); flex:1; line-height:1.5; font-style:italic; }

        /* NEGATIVE SPACE DEMO */
        .lg-negspace { border-top:1px solid rgba(255,255,255,0.06); display:grid; grid-template-columns:1fr 1fr; }
        .lg-neg-canvas { padding:60px 56px; border-right:1px solid rgba(255,255,255,0.06); display:flex; flex-direction:column; align-items:center; justify-content:center; }
        .lg-neg-demo { position:relative; width:260px; height:130px; cursor:pointer; }
        .lg-neg-before { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; transition:opacity 0.4s; }
        .lg-neg-after { position:absolute; inset:0; display:flex; align-items:center; justify-content:center; opacity:0; transition:opacity 0.4s; }
        .lg-neg-demo.revealed .lg-neg-before { opacity:0; }
        .lg-neg-demo.revealed .lg-neg-after { opacity:1; }
        .lg-neg-label { font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-top:20px; }
        .lg-neg-info { padding:60px 56px; display:flex; flex-direction:column; justify-content:center; gap:14px; }
        .lg-neg-title { font-family:'DM Serif Display',serif; font-size:28px; color:#fff; margin-bottom:8px; }
        .lg-neg-desc { font-size:13px; color:rgba(255,255,255,0.35); line-height:1.75; }

        /* ALL SHAPES GRID */
        .lg-all { border-top:1px solid rgba(255,255,255,0.06); padding:60px 56px; }
        .lg-all-label { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:28px; }
        .lg-all-grid { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(255,255,255,0.06); border-radius:12px; overflow:hidden; }
        .lg-all-cell { background:#0a0a0a; padding:36px 24px; text-align:center; transition:background 0.2s; cursor:pointer; }
        .lg-all-cell:hover { background:#111; }
        .lg-all-shape { font-size:44px; margin-bottom:10px; display:block; }
        .lg-all-name { font-family:'Bebas Neue',sans-serif; font-size:14px; letter-spacing:0.06em; color:rgba(255,255,255,0.4); }
        .lg-all-mood { font-size:11px; color:rgba(255,255,255,0.2); margin-top:4px; line-height:1.4; }
      `}</style>

      <div className="lg-page">
        <nav className="lg-nav">
          <button className="lg-back" onClick={onBack}>
            ← Back
          </button>
          <span className="lg-nav-title">Geometry & Shape Language</span>
          <span className="lg-tag">Lesson 03</span>
        </nav>

        <div className="lg-hero">
          <div className="lg-hero-eyebrow">Logo Design · Lesson 03</div>
          <div className="lg-hero-title">
            SHAPES SPEAK
            <br />
            BEFORE WORDS DO.
          </div>
          <p className="lg-hero-sub">
            Your logo communicates its personality before a single letter is
            read. Choose shapes that match your brand's emotional territory.
          </p>
          <div className="lg-hero-shapes">
            <span className="lg-hero-shape" style={{ color: "#c4b5fd" }}>
              ●
            </span>
            <span className="lg-hero-shape" style={{ color: "#f9a8d4" }}>
              ▲
            </span>
            <span className="lg-hero-shape" style={{ color: "#fdba74" }}>
              ■
            </span>
          </div>
        </div>

        {/* SELECTOR */}
        <div className="lg-sel">
          {SHAPES.map((s, i) => (
            <button
              key={i}
              className={`lg-sel-btn${activeShape === i ? " sel-active" : ""}`}
              onClick={() => setActiveShape(i)}
            >
              <span className="lg-sel-icon" style={{ color: s.accent }}>
                {s.symbol}
              </span>
              <div className="lg-sel-name">{s.name}</div>
              <div className="lg-sel-line" style={{ background: s.accent }} />
            </button>
          ))}
        </div>

        {/* MAIN */}
        <div className="lg-main">
          <div className="lg-info">
            <span className="lg-big-shape" style={{ color: shape.accent }}>
              {shape.symbol}
            </span>
            <div className="lg-emotion" style={{ color: shape.accent }}>
              {shape.emotion}
            </div>
            <p className="lg-desc">{shape.why}</p>
            <div className="lg-dont">
              <div className="lg-dont-label">⚠ Don't use for</div>
              <div className="lg-dont-text">{shape.dontUse}</div>
            </div>
          </div>
          <div className="lg-brands-col">
            <div className="lg-brands-label">Brands that use it</div>
            <div className="lg-brand-list">
              {shape.brands.map((b, i) => (
                <div key={i} className="lg-brand-item">
                  <div
                    className="lg-brand-dot"
                    style={{ background: b.color }}
                  />
                  <div className="lg-brand-name">{b.name}</div>
                  <div className="lg-brand-note">{b.note}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* NEGATIVE SPACE DEMO */}
        <div className="lg-negspace">
          <div className="lg-neg-canvas">
            <div
              className={`lg-neg-demo${negSpaceRevealed ? " revealed" : ""}`}
              onClick={() => setNegSpaceRevealed(!negSpaceRevealed)}
            >
              <div className="lg-neg-before">
                <svg width="260" height="130" viewBox="0 0 260 130">
                  <rect
                    x="0"
                    y="35"
                    width="180"
                    height="60"
                    fill="#c4b5fd"
                    rx="4"
                  />
                  <polygon points="165,5 260,65 165,125" fill="#c4b5fd" />
                </svg>
              </div>
              <div className="lg-neg-after">
                <svg width="260" height="130" viewBox="0 0 260 130">
                  <rect
                    x="0"
                    y="35"
                    width="180"
                    height="60"
                    fill="#c4b5fd"
                    rx="4"
                  />
                  <polygon points="165,5 260,65 165,125" fill="#c4b5fd" />
                  <polygon points="148,46 210,65 148,84" fill="#0a0a0a" />
                  <text
                    x="90"
                    y="70"
                    fill="#0a0a0a"
                    fontSize="11"
                    textAnchor="middle"
                    fontFamily="sans-serif"
                    fontWeight="600"
                    letterSpacing="2"
                  >
                    HIDDEN ARROW
                  </text>
                </svg>
              </div>
            </div>
            <div className="lg-neg-label">
              {negSpaceRevealed
                ? "Arrow revealed — click to hide"
                : "Click to reveal hidden shape"}
            </div>
          </div>
          <div className="lg-neg-info">
            <div className="lg-neg-title">The FedEx principle</div>
            <p className="lg-neg-desc">
              The most famous example of negative space. The arrow between the E
              and x in FedEx is invisible until you see it — then impossible to
              unsee.
            </p>
            <p
              className="lg-neg-desc"
              style={{ color: "rgba(255,255,255,0.22)", fontSize: 12 }}
            >
              Negative space logos create a moment of discovery that makes the
              brand permanently memorable. The viewer's brain rewards itself for
              finding it — associating that positive feeling with the brand.
            </p>
          </div>
        </div>

        {/* ALL SHAPES */}
        <div className="lg-all">
          <div className="lg-all-label">Shape vocabulary at a glance</div>
          <div className="lg-all-grid">
            {[
              {
                s: "●",
                name: "Circle",
                mood: "Warmth, Unity",
                color: "#c4b5fd",
              },
              {
                s: "▲",
                name: "Triangle",
                mood: "Power, Direction",
                color: "#f9a8d4",
              },
              {
                s: "■",
                name: "Square",
                mood: "Stability, Trust",
                color: "#fdba74",
              },
              {
                s: "⬡",
                name: "Hexagon",
                mood: "Precision, Nature",
                color: "#6ee7b7",
              },
              {
                s: "◑",
                name: "Neg. Space",
                mood: "Intelligence, Wit",
                color: "#a5f3fc",
              },
              {
                s: "⬬",
                name: "Oval",
                mood: "Elegance, Softness",
                color: "#fda4af",
              },
              {
                s: "✦",
                name: "Star/Cross",
                mood: "Excellence, Care",
                color: "#fde68a",
              },
              {
                s: "∞",
                name: "Organic",
                mood: "Natural, Fluid",
                color: "#86efac",
              },
            ].map((item, i) => (
              <div key={i} className="lg-all-cell">
                <span className="lg-all-shape" style={{ color: item.color }}>
                  {item.s}
                </span>
                <div className="lg-all-name">{item.name}</div>
                <div className="lg-all-mood">{item.mood}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
