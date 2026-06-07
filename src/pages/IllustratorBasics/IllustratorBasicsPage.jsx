import { useState, useEffect, useRef } from "react";
import { useProgress } from "../../context/ProgressContext";

const lessons = [
  {
    id: 1,
    number: "01",
    title: "Setting Up Your Document",
    duration: "9 min",
    description:
      "Artboards, document settings, colour modes, resolution. The decisions you make before you draw a single line.",
    topics: ["Artboard setup", "Colour modes", "Document settings"],
    route: "ai-setup",
    accent: "#f97316",
  },
  {
    id: 2,
    number: "02",
    title: "Essential Shortcuts",
    duration: "11 min",
    description:
      "The 20 shortcuts that replace 80% of menu navigation. Learn these and you'll work twice as fast within a week.",
    topics: ["Selection tools", "Transform shortcuts", "View controls"],
    route: "ai-shortcuts",
    accent: "#fb923c",
  },
  {
    id: 3,
    number: "03",
    title: "Tools to Know",
    duration: "14 min",
    description:
      "Pen tool, selection tools, shape tools, pathfinder. The foundation of every vector design you'll ever make.",
    topics: ["Pen tool", "Pathfinder", "Shape builder"],
    route: "ai-tools",
    accent: "#fdba74",
  },
  {
    id: 4,
    number: "04",
    title: "Exporting Your Work",
    duration: "8 min",
    description:
      "SVG, PNG, PDF — when to use which. Export settings, artboard export, and how not to ruin your files.",
    topics: ["Export for screen", "SVG vs PNG", "Print export"],
    route: "ai-export",
    accent: "#fcd34d",
  },
];

// Interactive shortcut keyboard component
const SHORTCUTS = [
  { key: "V", name: "Selection", color: "#f97316" },
  { key: "A", name: "Direct Select", color: "#fb923c" },
  { key: "P", name: "Pen Tool", color: "#fdba74" },
  { key: "T", name: "Type", color: "#fcd34d" },
  { key: "R", name: "Rotate", color: "#f97316" },
  { key: "S", name: "Scale", color: "#fb923c" },
  { key: "G", name: "Gradient", color: "#fdba74" },
  { key: "Z", name: "Zoom", color: "#fcd34d" },
  { key: "⌘Z", name: "Undo", color: "#a7f3d0" },
  { key: "⌘G", name: "Group", color: "#f97316" },
  { key: "⌘D", name: "Transform Again", color: "#fb923c" },
  { key: "⌘J", name: "Join Paths", color: "#fdba74" },
];

