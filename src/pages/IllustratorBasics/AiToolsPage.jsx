import { useState, useEffect, useRef } from "react";

const TOOLS = [
  {
    id: "pen",
    name: "Pen Tool",
    key: "P",
    icon: "✒",
    accent: "#f97316",
    tagline: "Master this. Master everything.",
    desc: "The Pen tool creates precise vector paths by placing anchor points. Every professional logo, illustration, and custom shape starts here.",
    steps: [
      {
        title: "Click to place anchor",
        desc: "Click anywhere on the canvas to place your first anchor point. No dragging — just click.",
        action: "click",
      },
      {
        title: "Click again for straight line",
        desc: "Click a second point to create a straight line segment between them.",
        action: "click",
      },
      {
        title: "Click and drag for curve",
        desc: "Click and drag to create a curved segment. The drag direction controls the curve handle.",
        action: "drag",
      },
      {
        title: "Close the path",
        desc: "Click back on the first anchor point to close the path into a shape.",
        action: "close",
      },
    ],
    tips: [
      "Hold Shift while clicking to constrain angles to 45°",
      "Alt+click a direction handle to break it and create a corner point",
      "Press Escape to end an open path without closing it",
      "The Pen tool is hard. Practise for 20 minutes — it clicks.",
    ],
  },
  {
    id: "selection",
    name: "Selection Tools",
    key: "V / A",
    icon: "↖",
    accent: "#a78bfa",
    tagline: "Two tools. Very different jobs.",
    desc: "The Selection tool (V) selects whole objects. The Direct Selection tool (A) selects individual anchor points and segments within a path.",
    steps: [
      {
        title: "V — Select whole objects",
        desc: "Click any object to select it. Drag to move. Hold Shift to add to selection.",
        action: "click",
      },
      {
        title: "V — Drag to select multiple",
        desc: "Click empty space and drag a marquee box to select everything inside.",
        action: "drag",
      },
      {
        title: "A — Select anchor points",
        desc: "Switch to Direct Selection (A), click on a path to see its anchors.",
        action: "click",
      },
      {
        title: "A — Move individual anchors",
        desc: "Click a single anchor point and drag to reshape the path.",
        action: "drag",
      },
    ],
    tips: [
      "Double-click an object with V to enter isolation mode",
      "Hold Alt+drag with V to duplicate an object",
      "Ctrl+A selects everything on the artboard",
      "Click empty space to deselect everything",
    ],
  },
  {
    id: "pathfinder",
    name: "Pathfinder",
    key: "Window → Pathfinder",
    icon: "⊕",
    accent: "#fb923c",
    tagline: "Boolean operations for shapes.",
    desc: "Pathfinder lets you combine, subtract, and intersect shapes to create complex forms from simple ones. The foundation of logo design.",
    steps: [
      {
        title: "Unite — merge shapes",
        desc: "Two overlapping shapes become one unified shape. Like welding.",
        action: "unite",
      },
      {
        title: "Minus Front — subtract",
        desc: "The front shape cuts a hole out of the back shape. Like a cookie cutter.",
        action: "minus",
      },
      {
        title: "Intersect — keep overlap only",
        desc: "Keeps only the area where shapes overlap. Everything else disappears.",
        action: "intersect",
      },
      {
        title: "Exclude — remove overlap",
        desc: "Removes the overlapping area and keeps everything else.",
        action: "exclude",
      },
    ],
    tips: [
      "Always duplicate your shapes before using Pathfinder (it's destructive)",
      "Expand the result if you need to edit anchors",
      "Shape Builder tool (Shift+M) is Pathfinder with direct control",
      "Group shapes before Pathfinder if you have multiple objects",
    ],
  },
  {
    id: "shapebuilder",
    name: "Shape Builder",
    key: "Shift + M",
    icon: "⊗",
    accent: "#fb923c",
    tagline: "Pathfinder but hands-on.",
    desc: "Draw through overlapping shapes to merge them, or Alt+drag to subtract. More intuitive than Pathfinder for complex shapes.",
    steps: [
      {
        title: "Select all overlapping shapes",
        desc: "Select all the shapes you want to work with using the Selection tool.",
        action: "select",
      },
      {
        title: "Press Shift+M",
        desc: "Switch to Shape Builder. Hover over regions — they highlight in grey.",
        action: "switch",
      },
      {
        title: "Drag to merge regions",
        desc: "Click and drag across regions you want to merge into one shape.",
        action: "merge",
      },
      {
        title: "Alt+click to delete",
        desc: "Hold Alt and click a region to remove it from the shape entirely.",
        action: "delete",
      },
    ],
    tips: [
      "This is how most logo designers build complex marks",
      "Hover before clicking to preview which region will be affected",
      "You can merge non-overlapping shapes if they're close",
      "Great for creating custom letterforms and icons",
    ],
  },
];

