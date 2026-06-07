import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import { useProgress } from "../context/ProgressContext";

const MODULES = [
  {
    id: 1,
    tag: "Foundation",
    title: "Color Theory",
    description:
      "Understand hue, saturation, value, and how colors interact to create emotion and hierarchy.",
    lectures: 3,
    duration: "1h 20m",
    level: "Beginner",
    moduleKey: "colour-theory",
  },
  {
    id: 2,
    tag: "Foundation",
    title: "Typography",
    description:
      "Master typefaces, type scales, spacing, and how to pair fonts for clarity and aesthetic.",
    lectures: 8,
    duration: "55m",
    level: "Beginner",
    moduleKey: "typography",
  },
  {
    id: 3,
    tag: "Foundation",
    title: "Layout & Composition",
    description:
      "Grids, alignment, proximity, and the principles that create visual balance.",
    lectures: 3,
    duration: "1h 10m",
    level: "Beginner",
    moduleKey: "layout-composition",
  },
  {
    id: 4,
    tag: "Skills",
    title: "Logo Design",
    description:
      "From concept to vector — learn to design logos that are simple, memorable, and versatile.",
    lectures: 5,
    duration: "2h 05m",
    level: "Intermediate",
    moduleKey: "logo-design",
  },
  {
    id: 5,
    tag: "Skills",
    title: "Poster Creation",
    description:
      "Combine typography, imagery, and layout to produce striking poster designs.",
    lectures: 4,
    duration: "1h 40m",
    level: "Intermediate",
    moduleKey: "poster-creation",
  },
  {
    id: 6,
    tag: "Skills",
    title: "Design Styles",
    description:
      "Y2K, Brutalist, Clean, Vaporwave — learn to identify, deconstruct, and build any aesthetic.",
    lectures: 3,
    duration: "36m",
    level: "Intermediate",
    moduleKey: "design-styles",
  },
  {
    id: 7,
    tag: "Illustrator",
    title: "Illustrator Basics",
    description:
      "Setup, shortcuts, tools, and export — the four pillars of working in Illustrator.",
    lectures: 4,
    duration: "42m",
    level: "Beginner",
    moduleKey: "ai-basics",
  },
  {
    id: 8,
    tag: "Illustrator",
    title: "Illustrator Intermediate",
    description:
      "Video tutorials — watch real process from logo to poster inside Illustrator.",
    lectures: 3,
    duration: "Video",
    level: "Intermediate",
    moduleKey: "ai-intermediate",
  },
  {
    id: 9,
    tag: "Practice",
    title: "Projects & Assignments",
    description:
      "Real briefs with structured feedback. Build your portfolio as you learn.",
    lectures: 6,
    duration: "Self-paced",
    level: "All levels",
    moduleKey: "projects",
  },
];

const TAG_STYLES = {
  Foundation: {
    tagBg: "rgba(196,181,253,0.18)",
    tagBorder: "rgba(196,181,253,0.55)",
    tagText: "#ddd6fe",
    accent: "#c4b5fd",
    glow: "rgba(196,181,253,0.12)",
    cardBg: "rgba(196,181,253,0.07)",
    cardBorder: "rgba(196,181,253,0.28)",
    hoverBorder: "rgba(196,181,253,0.6)",
    hoverBg: "rgba(196,181,253,0.12)",
    metaDivider: "rgba(196,181,253,0.15)",
  },
  Skills: {
    tagBg: "rgba(249,168,212,0.15)",
    tagBorder: "rgba(249,168,212,0.5)",
    tagText: "#fce7f3",
    accent: "#f9a8d4",
    glow: "rgba(249,168,212,0.1)",
    cardBg: "rgba(249,168,212,0.06)",
    cardBorder: "rgba(249,168,212,0.25)",
    hoverBorder: "rgba(249,168,212,0.55)",
    hoverBg: "rgba(249,168,212,0.1)",
    metaDivider: "rgba(249,168,212,0.14)",
  },
  Illustrator: {
    tagBg: "rgba(134,239,172,0.13)",
    tagBorder: "rgba(134,239,172,0.45)",
    tagText: "#bbf7d0",
    accent: "#4ade80",
    glow: "rgba(74,222,128,0.09)",
    cardBg: "rgba(74,222,128,0.05)",
    cardBorder: "rgba(74,222,128,0.22)",
    hoverBorder: "rgba(74,222,128,0.5)",
    hoverBg: "rgba(74,222,128,0.09)",
    metaDivider: "rgba(74,222,128,0.13)",
  },
  Practice: {
    tagBg: "rgba(251,113,133,0.13)",
    tagBorder: "rgba(251,113,133,0.45)",
    tagText: "#fecdd3",
    accent: "#fb7185",
    glow: "rgba(251,113,133,0.09)",
    cardBg: "rgba(251,113,133,0.05)",
    cardBorder: "rgba(251,113,133,0.22)",
    hoverBorder: "rgba(251,113,133,0.5)",
    hoverBg: "rgba(251,113,133,0.09)",
    metaDivider: "rgba(251,113,133,0.13)",
  },
};

