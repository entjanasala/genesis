import { useState, useEffect } from "react";

const MOODS = [
  {
    id: "edgy",
    label: "Edgy",
    emoji: "⚡",
    desc: "Aggressive, loud, unapologetic. Breaks rules on purpose.",
    accent: "#f43f5e",
  },
  {
    id: "luxe",
    label: "Luxe",
    emoji: "✦",
    desc: "Quiet confidence. Says nothing and means everything.",
    accent: "#c8a96e",
  },
  {
    id: "playful",
    label: "Playful",
    emoji: "🎈",
    desc: "Warm, inviting, a little silly on purpose.",
    accent: "#fb923c",
  },
  {
    id: "tech",
    label: "Technical",
    emoji: "⬡",
    desc: "Precise, cold, forward-looking. No warmth allowed.",
    accent: "#22d3ee",
  },
  {
    id: "organic",
    label: "Organic",
    emoji: "🌿",
    desc: "Earthy, honest, imperfect by design.",
    accent: "#4ade80",
  },
  {
    id: "dreamy",
    label: "Dreamy",
    emoji: "✧",
    desc: "Soft, atmospheric, slightly unreal.",
    accent: "#c4b5fd",
  },
];

const INGREDIENTS = {
  bg: [
    {
      id: "bg-black",
      label: "Near Black",
      color: "#090909",
      moods: ["edgy", "luxe", "tech"],
    },
    {
      id: "bg-white",
      label: "Pure White",
      color: "#ffffff",
      moods: ["luxe", "playful"],
    },
    {
      id: "bg-warm",
      label: "Warm Cream",
      color: "#fef9c3",
      moods: ["playful", "organic"],
    },
    {
      id: "bg-earth",
      label: "Deep Earth",
      color: "#1a1208",
      moods: ["organic", "luxe"],
    },
    {
      id: "bg-space",
      label: "Space Dark",
      color: "#0a0a18",
      moods: ["tech", "dreamy"],
    },
    { id: "bg-mist", label: "Soft Mist", color: "#f0f4ff", moods: ["dreamy"] },
  ],
  accent: [
    {
      id: "acc-red",
      label: "Hot Red",
      color: "#f43f5e",
      moods: ["edgy", "playful"],
    },
    {
      id: "acc-gold",
      label: "Gold",
      color: "#c8a96e",
      moods: ["luxe", "organic"],
    },
    {
      id: "acc-orange",
      label: "Tangerine",
      color: "#fb923c",
      moods: ["playful", "organic"],
    },
    {
      id: "acc-cyan",
      label: "Electric Cyan",
      color: "#22d3ee",
      moods: ["tech", "edgy"],
    },
    {
      id: "acc-green",
      label: "Fresh Green",
      color: "#4ade80",
      moods: ["organic", "tech"],
    },
    {
      id: "acc-purple",
      label: "Soft Violet",
      color: "#c4b5fd",
      moods: ["dreamy", "luxe"],
    },
  ],
  type: [
    {
      id: "type-impact",
      label: "Impact/Bold",
      font: "Impact,sans-serif",
      moods: ["edgy", "playful"],
    },
    {
      id: "type-serif",
      label: "Classical Serif",
      font: "Georgia,serif",
      moods: ["luxe", "organic"],
    },
    {
      id: "type-display",
      label: "Display Serif",
      font: "'DM Serif Display',serif",
      moods: ["dreamy", "luxe"],
    },
    {
      id: "type-bebas",
      label: "Bebas Neue",
      font: "'Bebas Neue',sans-serif",
      moods: ["edgy", "tech"],
    },
    {
      id: "type-mono",
      label: "Monospace",
      font: "'Courier New',monospace",
      moods: ["tech", "edgy"],
    },
    {
      id: "type-sans",
      label: "Clean Sans",
      font: "'DM Sans',sans-serif",
      moods: ["tech", "playful"],
    },
  ],
  texture: [
    { id: "tex-none", label: "No texture", moods: ["tech", "luxe"] },
    {
      id: "tex-grain",
      label: "Film grain",
      moods: ["edgy", "organic", "dreamy"],
    },
    { id: "tex-lines", label: "Scan lines", moods: ["tech", "edgy"] },
    { id: "tex-paper", label: "Paper texture", moods: ["organic", "luxe"] },
  ],
};

