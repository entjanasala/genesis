import { useState, useEffect } from "react";

const QUIZ = [
  {
    q: "Which logo would you trust more for a bank?",
    a: {
      text: "Solaris",
      style: {
        fontFamily: "Georgia,serif",
        fontWeight: 700,
        fontSize: 30,
        color: "#fff",
      },
    },
    b: {
      text: "SOLARIS",
      style: {
        fontFamily: "Impact,sans-serif",
        fontWeight: 900,
        fontSize: 32,
        color: "#ffd60a",
        textShadow: "0 0 20px rgba(255,214,10,0.6)",
      },
    },
    correct: "a",
    explain:
      "Serif = trust, authority, tradition. The glowing yellow feels exciting but untrustworthy for finance. Banks want calm confidence, not a rave.",
    emoji: "🏦",
  },
  {
    q: "Which is more memorable after one glance?",
    a: {
      text: "G.",
      style: {
        fontFamily: "Georgia,serif",
        fontWeight: 400,
        fontSize: 52,
        color: "#fff",
      },
    },
    b: {
      text: "GENESIS DESIGN STUDIO EST. 2024",
      style: {
        fontFamily: "sans-serif",
        fontWeight: 400,
        fontSize: 11,
        color: "#fff",
        letterSpacing: 3,
      },
    },
    correct: "a",
    explain:
      "The single letter wins every time. Complexity divides attention. Simplicity concentrates it. You remember 'G.' — not the paragraph.",
    emoji: "🧠",
  },
  {
    q: "A children's toy brand. Which shape fits?",
    a: {
      isShape: true,
      shape: "●",
      style: { fontSize: 64, color: "#f9a8d4" },
      label: "Circle",
    },
    b: {
      isShape: true,
      shape: "▲",
      style: { fontSize: 64, color: "#f9a8d4" },
      label: "Triangle",
    },
    correct: "a",
    explain:
      "Circles feel safe, warm, and approachable — perfect for kids. Triangles feel powerful and directional — great for energy drinks, not teddy bears.",
    emoji: "🧸",
  },
  {
    q: "Which logo survives being photocopied?",
    a: {
      text: "◉ BRAND",
      style: {
        fontFamily: "sans-serif",
        fontWeight: 700,
        fontSize: 24,
        color: "#fff",
        letterSpacing: 4,
      },
    },
    b: {
      text: "◉ BRAND",
      style: {
        fontFamily: "sans-serif",
        fontWeight: 700,
        fontSize: 24,
        background: "linear-gradient(135deg,#c4b5fd,#f9a8d4)",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        letterSpacing: 4,
        display: "inline-block",
      },
    },
    correct: "a",
    explain:
      "Gradient logos disappear on black & white printers, embroidery, and signage. Always design in black first. Colour is the last layer, never the foundation.",
    emoji: "🖨️",
  },
];

const PRINCIPLES = [
  {
    num: "01",
    name: "Simple",
    icon: "○",
    color: "#c4b5fd",
    bg: "#1a0a3e",
    test: "Draw it from memory in 10 seconds",
    fact: "The Nike Swoosh took 17.5 hours to design and $35 to buy.",
  },
  {
    num: "02",
    name: "Memorable",
    icon: "◎",
    color: "#f9a8d4",
    bg: "#3a0a2e",
    test: "Recognise it after one glance",
    fact: "The human brain processes images 60,000× faster than text.",
  },
  {
    num: "03",
    name: "Versatile",
    icon: "⊞",
    color: "#fdba74",
    bg: "#2a1a00",
    test: "Works in black & white",
    fact: "A logo must work from 16px favicon to 16-metre billboard.",
  },
  {
    num: "04",
    name: "Timeless",
    icon: "◷",
    color: "#6ee7b7",
    bg: "#001a1a",
    test: "Won't look dated in 10 years",
    fact: "The Coca-Cola script has been virtually unchanged since 1887.",
  },
  {
    num: "05",
    name: "Appropriate",
    icon: "⊙",
    color: "#a5f3fc",
    bg: "#001a2e",
    test: "Fits the brand personality",
    fact: "Serif = traditional. Sans = modern. Script = personal. Choose deliberately.",
  },
];

