import { useState, useEffect } from "react";

const COLOURS = [
  {
    name: "Red",
    hex: "#e63946",
    emotion: "Urgency · Passion · Energy",
    brands: "Coca-Cola · Netflix · YouTube · Target",
    use: "CTAs, food brands, entertainment, danger signals",
    avoid: "Finance, healthcare, luxury — too aggressive",
    accent: "#fda4af",
  },
  {
    name: "Blue",
    hex: "#4361ee",
    emotion: "Trust · Calm · Intelligence",
    brands: "Facebook · Samsung · Ford · PayPal",
    use: "Finance, tech, healthcare, government",
    avoid: "Food brands — blue suppresses appetite",
    accent: "#93c5fd",
  },
  {
    name: "Black",
    hex: "#212121",
    emotion: "Luxury · Power · Authority",
    brands: "Chanel · Nike · Apple · Rolex",
    use: "Luxury, fashion, premium tech, architecture",
    avoid: "Children's brands, healthcare, food",
    accent: "#d4d4d4",
  },
  {
    name: "Yellow",
    hex: "#ffd60a",
    emotion: "Optimism · Energy · Attention",
    brands: "McDonald's · IKEA · Snapchat · DHL",
    use: "Food, retail, logistics, youth brands",
    avoid: "Premium/luxury — feels cheap at high price points",
    accent: "#fde68a",
  },
  {
    name: "Green",
    hex: "#2dc653",
    emotion: "Growth · Health · Nature",
    brands: "Starbucks · Whole Foods · Spotify · John Deere",
    use: "Health, food, finance, environment",
    avoid: "Technology — unless eco-tech or health-tech",
    accent: "#86efac",
  },
  {
    name: "Purple",
    hex: "#7c3aed",
    emotion: "Luxury · Wisdom · Magic",
    brands: "Cadbury · Hallmark · FedEx · Twitch",
    use: "Luxury goods, beauty, gaming, creativity",
    avoid: "Low-cost retail — purple signals premium price",
    accent: "#c4b5fd",
  },
];