const STYLE_RULES = [
  {
    mood: "edgy",
    rules: [
      "Break alignment deliberately",
      "Use maximum contrast",
      "One accent = maximum impact",
      "Type at extreme sizes — huge or tiny",
    ],
  },
  {
    mood: "luxe",
    rules: [
      "80% empty space",
      "Never more than 2 colours",
      "Type smaller than you think",
      "Gold/metallic used once only",
    ],
  },
  {
    mood: "playful",
    rules: [
      "Warm backgrounds always",
      "Round shapes and friendly fonts",
      "Multiple colours — but keep them harmonious",
      "White space but not too much",
    ],
  },
  {
    mood: "tech",
    rules: [
      "Dark backgrounds always",
      "Monospace or ultra-clean sans",
      "Grid-perfect alignment",
      "Single accent on near-black",
    ],
  },
  {
    mood: "organic",
    rules: [
      "Imperfect is intentional",
      "Earth tones + one fresh accent",
      "Serif type with personality",
      "Texture makes it feel real",
    ],
  },
  {
    mood: "dreamy",
    rules: [
      "Soft gradients everywhere",
      "Blur and glow effects",
      "Delicate hairline type",
      "Colours that bleed into each other",
    ],
  },
];

export default function StyleBuildPage({ onBack }) {
  const [activeMood, setActiveMood] = useState(null);
  const [choices, setChoices] = useState({
    bg: null,
    accent: null,
    type: null,
    texture: null,
  });
  const [headline, setHeadline] = useState("GENESIS");
  const [sub, setSub] = useState("Design Studio");
  const [step, setStep] = useState("mood"); // mood → ingredients → preview

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const mood = MOODS.find((m) => m.id === activeMood);
  const rules = STYLE_RULES.find((r) => r.mood === activeMood);

  const getSuggestedIngredients = () => {
    if (!activeMood) return {};
    return {
      bg: INGREDIENTS.bg.filter((i) => i.moods.includes(activeMood)),
      accent: INGREDIENTS.accent.filter((i) => i.moods.includes(activeMood)),
      type: INGREDIENTS.type.filter((i) => i.moods.includes(activeMood)),
      texture: INGREDIENTS.texture.filter((i) => i.moods.includes(activeMood)),
    };
  };

  const suggested = getSuggestedIngredients();
  const bgChoice = INGREDIENTS.bg.find((i) => i.id === choices.bg);
  const accentChoice = INGREDIENTS.accent.find((i) => i.id === choices.accent);
  const typeChoice = INGREDIENTS.type.find((i) => i.id === choices.type);
  const textureChoice = INGREDIENTS.texture.find(
    (i) => i.id === choices.texture,
  );

  const isComplete = choices.bg && choices.accent && choices.type;

  const getPosterBg = () => (bgChoice ? bgChoice.color : "#111");
  const getAccentColor = () => (accentChoice ? accentChoice.color : "#fff");
  const getTypeFont = () =>
    typeChoice ? typeChoice.font : "'Bebas Neue',sans-serif";

  const isDark = (hex) => {
    if (!hex || hex.startsWith("rgba") || hex.startsWith("linear")) return true;
    const r = parseInt(hex.slice(1, 3), 16),
      g = parseInt(hex.slice(3, 5), 16),
      b = parseInt(hex.slice(5, 7), 16);
    return 0.299 * r + 0.587 * g + 0.114 * b < 128;
  };
  const textOnBg = isDark(getPosterBg()) ? "#fff" : "#000";

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .sb-page { min-height:100vh; background:#080810; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .sb-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(8,8,16,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .sb-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .sb-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .sb-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .sb-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); text-transform:uppercase; }

        .sb-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.08); position:relative; overflow:hidden; }
        .sb-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 30% 50%, rgba(52,211,153,0.07) 0%, transparent 55%); }
        .sb-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:14px; position:relative; z-index:1; }
        .sb-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .sb-hero-title em { color:#34d399; font-style:normal; }
        .sb-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .sb-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); line-height:1; pointer-events:none; user-select:none; }

        .sb-section { padding:72px 56px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .sb-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .sb-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; }
        .sb-section-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .sb-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* STEP INDICATOR */
        .sb-steps { display:flex; gap:0; border-bottom:1px solid rgba(255,255,255,0.06); }
        .sb-step { flex:1; padding:16px 24px; cursor:pointer; border:none; background:transparent; text-align:left; transition:all 0.2s; border-right:1px solid rgba(255,255,255,0.06); position:relative; }
        .sb-step:last-child { border-right:none; }
        .sb-step-num { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); margin-bottom:4px; }
        .sb-step-label { font-family:'Bebas Neue',sans-serif; font-size:18px; color:rgba(255,255,255,0.4); letter-spacing:0.04em; transition:color 0.2s; }
        .sb-step.current .sb-step-label { color:#fff; }
        .sb-step.done .sb-step-label { color:rgba(255,255,255,0.6); }
        .sb-step-line { position:absolute; bottom:0; left:0; height:2px; width:0; background:#34d399; transition:width 0.3s; }
        .sb-step.current .sb-step-line, .sb-step.done .sb-step-line { width:100%; }

        /* MOOD GRID */
        .sb-mood-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:28px; }
        .sb-mood-card { border-radius:14px; padding:24px 20px; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); }
        .sb-mood-card:hover { transform:translateY(-2px); background:rgba(255,255,255,0.04); }
        .sb-mood-card.selected-mood { transform:translateY(-4px); }
        .sb-mood-emoji { font-size:28px; margin-bottom:10px; display:block; }
        .sb-mood-label { font-family:'Bebas Neue',sans-serif; font-size:22px; margin-bottom:6px; }
        .sb-mood-desc { font-size:12px; color:rgba(255,255,255,0.35); line-height:1.6; }

        /* INGREDIENTS */
        .sb-build-layout { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .sb-ing-section { display:flex; flex-direction:column; gap:24px; }
        .sb-ing-group { }
        .sb-ing-label { font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.28); margin-bottom:10px; }
        .sb-ing-options { display:flex; gap:7px; flex-wrap:wrap; }
        .sb-ing-opt { padding:7px 14px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.4); font-size:12px; border-radius:3px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; display:flex; align-items:center; gap:6px; }
        .sb-ing-opt:hover { background:rgba(255,255,255,0.05); color:rgba(255,255,255,0.7); }
        .sb-ing-opt.selected-ing { color:#fff; }
        .sb-ing-swatch { width:14px; height:14px; border-radius:3px; flex-shrink:0; border:1px solid rgba(255,255,255,0.1); }

        /* LIVE PREVIEW */
        .sb-preview-wrap { display:flex; flex-direction:column; gap:16px; position:sticky; top:80px; }
        .sb-poster { width:100%; aspect-ratio:2/3; border-radius:14px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); position:relative; transition:all 0.4s ease; }
        .sb-poster-layer { position:absolute; inset:0; transition:opacity 0.3s; }
        .sb-poster-content { position:absolute; inset:0; padding:20px; display:flex; flex-direction:column; justify-content:space-between; }
        .sb-rules-list { display:flex; flex-direction:column; gap:6px; }
        .sb-rule-item { font-size:12px; color:rgba(255,255,255,0.4); display:flex; align-items:flex-start; gap:8px; }
        .sb-rule-bullet { color:#34d399; flex-shrink:0; margin-top:1px; }

        /* TEXT INPUTS */
        .sb-text-inputs { display:flex; flex-direction:column; gap:10px; }
        .sb-text-input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.1); border-radius:4px; padding:8px 12px; color:#fff; font-family:'Bebas Neue',sans-serif; font-size:15px; outline:none; letter-spacing:0.04em; }
        .sb-text-input:focus { border-color:rgba(255,255,255,0.25); }
        .sb-text-input.sub-input { font-family:'DM Sans',sans-serif; font-size:12px; letter-spacing:0.02em; }

        .sb-complete-badge { padding:10px 16px; border-radius:6px; background:rgba(52,211,153,0.1); border:1px solid rgba(52,211,153,0.25); font-size:12px; color:#34d399; text-align:center; }
      `}</style>

      <div className="sb-page">
        <nav className="sb-nav">
          <button className="sb-back" onClick={onBack}>
            ← Back
          </button>
          <span className="sb-nav-title">Build a Style</span>
          <span className="sb-tag">Lesson 03</span>
        </nav>

        <div className="sb-hero">
          <div className="sb-hero-bg" />
          <div className="sb-hero-eyebrow">Design Styles · Lesson 03</div>
          <div className="sb-hero-title">
            PICK A MOOD.
            <br />
            <em>BUILD IT.</em>
          </div>
          <p className="sb-hero-sub">
            Stop copying references. Start with a feeling, stack the
            ingredients, and create something that feels like one specific thing
            — not everything at once.
          </p>
          <div className="sb-hero-num">03</div>
        </div>

        {/* STEPS */}
        <div className="sb-steps">
          {[
            { id: "mood", label: "01 Pick a mood" },
            { id: "ingredients", label: "02 Stack ingredients" },
            { id: "preview", label: "03 See it live" },
          ].map((s) => (
            <button
              key={s.id}
              className={`sb-step${step === s.id ? " current" : ""}${(step === "ingredients" && s.id === "mood") || step === "preview" ? " done" : ""}`}
              onClick={() => setStep(s.id)}
            >
              <div className="sb-step-num">Step</div>
              <div className="sb-step-label">{s.label}</div>
              <div className="sb-step-line" />
            </button>
          ))}
        </div>

        {/* STEP 1: MOOD */}
        {step === "mood" && (
          <div className="sb-section">
            <div className="sb-section-header">
              <div className="sb-section-title">WHAT SHOULD IT FEEL LIKE?</div>
              <div className="sb-section-line" />
            </div>
            <p className="sb-section-sub">
              Choose one mood. Everything else follows from this single
              decision.
            </p>
            <div className="sb-mood-grid">
              {MOODS.map((m, i) => (
                <div
                  key={i}
                  className={`sb-mood-card${activeMood === m.id ? " selected-mood" : ""}`}
                  style={
                    activeMood === m.id
                      ? {
                          borderColor: `${m.accent}50`,
                          background: `${m.accent}0d`,
                        }
                      : {}
                  }
                  onClick={() => {
                    setActiveMood(m.id);
                    setChoices({
                      bg: null,
                      accent: null,
                      type: null,
                      texture: null,
                    });
                  }}
                >
                  <span className="sb-mood-emoji">{m.emoji}</span>
                  <div
                    className="sb-mood-label"
                    style={{ color: activeMood === m.id ? m.accent : "#fff" }}
                  >
                    {m.label}
                  </div>
                  <div className="sb-mood-desc">{m.desc}</div>
                </div>
              ))}
            </div>
            {activeMood && (
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <button
                  onClick={() => setStep("ingredients")}
                  style={{
                    background: `${mood.accent}18`,
                    border: `1px solid ${mood.accent}55`,
                    color: mood.accent,
                    padding: "10px 24px",
                    fontSize: 11,
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    fontFamily: "'DM Sans',sans-serif",
                    borderRadius: 4,
                    transition: "all 0.2s",
                  }}
                >
                  {mood.emoji} Next: Stack ingredients →
                </button>
              </div>
            )}
          </div>
        )}

        {/* STEP 2: INGREDIENTS */}
        {step === "ingredients" && mood && (
          <div className="sb-section">
            <div className="sb-section-header">
              <div className="sb-section-title">STACK YOUR INGREDIENTS</div>
              <div className="sb-section-line" />
            </div>
            <p className="sb-section-sub">
              The highlighted options work best for{" "}
              <strong style={{ color: mood.accent }}>{mood.label}</strong>. But
              you can choose anything — and see what happens.
            </p>
            <div className="sb-build-layout">
              <div className="sb-ing-section">
                {/* BG */}
                <div className="sb-ing-group">
                  <div className="sb-ing-label">Background</div>
                  <div className="sb-ing-options">
                    {INGREDIENTS.bg.map((opt, i) => {
                      const isSuggested = opt.moods.includes(activeMood);
                      const isSelected = choices.bg === opt.id;
                      return (
                        <button
                          key={i}
                          className={`sb-ing-opt${isSelected ? " selected-ing" : ""}`}
                          style={
                            isSelected
                              ? {
                                  borderColor: `${mood.accent}55`,
                                  background: `${mood.accent}10`,
                                  color: mood.accent,
                                }
                              : isSuggested
                                ? {
                                    borderColor: "rgba(255,255,255,0.2)",
                                    color: "rgba(255,255,255,0.7)",
                                  }
                                : {}
                          }
                          onClick={() =>
                            setChoices((p) => ({ ...p, bg: opt.id }))
                          }
                        >
                          <div
                            className="sb-ing-swatch"
                            style={{ background: opt.color }}
                          />
                          {opt.label}
                          {isSuggested && !isSelected && (
                            <span style={{ fontSize: 9, color: mood.accent }}>
                              ✦
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* ACCENT */}
                <div className="sb-ing-group">
                  <div className="sb-ing-label">Accent colour</div>
                  <div className="sb-ing-options">
                    {INGREDIENTS.accent.map((opt, i) => {
                      const isSuggested = opt.moods.includes(activeMood);
                      const isSelected = choices.accent === opt.id;
                      return (
                        <button
                          key={i}
                          className={`sb-ing-opt${isSelected ? " selected-ing" : ""}`}
                          style={
                            isSelected
                              ? {
                                  borderColor: `${opt.color}55`,
                                  background: `${opt.color}15`,
                                  color: opt.color,
                                }
                              : isSuggested
                                ? {
                                    borderColor: "rgba(255,255,255,0.2)",
                                    color: "rgba(255,255,255,0.7)",
                                  }
                                : {}
                          }
                          onClick={() =>
                            setChoices((p) => ({ ...p, accent: opt.id }))
                          }
                        >
                          <div
                            className="sb-ing-swatch"
                            style={{ background: opt.color }}
                          />
                          {opt.label}
                          {isSuggested && !isSelected && (
                            <span style={{ fontSize: 9, color: mood.accent }}>
                              ✦
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* TYPE */}
                <div className="sb-ing-group">
                  <div className="sb-ing-label">Typography</div>
                  <div className="sb-ing-options">
                    {INGREDIENTS.type.map((opt, i) => {
                      const isSuggested = opt.moods.includes(activeMood);
                      const isSelected = choices.type === opt.id;
                      return (
                        <button
                          key={i}
                          className={`sb-ing-opt${isSelected ? " selected-ing" : ""}`}
                          style={
                            isSelected
                              ? {
                                  borderColor: `${mood.accent}55`,
                                  background: `${mood.accent}10`,
                                  color: mood.accent,
                                  fontFamily: opt.font,
                                }
                              : isSuggested
                                ? {
                                    borderColor: "rgba(255,255,255,0.2)",
                                    color: "rgba(255,255,255,0.7)",
                                    fontFamily: opt.font,
                                  }
                                : { fontFamily: opt.font }
                          }
                          onClick={() =>
                            setChoices((p) => ({ ...p, type: opt.id }))
                          }
                        >
                          {opt.label}
                          {isSuggested && !isSelected && (
                            <span
                              style={{
                                fontSize: 9,
                                color: mood.accent,
                                fontFamily: "'DM Sans',sans-serif",
                              }}
                            >
                              ✦
                            </span>
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
                {/* TEXT INPUTS */}
                <div className="sb-ing-group">
                  <div className="sb-ing-label">Poster text</div>
                  <div className="sb-text-inputs">
                    <input
                      className="sb-text-input"
                      value={headline}
                      onChange={(e) => setHeadline(e.target.value)}
                      maxLength={12}
                      placeholder="HEADLINE"
                    />
                    <input
                      className="sb-text-input sub-input"
                      value={sub}
                      onChange={(e) => setSub(e.target.value)}
                      maxLength={20}
                      placeholder="Sub-headline"
                    />
                  </div>
                </div>
              </div>

              {/* LIVE PREVIEW */}
              <div className="sb-preview-wrap">
                <div className="sb-poster">
                  {/* bg layer */}
                  <div
                    className="sb-poster-layer"
                    style={{
                      background: getPosterBg(),
                      transition: "background 0.4s",
                    }}
                  />
                  {/* texture */}
                  <div
                    className="sb-poster-layer"
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.06'/%3E%3C/svg%3E")`,
                      opacity: 0.5,
                    }}
                  />
                  {/* glow */}
                  <div
                    className="sb-poster-layer"
                    style={{
                      background: `radial-gradient(ellipse at 65% 30%, ${getAccentColor()}25 0%, transparent 55%)`,
                      transition: "background 0.4s",
                    }}
                  />
                  {/* content */}
                  <div className="sb-poster-content">
                    <div
                      style={{
                        fontSize: 8,
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: `${getAccentColor()}88`,
                        transition: "color 0.4s",
                      }}
                    >
                      Genesis Design
                    </div>
                    <div>
                      <div
                        style={{
                          fontFamily: getTypeFont(),
                          fontSize: "clamp(2.2rem,7vw,3rem)",
                          lineHeight: 0.88,
                          color: textOnBg,
                          marginBottom: 10,
                          letterSpacing: "0.02em",
                          transition: "all 0.4s",
                        }}
                      >
                        {headline || "GENESIS"}
                      </div>
                      <div
                        style={{
                          width: 20,
                          height: "1.5px",
                          background: getAccentColor(),
                          marginBottom: 10,
                          transition: "background 0.4s",
                        }}
                      />
                      <div
                        style={{
                          fontSize: 10,
                          color: `${textOnBg}80`,
                          letterSpacing: "0.08em",
                          transition: "all 0.4s",
                        }}
                      >
                        {sub || "Design Studio"}
                      </div>
                    </div>
                    <div
                      style={{
                        fontSize: 7,
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: `${textOnBg}40`,
                      }}
                    >
                      2024
                    </div>
                  </div>
                </div>
                {rules && isComplete && (
                  <div className="sb-rules-list">
                    {rules.rules.map((r, i) => (
                      <div key={i} className="sb-rule-item">
                        <span className="sb-rule-bullet">✦</span>
                        {r}
                      </div>
                    ))}
                  </div>
                )}
                {isComplete && (
                  <div className="sb-complete-badge">✓ Style complete</div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: PREVIEW — constraints card */}
        {step === "preview" && (
          <div className="sb-section">
            <div className="sb-section-header">
              <div className="sb-section-title">CREATIVE CONSTRAINTS</div>
              <div className="sb-section-line" />
            </div>
            <p className="sb-section-sub">
              The best creative work comes from constraints, not freedom. Here's
              why limiting your ingredients makes stronger design.
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3,1fr)",
                gap: 14,
              }}
            >
              {[
                {
                  title: "Why only 2 colours?",
                  text: "More colours = more decisions = more chances to clash. 2 colours force you to use each one intentionally.",
                  accent: "#f472b6",
                },
                {
                  title: "Why fewer fonts?",
                  text: "Every additional typeface divides the personality of the design. Two typefaces create dialogue. Three create noise.",
                  accent: "#a78bfa",
                },
                {
                  title: "Why one mood?",
                  text: "Designs that try to feel multiple things feel nothing. Commit to one emotional territory — and go all the way in.",
                  accent: "#34d399",
                },
                {
                  title: "Why space matters",
                  text: "What you leave out is as important as what you put in. White space isn't emptiness — it's breathing room that gives other elements their power.",
                  accent: "#fdba74",
                },
                {
                  title: "Why rules exist",
                  text: "Design rules aren't restrictions — they're compressed experience. They exist because someone already tried the thing that doesn't work.",
                  accent: "#38bdf8",
                },
                {
                  title: "Why break them",
                  text: "Once you understand why a rule exists, breaking it becomes meaningful. You can say 'I know this is wrong and I'm doing it anyway' — that's design.",
                  accent: "#fb923c",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  style={{
                    borderRadius: 14,
                    padding: 22,
                    border: `1px solid ${c.accent}25`,
                    background: `${c.accent}08`,
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 18,
                      color: c.accent,
                      marginBottom: 8,
                      letterSpacing: "0.04em",
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.38)",
                      lineHeight: 1.7,
                    }}
                  >
                    {c.text}
                  </div>
                </div>
              ))}
            </div>
            {activeMood && isComplete && (
              <div
                style={{
                  marginTop: 32,
                  padding: "20px 24px",
                  borderRadius: 12,
                  background: "rgba(52,211,153,0.08)",
                  border: "1px solid rgba(52,211,153,0.2)",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#34d399",
                    marginBottom: 8,
                  }}
                >
                  Your style is saved
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.45)",
                    lineHeight: 1.7,
                  }}
                >
                  You chose{" "}
                  <strong style={{ color: "#fff" }}>{mood?.label}</strong> →{" "}
                  {bgChoice?.label} background → {accentChoice?.label} accent →{" "}
                  {typeChoice?.label} typography. That's a complete style
                  system.
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