export default function LogoWhatMakesPage({ onBack }) {
  const [activeP, setActiveP] = useState(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [answer, setAnswer] = useState(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const [logoText, setLogoText] = useState("G");
  const [logoSize, setLogoSize] = useState(80);
  const [logoColour, setLogoColour] = useState("#c4b5fd");
  const [isBW, setIsBW] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const round = QUIZ[quizIdx];
  const handleAnswer = (choice) => {
    if (answer) return;
    setAnswer(choice);
    if (choice === round.correct) setScore((s) => s + 1);
  };
  const next = () => {
    if (quizIdx < QUIZ.length - 1) {
      setQuizIdx((i) => i + 1);
      setAnswer(null);
    } else setDone(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .lw-page { min-height:100vh; background:#0f0f14; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }

        /* NAV */
        .lw-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(15,15,20,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(255,255,255,0.08); z-index:100; }
        .lw-back { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .lw-back:hover { color:#fff; border-color:rgba(255,255,255,0.4); }
        .lw-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.12em; color:rgba(255,255,255,0.6); }
        .lw-tag { font-size:10px; letter-spacing:0.15em; color:rgba(255,255,255,0.25); text-transform:uppercase; }

        /* HERO — colourful magazine cover style */
        .lw-hero { position:relative; overflow:hidden; background:#0f0f14; border-bottom:1px solid rgba(255,255,255,0.08); }
        .lw-hero-inner { display:grid; grid-template-columns:1fr 1fr; min-height:340px; }
        .lw-hero-left { padding:64px 56px; display:flex; flex-direction:column; justify-content:center; position:relative; z-index:2; }
        .lw-hero-right { display:flex; align-items:center; justify-content:center; position:relative; padding:40px; }
        .lw-hero-eyebrow { font-size:10px; letter-spacing:0.3em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:14px; display:flex; align-items:center; gap:10px; }
        .lw-hero-eyebrow::before { content:''; width:24px; height:1px; background:rgba(255,255,255,0.3); }
        .lw-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(3.5rem,8vw,7rem); line-height:0.88; letter-spacing:0.02em; color:#fff; margin-bottom:20px; }
        .lw-hero-title span { display:block; background:linear-gradient(135deg,#c4b5fd,#f9a8d4,#fdba74); -webkit-background-clip:text; background-clip:text; color:transparent; }
        .lw-hero-sub { font-size:14px; color:rgba(255,255,255,0.35); line-height:1.8; max-width:360px; }

        /* floating number cards */
        .lw-float-card { position:absolute; border-radius:12px; padding:16px 20px; backdrop-filter:blur(10px); border:1px solid rgba(255,255,255,0.1); }
        .lw-float-num { font-family:'Bebas Neue',sans-serif; font-size:48px; line-height:1; }
        .lw-float-label { font-size:10px; letter-spacing:0.1em; text-transform:uppercase; color:rgba(255,255,255,0.4); margin-top:4px; }

        /* PRINCIPLES — colourful cards */
        .lw-principles { padding:64px 56px; border-bottom:1px solid rgba(255,255,255,0.08); }
        .lw-sec-label { font-size:10px; letter-spacing:0.25em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:28px; display:flex; align-items:center; gap:12px; }
        .lw-sec-label::after { content:''; flex:1; height:1px; background:rgba(255,255,255,0.07); }
        .lw-p-grid { display:grid; grid-template-columns:repeat(5,1fr); gap:12px; margin-bottom:28px; }
        .lw-p-card { border-radius:16px; padding:28px 20px; cursor:pointer; transition:all 0.25s; position:relative; overflow:hidden; border:1px solid rgba(255,255,255,0.06); }
        .lw-p-card:hover { transform:translateY(-4px); }
        .lw-p-card.p-active { transform:translateY(-4px); }
        .lw-p-icon { font-size:36px; margin-bottom:14px; display:block; transition:transform 0.3s; }
        .lw-p-card:hover .lw-p-icon, .lw-p-card.p-active .lw-p-icon { transform:scale(1.2) rotate(-5deg); }
        .lw-p-num { font-size:10px; letter-spacing:0.12em; color:rgba(255,255,255,0.25); margin-bottom:4px; }
        .lw-p-name { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:0.04em; margin-bottom:6px; }
        .lw-p-test { font-size:11px; color:rgba(255,255,255,0.35); line-height:1.5; }
        /* detail panel below */
        .lw-p-detail { border-radius:16px; padding:28px 32px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.03); display:flex; align-items:center; gap:24px; transition:all 0.3s; min-height:80px; }
        .lw-p-detail-icon { font-size:32px; flex-shrink:0; }
        .lw-p-detail-name { font-family:'Bebas Neue',sans-serif; font-size:28px; margin-bottom:4px; }
        .lw-p-detail-fact { font-size:13px; color:rgba(255,255,255,0.4); line-height:1.65; }

        /* QUIZ — fun game style */
        .lw-quiz { padding:64px 56px; border-bottom:1px solid rgba(255,255,255,0.08); background:#0d0d12; }
        .lw-quiz-header { display:flex; align-items:center; justify-content:space-between; margin-bottom:32px; }
        .lw-quiz-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; }
        .lw-quiz-score-pill { background:rgba(255,255,255,0.06); border:1px solid rgba(255,255,255,0.1); border-radius:999px; padding:6px 16px; font-size:12px; color:rgba(255,255,255,0.4); }
        .lw-quiz-progress { display:flex; gap:6px; margin-bottom:28px; }
        .lw-quiz-pip { height:3px; flex:1; border-radius:999px; background:rgba(255,255,255,0.1); }
        .lw-quiz-pip.done { background:#86efac; }
        .lw-quiz-pip.current { background:#c4b5fd; }
        .lw-quiz-emoji { font-size:32px; margin-bottom:12px; display:block; }
        .lw-quiz-q { font-family:'DM Serif Display',serif; font-size:clamp(1.4rem,2.5vw,2rem); color:#fff; margin-bottom:28px; line-height:1.3; }
        .lw-quiz-options { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:20px; }
        .lw-quiz-opt { border-radius:14px; padding:28px 20px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:10px; cursor:pointer; transition:all 0.2s; border:1.5px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.03); min-height:120px; }
        .lw-quiz-opt:hover { background:rgba(255,255,255,0.06); border-color:rgba(255,255,255,0.2); transform:scale(1.02); }
        .lw-quiz-opt.correct { border-color:#86efac; background:rgba(134,239,172,0.1); }
        .lw-quiz-opt.wrong { border-color:rgba(251,113,133,0.5); background:rgba(251,113,133,0.06); opacity:0.6; }
        .lw-quiz-opt-label { font-size:10px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.25); }
        .lw-quiz-explain { border-radius:12px; padding:18px 22px; background:rgba(134,239,172,0.08); border:1px solid rgba(134,239,172,0.2); font-size:13px; color:rgba(255,255,255,0.5); line-height:1.75; margin-bottom:16px; }
        .lw-quiz-explain strong { color:#86efac; }
        .lw-quiz-next { background:rgba(255,255,255,0.08); border:1px solid rgba(255,255,255,0.15); color:#fff; padding:10px 24px; border-radius:8px; font-size:12px; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }
        .lw-quiz-next:hover { background:rgba(255,255,255,0.14); }
        .lw-quiz-done { text-align:center; padding:40px 0; }
        .lw-quiz-done-score { font-family:'Bebas Neue',sans-serif; font-size:80px; line-height:1; margin-bottom:8px; }
        .lw-quiz-done-label { font-size:14px; color:rgba(255,255,255,0.4); margin-bottom:20px; }
        .lw-quiz-retry { background:none; border:1px solid rgba(255,255,255,0.15); color:rgba(255,255,255,0.5); padding:8px 20px; border-radius:6px; font-size:11px; letter-spacing:0.1em; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; }

        /* LOGO BUILDER */
        .lw-builder { display:grid; grid-template-columns:1fr 1fr; border-top:1px solid rgba(255,255,255,0.08); }
        .lw-builder-left { padding:64px 56px; border-right:1px solid rgba(255,255,255,0.08); }
        .lw-builder-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; margin-bottom:8px; }
        .lw-builder-sub { font-size:13px; color:rgba(255,255,255,0.3); line-height:1.7; margin-bottom:36px; }
        .lw-control { margin-bottom:24px; }
        .lw-control-label { font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.3); margin-bottom:10px; }
        .lw-text-input { background:rgba(255,255,255,0.05); border:1px solid rgba(255,255,255,0.12); border-radius:6px; padding:10px 14px; color:#fff; font-size:20px; font-family:'DM Serif Display',serif; width:100%; outline:none; letter-spacing:0.02em; }
        .lw-text-input:focus { border-color:rgba(255,255,255,0.3); }
        .lw-slider { width:100%; accent-color:#c4b5fd; }
        .lw-colour-row { display:flex; gap:8px; flex-wrap:wrap; }
        .lw-colour-dot { width:28px; height:28px; border-radius:50%; cursor:pointer; border:2px solid transparent; transition:all 0.2s; }
        .lw-colour-dot.selected { border-color:#fff; transform:scale(1.2); }
        .lw-bw-toggle { display:flex; align-items:center; gap:10px; cursor:pointer; margin-top:8px; }
        .lw-toggle-track { width:36px; height:20px; border-radius:10px; border:1px solid rgba(255,255,255,0.15); background:rgba(255,255,255,0.04); position:relative; transition:all 0.2s; }
        .lw-toggle-track.on { background:rgba(255,255,255,0.12); border-color:rgba(255,255,255,0.3); }
        .lw-toggle-thumb { width:14px; height:14px; border-radius:50%; background:rgba(255,255,255,0.4); position:absolute; top:2px; left:2px; transition:all 0.2s; }
        .lw-toggle-track.on .lw-toggle-thumb { left:18px; background:#fff; }
        .lw-toggle-lbl { font-size:12px; color:rgba(255,255,255,0.35); }

        .lw-builder-right { padding:64px 56px; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:28px; background:#0d0d12; }
        .lw-preview-box { width:200px; height:200px; border-radius:20px; border:1px solid rgba(255,255,255,0.08); background:#111; display:flex; align-items:center; justify-content:center; transition:all 0.3s; }
        .lw-preview-mark { font-family:'DM Serif Display',serif; font-weight:400; line-height:1; letter-spacing:-0.02em; transition:all 0.3s; display:inline-block; }
        .lw-preview-tests { display:flex; flex-direction:column; gap:8px; width:100%; max-width:240px; }
        .lw-test-row { display:flex; align-items:center; gap:10px; font-size:12px; color:rgba(255,255,255,0.3); }
        .lw-test-icon { font-size:14px; }
      `}</style>

      <div className="lw-page">
        <nav className="lw-nav">
          <button className="lw-back" onClick={onBack}>
            ← Back
          </button>
          <span className="lw-nav-title">What Makes a Logo Great</span>
          <span className="lw-tag">Lesson 01</span>
        </nav>

        {/* HERO */}
        <div className="lw-hero">
          <div className="lw-hero-inner">
            <div className="lw-hero-left">
              <div className="lw-hero-eyebrow">Logo Design · Lesson 01</div>
              <div className="lw-hero-title">
                THE 5 RULES
                <br />
                <span>
                  EVERY GREAT
                  <br />
                  LOGO OBEYS
                </span>
              </div>
              <p className="lw-hero-sub">
                Not four. Not three. Five. Miss one and the logo fails
                somewhere, somehow, for someone.
              </p>
            </div>
            <div className="lw-hero-right">
              {[
                {
                  num: "$35",
                  label: "Nike Swoosh cost",
                  color: "#f9a8d4",
                  bg: "rgba(249,168,212,0.1)",
                  top: "10%",
                  left: "5%",
                },
                {
                  num: "7s",
                  label: "To judge a brand",
                  color: "#fdba74",
                  bg: "rgba(253,186,116,0.1)",
                  top: "45%",
                  left: "55%",
                },
                {
                  num: "1887",
                  label: "Coca-Cola logo year",
                  color: "#6ee7b7",
                  bg: "rgba(110,231,183,0.1)",
                  top: "65%",
                  left: "0%",
                },
              ].map((c, i) => (
                <div
                  key={i}
                  className="lw-float-card"
                  style={{
                    top: c.top,
                    left: c.left,
                    background: c.bg,
                    borderColor: `${c.color}30`,
                  }}
                >
                  <div className="lw-float-num" style={{ color: c.color }}>
                    {c.num}
                  </div>
                  <div className="lw-float-label">{c.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* PRINCIPLES */}
        <div className="lw-principles">
          <div className="lw-sec-label">
            The 5 principles — click each to learn more
          </div>
          <div className="lw-p-grid">
            {PRINCIPLES.map((p, i) => (
              <div
                key={i}
                className={`lw-p-card${activeP === i ? " p-active" : ""}`}
                style={{
                  background: activeP === i ? p.bg : "rgba(255,255,255,0.03)",
                  borderColor:
                    activeP === i ? `${p.color}40` : "rgba(255,255,255,0.06)",
                }}
                onClick={() => setActiveP(activeP === i ? null : i)}
              >
                <span className="lw-p-icon" style={{ color: p.color }}>
                  {p.icon}
                </span>
                <div className="lw-p-num">{p.num}</div>
                <div className="lw-p-name" style={{ color: p.color }}>
                  {p.name}
                </div>
                <div className="lw-p-test">{p.test}</div>
              </div>
            ))}
          </div>
          {activeP !== null && (
            <div className="lw-p-detail">
              <div className="lw-p-detail-icon">{PRINCIPLES[activeP].icon}</div>
              <div>
                <div
                  className="lw-p-detail-name"
                  style={{ color: PRINCIPLES[activeP].color }}
                >
                  {PRINCIPLES[activeP].name}
                </div>
                <div className="lw-p-detail-fact">
                  {PRINCIPLES[activeP].fact}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* QUIZ */}
        <div className="lw-quiz">
          <div className="lw-quiz-header">
            <div className="lw-quiz-title">
              THINK LIKE
              <br />A DESIGNER
            </div>
            <div className="lw-quiz-score-pill">
              Score: {score}/{QUIZ.length}
            </div>
          </div>
          <div className="lw-quiz-progress">
            {QUIZ.map((_, i) => (
              <div
                key={i}
                className={`lw-quiz-pip${i < quizIdx ? " done" : i === quizIdx ? " current" : ""}`}
              />
            ))}
          </div>
          {!done ? (
            <>
              <span className="lw-quiz-emoji">{round.emoji}</span>
              <div className="lw-quiz-q">{round.q}</div>
              <div className="lw-quiz-options">
                {["a", "b"].map((choice) => {
                  const opt = round[choice];
                  const answered = answer !== null;
                  const isCorrect = choice === round.correct;
                  return (
                    <div
                      key={choice}
                      className={`lw-quiz-opt${answered ? (isCorrect ? " correct" : " wrong") : ""}`}
                      onClick={() => handleAnswer(choice)}
                    >
                      <div className="lw-quiz-opt-label">
                        Option {choice.toUpperCase()}
                      </div>
                      {opt.isShape ? (
                        <div style={opt.style}>{opt.shape}</div>
                      ) : (
                        <div style={opt.style}>{opt.text}</div>
                      )}
                    </div>
                  );
                })}
              </div>
              {answer && (
                <>
                  <div className="lw-quiz-explain">
                    <strong>
                      {answer === round.correct
                        ? "✓ Correct! "
                        : "✗ Not quite — "}
                    </strong>
                    {round.explain}
                  </div>
                  <button className="lw-quiz-next" onClick={next}>
                    {quizIdx < QUIZ.length - 1 ? "Next →" : "See results →"}
                  </button>
                </>
              )}
            </>
          ) : (
            <div className="lw-quiz-done">
              <div
                className="lw-quiz-done-score"
                style={{
                  color:
                    score === QUIZ.length
                      ? "#86efac"
                      : score >= 3
                        ? "#fdba74"
                        : "#fda4af",
                }}
              >
                {score}/{QUIZ.length}
              </div>
              <div className="lw-quiz-done-label">
                {score === QUIZ.length
                  ? "🎉 Perfect — you think like a designer"
                  : score >= 3
                    ? "👍 Good instincts"
                    : "💪 Keep going — it clicks with practice"}
              </div>
              <button
                className="lw-quiz-retry"
                onClick={() => {
                  setQuizIdx(0);
                  setAnswer(null);
                  setScore(0);
                  setDone(false);
                }}
              >
                Try again
              </button>
            </div>
          )}
        </div>

        {/* LOGO BUILDER */}
        <div className="lw-builder">
          <div className="lw-builder-left">
            <div className="lw-builder-title">
              BUILD YOUR
              <br />
              OWN MARK
            </div>
            <p className="lw-builder-sub">
              Every decision has meaning. Experiment here and see how each
              choice changes what your mark communicates.
            </p>
            <div className="lw-control">
              <div className="lw-control-label">Your letter(s)</div>
              <input
                className="lw-text-input"
                value={logoText}
                maxLength={3}
                onChange={(e) => setLogoText(e.target.value)}
                placeholder="G"
              />
            </div>
            <div className="lw-control">
              <div className="lw-control-label">Size — {logoSize}px</div>
              <input
                type="range"
                className="lw-slider"
                min={32}
                max={120}
                value={logoSize}
                onChange={(e) => setLogoSize(Number(e.target.value))}
              />
            </div>
            <div className="lw-control">
              <div className="lw-control-label">Colour</div>
              <div className="lw-colour-row">
                {[
                  "#c4b5fd",
                  "#f9a8d4",
                  "#fdba74",
                  "#6ee7b7",
                  "#a5f3fc",
                  "#fda4af",
                  "#ffffff",
                  "#000000",
                ].map((c) => (
                  <div
                    key={c}
                    className={`lw-colour-dot${logoColour === c ? " selected" : ""}`}
                    style={{
                      background: c,
                      border:
                        c === "#000000"
                          ? "2px solid rgba(255,255,255,0.2)"
                          : undefined,
                    }}
                    onClick={() => setLogoColour(c)}
                  />
                ))}
              </div>
            </div>
            <div className="lw-bw-toggle" onClick={() => setIsBW(!isBW)}>
              <div className={`lw-toggle-track${isBW ? " on" : ""}`}>
                <div className="lw-toggle-thumb" />
              </div>
              <span className="lw-toggle-lbl">
                {isBW
                  ? "Greyscale — does it still work?"
                  : "Test in black & white"}
              </span>
            </div>
          </div>
          <div className="lw-builder-right">
            <div className="lw-preview-box">
              <div
                className="lw-preview-mark"
                style={{
                  fontSize: logoSize,
                  color: isBW ? "#fff" : logoColour,
                  filter: isBW ? "grayscale(1)" : "none",
                }}
              >
                {logoText || "G"}
              </div>
            </div>
            <div className="lw-preview-tests">
              {[
                {
                  icon: "✓",
                  label: "Readable at this size",
                  pass: logoSize >= 20,
                },
                { icon: "✓", label: "Works without colour", pass: true },
                {
                  icon: "✓",
                  label: "Simple enough to draw",
                  pass: (logoText || "G").length <= 2,
                },
              ].map((t, i) => (
                <div key={i} className="lw-test-row">
                  <span
                    className="lw-test-icon"
                    style={{ color: t.pass ? "#86efac" : "#fda4af" }}
                  >
                    {t.pass ? "✓" : "✗"}
                  </span>
                  <span
                    style={{
                      color: t.pass
                        ? "rgba(255,255,255,0.5)"
                        : "rgba(253,164,175,0.6)",
                    }}
                  >
                    {t.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