function KeyboardDemo() {
  const [hovered, setHovered] = useState(null);
  const rows = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
  ];
  const shortcutKeys = SHORTCUTS.map((s) => s.key.replace("⌘", ""));

  return (
    <div style={{ width: "100%", maxWidth: 480 }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 6,
          alignItems: "center",
        }}
      >
        {rows.map((row, ri) => (
          <div
            key={ri}
            style={{ display: "flex", gap: 5, marginLeft: ri * 14 }}
          >
            {row.map((key) => {
              const shortcut = SHORTCUTS.find(
                (s) => s.key === key || s.key === `⌘${key}`,
              );
              const isActive = shortcutKeys.includes(key);
              return (
                <div
                  key={key}
                  onMouseEnter={() => isActive && setHovered(key)}
                  onMouseLeave={() => setHovered(null)}
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: 6,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: isActive ? "pointer" : "default",
                    transition: "all 0.2s",
                    background:
                      hovered === key
                        ? `${shortcut?.color}25`
                        : isActive
                          ? `${shortcut?.color}10`
                          : "rgba(255,255,255,0.04)",
                    border: `1px solid ${
                      hovered === key
                        ? shortcut?.color + "80"
                        : isActive
                          ? shortcut?.color + "35"
                          : "rgba(255,255,255,0.08)"
                    }`,
                    transform: hovered === key ? "translateY(-3px)" : "none",
                    boxShadow:
                      hovered === key
                        ? `0 8px 20px ${shortcut?.color}20`
                        : "none",
                  }}
                >
                  <span
                    style={{
                      fontSize: 13,
                      fontWeight: 600,
                      color: isActive
                        ? shortcut?.color
                        : "rgba(255,255,255,0.2)",
                      fontFamily: "'Bebas Neue',sans-serif",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {key}
                  </span>
                  {isActive && (
                    <span
                      style={{
                        fontSize: 6,
                        color: shortcut?.color + "80",
                        letterSpacing: "0.04em",
                        marginTop: 1,
                      }}
                    >
                      {shortcut?.name.split(" ")[0]}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>
      {/* tooltip */}
      <div
        style={{
          marginTop: 20,
          height: 40,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hovered ? (
          <div
            style={{
              padding: "8px 20px",
              borderRadius: 6,
              background: `${SHORTCUTS.find((s) => s.key === hovered || s.key === `⌘${hovered}`)?.color}15`,
              border: `1px solid ${SHORTCUTS.find((s) => s.key === hovered || s.key === `⌘${hovered}`)?.color}40`,
              fontSize: 13,
              color: "#fff",
            }}
          >
            <strong
              style={{
                color: SHORTCUTS.find(
                  (s) => s.key === hovered || s.key === `⌘${hovered}`,
                )?.color,
              }}
            >
              {hovered}
            </strong>
            {" — "}
            {
              SHORTCUTS.find(
                (s) => s.key === hovered || s.key === `⌘${hovered}`,
              )?.name
            }
          </div>
        ) : (
          <div
            style={{
              fontSize: 11,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.12em",
              textTransform: "uppercase",
            }}
          >
            Hover the highlighted keys
          </div>
        )}
      </div>
    </div>
  );
}

// Animated pen tool path
function PenToolDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    { points: [[60, 120]], desc: "Click to place first anchor" },
    {
      points: [
        [60, 120],
        [180, 60],
      ],
      desc: "Click to place second anchor",
    },
    {
      points: [
        [60, 120],
        [180, 60],
        [280, 130],
      ],
      desc: "Click for a curve point",
    },
    {
      points: [
        [60, 120],
        [180, 60],
        [280, 130],
        [360, 80],
      ],
      desc: "Continue the path",
    },
    {
      points: [
        [60, 120],
        [180, 60],
        [280, 130],
        [360, 80],
        [420, 120],
      ],
      desc: "Close or continue",
    },
  ];
  const current = steps[step];

  const getPath = (pts) => {
    if (pts.length < 2) return "";
    let d = `M ${pts[0][0]} ${pts[0][1]}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1],
        curr = pts[i];
      const cpx = (prev[0] + curr[0]) / 2;
      d += ` C ${cpx} ${prev[1]} ${cpx} ${curr[1]} ${curr[0]} ${curr[1]}`;
    }
    return d;
  };

  return (
    <div style={{ width: "100%", maxWidth: 500 }}>
      <div
        style={{
          border: "1px solid rgba(249,115,22,0.15)",
          borderRadius: 12,
          overflow: "hidden",
          background: "rgba(0,0,0,0.3)",
          marginBottom: 16,
        }}
      >
        {/* toolbar simulation */}
        <div
          style={{
            padding: "8px 16px",
            borderBottom: "1px solid rgba(255,255,255,0.06)",
            display: "flex",
            alignItems: "center",
            gap: 10,
          }}
        >
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ff5f57",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#ffbd2e",
            }}
          />
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "#28ca42",
            }}
          />
          <div
            style={{
              flex: 1,
              textAlign: "center",
              fontSize: 10,
              color: "rgba(255,255,255,0.2)",
              letterSpacing: "0.1em",
            }}
          >
            Adobe Illustrator
          </div>
        </div>
        {/* canvas */}
        <div
          style={{ position: "relative", height: 180, background: "#1a1a1a" }}
        >
          <svg width="100%" height="100%" viewBox="0 0 500 180">
            {/* grid */}
            {Array.from({ length: 10 }).map((_, i) => (
              <line
                key={`v${i}`}
                x1={i * 50}
                y1={0}
                x2={i * 50}
                y2={180}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.5"
              />
            ))}
            {Array.from({ length: 4 }).map((_, i) => (
              <line
                key={`h${i}`}
                x1={0}
                y1={i * 45}
                x2={500}
                y2={i * 45}
                stroke="rgba(255,255,255,0.04)"
                strokeWidth="0.5"
              />
            ))}
            {/* path */}
            {current.points.length >= 2 && (
              <path
                d={getPath(current.points)}
                fill="none"
                stroke="#f97316"
                strokeWidth="1.5"
                strokeDasharray={step < 4 ? "6,4" : "none"}
              />
            )}
            {/* anchor points */}
            {current.points.map(([x, y], i) => (
              <g key={i}>
                <rect
                  x={x - 4}
                  y={y - 4}
                  width={8}
                  height={8}
                  fill="#1a1a1a"
                  stroke="#f97316"
                  strokeWidth="1.5"
                />
              </g>
            ))}
            {/* cursor indicator */}
            <text
              x={current.points[current.points.length - 1][0] + 10}
              y={current.points[current.points.length - 1][1] - 10}
              fill="#f97316"
              fontSize="18"
              opacity="0.7"
            >
              ✦
            </text>
          </svg>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div
          style={{
            fontSize: 13,
            color: "rgba(255,255,255,0.45)",
            fontStyle: "italic",
          }}
        >
          {current.desc}
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <button
            onClick={() => setStep((s) => Math.max(0, s - 1))}
            style={{
              padding: "6px 14px",
              border: "1px solid rgba(255,255,255,0.12)",
              background: "transparent",
              color: "rgba(255,255,255,0.4)",
              fontSize: 12,
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              transition: "all 0.2s",
            }}
          >
            ←
          </button>
          <button
            onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
            style={{
              padding: "6px 14px",
              border: "1px solid rgba(249,115,22,0.35)",
              background: "rgba(249,115,22,0.1)",
              color: "#f97316",
              fontSize: 12,
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              transition: "all 0.2s",
            }}
          >
            Next step →
          </button>
        </div>
      </div>
      <div style={{ display: "flex", gap: 5, marginTop: 12 }}>
        {steps.map((_, i) => (
          <div
            key={i}
            onClick={() => setStep(i)}
            style={{
              flex: 1,
              height: 2,
              borderRadius: 1,
              background: i <= step ? "#f97316" : "rgba(255,255,255,0.1)",
              cursor: "pointer",
              transition: "background 0.3s",
            }}
          />
        ))}
      </div>
    </div>
  );
}

export default function IllustratorBasicsPage({ onBack, onNavigate }) {
  const [activeLesson, setActiveLesson] = useState(0);
  const [scrollY, setScrollY] = useState(0);
  const { getCompleted, toggleComplete: toggleCtx } = useProgress();
  const completed = getCompleted("ai-basics");
  const toggleComplete = (id, e) => {
    e.stopPropagation();
    toggleCtx("ai-basics", id);
  };
  const progress = Math.round((completed.length / lessons.length) * 100);
  const active = lessons[activeLesson];
  const isDone = completed.includes(active.id);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    const fn = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }

        .ai-page { min-height:100vh; background:#0c0600; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }

        /* NAV */
        .ai-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(12,6,0,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(249,115,22,0.1); z-index:200; }
        .ai-back { background:none; border:1px solid rgba(249,115,22,0.2); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .ai-back:hover { color:#f97316; border-color:rgba(249,115,22,0.5); }
        .ai-nav-center { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.14em; color:rgba(249,115,22,0.8); }
        .ai-prog-pill { display:flex; align-items:center; gap:10px; font-size:11px; color:rgba(255,255,255,0.3); }
        .ai-prog-bar { width:60px; height:1px; background:rgba(249,115,22,0.15); }
        .ai-prog-fill { height:100%; background:#f97316; transition:width 0.5s; }

        /* HERO — split cinematic */
        .ai-hero { display:grid; grid-template-columns:1fr 1fr; min-height:100vh; border-bottom:1px solid rgba(249,115,22,0.08); }
        .ai-hero-left { padding:80px 56px; display:flex; flex-direction:column; justify-content:center; border-right:1px solid rgba(249,115,22,0.08); position:relative; overflow:hidden; }
        .ai-hero-glow { position:absolute; inset:0; background:radial-gradient(ellipse at 10% 70%, rgba(249,115,22,0.08) 0%, transparent 55%); pointer-events:none; }
        /* grid lines */
        .ai-hero-grid { position:absolute; inset:0; pointer-events:none; }
        .ai-hline { position:absolute; left:0; right:0; height:0.5px; background:linear-gradient(to right, transparent, rgba(249,115,22,0.06), transparent); }
        .ai-vline { position:absolute; top:0; bottom:0; width:0.5px; background:linear-gradient(to bottom, transparent, rgba(249,115,22,0.05), transparent); }
        .ai-eyebrow { font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(249,115,22,0.5); margin-bottom:20px; display:flex; align-items:center; gap:10px; position:relative; z-index:1; }
        .ai-eyebrow::before { content:''; width:24px; height:1px; background:rgba(249,115,22,0.4); }
        .ai-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(5rem,10vw,9.5rem); line-height:0.82; letter-spacing:0.02em; color:#fff; margin-bottom:24px; position:relative; z-index:1; }
        .ai-hero-title em { display:block; color:#f97316; font-style:normal; }
        .ai-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:400px; position:relative; z-index:1; margin-bottom:40px; }
        .ai-hero-stats { display:flex; gap:28px; position:relative; z-index:1; }
        .ai-stat-num { font-family:'Bebas Neue',sans-serif; font-size:44px; color:#f97316; line-height:1; }
        .ai-stat-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-top:2px; }

        .ai-hero-right { background:#0c0600; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:32px; padding:60px; position:relative; }
        .ai-hero-right-label { font-size:9px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(249,115,22,0.4); align-self:flex-start; }

        /* BIG NUMBER */
        .ai-hero-num { position:absolute; right:-20px; bottom:-40px; font-family:'Bebas Neue',sans-serif; font-size:clamp(10rem,22vw,20rem); color:transparent; -webkit-text-stroke:1px rgba(249,115,22,0.06); line-height:1; pointer-events:none; user-select:none; }

        /* SCROLL STRIP */
        .ai-strip { height:44px; overflow:hidden; border-bottom:1px solid rgba(249,115,22,0.06); background:rgba(249,115,22,0.02); }
        .ai-strip-track { display:flex; width:max-content; animation:ai-scroll 24s linear infinite; height:100%; align-items:center; }
        @keyframes ai-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .ai-strip-item { padding:0 24px; font-size:9px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(249,115,22,0.3); white-space:nowrap; border-right:0.5px solid rgba(249,115,22,0.08); height:100%; display:flex; align-items:center; gap:7px; }
        .ai-strip-dot { width:3px; height:3px; border-radius:50%; background:rgba(249,115,22,0.5); }

        /* MAG SECTIONS */
        .ai-mag { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(249,115,22,0.08); }
        .ai-mag-col { padding:72px 56px; }
        .ai-mag-col.left-col { border-right:1px solid rgba(249,115,22,0.08); background:#0c0600; }
        .ai-mag-col.right-col { background:#0e0700; }
        .ai-mag-label { font-size:9px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(249,115,22,0.4); margin-bottom:20px; display:flex; align-items:center; gap:10px; }
        .ai-mag-label::after { content:''; flex:1; height:1px; background:rgba(249,115,22,0.08); }
        .ai-mag-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.8rem,5vw,4.5rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:24px; }
        .ai-mag-title em { color:#f97316; font-style:normal; }
        .ai-mag-body { font-size:14px; color:rgba(255,255,255,0.35); line-height:1.85; }
        .ai-mag-body strong { color:rgba(255,255,255,0.75); font-weight:500; }

        /* LESSONS */
        .ai-lessons-section { border-top:1px solid rgba(249,115,22,0.06); }
        .ai-lessons-header { padding:40px 56px 0; display:flex; align-items:baseline; justify-content:space-between; }
        .ai-lessons-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; }
        .ai-prog-text { font-size:11px; color:rgba(255,255,255,0.22); }
        .ai-prog-track { height:1px; background:rgba(249,115,22,0.1); margin:24px 56px 0; }
        .ai-prog-track-fill { height:100%; background:#f97316; transition:width 0.6s ease; }
        .ai-lessons-grid { display:grid; grid-template-columns:repeat(4,1fr); border-top:1px solid rgba(249,115,22,0.06); }
        .ai-lesson-col { border-right:1px solid rgba(249,115,22,0.06); padding:36px 28px; cursor:pointer; transition:background 0.2s; position:relative; overflow:hidden; min-height:240px; display:flex; flex-direction:column; }
        .ai-lesson-col:last-child { border-right:none; }
        .ai-lesson-col:hover { background:rgba(249,115,22,0.03); }
        .ai-lesson-col.active-col { background:rgba(249,115,22,0.04); }
        .ai-lesson-col-num { font-family:'Bebas Neue',sans-serif; font-size:48px; color:rgba(249,115,22,0.06); line-height:1; margin-bottom:16px; }
        .ai-lesson-col.active-col .ai-lesson-col-num { color:rgba(249,115,22,0.14); }
        .ai-lesson-col-title { font-size:13px; font-weight:500; color:rgba(255,255,255,0.65); line-height:1.4; margin-bottom:8px; flex:1; }
        .ai-lesson-col.active-col .ai-lesson-col-title { color:#fff; }
        .ai-lesson-col-dur { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(249,115,22,0.4); margin-bottom:14px; }
        .ai-check { width:20px; height:20px; border-radius:50%; background:none; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:9px; color:#0c0600; transition:all 0.2s; border:1px solid rgba(249,115,22,0.25); margin-top:auto; }
        .ai-check.done { background:#f97316; border-color:transparent; }
        .ai-lesson-col-line { position:absolute; bottom:0; left:0; height:2px; width:0; background:#f97316; transition:width 0.3s; }
        .ai-lesson-col:hover .ai-lesson-col-line, .ai-lesson-col.active-col .ai-lesson-col-line { width:100%; }

        .ai-detail { border-top:1px solid rgba(249,115,22,0.06); display:grid; grid-template-columns:1fr 1fr; }
        .ai-detail-left { padding:48px 56px; border-right:1px solid rgba(249,115,22,0.06); }
        .ai-detail-num { font-family:'Bebas Neue',sans-serif; font-size:11px; letter-spacing:0.2em; color:rgba(249,115,22,0.4); margin-bottom:10px; }
        .ai-detail-title { font-family:'DM Serif Display',serif; font-size:clamp(1.6rem,3vw,2.4rem); color:#fff; margin-bottom:16px; }
        .ai-detail-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; margin-bottom:24px; }
        .ai-topics { display:flex; flex-wrap:wrap; gap:8px; margin-bottom:32px; }
        .ai-topic { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; padding:5px 12px; border-radius:2px; border:1px solid rgba(249,115,22,0.25); color:rgba(249,115,22,0.8); background:rgba(249,115,22,0.06); }
        .ai-detail-right { padding:48px 56px; display:flex; flex-direction:column; justify-content:center; }
        .ai-actions { display:flex; gap:10px; }
        .ai-btn-start { padding:10px 24px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; border:1px solid rgba(249,115,22,0.4); background:rgba(249,115,22,0.1); color:#f97316; }
        .ai-btn-start:hover { background:rgba(249,115,22,0.18); border-color:rgba(249,115,22,0.6); }
        .ai-btn-done { background:none; border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.3); padding:10px 18px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .ai-btn-done:hover { color:rgba(255,255,255,0.6); }
        .ai-btn-done.done { color:#f97316; border-color:rgba(249,115,22,0.3); }

        @media(max-width:900px) {
          .ai-hero,.ai-mag,.ai-detail { grid-template-columns:1fr; }
          .ai-hero-right { display:none; }
          .ai-lessons-grid { grid-template-columns:1fr 1fr; }
        }
      `}</style>

      <div className="ai-page">
        <nav className="ai-nav">
          <button className="ai-back" onClick={onBack}>
            ← Back
          </button>
          <span className="ai-nav-center">Illustrator Basics</span>
          <div className="ai-prog-pill">
            <div className="ai-prog-bar">
              <div className="ai-prog-fill" style={{ width: `${progress}%` }} />
            </div>
            <span>
              {completed.length}/{lessons.length}
            </span>
          </div>
        </nav>

        {/* HERO */}
        <div className="ai-hero">
          <div className="ai-hero-left">
            <div className="ai-hero-glow" />
            <div className="ai-hero-grid">
              {[20, 40, 60, 80].map((p, i) => (
                <div key={i} className="ai-hline" style={{ top: `${p}%` }} />
              ))}
              {[25, 50, 75].map((p, i) => (
                <div key={i} className="ai-vline" style={{ left: `${p}%` }} />
              ))}
            </div>
            <div className="ai-eyebrow">Module 07 · Illustrator</div>
            <div className="ai-hero-title">
              ILLUSTRATOR
              <br />
              <em>BASICS</em>
            </div>
            <p className="ai-hero-sub">
              The industry standard for vector design. Four lessons that take
              you from blank document to export-ready file.
            </p>
            <div className="ai-hero-stats">
              <div>
                <div className="ai-stat-num">4</div>
                <div className="ai-stat-label">Lessons</div>
              </div>
              <div>
                <div className="ai-stat-num">42m</div>
                <div className="ai-stat-label">Total time</div>
              </div>
              <div>
                <div className="ai-stat-num">∞</div>
                <div className="ai-stat-label">Vector scale</div>
              </div>
            </div>
            <div className="ai-hero-num">07</div>
          </div>
          <div className="ai-hero-right">
            <div className="ai-hero-right-label">
              Interactive — hover to explore
            </div>
            <KeyboardDemo />
          </div>
        </div>

        {/* STRIP */}
        <div className="ai-strip">
          <div className="ai-strip-track">
            {[...Array(3)]
              .flatMap(() => [
                "Pen Tool",
                "Artboards",
                "Pathfinder",
                "SVG Export",
                "Shortcuts",
                "Anchor Points",
                "Bezier Curves",
                "Shape Builder",
                "Live Paint",
                "Clipping Masks",
                "Gradients",
                "Typography",
              ])
              .map((item, i) => (
                <div key={i} className="ai-strip-item">
                  <span className="ai-strip-dot" />
                  {item}
                </div>
              ))}
          </div>
        </div>

        {/* MAG — Pen tool demo */}
        <div className="ai-mag">
          <div className="ai-mag-col left-col">
            <div className="ai-mag-label">The most important tool</div>
            <div className="ai-mag-title">
              MASTER
              <br />
              THE <em>PEN.</em>
              <br />
              MASTER ALL.
            </div>
            <p className="ai-mag-body">
              <strong>Every vector shape you'll ever draw</strong> starts with
              anchor points and bezier handles. The Pen tool is intimidating for
              20 minutes — then it clicks, and you have it forever.
              <br />
              <br />
              Click through the steps on the right. Watch how a path grows
              anchor by anchor.
            </p>
          </div>
          <div
            className="ai-mag-col right-col"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <PenToolDemo />
          </div>
        </div>

        {/* MAG 2 — why vector */}
        <div className="ai-mag" style={{ borderBottom: "none" }}>
          <div className="ai-mag-col right-col">
            <div className="ai-mag-label">Why Illustrator</div>
            <div className="ai-mag-title">
              VECTOR.
              <br />
              NOT <em>PIXELS.</em>
            </div>
            <p className="ai-mag-body">
              <strong>Raster images break when scaled.</strong> Vector shapes
              are mathematical — they're infinite resolution. Your logo at 16px
              on a favicon is identical to 16 metres on a billboard.
              <br />
              <br />
              <strong>SVG files weigh nothing.</strong> A complex logo as SVG
              might be 4KB. The same thing as PNG at print resolution? 40MB.
            </p>
          </div>
          <div
            className="ai-mag-col left-col"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0,
            }}
          >
            {/* Pixel vs Vector comparison */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                width: "100%",
              }}
            >
              {[
                {
                  label: "Raster (PNG)",
                  bad: true,
                  sizes: [200, 80, 32],
                  color: "#fda4af",
                },
                {
                  label: "Vector (SVG)",
                  bad: false,
                  sizes: [200, 80, 32],
                  color: "#f97316",
                },
              ].map((item, idx) => (
                <div key={idx}>
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      color: item.color,
                      marginBottom: 14,
                      opacity: 0.7,
                    }}
                  >
                    {item.label}
                  </div>
                  {item.sizes.map((size, i) => (
                    <div
                      key={i}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 12,
                      }}
                    >
                      <div
                        style={{
                          width: size / 2,
                          height: size / 2,
                          borderRadius: 4,
                          background: item.bad
                            ? `rgba(253,164,175,${0.15 + i * 0.1})`
                            : `rgba(249,115,22,${0.15 + i * 0.1})`,
                          border: `1px solid ${item.bad ? "rgba(253,164,175,0.3)" : "rgba(249,115,22,0.3)"}`,
                          imageRendering:
                            item.bad && i > 0 ? "pixelated" : "auto",
                          flexShrink: 0,
                          overflow: "hidden",
                          position: "relative",
                        }}
                      >
                        {item.bad && i > 0 && (
                          <div
                            style={{
                              position: "absolute",
                              inset: 0,
                              backgroundImage: `repeating-linear-gradient(0deg,transparent,transparent 3px,${item.color}20 3px,${item.color}20 4px),repeating-linear-gradient(90deg,transparent,transparent 3px,${item.color}20 3px,${item.color}20 4px)`,
                            }}
                          />
                        )}
                        {!item.bad && (
                          <svg width="100%" height="100%" viewBox="0 0 40 40">
                            <circle
                              cx="20"
                              cy="20"
                              r="16"
                              fill="none"
                              stroke="#f97316"
                              strokeWidth="2"
                              opacity="0.6"
                            />
                          </svg>
                        )}
                      </div>
                      <div
                        style={{
                          fontSize: 10,
                          color:
                            i === 0
                              ? "rgba(255,255,255,0.4)"
                              : item.bad
                                ? "rgba(253,164,175,0.6)"
                                : "rgba(249,115,22,0.6)",
                        }}
                      >
                        {size}px
                        {i > 0 && item.bad
                          ? " — pixelated"
                          : i > 0 && !item.bad
                            ? " — perfect"
                            : ""}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* LESSONS */}
        <div className="ai-lessons-section">
          <div className="ai-lessons-header">
            <div className="ai-lessons-title">LESSONS</div>
            <div className="ai-prog-text">
              {completed.length} of {lessons.length} complete
            </div>
          </div>
          <div className="ai-prog-track">
            <div
              className="ai-prog-track-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="ai-lessons-grid">
            {lessons.map((lesson, i) => {
              const isDoneCard = completed.includes(lesson.id);
              const isActive = activeLesson === i;
              return (
                <div
                  key={lesson.id}
                  className={`ai-lesson-col${isActive ? " active-col" : ""}`}
                  onClick={() => setActiveLesson(i)}
                >
                  <div className="ai-lesson-col-num">{lesson.number}</div>
                  <div className="ai-lesson-col-title">{lesson.title}</div>
                  <div className="ai-lesson-col-dur">{lesson.duration}</div>
                  <button
                    className={`ai-check${isDoneCard ? " done" : ""}`}
                    onClick={(e) => toggleComplete(lesson.id, e)}
                  >
                    {isDoneCard ? "✓" : ""}
                  </button>
                  <div className="ai-lesson-col-line" />
                </div>
              );
            })}
          </div>
          <div className="ai-detail">
            <div className="ai-detail-left">
              <div className="ai-detail-num">
                {active.number} — {active.duration}
              </div>
              <div className="ai-detail-title">{active.title}</div>
              <p className="ai-detail-desc">{active.description}</p>
              <div className="ai-topics">
                {active.topics.map((t, i) => (
                  <span key={i} className="ai-topic">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="ai-detail-right">
              <div className="ai-actions">
                <button
                  className="ai-btn-start"
                  onClick={() => onNavigate && onNavigate(active.route)}
                >
                  {isDone ? "Review →" : "Start lesson →"}
                </button>
                <button
                  className={`ai-btn-done${isDone ? " done" : ""}`}
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
