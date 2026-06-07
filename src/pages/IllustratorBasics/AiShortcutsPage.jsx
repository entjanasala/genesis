import { useState, useEffect, useRef } from "react";

const SHORTCUT_CATEGORIES = [
  {
    id: "tools",
    label: "Tool Switchers",
    accent: "#f97316",
    desc: "Switch tools without touching the toolbar — the fastest way to work",
    shortcuts: [
      {
        keys: ["V"],
        name: "Selection Tool",
        desc: "Move and select objects. Your most-used key.",
        pro: "Tap V and click anything to select it instantly.",
      },
      {
        keys: ["A"],
        name: "Direct Selection",
        desc: "Click individual anchor points. Edit shapes at the node level.",
        pro: "Hold A and drag to select multiple anchors at once.",
      },
      {
        keys: ["P"],
        name: "Pen Tool",
        desc: "Draw vector paths. The most powerful tool in Illustrator.",
        pro: "While using Pen, hold Alt to convert a corner to a curve.",
      },
      {
        keys: ["T"],
        name: "Type Tool",
        desc: "Click anywhere to type. Click a path to type along it.",
        pro: "Double-click existing text to edit it without switching.",
      },
      {
        keys: ["E"],
        name: "Free Transform",
        desc: "Scale, rotate, shear — all in one tool.",
        pro: "Hold Shift while scaling to constrain proportions.",
      },
      {
        keys: ["R"],
        name: "Rotate Tool",
        desc: "Click to set pivot point, then drag to rotate.",
        pro: "Click a specific point to rotate around it — not the centre.",
      },
      {
        keys: ["S"],
        name: "Scale Tool",
        desc: "Click to set origin, drag to scale precisely.",
        pro: "Double-click to enter exact scale percentage.",
      },
      {
        keys: ["G"],
        name: "Gradient Tool",
        desc: "Drag across an object to set gradient direction.",
        pro: "Drag at an angle to create diagonal gradients.",
      },
      {
        keys: ["Z"],
        name: "Zoom Tool",
        desc: "Click to zoom in. Alt+click to zoom out.",
        pro: "Press Ctrl+Space to temporarily activate zoom from any tool.",
      },
      {
        keys: ["H"],
        name: "Hand Tool",
        desc: "Pan around the canvas without deselecting.",
        pro: "Hold Space to temporarily activate Hand from any tool.",
      },
    ],
  },
  {
    id: "pro",
    label: "Pro Moves",
    accent: "#f472b6",
    desc: "Shortcuts that feel like cheating — ones most designers never discover",
    shortcuts: [
      {
        keys: ["Ctrl", "D"],
        name: "Transform Again",
        desc: "Repeats your last transform. Move, rotate, scale — again.",
        pro: "Move an object 20px, press ⌘D 10 times = perfect grid.",
      },
      {
        keys: ["Ctrl", "J"],
        name: "Join Paths",
        desc: "Connects two open endpoints into one path.",
        pro: "Select two separate paths and join them at their endpoints.",
      },
      {
        keys: ["Ctrl", "G"],
        name: "Group",
        desc: "Groups selected objects into one selectable unit.",
        pro: "Group then double-click to enter isolation mode and edit inside.",
      },
      {
        keys: ["Ctrl", "Shift", "G"],
        name: "Ungroup",
        desc: "Breaks a group back into individual objects.",
        pro: "Works on imported graphics too — ungroup to edit elements.",
      },
      {
        keys: ["Ctrl", "Alt", "B"],
        name: "Blend Objects",
        desc: "Creates smooth transitions between two shapes or colours.",
        pro: "Make two circles, select both, ⌘⌥B = morphing animation.",
      },
      {
        keys: ["Ctrl", "Shift", "O"],
        name: "Outline Text",
        desc: "Converts live text to vector shapes.",
        pro: "Always do this before sending files to print or other designers.",
      },
      {
        keys: ["Alt", "drag"],
        name: "Duplicate Object",
        desc: "Hold Alt while dragging to copy instead of move.",
        pro: "The fastest way to duplicate — no copy/paste needed.",
      },
      {
        keys: ["Ctrl", "Alt", "C"],
        name: "Copy Appearance",
        desc: "Copies all fills, strokes and effects from one object.",
        pro: "Style one object perfectly, then paste appearance to others.",
      },
    ],
  },
  {
    id: "view",
    label: "View & Navigation",
    accent: "#a78bfa",
    desc: "Control what you see without interrupting your flow",
    shortcuts: [
      {
        keys: ["Ctrl", "0"],
        name: "Fit to Window",
        desc: "Zooms to show your entire artboard.",
        pro: "Press when you're zoomed in too much and lose context.",
      },
      {
        keys: ["Ctrl", "1"],
        name: "100% View",
        desc: "Shows actual pixel size.",
        pro: "Always check at 100% before exporting screen graphics.",
      },
      {
        keys: ["Ctrl", "Y"],
        name: "Outline Mode",
        desc: "Strips all colours — shows only paths.",
        pro: "Use to check path structure or find hidden objects.",
      },
      {
        keys: ["Ctrl", "H"],
        name: "Hide/Show Edges",
        desc: "Hides the blue selection outlines temporarily.",
        pro: "Press while selecting colours to see the actual object clearly.",
      },
      {
        keys: ["Ctrl", "Shift", "H"],
        name: "Hide Artboard",
        desc: "Removes the artboard border from view.",
        pro: "Helps when designing full-bleed without the box distraction.",
      },
      {
        keys: ["F"],
        name: "Full Screen Mode",
        desc: "Cycles between normal, full screen, and presentation view.",
        pro: "Press once for menu hidden, twice for full presentation mode.",
      },
      {
        keys: ["Ctrl", ";"],
        name: "Show/Hide Guides",
        desc: "Toggles all guides on and off.",
        pro: "Turn off to see the final design, turn on to check alignment.",
      },
      {
        keys: ["Ctrl", "R"],
        name: "Show/Hide Rulers",
        desc: "Toggles the ruler bars on the top and side.",
        pro: "Drag from rulers to create guides at exact positions.",
      },
    ],
  },
  {
    id: "type",
    label: "Type Shortcuts",
    accent: "#fb923c",
    desc: "Work with typography faster — select, scale, align without the menus",
    shortcuts: [
      {
        keys: ["Ctrl", "Shift", ">"],
        name: "Increase Font Size",
        desc: "Makes selected text larger in steps.",
        pro: "Hold it down to quickly find the right size.",
      },
      {
        keys: ["Ctrl", "Shift", "<"],
        name: "Decrease Font Size",
        desc: "Makes selected text smaller in steps.",
        pro: "Faster than clicking the size field and typing a number.",
      },
      {
        keys: ["Alt", "↑"],
        name: "Decrease Leading",
        desc: "Tightens line spacing on selected text.",
        pro: "Hold down to rapidly tighten until it feels right.",
      },
      {
        keys: ["Alt", "↓"],
        name: "Increase Leading",
        desc: "Opens up line spacing on selected text.",
        pro: "Essential for display type — loose leading = premium feel.",
      },
      {
        keys: ["Alt", "←"],
        name: "Decrease Tracking",
        desc: "Tightens letter spacing across selected text.",
        pro: "Tight tracking on all-caps = classic editorial look.",
      },
      {
        keys: ["Alt", "→"],
        name: "Increase Tracking",
        desc: "Opens up letter spacing.",
        pro: "Wide tracking + uppercase = luxury branding staple.",
      },
    ],
  },
];

