import { useState, useEffect } from "react";

const SETTINGS = [
  {
    id: "artboard",
    title: "Artboard Size",
    icon: "▭",
    options: [
      {
        label: "A4 Print",
        value: "210×297mm",
        use: "Posters, flyers, documents",
        tip: "Most common print format",
      },
      {
        label: "A3 Print",
        value: "297×420mm",
        use: "Large posters, presentations",
        tip: "Double the size of A4",
      },
      {
        label: "Instagram Post",
        value: "1080×1080px",
        use: "Social media square",
        tip: "Always design at 2x for retina",
      },
      {
        label: "Instagram Story",
        value: "1080×1920px",
        use: "Stories, reels",
        tip: "9:16 ratio — very tall",
      },
      {
        label: "Business Card",
        value: "85×55mm",
        use: "Cards, badges",
        tip: "Add 3mm bleed on all sides",
      },
      {
        label: "Custom",
        value: "Your choice",
        use: "Anything specific",
        tip: "You decide — type it in",
      },
    ],
    accent: "#f97316",
  },
  {
    id: "colormode",
    title: "Colour Mode",
    icon: "◑",
    options: [
      {
        label: "RGB",
        value: "Red Green Blue",
        use: "Screen, web, digital",
        tip: "Use for anything viewed on a screen. More colour range.",
      },
      {
        label: "CMYK",
        value: "Cyan Magenta Yellow Black",
        use: "Print, physical",
        tip: "Use for anything that will be printed. Colours look different on screen.",
      },
    ],
    accent: "#f472b6",
  },
  {
    id: "units",
    title: "Units",
    icon: "⊡",
    options: [
      {
        label: "Pixels (px)",
        value: "px",
        use: "Digital, screen, web",
        tip: "Default for screen work",
      },
      {
        label: "Millimetres (mm)",
        value: "mm",
        use: "Print, physical",
        tip: "Use when designing for print",
      },
      {
        label: "Points (pt)",
        value: "pt",
        use: "Typography, print",
        tip: "Traditional type measurement",
      },
    ],
    accent: "#a78bfa",
  },
  {
    id: "bleed",
    title: "Bleed & Margins",
    icon: "⊞",
    options: [
      {
        label: "No bleed",
        value: "0mm",
        use: "Digital only",
        tip: "Fine for screen work",
      },
      {
        label: "Standard bleed",
        value: "3mm",
        use: "Most print jobs",
        tip: "Industry standard — ask your printer",
      },
      {
        label: "Large bleed",
        value: "5mm",
        use: "Large format print",
        tip: "For banners, posters, large format",
      },
    ],
    accent: "#fb923c",
  },
];

const TIPS = [
  {
    emoji: "🖨",
    title: "Print = CMYK + mm + bleed",
    body: "Every print job needs these three things. Forget one and your file will be rejected by the printer.",
  },
  {
    emoji: "💻",
    title: "Screen = RGB + px",
    body: "For anything digital, RGB gives you more vibrant colours. Pixels are the natural unit.",
  },
  {
    emoji: "📐",
    title: "Always add bleed for print",
    body: "Bleed is 3mm of extra space beyond your artboard edge. It prevents white lines on cut edges.",
  },
  {
    emoji: "🔲",
    title: "Multiple artboards = one file",
    body: "Use multiple artboards for different sizes of the same project. Keeps everything in one place.",
  },
];

