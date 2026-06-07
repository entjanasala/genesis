import { useState, useEffect } from "react";

const PALETTES = [
  {
    name: "Neon Night",
    colors: ["#0d0d12", "#1a0a2e", "#f472b6", "#c4b5fd"],
    accent: "#f472b6",
    mood: "Edgy · Electric · Youth",
  },
  {
    name: "Earth Poster",
    colors: ["#1a1208", "#2d2010", "#fb923c", "#fde68a"],
    accent: "#fb923c",
    mood: "Warm · Organic · Grounded",
  },
  {
    name: "Cold Front",
    colors: ["#0a1220", "#0f2040", "#38bdf8", "#e0f2fe"],
    accent: "#38bdf8",
    mood: "Cool · Clean · Corporate",
  },
  {
    name: "Botanica",
    colors: ["#0a1a0a", "#0f2d1a", "#34d399", "#d1fae5"],
    accent: "#34d399",
    mood: "Fresh · Natural · Alive",
  },
  {
    name: "Cinnabar",
    colors: ["#1a0a08", "#2d1008", "#ef4444", "#fca5a5"],
    accent: "#ef4444",
    mood: "Bold · Urgent · Powerful",
  },
  {
    name: "Amethyst",
    colors: ["#0f0a1a", "#1a1030", "#a855f7", "#e9d5ff"],
    accent: "#a855f7",
    mood: "Mystical · Creative · Elegant",
  },
];

const LAYERS = [
  {
    id: "bg",
    label: "Background",
    icon: "▬",
    desc: "The foundation. Sets the mood before anything else is read.",
    defaultOn: true,
  },
  {
    id: "texture",
    label: "Noise/Grain",
    icon: "◌",
    desc: "Adds depth and organic feel. Raw posters use heavy grain.",
    defaultOn: true,
  },
  {
    id: "gradient",
    label: "Colour Overlay",
    icon: "◑",
    desc: "Unifies the composition. Everything feels like it belongs together.",
    defaultOn: true,
  },
  {
    id: "lines",
    label: "Geometric Lines",
    icon: "╱",
    desc: "Structure and energy. Diagonal lines create movement.",
    defaultOn: false,
  },
  {
    id: "glow",
    label: "Glow/Light",
    icon: "✦",
    desc: "Focal point lighting. Draws the eye to the hero element.",
    defaultOn: true,
  },
  {
    id: "type",
    label: "Typography",
    icon: "T",
    desc: "The final layer. Always sits on top of everything.",
    defaultOn: true,
  },
];