function ShortcutKey({ k }) {
  const isSymbol = [
    "Ctrl",
    "Alt",
    "Shift",
    "↑",
    "↓",
    "←",
    "→",
    "drag",
  ].includes(k);
  return (
    <div
      style={{
        minWidth:
          k === "drag" ? 48 : ["Ctrl", "Alt", "Shift"].includes(k) ? 44 : 36,
        height: 36,
        borderRadius: 6,
        background: "rgba(255,255,255,0.06)",
        border: "1px solid rgba(255,255,255,0.12)",
        borderBottom: "3px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: isSymbol ? 14 : 15,
        fontWeight: 600,
        color: "#fff",
        fontFamily:
          k === "drag" ? "'DM Sans',sans-serif" : "'Bebas Neue',sans-serif",
        letterSpacing: isSymbol ? 0 : "0.04em",
        padding: k === "drag" ? "0 8px" : 0,
      }}
    >
      {k}
    </div>
  );
}

// Interactive selection demo
function SelectionDemo({ accent }) {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("V");
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState([
    { id: 1, x: 40, y: 50, w: 90, h: 90, color: "#a78bfa", label: "Shape A" },
    { id: 2, x: 160, y: 70, w: 110, h: 65, color: "#f472b6", label: "Shape B" },
    { id: 3, x: 100, y: 160, w: 75, h: 75, color: "#fb923c", label: "Shape C" },
  ]);
  const svgRef = useRef(null);

  const handleMouseDown = (e, id) => {
    e.stopPropagation();
    setSelected(id);
    if (mode === "V") {
      const rect = svgRef.current.getBoundingClientRect();
      const obj = positions.find((p) => p.id === id);
      setDragging(id);
      setDragOffset({
        x: e.clientX - rect.left - obj.x,
        y: e.clientY - rect.top - obj.y,
      });
    }
  };

  const handleMouseMove = (e) => {
    if (!dragging || mode !== "V" || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const x = Math.max(
      0,
      Math.min(rect.width - 90, e.clientX - rect.left - dragOffset.x),
    );
    const y = Math.max(
      0,
      Math.min(280 - 90, e.clientY - rect.top - dragOffset.y),
    );
    setPositions((prev) =>
      prev.map((p) => (p.id === dragging ? { ...p, x, y } : p)),
    );
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { id: "V", label: "V — Select & Move" },
          { id: "A", label: "A — Anchor Points" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => {
              setMode(m.id);
              setSelected(null);
            }}
            style={{
              flex: 1,
              padding: "7px 10px",
              border: `1px solid ${mode === m.id ? `${accent}50` : "rgba(255,255,255,0.1)"}`,
              background: mode === m.id ? `${accent}12` : "transparent",
              color: mode === m.id ? accent : "rgba(255,255,255,0.4)",
              fontSize: 11,
              fontFamily: "'DM Sans',sans-serif",
              letterSpacing: "0.06em",
              borderRadius: 4,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      <svg
        ref={svgRef}
        width="100%"
        height="280"
        onMouseMove={handleMouseMove}
        onMouseUp={() => setDragging(null)}
        onMouseLeave={() => setDragging(null)}
        onClick={() => setSelected(null)}
        style={{
          border: `1px solid ${accent}20`,
          borderRadius: 10,
          background: "rgba(0,0,0,0.3)",
          cursor: mode === "V" ? "default" : "crosshair",
          display: "block",
        }}
      >
        {/* grid dots */}
        {Array.from({ length: 6 }).map((_, i) =>
          Array.from({ length: 4 }).map((_, j) => (
            <circle
              key={`${i}-${j}`}
              cx={i * 80 + 20}
              cy={j * 70 + 20}
              r={1}
              fill="rgba(255,255,255,0.06)"
            />
          )),
        )}
        {positions.map((obj) => (
          <g
            key={obj.id}
            onMouseDown={(e) => handleMouseDown(e, obj.id)}
            style={{ cursor: mode === "V" ? "grab" : "default" }}
          >
            <rect
              x={obj.x}
              y={obj.y}
              width={obj.w}
              height={obj.h}
              rx={6}
              fill={selected === obj.id ? `${obj.color}35` : `${obj.color}18`}
              stroke={selected === obj.id ? obj.color : `${obj.color}50`}
              strokeWidth={selected === obj.id ? 1.5 : 1}
            />
            {/* V mode: corner handles */}
            {selected === obj.id &&
              mode === "V" &&
              [
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1],
                [0.5, 0],
                [0.5, 1],
                [0, 0.5],
                [1, 0.5],
              ].map(([hx, hy], i) => (
                <rect
                  key={i}
                  x={obj.x + hx * obj.w - 4}
                  y={obj.y + hy * obj.h - 4}
                  width={8}
                  height={8}
                  fill={obj.color}
                  stroke="none"
                />
              ))}
            {/* A mode: anchor point squares */}
            {selected === obj.id &&
              mode === "A" &&
              [
                [0, 0],
                [1, 0],
                [0, 1],
                [1, 1],
              ].map(([hx, hy], i) => (
                <rect
                  key={i}
                  x={obj.x + hx * obj.w - 5}
                  y={obj.y + hy * obj.h - 5}
                  width={10}
                  height={10}
                  fill="none"
                  stroke={obj.color}
                  strokeWidth={1.5}
                />
              ))}
            {/* center crosshair on selection */}
            {selected === obj.id && mode === "V" && (
              <>
                <line
                  x1={obj.x + obj.w / 2 - 8}
                  y1={obj.y + obj.h / 2}
                  x2={obj.x + obj.w / 2 + 8}
                  y2={obj.y + obj.h / 2}
                  stroke={obj.color}
                  strokeWidth={1}
                  opacity={0.5}
                />
                <line
                  x1={obj.x + obj.w / 2}
                  y1={obj.y + obj.h / 2 - 8}
                  x2={obj.x + obj.w / 2}
                  y2={obj.y + obj.h / 2 + 8}
                  stroke={obj.color}
                  strokeWidth={1}
                  opacity={0.5}
                />
              </>
            )}
            <text
              x={obj.x + obj.w / 2}
              y={obj.y + obj.h / 2 + 5}
              textAnchor="middle"
              fill={`${obj.color}70`}
              fontSize={10}
              fontFamily="'DM Sans',sans-serif"
            >
              {obj.label}
            </text>
          </g>
        ))}
        {!selected && (
          <text
            x="50%"
            y="260"
            textAnchor="middle"
            fill="rgba(255,255,255,0.2)"
            fontSize={11}
            fontFamily="'DM Sans',sans-serif"
          >
            Click a shape to select
          </text>
        )}
      </svg>
      <div
        style={{ marginTop: 8, fontSize: 11, color: "rgba(255,255,255,0.25)" }}
      >
        {mode === "V"
          ? "V mode: click to select · drag to move · see resize handles"
          : "A mode: click to see individual anchor points you can move"}
      </div>
    </div>
  );
}

// Interactive shape builder demo
function ShapeBuilderDemo({ accent }) {
  const [regions, setRegions] = useState({
    left: true,
    right: true,
    overlap: true,
  });
  const [mode, setMode] = useState("merge");
  const [merged, setMerged] = useState([]);

  const reset = () => {
    setRegions({ left: true, right: true, overlap: true });
    setMerged([]);
  };

  const handleClick = (id) => {
    if (mode === "delete") {
      setRegions((prev) => ({ ...prev, [id]: false }));
    } else {
      if (!merged.includes(id)) setMerged((prev) => [...prev, id]);
    }
  };

  const getColor = (id) => {
    if (!regions[id]) return "rgba(255,255,255,0.03)";
    if (merged.includes(id)) return `${accent}55`;
    return `${accent}20`;
  };
  const getStroke = (id) => {
    if (!regions[id]) return "rgba(255,255,255,0.05)";
    if (merged.includes(id)) return accent;
    return `${accent}50`;
  };

  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
        {[
          { id: "merge", label: "Merge regions" },
          { id: "delete", label: "Alt — Delete region" },
        ].map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            style={{
              flex: 1,
              padding: "7px 10px",
              border: `1px solid ${mode === m.id ? `${accent}50` : "rgba(255,255,255,0.1)"}`,
              background: mode === m.id ? `${accent}12` : "transparent",
              color: mode === m.id ? accent : "rgba(255,255,255,0.4)",
              fontSize: 11,
              fontFamily: "'DM Sans',sans-serif",
              letterSpacing: "0.06em",
              borderRadius: 4,
              cursor: "pointer",
              transition: "all 0.2s",
            }}
          >
            {m.label}
          </button>
        ))}
      </div>
      <svg
        width="100%"
        height="260"
        viewBox="0 0 320 260"
        style={{
          border: `1px solid ${accent}15`,
          borderRadius: 10,
          background: "rgba(0,0,0,0.3)",
          display: "block",
        }}
      >
        {/* grid */}
        {Array.from({ length: 5 }).map((_, i) => (
          <line
            key={i}
            x1={i * 80}
            y1={0}
            x2={i * 80}
            y2={260}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        ))}
        {/* Left circle region (minus overlap) */}
        <clipPath id="left-only">
          <rect x={0} y={0} width={165} height={260} />
        </clipPath>
        <circle
          cx={130}
          cy={130}
          r={80}
          fill={getColor("left")}
          stroke={getStroke("left")}
          strokeWidth={1.5}
          clipPath="url(#left-only)"
          style={{ cursor: "pointer", transition: "all 0.2s" }}
          onClick={() => handleClick("left")}
        />
        {/* Right circle region (minus overlap) */}
        <clipPath id="right-only">
          <rect x={165} y={0} width={320} height={260} />
        </clipPath>
        <circle
          cx={195}
          cy={130}
          r={80}
          fill={getColor("right")}
          stroke={getStroke("right")}
          strokeWidth={1.5}
          clipPath="url(#right-only)"
          style={{ cursor: "pointer", transition: "all 0.2s" }}
          onClick={() => handleClick("right")}
        />
        {/* Overlap */}
        <clipPath id="overlap-clip">
          <circle cx={130} cy={130} r={80} />
        </clipPath>
        <circle
          cx={195}
          cy={130}
          r={80}
          fill={getColor("overlap")}
          stroke={getStroke("overlap")}
          strokeWidth={1.5}
          clipPath="url(#overlap-clip)"
          style={{ cursor: "pointer", transition: "all 0.2s" }}
          onClick={() => handleClick("overlap")}
        />
        {/* Labels */}
        {regions.left && (
          <text
            x="100"
            y="135"
            textAnchor="middle"
            fill={`${accent}80`}
            fontSize="14"
            fontFamily="'Bebas Neue',sans-serif"
          >
            A
          </text>
        )}
        {regions.right && (
          <text
            x="225"
            y="135"
            textAnchor="middle"
            fill={`${accent}80`}
            fontSize="14"
            fontFamily="'Bebas Neue',sans-serif"
          >
            B
          </text>
        )}
        {regions.overlap && (
          <text
            x="163"
            y="135"
            textAnchor="middle"
            fill={accent}
            fontSize="11"
            fontFamily="'DM Sans',sans-serif"
          >
            ∩
          </text>
        )}
        {/* Mode cursor hint */}
        <text
          x="160"
          y="245"
          textAnchor="middle"
          fill="rgba(255,255,255,0.15)"
          fontSize="10"
          fontFamily="'DM Sans',sans-serif"
        >
          {mode === "merge"
            ? "Click regions to highlight (merge)"
            : "Click regions to remove (delete)"}
        </text>
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 8,
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          {merged.length > 0
            ? `${merged.length} region${merged.length > 1 ? "s" : ""} merged`
            : Object.values(regions).some((v) => !v)
              ? "Regions deleted"
              : "Click a region to interact"}
        </div>
        <button
          onClick={reset}
          style={{
            background: "none",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "rgba(255,255,255,0.3)",
            fontSize: 10,
            padding: "3px 10px",
            borderRadius: 3,
            cursor: "pointer",
            fontFamily: "'DM Sans',sans-serif",
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default function AIShortcutsPage({ onBack }) {
  const [activeCategory, setActiveCategory] = useState(0);
  const [activeShortcut, setActiveShortcut] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState(null);
  const [quizScore, setQuizScore] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const category = SHORTCUT_CATEGORIES[activeCategory];
  const shortcut = category.shortcuts[activeShortcut];

  const allShortcuts = SHORTCUT_CATEGORIES.flatMap((c) =>
    c.shortcuts.map((s) => ({ ...s, categoryAccent: c.accent })),
  );
  const filtered =
    searchQuery.length > 1
      ? allShortcuts.filter(
          (s) =>
            s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.desc.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.keys.join("").toLowerCase().includes(searchQuery.toLowerCase()),
        )
      : [];

  const quizShortcuts = SHORTCUT_CATEGORIES[0].shortcuts.slice(0, 6);
  const quizCurrent = quizShortcuts[quizIdx % quizShortcuts.length];
  const quizOptions = [
    quizCurrent.name,
    ...allShortcuts
      .filter((s) => s.name !== quizCurrent.name)
      .slice(0, 3)
      .map((s) => s.name),
  ].sort(() => Math.random() - 0.5);

  const handleQuizAnswer = (ans) => {
    if (quizAnswer !== null) return;
    setQuizAnswer(ans);
    if (ans === quizCurrent.name) setQuizScore((s) => s + 1);
  };

  // Show demo for tool categories
  const showDemo =
    activeCategory === 0 && (activeShortcut === 0 || activeShortcut === 1);
  const demoTool = showDemo ? (activeShortcut === 0 ? "V" : "A") : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .sc-page { min-height:100vh; background:#0c0600; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .sc-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(12,6,0,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(249,115,22,0.1); z-index:100; }
        .sc-back { background:none; border:1px solid rgba(249,115,22,0.2); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .sc-back:hover { color:#f97316; border-color:rgba(249,115,22,0.5); }
        .sc-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.14em; color:rgba(249,115,22,0.8); }
        .sc-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(249,115,22,0.08); position:relative; overflow:hidden; }
        .sc-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 30% 55%, rgba(249,115,22,0.07) 0%, transparent 55%); }
        .sc-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(249,115,22,0.5); margin-bottom:14px; position:relative; z-index:1; }
        .sc-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,9vw,8rem); line-height:0.88; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .sc-hero-title em { color:#f97316; font-style:normal; }
        .sc-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .sc-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(249,115,22,0.05); line-height:1; pointer-events:none; user-select:none; }
        .sc-search { padding:28px 56px; border-bottom:1px solid rgba(249,115,22,0.08); }
        .sc-search-input { width:100%; max-width:400px; background:rgba(255,255,255,0.04); border:1px solid rgba(249,115,22,0.15); border-radius:6px; padding:10px 16px; color:#fff; font-size:14px; font-family:'DM Sans',sans-serif; outline:none; transition:border-color 0.2s; }
        .sc-search-input:focus { border-color:rgba(249,115,22,0.4); }
        .sc-search-input::placeholder { color:rgba(255,255,255,0.2); }
        .sc-search-results { margin-top:12px; display:flex; flex-direction:column; gap:6px; }
        .sc-search-result { display:flex; align-items:center; gap:12px; padding:10px 14px; border-radius:6px; border:1px solid rgba(255,255,255,0.06); background:rgba(255,255,255,0.02); }
        .sc-search-keys { display:flex; gap:4px; }
        .sc-search-name { font-size:13px; color:#fff; flex:1; }
        .sc-search-desc { font-size:11px; color:rgba(255,255,255,0.3); }
        .sc-cats { display:flex; gap:0; border-bottom:1px solid rgba(249,115,22,0.08); overflow-x:auto; }
        .sc-cat { padding:16px 28px; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; transition:all 0.2s; background:transparent; color:rgba(255,255,255,0.35); border:none; font-family:'DM Sans',sans-serif; border-bottom:2px solid transparent; white-space:nowrap; flex-shrink:0; }
        .sc-cat.active-cat { color:#fff; }
        .sc-main { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(249,115,22,0.08); }
        .sc-list { border-right:1px solid rgba(249,115,22,0.08); padding:40px 0; overflow-y:auto; max-height:600px; }
        .sc-list-label { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,115,22,0.4); padding:0 28px; margin-bottom:16px; }
        .sc-item { display:flex; align-items:center; gap:14px; padding:12px 28px; cursor:pointer; transition:all 0.2s; border-left:2px solid transparent; }
        .sc-item:hover { background:rgba(249,115,22,0.04); padding-left:34px; }
        .sc-item.active-sc { border-left-color:#f97316; background:rgba(249,115,22,0.06); padding-left:34px; }
        .sc-item-keys { display:flex; gap:3px; }
        .sc-item-name { font-size:13px; color:rgba(255,255,255,0.6); transition:color 0.2s; flex:1; }
        .sc-item.active-sc .sc-item-name { color:#fff; }
        .sc-detail { padding:40px 48px; display:flex; flex-direction:column; justify-content:center; gap:0; }
        .sc-detail-name { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; margin-bottom:16px; line-height:0.9; }
        .sc-detail-keys { display:flex; gap:6px; align-items:center; margin-bottom:24px; flex-wrap:wrap; }
        .sc-plus { font-size:14px; color:rgba(255,255,255,0.3); }
        .sc-detail-desc { font-size:15px; color:rgba(255,255,255,0.45); line-height:1.8; margin-bottom:20px; }
        .sc-pro-box { padding:16px 20px; border-radius:8px; background:rgba(249,115,22,0.07); border-left:3px solid #f97316; margin-bottom:20px; }
        .sc-pro-label { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,115,22,0.6); margin-bottom:6px; }
        .sc-pro-text { font-size:13px; color:rgba(255,255,255,0.55); line-height:1.65; }
        .sc-demo-wrap { border-top:1px solid rgba(249,115,22,0.08); padding-top:20px; margin-top:4px; }
        .sc-demo-label { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,115,22,0.4); margin-bottom:14px; }
        .sc-quiz-section { padding:72px 56px; background:#0e0700; }
        .sc-section-header { display:flex; align-items:baseline; gap:16px; margin-bottom:8px; }
        .sc-section-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(2rem,4vw,3.5rem); color:#fff; }
        .sc-section-line { flex:1; height:1px; background:rgba(249,115,22,0.08); }
        .sc-section-sub { font-size:13px; color:rgba(255,255,255,0.28); margin-bottom:32px; line-height:1.7; }
        .sc-quiz-card { display:grid; grid-template-columns:1fr 1fr; gap:32px; }
        .sc-quiz-left { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:16px; padding:40px; border:1px solid rgba(249,115,22,0.12); border-radius:12px; background:rgba(249,115,22,0.04); }
        .sc-quiz-question { font-size:13px; color:rgba(255,255,255,0.3); text-transform:uppercase; margin-bottom:8px; text-align:center; letter-spacing:0.08em; }
        .sc-quiz-keys { display:flex; gap:8px; align-items:center; }
        .sc-quiz-right { display:flex; flex-direction:column; justify-content:center; gap:8px; }
        .sc-quiz-opt { padding:12px 18px; border-radius:6px; border:1px solid rgba(255,255,255,0.08); background:rgba(255,255,255,0.02); color:rgba(255,255,255,0.6); font-size:13px; cursor:pointer; font-family:'DM Sans',sans-serif; transition:all 0.2s; text-align:left; }
        .sc-quiz-opt:hover { background:rgba(255,255,255,0.05); color:#fff; }
        .sc-quiz-opt.correct { border-color:#f97316; background:rgba(249,115,22,0.1); color:#f97316; }
        .sc-quiz-opt.wrong { border-color:rgba(251,113,133,0.3); opacity:0.5; }
        .sc-quiz-next { margin-top:8px; padding:8px 20px; border:1px solid rgba(249,115,22,0.3); background:rgba(249,115,22,0.08); color:#f97316; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; cursor:pointer; font-family:'DM Sans',sans-serif; border-radius:4px; align-self:flex-start; }
        .sc-score { font-size:11px; color:rgba(255,255,255,0.3); }
        @media(max-width:900px) { .sc-main,.sc-quiz-card { grid-template-columns:1fr; } }
      `}</style>

      <div className="sc-page">
        <nav className="sc-nav">
          <button className="sc-back" onClick={onBack}>
            ← Back
          </button>
          <span className="sc-nav-title">Essential Shortcuts</span>
          <span
            style={{
              fontSize: 10,
              color: "rgba(249,115,22,0.4)",
              letterSpacing: "0.15em",
            }}
          >
            LESSON 02
          </span>
        </nav>

        <div className="sc-hero">
          <div className="sc-hero-bg" />
          <div className="sc-eyebrow">Illustrator Basics · Lesson 02</div>
          <div className="sc-hero-title">
            STOP USING
            <br />
            <em>THE MENUS.</em>
          </div>
          <p className="sc-hero-sub">
            Every second spent clicking the toolbar is a second not spent
            designing. These shortcuts don't just save time — they change how
            you think. Click any shortcut to see its pro use.
          </p>
          <div className="sc-hero-num">02</div>
        </div>

        <div className="sc-search">
          <input
            className="sc-search-input"
            placeholder="Search shortcuts... e.g. 'rotate' or 'V'"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {filtered.length > 0 && (
            <div className="sc-search-results">
              {filtered.slice(0, 5).map((s, i) => (
                <div key={i} className="sc-search-result">
                  <div className="sc-search-keys">
                    {s.keys.map((k, j) => (
                      <ShortcutKey key={j} k={k} />
                    ))}
                  </div>
                  <div className="sc-search-name">{s.name}</div>
                  <div className="sc-search-desc">{s.desc.split(".")[0]}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="sc-cats">
          {SHORTCUT_CATEGORIES.map((cat, i) => (
            <button
              key={i}
              className={`sc-cat${activeCategory === i ? " active-cat" : ""}`}
              style={
                activeCategory === i
                  ? { color: cat.accent, borderBottomColor: cat.accent }
                  : {}
              }
              onClick={() => {
                setActiveCategory(i);
                setActiveShortcut(0);
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="sc-main">
          <div className="sc-list">
            <div className="sc-list-label">{category.desc}</div>
            {category.shortcuts.map((s, i) => (
              <div
                key={i}
                className={`sc-item${activeShortcut === i ? " active-sc" : ""}`}
                onClick={() => setActiveShortcut(i)}
              >
                <div className="sc-item-keys">
                  {s.keys.map((k, j) => (
                    <ShortcutKey key={j} k={k} />
                  ))}
                </div>
                <div className="sc-item-name">{s.name}</div>
              </div>
            ))}
          </div>
          <div className="sc-detail">
            <div className="sc-detail-name">{shortcut.name}</div>
            <div className="sc-detail-keys">
              {shortcut.keys.map((k, i) => (
                <span
                  key={i}
                  style={{ display: "flex", alignItems: "center", gap: 6 }}
                >
                  {i > 0 && <span className="sc-plus">+</span>}
                  <ShortcutKey k={k} />
                </span>
              ))}
            </div>
            <p className="sc-detail-desc">{shortcut.desc}</p>
            <div className="sc-pro-box">
              <div className="sc-pro-label">Pro tip</div>
              <div className="sc-pro-text">{shortcut.pro}</div>
            </div>
            {/* INTERACTIVE DEMO for V and A */}
            {activeCategory === 0 &&
              (activeShortcut === 0 || activeShortcut === 1) && (
                <div className="sc-demo-wrap">
                  <div className="sc-demo-label">Interactive demo</div>
                  <SelectionDemo
                    accent={category.accent}
                    defaultMode={activeShortcut === 0 ? "V" : "A"}
                  />
                </div>
              )}
            {/* SHAPE BUILDER demo for duplicate (pro shortcut) */}
            {activeCategory === 1 && activeShortcut === 6 && (
              <div className="sc-demo-wrap">
                <div className="sc-demo-label">
                  Shape Builder — related interactive
                </div>
                <ShapeBuilderDemo accent={category.accent} />
              </div>
            )}
          </div>
        </div>

        <div className="sc-quiz-section">
          <div className="sc-section-header">
            <div className="sc-section-title">TEST YOURSELF</div>
            <div className="sc-section-line" />
          </div>
          <p className="sc-section-sub">
            See the keys — guess the tool. The only way to really learn
            shortcuts is to use them until they're automatic.
          </p>
          <div className="sc-quiz-card">
            <div className="sc-quiz-left">
              <div className="sc-quiz-question">
                What does this shortcut do?
              </div>
              <div className="sc-quiz-keys">
                {quizCurrent.keys.map((k, i) => (
                  <span
                    key={i}
                    style={{ display: "flex", alignItems: "center", gap: 6 }}
                  >
                    {i > 0 && (
                      <span
                        style={{ fontSize: 16, color: "rgba(255,255,255,0.3)" }}
                      >
                        +
                      </span>
                    )}
                    <ShortcutKey k={k} />
                  </span>
                ))}
              </div>
              <div className="sc-score">Score: {quizScore} correct</div>
            </div>
            <div className="sc-quiz-right">
              {quizOptions.map((opt, i) => {
                const answered = quizAnswer !== null;
                const isCorrect = opt === quizCurrent.name;
                return (
                  <button
                    key={i}
                    className={`sc-quiz-opt${answered ? (isCorrect ? " correct" : " wrong") : ""}`}
                    onClick={() => handleQuizAnswer(opt)}
                  >
                    {opt}
                  </button>
                );
              })}
              {quizAnswer !== null && (
                <button
                  className="sc-quiz-next"
                  onClick={() => {
                    setQuizIdx((q) => q + 1);
                    setQuizAnswer(null);
                  }}
                >
                  Next →
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