const FILTERS = ["All", "Foundation", "Skills", "Illustrator", "Practice"];

function ProgressRing({ overallPct, modulesPct }) {
  const size = 180;
  const outerR = 78;
  const innerR = 58;
  const outerCirc = 2 * Math.PI * outerR;
  const innerCirc = 2 * Math.PI * innerR;
  const outerDash = (overallPct / 100) * outerCirc;
  const innerDash = (modulesPct / 100) * innerCirc;

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 16,
      }}
    >
      <div style={{ position: "relative", width: size, height: size }}>
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          style={{ transform: "rotate(-90deg)" }}
        >
          {/* outer track — lectures */}
          <circle
            cx={90}
            cy={90}
            r={outerR}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={8}
          />
          <circle
            cx={90}
            cy={90}
            r={outerR}
            fill="none"
            stroke="url(#og)"
            strokeWidth={8}
            strokeDasharray={`${outerDash} ${outerCirc - outerDash}`}
            strokeLinecap="round"
          />
          {/* inner track — modules */}
          <circle
            cx={90}
            cy={90}
            r={innerR}
            fill="none"
            stroke="rgba(255,255,255,0.06)"
            strokeWidth={8}
          />
          <circle
            cx={90}
            cy={90}
            r={innerR}
            fill="none"
            stroke="url(#ig)"
            strokeWidth={8}
            strokeDasharray={`${innerDash} ${innerCirc - innerDash}`}
            strokeLinecap="round"
          />
          <defs>
            <linearGradient id="og" x1="1" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" />
              <stop offset="100%" stopColor="#f472b6" />
            </linearGradient>
            <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fb923c" />
              <stop offset="100%" stopColor="#fde68a" />
            </linearGradient>
          </defs>
        </svg>
        {/* center */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            gap: 2,
          }}
        >
          <span
            style={{
              fontFamily: "'Bebas Neue',sans-serif",
              fontSize: 36,
              color: "#fff",
              lineHeight: 1,
            }}
          >
            {overallPct}%
          </span>
          <span
            style={{
              fontSize: 9,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.25)",
            }}
          >
            complete
          </span>
        </div>
      </div>
      {/* legend */}
      <div style={{ display: "flex", gap: 20 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#a78bfa,#f472b6)",
            }}
          />
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
            }}
          >
            Lectures
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <div
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "linear-gradient(135deg,#fb923c,#fde68a)",
            }}
          />
          <span
            style={{
              fontSize: 10,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.08em",
            }}
          >
            Modules
          </span>
        </div>
      </div>
    </div>
  );
}

