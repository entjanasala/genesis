import { useState, useEffect } from "react";
import { useProgress } from "../../context/ProgressContext";

const lessons = [
  {
    id: 1,
    number: "01",
    title: "Rules of Typography",
    duration: "8 min",
    description:
      "The core principles every designer must know before touching a typeface.",
    topics: ["Readability first", "Consistency rules", "When to break rules"],
    route: "typography-rules",
    accent: "#c4b5fd",
    bg: "rgba(196,181,253,0.08)",
    border: "rgba(196,181,253,0.28)",
  },
  {
    id: 2,
    number: "02",
    title: "Which Fonts Go Together",
    duration: "9 min",
    description: "The science and intuition behind perfect font pairing.",
    topics: ["Contrast pairing", "Mood matching", "Classic combinations"],
    route: "typography-pairing",
    accent: "#6ee7b7",
    bg: "rgba(110,231,183,0.07)",
    border: "rgba(110,231,183,0.22)",
  },
  {
    id: 3,
    number: "03",
    title: "Kerning, Tracking & Leading",
    duration: "11 min",
    description:
      "The invisible adjustments that separate amateur from professional typography.",
    topics: ["Letter spacing", "Line height", "Optical kerning"],
    route: "typography-spacing",
    accent: "#a5f3fc",
    bg: "rgba(165,243,252,0.07)",
    border: "rgba(165,243,252,0.22)",
  },
  {
    id: 4,
    number: "04",
    title: "Contrast Between Fonts",
    duration: "8 min",
    description:
      "Using Thin, Regular, and Bold weights together to create dynamic layouts.",
    topics: ["Weight contrast", "Italic vs Roman", "Variable fonts"],
    route: "typography-contrast",
    accent: "#fde68a",
    bg: "rgba(253,230,138,0.07)",
    border: "rgba(253,230,138,0.22)",
  },
  {
    id: 5,
    number: "05",
    title: "Fonts on Different Backgrounds",
    duration: "7 min",
    description:
      "How background colour and texture affect type legibility and mood.",
    topics: ["Dark backgrounds", "Textured surfaces", "Colour contrast ratio"],
    route: "typography-backgrounds",
    accent: "#d8b4fe",
    bg: "rgba(216,180,254,0.07)",
    border: "rgba(216,180,254,0.22)",
  },
  {
    id: 6,
    number: "06",
    title: "Gradient & Styled Fonts",
    duration: "7 min",
    description:
      "Make type a visual element — gradients, outlines, and creative styling.",
    topics: ["CSS gradients on text", "Outlined type", "Blend modes"],
    route: "typography-gradient",
    accent: "#f472b6",
    bg: "rgba(244,114,182,0.07)",
    border: "rgba(244,114,182,0.22)",
  },
  {
    id: 7,
    number: "07",
    title: "Motion & Type Impact",
    duration: "9 min",
    description:
      "How movement and animation transform static type into memorable experiences.",
    topics: ["Entrance animations", "Kinetic typography", "Scroll effects"],
    route: "typography-motion",
    accent: "#fb7185",
    bg: "rgba(251,113,133,0.07)",
    border: "rgba(251,113,133,0.22)",
  },
  {
    id: 8,
    number: "08",
    title: "Filtering Font Categories",
    duration: "6 min",
    description:
      "Serif, Sans-serif, Display, Monospace — how to choose the right category.",
    topics: ["Serif vs Sans", "Display fonts", "Monospace use cases"],
    route: "typography-categories",
    accent: "#86efac",
    bg: "rgba(134,239,172,0.07)",
    border: "rgba(134,239,172,0.22)",
  },
];

const FONT_SHOWCASE = [
  {
    name: "Playfair Display",
    style: "serif",
    sample: "Aa",
    weight: 700,
    color: "#c4b5fd",
  },
  {
    name: "Inter",
    style: "sans-serif",
    sample: "Aa",
    weight: 400,
    color: "#7dd3fc",
  },
  {
    name: "DM Serif Display",
    style: "serif",
    sample: "Aa",
    weight: 400,
    color: "#f9a8d4",
  },
  {
    name: "Space Mono",
    style: "monospace",
    sample: "Aa",
    weight: 400,
    color: "#6ee7b7",
  },
  {
    name: "Cormorant",
    style: "serif",
    sample: "Aa",
    weight: 300,
    color: "#fdba74",
  },
  {
    name: "Syne",
    style: "sans-serif",
    sample: "Aa",
    weight: 800,
    color: "#f472b6",
  },
];