export default function AISetupPage({ onBack }) {
  const [activeSetting, setActiveSetting] = useState(0);
  const [activeOption, setActiveOption] = useState(0);
  const [docType, setDocType] = useState("print"); // print | digital
  const setting = SETTINGS[activeSetting];
  const option = setting.options[activeOption];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const getRecommended = () => {
    if (docType === "print")
      return { size: "A4 / A3", mode: "CMYK", units: "mm", bleed: "3mm" };
    return { size: "1080×1080px", mode: "RGB", units: "px", bleed: "None" };
  };
  const rec = getRecommended();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .setup-page { min-height:100vh; background:#0c0600; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .setup-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(12,6,0,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(249,115,22,0.1); z-index:100; }
        .setup-back { background:none; border:1px solid rgba(249,115,22,0.2); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .setup-back:hover { color:#f97316; border-color:rgba(249,115,22,0.5); }
        .setup-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.14em; color:rgba(249,115,22,0.8); }

        .setup-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(249,115,22,0.08); position:relative; overflow:hidden; }
        .setup-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 25% 55%, rgba(249,115,22,0.07) 0%, transparent 55%); }
        .setup-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(249,115,22,0.5); margin-bottom:14px; position:relative; z-index:1; }
        .setup-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,9vw,8rem); line-height:0.88; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .setup-hero-title em { color:#f97316; font-style:normal; }
        .setup-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .setup-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(249,115,22,0.05); line-height:1; pointer-events:none; user-select:none; }

        /* DOC TYPE PICKER */
        .setup-doctype { padding:48px 56px; border-bottom:1px solid rgba(249,115,22,0.08); }
        .setup-doctype-label { font-size:10px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,115,22,0.5); margin-bottom:16px; }
        .setup-doctype-btns { display:flex; gap:12px; }
        .setup-doctype-btn { flex:1; max-width:200px; padding:20px 24px; border-radius:10px; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); text-align:left; }
        .setup-doctype-btn.active { border-color:rgba(249,115,22,0.4); background:rgba(249,115,22,0.07); }
        .setup-doctype-icon { font-size:24px; margin-bottom:8px; }
        .setup-doctype-name { font-family:'Bebas Neue',sans-serif; font-size:20px; color:#fff; margin-bottom:4px; }
        .setup-doctype-sub { font-size:11px; color:rgba(255,255,255,0.3); }

        /* RECOMMENDED SETTINGS */
        .setup-rec { display:grid; grid-template-columns:repeat(4,1fr); gap:1px; background:rgba(249,115,22,0.08); border-top:1px solid rgba(249,115,22,0.08); }
        .setup-rec-cell { background:#0c0600; padding:24px 28px; }
        .setup-rec-label { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,115,22,0.4); margin-bottom:8px; }
        .setup-rec-value { font-family:'Bebas Neue',sans-serif; font-size:24px; color:#f97316; letter-spacing:0.03em; }

        /* SETTINGS EXPLORER */
        .setup-explorer { display:grid; grid-template-columns:220px 1fr; border-bottom:1px solid rgba(249,115,22,0.08); }
        .setup-sidebar { border-right:1px solid rgba(249,115,22,0.08); padding:40px 0; }
        .setup-sidebar-item { display:flex; align-items:center; gap:12px; padding:14px 28px; cursor:pointer; transition:all 0.2s; border-left:2px solid transparent; }
        .setup-sidebar-item:hover { background:rgba(249,115,22,0.04); }
        .setup-sidebar-item.active-si { border-left-color:#f97316; background:rgba(249,115,22,0.06); }
        .setup-sidebar-icon { font-size:16px; width:24px; text-align:center; }
        .setup-sidebar-name { font-size:13px; color:rgba(255,255,255,0.6); transition:color 0.2s; }
        .setup-sidebar-item.active-si .setup-sidebar-name { color:#fff; }
        .setup-content { padding:48px 56px; }
        .setup-setting-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3rem); color:#fff; margin-bottom:28px; }
        .setup-options { display:flex; flex-direction:column; gap:8px; margin-bottom:32px; }
        .setup-option { display:flex; align-items:center; gap:16px; padding:16px 20px; border-radius:8px; cursor:pointer; transition:all 0.2s; border:1px solid rgba(255,255,255,0.07); background:rgba(255,255,255,0.02); }
        .setup-option:hover { background:rgba(255,255,255,0.04); }
        .setup-option.active-opt { border-color:rgba(249,115,22,0.35); background:rgba(249,115,22,0.07); }
        .setup-opt-dot { width:8px; height:8px; border-radius:50%; border:1px solid rgba(255,255,255,0.2); flex-shrink:0; }
        .setup-option.active-opt .setup-opt-dot { background:#f97316; border-color:#f97316; }
        .setup-opt-label { font-size:14px; color:rgba(255,255,255,0.7); flex:1; transition:color 0.2s; }
        .setup-option.active-opt .setup-opt-label { color:#fff; }
        .setup-opt-value { font-size:11px; color:rgba(255,255,255,0.25); font-family:'DM Serif Display',serif; font-style:italic; }
        .setup-detail { padding:20px 24px; border-radius:8px; background:rgba(249,115,22,0.06); border:1px solid rgba(249,115,22,0.15); }
        .setup-detail-use { font-size:12px; color:rgba(255,255,255,0.45); margin-bottom:8px; }
        .setup-detail-tip { font-size:13px; color:rgba(249,115,22,0.9); line-height:1.6; }

        /* TIPS */
        .setup-tips { padding:72px 56px; border-bottom:1px solid rgba(249,115,22,0.08); }
        .setup-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .setup-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; }
        .setup-section-line { flex:1; height:1px; background:rgba(249,115,22,0.08); }
        .setup-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:36px; line-height:1.7; }
        .setup-tips-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:14px; }
        .setup-tip-card { padding:28px 24px; border-radius:12px; border:1px solid rgba(249,115,22,0.12); background:rgba(249,115,22,0.04); }
        .setup-tip-emoji { font-size:24px; margin-bottom:12px; display:block; }
        .setup-tip-title { font-size:15px; font-weight:500; color:#fff; margin-bottom:8px; }
        .setup-tip-body { font-size:13px; color:rgba(255,255,255,0.38); line-height:1.7; }

        /* DIALOG SIMULATION */
        .setup-dialog { padding:72px 56px; }
        .setup-dialog-wrap { border:1px solid rgba(249,115,22,0.15); border-radius:16px; overflow:hidden; max-width:600px; }
        .setup-dialog-bar { background:#1a1a1a; padding:10px 16px; display:flex; align-items:center; gap:8px; border-bottom:1px solid rgba(255,255,255,0.06); }
        .setup-dialog-dot { width:10px; height:10px; border-radius:50%; }
        .setup-dialog-title { flex:1; text-align:center; font-size:11px; color:rgba(255,255,255,0.3); letterSpacing:"0.06em"; }
        .setup-dialog-body { background:#1e1e1e; padding:28px; }
        .setup-dialog-row { display:flex; align-items:center; justify-content:space-between; padding:10px 0; border-bottom:1px solid rgba(255,255,255,0.05); }
        .setup-dialog-row:last-child { border-bottom:none; }
        .setup-dialog-key { font-size:12px; color:rgba(255,255,255,0.4); }
        .setup-dialog-val { font-size:12px; color:#f97316; font-family:'DM Serif Display',serif; }
      `}</style>

      <div className="setup-page">
        <nav className="setup-nav">
          <button className="setup-back" onClick={onBack}>
            ← Back
          </button>
          <span className="setup-nav-title">Setting Up Your Document</span>
          <span
            style={{
              fontSize: 10,
              color: "rgba(249,115,22,0.4)",
              letterSpacing: "0.15em",
            }}
          >
            LESSON 01
          </span>
        </nav>

        <div className="setup-hero">
          <div className="setup-hero-bg" />
          <div className="setup-eyebrow">Illustrator Basics · Lesson 01</div>
          <div className="setup-hero-title">
            BEFORE YOU
            <br />
            <em>DRAW ANYTHING.</em>
          </div>
          <p className="setup-hero-sub">
            The decisions you make before placing a single point determine
            everything. Wrong colour mode = ruined print job. No bleed =
            rejected file. Get this right once and it becomes muscle memory.
          </p>
          <div className="setup-hero-num">01</div>
        </div>

        {/* DOC TYPE */}
        <div className="setup-doctype">
          <div className="setup-doctype-label">What are you designing for?</div>
          <div className="setup-doctype-btns">
            <div
              className={`setup-doctype-btn${docType === "print" ? " active" : ""}`}
              onClick={() => setDocType("print")}
            >
              <div className="setup-doctype-icon">🖨</div>
              <div className="setup-doctype-name">Print</div>
              <div className="setup-doctype-sub">Poster, card, flyer</div>
            </div>
            <div
              className={`setup-doctype-btn${docType === "digital" ? " active" : ""}`}
              onClick={() => setDocType("digital")}
            >
              <div className="setup-doctype-icon">💻</div>
              <div className="setup-doctype-name">Digital</div>
              <div className="setup-doctype-sub">Screen, social, web</div>
            </div>
          </div>
          <div className="setup-rec">
            {[
              { label: "Artboard size", value: rec.size },
              { label: "Colour mode", value: rec.mode },
              { label: "Units", value: rec.units },
              { label: "Bleed", value: rec.bleed },
            ].map((r, i) => (
              <div key={i} className="setup-rec-cell">
                <div className="setup-rec-label">{r.label}</div>
                <div className="setup-rec-value">{r.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* SETTINGS EXPLORER */}
        <div className="setup-explorer">
          <div className="setup-sidebar">
            {SETTINGS.map((s, i) => (
              <div
                key={i}
                className={`setup-sidebar-item${activeSetting === i ? " active-si" : ""}`}
                onClick={() => {
                  setActiveSetting(i);
                  setActiveOption(0);
                }}
              >
                <div className="setup-sidebar-icon" style={{ color: s.accent }}>
                  {s.icon}
                </div>
                <div className="setup-sidebar-name">{s.title}</div>
              </div>
            ))}
          </div>
          <div className="setup-content">
            <div className="setup-setting-title">{setting.title}</div>
            <div className="setup-options">
              {setting.options.map((opt, i) => (
                <div
                  key={i}
                  className={`setup-option${activeOption === i ? " active-opt" : ""}`}
                  onClick={() => setActiveOption(i)}
                >
                  <div className="setup-opt-dot" />
                  <div className="setup-opt-label">{opt.label}</div>
                  <div className="setup-opt-value">{opt.value}</div>
                </div>
              ))}
            </div>
            {option && (
              <div className="setup-detail">
                <div className="setup-detail-use">Used for: {option.use}</div>
                <div className="setup-detail-tip">💡 {option.tip}</div>
              </div>
            )}
          </div>
        </div>

        {/* NEW DOCUMENT SIMULATION */}
        <div className="setup-dialog">
          <div className="setup-section-header" style={{ marginBottom: 28 }}>
            <div className="setup-section-title">THE NEW DOCUMENT DIALOG</div>
            <div className="setup-section-line" />
          </div>
          <p className="setup-section-sub" style={{ marginBottom: 28 }}>
            This is what you'll see every time you open Illustrator. Here's what
            each setting does.
          </p>
          <div className="setup-dialog-wrap">
            <div className="setup-dialog-bar">
              <div
                className="setup-dialog-dot"
                style={{ background: "#ff5f57" }}
              />
              <div
                className="setup-dialog-dot"
                style={{ background: "#ffbd2e" }}
              />
              <div
                className="setup-dialog-dot"
                style={{ background: "#28ca42" }}
              />
              <div className="setup-dialog-title">New Document</div>
            </div>
            <div className="setup-dialog-body">
              {[
                {
                  key: "Name",
                  val: "Untitled-1",
                  note: "Give it a real name from the start",
                },
                {
                  key: "Width / Height",
                  val: "210mm × 297mm",
                  note: "Your artboard — the 'canvas'",
                },
                {
                  key: "Units",
                  val: "Millimetres",
                  note: "Match to your output type",
                },
                {
                  key: "Colour Mode",
                  val: "CMYK Colour",
                  note: "Print = CMYK, Screen = RGB",
                },
                {
                  key: "Raster Effects",
                  val: "High (300 ppi)",
                  note: "Always 300 for print quality",
                },
                {
                  key: "Bleed",
                  val: "3mm all sides",
                  note: "Safety zone for printing",
                },
              ].map((row, i) => (
                <div key={i} className="setup-dialog-row">
                  <div className="setup-dialog-key">{row.key}</div>
                  <div
                    style={{
                      flex: 1,
                      textAlign: "center",
                      fontSize: 10,
                      color: "rgba(255,255,255,0.2)",
                      fontStyle: "italic",
                    }}
                  >
                    {row.note}
                  </div>
                  <div className="setup-dialog-val">{row.val}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* TIPS */}
        <div className="setup-tips">
          <div className="setup-section-header">
            <div className="setup-section-title">REMEMBER</div>
            <div className="setup-section-line" />
          </div>
          <p className="setup-section-sub">
            Four rules. Memorise them and you'll never send a wrong file to
            print again.
          </p>
          <div className="setup-tips-grid">
            {TIPS.map((tip, i) => (
              <div key={i} className="setup-tip-card">
                <span className="setup-tip-emoji">{tip.emoji}</span>
                <div className="setup-tip-title">{tip.title}</div>
                <div className="setup-tip-body">{tip.body}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