const ModulesPage = () => {
  const [active, setActive] = useState("All");
  const cardRefs = useRef([]);
  const navigate = useNavigate();
  const { getModuleProgress } = useProgress();

  const getPct = (m) =>
    !m.moduleKey ? 0 : getModuleProgress(m.moduleKey, m.lectures).pct;
  const isDone = (m) => getPct(m) === 100 && !!m.moduleKey;

  const totalLectures = MODULES.reduce((a, m) => a + m.lectures, 0);
  const doneLectures = MODULES.reduce(
    (a, m) =>
      !m.moduleKey ? a : a + getModuleProgress(m.moduleKey, m.lectures).done,
    0,
  );
  const overallPct = Math.round((doneLectures / totalLectures) * 100);

  const completedModules = MODULES.filter((m) => isDone(m)).length;
  const modulesPct = Math.round((completedModules / MODULES.length) * 100);

  const filtered =
    active === "All" ? MODULES : MODULES.filter((m) => m.tag === active);

  const goTo = (id) => {
    const r = {
      1: "/colour-theory",
      2: "/typography",
      3: "/layout-composition",
      4: "/logo-design",
      5: "/poster-creation",
      6: "/design-styles",
      7: "/illustrator-basics",
      8: "/illustrator-intermediate",
      9: "/projects",
    };
    if (r[id]) navigate(r[id]);
  };

  useEffect(() => {
    cardRefs.current.forEach((c) => {
      if (c) {
        c.style.opacity = "0";
        c.style.transform = "translateY(24px)";
      }
    });
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const i = cardRefs.current.indexOf(e.target);
            setTimeout(
              () => {
                if (e.target) {
                  e.target.style.opacity = "1";
                  e.target.style.transform = "translateY(0)";
                }
              },
              (i % 3) * 90,
            );
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.06 },
    );
    const t = setTimeout(
      () => cardRefs.current.forEach((c) => c && obs.observe(c)),
      50,
    );
    return () => {
      clearTimeout(t);
      obs.disconnect();
    };
  }, [filtered]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500&family=DM+Serif+Display&family=Bebas+Neue&display=swap');
        .mp-page{width:100%;min-height:100vh;background:#080010;font-family:'DM Sans',sans-serif;position:relative;overflow-x:hidden;}
        .mp-blob{position:fixed;border-radius:50%;pointer-events:none;z-index:0;}
        .mp-inner{position:relative;z-index:10;padding:120px 32px 100px;max-width:1100px;margin:0 auto;}
        .mp-header{text-align:center;margin-bottom:36px;}
        .mp-eyebrow{font-size:11px;letter-spacing:0.2em;text-transform:uppercase;color:rgba(255,255,255,0.2);margin-bottom:14px;}
        .mp-title{font-family:'DM Serif Display',serif;font-size:clamp(36px,5vw,64px);font-weight:400;color:rgba(255,255,255,0.92);margin-bottom:12px;line-height:1.1;letter-spacing:-0.02em;}
        .mp-subtitle{font-size:13px;color:rgba(255,255,255,0.2);letter-spacing:0.1em;text-transform:uppercase;}
        .mp-ring-row{display:flex;justify-content:center;margin-bottom:44px;}
        .mp-filters{display:flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-bottom:40px;}
        .mp-filter-btn{padding:8px 22px;border-radius:999px;font-size:13px;font-family:'DM Sans',sans-serif;cursor:pointer;transition:all 0.2s;letter-spacing:0.02em;}
        .mp-grid{display:grid;grid-template-columns:repeat(auto-fill,minmax(310px,1fr));gap:16px;}
        .mp-card{border-radius:22px;padding:26px 24px;opacity:0;transform:translateY(24px);transition:opacity 0.5s,transform 0.5s,border-color 0.2s,background 0.2s,box-shadow 0.2s;cursor:pointer;position:relative;overflow:hidden;}
        .mp-card-num{position:absolute;top:20px;right:20px;font-size:11px;font-weight:500;letter-spacing:0.08em;opacity:0.35;}
        .mp-card-tag{display:inline-flex;align-items:center;gap:6px;padding:4px 12px;border-radius:999px;font-size:10px;font-weight:500;letter-spacing:0.1em;text-transform:uppercase;margin-bottom:16px;}
        .mp-card-dot{width:5px;height:5px;border-radius:50%;flex-shrink:0;}
        .mp-card-title{font-family:'DM Serif Display',serif;font-size:22px;font-weight:400;margin-bottom:10px;line-height:1.25;letter-spacing:-0.01em;color:rgba(255,255,255,0.92);}
        .mp-card-desc{font-size:13px;line-height:1.75;margin-bottom:22px;color:rgba(255,255,255,0.45);}
        .mp-card-meta{display:flex;gap:14px;font-size:11px;padding-top:16px;flex-wrap:wrap;color:rgba(255,255,255,0.35);}
        .mp-done-badge{display:inline-flex;align-items:center;gap:5px;font-size:10px;font-weight:500;letter-spacing:0.08em;text-transform:uppercase;padding:3px 10px;border-radius:999px;background:rgba(52,211,153,0.1);border:0.5px solid rgba(52,211,153,0.3);color:#6ee7b7;margin-bottom:14px;}
        .mp-prog-track{height:2px;background:rgba(255,255,255,0.06);border-radius:2px;overflow:hidden;margin:12px 0 4px;}
        .mp-prog-fill{height:100%;border-radius:2px;transition:width 0.6s ease;}
        .mp-prog-label{font-size:10px;color:rgba(255,255,255,0.22);}
      `}</style>

      <div className="mp-page">
        <div
          className="mp-blob"
          style={{
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle,rgba(167,139,250,0.08) 0%,transparent 70%)",
            top: -200,
            left: -200,
          }}
        />
        <div
          className="mp-blob"
          style={{
            width: 500,
            height: 500,
            background:
              "radial-gradient(circle,rgba(244,114,182,0.07) 0%,transparent 70%)",
            bottom: 0,
            right: -100,
          }}
        />
        <Navbar />
        <div className="mp-inner">
          <div className="mp-header">
            <div className="mp-eyebrow">Genesis Design Course</div>
            <div className="mp-title">All Modules</div>
            <div className="mp-subtitle">
              {MODULES.length} modules · {totalLectures} lectures
            </div>
          </div>

          <div className="mp-ring-row">
            <ProgressRing overallPct={overallPct} modulesPct={modulesPct} />
          </div>

          <div className="mp-filters">
            {FILTERS.map((f) => (
              <button
                key={f}
                className="mp-filter-btn"
                onClick={() => setActive(f)}
                style={{
                  background:
                    active === f
                      ? "rgba(255,255,255,0.09)"
                      : "rgba(255,255,255,0.03)",
                  border:
                    active === f
                      ? "0.5px solid rgba(255,255,255,0.22)"
                      : "0.5px solid rgba(255,255,255,0.08)",
                  color:
                    active === f
                      ? "rgba(255,255,255,0.9)"
                      : "rgba(255,255,255,0.35)",
                }}
              >
                {f}
              </button>
            ))}
          </div>

          <div className="mp-grid">
            {filtered.map((m, i) => {
              const s = TAG_STYLES[m.tag];
              const pct = getPct(m);
              const done = isDone(m);
              return (
                <div
                  key={m.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="mp-card"
                  onClick={() => goTo(m.id)}
                  style={{
                    background: s.cardBg,
                    border: `1px solid ${s.cardBorder}`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = s.hoverBorder;
                    e.currentTarget.style.background = s.hoverBg;
                    e.currentTarget.style.boxShadow = `0 12px 40px ${s.glow}`;
                    e.currentTarget.style.transform = "translateY(-3px)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = s.cardBorder;
                    e.currentTarget.style.background = s.cardBg;
                    e.currentTarget.style.boxShadow = "none";
                    e.currentTarget.style.transform = "translateY(0)";
                  }}
                >
                  {done && <div className="mp-done-badge">✓ Completed</div>}
                  <div className="mp-card-num" style={{ color: s.tagText }}>
                    {String(m.id).padStart(2, "0")}
                  </div>
                  <div
                    className="mp-card-tag"
                    style={{
                      background: s.tagBg,
                      border: `1px solid ${s.tagBorder}`,
                      color: s.tagText,
                    }}
                  >
                    <div
                      className="mp-card-dot"
                      style={{ background: s.accent }}
                    />
                    {m.tag}
                  </div>
                  <div className="mp-card-title">{m.title}</div>
                  <div className="mp-card-desc">{m.description}</div>
                  <div
                    className="mp-card-meta"
                    style={{ borderTop: `1px solid ${s.metaDivider}` }}
                  >
                    <span style={{ color: s.tagText }}>
                      {m.lectures} lectures
                    </span>
                    <span>{m.duration}</span>
                    <span>{m.level}</span>
                  </div>
                  {m.moduleKey && pct > 0 && (
                    <>
                      <div className="mp-prog-track">
                        <div
                          className="mp-prog-fill"
                          style={{ width: `${pct}%`, background: s.accent }}
                        />
                      </div>
                      <div className="mp-prog-label">{pct}% complete</div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default ModulesPage;
