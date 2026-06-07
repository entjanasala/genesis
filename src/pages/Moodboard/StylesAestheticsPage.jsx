import { useState, useEffect, useRef } from "react";

const STYLES = [
  {
    id: "clean",
    name: "Clean Minimal",
    emoji: "⬜",
    accent: "#e2e8f0",
    textColor: "#000",
    era: "2015 – Now",
    rules: [
      {
        icon: "○",
        rule: "Maximum 2 typefaces",
        detail: "One for headlines, one for body. Never more.",
      },
      {
        icon: "□",
        rule: "80% white space",
        detail: "If it doesn't earn its place, remove it.",
      },
      {
        icon: "—",
        rule: "Hairline separators only",
        detail: "0.5px lines. Never bold borders.",
      },
      {
        icon: "∅",
        rule: "Zero decoration",
        detail: "No gradients, no shadows, no textures. Just form.",
      },
    ],
    bg: "#f8fafc",
    cardBg: "#fff",
    ingredients: [
      "White space",
      "One serif",
      "Black + white",
      "Grid alignment",
    ],
    vibe: "Confidence through restraint",
  },
  {
    id: "y2k",
    name: "Y2K",
    emoji: "💿",
    accent: "#00ffff",
    textColor: "#000",
    era: "1998 – 2004",
    rules: [
      {
        icon: "✦",
        rule: "Chrome everything",
        detail: "Metallic gradients on text, buttons, and surfaces.",
      },
      {
        icon: "◎",
        rule: "Gloss + reflection",
        detail: "Everything looks wet. Highlights in the top-left.",
      },
      {
        icon: "⬡",
        rule: "Pixel or bubble fonts",
        detail: "Chunky 3D type OR ultra-compressed futuristic fonts.",
      },
      {
        icon: "▒",
        rule: "Neon on dark",
        detail: "Cyan, magenta, electric blue — on near-black backgrounds.",
      },
    ],
    bg: "#0a0020",
    cardBg: "#100030",
    ingredients: [
      "Chrome gradients",
      "Neon colours",
      "Glossy surfaces",
      "Pixel/3D type",
    ],
    vibe: "The future as imagined in 1999",
  },
  {
    id: "brutalist",
    name: "Brutalist",
    emoji: "🧱",
    accent: "#ff0000",
    textColor: "#000",
    era: "2014 – Now",
    rules: [
      {
        icon: "✗",
        rule: "Break the grid",
        detail: "Deliberately misaligned. Overlap text over images.",
      },
      {
        icon: "◼",
        rule: "Raw typography",
        detail: "System fonts, monospace, or Impact. Never refined.",
      },
      {
        icon: "▬",
        rule: "Hard borders",
        detail: "3px+ solid black borders. No radius. No softness.",
      },
      {
        icon: "!",
        rule: "Visible function",
        detail:
          "Links look like links. Buttons look like buttons. Nothing pretends.",
      },
    ],
    bg: "#ffffff",
    cardBg: "#f0f0f0",
    ingredients: ["Broken grid", "System fonts", "Bold borders", "Anti-design"],
    vibe: "Honesty as aesthetic",
  },
  {
    id: "vaporwave",
    name: "Vaporwave",
    emoji: "🌅",
    accent: "#ff71ce",
    textColor: "#fff",
    era: "2010 – 2016",
    rules: [
      {
        icon: "▓",
        rule: "Glitch and noise",
        detail: "Corrupted pixels, scan lines, RGB splits.",
      },
      {
        icon: "🌴",
        rule: "Retro-future clash",
        detail: "Ancient Greek statues next to Windows 95 interfaces.",
      },
      {
        icon: "═",
        rule: "Neon grid lines",
        detail: "Cyan/pink grid on black. Infinite corridor perspective.",
      },
      {
        icon: "Ａ",
        rule: "Fullwidth text",
        detail: "Ｌｉｋｅ　ｔｈｉｓ．Maximum character spacing.",
      },
    ],
    bg: "#0d0221",
    cardBg: "#150339",
    ingredients: [
      "Neon pink/cyan",
      "Glitch effects",
      "Retro elements",
      "Fullwidth type",
    ],
    vibe: "Nostalgia for a future that never happened",
  },
  {
    id: "academia",
    name: "Dark Academia",
    emoji: "📚",
    accent: "#c8a96e",
    textColor: "#fff",
    era: "2020 – Now",
    rules: [
      {
        icon: "𝓐",
        rule: "Classical serif only",
        detail: "Garamond, Caslon, Didot. Nothing digital or modern.",
      },
      {
        icon: "≈",
        rule: "Aged, warm palette",
        detail: "Parchment, sepia, deep burgundy, forest green.",
      },
      {
        icon: "⌘",
        rule: "Historical references",
        detail: "Latin phrases, Roman numerals, architectural motifs.",
      },
      {
        icon: "░",
        rule: "Texture everywhere",
        detail: "Paper grain, linen, stone — never digital clean.",
      },
    ],
    bg: "#1a1208",
    cardBg: "#201808",
    ingredients: [
      "Classical serifs",
      "Warm earth tones",
      "Aged textures",
      "Historical refs",
    ],
    vibe: "Romanticising knowledge and melancholy",
  },
];

