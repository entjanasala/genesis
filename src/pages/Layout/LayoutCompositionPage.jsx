import { useState, useEffect, useRef } from "react";
import { useProgress } from "../../context/ProgressContext";

const lessons = [
  {
    id: 1,
    number: "01",
    title: "Grid & Alignment",
    duration: "12 min",
    description:
      "The invisible skeleton that holds every great design together. Learn how grids create rhythm, consistency, and visual confidence.",
    topics: ["Column grids", "Baseline grids", "Optical alignment"],
    route: "layout-grid",
    accent: "#a5f3fc",
    bg: "rgba(165,243,252,0.07)",
    border: "rgba(165,243,252,0.22)",
  },
  {
    id: 2,
    number: "02",
    title: "Proximity & Grouping",
    duration: "9 min",
    description:
      "Things that belong together should live together. Discover how spatial proximity communicates relationship and meaning without words.",
    topics: ["Gestalt principles", "White space as glue", "Visual chunking"],
    route: "layout-proximity",
    accent: "#86efac",
    bg: "rgba(134,239,172,0.07)",
    border: "rgba(134,239,172,0.22)",
  },
  {
    id: 3,
    number: "03",
    title: "Visual Balance",
    duration: "11 min",
    description:
      "Symmetry is safe. Asymmetry is interesting. Learn to create tension and resolution through deliberate visual weight distribution.",
    topics: ["Symmetry vs asymmetry", "Visual weight", "Rule of thirds"],
    route: "layout-balance",
    accent: "#fda4af",
    bg: "rgba(253,164,175,0.07)",
    border: "rgba(253,164,175,0.22)",
  },
];

