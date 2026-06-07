import { useState, useEffect } from "react";

const FORMATS = [
  {
    id: "svg",
    ext: "SVG",
    name: "Scalable Vector",
    accent: "#f97316",
    emoji: "∞",
    best: "Logos, icons, web graphics",
    avoid: "Photos, complex illustrations with many gradients",
    size: "Tiny — often under 10KB",
    quality: "Perfect at any size",
    settings: [
      "Styling: Presentation Attributes",
      "Font: SVG",
      "Images: Embed",
      "Object IDs: Layer Names",
    ],
    tip: "The gold standard for logos and icons. Scales from favicon to billboard without losing quality.",
    howTo: "File → Export → Export As → SVG",
  },
  {
    id: "png",
    ext: "PNG",
    name: "Portable Network Graphic",
    accent: "#a78bfa",
    emoji: "◻",
    best: "Screen graphics with transparency, social media, web images",
    avoid: "Print (use PDF instead)",
    size: "Medium — depends on complexity",
    quality: "Perfect at design size, pixelated if scaled up",
    settings: [
      "Resolution: 72ppi (screen) or 150ppi (retina)",
      "Anti-aliasing: Art Optimised",
      "Background: Transparent (if needed)",
    ],
    tip: "The only web format with proper transparency. Use 2× size for retina displays.",
    howTo: "File → Export → Export As → PNG",
  },
  {
    id: "pdf",
    ext: "PDF",
    name: "Portable Document Format",
    accent: "#fb923c",
    emoji: "□",
    best: "Print files, sharing with clients, press-ready",
    avoid: "Web display (file size too large)",
    size: "Medium to large",
    quality: "Perfect — preserves vector data",
    settings: [
      "Preset: [Press Quality]",
      "Marks & Bleeds: Add bleed marks",
      "Compression: None for print",
      "Colour: Leave as CMYK",
    ],
    tip: "For print, always use Press Quality preset with bleed marks. This is what printers want.",
    howTo: "File → Save As → Adobe PDF",
  },
  {
    id: "jpg",
    ext: "JPG",
    name: "Joint Photographic Experts",
    accent: "#fb923c",
    emoji: "▨",
    best: "Photos, complex images with gradients, email attachments",
    avoid: "Logos, anything with transparency or sharp edges",
    size: "Small — compresses well",
    quality: "Loses quality when compressed, no transparency",
    settings: [
      "Quality: 80-90% (balance size/quality)",
      "Colour Model: RGB for screen, CMYK for print",
      "Anti-aliasing: Art Optimised",
    ],
    tip: "Never save a logo as JPG. The compression creates artefacts around edges. Use PNG or SVG.",
    howTo: "File → Export → Export As → JPEG",
  },
];

const EXPORT_QUIZ = [
  {
    q: "You've designed a logo. What format do you export?",
    correct: "svg",
    options: ["svg", "jpg", "png", "pdf"],
    explain:
      "SVG for logos — always. It scales infinitely and has the smallest file size.",
  },
  {
    q: "A client needs the file to send to a printer.",
    correct: "pdf",
    options: ["pdf", "svg", "png", "jpg"],
    explain:
      "PDF with Press Quality preset. It embeds all fonts and preserves bleed.",
  },
  {
    q: "You need a transparent background for a website header graphic.",
    correct: "png",
    options: ["jpg", "pdf", "png", "svg"],
    explain:
      "PNG is the only format with proper transparency support for raster graphics.",
  },
  {
    q: "You're exporting a photo with complex gradients for Instagram.",
    correct: "jpg",
    options: ["jpg", "svg", "pdf", "png"],
    explain:
      "JPG handles photographic content and gradients with smaller file sizes than PNG.",
  },
];