function PenDemo() {
  const [points, setPoints] = useState([]);
  const [closed, setClosed] = useState(false);
  const svgRef = useRef(null);

  const addPoint = (e) => {
    if (closed) {
      setPoints([]);
      setClosed(false);
      return;
    }
    const rect = svgRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (points.length > 1) {
      const first = points[0];
      const dist = Math.sqrt((x - first.x) ** 2 + (y - first.y) ** 2);
      if (dist < 20) {
        setClosed(true);
        return;
      }
    }
    setPoints((p) => [...p, { x, y }]);
  };

  const buildPath = () => {
    if (points.length < 2) return "";
    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 1; i < points.length; i++) {
      const prev = points[i - 1];
      const curr = points[i];
      const cpx = (prev.x + curr.x) / 2;
      d += ` Q ${cpx} ${prev.y} ${curr.x} ${curr.y}`;
    }
    if (closed) d += " Z";
    return d;
  };

  return (
    <div>
      <div
        style={{
          fontSize: 10,
          letterSpacing: "0.15em",
          textTransform: "uppercase",
          color: "rgba(249,115,22,0.5)",
          marginBottom: 12,
        }}
      >
        {closed
          ? "Click to reset"
          : points.length === 0
            ? "Click anywhere to start drawing"
            : points.length < 3
              ? "Keep clicking to add points"
              : "Click near the first point to close"}
      </div>
      <svg
        ref={svgRef}
        width="100%"
        height="240"
        onClick={addPoint}
        style={{
          border: "1px solid rgba(249,115,22,0.15)",
          borderRadius: 10,
          background: "rgba(0,0,0,0.3)",
          cursor: "crosshair",
          display: "block",
        }}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 80}
            y1={0}
            x2={i * 80}
            y2={240}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        ))}
        {Array.from({ length: 4 }).map((_, i) => (
          <line
            key={`h${i}`}
            x1={0}
            y1={i * 60}
            x2={640}
            y2={i * 60}
            stroke="rgba(255,255,255,0.04)"
            strokeWidth="0.5"
          />
        ))}
        {points.length >= 2 && (
          <path
            d={buildPath()}
            fill={closed ? "rgba(249,115,22,0.15)" : "none"}
            stroke="#f97316"
            strokeWidth="1.5"
          />
        )}
        {points.map((pt, i) => (
          <g key={i}>
            <rect
              x={pt.x - 5}
              y={pt.y - 5}
              width={10}
              height={10}
              fill={i === 0 ? "#f97316" : "#0c0600"}
              stroke="#f97316"
              strokeWidth="1.5"
            />
            <text
              x={pt.x + 8}
              y={pt.y - 8}
              fill="rgba(249,115,22,0.5)"
              fontSize="10"
            >
              {i + 1}
            </text>
          </g>
        ))}
      </svg>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: 10,
        }}
      >
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.25)" }}>
          {points.length} anchor point{points.length !== 1 ? "s" : ""}
        </div>
        {points.length > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPoints([]);
              setClosed(false);
            }}
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
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