// Before/After slider
function BeforeAfter({ beforeContent, afterContent, label }) {
  const [pos, setPos] = useState(50);
  const ref = useRef(null);
  const dragging = useRef(false);

  const move = (e) => {
    if (!dragging.current || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    setPos(Math.max(5, Math.min(95, (x / rect.width) * 100)));
  };

  return (
    <div style={{ width: "100%" }}>
      {label && (
        <div
          style={{
            fontSize: 10,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.25)",
            marginBottom: 12,
          }}
        >
          {label}
        </div>
      )}
      <div
        ref={ref}
        style={{
          position: "relative",
          borderRadius: 12,
          overflow: "hidden",
          cursor: "ew-resize",
          userSelect: "none",
          border: "1px solid rgba(255,255,255,0.1)",
          height: 200,
        }}
        onMouseDown={() => (dragging.current = true)}
        onMouseMove={move}
        onMouseUp={() => (dragging.current = false)}
        onMouseLeave={() => (dragging.current = false)}
        onTouchStart={() => (dragging.current = true)}
        onTouchMove={move}
        onTouchEnd={() => (dragging.current = false)}
      >
        {/* BEFORE */}
        <div style={{ position: "absolute", inset: 0 }}>{beforeContent}</div>
        {/* AFTER — clipped */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            clipPath: `inset(0 0 0 ${pos}%)`,
          }}
        >
          {afterContent}
        </div>
        {/* handle */}
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: `${pos}%`,
            transform: "translateX(-50%)",
            width: 2,
            background: "#fff",
            zIndex: 10,
          }}
        >
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%,-50%)",
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 12,
              color: "#000",
              fontWeight: 700,
              boxShadow: "0 2px 12px rgba(0,0,0,0.4)",
            }}
          >
            ↔
          </div>
        </div>
        {/* labels */}
        <div
          style={{
            position: "absolute",
            bottom: 10,
            left: 14,
            fontSize: 9,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            zIndex: 5,
            background: "rgba(0,0,0,0.4)",
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          Before
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 10,
            right: 14,
            fontSize: 9,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            zIndex: 5,
            background: "rgba(0,0,0,0.4)",
            padding: "2px 8px",
            borderRadius: 4,
          }}
        >
          After
        </div>
      </div>
    </div>
  );
}