export default function AIExportPage({ onBack }) {
  const [activeFormat, setActiveFormat] = useState(0);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);
  const [quizDone, setQuizDone] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const format = FORMATS[activeFormat];
  const quiz = EXPORT_QUIZ[quizIdx];

  const handleAnswer = (ans) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(ans);
    if (ans === quiz.correct) setQuizScore((s) => s + 1);
  };

  const nextQuiz = () => {
    if (quizIdx < EXPORT_QUIZ.length - 1) {
      setQuizIdx((q) => q + 1);
      setQuizAnswer(null);
    } else setQuizDone(true);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .ex-page { min-height:100vh; background:#0c0600; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .ex-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(12,6,0,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(249,115,22,0.1); z-index:100; }
        .ex-back { background:none; border:1px solid rgba(249,115,22,0.2); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .ex-back:hover { color:#f97316; border-color:rgba(249,115,22,0.5); }
        .ex-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.14em; color:rgba(249,115,22,0.8); }

        .ex-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(249,115,22,0.08); position:relative; overflow:hidden; }
        .ex-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 25% 55%, rgba(249,115,22,0.07) 0%, transparent 55%); }
        .ex-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(249,115,22,0.5); margin-bottom:14px; position:relative; z-index:1; }
        .ex-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,9vw,8rem); line-height:0.88; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .ex-hero-title em { color:#f97316; font-style:normal; }
        .ex-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .ex-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(249,115,22,0.05); line-height:1; pointer-events:none; user-select:none; }

        /* FORMAT SELECTOR */
        .ex-formats { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(249,115,22,0.07); border-bottom:1px solid rgba(249,115,22,0.08); }
        .ex-format-tab { background:#0c0600; padding:28px 24px; cursor:pointer; transition:all 0.2s; border-bottom:2px solid transparent; }
        .ex-format-tab:hover { background:#0e0700; }
        .ex-format-tab.active-ft { background:#0e0700; }
        .ex-format-emoji { font-size:24px; margin-bottom:8px; display:block; }
        .ex-format-ext { font-family:'Bebas Neue',sans-serif; font-size:28px; letter-spacing:0.08em; margin-bottom:4px; }
        .ex-format-name { font-size:10px; color:rgba(255,255,255,0.3); letter-spacing:0.06em; }

        /* FORMAT DETAIL */
        .ex-detail { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(249,115,22,0.08); }
        .ex-detail-left { padding:56px; border-right:1px solid rgba(249,115,22,0.08); }
        .ex-detail-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); margin-bottom:8px; line-height:0.9; }
        .ex-detail-full { font-size:12px; color:rgba(255,255,255,0.25); margin-bottom:28px; letterSpacing:"0.08em"; }
        .ex-meta { display:grid; grid-template-columns:1fr 1fr; gap:14px; margin-bottom:28px; }
        .ex-meta-cell { padding:14px 16px; border-radius:8px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); }
        .ex-meta-label { font-size:9px; letter-spacing:0.15em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:6px; }
        .ex-meta-val { font-size:12px; color:rgba(255,255,255,0.6); line-height:1.5; }
        .ex-tip-box { padding:16px 20px; border-radius:8px; background:rgba(249,115,22,0.06); border-left:3px solid; }
        .ex-tip-label { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,115,22,0.5); margin-bottom:6px; }
        .ex-tip-text { font-size:13px; color:rgba(255,255,255,0.5); line-height:1.65; }

        .ex-detail-right { padding:56px; background:#0e0700; }
        .ex-settings-label { font-size:10px; letter-spacing:0.18em; text-transform:uppercase; color:rgba(255,255,255,0.25); margin-bottom:14px; }
        .ex-settings { display:flex; flex-direction:column; gap:8px; margin-bottom:28px; }
        .ex-setting { display:flex; align-items:center; gap:10px; padding:10px 14px; border-radius:6px; background:rgba(255,255,255,0.02); border:1px solid rgba(255,255,255,0.06); }
        .ex-setting-dot { width:6px; height:6px; border-radius:50%; flex-shrink:0; }
        .ex-setting-text { font-size:12px; color:rgba(255,255,255,0.45); }
        .ex-howto { padding:14px 16px; border-radius:8px; background:rgba(255,255,255,0.03); border:1px solid rgba(255,255,255,0.07); font-size:12px; color:rgba(255,255,255,0.35); font-family:'DM Serif Display',serif; font-style:italic; }

        /* DECISION TREE */
        .ex-tree { padding:72px 56px; border-bottom:1px solid rgba(249,115,22,0.08); }
        .ex-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .ex-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; }
        .ex-section-line { flex:1; height:1px; background:rgba(249,115,22,0.08); }
        .ex-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:36px; line-height:1.7; }
        .ex-tree-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:14px; }
        .ex-tree-card { padding:24px; border-radius:12px; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); }
        .ex-tree-q { font-size:14px; color:rgba(255,255,255,0.7); margin-bottom:12px; line-height:1.5; }
        .ex-tree-a { display:inline-flex; align-items:center; gap:8px; padding:6px 14px; border-radius:4px; font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.08em; }

        /* QUIZ */
        .ex-quiz { padding:72px 56px; background:#0e0700; }
        .ex-quiz-card { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .ex-quiz-left { }
        .ex-quiz-q { font-family:'DM Serif Display',serif; font-size:clamp(1.2rem,2vw,1.7rem); color:#fff; line-height:1.35; margin-bottom:24px; }
        .ex-quiz-opts { display:flex; flex-direction:column; gap:8px; }
        .ex-quiz-opt { padding:12px 18px; border-radius:6px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.6); font-size:14px; font-family:'Bebas Neue',sans-serif; letter-spacing:0.08em; cursor:pointer; transition:all 0.2s; text-align:left; }
        .ex-quiz-opt:hover { background:rgba(255,255,255,0.05); color:#fff; }
        .ex-quiz-opt.correct { border-color:#f97316; background:rgba(249,115,22,0.1); color:#f97316; }
        .ex-quiz-opt.wrong { border-color:rgba(251,113,133,0.3); opacity:0.5; }
        .ex-quiz-right { display:flex; flex-direction:column; justify-content:center; }
        .ex-quiz-explain { padding:16px 20px; border-radius:8px; background:rgba(249,115,22,0.07); border:1px solid rgba(249,115,22,0.2); font-size:13px; color:rgba(255,255,255,0.45); line-height:1.7; margin-bottom:12px; }
        .ex-quiz-next { padding:8px 20px; border:1px solid rgba(249,115,22,0.3); background:rgba(249,115,22,0.08); color:#f97316; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; border-radius:4px; }
        .ex-quiz-prog { display:flex; gap:6px; margin-bottom:24px; }
        .ex-quiz-pip { height:2px; flex:1; border-radius:1px; background:rgba(255,255,255,0.08); }
        .ex-quiz-pip.done { background:#f97316; }
        .ex-quiz-pip.current { background:rgba(249,115,22,0.5); }
        .ex-quiz-done { text-align:center; padding:40px; }
        .ex-quiz-score { font-family:'Bebas Neue',sans-serif; font-size:72px; color:#f97316; line-height:1; margin-bottom:8px; }
        .ex-quiz-retry { background:none; border:1px solid rgba(255,255,255,0.1); color:rgba(255,255,255,0.35); padding:8px 20px; border-radius:4px; font-size:11px; cursor:pointer; font-family:'DM Sans',sans-serif; }

        @media(max-width:900px) { .ex-detail,.ex-quiz-card { grid-template-columns:1fr; } .ex-formats { grid-template-columns:repeat(2,1fr); } }
      `}</style>

      <div className="ex-page">
        <nav className="ex-nav">
          <button className="ex-back" onClick={onBack}>
            ← Back
          </button>
          <span className="ex-nav-title">Exporting Your Work</span>
          <span
            style={{
              fontSize: 10,
              color: "rgba(249,115,22,0.4)",
              letterSpacing: "0.15em",
            }}
          >
            LESSON 04
          </span>
        </nav>

        <div className="ex-hero">
          <div className="ex-hero-bg" />
          <div className="ex-eyebrow">Illustrator Basics · Lesson 04</div>
          <div className="ex-hero-title">
            WRONG FORMAT =<br />
            <em>RUINED FILE.</em>
          </div>
          <p className="ex-hero-sub">
            SVG, PNG, PDF, JPG — four formats, four completely different jobs.
            Pick the wrong one and your logo blurs, your print job gets
            rejected, or your file is 50MB when it should be 5KB.
          </p>
          <div className="ex-hero-num">04</div>
        </div>

        {/* FORMAT TABS */}
        <div className="ex-formats">
          {FORMATS.map((f, i) => (
            <div
              key={i}
              className={`ex-format-tab${activeFormat === i ? " active-ft" : ""}`}
              style={{
                borderBottomColor:
                  activeFormat === i ? f.accent : "transparent",
              }}
              onClick={() => setActiveFormat(i)}
            >
              <span className="ex-format-emoji">{f.emoji}</span>
              <div
                className="ex-format-ext"
                style={{
                  color:
                    activeFormat === i ? f.accent : "rgba(255,255,255,0.6)",
                }}
              >
                {f.ext}
              </div>
              <div className="ex-format-name">{f.name}</div>
            </div>
          ))}
        </div>

        {/* DETAIL */}
        <div className="ex-detail">
          <div className="ex-detail-left">
            <div className="ex-detail-title" style={{ color: format.accent }}>
              .{format.ext}
            </div>
            <div className="ex-detail-full">{format.name}</div>
            <div className="ex-meta">
              <div className="ex-meta-cell">
                <div className="ex-meta-label">Best for</div>
                <div className="ex-meta-val">{format.best}</div>
              </div>
              <div className="ex-meta-cell">
                <div className="ex-meta-label">Avoid when</div>
                <div className="ex-meta-val">{format.avoid}</div>
              </div>
              <div className="ex-meta-cell">
                <div className="ex-meta-label">File size</div>
                <div className="ex-meta-val">{format.size}</div>
              </div>
              <div className="ex-meta-cell">
                <div className="ex-meta-label">Quality</div>
                <div className="ex-meta-val">{format.quality}</div>
              </div>
            </div>
            <div
              className="ex-tip-box"
              style={{ borderLeftColor: format.accent }}
            >
              <div
                className="ex-tip-label"
                style={{ color: `${format.accent}80` }}
              >
                Key insight
              </div>
              <div className="ex-tip-text">{format.tip}</div>
            </div>
          </div>
          <div className="ex-detail-right">
            <div className="ex-settings-label">Recommended settings</div>
            <div className="ex-settings">
              {format.settings.map((s, i) => (
                <div key={i} className="ex-setting">
                  <div
                    className="ex-setting-dot"
                    style={{ background: format.accent }}
                  />
                  <div className="ex-setting-text">{s}</div>
                </div>
              ))}
            </div>
            <div className="ex-settings-label">How to export</div>
            <div className="ex-howto">{format.howTo}</div>
          </div>
        </div>

        {/* DECISION TREE */}
        <div className="ex-tree">
          <div className="ex-section-header">
            <div className="ex-section-title">QUICK DECISION</div>
            <div className="ex-section-line" />
          </div>
          <p className="ex-section-sub">
            Three questions. Always the right answer.
          </p>
          <div className="ex-tree-grid">
            {[
              { q: "It's a logo or icon", a: "SVG", accent: "#f97316" },
              { q: "It needs to be printed", a: "PDF", accent: "#fb923c" },
              {
                q: "It's going on a website and has transparency",
                a: "PNG",
                accent: "#a78bfa",
              },
              {
                q: "It's a photo or image-heavy composition",
                a: "JPG",
                accent: "#fb923c",
              },
              {
                q: "A client needs to review or sign off",
                a: "PDF",
                accent: "#fb923c",
              },
              {
                q: "It's an icon for an app or website",
                a: "SVG",
                accent: "#f97316",
              },
            ].map((item, i) => (
              <div key={i} className="ex-tree-card">
                <div className="ex-tree-q">{item.q}</div>
                <div
                  className="ex-tree-a"
                  style={{
                    background: `${item.accent}18`,
                    border: `1px solid ${item.accent}40`,
                    color: item.accent,
                  }}
                >
                  → .{item.a}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* QUIZ */}
        <div className="ex-quiz">
          <div className="ex-section-header">
            <div className="ex-section-title">PICK THE FORMAT</div>
            <div className="ex-section-line" />
          </div>
          <div className="ex-quiz-prog">
            {EXPORT_QUIZ.map((_, i) => (
              <div
                key={i}
                className={`ex-quiz-pip${i < quizIdx ? " done" : i === quizIdx ? " current" : ""}`}
              />
            ))}
          </div>
          {!quizDone ? (
            <div className="ex-quiz-card">
              <div className="ex-quiz-left">
                <div className="ex-quiz-q">{quiz.q}</div>
                <div className="ex-quiz-opts">
                  {quiz.options.map((opt, i) => {
                    const answered = quizAnswer !== null;
                    const isCorrect = opt === quiz.correct;
                    return (
                      <button
                        key={i}
                        className={`ex-quiz-opt${answered ? (isCorrect ? " correct" : " wrong") : ""}`}
                        onClick={() => handleAnswer(opt)}
                      >
                        .{opt.toUpperCase()}
                      </button>
                    );
                  })}
                </div>
              </div>
              <div className="ex-quiz-right">
                {quizAnswer !== null && (
                  <>
                    <div className="ex-quiz-explain">
                      <strong
                        style={{
                          color:
                            quizAnswer === quiz.correct ? "#f97316" : "#fda4af",
                        }}
                      >
                        {quizAnswer === quiz.correct
                          ? "✓ Correct! "
                          : "✗ Not quite. "}
                      </strong>
                      {quiz.explain}
                    </div>
                    <button className="ex-quiz-next" onClick={nextQuiz}>
                      {quizIdx < EXPORT_QUIZ.length - 1
                        ? "Next →"
                        : "See results →"}
                    </button>
                  </>
                )}
              </div>
            </div>
          ) : (
            <div className="ex-quiz-done">
              <div
                className="ex-quiz-score"
                style={{
                  color:
                    quizScore === EXPORT_QUIZ.length
                      ? "#f97316"
                      : quizScore >= 3
                        ? "#fde68a"
                        : "#fda4af",
                }}
              >
                {quizScore}/{EXPORT_QUIZ.length}
              </div>
              <div
                style={{
                  fontSize: 14,
                  color: "rgba(255,255,255,0.35)",
                  marginBottom: 20,
                }}
              >
                {quizScore === EXPORT_QUIZ.length
                  ? "You'll never export in the wrong format again."
                  : "Review the formats above and try again."}
              </div>
              <button
                className="ex-quiz-retry"
                onClick={() => {
                  setQuizIdx(0);
                  setQuizAnswer(null);
                  setQuizScore(0);
                  setQuizDone(false);
                }}
              >
                Try again
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