export default function PosterColourPage({ onBack }) {
  const [activePalette, setActivePalette] = useState(0);
  const [enabledLayers, setEnabledLayers] = useState(
    LAYERS.reduce((acc, l) => ({ ...acc, [l.id]: l.defaultOn }), {}),
  );
  const [activeLayer, setActiveLayer] = useState(null);
  const [contrast, setContrast] = useState(75);
  const palette = PALETTES[activePalette];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const toggleLayer = (id) => {
    setEnabledLayers((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .pc2-page { min-height:100vh; background:#0a0a0a; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .pc2-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(10,10,10,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .pc2-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .pc2-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .pc2-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .pc2-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); text-transform:uppercase; }

        .pc2-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.08); position:relative; overflow:hidden; }
        .pc2-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 30% 50%, rgba(52,211,153,0.06) 0%, transparent 55%); }
        .pc2-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:14px; position:relative; z-index:1; }
        .pc2-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .pc2-hero-title em { color:#34d399; font-style:normal; }
        .pc2-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .pc2-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); line-height:1; pointer-events:none; user-select:none; }

        .pc2-section { padding:72px 56px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .pc2-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .pc2-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; letter-spacing:0.02em; }
        .pc2-section-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .pc2-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* LAYER BUILDER */
        .pc2-builder { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .pc2-layers-list { display:flex; flex-direction:column; gap:0; }
        .pc2-layer-row { display:flex; align-items:center; gap:16px; padding:18px 0; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; transition:all 0.2s; }
        .pc2-layer-row:last-child { border-bottom:none; }
        .pc2-layer-row:hover { padding-left:6px; }
        .pc2-layer-row.active-l { padding-left:6px; }
        .pc2-layer-icon { width:32px; height:32px; border-radius:6px; display:flex; align-items:center; justify-content:center; font-size:14px; flex-shrink:0; transition:all 0.2s; border:1px solid; }
        .pc2-layer-name { flex:1; font-size:14px; color:rgba(255,255,255,0.7); transition:color 0.2s; }
        .pc2-layer-row.active-l .pc2-layer-name, .pc2-layer-row:hover .pc2-layer-name { color:#fff; }
        .pc2-layer-toggle { width:32px; height:18px; border-radius:9px; border:1px solid rgba(255,255,255,0.12); background:rgba(255,255,255,0.04); position:relative; transition:all 0.2s; flex-shrink:0; }
        .pc2-layer-toggle.layer-on { background:rgba(52,211,153,0.2); border-color:rgba(52,211,153,0.4); }
        .pc2-layer-thumb { width:12px; height:12px; border-radius:50%; background:rgba(255,255,255,0.3); position:absolute; top:2px; left:2px; transition:all 0.2s; }
        .pc2-layer-toggle.layer-on .pc2-layer-thumb { left:16px; background:#34d399; }

        /* LIVE POSTER */
        .pc2-poster-preview { position:relative; aspect-ratio:2/3; border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); }
        .pc2-poster-layer { position:absolute; inset:0; transition:opacity 0.3s; }

        /* LAYER INFO */
        .pc2-layer-info { margin-top:16px; padding:14px 18px; border-radius:8px; border:1px solid rgba(52,211,153,0.2); background:rgba(52,211,153,0.06); font-size:13px; color:rgba(255,255,255,0.45); line-height:1.7; min-height:56px; transition:all 0.3s; }

        /* PALETTE SECTION */
        .pc2-palette-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:28px; }
        .pc2-palette-card { border-radius:12px; padding:20px; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.07); }
        .pc2-palette-card:hover { transform:translateY(-2px); }
        .pc2-palette-card.active-p { border-color:rgba(255,255,255,0.25); }
        .pc2-palette-swatches { display:flex; gap:4px; margin-bottom:12px; }
        .pc2-palette-swatch { height:28px; border-radius:4px; flex:1; }
        .pc2-palette-name { font-size:13px; font-weight:500; color:#fff; margin-bottom:3px; }
        .pc2-palette-mood { font-size:11px; color:rgba(255,255,255,0.3); }

        /* CONTRAST SECTION */
        .pc2-contrast { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .pc2-contrast-left { display:flex; flex-direction:column; gap:16px; }
        .pc2-contrast-slider-wrap { display:flex; align-items:center; gap:14px; }
        .pc2-contrast-slider { flex:1; accent-color:#34d399; }
        .pc2-contrast-val { font-size:20px; font-family:'Bebas Neue',sans-serif; color:#34d399; width:48px; }
        .pc2-contrast-desc { font-size:13px; color:rgba(255,255,255,0.35); line-height:1.7; }
        .pc2-contrast-preview { border-radius:12px; overflow:hidden; border:1px solid rgba(255,255,255,0.07); }
        .pc2-contrast-cell { padding:28px; display:flex; flex-direction:column; gap:6px; }
        .pc2-contrast-headline { font-family:'Bebas Neue',sans-serif; font-size:32px; lineHeight:0.9; letter-spacing:"0.02em" }
        .pc2-contrast-sub { font-size:12px; letter-spacing:"0.06em" }
      `}</style>

      <div className="pc2-page">
        <nav className="pc2-nav">
          <button className="pc2-back" onClick={onBack}>
            ← Back
          </button>
          <span className="pc2-nav-title">Colour, Texture & Layers</span>
          <span className="pc2-tag">Lesson 02</span>
        </nav>

        <div className="pc2-hero">
          <div className="pc2-hero-bg" />
          <div className="pc2-hero-eyebrow">Poster Creation · Lesson 02</div>
          <div className="pc2-hero-title">
            COLOUR,
            <br />
            TEXTURE &<br />
            <em>LAYERS</em>
          </div>
          <p className="pc2-hero-sub">
            A great poster isn't one image — it's five layers working in
            harmony. Turn layers on and off to see how each one contributes.
          </p>
          <div className="pc2-hero-num">02</div>
        </div>

        {/* LAYER BUILDER */}
        <div className="pc2-section">
          <div className="pc2-section-header">
            <div className="pc2-section-title">The Layer Stack</div>
            <div className="pc2-section-line" />
          </div>
          <p className="pc2-section-sub">
            Toggle each layer on and off. Watch how the poster changes. Every
            layer is a decision.
          </p>
          <div className="pc2-builder">
            <div>
              <div className="pc2-layers-list">
                {LAYERS.map((layer, i) => (
                  <div
                    key={layer.id}
                    className={`pc2-layer-row${activeLayer === i ? " active-l" : ""}`}
                    onClick={() => setActiveLayer(activeLayer === i ? null : i)}
                  >
                    <div
                      className="pc2-layer-icon"
                      style={{
                        color: enabledLayers[layer.id]
                          ? "#34d399"
                          : "rgba(255,255,255,0.2)",
                        borderColor: enabledLayers[layer.id]
                          ? "rgba(52,211,153,0.3)"
                          : "rgba(255,255,255,0.08)",
                        background: enabledLayers[layer.id]
                          ? "rgba(52,211,153,0.08)"
                          : "rgba(255,255,255,0.02)",
                      }}
                    >
                      {layer.icon}
                    </div>
                    <div className="pc2-layer-name">{layer.label}</div>
                    <div
                      className={`pc2-layer-toggle${enabledLayers[layer.id] ? " layer-on" : ""}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLayer(layer.id);
                      }}
                    >
                      <div className="pc2-layer-thumb" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="pc2-layer-info">
                {activeLayer !== null
                  ? LAYERS[activeLayer].desc
                  : "Click a layer to learn what it does."}
              </div>
            </div>

            {/* LIVE POSTER */}
            <div className="pc2-poster-preview">
              {/* bg */}
              <div
                className="pc2-poster-layer"
                style={{
                  background: palette.colors[1],
                  opacity: enabledLayers.bg ? 1 : 0,
                }}
              />
              {/* texture */}
              <div
                className="pc2-poster-layer"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.12'/%3E%3C/svg%3E")`,
                  opacity: enabledLayers.texture ? 0.7 : 0,
                }}
              />
              {/* gradient overlay */}
              <div
                className="pc2-poster-layer"
                style={{
                  background: `linear-gradient(160deg, ${palette.colors[2]}30 0%, transparent 60%, ${palette.colors[0]}80 100%)`,
                  opacity: enabledLayers.gradient ? 1 : 0,
                }}
              />
              {/* geometric lines */}
              {enabledLayers.lines && (
                <div className="pc2-poster-layer" style={{ opacity: 1 }}>
                  <svg
                    width="100%"
                    height="100%"
                    style={{ position: "absolute", inset: 0 }}
                  >
                    <line
                      x1="0"
                      y1="30%"
                      x2="100%"
                      y2="70%"
                      stroke={`${palette.accent}25`}
                      strokeWidth="0.5"
                    />
                    <line
                      x1="0"
                      y1="60%"
                      x2="100%"
                      y2="20%"
                      stroke={`${palette.accent}15`}
                      strokeWidth="0.5"
                    />
                    <line
                      x1="20%"
                      y1="0"
                      x2="80%"
                      y2="100%"
                      stroke={`${palette.accent}10`}
                      strokeWidth="0.5"
                    />
                  </svg>
                </div>
              )}
              {/* glow */}
              <div
                className="pc2-poster-layer"
                style={{
                  background: `radial-gradient(ellipse at 65% 35%, ${palette.accent}30 0%, transparent 50%)`,
                  opacity: enabledLayers.glow ? 1 : 0,
                }}
              />
              {/* type */}
              <div
                className="pc2-poster-layer"
                style={{ opacity: enabledLayers.type ? 1 : 0 }}
              >
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    padding: "20px 18px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      fontSize: 8,
                      letterSpacing: "0.25em",
                      textTransform: "uppercase",
                      color: `${palette.accent}88`,
                    }}
                  >
                    Genesis
                  </div>
                  <div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: "clamp(2.5rem,9vw,3.5rem)",
                        lineHeight: 0.88,
                        color: "#fff",
                        marginBottom: 10,
                      }}
                    >
                      THE
                      <br />
                      POSTER
                    </div>
                    <div
                      style={{
                        width: 24,
                        height: "1.5px",
                        background: palette.accent,
                        marginBottom: 10,
                        transition: "background 0.3s",
                      }}
                    />
                    <div
                      style={{
                        fontSize: 9,
                        color: "rgba(255,255,255,0.45)",
                        letterSpacing: "0.15em",
                      }}
                    >
                      COLLECTION 2024
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 7,
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.2)",
                    }}
                  >
                    Design Studio
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PALETTE SECTION */}
        <div className="pc2-section">
          <div className="pc2-section-header">
            <div className="pc2-section-title">Poster Palettes</div>
            <div className="pc2-section-line" />
          </div>
          <p className="pc2-section-sub">
            Each palette tells a different story. Click one to apply it to the
            poster above.
          </p>
          <div className="pc2-palette-grid">
            {PALETTES.map((p, i) => (
              <div
                key={i}
                className={`pc2-palette-card${activePalette === i ? " active-p" : ""}`}
                style={{
                  background:
                    activePalette === i
                      ? `${p.accent}0d`
                      : "rgba(255,255,255,0.02)",
                }}
                onClick={() => setActivePalette(i)}
              >
                <div className="pc2-palette-swatches">
                  {p.colors.map((c, j) => (
                    <div
                      key={j}
                      className="pc2-palette-swatch"
                      style={{ background: c }}
                    />
                  ))}
                </div>
                <div
                  className="pc2-palette-name"
                  style={{ color: activePalette === i ? p.accent : "#fff" }}
                >
                  {p.name}
                </div>
                <div className="pc2-palette-mood">{p.mood}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CONTRAST */}
        <div className="pc2-section" style={{ borderBottom: "none" }}>
          <div className="pc2-section-header">
            <div className="pc2-section-title">Contrast Is King</div>
            <div className="pc2-section-line" />
          </div>
          <p className="pc2-section-sub">
            No contrast = invisible poster. Drag the slider to see how contrast
            affects readability.
          </p>
          <div className="pc2-contrast">
            <div className="pc2-contrast-left">
              <div>
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.25)",
                    marginBottom: 10,
                  }}
                >
                  Contrast level
                </div>
                <div className="pc2-contrast-slider-wrap">
                  <input
                    type="range"
                    className="pc2-contrast-slider"
                    min={5}
                    max={100}
                    value={contrast}
                    onChange={(e) => setContrast(Number(e.target.value))}
                    style={{ flex: 1 }}
                  />
                  <div className="pc2-contrast-val">{contrast}</div>
                </div>
              </div>
              <div className="pc2-contrast-desc">
                {contrast < 30
                  ? "⚠️ Low contrast — type disappears into the background. The eye can't separate foreground from background."
                  : contrast < 60
                    ? "👁 Medium contrast — readable but not commanding. Works for subtle layouts, risky for headlines."
                    : "✓ High contrast — clear hierarchy. The eye knows exactly where to look. This is what stops people."}
              </div>
            </div>
            <div className="pc2-contrast-preview">
              <div
                className="pc2-contrast-cell"
                style={{ background: "#1a0a2e" }}
              >
                <div
                  className="pc2-contrast-headline"
                  style={{
                    fontFamily: "'Bebas Neue',sans-serif",
                    fontSize: 32,
                    lineHeight: 0.9,
                    letterSpacing: "0.02em",
                    color: `rgba(244,114,182,${contrast / 100})`,
                    transition: "color 0.2s",
                  }}
                >
                  POSTER TITLE
                </div>
                <div
                  className="pc2-contrast-sub"
                  style={{
                    fontSize: 12,
                    letterSpacing: "0.08em",
                    color: `rgba(255,255,255,${contrast * 0.005})`,
                    transition: "color 0.2s",
                  }}
                >
                  Subtitle and supporting text
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