function PathfinderDemo() {
  const [activeOp, setActiveOp] = useState("unite");
  const ops = [
    { id: "unite", label: "Unite", desc: "Merge into one shape" },
    { id: "minus", label: "Minus Front", desc: "Subtract top from bottom" },
    { id: "intersect", label: "Intersect", desc: "Keep overlap only" },
    { id: "exclude", label: "Exclude", desc: "Remove overlap" },
  ];
  const getShapes = () => {
    switch (activeOp) {
      case "unite":
        return (
          <path
            d="M 40 80 L 40 160 L 120 160 L 120 120 L 160 120 L 160 40 L 80 40 L 80 80 Z"
            fill="rgba(251,148,52,0.3)"
            stroke="#fb923c"
            strokeWidth="1.5"
          />
        );
      case "minus":
        return (
          <>
            <rect
              x={40}
              y={60}
              width={120}
              height={120}
              fill="rgba(251,148,52,0.2)"
              stroke="#fb923c"
              strokeWidth="1.5"
              rx={4}
            />
            <rect
              x={100}
              y={40}
              width={100}
              height={100}
              fill="rgba(12,6,0,0.9)"
              stroke="#fb923c"
              strokeWidth="1.5"
              strokeDasharray="4,3"
              rx={4}
            />
          </>
        );
      case "intersect":
        return (
          <>
            <rect
              x={40}
              y={60}
              width={110}
              height={110}
              fill="rgba(251,148,52,0.08)"
              stroke="rgba(251,148,52,0.3)"
              strokeWidth="1"
              rx={4}
            />
            <rect
              x={90}
              y={80}
              width={110}
              height={110}
              fill="rgba(251,148,52,0.08)"
              stroke="rgba(251,148,52,0.3)"
              strokeWidth="1"
              rx={4}
            />
            <rect
              x={90}
              y={80}
              width={60}
              height={90}
              fill="rgba(251,148,52,0.5)"
              stroke="#fb923c"
              strokeWidth="2"
              rx={2}
            />
          </>
        );
      case "exclude":
        return (
          <>
            <rect
              x={40}
              y={60}
              width={110}
              height={110}
              fill="rgba(251,148,52,0.3)"
              stroke="#fb923c"
              strokeWidth="1.5"
              rx={4}
            />
            <rect
              x={90}
              y={80}
              width={110}
              height={110}
              fill="rgba(251,148,52,0.3)"
              stroke="#fb923c"
              strokeWidth="1.5"
              rx={4}
            />
            <rect
              x={90}
              y={80}
              width={60}
              height={90}
              fill="rgba(12,6,0,1)"
              stroke="rgba(251,148,52,0.2)"
              strokeWidth="1"
              rx={2}
            />
          </>
        );
    }
  };
  return (
    <div style={{ width: "100%" }}>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {ops.map((op) => (
          <button
            key={op.id}
            onClick={() => setActiveOp(op.id)}
            style={{
              flex: 1,
              padding: "8px 6px",
              border: `1px solid ${activeOp === op.id ? "rgba(251,148,52,0.5)" : "rgba(255,255,255,0.08)"}`,
              background:
                activeOp === op.id
                  ? "rgba(251,148,52,0.1)"
                  : "rgba(255,255,255,0.02)",
              color: activeOp === op.id ? "#fb923c" : "rgba(255,255,255,0.4)",
              fontSize: 10,
              borderRadius: 4,
              cursor: "pointer",
              fontFamily: "'DM Sans',sans-serif",
              transition: "all 0.2s",
            }}
          >
            {op.label}
          </button>
        ))}
      </div>
      <svg
        width="100%"
        height="200"
        viewBox="0 0 240 200"
        style={{
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 10,
          background: "rgba(0,0,0,0.3)",
          display: "block",
        }}
      >
        {getShapes()}
      </svg>
      <div
        style={{
          marginTop: 10,
          fontSize: 12,
          color: "rgba(255,255,255,0.35)",
          textAlign: "center",
        }}
      >
        {ops.find((o) => o.id === activeOp)?.desc}
      </div>
    </div>
  );
}