export default function LayoutCompositionPage({ onBack, onNavigate }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [hoveredPrinciple, setHoveredPrinciple] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 50, y: 40 });
  const heroRef = useRef(null);
  const { getCompleted, toggleComplete: toggleCtx } = useProgress();
  const completed = getCompleted("layout-composition");
  const toggleComplete = (id, e) => {
    e.stopPropagation();
    toggleCtx("layout-composition", id);
  };

  const progress = Math.round((completed.length / lessons.length) * 100);
  const active = lessons[activeLesson];
  const isDone = completed.includes(active.id);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const handleMove = (e) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({
        x: ((e.clientX - rect.left) / rect.width) * 100,
        y: ((e.clientY - rect.top) / rect.height) * 100,
      });
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  const principles = [
    {
      label: "Alignment",
      icon: "⊟",
      desc: "Everything connects to an invisible line",
    },
    { label: "Proximity", icon: "◎", desc: "Close things belong together" },
    { label: "Repetition", icon: "⊞", desc: "Consistency builds trust" },
    { label: "Contrast", icon: "◑", desc: "Difference creates hierarchy" },
    { label: "Balance", icon: "⊜", desc: "Visual weight in equilibrium" },
    { label: "Space", icon: "□", desc: "Nothing is always something" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display:ital@0;1&display=swap');

        .lc-page { min-height:100vh; background:#06080f; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.85); overflow-x:hidden; }

        .lc-nav { display:flex; align-items:center; justify-content:space-between; padding:18px 48px; position:sticky; top:0; background:rgba(6,8,15,0.9); backdrop-filter:blur(24px); border-bottom:0.5px solid rgba(255,255,255,0.06); z-index:100; }
        .lc-back { display:flex; align-items:center; gap:8px; background:none; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.45); padding:8px 20px; border-radius:999px; cursor:pointer; font-size:13px; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .lc-back:hover { color:#fff; border-color:rgba(255,255,255,0.25); }
        .lc-nav-center { font-family:'DM Serif Display',serif; font-size:16px; color:rgba(255,255,255,0.6); letter-spacing:0.02em; }
        .lc-prog-pill { display:flex; align-items:center; gap:10px; background:rgba(255,255,255,0.03); border:0.5px solid rgba(255,255,255,0.07); padding:8px 16px; border-radius:999px; font-size:12px; color:rgba(255,255,255,0.3); }
        .lc-prog-bar { width:72px; height:2px; background:rgba(255,255,255,0.08); border-radius:1px; overflow:hidden; }
        .lc-prog-bar-fill { height:100%; background:linear-gradient(90deg,#a5f3fc,#86efac); border-radius:1px; transition:width 0.5s ease; }

        .lc-hero { position:relative; width:100%; min-height:90vh; display:flex; flex-direction:column; justify-content:center; padding:80px 48px; overflow:hidden; }
        .lc-hero-bg { position:absolute; inset:0; pointer-events:none; z-index:0; transition:background 0.15s ease; }
        .lc-hero-lines { position:absolute; inset:0; pointer-events:none; z-index:0; }
        .lc-h-line { position:absolute; left:0; right:0; height:0.5px; background:linear-gradient(to right, transparent 5%, rgba(165,243,252,0.08) 30%, rgba(165,243,252,0.08) 70%, transparent 95%); }
        .lc-v-line { position:absolute; top:0; bottom:0; width:0.5px; background:linear-gradient(to bottom, transparent 10%, rgba(165,243,252,0.06) 40%, rgba(165,243,252,0.06) 60%, transparent 90%); }
        .lc-hero-content { position:relative; z-index:2; max-width:700px; }
        .lc-eyebrow { font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.2); margin-bottom:20px; display:flex; align-items:center; gap:12px; }
        .lc-eyebrow::after { content:''; flex:0 0 48px; height:0.5px; background:rgba(255,255,255,0.2); }
        .lc-hero-title { font-family:'DM Serif Display',serif; font-size:clamp(3.5rem,8vw,7rem); font-weight:400; line-height:0.95; letter-spacing:-0.03em; color:#fff; margin-bottom:28px; }
        .lc-hero-title em { font-style:italic; color:#a5f3fc; display:block; }
        .lc-hero-sub { font-size:15px; color:rgba(255,255,255,0.35); line-height:1.8; max-width:480px; }
        .lc-hero-module-num { position:absolute; right:48px; top:50%; transform:translateY(-50%); font-family:'DM Serif Display',serif; font-size:clamp(8rem,20vw,18rem); font-weight:400; color:transparent; -webkit-text-stroke:0.5px rgba(165,243,252,0.1); line-height:1; z-index:1; pointer-events:none; letter-spacing:-0.05em; user-select:none; }

        .lc-principles { display:grid; grid-template-columns:repeat(6,1fr); border-top:0.5px solid rgba(255,255,255,0.06); border-bottom:0.5px solid rgba(255,255,255,0.06); }
        .lc-principle { padding:28px 24px; border-right:0.5px solid rgba(255,255,255,0.06); cursor:pointer; transition:background 0.2s; position:relative; overflow:hidden; }
        .lc-principle:last-child { border-right:none; }
        .lc-principle:hover, .lc-principle.active-p { background:rgba(165,243,252,0.05); }
        .lc-principle-icon { font-size:20px; margin-bottom:10px; display:block; color:rgba(255,255,255,0.3); transition:color 0.2s; }
        .lc-principle:hover .lc-principle-icon { color:#a5f3fc; }
        .lc-principle-label { font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.35); margin-bottom:6px; font-weight:500; }
        .lc-principle-desc { font-size:11px; color:rgba(255,255,255,0.2); line-height:1.6; max-height:0; overflow:hidden; transition:max-height 0.3s ease,opacity 0.3s; opacity:0; }
        .lc-principle:hover .lc-principle-desc, .lc-principle.active-p .lc-principle-desc { max-height:60px; opacity:1; }
        .lc-principle-line { position:absolute; bottom:0; left:0; height:1.5px; width:0; background:linear-gradient(to right,#a5f3fc,transparent); transition:width 0.3s ease; }
        .lc-principle:hover .lc-principle-line, .lc-principle.active-p .lc-principle-line { width:100%; }

        .lc-lessons-wrap { display:grid; grid-template-columns:1fr 1fr; min-height:80vh; border-top:0.5px solid rgba(255,255,255,0.06); }
        .lc-lessons-left { border-right:0.5px solid rgba(255,255,255,0.06); padding:60px 48px; }
        .lc-lessons-header { display:flex; align-items:baseline; justify-content:space-between; margin-bottom:36px; }
        .lc-lessons-title { font-family:'DM Serif Display',serif; font-size:32px; color:#fff; letter-spacing:-0.02em; }
        .lc-prog-text { font-size:12px; color:rgba(255,255,255,0.22); }
        .lc-full-bar { height:2px; background:rgba(255,255,255,0.06); border-radius:1px; overflow:hidden; margin-bottom:40px; }
        .lc-full-bar-fill { height:100%; background:linear-gradient(90deg,#a5f3fc,#86efac); border-radius:1px; transition:width 0.6s cubic-bezier(0.16,1,0.3,1); }

        .lc-lesson-card { display:flex; gap:20px; align-items:flex-start; padding:24px 0; border-bottom:0.5px solid rgba(255,255,255,0.05); cursor:pointer; transition:all 0.2s; position:relative; }
        .lc-lesson-card:first-of-type { border-top:0.5px solid rgba(255,255,255,0.05); }
        .lc-lesson-card:hover, .lc-lesson-card.active-lesson { padding-left:8px; }
        .lc-lesson-left-border { position:absolute; left:0; top:0; bottom:0; width:1.5px; transform:scaleY(0); transform-origin:top; transition:transform 0.3s cubic-bezier(0.16,1,0.3,1); }
        .lc-lesson-card.active-lesson .lc-lesson-left-border, .lc-lesson-card:hover .lc-lesson-left-border { transform:scaleY(1); }
        .lc-lesson-num { font-size:11px; color:rgba(255,255,255,0.18); letter-spacing:0.1em; padding-top:2px; flex-shrink:0; width:28px; }
        .lc-lesson-body { flex:1; }
        .lc-lesson-title { font-family:'DM Serif Display',serif; font-size:20px; color:rgba(255,255,255,0.88); margin-bottom:5px; letter-spacing:-0.01em; transition:color 0.2s; }
        .lc-lesson-card:hover .lc-lesson-title, .lc-lesson-card.active-lesson .lc-lesson-title { color:#fff; }
        .lc-lesson-dur { font-size:11px; color:rgba(255,255,255,0.22); }
        .lc-lesson-right { display:flex; flex-direction:column; align-items:flex-end; gap:8px; flex-shrink:0; }
        .lc-check { width:22px; height:22px; border-radius:50%; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:10px; color:#fff; transition:all 0.2s; border:1px solid rgba(255,255,255,0.12); }
        .lc-check.done { background:linear-gradient(135deg,#a5f3fc,#86efac); border-color:transparent; }

        .lc-lessons-right { padding:60px 48px; display:flex; flex-direction:column; justify-content:flex-start; position:sticky; top:64px; max-height:calc(100vh - 64px); }
        .lc-detail-eyebrow { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(255,255,255,0.18); margin-bottom:16px; display:flex; align-items:center; gap:10px; }
        .lc-detail-eyebrow::after { content:''; flex:1; height:0.5px; background:rgba(255,255,255,0.08); }
        .lc-detail-title { font-family:'DM Serif Display',serif; font-size:clamp(1.8rem,3vw,2.8rem); color:#fff; letter-spacing:-0.02em; line-height:1.1; margin-bottom:20px; }
        .lc-detail-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; margin-bottom:28px; }
        .lc-topics { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:36px; }
        .lc-topic { font-size:11px; padding:5px 14px; border-radius:999px; border:0.5px solid; cursor:default; }
        .lc-actions { display:flex; gap:10px; align-items:center; }
        .lc-btn-start { padding:10px 24px; border-radius:999px; font-size:13px; font-weight:500; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; border:0.5px solid; }
        .lc-btn-done { background:none; border:0.5px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.3); padding:10px 20px; border-radius:999px; font-size:13px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .lc-btn-done:hover { color:rgba(255,255,255,0.7); border-color:rgba(255,255,255,0.2); }
        .lc-btn-done.done { color:#86efac; border-color:rgba(134,239,172,0.3); }
        .lc-detail-vline { width:0.5px; height:48px; background:linear-gradient(to bottom,rgba(165,243,252,0.3),transparent); margin-bottom:28px; }

        .lc-grid-demo { border-top:0.5px solid rgba(255,255,255,0.06); padding:80px 48px; }
        .lc-grid-demo-title { font-family:'DM Serif Display',serif; font-size:clamp(1.8rem,3vw,2.4rem); color:#fff; margin-bottom:10px; letter-spacing:-0.02em; }
        .lc-grid-demo-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:48px; }
        .lc-grid-visual { position:relative; height:180px; border:0.5px solid rgba(255,255,255,0.08); border-radius:12px; overflow:hidden; background:rgba(255,255,255,0.02); }
        .lc-col-line { position:absolute; top:0; bottom:0; width:0.5px; background:rgba(165,243,252,0.12); }
        .lc-gutter { position:absolute; top:0; bottom:0; background:rgba(165,243,252,0.04); }
        .lc-grid-label { position:absolute; bottom:12px; left:50%; transform:translateX(-50%); font-size:10px; letter-spacing:0.12em; text-transform:uppercase; color:rgba(255,255,255,0.18); }
        .lc-grid-tabs { display:flex; gap:8px; margin-bottom:20px; }
        .lc-grid-tab { padding:6px 16px; border-radius:999px; font-size:12px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all 0.2s; border:0.5px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.35); }
        .lc-grid-tab.active-tab { background:rgba(165,243,252,0.1); border-color:rgba(165,243,252,0.3); color:#a5f3fc; }

        @media (max-width:768px) {
          .lc-lessons-wrap { grid-template-columns:1fr; }
          .lc-principles { grid-template-columns:repeat(3,1fr); }
          .lc-lessons-right { position:static; max-height:none; border-top:0.5px solid rgba(255,255,255,0.06); }
        }
      `}</style>

      <div className="lc-page">
        <nav className="lc-nav">
          <button className="lc-back" onClick={onBack}>
            ← Back
          </button>
          <span className="lc-nav-center">Layout & Composition</span>
          <div className="lc-prog-pill">
            <div className="lc-prog-bar">
              <div
                className="lc-prog-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span>
              {completed.length}/{lessons.length}
            </span>
          </div>
        </nav>

        <div className="lc-hero" ref={heroRef}>
          <div
            className="lc-hero-bg"
            style={{
              background: `radial-gradient(ellipse at ${mousePos.x}% ${mousePos.y}%, rgba(165,243,252,0.06) 0%, transparent 55%),
                           radial-gradient(ellipse at 80% 80%, rgba(134,239,172,0.05) 0%, transparent 50%)`,
            }}
          />
          <div className="lc-hero-lines">
            {[20, 40, 60, 80].map((pct, i) => (
              <div key={i} className="lc-h-line" style={{ top: `${pct}%` }} />
            ))}
            {[16.66, 33.33, 50, 66.66, 83.33].map((pct, i) => (
              <div key={i} className="lc-v-line" style={{ left: `${pct}%` }} />
            ))}
          </div>
          <div className="lc-hero-module-num">03</div>
          <div className="lc-hero-content">
            <div className="lc-eyebrow">Module 03 · Foundation</div>
            <h1 className="lc-hero-title">
              Layout &<br />
              <em>Composition</em>
            </h1>
            <p className="lc-hero-sub">
              Every great design is a grid in disguise. Learn the invisible
              structures that make layouts feel inevitable — not accidental.
            </p>
          </div>
        </div>

        <div className="lc-principles">
          {principles.map((p, i) => (
            <div
              key={i}
              className={`lc-principle${hoveredPrinciple === i ? " active-p" : ""}`}
              onMouseEnter={() => setHoveredPrinciple(i)}
              onMouseLeave={() => setHoveredPrinciple(null)}
            >
              <span className="lc-principle-icon">{p.icon}</span>
              <div className="lc-principle-label">{p.label}</div>
              <div className="lc-principle-desc">{p.desc}</div>
              <div className="lc-principle-line" />
            </div>
          ))}
        </div>

        <div className="lc-lessons-wrap">
          <div className="lc-lessons-left">
            <div className="lc-lessons-header">
              <div className="lc-lessons-title">Lessons</div>
              <div className="lc-prog-text">
                {completed.length} of {lessons.length} done
              </div>
            </div>
            <div className="lc-full-bar">
              <div
                className="lc-full-bar-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            {lessons.map((lesson, i) => {
              const isDoneCard = completed.includes(lesson.id);
              const isActive = activeLesson === i;
              return (
                <div
                  key={lesson.id}
                  className={`lc-lesson-card${isActive ? " active-lesson" : ""}`}
                  onClick={() => setActiveLesson(i)}
                >
                  <div
                    className="lc-lesson-left-border"
                    style={{
                      background: `linear-gradient(to bottom, ${lesson.accent}, transparent)`,
                    }}
                  />
                  <div className="lc-lesson-num">{lesson.number}</div>
                  <div className="lc-lesson-body">
                    <div className="lc-lesson-title">{lesson.title}</div>
                    <div className="lc-lesson-dur">{lesson.duration} read</div>
                  </div>
                  <div className="lc-lesson-right">
                    <button
                      className={`lc-check${isDoneCard ? " done" : ""}`}
                      onClick={(e) => toggleComplete(lesson.id, e)}
                      style={{
                        borderColor: isDoneCard
                          ? "transparent"
                          : `${lesson.accent}44`,
                      }}
                    >
                      {isDoneCard ? "✓" : ""}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="lc-lessons-right">
            <div className="lc-detail-vline" />
            <div className="lc-detail-eyebrow">{active.number}</div>
            <div className="lc-detail-title">{active.title}</div>
            <p className="lc-detail-desc">{active.description}</p>
            <div className="lc-topics">
              {active.topics.map((t, i) => (
                <span
                  key={i}
                  className="lc-topic"
                  style={{
                    color: active.accent,
                    background: `${active.accent}12`,
                    borderColor: `${active.accent}33`,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="lc-actions">
              <button
                className="lc-btn-start"
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
                className={`lc-btn-done${isDone ? " done" : ""}`}
                onClick={(e) => toggleComplete(active.id, e)}
              >
                {isDone ? "✓ Completed" : "Mark complete"}
              </button>
            </div>
          </div>
        </div>

        <GridDemo />
      </div>
    </>
  );
}

function GridDemo() {
  const [cols, setCols] = useState(12);
  const [activeTab, setActiveTab] = useState("12-col");
  const grids = [
    { label: "12-col", cols: 12 },
    { label: "8-col", cols: 8 },
    { label: "4-col", cols: 4 },
    { label: "3-col", cols: 3 },
  ];

  return (
    <div className="lc-grid-demo">
      <div className="lc-grid-demo-title">Interactive Grid System</div>
      <p className="lc-grid-demo-sub">
        Click the buttons to switch between grid types.
      </p>
      <div className="lc-grid-tabs">
        {grids.map((g, i) => (
          <button
            key={i}
            className={`lc-grid-tab${activeTab === g.label ? " active-tab" : ""}`}
            onClick={() => {
              setActiveTab(g.label);
              setCols(g.cols);
            }}
          >
            {g.label}
          </button>
        ))}
      </div>
      <div className="lc-grid-visual">
        {Array.from({ length: cols }).map((_, i) => (
          <div
            key={i}
            className="lc-gutter"
            style={{
              left: `${(i / cols) * 100 + 0.2}%`,
              width: `${(1 / cols) * 100 - 0.4}%`,
            }}
          />
        ))}
        {Array.from({ length: cols + 1 }).map((_, i) => (
          <div
            key={i}
            className="lc-col-line"
            style={{ left: `${(i / cols) * 100}%` }}
          />
        ))}
        <div className="lc-grid-label">
          {cols}-column grid · {cols} divisions
        </div>
      </div>
    </div>
  );
}
