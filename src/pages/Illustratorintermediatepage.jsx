import { useState, useEffect } from "react";
import { useProgress } from "../context/ProgressContext";

const lessons = [
  {
    id: 1,
    number: "01",
    title: "Shortcuts in Action",
    duration: "Video",
    description:
      "Watch the workflow in real time. Every shortcut used in context — no menus, no hesitation.",
    topics: ["Speed workflow", "Pro habits", "Zero mouse menus"],
    route: "ai-int-shortcuts",
    accent: "#f97316",
    tag: "WATCH",
  },
  {
    id: 2,
    number: "02",
    title: "Build a Logo",
    duration: "Video",
    description:
      "From rough sketch to finished vector mark. Real process, real decisions, real mistakes corrected live.",
    topics: ["Concept to vector", "Pen tool mastery", "Refinement process"],
    route: "ai-int-logo",
    accent: "#fb923c",
    tag: "WATCH",
  },
  {
    id: 3,
    number: "03",
    title: "Build a Poster",
    duration: "Video",
    description:
      "Typography, layout, colour — all inside Illustrator. See how the principles you've learned become a real deliverable.",
    topics: ["Layout in AI", "Type handling", "Export ready"],
    route: "ai-int-poster",
    accent: "#fdba74",
    tag: "WATCH",
  },
  {
    id: 4,
    number: "04",
    title: "More coming soon",
    duration: "—",
    description:
      "New tutorials added as the course grows. Check back regularly.",
    topics: ["Brand identity", "Illustration", "Pattern design"],
    route: null,
    accent: "#fcd34d",
    tag: "SOON",
  },
];

