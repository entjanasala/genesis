import { useState, useEffect, useRef } from "react";
import { useProgress } from "../../context/ProgressContext";

const lessons = [
  {
    id: 1,
    number: "01",
    title: "Visual Styles & Aesthetics",
    duration: "12 min",
    description:
      "Clean, Y2K, Brutalist, Soft UI, Dark Academia — every design style has a set of rules. Learn to identify, deconstruct, and apply them.",
    topics: ["Style recognition", "Aesthetic rules", "Era-based design"],
    route: "style-aesthetics",
    accent: "#f472b6",
    bg: "rgba(244,114,182,0.07)",
    border: "rgba(244,114,182,0.22)",
  },
  {
    id: 2,
    number: "02",
    title: "Layers & Depth",
    duration: "11 min",
    description:
      "Great design is never flat. It's built in layers — background, mid-ground, foreground. Learn how to create depth that makes people lean in.",
    topics: ["Layer theory", "Z-depth", "Visual hierarchy"],
    route: "style-layers",
    accent: "#a78bfa",
    bg: "rgba(167,139,250,0.07)",
    border: "rgba(167,139,250,0.22)",
  },
  {
    id: 3,
    number: "03",
    title: "Build a Style",
    duration: "13 min",
    description:
      "Stop copying and start building. Pick a mood, stack the ingredients, and create something that feels like a specific thing — not everything.",
    topics: ["Style ingredients", "Mood to design", "Creative constraints"],
    route: "style-build",
    accent: "#34d399",
    bg: "rgba(52,211,153,0.07)",
    border: "rgba(52,211,153,0.22)",
  },
];

const STYLE_PREVIEWS = [
  {
    name: "Y2K",
    year: "1999–2004",
    emoji: "💿",
    bg: "linear-gradient(135deg, #0a0020 0%, #1a0050 50%, #000 100%)",
    accent: "#00ffff",
    elements: [
      "Chrome gradients",
      "Bubble fonts",
      "Glossy surfaces",
      "Pixel art",
    ],
    preview: { headline: "MILLENNIUM", sub: "2000.EXE", style: "chrome" },
  },
  {
    name: "Clean Minimal",
    year: "2018–Now",
    emoji: "⬜",
    bg: "linear-gradient(135deg, #fafafa 0%, #f0f0f0 100%)",
    accent: "#000",
    dark: true,
    elements: [
      "Lots of white space",
      "One typeface",
      "Hairline rules",
      "No decoration",
    ],
    preview: { headline: "LESS.", sub: "Nothing extra.", style: "minimal" },
  },
  {
    name: "Brutalist",
    year: "2016–Now",
    emoji: "🧱",
    bg: "linear-gradient(135deg, #fff 0%, #f5f5f5 100%)",
    accent: "#ff0000",
    dark: true,
    elements: [
      "Raw HTML vibes",
      "Clashing fonts",
      "Bold borders",
      "Unexpected layout",
    ],
    preview: {
      headline: "NO.",
      sub: "Rules are for breaking.",
      style: "brutal",
    },
  },
  {
    name: "Dark Academia",
    year: "2020–Now",
    emoji: "📚",
    bg: "linear-gradient(135deg, #1a1208 0%, #2d2010 100%)",
    accent: "#c8a96e",
    elements: [
      "Aged textures",
      "Serif type",
      "Muted palette",
      "Classical motifs",
    ],
    preview: { headline: "Erudite", sub: "Est. MCMXXI", style: "academia" },
  },
  {
    name: "Soft UI",
    year: "2019–Now",
    emoji: "🫧",
    bg: "linear-gradient(135deg, #e8eaf6 0%, #dde1f0 100%)",
    accent: "#7986cb",
    dark: true,
    elements: [
      "Neumorphism",
      "Pastel palette",
      "Soft shadows",
      "Rounded everything",
    ],
    preview: { headline: "Gentle", sub: "Smooth. Soft. Calm.", style: "soft" },
  },
  {
    name: "Vaporwave",
    year: "2010–2016",
    emoji: "🌅",
    bg: "linear-gradient(135deg, #0d0221 0%, #4a0a6b 50%, #0d0221 100%)",
    accent: "#ff71ce",
    elements: [
      "Neon colours",
      "Retro computing",
      "Glitch effects",
      "80s nostalgia",
    ],
    preview: {
      headline: "ＡＥＳＴＨＥＴＩＣ",
      sub: "∞ vibes ∞",
      style: "vaporwave",
    },
  },
];

