import { useState, useEffect } from "react";

const TYPE_ROLES = [
  {
    role: "The Shout",
    desc: "One word. Maximum size. Fills the poster. The type IS the design — there is nothing else.",
    accent: "#f472b6",
    example: {
      word: "NOW",
      size: 120,
      weight: 900,
      style: "normal",
      font: "'Bebas Neue',sans-serif",
      color: "#fff",
    },
    usage: "Concert posters, protest art, product launches",
  },
  {
    role: "The Contrast",
    desc: "Giant weight against hair-thin weight. Extreme size contrast within a single headline creates maximum visual tension.",
    accent: "#34d399",
    example: {
      word: "DESIGN",
      size: 80,
      weight: 900,
      style: "normal",
      font: "'Bebas Neue',sans-serif",
      color: "#fff",
    },
    sub: {
      word: "studio",
      size: 14,
      weight: 300,
      style: "normal",
      font: "'DM Sans',sans-serif",
      color: "rgba(255,255,255,0.4)",
      letterSpacing: "0.3em",
    },
    usage: "Brand posters, fashion, luxury goods",
  },
  {
    role: "The Italic",
    desc: "Italic type carries energy and movement. A single italic word in a block of upright type creates immediate visual hierarchy.",
    accent: "#fb923c",
    example: {
      word: "the art of",
      size: 52,
      weight: 400,
      style: "italic",
      font: "'DM Serif Display',serif",
      color: "#fb923c",
    },
    sub: {
      word: "POSTER DESIGN",
      size: 36,
      weight: 900,
      style: "normal",
      font: "'Bebas Neue',sans-serif",
      color: "#fff",
    },
    usage: "Editorial, book covers, cultural events",
  },
  {
    role: "The Outline",
    desc: "Outlined text recedes. Use it as background texture while solid text sits on top — creates depth without images.",
    accent: "#c4b5fd",
    example: {
      word: "GENESIS",
      size: 72,
      weight: 900,
      style: "normal",
      font: "'Bebas Neue',sans-serif",
      color: "transparent",
      stroke: "#c4b5fd",
    },
    sub: {
      word: "GENESIS",
      size: 72,
      weight: 900,
      style: "normal",
      font: "'Bebas Neue',sans-serif",
      color: "#fff",
      offset: true,
    },
    usage: "Music posters, art exhibitions, streetwear",
  },
];

const SPACING_DEMOS = [
  {
    label: "Too tight",
    tracking: -0.05,
    leading: 0.85,
    desc: "Letters and lines crowd each other. Claustrophobic. Hard to read.",
  },
  {
    label: "Just right",
    tracking: 0.02,
    leading: 1.05,
    desc: "Clean air between letters. Hierarchy reads naturally. Professional.",
  },
  {
    label: "Too loose",
    tracking: 0.25,
    leading: 1.8,
    desc: "Letters drift apart. The word fragments. Impact is lost.",
  },
];

