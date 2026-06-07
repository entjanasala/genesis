import { useState, useEffect } from "react";
import { useProgress } from "../context/ProgressContext";
import UploadArea from "../pages/UploadArea";

const PROJECTS = [
  {
    id: 1,
    number: "01",
    title: "Colour Palette Brand",
    category: "Colour Theory",
    difficulty: "Beginner",
    duration: "2–3 hours",
    accent: "#f472b6",
    bg: "#1a0a1e",
    emoji: "🎨",
    brief:
      "A new café is opening in your city. They want to feel warm, inviting, and slightly premium — not a chain, not pretentious. Create their colour palette.",
    deliverables: [
      "A primary palette of 4 colours",
      "A mood word list (3–5 words)",
      "A short explanation of why each colour was chosen",
      "Show the palette applied to a simple business card mockup",
    ],
    skills: ["Colour Theory", "Brand Identity", "Moodboard"],
    tips: [
      "Start with the mood words before touching colour",
      "Test the palette in black and white first",
      "Avoid pure black — use a very dark warm tone instead",
    ],
    hasUpload: true,
  },
  {
    id: 2,
    number: "02",
    title: "Logo Design Challenge",
    category: "Logo Design",
    difficulty: "Intermediate",
    duration: "4–6 hours",
    accent: "#a78bfa",
    bg: "#0f0a1e",
    emoji: "◉",
    brief:
      "Design a logo for a fictional architecture studio called 'Forma'. It should feel precise, modern, and confident. The logo must work in black and white.",
    deliverables: [
      "Primary logo (symbol + wordmark)",
      "Symbol alone (for favicon/icon use)",
      "Black version + white version",
      "Logo on a dark background and a light background",
    ],
    skills: ["Logo Design", "Illustrator", "Typography"],
    tips: [
      "Start with pencil sketches — at least 20 thumbnails",
      "The name 'Forma' suggests geometric shapes",
      "Test at 16px — if it works there, it works everywhere",
    ],
    hasUpload: true,
  },
  {
    id: 3,
    number: "03",
    title: "Event Poster",
    category: "Poster Creation",
    difficulty: "Intermediate",
    duration: "3–5 hours",
    accent: "#fb923c",
    bg: "#1a0c00",
    emoji: "🪧",
    brief:
      "Design a poster for a fictional design festival called 'GRID'. The event is bold, modern, and takes design seriously. The poster must stop people in their tracks.",
    deliverables: [
      "A3 poster (297×420mm)",
      "Headline, date, and location clearly readable",
      "Works at thumbnail size (test it small)",
      "JPG export at 150dpi",
    ],
    skills: ["Poster Creation", "Typography", "Layout & Composition"],
    tips: [
      "One focal point only — everything else supports it",
      "Try the layout in black and white before adding colour",
      "'GRID' is the name — use it as a visual element",
    ],
    hasUpload: true,
  },
  {
    id: 4,
    number: "04",
    title: "Typography Specimen",
    category: "Typography",
    difficulty: "Beginner",
    duration: "2–3 hours",
    accent: "#34d399",
    bg: "#001a0f",
    emoji: "Aa",
    brief:
      "Choose any typeface from Google Fonts. Create a one-page typographic specimen that shows everything the font can do — weights, sizes, uses, and personality.",
    deliverables: [
      "One A4 page, any orientation",
      "At least 4 different font weights used",
      "Show the font in a real-world context (headline, body, caption)",
      "Include at least one creative typographic element",
    ],
    skills: ["Typography", "Layout & Composition", "Design Styles"],
    tips: [
      "Pick a font with personality — avoid generic choices",
      "White space is part of the design",
      "The specimen should make someone want to use the font",
    ],
    hasUpload: true,
  },
  {
    id: 5,
    number: "05",
    title: "Rebrand a Classic",
    category: "Brand Identity",
    difficulty: "Advanced",
    duration: "6–10 hours",
    accent: "#38bdf8",
    bg: "#00101a",
    emoji: "↺",
    brief:
      "Take a well-known brand and reimagine it for 2030. Keep the core values intact — change the visual expression. Pick from: a local newspaper, a library, or a post office.",
    deliverables: [
      "New logo (explain why it changed)",
      "Colour palette with rationale",
      "Font pairing",
      "One application: a poster, a website hero, or a business card",
    ],
    skills: ["Logo Design", "Moodboard", "Typography", "Colour Theory"],
    tips: [
      "Research the brand's history before designing",
      "Evolution, not revolution — respect what makes it what it is",
      "Justify every change with a reason",
    ],
    hasUpload: true,
  },
  {
    id: 6,
    number: "06",
    title: "Self-Directed Project",
    category: "Open Brief",
    difficulty: "Your choice",
    duration: "Your pace",
    accent: "#fde68a",
    bg: "#1a1500",
    emoji: "★",
    brief:
      "Design something you actually want to exist. A brand for a business you'd start. A poster for an event you'd attend. A logo for a project you care about. Real motivation = better work.",
    deliverables: [
      "The brief you wrote for yourself",
      "Your finished design",
      "A short written reflection: what worked, what you'd change",
    ],
    skills: ["Everything"],
    tips: [
      "Write the brief before you design — treat yourself like a client",
      "Set a deadline and stick to it",
      "The best portfolio work comes from self-directed projects",
    ],
    hasUpload: true,
  },
];