// Video card component
function VideoCard({ lesson, isActive, onClick, isDone, onToggle }) {
  const [hovered, setHovered] = useState(false);
  const isAvailable = lesson.route !== null;

  return (
    <div
      onClick={isAvailable ? onClick : undefined}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: 12,
        overflow: "hidden",
        border: `1px solid ${isActive ? `${lesson.accent}40` : hovered ? `${lesson.accent}20` : "rgba(255,255,255,0.07)"}`,
        cursor: isAvailable ? "pointer" : "default",
        transition: "all 0.25s",
        transform: hovered && isAvailable ? "translateY(-3px)" : "none",
        boxShadow: isActive ? `0 8px 32px ${lesson.accent}15` : "none",
        background: isActive ? `${lesson.accent}06` : "rgba(255,255,255,0.02)",
      }}
    >
      {/* thumbnail */}
      <div
        style={{
          height: 160,
          background: `linear-gradient(135deg, #0c0600, #1a0a00)`,
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        {/* grid */}
        {isAvailable && (
          <>
            {[25, 50, 75].map((p, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: `${p}%`,
                  height: "0.5px",
                  background: `rgba(249,115,22,0.07)`,
                }}
              />
            ))}
            {[33, 66].map((p, i) => (
              <div
                key={i}
                style={{
                  position: "absolute",
                  top: 0,
                  bottom: 0,
                  left: `${p}%`,
                  width: "0.5px",
                  background: `rgba(249,115,22,0.06)`,
                }}
              />
            ))}
          </>
        )}
        {/* play button */}
        {isAvailable ? (
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: "50%",
              border: `1px solid ${lesson.accent}60`,
              background: `${lesson.accent}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.2s",
              transform: hovered ? "scale(1.1)" : "scale(1)",
              boxShadow: hovered ? `0 0 24px ${lesson.accent}30` : "none",
            }}
          >
            <div
              style={{
                width: 0,
                height: 0,
                borderTop: "9px solid transparent",
                borderBottom: "9px solid transparent",
                borderLeft: `15px solid ${lesson.accent}`,
                marginLeft: 3,
              }}
            />
          </div>
        ) : (
          <div style={{ fontSize: 28, opacity: 0.2 }}>⏳</div>
        )}
        {/* lesson number bg */}
        <div
          style={{
            position: "absolute",
            right: -8,
            bottom: -16,
            fontFamily: "'Bebas Neue',sans-serif",
            fontSize: 80,
            color: `${lesson.accent}06`,
            lineHeight: 1,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {lesson.number}
        </div>
        {/* tag */}
        <div
          style={{
            position: "absolute",
            top: 10,
            left: 12,
            fontSize: 9,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            padding: "3px 8px",
            borderRadius: 3,
            border: `0.5px solid ${lesson.accent}40`,
            background: `${lesson.accent}12`,
            color: lesson.accent,
          }}
        >
          {lesson.tag}
        </div>
      </div>
      {/* info */}
      <div style={{ padding: "16px 18px" }}>
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
              fontSize: 16,
              color: isActive ? lesson.accent : "#fff",
              letterSpacing: "0.04em",
              transition: "color 0.2s",
            }}
          >
            {lesson.title}
          </div>
          {isAvailable && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggle(e);
              }}
              style={{
                width: 20,
                height: 20,
                borderRadius: "50%",
                border: `1px solid ${isDone ? "transparent" : lesson.accent + "30"}`,
                background: isDone ? lesson.accent : "none",
                cursor: "pointer",
                fontSize: 9,
                color: isDone ? "#0c0600" : "rgba(255,255,255,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "all 0.2s",
                flexShrink: 0,
              }}
            >
              {isDone ? "✓" : ""}
            </button>
          )}
        </div>
        <div
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,0.28)",
            lineHeight: 1.6,
          }}
        >
          {lesson.description}
        </div>
      </div>
    </div>
  );
}

export default function IllustratorIntermediatePage({ onBack, onNavigate }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const { getCompleted, toggleComplete: toggleCtx } = useProgress();
  const completed = getCompleted("ai-intermediate");
  const toggleComplete = (id, e) => {
    e.stopPropagation();
    toggleCtx("ai-intermediate", id);
  };
  const progress = Math.round(
    (completed.filter((id) => lessons.find((l) => l.id === id)?.route !== null)
      .length /
      lessons.filter((l) => l.route).length) *
      100,
  );
  const active = lessons[activeLesson];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .aii-page { min-height:100vh; background:#0c0600; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }

        .aii-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(12,6,0,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(249,115,22,0.1); z-index:200; }
        .aii-back { background:none; border:1px solid rgba(249,115,22,0.2); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .aii-back:hover { color:#f97316; border-color:rgba(249,115,22,0.5); }
        .aii-nav-center { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.14em; color:rgba(249,115,22,0.8); }
        .aii-prog-pill { display:flex; align-items:center; gap:10px; font-size:11px; color:rgba(255,255,255,0.3); }
        .aii-prog-bar { width:60px; height:1px; background:rgba(249,115,22,0.15); }
        .aii-prog-fill { height:100%; background:#f97316; transition:width 0.5s; }

        /* HERO */
        .aii-hero { min-height:100vh; display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(249,115,22,0.08); }
        .aii-hero-left { padding:80px 56px; display:flex; flex-direction:column; justify-content:center; border-right:1px solid rgba(249,115,22,0.08); position:relative; overflow:hidden; }
        .aii-hero-glow { position:absolute; inset:0; background:radial-gradient(ellipse at 15% 65%, rgba(249,115,22,0.09) 0%, transparent 55%); pointer-events:none; }
        .aii-hero-grid { position:absolute; inset:0; pointer-events:none; }
        .aii-hline { position:absolute; left:0; right:0; height:0.5px; background:linear-gradient(to right, transparent, rgba(249,115,22,0.05), transparent); }
        .aii-vline { position:absolute; top:0; bottom:0; width:0.5px; background:linear-gradient(to bottom, transparent, rgba(249,115,22,0.04), transparent); }
        .aii-eyebrow { font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(249,115,22,0.5); margin-bottom:20px; display:flex; align-items:center; gap:10px; position:relative; z-index:1; }
        .aii-eyebrow::before { content:''; width:24px; height:1px; background:rgba(249,115,22,0.4); }
        .aii-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4.5rem,9vw,9rem); line-height:0.82; letter-spacing:0.02em; color:#fff; margin-bottom:24px; position:relative; z-index:1; }
        .aii-hero-title em { display:block; color:#f97316; font-style:normal; }
        .aii-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:400px; position:relative; z-index:1; margin-bottom:40px; }
        .aii-hero-badge { display:inline-flex; align-items:center; gap:8px; padding:8px 16px; border-radius:4px; border:1px solid rgba(249,115,22,0.25); background:rgba(249,115,22,0.06); font-size:12px; color:rgba(249,115,22,0.8); position:relative; z-index:1; margin-bottom:28px; }
        .aii-badge-dot { width:6px; height:6px; border-radius:50%; background:#f97316; animation:aii-pulse 2s ease-in-out infinite; }
        @keyframes aii-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:0.5;transform:scale(0.8)} }
        .aii-hero-stats { display:flex; gap:28px; position:relative; z-index:1; }
        .aii-stat-num { font-family:'Bebas Neue',sans-serif; font-size:44px; color:#f97316; line-height:1; }
        .aii-stat-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-top:2px; }
        .aii-hero-num { position:absolute; right:-20px; bottom:-40px; font-family:'Bebas Neue',sans-serif; font-size:clamp(10rem,22vw,20rem); color:transparent; -webkit-text-stroke:1px rgba(249,115,22,0.05); line-height:1; pointer-events:none; user-select:none; }

        /* RIGHT SIDE — video preview stack */
        .aii-hero-right { background:#0c0600; padding:60px 56px; display:flex; flex-direction:column; justify-content:center; gap:12px; }
        .aii-right-label { font-size:9px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(249,115,22,0.4); margin-bottom:8px; }

        /* STRIP */
        .aii-strip { height:44px; overflow:hidden; border-bottom:1px solid rgba(249,115,22,0.06); background:rgba(249,115,22,0.02); }
        .aii-strip-track { display:flex; width:max-content; animation:aii-scroll 20s linear infinite; height:100%; align-items:center; }
        @keyframes aii-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .aii-strip-item { padding:0 24px; font-size:9px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(249,115,22,0.3); white-space:nowrap; border-right:0.5px solid rgba(249,115,22,0.06); height:100%; display:flex; align-items:center; gap:7px; }
        .aii-strip-dot { width:3px; height:3px; border-radius:50%; background:rgba(249,115,22,0.5); }

        /* HOW IT WORKS */
        .aii-how { display:grid; grid-template-columns:repeat(3,1fr); gap:1px; background:rgba(249,115,22,0.06); border-bottom:1px solid rgba(249,115,22,0.08); }
        .aii-how-cell { background:#0c0600; padding:40px 36px; }
        .aii-how-num { font-family:'Bebas Neue',sans-serif; font-size:48px; color:rgba(249,115,22,0.08); line-height:1; margin-bottom:12px; }
        .aii-how-title { font-size:15px; font-weight:500; color:#fff; margin-bottom:8px; }
        .aii-how-desc { font-size:12px; color:rgba(255,255,255,0.3); line-height:1.7; }

        /* TUTORIALS */
        .aii-tutorials { padding:72px 56px; border-bottom:1px solid rgba(249,115,22,0.06); }
        .aii-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .aii-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; }
        .aii-section-line { flex:1; height:1px; background:rgba(249,115,22,0.08); }
        .aii-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:36px; max-width:520px; line-height:1.7; }
        .aii-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }

        /* DETAIL */
        .aii-detail { border-top:1px solid rgba(249,115,22,0.06); display:grid; grid-template-columns:1fr 1fr; }
        .aii-detail-left { padding:48px 56px; border-right:1px solid rgba(249,115,22,0.06); }
        .aii-detail-num { font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:0.2em; color:rgba(249,115,22,0.4); margin-bottom:10px; }
        .aii-detail-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.4rem); color:#fff; margin-bottom:16px; }
        .aii-detail-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; margin-bottom:24px; }
        .aii-topics { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
        .aii-topic { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; padding:5px 12px; border-radius:2px; border:1px solid rgba(249,115,22,0.2); color:rgba(249,115,22,0.7); background:rgba(249,115,22,0.05); }
        .aii-detail-right { padding:48px 56px; display:flex; flex-direction:column; justify-content:center; }
        .aii-actions { display:flex; gap:10px; }
        .aii-btn-watch { padding:10px 24px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; border:1px solid rgba(249,115,22,0.4); background:rgba(249,115,22,0.1); color:#f97316; display:flex; align-items:center; gap:8px; }
        .aii-btn-watch:hover { background:rgba(249,115,22,0.18); }
        .aii-play-icon { width:0; height:0; border-top:"5px solid transparent"; border-bottom:"5px solid transparent"; borderLeft:"8px solid #f97316"; }
        .aii-btn-done { background:none; border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.3); padding:10px 18px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .aii-btn-done.done { color:#f97316; border-color:rgba(249,115,22,0.3); }

        @media(max-width:900px) {
          .aii-hero,.aii-detail { grid-template-columns:1fr; }
          .aii-hero-right { display:none; }
          .aii-grid { grid-template-columns:1fr; }
          .aii-how { grid-template-columns:1fr; }
        }
      `}</style>

      <div className="aii-page">
        <nav className="aii-nav">
          <button className="aii-back" onClick={onBack}>
            ← Back
          </button>
          <span className="aii-nav-center">Illustrator Intermediate</span>
          <div className="aii-prog-pill">
            <div className="aii-prog-bar">
              <div
                className="aii-prog-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>
              {completed.length}/{lessons.filter((l) => l.route).length}
            </span>
          </div>
        </nav>

        {/* HERO */}
        <div className="aii-hero">
          <div className="aii-hero-left">
            <div className="aii-hero-glow" />
            <div className="aii-hero-grid">
              {[20, 40, 60, 80].map((p, i) => (
                <div key={i} className="aii-hline" style={{ top: `${p}%` }} />
              ))}
              {[25, 50, 75].map((p, i) => (
                <div key={i} className="aii-vline" style={{ left: `${p}%` }} />
              ))}
            </div>
            <div className="aii-eyebrow">Module 08 · Illustrator</div>
            <div className="aii-hero-title">
              ILLUSTRATOR
              <br />
              <em>
                INTER-
                <br />
                MEDIATE
              </em>
            </div>
            <div className="aii-hero-badge">
              <div className="aii-badge-dot" />
              Video tutorials — watch in real time
            </div>
            <p className="aii-hero-sub">
              No slides. No theory. Watch the actual process — logo to export,
              poster to print-ready file. Real work, real decisions.
            </p>
            <div className="aii-hero-stats">
              <div>
                <div className="aii-stat-num">3</div>
                <div className="aii-stat-label">Tutorials</div>
              </div>
              <div>
                <div className="aii-stat-num">▶</div>
                <div className="aii-stat-label">Video format</div>
              </div>
              <div>
                <div className="aii-stat-num">+</div>
                <div className="aii-stat-label">More added</div>
              </div>
            </div>
            <div className="aii-hero-num">08</div>
          </div>

          {/* RIGHT — video cards preview */}
          <div className="aii-hero-right">
            <div className="aii-right-label">Tutorials in this module</div>
            {lessons
              .filter((l) => l.route)
              .slice(0, 3)
              .map((lesson, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: "12px 16px",
                    borderRadius: 8,
                    border: `1px solid rgba(249,115,22,0.1)`,
                    background: "rgba(249,115,22,0.03)",
                    cursor: "pointer",
                    transition: "all 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "rgba(249,115,22,0.25)";
                    e.currentTarget.style.background = "rgba(249,115,22,0.06)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "rgba(249,115,22,0.1)";
                    e.currentTarget.style.background = "rgba(249,115,22,0.03)";
                  }}
                  onClick={() => setActiveLesson(i)}
                >
                  {/* play */}
                  <div
                    style={{
                      width: 36,
                      height: 36,
                      borderRadius: "50%",
                      border: `1px solid ${lesson.accent}40`,
                      background: `${lesson.accent}10`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 0,
                        height: 0,
                        borderTop: "6px solid transparent",
                        borderBottom: "6px solid transparent",
                        borderLeft: `10px solid ${lesson.accent}`,
                        marginLeft: 2,
                      }}
                    />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: "'Bebas Neue',sans-serif",
                        fontSize: 15,
                        color: "#fff",
                        letterSpacing: "0.04em",
                        marginBottom: 2,
                      }}
                    >
                      {lesson.title}
                    </div>
                    <div
                      style={{
                        fontSize: 10,
                        color: "rgba(255,255,255,0.3)",
                        letterSpacing: "0.08em",
                      }}
                    >
                      Video tutorial
                    </div>
                  </div>
                  <div
                    style={{
                      fontSize: 9,
                      padding: "3px 8px",
                      border: `0.5px solid ${lesson.accent}40`,
                      color: lesson.accent,
                      borderRadius: 3,
                      letterSpacing: "0.1em",
                      flexShrink: 0,
                    }}
                  >
                    WATCH
                  </div>
                </div>
              ))}
            <div
              style={{
                padding: "12px 16px",
                borderRadius: 8,
                border: "1px solid rgba(255,255,255,0.05)",
                background: "rgba(255,255,255,0.02)",
                display: "flex",
                alignItems: "center",
                gap: 10,
              }}
            >
              <div style={{ fontSize: 16, opacity: 0.3 }}>+</div>
              <div style={{ fontSize: 12, color: "rgba(255,255,255,0.2)" }}>
                More tutorials added regularly
              </div>
            </div>
          </div>
        </div>

        {/* STRIP */}
        <div className="aii-strip">
          <div className="aii-strip-track">
            {[...Array(3)]
              .flatMap(() => [
                "Logo Design",
                "Poster Creation",
                "Shortcuts",
                "Pen Tool",
                "Pathfinder",
                "Export",
                "Typography",
                "Gradients",
                "Layers",
                "Symbols",
                "Effects",
                "Artboards",
              ])
              .map((item, i) => (
                <div key={i} className="aii-strip-item">
                  <span className="aii-strip-dot" />
                  {item}
                </div>
              ))}
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div className="aii-how">
          {[
            {
              num: "01",
              title: "Watch the process",
              desc: "Real screen recording. No slides, no PowerPoint. Watch the actual work being done in Illustrator.",
            },
            {
              num: "02",
              title: "Follow along",
              desc: "Open Illustrator while you watch. Pause, rewind, try it yourself. The best way to learn is to do it alongside.",
            },
            {
              num: "03",
              title: "Mark it done",
              desc: "When you've completed a tutorial, mark it. Your progress is saved and you can come back to review anytime.",
            },
          ].map((h, i) => (
            <div key={i} className="aii-how-cell">
              <div className="aii-how-num">{h.num}</div>
              <div className="aii-how-title">{h.title}</div>
              <div className="aii-how-desc">{h.desc}</div>
            </div>
          ))}
        </div>

        {/* TUTORIALS */}
        <div className="aii-tutorials">
          <div className="aii-section-header">
            <div className="aii-section-title">TUTORIALS</div>
            <div className="aii-section-line" />
          </div>
          <p className="aii-section-sub">
            Click a tutorial to see what's covered. Hit Watch to open the video
            lesson.
          </p>
          <div className="aii-grid">
            {lessons.map((lesson, i) => (
              <VideoCard
                key={lesson.id}
                lesson={lesson}
                isActive={activeLesson === i}
                onClick={() => setActiveLesson(i)}
                isDone={completed.includes(lesson.id)}
                onToggle={(e) => toggleComplete(lesson.id, e)}
              />
            ))}
          </div>
        </div>

        {/* DETAIL */}
        <div className="aii-detail">
          <div className="aii-detail-left">
            <div className="aii-detail-num">
              {active.number} — {active.tag}
            </div>
            <div className="aii-detail-title">{active.title}</div>
            <p className="aii-detail-desc">{active.description}</p>
            <div className="aii-topics">
              {active.topics.map((t, i) => (
                <span key={i} className="aii-topic">
                  {t}
                </span>
              ))}
            </div>
          </div>
          <div className="aii-detail-right">
            <div className="aii-actions">
              {active.route ? (
                <>
                  <button
                    className="aii-btn-watch"
                    onClick={() => onNavigate && onNavigate(active.route)}
                  >
                    ▶ Watch tutorial
                  </button>
                  <button
                    className={`aii-btn-done${completed.includes(active.id) ? " done" : ""}`}
                    onClick={(e) => toggleComplete(active.id, e)}
                  >
                    {completed.includes(active.id) ? "✓ Done" : "Mark done"}
                  </button>
                </>
              ) : (
                <div
                  style={{
                    fontSize: 13,
                    color: "rgba(255,255,255,0.25)",
                    fontStyle: "italic",
                    padding: "10px 0",
                  }}
                >
                  Coming soon — check back later.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