export default function PosterTypePage({ onBack }) {
  const [activeRole, setActiveRole] = useState(0);
  const [activeSpacing, setActiveSpacing] = useState(1);
  const [customText, setCustomText] = useState("YOUR TITLE");
  const [customSize, setCustomSize] = useState(60);
  const [customStyle, setCustomStyle] = useState("solid");
  const [customColour, setCustomColour] = useState("#f472b6");
  const [customFont, setCustomFont] = useState("bebas");
  const role = TYPE_ROLES[activeRole];
  const spacing = SPACING_DEMOS[activeSpacing];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getFontFamily = (key) => {
    if (key === "bebas") return "'Bebas Neue',sans-serif";
    if (key === "serif") return "'DM Serif Display',serif";
    return "'DM Sans',sans-serif";
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .pt-page { min-height:100vh; background:#0a0a0a; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .pt-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(10,10,10,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .pt-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .pt-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .pt-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .pt-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); text-transform:uppercase; }

        .pt-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.08); position:relative; overflow:hidden; }
        .pt-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 40% 50%, rgba(251,146,60,0.06) 0%, transparent 55%); }
        .pt-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:14px; position:relative; z-index:1; }
        .pt-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .pt-hero-title em { color:#fb923c; font-style:italic; font-family:'DM Serif Display',serif; display:block; }
        .pt-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .pt-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); line-height:1; pointer-events:none; user-select:none; }

        .pt-section { padding:72px 56px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .pt-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .pt-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; letter-spacing:0.02em; }
        .pt-section-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .pt-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* TYPE ROLES */
        .pt-roles-tabs { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(255,255,255,0.06); border-radius:8px; overflow:hidden; margin-bottom:28px; }
        .pt-role-tab { padding:16px 12px; cursor:pointer; border:none; background:#0a0a0a; text-align:left; transition:all 0.2s; position:relative; overflow:hidden; }
        .pt-role-tab:hover { background:#111; }
        .pt-role-tab.active-role { background:#111; }
        .pt-role-tab-name { font-family:'Bebas Neue',sans-serif; font-size:16px; color:rgba(255,255,255,0.5); letter-spacing:0.04em; transition:color 0.2s; }
        .pt-role-tab.active-role .pt-role-tab-name { color:#fff; }
        .pt-role-tab-line { position:absolute; bottom:0; left:0; height:2px; width:0; transition:width 0.3s; }
        .pt-role-tab.active-role .pt-role-tab-line { width:100%; }

        .pt-role-demo { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .pt-role-canvas { aspect-ratio:2/3; border:1px solid rgba(255,255,255,0.07); border-radius:12px; overflow:hidden; background:#0d0d18; display:flex; align-items:center; justify-content:center; padding:24px; position:relative; }
        .pt-role-canvas-bg { position:absolute; inset:0; }
        .pt-role-info { display:flex; flex-direction:column; justify-content:center; gap:16px; }
        .pt-role-name { font-family:'Bebas Neue',sans-serif; font-size:32px; color:#fff; margin-bottom:4px; }
        .pt-role-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.8; }
        .pt-role-usage { font-size:11px; letter-spacing:0.1em; padding:10px 14px; border-radius:6px; border:1px solid; }

        /* SPACING */
        .pt-spacing-tabs { display:flex; gap:8px; margin-bottom:28px; }
        .pt-spacing-tab { padding:8px 18px; border-radius:3px; font-size:11px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.38); letter-spacing:0.06em; }
        .pt-spacing-tab.active { border-color:rgba(251,146,60,0.4); color:#fb923c; background:rgba(251,146,60,0.08); }
        .pt-spacing-demo { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .pt-spacing-canvas { border:1px solid rgba(255,255,255,0.07); border-radius:8px; padding:32px; background:#0d0d12; display:flex; flex-direction:column; justify-content:center; min-height:160px; }
        .pt-spacing-info { display:flex; flex-direction:column; justify-content:center; gap:12px; }
        .pt-spacing-status { font-size:13px; line-height:1.7; }

        /* TYPE PLAYGROUND */
        .pt-playground { display:grid; grid-template-columns:1fr 1fr; gap:0; border-top:1px solid rgba(255,255,255,0.08); }
        .pt-playground-controls { padding:60px 56px; border-right:1px solid rgba(255,255,255,0.08); }
        .pt-play-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; margin-bottom:8px; }
        .pt-play-sub { font-size:13px; color:rgba(255,255,255,0.3); line-height:1.7; margin-bottom:36px; }
        .pt-ctrl { margin-bottom:22px; }
        .pt-ctrl-label { font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:10px; }
        .pt-text-input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:4px; padding:9px 14px; color:#fff; font-size:15px; font-family:'Bebas Neue',sans-serif; width:100%; outline:none; letter-spacing:0.05em; }
        .pt-text-input:focus { border-color:rgba(255,255,255,0.25); }
        .pt-slider { width:100%; accent-color:#fb923c; }
        .pt-radio-row { display:flex; gap:8px; flex-wrap:wrap; }
        .pt-radio-btn { padding:6px 14px; border:1px solid rgba(255,255,255,0.1); background:transparent; color:rgba(255,255,255,0.38); font-size:11px; border-radius:3px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.06em; }
        .pt-radio-btn.selected { border-color:rgba(251,146,60,0.4); color:#fb923c; background:rgba(251,146,60,0.08); }
        .pt-colour-row { display:flex; gap:7px; }
        .pt-colour-dot { width:24px; height:24px; border-radius:50%; cursor:pointer; border:2px solid transparent; transition:all 0.15s; }
        .pt-colour-dot.selected { border-color:#fff; transform:scale(1.15); }

        .pt-playground-preview { padding:60px 56px; display:flex; align-items:center; justify-content:center; background:#0d0d12; }
        .pt-poster-wrap { width:200px; height:280px; border-radius:8px; overflow:hidden; border:1px solid rgba(255,255,255,0.1); background:#1a0a2e; position:relative; }
      `}</style>

      <div className="pt-page">
        <nav className="pt-nav">
          <button className="pt-back" onClick={onBack}>
            ← Back
          </button>
          <span className="pt-nav-title">Type on a Poster</span>
          <span className="pt-tag">Lesson 03</span>
        </nav>

        <div className="pt-hero">
          <div className="pt-hero-bg" />
          <div className="pt-hero-eyebrow">Poster Creation · Lesson 03</div>
          <div className="pt-hero-title">
            TYPE AS
            <br />
            <em>Performance</em>
          </div>
          <p className="pt-hero-sub">
            On a poster, typography isn't just readable — it shouts, whispers,
            dances, and commands. Learn to treat type as a visual element.
          </p>
          <div className="pt-hero-num">03</div>
        </div>

        {/* TYPE ROLES */}
        <div className="pt-section">
          <div className="pt-section-header">
            <div className="pt-section-title">Type Roles</div>
            <div className="pt-section-line" />
          </div>
          <p className="pt-section-sub">
            Each role uses type in a completely different way. Same letters —
            totally different emotional effect.
          </p>
          <div className="pt-roles-tabs">
            {TYPE_ROLES.map((r, i) => (
              <button
                key={i}
                className={`pt-role-tab${activeRole === i ? " active-role" : ""}`}
                onClick={() => setActiveRole(i)}
              >
                <div
                  className="pt-role-tab-name"
                  style={{
                    color:
                      activeRole === i ? r.accent : "rgba(255,255,255,0.5)",
                  }}
                >
                  {r.role}
                </div>
                <div
                  className="pt-role-tab-line"
                  style={{ background: r.accent }}
                />
              </button>
            ))}
          </div>
          <div className="pt-role-demo">
            <div className="pt-role-canvas">
              <div
                className="pt-role-canvas-bg"
                style={{
                  background: `radial-gradient(ellipse at 60% 30%, ${role.accent}18 0%, transparent 60%)`,
                }}
              />
              <div
                style={{ position: "relative", zIndex: 1, textAlign: "center" }}
              >
                {role.example.stroke ? (
                  <div style={{ position: "relative" }}>
                    <div
                      style={{
                        fontFamily: role.example.font,
                        fontSize: Math.min(role.example.size, 80),
                        fontWeight: role.example.weight,
                        fontStyle: role.example.style,
                        color: "transparent",
                        WebkitTextStroke: `1.5px ${role.example.stroke}`,
                        letterSpacing: "0.02em",
                        lineHeight: 1,
                        userSelect: "none",
                      }}
                    >
                      {role.example.word}
                    </div>
                    {role.sub?.offset && (
                      <div
                        style={{
                          position: "absolute",
                          top: 6,
                          left: 6,
                          fontFamily: role.sub.font,
                          fontSize: Math.min(
                            role.sub.size || role.example.size,
                            80,
                          ),
                          fontWeight: role.sub.weight,
                          color: role.sub.color,
                          letterSpacing: "0.02em",
                          lineHeight: 1,
                        }}
                      >
                        {role.sub.word}
                      </div>
                    )}
                  </div>
                ) : (
                  <>
                    <div
                      style={{
                        fontFamily: role.example.font,
                        fontSize: Math.min(role.example.size, 80),
                        fontWeight: role.example.weight,
                        fontStyle: role.example.style,
                        color: role.example.color,
                        letterSpacing: role.example.letterSpacing || "0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {role.example.word}
                    </div>
                    {role.sub && !role.sub.offset && (
                      <div
                        style={{
                          fontFamily: role.sub.font,
                          fontSize: role.sub.size,
                          fontWeight: role.sub.weight,
                          fontStyle: role.sub.style,
                          color: role.sub.color,
                          letterSpacing: role.sub.letterSpacing || "0.04em",
                          marginTop: 8,
                        }}
                      >
                        {role.sub.word}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
            <div className="pt-role-info">
              <div className="pt-role-name" style={{ color: role.accent }}>
                {role.role}
              </div>
              <div className="pt-role-desc">{role.desc}</div>
              <div
                className="pt-role-usage"
                style={{
                  color: role.accent,
                  borderColor: `${role.accent}33`,
                  background: `${role.accent}08`,
                }}
              >
                <strong
                  style={{
                    display: "block",
                    fontSize: 9,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                    opacity: 0.6,
                  }}
                >
                  Used for
                </strong>
                {role.usage}
              </div>
            </div>
          </div>
        </div>

        {/* SPACING */}
        <div className="pt-section">
          <div className="pt-section-header">
            <div className="pt-section-title">Tracking & Leading</div>
            <div className="pt-section-line" />
          </div>
          <p className="pt-section-sub">
            Letter-spacing (tracking) and line-height (leading) change
            everything. See the difference live.
          </p>
          <div className="pt-spacing-tabs">
            {SPACING_DEMOS.map((s, i) => (
              <button
                key={i}
                className={`pt-spacing-tab${activeSpacing === i ? " active" : ""}`}
                onClick={() => setActiveSpacing(i)}
              >
                {s.label}
              </button>
            ))}
          </div>
          <div className="pt-spacing-demo">
            <div className="pt-spacing-canvas">
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 36,
                  fontWeight: 900,
                  color: "#fff",
                  letterSpacing: `${spacing.tracking}em`,
                  lineHeight: spacing.leading,
                  transition: "all 0.4s ease",
                }}
              >
                POSTER
                <br />
                DESIGN
                <br />
                STUDIO
              </div>
            </div>
            <div className="pt-spacing-info">
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 24,
                  color: "#fff",
                }}
              >
                {spacing.label}
              </div>
              <div
                style={{
                  fontSize: 13,
                  color: "rgba(255,255,255,0.38)",
                  lineHeight: 1.7,
                }}
              >
                {spacing.desc}
              </div>
              <div style={{ display: "flex", gap: 16 }}>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.2)",
                      marginBottom: 4,
                    }}
                  >
                    Tracking
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 22,
                      color: "#fb923c",
                    }}
                  >
                    {spacing.tracking > 0 ? "+" : ""}
                    {spacing.tracking}em
                  </div>
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      color: "rgba(255,255,255,0.2)",
                      marginBottom: 4,
                    }}
                  >
                    Leading
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 22,
                      color: "#fb923c",
                    }}
                  >
                    {spacing.leading}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* PLAYGROUND */}
        <div className="pt-playground">
          <div className="pt-playground-controls">
            <div className="pt-play-title">
              TYPE
              <br />
              PLAYGROUND
            </div>
            <p className="pt-play-sub">
              Apply what you've learned. Build your own poster type treatment.
            </p>
            <div className="pt-ctrl">
              <div className="pt-ctrl-label">Your text</div>
              <input
                className="pt-text-input"
                value={customText}
                onChange={(e) => setCustomText(e.target.value)}
                maxLength={16}
              />
            </div>
            <div className="pt-ctrl">
              <div className="pt-ctrl-label">Size — {customSize}px</div>
              <input
                type="range"
                className="pt-slider"
                min={24}
                max={100}
                value={customSize}
                onChange={(e) => setCustomSize(Number(e.target.value))}
              />
            </div>
            <div className="pt-ctrl">
              <div className="pt-ctrl-label">Font</div>
              <div className="pt-radio-row">
                {[
                  { k: "bebas", l: "Bebas Neue" },
                  { k: "serif", l: "DM Serif" },
                  { k: "sans", l: "DM Sans" },
                ].map((f) => (
                  <button
                    key={f.k}
                    className={`pt-radio-btn${customFont === f.k ? " selected" : ""}`}
                    onClick={() => setCustomFont(f.k)}
                  >
                    {f.l}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-ctrl">
              <div className="pt-ctrl-label">Style</div>
              <div className="pt-radio-row">
                {["solid", "outline", "italic"].map((s) => (
                  <button
                    key={s}
                    className={`pt-radio-btn${customStyle === s ? " selected" : ""}`}
                    onClick={() => setCustomStyle(s)}
                    style={{ textTransform: "capitalize" }}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
            <div className="pt-ctrl">
              <div className="pt-ctrl-label">Colour</div>
              <div className="pt-colour-row">
                {[
                  "#f472b6",
                  "#34d399",
                  "#fb923c",
                  "#c4b5fd",
                  "#38bdf8",
                  "#fde68a",
                  "#ffffff",
                ].map((c) => (
                  <div
                    key={c}
                    className={`pt-colour-dot${customColour === c ? " selected" : ""}`}
                    style={{ background: c }}
                    onClick={() => setCustomColour(c)}
                  />
                ))}
              </div>
            </div>
          </div>
          <div className="pt-playground-preview">
            <div className="pt-poster-wrap">
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background: `radial-gradient(ellipse at 60% 30%, ${customColour}20 0%, transparent 55%)`,
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
                  padding: 20,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontFamily: getFontFamily(customFont),
                    fontSize: Math.min(customSize, 60),
                    fontWeight: 900,
                    fontStyle: customStyle === "italic" ? "italic" : "normal",
                    color:
                      customStyle === "outline" ? "transparent" : customColour,
                    WebkitTextStroke:
                      customStyle === "outline"
                        ? `1.5px ${customColour}`
                        : "none",
                    lineHeight: 0.9,
                    letterSpacing: "0.02em",
                    display: "inline-block",
                    transition: "all 0.3s",
                  }}
                >
                  {customText || "TYPE"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