export default function StyleAestheticsPage({ onBack }) {
  const [activeStyle, setActiveStyle] = useState(0);
  const [activeRule, setActiveRule] = useState(null);
  const [quizStyle, setQuizStyle] = useState(null);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const style = STYLES[activeStyle];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const QUIZ_SAMPLES = [
    {
      style: "Y2K",
      clue: "Chrome text, cyan glow, dark background, glossy bubbles",
      answer: 1,
    },
    {
      style: "Brutalist",
      clue: "Bold red accents, misaligned layout, system font, visible grid lines",
      answer: 2,
    },
    {
      style: "Dark Academia",
      clue: "Sepia tones, classical serif, aged paper texture, Latin text",
      answer: 4,
    },
  ];
  const [quizIdx, setQuizIdx] = useState(0);
  const currentQuiz = QUIZ_SAMPLES[quizIdx];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .sa-page { min-height:100vh; background:#080810; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .sa-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(8,8,16,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .sa-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .sa-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .sa-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .sa-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.2); text-transform:uppercase; }

        .sa-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(255,255,255,0.08); position:relative; overflow:hidden; }
        .sa-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 25% 50%, rgba(244,114,182,0.07) 0%, transparent 55%); }
        .sa-hero-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-bottom:14px; position:relative; z-index:1; }
        .sa-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,10vw,9rem); line-height:0.88; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .sa-hero-title em { color:#f472b6; font-style:normal; }
        .sa-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .sa-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(255,255,255,0.04); line-height:1; pointer-events:none; user-select:none; }

        .sa-section { padding:72px 56px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .sa-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .sa-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; }
        .sa-section-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .sa-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }

        /* STYLE SELECTOR */
        .sa-style-tabs { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:32px; }
        .sa-style-tab { padding:8px 16px; border-radius:4px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.4); letter-spacing:0.04em; display:flex; align-items:center; gap:6px; }
        .sa-style-tab.active { background:rgba(244,114,182,0.1); border-color:rgba(244,114,182,0.35); color:#fff; }

        /* STYLE DETAIL */
        .sa-style-detail { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .sa-style-preview { border-radius:16px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); }
        .sa-preview-canvas { height:200px; display:flex; align-items:center; justify-content:center; padding:32px; transition:all 0.4s ease; }
        .sa-preview-bottom { padding:20px 24px; background:#111; }
        .sa-preview-ingredients { display:flex; flex-wrap:wrap; gap:6px; }
        .sa-preview-ing { font-size:10px; padding:3px 10px; border-radius:999px; border:0.5px solid; }
        .sa-style-rules { display:flex; flex-direction:column; gap:0; }
        .sa-rule-row { display:flex; align-items:center; gap:14px; padding:16px 0; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; transition:padding-left 0.2s; }
        .sa-rule-row:last-child { border-bottom:none; }
        .sa-rule-row:hover, .sa-rule-row.active-rule { padding-left:8px; }
        .sa-rule-icon { font-size:18px; width:28px; flex-shrink:0; text-align:center; }
        .sa-rule-text { flex:1; }
        .sa-rule-name { font-size:14px; color:rgba(255,255,255,0.8); margin-bottom:2px; transition:color 0.2s; }
        .sa-rule-row:hover .sa-rule-name, .sa-rule-row.active-rule .sa-rule-name { color:#fff; }
        .sa-rule-detail { font-size:11px; color:rgba(255,255,255,0.3); line-height:1.5; max-height:0; overflow:hidden; transition:max-height 0.3s; }
        .sa-rule-row.active-rule .sa-rule-detail { max-height:40px; }
        .sa-vibe-tag { display:inline-block; margin-top:16px; padding:8px 16px; border-radius:4px; border:1px solid; font-size:12px; font-style:italic; }

        /* BEFORE/AFTER SECTION */
        .sa-ba-section { padding:72px 56px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .sa-ba-grid { display:grid; grid-template-columns:1fr 1fr; gap:28px; }

        /* QUIZ */
        .sa-quiz { background:#0d0d18; padding:72px 56px; }
        .sa-quiz-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; margin-bottom:28px; }
        .sa-quiz-card { border-radius:16px; overflow:hidden; margin-bottom:24px; }
        .sa-quiz-sample { height:160px; border-radius:12px; border:1px solid rgba(255,255,255,0.08); margin-bottom:16px; display:flex; align-items:center; justify-content:center; padding:24px; }
        .sa-quiz-clue { font-size:13px; color:rgba(255,255,255,0.4); font-style:italic; margin-bottom:20px; }
        .sa-quiz-opts { display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px; }
        .sa-quiz-opt { padding:8px 16px; border-radius:4px; border:1px solid rgba(255,255,255,0.1); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.5); font-size:12px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; display:flex; align-items:center; gap:6px; }
        .sa-quiz-opt:hover { background:rgba(255,255,255,0.06); color:#fff; }
        .sa-quiz-opt.correct { border-color:#86efac; background:rgba(134,239,172,0.1); color:#86efac; }
        .sa-quiz-opt.wrong { border-color:rgba(251,113,133,0.3); opacity:0.5; }
        .sa-quiz-result { padding:12px 16px; border-radius:8px; background:rgba(134,239,172,0.07); border:1px solid rgba(134,239,172,0.2); font-size:13px; color:rgba(255,255,255,0.45); line-height:1.7; margin-bottom:14px; }
        .sa-quiz-next { background:rgba(255,255,255,0.07); border:1px solid rgba(255,255,255,0.15); color:#fff; padding:8px 20px; border-radius:4px; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
      `}</style>

      <div className="sa-page">
        <nav className="sa-nav">
          <button className="sa-back" onClick={onBack}>
            ← Back
          </button>
          <span className="sa-nav-title">Visual Styles & Aesthetics</span>
          <span className="sa-tag">Lesson 01</span>
        </nav>

        <div className="sa-hero">
          <div className="sa-hero-bg" />
          <div className="sa-hero-eyebrow">Design Styles · Lesson 01</div>
          <div className="sa-hero-title">
            5 STYLES.
            <br />
            <em>1 LESSON.</em>
          </div>
          <p className="sa-hero-sub">
            Every aesthetic is a set of rules. Learn the rules, then decide
            which ones to follow — and which ones to break on purpose.
          </p>
          <div className="sa-hero-num">01</div>
        </div>

        {/* STYLE DECONSTRUCTOR */}
        <div className="sa-section">
          <div className="sa-section-header">
            <div className="sa-section-title">STYLE DECONSTRUCTOR</div>
            <div className="sa-section-line" />
          </div>
          <p className="sa-section-sub">
            Select a style. Click each rule to expand it. See what makes it what
            it is.
          </p>
          <div className="sa-style-tabs">
            {STYLES.map((s, i) => (
              <button
                key={i}
                className={`sa-style-tab${activeStyle === i ? " active" : ""}`}
                onClick={() => {
                  setActiveStyle(i);
                  setActiveRule(null);
                }}
              >
                {s.emoji} {s.name}
              </button>
            ))}
          </div>
          <div className="sa-style-detail">
            <div className="sa-style-preview">
              <div
                className="sa-preview-canvas"
                style={{ background: style.bg }}
              >
                {style.id === "clean" && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontSize: 36,
                        color: "#000",
                        marginBottom: 8,
                      }}
                    >
                      Less is more.
                    </div>
                    <div
                      style={{
                        width: 32,
                        height: 0.5,
                        background: "#000",
                        margin: "0 auto 8px",
                      }}
                    />
                    <div
                      style={{ fontSize: 10, color: "#aaa", letterSpacing: 4 }}
                    >
                      STUDIO 2024
                    </div>
                  </div>
                )}
                {style.id === "y2k" && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 36,
                        background:
                          "linear-gradient(180deg,#fff 0%,#00ffff 50%,#8888ff 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        display: "inline-block",
                        letterSpacing: 4,
                      }}
                    >
                      CYBER.EXE
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: "#00ffff",
                        letterSpacing: 3,
                        marginTop: 6,
                        textShadow: "0 0 8px #00ffff",
                      }}
                    >
                      v2.0 MILLENNIUM EDITION
                    </div>
                  </div>
                )}
                {style.id === "brutalist" && (
                  <div style={{ width: "100%", padding: "0 16px" }}>
                    <div
                      style={{
                        fontFamily: "Impact,sans-serif",
                        fontSize: 44,
                        color: "#ff0000",
                        lineHeight: 0.9,
                      }}
                    >
                      WHY.
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 10,
                        color: "#000",
                        borderTop: "3px solid #000",
                        paddingTop: 6,
                        marginTop: 6,
                      }}
                    >
                      click here to find out →
                    </div>
                  </div>
                )}
                {style.id === "vaporwave" && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontSize: 14,
                        color: "#ff71ce",
                        letterSpacing: 6,
                        textShadow: "0 0 10px #ff71ce, 2px 2px 0 #01cdfe",
                        marginBottom: 6,
                      }}
                    >
                      ＡＥＳＴＨＥＴＩＣ
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: 3,
                      }}
                    >
                      {["▓", "░", "▒", "░", "▓", "░", "▒"].map((c, i) => (
                        <span
                          key={i}
                          style={{
                            color: i % 2 === 0 ? "#ff71ce" : "#01cdfe",
                            fontSize: 12,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {style.id === "academia" && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontStyle: "italic",
                        fontSize: 28,
                        color: "#c8a96e",
                      }}
                    >
                      Carpe Diem
                    </div>
                    <div
                      style={{
                        width: 32,
                        height: 1,
                        background: "#c8a96e",
                        margin: "10px auto",
                      }}
                    />
                    <div
                      style={{
                        fontSize: 9,
                        color: "rgba(200,169,110,0.5)",
                        letterSpacing: 4,
                      }}
                    >
                      MMXXIV
                    </div>
                  </div>
                )}
              </div>
              <div className="sa-preview-bottom">
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "rgba(255,255,255,0.2)",
                    marginBottom: 10,
                  }}
                >
                  Ingredients
                </div>
                <div className="sa-preview-ingredients">
                  {style.ingredients.map((ing, i) => (
                    <span
                      key={i}
                      className="sa-preview-ing"
                      style={{
                        color: `${style.accent}`,
                        borderColor: `${style.accent}40`,
                        background: `${style.accent}0d`,
                      }}
                    >
                      {ing}
                    </span>
                  ))}
                </div>
              </div>
            </div>
            <div>
              <div className="sa-style-rules">
                {style.rules.map((rule, i) => (
                  <div
                    key={i}
                    className={`sa-rule-row${activeRule === i ? " active-rule" : ""}`}
                    onClick={() => setActiveRule(activeRule === i ? null : i)}
                  >
                    <div
                      className="sa-rule-icon"
                      style={{ color: style.accent }}
                    >
                      {rule.icon}
                    </div>
                    <div className="sa-rule-text">
                      <div className="sa-rule-name">{rule.rule}</div>
                      <div className="sa-rule-detail">{rule.detail}</div>
                    </div>
                    <div
                      style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}
                    >
                      {activeRule === i ? "−" : "+"}
                    </div>
                  </div>
                ))}
              </div>
              <div
                className="sa-vibe-tag"
                style={{
                  color: style.accent,
                  borderColor: `${style.accent}40`,
                  background: `${style.accent}08`,
                }}
              >
                "{style.vibe}"
              </div>
            </div>
          </div>
        </div>

        {/* BEFORE/AFTER */}
        <div className="sa-ba-section">
          <div className="sa-section-header">
            <div className="sa-section-title">
              SAME CONTENT, DIFFERENT STYLE
            </div>
            <div className="sa-section-line" />
          </div>
          <p className="sa-section-sub">
            Drag the handle to compare. The content is identical — only the
            aesthetic changes.
          </p>
          <div className="sa-ba-grid">
            <BeforeAfter
              label="Clean Minimal vs Y2K"
              beforeContent={
                <div
                  style={{
                    height: 200,
                    background: "#f8fafc",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 32,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontSize: 28,
                        color: "#000",
                        marginBottom: 8,
                      }}
                    >
                      Event 2024
                    </div>
                    <div
                      style={{ fontSize: 10, color: "#aaa", letterSpacing: 4 }}
                    >
                      JUNE 15 · LONDON
                    </div>
                  </div>
                </div>
              }
              afterContent={
                <div
                  style={{
                    height: 200,
                    background: "#0a0020",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 32,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 28,
                        background:
                          "linear-gradient(180deg,#fff,#00ffff,#8888ff)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        display: "inline-block",
                        letterSpacing: 3,
                      }}
                    >
                      EVENT 2024
                    </div>
                    <div
                      style={{
                        fontSize: 9,
                        color: "#00ffff",
                        letterSpacing: 3,
                        marginTop: 6,
                        textShadow: "0 0 6px #00ffff",
                      }}
                    >
                      JUNE 15 · LONDON
                    </div>
                  </div>
                </div>
              }
            />
            <BeforeAfter
              label="Brutalist vs Dark Academia"
              beforeContent={
                <div
                  style={{
                    height: 200,
                    background: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 24,
                  }}
                >
                  <div style={{ width: "100%" }}>
                    <div
                      style={{
                        fontFamily: "Impact,sans-serif",
                        fontSize: 36,
                        color: "#ff0000",
                        lineHeight: 0.9,
                      }}
                    >
                      STUDIO
                    </div>
                    <div
                      style={{
                        borderTop: "4px solid #000",
                        marginTop: 8,
                        paddingTop: 8,
                        fontFamily: "monospace",
                        fontSize: 10,
                        color: "#000",
                      }}
                    >
                      Design that works → click
                    </div>
                  </div>
                </div>
              }
              afterContent={
                <div
                  style={{
                    height: 200,
                    background: "#1a1208",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: 24,
                  }}
                >
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontStyle: "italic",
                        fontSize: 28,
                        color: "#c8a96e",
                      }}
                    >
                      Studio
                    </div>
                    <div
                      style={{
                        width: 28,
                        height: 1,
                        background: "#c8a96e",
                        margin: "8px auto",
                      }}
                    />
                    <div
                      style={{
                        fontSize: 9,
                        color: "rgba(200,169,110,0.5)",
                        letterSpacing: 4,
                      }}
                    >
                      Est. MCMXXI
                    </div>
                  </div>
                </div>
              }
            />
          </div>
        </div>

        {/* QUIZ */}
        <div className="sa-quiz">
          <div className="sa-quiz-title">SPOT THE STYLE</div>
          <div
            style={{
              fontSize: 13,
              color: "rgba(255,255,255,0.28)",
              marginBottom: 32,
              lineHeight: 1.7,
            }}
          >
            Read the description. Identify the aesthetic.
          </div>
          <div
            style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32 }}
          >
            <div>
              <div className="sa-quiz-clue">🔍 Clue: {currentQuiz.clue}</div>
              <div className="sa-quiz-opts">
                {STYLES.map((s, i) => {
                  const answered = quizAnswer !== null;
                  const isCorrect = i === currentQuiz.answer;
                  return (
                    <button
                      key={i}
                      className={`sa-quiz-opt${answered ? (isCorrect ? " correct" : " wrong") : ""}`}
                      onClick={() => {
                        if (!quizAnswer) setQuizAnswer(i);
                      }}
                    >
                      {s.emoji} {s.name}
                    </button>
                  );
                })}
              </div>
              {quizAnswer !== null && (
                <>
                  <div className="sa-quiz-result">
                    <strong
                      style={{
                        color:
                          quizAnswer === currentQuiz.answer
                            ? "#86efac"
                            : "#fda4af",
                      }}
                    >
                      {quizAnswer === currentQuiz.answer
                        ? "✓ Correct! "
                        : "✗ That's "}
                    </strong>
                    {quizAnswer !== currentQuiz.answer &&
                      `${STYLES[currentQuiz.answer].name}. `}
                    {currentQuiz.clue}
                  </div>
                  <button
                    className="sa-quiz-next"
                    onClick={() => {
                      setQuizIdx((quizIdx + 1) % QUIZ_SAMPLES.length);
                      setQuizAnswer(null);
                    }}
                  >
                    Next sample →
                  </button>
                </>
              )}
            </div>
            <div
              style={{
                border: "1px solid rgba(255,255,255,0.07)",
                borderRadius: 12,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: 180,
                  background:
                    quizAnswer !== null
                      ? STYLES[currentQuiz.answer].bg
                      : "#111",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  transition: "background 0.4s",
                  padding: 24,
                }}
              >
                {quizAnswer !== null ? (
                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 32 }}>
                      {STYLES[currentQuiz.answer].emoji}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 24,
                        color: STYLES[currentQuiz.answer].accent,
                        marginTop: 8,
                      }}
                    >
                      {STYLES[currentQuiz.answer].name}
                    </div>
                  </div>
                ) : (
                  <div
                    style={{
                      fontSize: 12,
                      color: "rgba(255,255,255,0.2)",
                      letterSpacing: "0.2em",
                      textTransform: "uppercase",
                    }}
                  >
                    Answer to reveal
                  </div>
                )}
              </div>
              <div style={{ padding: "16px 20px", background: "#0d0d12" }}>
                <div
                  style={{
                    fontSize: 11,
                    color: "rgba(255,255,255,0.2)",
                    letterSpacing: "0.1em",
                  }}
                >
                  Sample {quizIdx + 1} of {QUIZ_SAMPLES.length}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