export default function LogoColourPage({ onBack }) {
  const [activeColour, setActiveColour] = useState(0);
  const [isBlackWhite, setIsBlackWhite] = useState(false);
  const colour = COLOURS[activeColour];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const logos = [
    { label: "G.", font: "'DM Serif Display',serif", size: 36 },
    { label: "BRAND", font: "'Bebas Neue',sans-serif", size: 28 },
    { label: "◉", font: "sans-serif", size: 40 },
    { label: "▲", font: "sans-serif", size: 36 },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .lc-page { min-height:100vh; background:#0a0a0a; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .lc-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(10,10,10,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .lc-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .lc-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .lc-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .lc-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); text-transform:uppercase; }

        .lc-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.06); position:relative; overflow:hidden; }
        .lc-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:14px; }
        .lc-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:20px; }
        .lc-hero-rule { display:inline-block; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.1); border-radius:4px; padding:12px 20px; font-size:13px; color:rgba(255,255,255,0.6); font-style:italic; }
        .lc-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); line-height:1; pointer-events:none; user-select:none; }

        /* B&W RULE SECTION */
        .lc-bw-section { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(255,255,255,0.06); }
        .lc-bw-left { padding:60px 56px; border-right:1px solid rgba(255,255,255,0.06); }
        .lc-bw-label { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:20px; }
        .lc-bw-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.4rem); color:#fff; margin-bottom:16px; line-height:1.2; }
        .lc-bw-desc { font-size:14px; color:rgba(255,255,255,0.35); line-height:1.85; }
        .lc-bw-right { padding:60px 56px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:24px; }
        .lc-toggle-row { display:flex; align-items:center; gap:12px; cursor:pointer; }
        .lc-toggle-track { width:44px; height:24px; border-radius:12px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.04); position:relative; transition:all 0.2s; }
        .lc-toggle-track.on { background:rgba(255,255,255,0.1); border-color:rgba(255,255,255,0.3); }
        .lc-toggle-thumb { width:18px; height:18px; border-radius:50%; background:rgba(255,255,255,0.3); position:absolute; top:2px; left:2px; transition:all 0.2s; }
        .lc-toggle-track.on .lc-toggle-thumb { left:22px; background:#fff; }
        .lc-toggle-label { font-size:12px; color:rgba(255,255,255,0.4); letter-spacing:0.06em; }
        .lc-logo-previews { display:grid; grid-template-columns:repeat(2,1fr); gap:10px; width:100%; }
        .lc-logo-preview { border-radius:8px; padding:24px; display:flex; align-items:center; justify-content:center; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); height:80px; }

        /* COLOUR SELECTOR */
        .lc-selector { display:grid; grid-template-columns:repeat(6,1fr); border-bottom:1px solid rgba(255,255,255,0.06); }
        .lc-sel-btn { padding:20px 12px; cursor:pointer; border:none; border-right:1px solid rgba(255,255,255,0.06); background:transparent; text-align:center; transition:all 0.2s; position:relative; overflow:hidden; }
        .lc-sel-btn:last-child { border-right:none; }
        .lc-sel-btn:hover { background:rgba(255,255,255,0.02); }
        .lc-sel-btn.sel-active { background:rgba(255,255,255,0.03); }
        .lc-sel-swatch { width:32px; height:32px; border-radius:50%; margin:0 auto 8px; border:2px solid transparent; transition:all 0.2s; }
        .lc-sel-btn.sel-active .lc-sel-swatch { border-color:rgba(255,255,255,0.5); transform:scale(1.15); }
        .lc-sel-name { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.35); transition:color 0.2s; }
        .lc-sel-btn.sel-active .lc-sel-name { color:#fff; }
        .lc-sel-line { position:absolute; bottom:0; left:0; height:2px; width:0; transition:width 0.3s; }
        .lc-sel-btn.sel-active .lc-sel-line { width:100%; }

        /* COLOUR DETAIL */
        .lc-detail { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(255,255,255,0.06); }
        .lc-detail-left { padding:60px 56px; border-right:1px solid rgba(255,255,255,0.06); }
        .lc-colour-big { width:80px; height:80px; border-radius:12px; margin-bottom:24px; }
        .lc-emotion { font-size:13px; letter-spacing:0.12em; font-weight:500; margin-bottom:16px; }
        .lc-brands-tag { font-size:13px; color:rgba(255,255,255,0.35); margin-bottom:20px; line-height:1.6; }
        .lc-use-row { margin-bottom:10px; }
        .lc-use-label { font-size:10px; letter-spacing:0.14em; text-transform:uppercase; margin-bottom:6px; }
        .lc-use-text { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.65; }
        .lc-detail-right { padding:60px 56px; display:flex; flex-direction:column; justify-content:center; gap:20px; }
        .lc-context-title { font-size:11px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; }
        .lc-context-grid { display:grid; grid-template-columns:1fr 1fr; gap:10px; }
        .lc-context-cell { border-radius:10px; padding:24px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; }
        .lc-context-mark { font-family:'Bebas Neue',sans-serif; font-size:28px; }
        .lc-context-bg-label { font-size:9px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.2); }

        /* PALETTE ROW */
        .lc-palette { border-top:1px solid rgba(255,255,255,0.06); padding:60px 56px; }
        .lc-palette-label { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:28px; }
        .lc-palette-row { display:flex; gap:8px; margin-bottom:16px; }
        .lc-palette-swatch { height:64px; border-radius:6px; display:flex; align-items:flex-end; padding:6px 8px; flex:1; }
        .lc-palette-hex { font-size:9px; letter-spacing:0.06em; color:rgba(0,0,0,0.5); font-family:'Courier New',monospace; }
        .lc-palette-name-row { display:flex; gap:8px; }
        .lc-palette-name { flex:1; font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.25); text-align:center; }
      `}</style>

      <div className="lc-page">
        <nav className="lc-nav">
          <button className="lc-back" onClick={onBack}>
            ← Back
          </button>
          <span className="lc-nav-title">Colour in Logo Design</span>
          <span className="lc-tag">Lesson 04</span>
        </nav>

        <div className="lc-hero">
          <div className="lc-hero-eyebrow">Logo Design · Lesson 04</div>
          <div className="lc-hero-title">
            COLOUR IS
            <br />
            THE LAST DECISION.
          </div>
          <div className="lc-hero-rule">
            "If your logo only works in colour, it doesn't work."
          </div>
          <div className="lc-hero-num">04</div>
        </div>

        {/* B&W RULE */}
        <div className="lc-bw-section">
          <div className="lc-bw-left">
            <div className="lc-bw-label">The black & white rule</div>
            <div className="lc-bw-title">
              Design in black.
              <br />
              Colour is a layer.
            </div>
            <p className="lc-bw-desc">
              Your logo will be embroidered, engraved, faxed, photocopied,
              printed on a receipt. Colour disappears in all of these contexts.
              If the mark doesn't work without colour, you don't have a mark —
              you have a coloured shape.
              <br />
              <br />
              Build the form first. Add colour last.
            </p>
          </div>
          <div className="lc-bw-right">
            <div
              className="lc-toggle-row"
              onClick={() => setIsBlackWhite(!isBlackWhite)}
            >
              <div className={`lc-toggle-track${isBlackWhite ? " on" : ""}`}>
                <div className="lc-toggle-thumb" />
              </div>
              <span className="lc-toggle-label">
                {isBlackWhite ? "Greyscale mode" : "Full colour"}
              </span>
            </div>
            <div className="lc-logo-previews">
              {logos.map((l, i) => (
                <div key={i} className="lc-logo-preview">
                  <div
                    style={{
                      fontFamily: l.font,
                      fontSize: l.size,
                      color: isBlackWhite
                        ? "#fff"
                        : COLOURS[i % COLOURS.length].hex,
                      filter: isBlackWhite ? "grayscale(1)" : "none",
                      transition: "all 0.4s",
                    }}
                  >
                    {l.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COLOUR SELECTOR */}
        <div className="lc-selector">
          {COLOURS.map((c, i) => (
            <button
              key={i}
              className={`lc-sel-btn${activeColour === i ? " sel-active" : ""}`}
              onClick={() => setActiveColour(i)}
            >
              <div className="lc-sel-swatch" style={{ background: c.hex }} />
              <div className="lc-sel-name">{c.name}</div>
              <div className="lc-sel-line" style={{ background: c.hex }} />
            </button>
          ))}
        </div>

        {/* COLOUR DETAIL */}
        <div className="lc-detail">
          <div className="lc-detail-left">
            <div className="lc-colour-big" style={{ background: colour.hex }} />
            <div className="lc-emotion" style={{ color: colour.accent }}>
              {colour.emotion}
            </div>
            <div className="lc-brands-tag">
              <strong style={{ color: "rgba(255,255,255,0.6)" }}>
                Used by:
              </strong>{" "}
              {colour.brands}
            </div>
            <div className="lc-use-row">
              <div className="lc-use-label" style={{ color: "#86efac" }}>
                ✓ Use for
              </div>
              <div className="lc-use-text">{colour.use}</div>
            </div>
            <div className="lc-use-row">
              <div className="lc-use-label" style={{ color: "#fda4af" }}>
                ✗ Avoid for
              </div>
              <div className="lc-use-text">{colour.avoid}</div>
            </div>
          </div>
          <div className="lc-detail-right">
            <div className="lc-context-title">
              How it looks on different backgrounds
            </div>
            <div className="lc-context-grid">
              {[
                { bg: "#fff", textColor: colour.hex, bgLabel: "White bg" },
                { bg: "#0a0a0a", textColor: colour.hex, bgLabel: "Dark bg" },
                { bg: colour.hex, textColor: "#fff", bgLabel: "Colour bg" },
                { bg: "#f5f0e8", textColor: colour.hex, bgLabel: "Warm bg" },
              ].map((ctx, i) => (
                <div
                  key={i}
                  className="lc-context-cell"
                  style={{
                    background: ctx.bg,
                    border: `1px solid rgba(255,255,255,0.07)`,
                  }}
                >
                  <div
                    className="lc-context-mark"
                    style={{ color: ctx.textColor }}
                  >
                    G.
                  </div>
                  <div
                    className="lc-context-bg-label"
                    style={{
                      color:
                        ctx.bg === "#0a0a0a"
                          ? "rgba(255,255,255,0.2)"
                          : "rgba(0,0,0,0.3)",
                    }}
                  >
                    {ctx.bgLabel}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PALETTE */}
        <div className="lc-palette">
          <div className="lc-palette-label">
            Logo colour palettes — always fewer than 3
          </div>
          {[
            {
              name: "Monochrome",
              swatches: [
                { c: "#ffffff", h: "#fff" },
                { c: "#a0a0a0", h: "#a0a0a0" },
                { c: "#404040", h: "#404040" },
                { c: "#0a0a0a", h: "#0a0a0a" },
              ],
            },
            {
              name: "Brand + Neutral",
              swatches: [
                { c: "#7c3aed", h: "#7c3aed" },
                { c: "#0a0a0a", h: "#0a0a0a" },
                { c: "#f5f5f5", h: "#f5f5f5" },
                { c: "#e4e4e4", h: "#e4e4e4" },
              ],
            },
            {
              name: "Two-tone accent",
              swatches: [
                { c: "#e63946", h: "#e63946" },
                { c: "#ffd60a", h: "#ffd60a" },
                { c: "#0a0a0a", h: "#0a0a0a" },
                { c: "#ffffff", h: "#fff" },
              ],
            },
          ].map((p, i) => (
            <div key={i} style={{ marginBottom: 28 }}>
              <div
                style={{
                  fontSize: 11,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.22)",
                  marginBottom: 10,
                }}
              >
                {p.name}
              </div>
              <div className="lc-palette-row">
                {p.swatches.map((s, j) => (
                  <div
                    key={j}
                    className="lc-palette-swatch"
                    style={{ background: s.c }}
                  >
                    <span
                      className="lc-palette-hex"
                      style={{
                        color:
                          j < 2 ? "rgba(255,255,255,0.5)" : "rgba(0,0,0,0.4)",
                      }}
                    >
                      {s.h}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