function SelectionDemo({ accent }) {
  const [selected, setSelected] = useState(null);
  const [mode, setMode] = useState("V");
  const [dragging, setDragging] = useState(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [positions, setPositions] = useState([
    { id: 1, x: 40, y: 50, w: 90, h: 90, color: "#a78bfa", label: "Shape A" },
    { id: 2, x: 160, y: 70, w: 110, h: 65, color: "#f472b6", label: "Shape B" },
    { id: 3, x: 100, y: 165, w: 75, h: 75, color: "#fb923c", label: "Shape C" },
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
          display: "block",
          cursor: "default",
        }}
      >
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
            y="265"
            textAnchor="middle"
            fill="rgba(255,255,255,0.18)"
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
          ? "V mode: click to select · drag to move · resize handles appear"
          : "A mode: click shape to see individual anchor points"}
      </div>
    </div>
  );
}

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
    if (!regions[id]) return "rgba(255,255,255,0.02)";
    if (merged.includes(id)) return `${accent}55`;
    return `${accent}20`;
  };
  const getStroke = (id) => {
    if (!regions[id]) return "rgba(255,255,255,0.04)";
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
        <clipPath id="sb-left-only">
          <rect x={0} y={0} width={162} height={260} />
        </clipPath>
        <clipPath id="sb-right-only">
          <rect x={162} y={0} width={320} height={260} />
        </clipPath>
        <clipPath id="sb-overlap-clip">
          <circle cx={130} cy={128} r={80} />
        </clipPath>
        {/* Left region */}
        <circle
          cx={130}
          cy={128}
          r={80}
          fill={getColor("left")}
          stroke={getStroke("left")}
          strokeWidth={1.5}
          clipPath="url(#sb-left-only)"
          style={{ cursor: "pointer", transition: "all 0.25s" }}
          onClick={() => handleClick("left")}
        />
        {/* Right region */}
        <circle
          cx={192}
          cy={128}
          r={80}
          fill={getColor("right")}
          stroke={getStroke("right")}
          strokeWidth={1.5}
          clipPath="url(#sb-right-only)"
          style={{ cursor: "pointer", transition: "all 0.25s" }}
          onClick={() => handleClick("right")}
        />
        {/* Overlap */}
        <circle
          cx={192}
          cy={128}
          r={80}
          fill={getColor("overlap")}
          stroke={getStroke("overlap")}
          strokeWidth={1.5}
          clipPath="url(#sb-overlap-clip)"
          style={{ cursor: "pointer", transition: "all 0.25s" }}
          onClick={() => handleClick("overlap")}
        />
        {regions.left && (
          <text
            x="95"
            y="133"
            textAnchor="middle"
            fill={`${accent}90`}
            fontSize="16"
            fontFamily="'Bebas Neue',sans-serif"
          >
            A
          </text>
        )}
        {regions.right && (
          <text
            x="227"
            y="133"
            textAnchor="middle"
            fill={`${accent}90`}
            fontSize="16"
            fontFamily="'Bebas Neue',sans-serif"
          >
            B
          </text>
        )}
        {regions.overlap && (
          <text
            x="161"
            y="133"
            textAnchor="middle"
            fill={accent}
            fontSize="11"
            fontFamily="'DM Sans',sans-serif"
          >
            ∩
          </text>
        )}
        <text
          x="160"
          y="248"
          textAnchor="middle"
          fill="rgba(255,255,255,0.15)"
          fontSize="10"
          fontFamily="'DM Sans',sans-serif"
        >
          {mode === "merge"
            ? "Click regions to merge"
            : "Click regions to delete"}
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

export default function AIToolsPage({ onBack }) {
  const [activeTool, setActiveTool] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const tool = TOOLS[activeTool];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=DM+Serif+Display:ital@0;1&family=Bebas+Neue&display=swap');
        * { box-sizing:border-box; }
        .at-page { min-height:100vh; background:#0c0600; font-family:'DM Sans',sans-serif; color:rgba(255,255,255,0.9); overflow-x:hidden; }
        .at-nav { display:flex; align-items:center; justify-content:space-between; padding:16px 40px; position:sticky; top:0; background:rgba(12,6,0,0.95); backdrop-filter:blur(20px); border-bottom:1px solid rgba(249,115,22,0.1); z-index:100; }
        .at-back { background:none; border:1px solid rgba(249,115,22,0.2); color:rgba(255,255,255,0.5); padding:8px 18px; border-radius:4px; cursor:pointer; font-size:11px; font-family:'DM Sans',sans-serif; transition:all 0.2s; letter-spacing:0.08em; text-transform:uppercase; }
        .at-back:hover { color:#f97316; border-color:rgba(249,115,22,0.5); }
        .at-nav-title { font-family:'Bebas Neue',sans-serif; font-size:18px; letter-spacing:0.14em; color:rgba(249,115,22,0.8); }
        .at-hero { padding:72px 56px 56px; border-bottom:1px solid rgba(249,115,22,0.08); position:relative; overflow:hidden; }
        .at-hero-bg { position:absolute; inset:0; background:radial-gradient(ellipse at 30% 55%, rgba(249,115,22,0.07) 0%, transparent 55%); }
        .at-eyebrow { font-size:10px; letter-spacing:0.28em; text-transform:uppercase; color:rgba(249,115,22,0.5); margin-bottom:14px; position:relative; z-index:1; }
        .at-hero-title { font-family:'Bebas Neue',sans-serif; font-size:clamp(4rem,9vw,8rem); line-height:0.88; color:#fff; margin-bottom:20px; position:relative; z-index:1; }
        .at-hero-title em { color:#f97316; font-style:normal; }
        .at-hero-sub { font-size:15px; color:rgba(255,255,255,0.3); max-width:520px; line-height:1.8; position:relative; z-index:1; }
        .at-hero-num { position:absolute; right:40px; bottom:-20px; font-family:'Bebas Neue',sans-serif; font-size:clamp(8rem,18vw,16rem); color:transparent; -webkit-text-stroke:1px rgba(249,115,22,0.05); line-height:1; pointer-events:none; user-select:none; }
        .at-tabs { display:flex; gap:0; border-bottom:1px solid rgba(249,115,22,0.08); overflow-x:auto; }
        .at-tab { padding:20px 32px; cursor:pointer; transition:all 0.2s; background:transparent; border:none; font-family:'DM Sans',sans-serif; border-bottom:2px solid transparent; text-align:left; display:flex; flex-direction:column; gap:4px; flex-shrink:0; }
        .at-tab-key { font-family:'Bebas Neue',sans-serif; font-size:22px; letter-spacing:0.04em; color:rgba(255,255,255,0.25); transition:color 0.2s; }
        .at-tab-name { font-size:11px; color:rgba(255,255,255,0.3); letter-spacing:0.06em; transition:color 0.2s; }
        .at-tab.active-at { border-bottom-color:currentColor; }
        .at-tab.active-at .at-tab-key { color:#fff; }
        .at-tab.active-at .at-tab-name { color:rgba(255,255,255,0.6); }
        .at-main { display:grid; grid-template-columns:1fr 1fr; border-bottom:1px solid rgba(249,115,22,0.08); }
        .at-left { padding:56px; border-right:1px solid rgba(249,115,22,0.08); }
        .at-tool-tagline { font-family:'DM Serif Display',serif; font-style:italic; font-size:18px; color:rgba(255,255,255,0.4); margin-bottom:12px; }
        .at-tool-name { font-family:'Bebas Neue',sans-serif; font-size:clamp(2.5rem,5vw,4rem); color:#fff; margin-bottom:20px; line-height:0.9; }
        .at-tool-desc { font-size:14px; color:rgba(255,255,255,0.38); line-height:1.85; margin-bottom:32px; }
        .at-steps { display:flex; flex-direction:column; margin-bottom:28px; }
        .at-step { display:flex; gap:14px; padding:14px 0; border-bottom:1px solid rgba(255,255,255,0.05); cursor:pointer; transition:all 0.2s; }
        .at-step:last-child { border-bottom:none; }
        .at-step.active-step { padding-left:8px; }
        .at-step-num { font-family:'Bebas Neue',sans-serif; font-size:20px; color:rgba(255,255,255,0.15); width:24px; flex-shrink:0; line-height:1.2; transition:color 0.2s; }
        .at-step.active-step .at-step-num { color:var(--accent); }
        .at-step-body { flex:1; }
        .at-step-title { font-size:13px; font-weight:500; color:rgba(255,255,255,0.65); margin-bottom:3px; transition:color 0.2s; }
        .at-step.active-step .at-step-title { color:#fff; }
        .at-step-desc { font-size:11px; color:rgba(255,255,255,0.28); line-height:1.6; max-height:0; overflow:hidden; transition:max-height 0.3s; }
        .at-step.active-step .at-step-desc { max-height:60px; }
        .at-tips { display:flex; flex-direction:column; gap:6px; }
        .at-tip { font-size:12px; color:rgba(255,255,255,0.35); line-height:1.6; padding:8px 12px; border-radius:4px; border-left:2px solid; }
        .at-right { padding:56px; display:flex; flex-direction:column; justify-content:center; background:#0e0700; }
        .at-demo-label { font-size:9px; letter-spacing:0.2em; text-transform:uppercase; color:rgba(249,115,22,0.4); margin-bottom:16px; }
        @media(max-width:900px) { .at-main { grid-template-columns:1fr; } }
      `}</style>

      <div className="at-page">
        <nav className="at-nav">
          <button className="at-back" onClick={onBack}>
            ← Back
          </button>
          <span className="at-nav-title">Tools to Know</span>
          <span
            style={{
              fontSize: 10,
              color: "rgba(249,115,22,0.4)",
              letterSpacing: "0.15em",
            }}
          >
            LESSON 03
          </span>
        </nav>

        <div className="at-hero">
          <div className="at-hero-bg" />
          <div className="at-eyebrow">Illustrator Basics · Lesson 03</div>
          <div className="at-hero-title">
            FOUR TOOLS.
            <br />
            <em>INFINITE SHAPES.</em>
          </div>
          <p className="at-hero-sub">
            You don't need every tool. You need these four. The Pen, the
            Selection tools, Pathfinder, and Shape Builder — together they can
            create anything.
          </p>
          <div className="at-hero-num">03</div>
        </div>

        <div className="at-tabs">
          {TOOLS.map((t, i) => (
            <button
              key={i}
              className={`at-tab${activeTool === i ? " active-at" : ""}`}
              style={
                activeTool === i
                  ? { color: t.accent, borderBottomColor: t.accent }
                  : {}
              }
              onClick={() => {
                setActiveTool(i);
                setActiveStep(0);
              }}
            >
              <div className="at-tab-key">
                {t.icon} {t.key}
              </div>
              <div className="at-tab-name">{t.name}</div>
            </button>
          ))}
        </div>

        <div className="at-main" style={{ "--accent": tool.accent }}>
          <div className="at-left">
            <div className="at-tool-tagline">"{tool.tagline}"</div>
            <div className="at-tool-name" style={{ color: tool.accent }}>
              {tool.name}
            </div>
            <p className="at-tool-desc">{tool.desc}</p>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: `${tool.accent}60`,
                marginBottom: 12,
              }}
            >
              How to use it
            </div>
            <div className="at-steps">
              {tool.steps.map((step, i) => (
                <div
                  key={i}
                  className={`at-step${activeStep === i ? " active-step" : ""}`}
                  onClick={() => setActiveStep(i)}
                >
                  <div className="at-step-num">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div className="at-step-body">
                    <div className="at-step-title">{step.title}</div>
                    <div className="at-step-desc">{step.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div
              style={{
                fontSize: 11,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: `${tool.accent}60`,
                marginBottom: 12,
                marginTop: 20,
              }}
            >
              Tips
            </div>
            <div className="at-tips">
              {tool.tips.map((tip, i) => (
                <div
                  key={i}
                  className="at-tip"
                  style={{
                    borderLeftColor: `${tool.accent}40`,
                    color: "rgba(255,255,255,0.38)",
                  }}
                >
                  {tip}
                </div>
              ))}
            </div>
          </div>
          <div className="at-right">
            <div className="at-demo-label">Interactive demo — try it</div>
            {tool.id === "pen" && <PenDemo />}
            {tool.id === "pathfinder" && <PathfinderDemo />}
            {tool.id === "selection" && <SelectionDemo accent={tool.accent} />}
            {tool.id === "shapebuilder" && (
              <ShapeBuilderDemo accent={tool.accent} />
            )}
          </div>
        </div>
      </div>
    </>
  );
}
