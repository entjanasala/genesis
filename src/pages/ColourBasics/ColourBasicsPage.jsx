import { useState, useEffect } from "react";

export default function ColourBasicsPage({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&display=swap');
        .cb-page { min-height:100vh; background:#080010; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); overflow-x:hidden; }
        .cb-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 36px; position:sticky; top:0; background:rgba(8,0,16,0.88); backdrop-filter:blur(20px); border-bottom:0.5px solid rgba(255,255,255,0.07); z-index:100; }
        .cb-back { display:flex; align-items:center; gap:7px; background:rgba(255,255,255,0.05); border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .cb-back:hover { background:rgba(255,255,255,0.09); color:#fff; }
        .cb-nav-title { font-family:'DM Serif Display',serif; font-size:16px; color:rgba(255,255,255,0.7); }
        .cb-hero { max-width:860px; margin:0 auto; padding:60px 36px 48px; }
        .cb-eyebrow { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:10px; }
        .cb-hero-title { font-family:'DM Serif Display',serif; font-size:clamp(2.4rem,5vw,4rem); font-weight:400; color:#fff; letter-spacing:-0.02em; line-height:1.08; margin-bottom:18px; }
        .cb-hero-sub { font-size:14px; color:rgba(255,255,255,0.35); line-height:1.8; max-width:480px; }
        .cb-section { max-width:860px; margin:0 auto; padding:0 36px 80px; }

        /* spectrum bar */
        .cb-spectrum { height:10px; border-radius:999px; background:linear-gradient(to right,#ff0000,#ff7700,#ffff00,#00ff00,#0000ff,#8b00ff); margin:40px 0 10px; }
        .cb-spectrum-labels { display:flex; justify-content:space-between; font-size:10px; color:rgba(255,255,255,0.25); letter-spacing:0.06em; margin-bottom:48px; }

        /* fact cards */
        .cb-facts { display:grid; grid-template-columns:repeat(auto-fill,minmax(240px,1fr)); gap:14px; margin-bottom:52px; }
        .cb-fact { border-radius:18px; padding:24px; transition:transform 0.2s; cursor:default; }
        .cb-fact:hover { transform:translateY(-3px); }
        .cb-fact-icon { font-size:28px; margin-bottom:14px; }
        .cb-fact-title { font-family:'DM Serif Display',serif; font-size:17px; color:#fff; margin-bottom:8px; }
        .cb-fact-text { font-size:12px; line-height:1.75; opacity:0.6; }

        /* colour wheel interactive */
        .cb-wheel-section { margin-bottom:52px; }
        .cb-wheel-wrap { display:flex; gap:32px; align-items:center; flex-wrap:wrap; }
        .cb-wheel { display:grid; grid-template-columns:repeat(4,1fr); gap:8px; flex:0 0 240px; }
        .cb-swatch { height:56px; border-radius:12px; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.08); }
        .cb-swatch:hover { transform:scale(1.06); border-color:rgba(255,255,255,0.25); }
        .cb-swatch.selected { transform:scale(1.1); border-color:rgba(255,255,255,0.6) !important; box-shadow:0 0 0 2px rgba(255,255,255,0.2); }
        .cb-swatch-info { flex:1; min-width:200px; }
        .cb-swatch-name { font-family:'DM Serif Display',serif; font-size:28px; color:#fff; margin-bottom:6px; }
        .cb-swatch-hex { font-size:13px; color:rgba(255,255,255,0.3); letter-spacing:0.08em; margin-bottom:14px; }
        .cb-swatch-desc { font-size:13px; color:rgba(255,255,255,0.45); line-height:1.75; }

        /* primary secondary tertiary */
        .cb-types { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; margin-bottom:52px; }
        .cb-type-card { border-radius:16px; padding:20px; border:0.5px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.03); }
        .cb-type-label { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:14px; }
        .cb-type-dots { display:flex; gap:8px; margin-bottom:14px; }
        .cb-type-dot { width:32px; height:32px; border-radius:50%; border:1px solid rgba(255,255,255,0.12); }
        .cb-type-desc { font-size:12px; color:rgba(255,255,255,0.35); line-height:1.7; }

        .cb-divider { height:0.5px; background:linear-gradient(90deg,transparent,rgba(255,255,255,0.08),transparent); margin:40px 0; }
        .cb-subtitle { font-family:'DM Serif Display',serif; font-size:22px; color:rgba(255,255,255,0.88); margin-bottom:20px; letter-spacing:-0.01em; }
      `}</style>

      <div className="cb-page">
        <nav className="cb-nav">
          <button className="cb-back" onClick={onBack}>
            ← Back
          </button>
          <span className="cb-nav-title">Colour Basics</span>
          <span
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            LESSON 01
          </span>
        </nav>

        <div className="cb-hero">
          <div className="cb-eyebrow">Colour Theory · Lesson 01</div>
          <div className="cb-hero-title">
            Colour
            <br />
            Basics
          </div>
          <p className="cb-hero-sub">
            Everything you see is light. Colour is simply how your brain
            interprets different wavelengths of that light.
          </p>
        </div>

        <div className="cb-section">
          {/* Spectrum */}
          <div className="cb-subtitle">The Visible Spectrum</div>
          <div className="cb-spectrum" />
          <div className="cb-spectrum-labels">
            <span>700nm · Red</span>
            <span>620nm · Orange</span>
            <span>580nm · Yellow</span>
            <span>530nm · Green</span>
            <span>450nm · Blue</span>
            <span>400nm · Violet</span>
          </div>

          {/* Key facts */}
          <div className="cb-subtitle">Key Facts</div>
          <ColourFacts />

          <div className="cb-divider" />

          {/* Interactive swatches */}
          <div className="cb-subtitle">Click a Colour</div>
          <ColourSwatchPicker />

          <div className="cb-divider" />

          {/* Types */}
          <div className="cb-subtitle">Colour Types</div>
          <div className="cb-types">
            <div className="cb-type-card">
              <div className="cb-type-label">Primary</div>
              <div className="cb-type-dots">
                {["#FF3B3B", "#FFEE33", "#3B6FFF"].map((c) => (
                  <div
                    key={c}
                    className="cb-type-dot"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="cb-type-desc">
                Red, Yellow, Blue. Cannot be made by mixing other colours.
              </div>
            </div>
            <div className="cb-type-card">
              <div className="cb-type-label">Secondary</div>
              <div className="cb-type-dots">
                {["#FF8C00", "#6A0DAD", "#00A86B"].map((c) => (
                  <div
                    key={c}
                    className="cb-type-dot"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="cb-type-desc">
                Orange, Purple, Green. Made by mixing two primaries.
              </div>
            </div>
            <div className="cb-type-card">
              <div className="cb-type-label">Tertiary</div>
              <div className="cb-type-dots">
                {["#FF6B35", "#C71585", "#00CED1", "#9ACD32"].map((c) => (
                  <div
                    key={c}
                    className="cb-type-dot"
                    style={{ background: c }}
                  />
                ))}
              </div>
              <div className="cb-type-desc">
                Made by mixing a primary with an adjacent secondary colour.
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const FACTS = [
  {
    icon: "👁",
    color: "rgba(196,181,253,0.12)",
    border: "rgba(196,181,253,0.25)",
    title: "10 Million Colours",
    text: "The human eye can distinguish approximately 10 million different colours.",
  },
  {
    icon: "🌈",
    color: "rgba(253,186,116,0.1)",
    border: "rgba(253,186,116,0.22)",
    title: "Light = Colour",
    text: "White light contains all colours. A prism splits it into the full visible spectrum.",
  },
  {
    icon: "🎨",
    color: "rgba(249,168,212,0.1)",
    border: "rgba(249,168,212,0.22)",
    title: "3 Receptors",
    text: "Your eyes have 3 types of cone cells — sensitive to red, green, and blue light.",
  },
  {
    icon: "🌑",
    color: "rgba(110,231,183,0.08)",
    border: "rgba(110,231,183,0.2)",
    title: "Black & White",
    text: "Black absorbs all light. White reflects all light. Neither is technically a 'colour'.",
  },
  {
    icon: "🖨",
    color: "rgba(125,211,252,0.1)",
    border: "rgba(125,211,252,0.22)",
    title: "RGB vs CMYK",
    text: "Screens use RGB (light). Printers use CMYK (pigment). Same colour, different systems.",
  },
  {
    icon: "🎭",
    color: "rgba(244,114,182,0.1)",
    border: "rgba(244,114,182,0.22)",
    title: "Perception Varies",
    text: "Up to 8% of men are colour blind. Colour perception also shifts with age and culture.",
  },
];

function ColourFacts() {
  return (
    <div className="cb-facts">
      {FACTS.map((f, i) => (
        <div
          key={i}
          className="cb-fact"
          style={{ background: f.color, border: `1px solid ${f.border}` }}
        >
          <div className="cb-fact-icon">{f.icon}</div>
          <div className="cb-fact-title">{f.title}</div>
          <div className="cb-fact-text">{f.text}</div>
        </div>
      ))}
    </div>
  );
}

const SWATCHES = [
  {
    name: "Crimson",
    hex: "#DC143C",
    desc: "A bold red associated with passion, danger, and urgency. Used widely in warnings and call-to-action buttons.",
  },
  {
    name: "Tangerine",
    hex: "#F28500",
    desc: "Energetic orange that signals enthusiasm and creativity. Popular in food branding and sports.",
  },
  {
    name: "Saffron",
    hex: "#F4C430",
    desc: "Warm yellow evoking optimism and intellect. The most visible colour to the human eye in daylight.",
  },
  {
    name: "Jade",
    hex: "#00A86B",
    desc: "Balanced green suggesting nature, growth, and health. Used heavily in finance and wellness brands.",
  },
  {
    name: "Cobalt",
    hex: "#0047AB",
    desc: "Deep blue commanding trust, calm, and professionalism. The most universally liked colour worldwide.",
  },
  {
    name: "Amethyst",
    hex: "#9966CC",
    desc: "Regal purple blending red's energy with blue's calm. Historically associated with luxury and wisdom.",
  },
  {
    name: "Rose",
    hex: "#FF007F",
    desc: "Vibrant pink conveying femininity, romance, and modernity. Heavily used in fashion and beauty.",
  },
  {
    name: "Slate",
    hex: "#708090",
    desc: "Neutral grey suggesting balance and sophistication. The foundation of professional design systems.",
  },
  {
    name: "Ivory",
    hex: "#FFFFF0",
    desc: "Soft off-white warmer than pure white. Gives an elegant, timeless quality to layouts.",
  },
  {
    name: "Mahogany",
    hex: "#C04000",
    desc: "Rich brown rooted in reliability and earthiness. Common in luxury goods and artisan brands.",
  },
  {
    name: "Mint",
    hex: "#98FF98",
    desc: "Light green radiating freshness and cleanliness. Popular in health, spa, and fintech products.",
  },
  {
    name: "Navy",
    hex: "#001F5B",
    desc: "Dark authoritative blue used in government, banking, and classic fashion to signal dependability.",
  },
];

function ColourSwatchPicker() {
  const [selected, setSelected] = useState(SWATCHES[0]);
  return (
    <div className="cb-wheel-wrap" style={{ marginBottom: 52 }}>
      <div className="cb-wheel">
        {SWATCHES.map((s) => (
          <div
            key={s.hex}
            className={`cb-swatch${selected.hex === s.hex ? " selected" : ""}`}
            style={{ background: s.hex }}
            onClick={() => setSelected(s)}
          />
        ))}
      </div>
      <div className="cb-swatch-info">
        <div className="cb-swatch-name" style={{ color: selected.hex }}>
          {selected.name}
        </div>
        <div className="cb-swatch-hex">{selected.hex}</div>
        <div className="cb-swatch-desc">{selected.desc}</div>
      </div>
    </div>
  );
}