function StyleCard({ style, isActive, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        cursor: "pointer",
        borderRadius: 16,
        overflow: "hidden",
        border: `1px solid ${isActive ? style.accent : "rgba(255,255,255,0.08)"}`,
        transition: "all 0.25s ease",
        transform: isActive ? "translateY(-4px)" : "none",
        boxShadow: isActive ? `0 12px 40px ${style.accent}20` : "none",
      }}
    >
      {/* mini poster */}
      <div
        style={{
          height: 160,
          background: style.bg,
          position: "relative",
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {style.preview.style === "chrome" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: 28,
                background:
                  "linear-gradient(180deg,#fff 0%,#00ffff 40%,#fff 60%,#8888ff 100%)",
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
                display: "inline-block",
                letterSpacing: 4,
              }}
            >
              {style.preview.headline}
            </div>
            <div
              style={{
                fontSize: 9,
                color: "#00ffff",
                letterSpacing: 3,
                marginTop: 4,
                textShadow: "0 0 8px #00ffff",
              }}
            >
              {style.preview.sub}
            </div>
          </div>
        )}
        {style.preview.style === "minimal" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontSize: 36,
                color: "#000",
                fontWeight: 400,
              }}
            >
              {style.preview.headline}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#999",
                letterSpacing: 4,
                marginTop: 8,
              }}
            >
              {style.preview.sub}
            </div>
          </div>
        )}
        {style.preview.style === "brutal" && (
          <div style={{ textAlign: "left", padding: "0 20px", width: "100%" }}>
            <div
              style={{
                fontFamily: "Impact,sans-serif",
                fontSize: 48,
                color: "#ff0000",
                lineHeight: 0.9,
                textTransform: "uppercase",
              }}
            >
              {style.preview.headline}
            </div>
            <div
              style={{
                fontFamily: "monospace",
                fontSize: 10,
                color: "#000",
                marginTop: 6,
                textDecoration: "underline",
              }}
            >
              {style.preview.sub}
            </div>
          </div>
        )}
        {style.preview.style === "academia" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'DM Serif Display',serif",
                fontStyle: "italic",
                fontSize: 30,
                color: "#c8a96e",
              }}
            >
              {style.preview.headline}
            </div>
            <div
              style={{
                fontSize: 9,
                color: "rgba(200,169,110,0.6)",
                letterSpacing: 4,
                marginTop: 8,
              }}
            >
              {style.preview.sub}
            </div>
          </div>
        )}
        {style.preview.style === "soft" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                width: 80,
                height: 80,
                borderRadius: "50%",
                background: "#e8eaf6",
                boxShadow: "8px 8px 16px #c5c8d6, -8px -8px 16px #ffffff",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 10px",
              }}
            >
              <div
                style={{
                  fontFamily: "'DM Serif Display',serif",
                  fontSize: 20,
                  color: "#7986cb",
                }}
              >
                {style.preview.headline}
              </div>
            </div>
            <div style={{ fontSize: 9, color: "#9fa8da", letterSpacing: 2 }}>
              {style.preview.sub}
            </div>
          </div>
        )}
        {style.preview.style === "vaporwave" && (
          <div style={{ textAlign: "center" }}>
            <div
              style={{
                fontFamily: "'DM Sans',sans-serif",
                fontSize: 16,
                color: "#ff71ce",
                letterSpacing: 6,
                textShadow: "0 0 10px #ff71ce, 2px 2px 0 #01cdfe",
              }}
            >
              {style.preview.headline}
            </div>
            <div
              style={{
                fontSize: 10,
                color: "#b967ff",
                marginTop: 8,
                letterSpacing: 3,
              }}
            >
              {style.preview.sub}
            </div>
          </div>
        )}
        {/* emoji badge */}
        <div style={{ position: "absolute", top: 10, right: 10, fontSize: 20 }}>
          {style.emoji}
        </div>
      </div>
      {/* info */}
      <div style={{ padding: "14px 16px", background: "#0d0d12" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 6,
          }}
        >
          <div
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 18,
              color: isActive ? style.accent : "#fff",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
          >
            {style.name}
          </div>
          <div
            style={{
              fontSize: 9,
              color: "rgba(255,255,255,0.25)",
              letterSpacing: "0.1em",
            }}
          >
            {style.year}
          </div>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {style.elements.slice(0, 2).map((el, i) => (
            <span
              key={i}
              style={{
                fontSize: 9,
                padding: "2px 7px",
                borderRadius: 999,
                border: `0.5px solid ${style.accent}40`,
                color: `${style.accent}99`,
                background: `${style.accent}0d`,
              }}
            >
              {el}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function DesignStylesPage({ onBack, onNavigate }) {
  const [activeStyle, setActiveStyle] = useState(0);
  const [activeLesson, setActiveLesson] = useState(0);
  const heroRef = useRef(null);
  const { getCompleted, toggleComplete: toggleCtx } = useProgress();
  const completed = getCompleted("design-styles");
  const toggleComplete = (id, e) => {
    e.stopPropagation();
    toggleCtx("design-styles", id);
  };
  const progress = Math.round((completed.length / lessons.length) * 100);
  const active = lessons[activeLesson];
  const isDone = completed.includes(active.id);
  const current = STYLE_PREVIEWS[activeStyle];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        .ds-page { min-height:100vh; background:#080810; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .ds-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(8,8,16,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:200; }
        .ds-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .ds-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .ds-nav-center { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .ds-prog-pill { display:flex; align-items:center; gap:10px; font-size:11px; color:rgba(255,255,255,0.3); }
        .ds-prog-bar { width:60px; height:1px; background:rgba(255,255,255,0.1); }
        .ds-prog-fill { height:100%; background:#f472b6; transition:width 0.5s; }

        /* HERO — full screen cinematic */
        .ds-hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(255,255,255,0.08); }
        .ds-hero-left { padding:80px 56px; display:flex; flex-direction:column; justify-content:center; position:relative; overflow:hidden; border-right:1px solid rgba(255,255,255,0.08); }
        .ds-hero-glow { position:absolute; inset:0; background:radial-gradient(ellipse at 20% 60%, rgba(244,114,182,0.08) 0%, transparent 55%); pointer-events:none; }
        .ds-hero-eyebrow { font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:20px; display:flex; align-items:center; gap:10px; position:relative; z-index:1; }
        .ds-hero-eyebrow::before { content:''; width:24px; height:1px; background:rgba(255,255,255,0.3); }
        .ds-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(5rem,11vw,10rem); line-height:0.85; letter-spacing:0.02em; color:#fff; margin-bottom:24px; position:relative; z-index:1; }
        .ds-hero-title em { display:block; background:linear-gradient(135deg,#f472b6,#a78bfa,#34d399); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .ds-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:400px; position:relative; z-index:1; margin-bottom:40px; }
        .ds-hero-stat-row { display:flex; gap:28px; position:relative; z-index:1; }
        .ds-stat-num { font-family:'Bebas Neue',sans-serif; font-size:44px; color:#f472b6; line-height:1; }
        .ds-stat-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-top:2px; }

        /* HERO RIGHT — spotlight on active style */
        .ds-hero-right { display:flex; flex-direction:column; justify-content:center; padding:60px 56px; gap:24px; background:#0d0d18; }
        .ds-spotlight { border-radius:20px; overflow:hidden; border:1px solid rgba(255,255,255,0.08); transition:all 0.4s ease; flex-shrink:0; }
        .ds-spotlight-canvas { height:280px; position:relative; display:flex; align-items:center; justify-content:center; transition:background 0.5s ease; }
        .ds-spotlight-info { padding:20px 24px; background:#111; display:flex; align-items:center; justify-content:space-between; }
        .ds-spotlight-name { font-family:'Bebas Neue',sans-serif; font-size:24px; letter-spacing:0.04em; }
        .ds-spotlight-year { font-size:11px; color:rgba(255,255,255,0.3); letter-spacing:0.1em; }
        .ds-style-pills { display:flex; gap:8px; flex-wrap:wrap; }
        .ds-style-pill { padding:6px 14px; border-radius:999px; font-size:11px; cursor:pointer; border:1px solid rgba(255,255,255,0.1); background:transparent; color:rgba(255,255,255,0.35); font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.04em; }
        .ds-style-pill.active-pill { color:#fff; }

        /* SCROLL STRIP */
        .ds-strip { height:44px; overflow:hidden; border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.01); }
        .ds-strip-track { display:flex; width:max-content; animation:ds-scroll 28s linear infinite; height:100%; align-items:center; }
        @keyframes ds-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ds-strip-item { padding:0 20px; font-size:9px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.15); white-space:nowrap; border-right:0.5px solid rgba(255,255,255,0.05); height:100%; display:flex; align-items:center; gap:7px; }
        .ds-strip-dot { width:3px; height:3px; border-radius:50%; background:rgba(244,114,182,0.4); }

        /* STYLE GRID */
        .ds-styles-section { padding:72px 56px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .ds-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .ds-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; letter-spacing:0.02em; }
        .ds-section-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .ds-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:36px; max-width:520px; line-height:1.7; }
        .ds-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }

        /* LESSONS */
        .ds-lessons-section { border-top:1px solid rgba(255,255,255,0.06); }
        .ds-lessons-header { padding:40px 56px 0; display:flex; align-items:baseline; justify-content:space-between; }
        .ds-lessons-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; }
        .ds-lessons-prog-text { font-size:11px; color:rgba(255,255,255,0.22); }
        .ds-prog-track { height:1px; background:rgba(255,255,255,0.08); margin:24px 56px 0; }
        .ds-prog-track-fill { height:100%; background:#f472b6; transition:width 0.6s ease; }
        .ds-lessons-grid { display:grid; grid-template-columns:repeat(3,1fr); border-top:1px solid rgba(255,255,255,0.06); }
        .ds-lesson-col { border-right:1px solid rgba(255,255,255,0.06); padding:40px 36px; cursor:pointer; transition:background 0.2s; position:relative; overflow:hidden; min-height:260px; display:flex; flex-direction:column; }
        .ds-lesson-col:last-child { border-right:none; }
        .ds-lesson-col:hover { background:rgba(255,255,255,0.02); }
        .ds-lesson-col.active-col { background:rgba(255,255,255,0.03); }
        .ds-lesson-num { font-family:'Bebas Neue',sans-serif; font-size:52px; color:rgba(255,255,255,0.05); line-height:1; margin-bottom:20px; }
        .ds-lesson-col.active-col .ds-lesson-num { color:rgba(255,255,255,0.12); }
        .ds-lesson-title { font-size:14px; font-weight:500; color:rgba(255,255,255,0.7); line-height:1.4; margin-bottom:8px; flex:1; }
        .ds-lesson-col.active-col .ds-lesson-title { color:#fff; }
        .ds-lesson-dur { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:16px; }
        .ds-check { width:20px; height:20px; border-radius:50%; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:9px; color:#fff; transition:all 0.2s; border:1px solid rgba(255,255,255,0.15); margin-top:auto; }
        .ds-check.done { background:#f472b6; border-color:transparent; color:#fff; }
        .ds-lesson-line { position:absolute; bottom:0; left:0; height:2px; width:0; transition:width 0.3s; }
        .ds-lesson-col:hover .ds-lesson-line, .ds-lesson-col.active-col .ds-lesson-line { width:100%; }
        .ds-detail { border-top:1px solid rgba(255,255,255,0.06); display:grid; grid-template-columns:1fr 1fr; }
        .ds-detail-left { padding:48px 56px; border-right:1px solid rgba(255,255,255,0.06); }
        .ds-detail-num { font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:0.2em; color:rgba(255,255,255,0.2); margin-bottom:10px; }
        .ds-detail-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.4rem); color:#fff; margin-bottom:16px; }
        .ds-detail-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; margin-bottom:24px; }
        .ds-topics { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
        .ds-topic { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; padding:5px 12px; border-radius:2px; border:1px solid; }
        .ds-detail-right { padding:48px 56px; display:flex; flex-direction:column; justify-content:center; }
        .ds-actions { display:flex; gap:10px; }
        .ds-btn-start { padding:10px 24px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; border:1px solid; }
        .ds-btn-done { background:none; border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.3); padding:10px 18px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .ds-btn-done:hover { color:rgba(255,255,255,0.7); }
        .ds-btn-done.done { color:#86efac; border-color:rgba(134,239,172,0.3); }

        @media(max-width:900px) {
          .ds-hero { grid-template-columns:1fr; }
          .ds-hero-right { display:none; }
          .ds-grid { grid-template-columns:1fr 1fr; }
        }
      `}</style>

      <div className="ds-page">
        <nav className="ds-nav">
          <button className="ds-back" onClick={onBack}>
            ← Back
          </button>
          <span className="ds-nav-center">Design Styles</span>
          <div className="ds-prog-pill">
            <div className="ds-prog-bar">
              <div className="ds-prog-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>
              {completed.length}/{lessons.length}
            </span>
          </div>
        </nav>

        {/* HERO */}
        <div className="ds-hero" ref={heroRef}>
          <div className="ds-hero-left">
            <div className="ds-hero-glow" />
            <div className="ds-hero-eyebrow">Module 07 · Skills</div>
            <div className="ds-hero-title">
              DESIGN
              <br />
              <em>STYLES</em>
            </div>
            <p className="ds-hero-sub">
              Y2K. Brutalist. Clean. Vaporwave. Dark Academia. Every aesthetic
              has rules. Learn them — then break them on purpose.
            </p>
            <div className="ds-hero-stat-row">
              <div>
                <div className="ds-stat-num">6+</div>
                <div className="ds-stat-label">Aesthetics covered</div>
              </div>
              <div>
                <div className="ds-stat-num">∞</div>
                <div className="ds-stat-label">Combinations</div>
              </div>
              <div>
                <div className="ds-stat-num">0</div>
                <div className="ds-stat-label">Rules you can't break</div>
              </div>
            </div>
          </div>
          <div className="ds-hero-right">
            {/* SPOTLIGHT */}
            <div
              className="ds-spotlight"
              style={{ borderColor: `${current.accent}40` }}
            >
              <div
                className="ds-spotlight-canvas"
                style={{ background: current.bg }}
              >
                {current.preview.style === "chrome" && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 40,
                        background:
                          "linear-gradient(180deg,#fff 0%,#00ffff 40%,#fff 60%,#8888ff 100%)",
                        WebkitBackgroundClip: "text",
                        backgroundClip: "text",
                        color: "transparent",
                        display: "inline-block",
                        letterSpacing: 5,
                      }}
                    >
                      {current.preview.headline}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#00ffff",
                        letterSpacing: 4,
                        marginTop: 6,
                        textShadow: "0 0 10px #00ffff",
                      }}
                    >
                      {current.preview.sub}
                    </div>
                  </div>
                )}
                {current.preview.style === "minimal" && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontSize: 52,
                        color: "#000",
                        fontWeight: 400,
                      }}
                    >
                      {current.preview.headline}
                    </div>
                    <div
                      style={{
                        fontSize: 12,
                        color: "#aaa",
                        letterSpacing: 5,
                        marginTop: 10,
                      }}
                    >
                      {current.preview.sub}
                    </div>
                  </div>
                )}
                {current.preview.style === "brutal" && (
                  <div style={{ width: "100%", padding: "0 32px" }}>
                    <div
                      style={{
                        fontFamily: "Impact,sans-serif",
                        fontSize: 64,
                        color: "#ff0000",
                        lineHeight: 0.85,
                        textTransform: "uppercase",
                      }}
                    >
                      {current.preview.headline}
                    </div>
                    <div
                      style={{
                        fontFamily: "monospace",
                        fontSize: 11,
                        color: "#000",
                        marginTop: 8,
                        textDecoration: "underline",
                      }}
                    >
                      {current.preview.sub}
                    </div>
                  </div>
                )}
                {current.preview.style === "academia" && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'DM Serif Display',serif",
                        fontStyle: "italic",
                        fontSize: 44,
                        color: "#c8a96e",
                      }}
                    >
                      {current.preview.headline}
                    </div>
                    <div
                      style={{
                        width: 40,
                        height: 1,
                        background: "#c8a96e",
                        margin: "12px auto",
                      }}
                    />
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(200,169,110,0.5)",
                        letterSpacing: 5,
                      }}
                    >
                      {current.preview.sub}
                    </div>
                  </div>
                )}
                {current.preview.style === "soft" && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: "#e8eaf6",
                        boxShadow:
                          "10px 10px 20px #c5c8d6,-10px -10px 20px #ffffff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "0 auto 12px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "'DM Serif Display',serif",
                          fontSize: 24,
                          color: "#7986cb",
                        }}
                      >
                        {current.preview.headline}
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "#9fa8da",
                        letterSpacing: 3,
                      }}
                    >
                      {current.preview.sub}
                    </div>
                  </div>
                )}
                {current.preview.style === "vaporwave" && (
                  <div style={{ textAlign: "center" }}>
                    <div
                      style={{
                        fontFamily: "'DM Sans',sans-serif",
                        fontSize: 18,
                        color: "#ff71ce",
                        letterSpacing: 8,
                        textShadow: "0 0 14px #ff71ce,3px 3px 0 #01cdfe",
                        marginBottom: 8,
                      }}
                    >
                      {current.preview.headline}
                    </div>
                    <div
                      style={{
                        fontSize: 11,
                        color: "#b967ff",
                        letterSpacing: 4,
                        textShadow: "0 0 8px #b967ff",
                      }}
                    >
                      {current.preview.sub}
                    </div>
                    <div
                      style={{
                        marginTop: 14,
                        display: "flex",
                        justifyContent: "center",
                        gap: 3,
                      }}
                    >
                      {[..."▓▓░░▓░▓▓░"].map((c, i) => (
                        <span
                          key={i}
                          style={{
                            color:
                              i % 3 === 0
                                ? "#ff71ce"
                                : i % 3 === 1
                                  ? "#01cdfe"
                                  : "#b967ff",
                            fontSize: 10,
                          }}
                        >
                          {c}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              <div className="ds-spotlight-info">
                <div>
                  <div
                    className="ds-spotlight-name"
                    style={{ color: current.accent }}
                  >
                    {current.name}
                  </div>
                  <div className="ds-spotlight-year">{current.year}</div>
                </div>
                <div style={{ fontSize: 24 }}>{current.emoji}</div>
              </div>
            </div>
            {/* style pills */}
            <div className="ds-style-pills">
              {STYLE_PREVIEWS.map((s, i) => (
                <button
                  key={i}
                  className={`ds-style-pill${activeStyle === i ? " active-pill" : ""}`}
                  style={
                    activeStyle === i
                      ? {
                          borderColor: `${s.accent}60`,
                          background: `${s.accent}15`,
                          color: s.accent,
                        }
                      : {}
                  }
                  onClick={() => setActiveStyle(i)}
                >
                  {s.emoji} {s.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* STRIP */}
        <div className="ds-strip">
          <div className="ds-strip-track">
            {[...Array(3)]
              .flatMap(() => [
                "Y2K",
                "Brutalism",
                "Clean Minimal",
                "Vaporwave",
                "Dark Academia",
                "Soft UI",
                "Maximalism",
                "Bauhaus",
                "Swiss",
                "Memphis",
                "Grunge",
                "Retro Futurism",
              ])
              .map((item, i) => (
                <div key={i} className="ds-strip-item">
                  <span className="ds-strip-dot" />
                  {item}
                </div>
              ))}
          </div>
        </div>

        {/* STYLE GRID */}
        <div className="ds-styles-section">
          <div className="ds-section-header">
            <div className="ds-section-title">THE AESTHETICS</div>
            <div className="ds-section-line" />
          </div>
          <p className="ds-section-sub">
            Six distinct visual languages. Each one has rules, history, and a
            signature feel. Click to spotlight.
          </p>
          <div className="ds-grid">
            {STYLE_PREVIEWS.map((s, i) => (
              <StyleCard
                key={i}
                style={s}
                isActive={activeStyle === i}
                onClick={() => setActiveStyle(i)}
              />
            ))}
          </div>
        </div>

        {/* LESSONS */}
        <div className="ds-lessons-section">
          <div className="ds-lessons-header">
            <div className="ds-lessons-title">LESSONS</div>
            <div className="ds-lessons-prog-text">
              {completed.length} of {lessons.length} complete
            </div>
          </div>
          <div className="ds-prog-track">
            <div
              className="ds-prog-track-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="ds-lessons-grid">
            {lessons.map((lesson, i) => {
              const isDoneCard = completed.includes(lesson.id);
              const isActive = activeLesson === i;
              return (
                <div
                  key={lesson.id}
                  className={`ds-lesson-col${isActive ? " active-col" : ""}`}
                  onClick={() => setActiveLesson(i)}
                >
                  <div className="ds-lesson-num">{lesson.number}</div>
                  <div className="ds-lesson-title">{lesson.title}</div>
                  <div className="ds-lesson-dur">{lesson.duration}</div>
                  <button
                    className={`ds-check${isDoneCard ? " done" : ""}`}
                    onClick={(e) => toggleComplete(lesson.id, e)}
                  >
                    {isDoneCard ? "✓" : ""}
                  </button>
                  <div
                    className="ds-lesson-line"
                    style={{ background: lesson.accent }}
                  />
                </div>
              );
            })}
          </div>
          <div className="ds-detail">
            <div className="ds-detail-left">
              <div className="ds-detail-num">
                {active.number} — {active.duration}
              </div>
              <div className="ds-detail-title">{active.title}</div>
              <p className="ds-detail-desc">{active.description}</p>
              <div className="ds-topics">
                {active.topics.map((t, i) => (
                  <span
                    key={i}
                    className="ds-topic"
                    style={{
                      color: active.accent,
                      borderColor: `${active.accent}33`,
                      background: `${active.accent}0d`,
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="ds-detail-right">
              <div className="ds-actions">
                <button
                  className="ds-btn-start"
                  onClick={() => onNavigate && onNavigate(active.route)}
                  style={{
                    background: `${active.accent}18`,
                    borderColor: `${active.accent}55`,
                    color: active.accent,
                  }}
                >
                  {isDone ? "Review →" : "Start lesson →"}
                </button>
                <button
                  className={`ds-btn-done${isDone ? " done" : ""}`}
                  onClick={(e) => toggleComplete(active.id, e)}
                >
                  {isDone ? "✓ Done" : "Mark done"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