export default function TypographyPage({ onBack, onNavigate }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const [activeLesson, setActiveLesson] = useState(0);
  const { getCompleted, toggleComplete: toggleCtx } = useProgress();
  const completed = getCompleted("typography");
  const toggleComplete = (id, e) => {
    e.stopPropagation();
    toggleCtx("typography", id);
  };

  const progress = Math.round((completed.length / lessons.length) * 100);
  const active = lessons[activeLesson];
  const isDone = completed.includes(active.id);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&family=Playfair+Display:wght@700&family=Space+Mono&family=Cormorant:wght@300&family=Syne:wght@800&display=swap');

        .tp-page { min-height:100vh; background:#080010; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); position:relative; overflow-x:hidden; }
        .tp-blob { position:fixed; border-radius:50%; pointer-events:none; z-index:0; }

        /* NAV */
        .tp-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 36px; position:sticky; top:0; background:rgba(8,0,16,0.88); backdrop-filter:blur(20px); border-bottom:0.5px solid rgba(255,255,255,0.07); z-index:100; }
        .tp-back { display:flex; align-items:center; gap:7px; background:rgba(255,255,255,0.05); border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .tp-back:hover { background:rgba(255,255,255,0.09); color:#fff; }
        .tp-nav-title { font-family:'DM Serif Display',serif; font-size:17px; color:rgba(255,255,255,0.8); }
        .tp-prog-pill { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.04); border:0.5px solid rgba(255,255,255,0.08); padding:8px 16px; border-radius:999px; font-size:12px; color:rgba(255,255,255,0.35); }
        .tp-prog-track { width:70px; height:3px; background:rgba(255,255,255,0.07); border-radius:2px; overflow:hidden; }
        .tp-prog-fill { height:100%; background:linear-gradient(90deg,#c4b5fd,#f9a8d4); border-radius:2px; transition:width 0.4s ease; }

        /* HERO */
        .tp-hero { position:relative; z-index:1; max-width:900px; margin:0 auto; padding:60px 36px 52px; }
        .tp-eyebrow { font-size:10px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:12px; }
        .tp-hero-title { font-size:clamp(3rem,7vw,6rem); font-weight:400; line-height:1; letter-spacing:-0.03em; color:#fff; margin-bottom:20px; }
        .tp-hero-title em { font-style:italic; font-family:'Playfair Display',serif; color:#c4b5fd; }
        .tp-hero-sub { font-size:14px; color:rgba(255,255,255,0.3); line-height:1.8; max-width:440px; margin-bottom:48px; }

        /* FONT SHOWCASE */
        .tp-showcase { display:flex; gap:12px; overflow-x:auto; padding-bottom:4px; margin-bottom:52px; scrollbar-width:none; }
        .tp-showcase::-webkit-scrollbar { display:none; }
        .tp-showcase-card { flex-shrink:0; width:130px; height:130px; border-radius:18px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:8px; cursor:default; border:1px solid; transition:transform 0.2s; }
        .tp-showcase-card:hover { transform:translateY(-3px); }
        .tp-showcase-sample { font-size:52px; line-height:1; }
        .tp-showcase-name { font-size:9px; letter-spacing:0.1em; text-transform:uppercase; opacity:0.5; text-align:center; }

        /* MAIN CONTENT */
        .tp-main { position:relative; z-index:1; max-width:900px; margin:0 auto; padding:0 36px 80px; }
        .tp-section-eyebrow { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:6px; }
        .tp-section-title { font-family:'DM Serif Display',serif; font-size:26px; color:rgba(255,255,255,0.88); margin-bottom:22px; letter-spacing:-0.01em; }

        /* PROGRESS BAR */
        .tp-prog-full { display:flex; align-items:center; gap:16px; margin-bottom:28px; }
        .tp-prog-full-track { flex:1; height:3px; background:rgba(255,255,255,0.06); border-radius:2px; overflow:hidden; }
        .tp-prog-full-fill { height:100%; background:linear-gradient(90deg,#c4b5fd,#f9a8d4); border-radius:2px; transition:width 0.5s cubic-bezier(0.16,1,0.3,1); }
        .tp-prog-label { font-size:11px; color:rgba(255,255,255,0.22); white-space:nowrap; }

        /* LESSONS GRID */
        .tp-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:10px; margin-bottom:28px; }

        @media (max-width:640px) { .tp-grid { grid-template-columns:repeat(2,1fr); } }

        .tp-card { border-radius:16px; padding:18px 16px; cursor:pointer; transition:all 0.22s ease; position:relative; }
        .tp-card-num { font-size:10px; letter-spacing:0.1em; margin-bottom:24px; }
        .tp-card-title { font-family:'DM Serif Display',serif; font-size:14px; font-weight:400; color:rgba(255,255,255,0.88); line-height:1.3; margin-bottom:10px; }
        .tp-card-dur { font-size:10px; letter-spacing:0.05em; opacity:0.6; }
        .tp-card-check { position:absolute; top:12px; right:12px; width:20px; height:20px; border-radius:50%; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; transition:all 0.2s; border:1px solid rgba(255,255,255,0.12); }
        .tp-card-check.done { background:linear-gradient(135deg,#c4b5fd,#f9a8d4); border-color:transparent; }

        /* NAV DOTS */
        .tp-dots { display:flex; gap:5px; margin-bottom:24px; justify-content:center; flex-wrap:wrap; }
        .tp-dot { width:5px; height:5px; border-radius:50%; background:rgba(255,255,255,0.1); cursor:pointer; transition:all 0.2s; border:none; padding:0; }
        .tp-dot.active { background:#c4b5fd; transform:scale(1.4); }
        .tp-dot.done { background:#6ee7b7; }

        /* DETAIL */
        .tp-detail { background:rgba(255,255,255,0.03); border:0.5px solid rgba(196,181,253,0.18); border-radius:20px; padding:28px; }
        .tp-detail-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:14px; flex-wrap:wrap; gap:12px; }
        .tp-detail-num { font-size:11px; color:rgba(255,255,255,0.18); letter-spacing:0.1em; margin-bottom:5px; }
        .tp-detail-title { font-family:'DM Serif Display',serif; font-size:24px; color:#fff; letter-spacing:-0.01em; }
        .tp-detail-desc { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.8; margin-bottom:20px; }
        .tp-detail-topics { display:flex; flex-wrap:wrap; gap:7px; margin-bottom:24px; }
        .tp-topic { font-size:11px; padding:4px 12px; border-radius:999px; }
        .tp-detail-actions { display:flex; gap:10px; align-items:center; }
        .tp-btn-start { border:0.5px solid; padding:9px 22px; border-radius:999px; font-size:13px; font-weight:500; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .tp-btn-done { background:none; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.35); padding:9px 18px; border-radius:999px; font-size:13px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .tp-btn-done:hover { color:rgba(255,255,255,0.7); border-color:rgba(255,255,255,0.2); }
        .tp-btn-done.done { color:#6ee7b7; border-color:rgba(110,231,183,0.3); }

        /* TYPE QUOTE */
        .tp-quote { margin-bottom:52px; padding:32px; border-radius:20px; background:rgba(255,255,255,0.02); border:0.5px solid rgba(255,255,255,0.06); position:relative; overflow:hidden; }
        .tp-quote-text { font-family:'Playfair Display',serif; font-size:clamp(1.4rem,3vw,2.2rem); font-weight:700; line-height:1.3; color:rgba(255,255,255,0.88); margin-bottom:12px; }
        .tp-quote-text span { color:#c4b5fd; }
        .tp-quote-attr { font-size:12px; color:rgba(255,255,255,0.25); letter-spacing:0.08em; }
        .tp-quote-bg { position:absolute; right:-20px; bottom:-30px; font-size:160px; opacity:0.02; font-family:'Playfair Display',serif; font-weight:700; line-height:1; pointer-events:none; }
      `}</style>

      <div className="tp-page">
        <div
          className="tp-blob"
          style={{
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle,rgba(196,181,253,0.07) 0%,transparent 70%)",
            top: -200,
            left: -200,
          }}
        />
        <div
          className="tp-blob"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle,rgba(249,168,212,0.06) 0%,transparent 70%)",
            bottom: 0,
            right: -100,
          }}
        />

        <nav className="tp-nav">
          <button className="tp-back" onClick={onBack}>
            ← Back
          </button>
          <span className="tp-nav-title">Typography</span>
          <div className="tp-prog-pill">
            <div className="tp-prog-track">
              <div className="tp-prog-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>
              {completed.length}/{lessons.length}
            </span>
          </div>
        </nav>

        {/* HERO */}
        <div className="tp-hero">
          <div className="tp-eyebrow">Module 02 · Foundation</div>
          <div className="tp-hero-title">
            The Art of
            <br />
            <em>Type</em>
          </div>
          <p className="tp-hero-sub">
            Typography is 95% of design. Learn to choose, pair, space, and
            express with type — from the basics to the advanced.
          </p>

          {/* Font showcase */}
          <div className="tp-showcase">
            {FONT_SHOWCASE.map((f, i) => (
              <div
                key={i}
                className="tp-showcase-card"
                style={{
                  background: `${f.color}10`,
                  borderColor: `${f.color}30`,
                  color: f.color,
                }}
              >
                <div
                  className="tp-showcase-sample"
                  style={{ fontFamily: f.name, fontWeight: f.weight }}
                >
                  {f.sample}
                </div>
                <div className="tp-showcase-name">{f.name}</div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div className="tp-quote">
            <div className="tp-quote-text">
              Typography is the <span>craft of endowing human language</span>{" "}
              with a durable visual form.
            </div>
            <div className="tp-quote-attr">— Robert Bringhurst</div>
            <div className="tp-quote-bg">"</div>
          </div>
        </div>

        {/* LESSONS */}
        <div className="tp-main">
          <div className="tp-section-eyebrow">Module 02</div>
          <div className="tp-section-title">Lessons</div>

          <div className="tp-prog-full">
            <div className="tp-prog-full-track">
              <div
                className="tp-prog-full-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="tp-prog-label">
              {completed.length} of {lessons.length} done
            </span>
          </div>

          {/* GRID */}
          <div className="tp-grid">
            {lessons.map((lesson, i) => {
              const isDoneCard = completed.includes(lesson.id);
              const isActive = activeLesson === i;
              return (
                <div
                  key={lesson.id}
                  className="tp-card"
                  onClick={() => setActiveLesson(i)}
                  style={{
                    background: isActive
                      ? lesson.bg.replace("0.07", "0.14")
                      : lesson.bg,
                    border: `1px solid ${isActive ? lesson.accent + "88" : lesson.border}`,
                    boxShadow: isActive ? `0 8px 28px ${lesson.bg}` : "none",
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = lesson.bg.replace(
                        "0.07",
                        "0.11",
                      );
                      e.currentTarget.style.borderColor = lesson.accent + "55";
                      e.currentTarget.style.transform = "translateY(-2px)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = lesson.bg;
                      e.currentTarget.style.borderColor = lesson.border;
                      e.currentTarget.style.transform = "translateY(0)";
                    }
                  }}
                >
                  <button
                    className={`tp-card-check${isDoneCard ? " done" : ""}`}
                    onClick={(e) => toggleComplete(lesson.id, e)}
                    style={{
                      borderColor: isDoneCard
                        ? "transparent"
                        : `${lesson.accent}44`,
                    }}
                  >
                    {isDoneCard ? "✓" : ""}
                  </button>
                  <div className="tp-card-num" style={{ color: lesson.accent }}>
                    {lesson.number}
                  </div>
                  <div className="tp-card-title">{lesson.title}</div>
                  <div className="tp-card-dur" style={{ color: lesson.accent }}>
                    {lesson.duration} read
                  </div>
                </div>
              );
            })}
          </div>

          {/* DOTS */}
          <div className="tp-dots">
            {lessons.map((lesson, i) => (
              <button
                key={i}
                className={`tp-dot${activeLesson === i ? " active" : ""}${completed.includes(lesson.id) ? " done" : ""}`}
                onClick={() => setActiveLesson(i)}
              />
            ))}
          </div>

          {/* DETAIL */}
          <div className="tp-detail">
            <div className="tp-detail-header">
              <div>
                <div className="tp-detail-num">{active.number}</div>
                <div className="tp-detail-title">{active.title}</div>
              </div>
              <span style={{ fontSize: 12, color: "rgba(255,255,255,0.22)" }}>
                {active.duration} read
              </span>
            </div>
            <p className="tp-detail-desc">{active.description}</p>
            <div className="tp-detail-topics">
              {active.topics.map((t, i) => (
                <span
                  key={i}
                  className="tp-topic"
                  style={{
                    color: active.accent,
                    background: `${active.accent}14`,
                    border: `0.5px solid ${active.accent}33`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="tp-detail-actions">
              <button
                className="tp-btn-start"
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
                className={`tp-btn-done${isDone ? " done" : ""}`}
                onClick={(e) => toggleComplete(active.id, e)}
              >
                {isDone ? "✓ Completed" : "Mark complete"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