const DIFFICULTY_COLORS = {
  Beginner: "#4ade80",
  Intermediate: "#fb923c",
  Advanced: "#f472b6",
  "Your choice": "#fde68a",
};

export default function ProjectsPage({ onBack, onNavigate }) {
  const [activeProject, setActiveProject] = useState(0);
  const [activeTab, setActiveTab] = useState("brief");
  const { getCompleted, toggleComplete: toggleCtx } = useProgress();
  const completed = getCompleted("projects");
  const toggleComplete = (id, e) => {
    e.stopPropagation();
    toggleCtx("projects", id);
  };
  const completedCount = completed.length;
  const project = PROJECTS[activeProject];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .pj-page { min-height:100vh; background:#09090f; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }

        /* NAV */
        .pj-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(9,9,15,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.07); z-index:200; }
        .pj-back { background:none; border:1px solid rgba(255,255,255,0.12); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .pj-back:hover { color:#fff; border-color:rgba(255,255,255,0.35); }
        .pj-nav-center { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .pj-prog-pill { display:flex; align-items:center; gap:8px; font-size:11px; color:rgba(255,255,255,0.3); }
        .pj-prog-bar { width:60px; height:1px; background:rgba(255,255,255,0.08); }
        .pj-prog-fill { height:100%; background:#fde68a; transition:width 0.5s; }

        /* HERO */
        .pj-hero { min-height:80vh; display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(255,255,255,0.07); }
        .pj-hero-left { padding:80px 56px; display:flex; flex-direction:column; justify-content:center; border-right:1px solid rgba(255,255,255,0.07); position:relative; overflow:hidden; }
        .pj-hero-glow { position:absolute; inset:0; background:radial-gradient(ellipse at 15% 65%, rgba(253,230,138,0.07) 0%, transparent 55%); pointer-events:none; }
        .pj-eyebrow { font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(253,230,138,0.5); margin-bottom:20px; display:flex; align-items:center; gap:10px; position:relative; z-index:1; }
        .pj-eyebrow::before { content:''; width:24px; height:1px; background:rgba(253,230,138,0.4); }
        .pj-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(5rem,10vw,10rem); line-height:0.82; letter-spacing:0.02em; color:#fff; margin-bottom:24px; position:relative; z-index:1; }
        .pj-hero-title em { display:block; color:#fde68a; font-style:normal; }
        .pj-hero-sub { font-size:15px; color:rgba(255,255,255,0.32); line-height:1.8; max-width:400px; position:relative; z-index:1; margin-bottom:40px; }
        .pj-hero-stats { display:flex; gap:28px; position:relative; z-index:1; }
        .pj-stat-num { font-family:'Bebas Neue',sans-serif; font-size:44px; color:#fde68a; line-height:1; }
        .pj-stat-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.22); margin-top:2px; }
        .pj-hero-num { position:absolute; right:-20px; bottom:-40px; font-family:'Bebas Neue',sans-serif; font-size:clamp(10rem,22vw,20rem); color:transparent; -webkit-text-stroke:1px rgba(253,230,138,0.05); line-height:1; pointer-events:none; user-select:none; }

        /* HERO RIGHT — project list */
        .pj-hero-right { padding:60px 56px; display:flex; flex-direction:column; justify-content:center; gap:0; background:#0b0b12; }
        .pj-hero-right-label { font-size:9px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(253,230,138,0.4); margin-bottom:16px; }
        .pj-proj-row { display:flex; align-items:center; gap:14px; padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; transition:all 0.2s; }
        .pj-proj-row:last-child { border-bottom:none; }
        .pj-proj-row:hover { padding-left:6px; }
        .pj-proj-emoji { font-size:18px; width:32px; flex-shrink:0; }
        .pj-proj-name { flex:1; font-size:13px; color:rgba(255,255,255,0.6); transition:color 0.2s; }
        .pj-proj-row:hover .pj-proj-name { color:#fff; }
        .pj-proj-cat { font-size:10px; letter-spacing:0.08em; text-transform:uppercase; color:rgba(255,255,255,0.2); }
        .pj-proj-done { width:16px; height:16px; border-radius:50%; border:1px solid rgba(255,255,255,0.12); background:none; flex-shrink:0; display:flex; align-items:center; justifyContent:center; font-size:8px; }
        .pj-proj-done.done { background:#fde68a; border-color:transparent; }

        /* STRIP */
        .pj-strip { height:44px; overflow:hidden; border-bottom:1px solid rgba(255,255,255,0.06); background:rgba(253,230,138,0.02); }
        .pj-strip-track { display:flex; width:max-content; animation:pj-scroll 28s linear infinite; height:100%; align-items:center; }
        @keyframes pj-scroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .pj-strip-item { padding:0 24px; font-size:9px; letter-spacing:0.22em; text-transform:uppercase; color:rgba(253,230,138,0.25); white-space:nowrap; border-right:0.5px solid rgba(255,255,255,0.05); height:100%; display:flex; align-items:center; gap:7px; }
        .pj-strip-dot { width:3px; height:3px; border-radius:50%; background:rgba(253,230,138,0.4); }

        /* PROJECTS GRID */
        .pj-grid-section { padding:72px 56px; border-bottom:1px solid rgba(255,255,255,0.07); }
        .pj-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .pj-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; }
        .pj-section-line { flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .pj-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:40px; max-width:520px; line-height:1.7; }
        .pj-cards-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }

        /* PROJECT CARD */
        .pj-card { border-radius:14px; padding:28px 24px; cursor:pointer; transition:all 0.25s; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); position:relative; overflow:hidden; }
        .pj-card:hover { transform:translateY(-3px); }
        .pj-card.active-card { transform:translateY(-4px); }
        .pj-card-emoji { font-size:24px; margin-bottom:12px; display:block; transition:transform 0.3s; }
        .pj-card:hover .pj-card-emoji, .pj-card.active-card .pj-card-emoji { transform:scale(1.2) rotate(-5deg); }
        .pj-card-num { position:absolute; top:16px; right:18px; font-family:'Bebas Neue',sans-serif; font-size:32px; color:rgba(255,255,255,0.05); line-height:1; }
        .pj-card-cat { font-size:9px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:8px; }
        .pj-card-title { font-family:'Bebas Neue',sans-serif; font-size:20px; color:#fff; letter-spacing:0.03em; margin-bottom:8px; line-height:1.1; }
        .pj-card-meta { display:flex; gap:10px; align-items:center; flex-wrap:wrap; margin-top:10px; }
        .pj-card-diff { font-size:9px; padding:2px 8px; border-radius:999px; letter-spacing:0.08em; }
        .pj-card-time { font-size:10px; color:rgba(255,255,255,0.25); }
        .pj-card-done-badge { position:absolute; top:14px; left:14px; width:20px; height:20px; border-radius:50%; display:flex; align-items:center; justifyContent:center; font-size:9px; }
        .pj-card-line { position:absolute; bottom:0; left:0; height:2px; width:0; transition:width 0.3s; }
        .pj-card:hover .pj-card-line, .pj-card.active-card .pj-card-line { width:100%; }

        /* DETAIL PANEL */
        .pj-detail { display:grid; grid-template-columns:1fr 1fr; border-top:1px solid rgba(255,255,255,0.07); border-bottom:1px solid rgba(255,255,255,0.07); }
        .pj-detail-left { padding:60px 56px; border-right:1px solid rgba(255,255,255,0.07); }
        .pj-detail-header { display:flex; align-items:flex-start; justify-content:space-between; margin-bottom:24px; flex-wrap:wrap; gap:12px; }
        .pj-detail-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; letter-spacing:0.02em; line-height:0.9; }
        .pj-detail-emoji { font-size:40px; }

        /* TABS */
        .pj-tabs { display:flex; gap:0; border-bottom:1px solid rgba(255,255,255,0.07); margin-bottom:28px; }
        .pj-tab { padding:10px 20px; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; background:transparent; color:rgba(255,255,255,0.3); border:none; font-family:'DM Sans',sans-serif; border-bottom:2px solid transparent; margin-bottom:-1px; }
        .pj-tab.active-tab { color:#fff; border-bottom-color:currentColor; }

        .pj-brief { font-size:14px; color:rgba(255,255,255,0.45); line-height:1.85; margin-bottom:24px; padding:20px 24px; border-radius:8px; border-left:3px solid; background:rgba(255,255,255,0.02); font-style:italic; }
        .pj-list-label { font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:12px; }
        .pj-list-item { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:rgba(255,255,255,0.5); line-height:1.6; padding:8px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
        .pj-list-item:last-child { border-bottom:none; }
        .pj-list-bullet { flex-shrink:0; margin-top:3px; font-size:10px; }
        .pj-tip-item { display:flex; align-items:flex-start; gap:10px; font-size:13px; color:rgba(255,255,255,0.45); line-height:1.65; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.04); }
        .pj-tip-item:last-child { border-bottom:none; }

        /* SKILLS */
        .pj-skills { display:flex; flex-wrap:wrap; gap:6px; margin-top:8px; }
        .pj-skill { font-size:10px; padding:4px 10px; border-radius:2px; border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.35); }

        /* SUBMIT PANEL */
        .pj-detail-right { padding:60px 56px; background:#0b0b12; display:flex; flex-direction:column; gap:24px; }
        .pj-submit-title { font-family:'Bebas Neue',sans-serif; font-size:28px; color:#fff; margin-bottom:4px; }
        .pj-submit-sub { font-size:13px; color:rgba(255,255,255,0.3); line-height:1.7; margin-bottom:16px; }
        .pj-done-btn { padding:10px 24px; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; border:1px solid; }
        .pj-done-btn.done { color:#fde68a; border-color:rgba(253,230,138,0.4); background:rgba(253,230,138,0.08); }
        .pj-done-btn.undone { color:rgba(255,255,255,0.35); border-color:rgba(255,255,255,0.1); background:transparent; }
        .pj-done-btn.undone:hover { color:#fff; border-color:rgba(255,255,255,0.3); }

        @media(max-width:900px) {
          .pj-hero,.pj-detail { grid-template-columns:1fr; }
          .pj-hero-right { display:none; }
          .pj-cards-grid { grid-template-columns:1fr 1fr; }
        }
      `}</style>

      <div className="pj-page">
        <nav className="pj-nav">
          <button className="pj-back" onClick={onBack}>
            ← Back
          </button>
          <span className="pj-nav-center">Projects & Assignments</span>
          <div className="pj-prog-pill">
            <div className="pj-prog-bar">
              <div
                className="pj-prog-fill"
                style={{
                  width: `${(completedCount / PROJECTS.length) * 100}%`,
                }}
              />
            </div>
            <span>
              {completedCount}/{PROJECTS.length}
            </span>
          </div>
        </nav>

        {/* HERO */}
        <div className="pj-hero">
          <div className="pj-hero-left">
            <div className="pj-hero-glow" />
            <div className="pj-eyebrow">Module 09 · Practice</div>
            <div className="pj-hero-title">
              REAL
              <br />
              <em>BRIEFS.</em>
            </div>
            <p className="pj-hero-sub">
              Theory only takes you so far. These projects apply everything
              you've learned to real design problems with real constraints.
            </p>
            <div className="pj-hero-stats">
              <div>
                <div className="pj-stat-num">6</div>
                <div className="pj-stat-label">Projects</div>
              </div>
              <div>
                <div className="pj-stat-num">{completedCount}</div>
                <div className="pj-stat-label">Completed</div>
              </div>
              <div>
                <div className="pj-stat-num">∞</div>
                <div className="pj-stat-label">What you'll learn</div>
              </div>
            </div>
            <div className="pj-hero-num">09</div>
          </div>
          <div className="pj-hero-right">
            <div className="pj-hero-right-label">All projects</div>
            {PROJECTS.map((p, i) => (
              <div
                key={i}
                className="pj-proj-row"
                onClick={() => setActiveProject(i)}
              >
                <div className="pj-proj-emoji">{p.emoji}</div>
                <div className="pj-proj-name">{p.title}</div>
                <div className="pj-proj-cat">{p.category}</div>
                <div
                  className={`pj-proj-done${completed.includes(p.id) ? " done" : ""}`}
                  style={{
                    background: completed.includes(p.id)
                      ? DIFFICULTY_COLORS[p.difficulty]
                      : "none",
                    borderColor: completed.includes(p.id)
                      ? "transparent"
                      : "rgba(255,255,255,0.12)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {completed.includes(p.id) && (
                    <span style={{ fontSize: 8 }}>✓</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* STRIP */}
        <div className="pj-strip">
          <div className="pj-strip-track">
            {[...Array(3)]
              .flatMap(() => [
                "Colour Palette",
                "Logo Design",
                "Poster",
                "Typography",
                "Brand Identity",
                "Moodboard",
                "Illustrator",
                "Layout",
                "Hierarchy",
                "Visual Style",
                "Export",
                "Vector",
              ])
              .map((item, i) => (
                <div key={i} className="pj-strip-item">
                  <span className="pj-strip-dot" />
                  {item}
                </div>
              ))}
          </div>
        </div>

        {/* PROJECTS GRID */}
        <div className="pj-grid-section">
          <div className="pj-section-header">
            <div className="pj-section-title">THE PROJECTS</div>
            <div className="pj-section-line" />
          </div>
          <p className="pj-section-sub">
            Six briefs. Each one tests a different skill. Click a project to
            read the full brief, deliverables, and tips.
          </p>
          <div className="pj-cards-grid">
            {PROJECTS.map((p, i) => {
              const diffColor = DIFFICULTY_COLORS[p.difficulty];
              const isDone = completed.includes(p.id);
              return (
                <div
                  key={i}
                  className={`pj-card${activeProject === i ? " active-card" : ""}`}
                  style={{
                    borderColor:
                      activeProject === i
                        ? `${p.accent}35`
                        : "rgba(255,255,255,0.07)",
                    background:
                      activeProject === i
                        ? `${p.bg}cc`
                        : "rgba(255,255,255,0.02)",
                  }}
                  onClick={() => {
                    setActiveProject(i);
                    setActiveTab("brief");
                  }}
                >
                  {isDone && (
                    <div
                      className="pj-card-done-badge"
                      style={{ background: diffColor, color: "#000" }}
                    >
                      ✓
                    </div>
                  )}
                  <span className="pj-card-emoji">{p.emoji}</span>
                  <div className="pj-card-num">{p.number}</div>
                  <div className="pj-card-cat">{p.category}</div>
                  <div
                    className="pj-card-title"
                    style={{ color: activeProject === i ? p.accent : "#fff" }}
                  >
                    {p.title}
                  </div>
                  <div className="pj-card-meta">
                    <span
                      className="pj-card-diff"
                      style={{
                        background: `${diffColor}18`,
                        border: `0.5px solid ${diffColor}40`,
                        color: diffColor,
                      }}
                    >
                      {p.difficulty}
                    </span>
                    <span className="pj-card-time">{p.duration}</span>
                  </div>
                  <div
                    className="pj-card-line"
                    style={{ background: p.accent }}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* DETAIL PANEL */}
        <div className="pj-detail">
          <div className="pj-detail-left">
            <div className="pj-detail-header">
              <div>
                <div
                  style={{
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    color: DIFFICULTY_COLORS[project.difficulty],
                    marginBottom: 8,
                  }}
                >
                  {project.category} · {project.difficulty}
                </div>
                <div className="pj-detail-title">{project.title}</div>
              </div>
              <div className="pj-detail-emoji">{project.emoji}</div>
            </div>

            {/* TABS */}
            <div className="pj-tabs">
              {["brief", "deliverables", "tips", "skills"].map((tab) => (
                <button
                  key={tab}
                  className={`pj-tab${activeTab === tab ? " active-tab" : ""}`}
                  style={
                    activeTab === tab
                      ? {
                          color: project.accent,
                          borderBottomColor: project.accent,
                        }
                      : {}
                  }
                  onClick={() => setActiveTab(tab)}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            {activeTab === "brief" && (
              <div
                className="pj-brief"
                style={{ borderLeftColor: project.accent }}
              >
                {project.brief}
              </div>
            )}
            {activeTab === "deliverables" && (
              <div>
                <div className="pj-list-label">What to submit</div>
                {project.deliverables.map((d, i) => (
                  <div key={i} className="pj-list-item">
                    <span
                      className="pj-list-bullet"
                      style={{ color: project.accent }}
                    >
                      →
                    </span>
                    {d}
                  </div>
                ))}
              </div>
            )}
            {activeTab === "tips" && (
              <div>
                <div className="pj-list-label">Designer's tips</div>
                {project.tips.map((t, i) => (
                  <div key={i} className="pj-tip-item">
                    <span
                      style={{ color: "#fde68a", fontSize: 12, flexShrink: 0 }}
                    >
                      💡
                    </span>
                    {t}
                  </div>
                ))}
              </div>
            )}
            {activeTab === "skills" && (
              <div>
                <div className="pj-list-label">Skills practised</div>
                <div className="pj-skills">
                  {project.skills.map((s, i) => (
                    <span
                      key={i}
                      className="pj-skill"
                      style={{
                        borderColor: `${project.accent}25`,
                        color: `${project.accent}90`,
                      }}
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <div
                  style={{
                    marginTop: 20,
                    fontSize: 13,
                    color: "rgba(255,255,255,0.3)",
                    lineHeight: 1.7,
                  }}
                >
                  This project tests what you've learned across multiple
                  modules. If something feels unclear, revisit the relevant
                  lecture before submitting.
                </div>
              </div>
            )}
          </div>

          {/* SUBMIT PANEL */}
          <div className="pj-detail-right">
            <div>
              <div className="pj-submit-title">Submit Your Work</div>
              <p className="pj-submit-sub">
                Drop your finished file below. JPG, PNG, PDF or AI files
                accepted. When you're happy with it, mark the project complete.
              </p>
            </div>
            <UploadArea projectId={project.id} accent={project.accent} />
            {/* placeholder slots for future images */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 8,
              }}
            >
              {[1, 2].map((i) => (
                <div
                  key={i}
                  style={{
                    height: 90,
                    border: "1px dashed rgba(255,255,255,0.07)",
                    borderRadius: 6,
                    background: "rgba(255,255,255,0.01)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 11,
                    color: "rgba(255,255,255,0.15)",
                    letterSpacing: "0.08em",
                  }}
                >
                  Preview {i}
                </div>
              ))}
            </div>
            <button
              className={`pj-done-btn${completed.includes(project.id) ? " done" : " undone"}`}
              onClick={(e) => toggleComplete(project.id, e)}
            >
              {completed.includes(project.id)
                ? "✓ Project complete"
                : "Mark as complete"}
            </button>
          </div>
        </div>

        {/* PROGRESS SUMMARY */}
        <div
          style={{
            padding: "60px 56px",
            background: "#0b0b12",
            borderTop: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              gap: 16,
              marginBottom: 28,
            }}
          >
            <div
              style={{
                fontFamily: "'Bebas Neue',sans-serif",
                fontSize: "clamp(2rem,4vw,3.5rem)",
                color: "#fff",
              }}
            >
              YOUR PROGRESS
            </div>
            <div
              style={{
                flex: 1,
                height: 1,
                background: "rgba(255,255,255,0.07)",
              }}
            />
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(6,1fr)",
              gap: 10,
            }}
          >
            {PROJECTS.map((p, i) => {
              const isDone = completed.includes(p.id);
              return (
                <div
                  key={i}
                  onClick={() => setActiveProject(i)}
                  style={{
                    cursor: "pointer",
                    borderRadius: 10,
                    padding: "18px 14px",
                    border: `1px solid ${isDone ? `${p.accent}40` : "rgba(255,255,255,0.06)"}`,
                    background: isDone ? `${p.bg}cc` : "rgba(255,255,255,0.02)",
                    transition: "all 0.2s",
                    textAlign: "center",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.borderColor = `${p.accent}40`)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.borderColor = isDone
                      ? `${p.accent}40`
                      : "rgba(255,255,255,0.06)")
                  }
                >
                  <div style={{ fontSize: 20, marginBottom: 8 }}>
                    {isDone ? "✓" : p.emoji}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Bebas Neue',sans-serif",
                      fontSize: 11,
                      color: isDone ? p.accent : "rgba(255,255,255,0.35)",
                      letterSpacing: "0.06em",
                      lineHeight: 1.3,
                    }}
                  >
                    {p.title}
                  </div>
                </div>
              );
            })}
          </div>
          {completedCount === PROJECTS.length && (
            <div
              style={{
                marginTop: 28,
                padding: "20px 24px",
                borderRadius: 10,
                background: "rgba(253,230,138,0.08)",
                border: "1px solid rgba(253,230,138,0.2)",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontFamily: "'Bebas Neue',sans-serif",
                  fontSize: 28,
                  color: "#fde68a",
                  marginBottom: 6,
                }}
              >
                ALL PROJECTS COMPLETE 🏆
              </div>
              <div style={{ fontSize: 13, color: "rgba(255,255,255,0.4)" }}>
                You've completed the Genesis Design Course. Your portfolio is
                ready.
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
