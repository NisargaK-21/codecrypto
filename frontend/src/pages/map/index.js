// import { useEffect, useState, useRef } from "react";
// import axios from "axios";
// import StageCard from "../../components/game/StageCard";

// const DEMO_STAGES = [
//   {
//     _id: "1",
//     title: "Haunted HTML Gate",
//     description: "The gatekeeper demands proof of HTML mastery. Forge a button to breach the cursed entrance.",
//     icon: "🕯",
//     category: "html",
//     difficulty: "Initiate",
//     xp: 50,
//     unlocked: true,
//     completed: true,
//   },
//   {
//     _id: "2",
//     title: "CSS Shadow Room",
//     description: "Style the cursed artefacts with Tailwind spells. The shadows bend to those who know the incantations.",
//     icon: "🧪",
//     category: "css",
//     difficulty: "Apprentice",
//     xp: 80,
//     unlocked: true,
//     completed: false,
//   },
//   {
//     _id: "3",
//     title: "React Awakening",
//     description: "Breathe life into dead components. The React Necromancer watches your every keystroke.",
//     icon: "⚛",
//     category: "react",
//     difficulty: "Practitioner",
//     xp: 120,
//     unlocked: false,
//     completed: false,
//   },
//   {
//     _id: "4",
//     title: "Backend Crypt",
//     description: "Descend into server-side darkness. Node.js demons await those who dare enter the crypt.",
//     icon: "🌐",
//     category: "backend",
//     difficulty: "Warlock",
//     xp: 200,
//     unlocked: false,
//     completed: false,
//   },
//   {
//     _id: "5",
//     title: "CSS Demon Boss",
//     description: "A responsive grid layout stands between you and freedom. Defeat the demon or be consumed.",
//     icon: "👹",
//     category: "boss",
//     difficulty: "Boss",
//     xp: 350,
//     unlocked: false,
//     completed: false,
//   },
//   {
//     _id: "6",
//     title: "The Final Ritual",
//     description: "Combine all cursed knowledge in the ultimate full-stack sacrifice. None have survived.",
//     icon: "☠️",
//     category: "fullstack",
//     difficulty: "Lich Lord",
//     xp: 500,
//     unlocked: false,
//     completed: false,
//   },
// ];

// const CATEGORY_COLORS = {
//   html:      { from: "#8B0000", to: "#CC0000",  border: "rgba(204,0,0,0.5)",   glow: "#CC0000" },
//   css:       { from: "#4A0066", to: "#9900CC",  border: "rgba(153,0,204,0.5)", glow: "#9900CC" },
//   react:     { from: "#003344", to: "#0099CC",  border: "rgba(0,153,204,0.5)", glow: "#0099CC" },
//   backend:   { from: "#003300", to: "#00AA44",  border: "rgba(0,170,68,0.5)",  glow: "#00AA44" },
//   boss:      { from: "#660033", to: "#FF0066",  border: "rgba(255,0,102,0.6)", glow: "#FF0066" },
//   fullstack: { from: "#3D2200", to: "#AA6600",  border: "rgba(170,102,0,0.6)", glow: "#AA6600" },
// };

// const DIFF_BADGE = {
//   "Initiate":    { bg: "rgba(139,0,0,0.3)",    color: "#ff6666" },
//   "Apprentice":  { bg: "rgba(80,0,100,0.35)",  color: "#cc66ff" },
//   "Practitioner":{ bg: "rgba(0,50,80,0.35)",   color: "#66ccff" },
//   "Warlock":     { bg: "rgba(0,60,20,0.35)",   color: "#66ff99" },
//   "Boss":        { bg: "rgba(100,0,40,0.4)",   color: "#ff3399" },
//   "Lich Lord":   { bg: "rgba(80,50,0,0.4)",    color: "#ffbb33" },
// };

// export default function MapPage() {
//   const [stages, setStages] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [hoveredId, setHoveredId] = useState(null);
//   const [revealed, setRevealed] = useState(false);
//   const [particles, setParticles] = useState([]);
//   const [torchFlicker, setTorchFlicker] = useState(1);
//   const containerRef = useRef(null);

//   // ── Fetch stages ──────────────────────────────────────────────────────────
//   useEffect(() => {
//     const fetchStages = async () => {
//       try {
//         const res = await axios.get("http://localhost:5000/api/stages/html");
//         setStages(res.data.length ? res.data : DEMO_STAGES);
//       } catch {
//         setStages(DEMO_STAGES);
//       } finally {
//         setLoading(false);
//         setTimeout(() => setRevealed(true), 100);
//       }
//     };
//     fetchStages();
//   }, []);

//   // ── Floating ember particles ──────────────────────────────────────────────
//   useEffect(() => {
//     const pts = Array.from({ length: 30 }, (_, i) => ({
//       id: i,
//       x: Math.random() * 100,
//       y: 60 + Math.random() * 40,
//       size: 2 + Math.random() * 3,
//       dur: 5 + Math.random() * 8,
//       delay: Math.random() * 6,
//       tx: -20 + Math.random() * 40,
//     }));
//     setParticles(pts);
//   }, []);

//   // ── Torch flicker ─────────────────────────────────────────────────────────
//   useEffect(() => {
//     const id = setInterval(() => {
//       setTorchFlicker(0.7 + Math.random() * 0.5);
//     }, 120 + Math.random() * 180);
//     return () => clearInterval(id);
//   }, []);

//   const totalXP = stages.filter(s => s.completed).reduce((acc, s) => acc + (s.xp || 0), 0);
//   const completedCount = stages.filter(s => s.completed).length;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Share+Tech+Mono&family=Cinzel+Decorative:wght@400;700&family=Raleway:wght@300;400;600&display=swap');

//         :root {
//           --void: #030008;
//           --blood: #8B0000;
//           --blood-bright: #CC0000;
//           --bone: #e8ddc8;
//           --dim: rgba(232,221,200,0.55);
//           --neon-green: #00ff41;
//           --ember: #ff6600;
//           --smoke: rgba(20,0,0,0.6);
//         }

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

//         .map-root {
//           min-height: 100vh;
//           background: var(--void);
//           color: var(--bone);
//           font-family: 'Raleway', sans-serif;
//           position: relative;
//           overflow-x: hidden;
//         }

//         /* ── Stone wall texture ── */
//         .map-root::before {
//           content: '';
//           position: fixed;
//           inset: 0;
//           background-image:
//             repeating-linear-gradient(90deg, transparent, transparent 60px, rgba(255,255,255,0.012) 60px, rgba(255,255,255,0.012) 61px),
//             repeating-linear-gradient(0deg, transparent, transparent 40px, rgba(255,255,255,0.008) 40px, rgba(255,255,255,0.008) 41px),
//             radial-gradient(ellipse at 50% 0%, rgba(80,0,0,0.35) 0%, transparent 65%),
//             radial-gradient(ellipse at 50% 100%, rgba(30,0,0,0.5) 0%, transparent 60%);
//           pointer-events: none;
//           z-index: 0;
//         }

//         /* ── Vignette ── */
//         .map-root::after {
//           content: '';
//           position: fixed;
//           inset: 0;
//           background: radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.7) 100%);
//           pointer-events: none;
//           z-index: 0;
//         }

//         /* ── Particles ── */
//         .ember {
//           position: fixed;
//           border-radius: 50%;
//           background: var(--ember);
//           box-shadow: 0 0 6px var(--ember), 0 0 12px rgba(255,102,0,0.5);
//           pointer-events: none;
//           z-index: 1;
//           animation: emberRise var(--e-dur) var(--e-delay) ease-in infinite;
//         }
//         @keyframes emberRise {
//           0%   { transform: translate(0, 0) scale(1); opacity: 0; }
//           15%  { opacity: 0.8; }
//           80%  { opacity: 0.4; }
//           100% { transform: translate(var(--e-tx), -80vh) scale(0.3); opacity: 0; }
//         }

//         /* ── Page wrapper ── */
//         .page-inner {
//           position: relative;
//           z-index: 2;
//           max-width: 1300px;
//           margin: 0 auto;
//           padding: 3rem 2rem 5rem;
//         }

//         /* ── Header ── */
//         .map-header {
//           text-align: center;
//           margin-bottom: 3.5rem;
//           opacity: 0;
//           transform: translateY(-20px);
//           transition: opacity 0.9s ease, transform 0.9s ease;
//         }
//         .map-header.visible { opacity: 1; transform: translateY(0); }

//         .header-eyebrow {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.72rem;
//           letter-spacing: 0.4em;
//           color: rgba(204,0,0,0.7);
//           text-transform: uppercase;
//           margin-bottom: 0.75rem;
//         }

//         .map-title {
//           font-family: 'Cinzel Decorative', serif;
//           font-size: clamp(2rem, 5vw, 3.8rem);
//           color: var(--blood-bright);
//           text-shadow:
//             0 0 30px rgba(204,0,0,0.6),
//             0 0 80px rgba(139,0,0,0.3),
//             0 4px 8px rgba(0,0,0,0.8);
//           letter-spacing: 0.04em;
//           line-height: 1.1;
//           margin-bottom: 0.5rem;
//         }

//         .map-subtitle {
//           font-family: 'Creepster', cursive;
//           font-size: 1.1rem;
//           color: rgba(200,170,150,0.6);
//           letter-spacing: 0.2em;
//         }

//         /* ── Stats bar ── */
//         .stats-bar {
//           display: flex;
//           justify-content: center;
//           gap: 2.5rem;
//           margin-bottom: 3rem;
//           flex-wrap: wrap;
//           opacity: 0;
//           transform: translateY(10px);
//           transition: opacity 0.8s ease 0.3s, transform 0.8s ease 0.3s;
//         }
//         .stats-bar.visible { opacity: 1; transform: translateY(0); }

//         .stat-pill {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 0.2rem;
//           background: rgba(139,0,0,0.12);
//           border: 1px solid rgba(139,0,0,0.3);
//           padding: 0.7rem 1.8rem;
//           clip-path: polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%);
//         }
//         .stat-value {
//           font-family: 'Cinzel Decorative', serif;
//           font-size: 1.5rem;
//           color: var(--blood-bright);
//           text-shadow: 0 0 10px rgba(204,0,0,0.5);
//         }
//         .stat-label {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.62rem;
//           letter-spacing: 0.3em;
//           color: rgba(200,150,150,0.6);
//           text-transform: uppercase;
//         }

//         /* ── Decorative divider ── */
//         .divider {
//           display: flex;
//           align-items: center;
//           gap: 1rem;
//           margin-bottom: 3rem;
//           opacity: 0;
//           transition: opacity 0.8s ease 0.5s;
//         }
//         .divider.visible { opacity: 1; }
//         .divider-line {
//           flex: 1;
//           height: 1px;
//           background: linear-gradient(90deg, transparent, rgba(139,0,0,0.5), transparent);
//         }
//         .divider-rune {
//           font-family: 'Creepster', cursive;
//           font-size: 1.3rem;
//           color: rgba(204,0,0,0.5);
//         }

//         /* ── Grid ── */
//         .stages-grid {
//           display: grid;
//           grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
//           gap: 1.8rem;
//         }

//         /* ── Stage card ── */
//         .stage-card {
//           position: relative;
//           background: linear-gradient(145deg, var(--card-from), var(--card-to));
//           border: 1px solid var(--card-border);
//           padding: 1.8rem;
//           cursor: pointer;
//           transition: transform 0.3s ease, box-shadow 0.3s ease;
//           opacity: 0;
//           transform: translateY(24px) scale(0.97);
//           clip-path: polygon(0 0, calc(100% - 16px) 0, 100% 16px, 100% 100%, 16px 100%, 0 calc(100% - 16px));
//           animation: cardReveal 0.6s ease forwards;
//           animation-delay: var(--card-delay);
//         }

//         .stage-card:hover:not(.locked) {
//           transform: translateY(-4px) scale(1.02);
//           box-shadow: 0 0 30px var(--card-glow), 0 12px 40px rgba(0,0,0,0.6);
//           z-index: 10;
//         }

//         .stage-card.locked {
//           filter: grayscale(0.6) brightness(0.55);
//           cursor: not-allowed;
//         }
//         .stage-card.locked::after {
//           content: '🔒';
//           position: absolute;
//           inset: 0;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 2.5rem;
//           background: rgba(0,0,0,0.45);
//           backdrop-filter: blur(1px);
//         }

//         .stage-card.completed::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background: linear-gradient(135deg, rgba(0,200,60,0.06) 0%, transparent 60%);
//           pointer-events: none;
//         }

//         @keyframes cardReveal {
//           to { opacity: 1; transform: translateY(0) scale(1); }
//         }

//         /* Corner accent */
//         .card-corner {
//           position: absolute;
//           top: 0; right: 0;
//           width: 16px; height: 16px;
//           border-top: 2px solid var(--card-glow);
//           border-right: 2px solid var(--card-glow);
//           opacity: 0.7;
//         }
//         .card-corner-bl {
//           bottom: 0; left: 0;
//           top: auto; right: auto;
//           border-top: none; border-right: none;
//           border-bottom: 2px solid var(--card-glow);
//           border-left: 2px solid var(--card-glow);
//         }

//         .card-header {
//           display: flex;
//           align-items: flex-start;
//           gap: 1rem;
//           margin-bottom: 1rem;
//         }

//         .card-icon {
//           font-size: 2.2rem;
//           line-height: 1;
//           filter: drop-shadow(0 0 8px var(--card-glow));
//           flex-shrink: 0;
//         }

//         .card-meta { flex: 1; }

//         .card-title {
//           font-family: 'Cinzel Decorative', serif;
//           font-size: 1rem;
//           color: var(--bone);
//           margin-bottom: 0.3rem;
//           line-height: 1.3;
//           text-shadow: 0 2px 4px rgba(0,0,0,0.7);
//         }

//         .card-diff {
//           display: inline-block;
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.62rem;
//           letter-spacing: 0.25em;
//           text-transform: uppercase;
//           padding: 0.15rem 0.6rem;
//           background: var(--diff-bg);
//           color: var(--diff-color);
//           border: 1px solid var(--diff-color);
//           clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
//         }

//         .card-desc {
//           font-size: 0.82rem;
//           color: rgba(220,200,180,0.65);
//           line-height: 1.6;
//           margin-bottom: 1.2rem;
//           font-weight: 300;
//         }

//         .card-footer {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//         }

//         .xp-badge {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.75rem;
//           color: var(--card-glow);
//           text-shadow: 0 0 8px var(--card-glow);
//           letter-spacing: 0.1em;
//         }

//         .completed-badge {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.62rem;
//           color: #00ff88;
//           text-shadow: 0 0 6px rgba(0,255,136,0.6);
//           letter-spacing: 0.2em;
//           border: 1px solid rgba(0,255,136,0.4);
//           padding: 0.15rem 0.6rem;
//         }

//         .enter-btn {
//           background: transparent;
//           border: 1px solid var(--card-glow);
//           color: var(--card-glow);
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.7rem;
//           letter-spacing: 0.2em;
//           text-transform: uppercase;
//           padding: 0.4rem 1rem;
//           cursor: pointer;
//           transition: background 0.2s, box-shadow 0.2s, color 0.2s;
//           clip-path: polygon(4px 0%, 100% 0%, calc(100% - 4px) 100%, 0% 100%);
//         }
//         .enter-btn:hover {
//           background: var(--card-glow);
//           color: #000;
//           box-shadow: 0 0 16px var(--card-glow);
//         }

//         /* ── Scan line on hover ── */
//         .scan-line {
//           position: absolute;
//           left: 0; right: 0;
//           height: 2px;
//           background: linear-gradient(90deg, transparent, var(--card-glow), transparent);
//           opacity: 0;
//           top: 0;
//           transition: opacity 0.2s;
//           pointer-events: none;
//           animation: scanDown 1.5s linear infinite;
//         }
//         .stage-card:hover:not(.locked) .scan-line { opacity: 0.4; }

//         @keyframes scanDown {
//           0%   { top: 0%; }
//           100% { top: 100%; }
//         }

//         /* ── Loading state ── */
//         .loading-wrap {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           min-height: 60vh;
//           gap: 1.5rem;
//         }
//         .loading-skull {
//           font-size: 3rem;
//           animation: skullBob 1.2s ease-in-out infinite;
//           filter: drop-shadow(0 0 12px var(--blood-bright));
//         }
//         @keyframes skullBob {
//           0%,100% { transform: translateY(0); }
//           50% { transform: translateY(-10px); }
//         }
//         .loading-text {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.8rem;
//           letter-spacing: 0.35em;
//           color: rgba(204,0,0,0.7);
//           text-transform: uppercase;
//           animation: textPulse 1.5s ease-in-out infinite;
//         }
//         @keyframes textPulse {
//           0%,100% { opacity: 0.5; }
//           50% { opacity: 1; }
//         }

//         /* ── Torch top decoration ── */
//         .torch-row {
//           display: flex;
//           justify-content: space-between;
//           align-items: center;
//           margin-bottom: 0.5rem;
//           padding: 0 0.5rem;
//         }
//         .torch {
//           font-size: 1.6rem;
//           transition: filter 0.1s;
//         }

//         /* ── Bottom lore ── */
//         .lore-strip {
//           margin-top: 4rem;
//           text-align: center;
//           font-family: 'Creepster', cursive;
//           font-size: 0.95rem;
//           color: rgba(139,0,0,0.4);
//           letter-spacing: 0.15em;
//           border-top: 1px solid rgba(139,0,0,0.15);
//           padding-top: 1.5rem;
//         }

//         @media (max-width: 640px) {
//           .stages-grid { grid-template-columns: 1fr; }
//           .map-title { font-size: 1.8rem; }
//           .stats-bar { gap: 1rem; }
//         }
//       `}</style>

//       <div className="map-root">

//         {/* Floating embers */}
//         {particles.map((p) => (
//           <div
//             key={p.id}
//             className="ember"
//             style={{
//               left: `${p.x}%`,
//               bottom: 0,
//               width: p.size,
//               height: p.size,
//               "--e-dur": `${p.dur}s`,
//               "--e-delay": `${p.delay}s`,
//               "--e-tx": `${p.tx}px`,
//             }}
//           />
//         ))}

//         <div className="page-inner" ref={containerRef}>

//           {/* Torch row */}
//           <div className="torch-row">
//             <span className="torch" style={{ filter: `brightness(${torchFlicker}) drop-shadow(0 0 10px orange)` }}>🔦</span>
//             <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: "0.65rem", color: "rgba(204,0,0,0.4)", letterSpacing: "0.3em" }}>
//               CODECRYPT // HORROR MAP
//             </span>
//             <span className="torch" style={{ filter: `brightness(${1.3 - torchFlicker * 0.3}) drop-shadow(0 0 10px orange)` }}>🔦</span>
//           </div>

//           {/* Header */}
//           <header className={`map-header ${revealed ? "visible" : ""}`}>
//             <div className="header-eyebrow">⛧ enter the cursed territory ⛧</div>
//             <h1 className="map-title">The Haunted<br />Learning Map</h1>
//             <p className="map-subtitle">Choose your fate. Code or be consumed.</p>
//           </header>

//           {/* Stats bar */}
//           {!loading && (
//             <div className={`stats-bar ${revealed ? "visible" : ""}`}>
//               <div className="stat-pill">
//                 <span className="stat-value">{completedCount}</span>
//                 <span className="stat-label">Stages Conquered</span>
//               </div>
//               <div className="stat-pill">
//                 <span className="stat-value">{totalXP}</span>
//                 <span className="stat-label">Souls Collected (XP)</span>
//               </div>
//               <div className="stat-pill">
//                 <span className="stat-value">{stages.length - completedCount}</span>
//                 <span className="stat-label">Horrors Remaining</span>
//               </div>
//             </div>
//           )}

//           {/* Divider */}
//           <div className={`divider ${revealed ? "visible" : ""}`}>
//             <div className="divider-line" />
//             <span className="divider-rune">☠ ⚰ ☠</span>
//             <div className="divider-line" />
//           </div>

//           {/* Loading */}
//           {loading && (
//             <div className="loading-wrap">
//               <div className="loading-skull">💀</div>
//               <div className="loading-text">Summoning the cursed stages...</div>
//             </div>
//           )}

//           {/* Grid */}
//           {!loading && (
//             <div className="stages-grid">
//               {stages.map((stage, i) => {
//                 const cat = CATEGORY_COLORS[stage.category] || CATEGORY_COLORS.html;
//                 const diff = DIFF_BADGE[stage.difficulty] || DIFF_BADGE["Initiate"];
//                 const isLocked = stage.unlocked === false;
//                 const isDone = stage.completed === true;

//                 return (
//                   <div
//                     key={stage._id || stage.id}
//                     className={`stage-card ${isLocked ? "locked" : ""} ${isDone ? "completed" : ""}`}
//                     style={{
//                       "--card-from": cat.from,
//                       "--card-to": cat.to,
//                       "--card-border": cat.border,
//                       "--card-glow": cat.glow,
//                       "--diff-bg": diff.bg,
//                       "--diff-color": diff.color,
//                       "--card-delay": `${0.6 + i * 0.1}s`,
//                     }}
//                     onMouseEnter={() => setHoveredId(stage._id)}
//                     onMouseLeave={() => setHoveredId(null)}
//                     onClick={() => {
//                       if (!isLocked) window.location.href = `/stages/${stage.category}/${stage._id}`;
//                     }}
//                   >
//                     {/* Scan line effect */}
//                     <div className="scan-line" />

//                     {/* Corner accents */}
//                     <div className="card-corner" style={{ borderColor: cat.glow }} />
//                     <div className="card-corner card-corner-bl" style={{ borderColor: cat.glow }} />

//                     <div className="card-header">
//                       <div className="card-icon">{stage.icon || "🕯"}</div>
//                       <div className="card-meta">
//                         <div className="card-title">{stage.title}</div>
//                         <div className="card-diff">{stage.difficulty || "Initiate"}</div>
//                       </div>
//                     </div>

//                     <p className="card-desc">{stage.description}</p>

//                     <div className="card-footer">
//                       <span className="xp-badge">+{stage.xp || 50} XP</span>
//                       {isDone
//                         ? <span className="completed-badge">✓ CONQUERED</span>
//                         : !isLocked && <button className="enter-btn">Enter →</button>
//                       }
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {/* Bottom lore */}
//           <div className="lore-strip">
//             ⚰ Only the worthy shall master all six chambers ⚰
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }



// import { useEffect, useState, useRef } from "react";
// import { useRouter } from "next/router";


// const STAGES = [
//   {
//     _id: "1", title: "Haunted HTML Gate",
//     desc: "The gatekeeper demands proof of HTML mastery. Forge a button to breach the cursed entrance.",
//     icon: "🕯️", category: "html", difficulty: "Initiate", xp: 50, unlocked: true, completed: true,
//   },
//   {
//     _id: "2", title: "CSS Shadow Room",
//     desc: "Style the cursed artefacts with Tailwind spells. The shadows bend to those who know the incantations.",
//     icon: "🧪", category: "css", difficulty: "Apprentice", xp: 80, unlocked: true, completed: false,
//   },
//   {
//     _id: "3", title: "React Awakening",
//     desc: "Breathe life into dead components. The React Necromancer watches your every keystroke.",
//     icon: "⚛️", category: "react", difficulty: "Practitioner", xp: 120, unlocked: false, completed: false,
//   },
//   {
//     _id: "4", title: "Backend Crypt",
//     desc: "Descend into server-side darkness. Node.js demons await those who dare enter.",
//     icon: "🌐", category: "backend", difficulty: "Warlock", xp: 200, unlocked: false, completed: false,
//   },
//   {
//     _id: "5", title: "CSS Demon Boss",
//     desc: "A responsive grid layout stands between you and freedom. Defeat the demon or be consumed.",
//     icon: "👹", category: "boss", difficulty: "Boss", xp: 350, unlocked: false, completed: false,
//   },
//   {
//     _id: "6", title: "The Final Ritual",
//     desc: "Combine all cursed knowledge in the ultimate full-stack sacrifice. None have survived.",
//     icon: "☠️", category: "fullstack", difficulty: "Lich Lord", xp: 500, unlocked: false, completed: false,
//   },
// ];

// const CAT = {
//   html:      { main: "#b91c1c", glow: "#ef4444", dark: "#450a0a" },
//   css:       { main: "#7e22ce", glow: "#a855f7", dark: "#2e1065" },
//   react:     { main: "#0369a1", glow: "#38bdf8", dark: "#082f49" },
//   backend:   { main: "#15803d", glow: "#4ade80", dark: "#052e16" },
//   boss:      { main: "#be185d", glow: "#f472b6", dark: "#500724" },
//   fullstack: { main: "#92400e", glow: "#fbbf24", dark: "#1c0a00" },
// };

// // Zigzag: alternating x positions (in px within 360px wide SVG)
// const ZIGZAG_X = [180, 90, 270, 90, 270, 180];
// const NODE_SPACING = 150;
// const NODE_SIZE = 68;

// export default function HorrorMap() {
  
//   const router = useRouter();
//   const [selected, setSelected] = useState(null);
//   const [playing, setPlaying]   = useState(false);
//   const [revealed, setRevealed] = useState(false);
//   const audioRef = useRef(null);

//  useEffect(() => {
//   const startAudio = () => {
//     const a = audioRef.current;
//     if (!a) return;

//     a.volume = 0.6;

//     a.play()
//       .then(() => {
//         console.log("AUTO PLAY STARTED ✅");
//         setPlaying(true);
//       })
//       .catch(() => {});

//     window.removeEventListener("click", startAudio);
//   };

//   window.addEventListener("click", startAudio);
// }, []);

// const toggleAudio = () => {
//   const a = audioRef.current;
//   if (!a) return;

//   if (playing) {
//     a.pause();
//     setPlaying(false);
//   } else {
//     a.volume = 0.6;

//     a.play()
//       .then(() => {
//         console.log("PLAYED ✅");
//         setPlaying(true);
//       })
//       .catch((err) => {
//         console.error("PLAY FAILED ❌", err);
//       });
//   }
// };

//   const nodeY  = (i) => 80 + i * NODE_SPACING;
//   const nodeX  = (i) => ZIGZAG_X[i] ?? 180;
//   const totalH = STAGES.length * NODE_SPACING + 120;

//   const svgPath = STAGES.map((_, i) => {
//     const x = nodeX(i), y = nodeY(i);
//     if (i === 0) return `M ${x} ${y}`;
//     const px = nodeX(i - 1), py = nodeY(i - 1);
//     const mid = (py + y) / 2;
//     return `C ${px} ${mid}, ${x} ${mid}, ${x} ${y}`;
//   }).join(" ");

//   const completedCount = STAGES.filter(s => s.completed).length;
//   const totalXP = STAGES.filter(s => s.completed).reduce((a, s) => a + s.xp, 0);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700&family=Share+Tech+Mono&family=Raleway:wght@300;400;600&display=swap');

//         *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
//         body { background: #06000e; }

//         .root {
//           min-height: 100vh;
//           background: #06000e;
//           font-family: 'Raleway', sans-serif;
//           color: #e8ddc8;
//           position: relative;
//           overflow-x: hidden;
//         }

//         /* subtle stone grid */
//         .root::before {
//           content: '';
//           position: fixed; inset: 0; z-index: 0; pointer-events: none;
//           background-image:
//             repeating-linear-gradient(90deg, transparent 0px, transparent 59px, rgba(255,255,255,0.012) 59px, rgba(255,255,255,0.012) 60px),
//             repeating-linear-gradient(0deg,  transparent 0px, transparent 59px, rgba(255,255,255,0.007) 59px, rgba(255,255,255,0.007) 60px);
//         }
//         /* vignette */
//         .root::after {
//           content: '';
//           position: fixed; inset: 0; z-index: 0; pointer-events: none;
//           background: radial-gradient(ellipse at 50% 40%, transparent 30%, rgba(0,0,0,0.78) 100%);
//         }

//         /* ─── TOP BAR ─── */
//         .top-bar {
//           position: sticky; top: 0; z-index: 50;
//           display: flex; align-items: center; justify-content: space-between;
//           padding: 0.7rem 1.4rem;
//           background: rgba(6,0,14,0.93);
//           border-bottom: 1px solid rgba(139,0,0,0.2);
//           backdrop-filter: blur(10px);
//         }
//         .bar-title {
//           font-family: 'Cinzel Decorative', serif;
//           font-size: clamp(0.8rem, 2.5vw, 1.1rem);
//           color: #b91c1c;
//           text-shadow: 0 0 14px rgba(185,28,28,0.45);
//           letter-spacing: 0.05em;
//         }
//         .bar-right { display: flex; align-items: center; gap: 1.1rem; }
//         .bar-stat {
//           display: flex; flex-direction: column; align-items: center; gap: 1px;
//         }
//         .bar-val {
//           font-family: 'Cinzel Decorative', serif;
//           font-size: 0.95rem; color: #b91c1c;
//           text-shadow: 0 0 8px rgba(185,28,28,0.4);
//         }
//         .bar-lbl {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.48rem; letter-spacing: 0.25em;
//           color: rgba(200,140,140,0.45); text-transform: uppercase;
//         }
//         .bar-sep { width: 1px; height: 26px; background: rgba(139,0,0,0.22); }

//         /* progress strip */
//         .prog-strip {
//           position: sticky; top: 49px; z-index: 49;
//           height: 3px; background: rgba(139,0,0,0.1);
//         }
//         .prog-fill {
//           height: 100%;
//           background: linear-gradient(90deg, #7f1d1d, #b91c1c);
//           box-shadow: 0 0 8px rgba(185,28,28,0.45);
//           transition: width 0.9s ease 0.5s;
//         }

//         /* ─── MAP AREA ─── */
//         .map-area {
//           position: relative; z-index: 2;
//           display: flex; flex-direction: column; align-items: center;
//           padding-bottom: 5rem;
//         }

//         /* heading */
//         .heading {
//           text-align: center;
//           padding: 2.2rem 1rem 0.5rem;
//           opacity: 0; transform: translateY(-12px);
//           transition: opacity 0.8s ease, transform 0.8s ease;
//         }
//         .heading.vis { opacity: 1; transform: translateY(0); }
//         .heading-eye {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.58rem; letter-spacing: 0.38em;
//           color: rgba(185,28,28,0.45); text-transform: uppercase;
//           margin-bottom: 0.4rem;
//         }
//         .heading-title {
//           font-family: 'Cinzel Decorative', serif;
//           font-size: clamp(1.3rem, 4vw, 2.2rem);
//           color: #b91c1c;
//           text-shadow: 0 0 28px rgba(185,28,28,0.4), 0 0 55px rgba(139,0,0,0.18);
//           line-height: 1.2;
//         }
//         .heading-sub {
//           font-size: 0.75rem; color: rgba(200,170,150,0.38);
//           letter-spacing: 0.14em; margin-top: 0.3rem;
//         }

//         /* path container */
//         .path-wrap {
//           position: relative;
//           width: 360px; max-width: 94vw;
//         }

//         /* ─── NODE ─── */
//         .node-outer {
//           position: absolute;
//           transform: translate(-50%, -50%);
//           display: flex; flex-direction: column; align-items: center; gap: 7px;
//           opacity: 0;
//           animation: nodeIn 0.4s ease forwards;
//         }
//         @keyframes nodeIn {
//           from { opacity: 0; transform: translate(-50%, -50%) scale(0.55); }
//           to   { opacity: 1; transform: translate(-50%, -50%) scale(1); }
//         }

//         .node-btn {
//           width: ${NODE_SIZE}px; height: ${NODE_SIZE}px;
//           border-radius: 50%;
//           border: 3px solid;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 1.55rem;
//           cursor: pointer;
//           position: relative;
//           transition: transform 0.2s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease;
//           outline: none;
//           background: none;
//         }
//         .node-btn:not(.locked):hover { transform: scale(1.13); }
//         .node-btn.locked {
//           cursor: not-allowed;
//           filter: grayscale(1) brightness(0.32);
//         }

//         /* pulsing ring on current stage */
//         .pulse-ring {
//           position: absolute; inset: -9px;
//           border-radius: 50%; border: 2px solid;
//           animation: pulseRing 2.2s ease-in-out infinite;
//           pointer-events: none;
//         }
//         @keyframes pulseRing {
//           0%, 100% { opacity: 0.15; transform: scale(1); }
//           50%       { opacity: 0.42; transform: scale(1.1); }
//         }

//         /* done tick */
//         .done-tick {
//           position: absolute; bottom: -3px; right: -3px;
//           width: 20px; height: 20px; border-radius: 50%;
//           background: #052e16; border: 2px solid #4ade80;
//           display: flex; align-items: center; justify-content: center;
//           font-size: 0.6rem; color: #4ade80; font-weight: bold;
//           pointer-events: none;
//         }

//         .node-lbl {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.56rem; letter-spacing: 0.15em;
//           text-transform: uppercase; text-align: center;
//           max-width: 96px; line-height: 1.45;
//         }

//         /* path dash animation */
//         @keyframes dashScroll { to { stroke-dashoffset: -28; } }

//         /* ─── AUDIO BTN ─── */
//         .audio-btn {
//           position: fixed; bottom: 1.3rem; right: 1.3rem; z-index: 60;
//           width: 42px; height: 42px; border-radius: 50%;
//           background: rgba(6,0,14,0.9);
//           border: 1px solid rgba(139,0,0,0.38);
//           color: #b91c1c; font-size: 1.1rem;
//           cursor: pointer;
//           display: flex; align-items: center; justify-content: center;
//           transition: border-color 0.2s, box-shadow 0.2s;
//           backdrop-filter: blur(8px);
//         }
//         .audio-btn:hover {
//           border-color: rgba(185,28,28,0.65);
//           box-shadow: 0 0 12px rgba(185,28,28,0.28);
//         }
//         .audio-btn.on {
//           border-color: rgba(185,28,28,0.65);
//           animation: audioPulse 2.5s ease-in-out infinite;
//         }
//         @keyframes audioPulse {
//           0%, 100% { box-shadow: 0 0 10px rgba(185,28,28,0.28); }
//           50%       { box-shadow: 0 0 22px rgba(185,28,28,0.5); }
//         }

//         /* ─── MODAL ─── */
//         .overlay {
//           position: fixed; inset: 0; z-index: 80;
//           background: rgba(0,0,0,0.84);
//           backdrop-filter: blur(5px);
//           display: flex; align-items: center; justify-content: center;
//           padding: 1rem;
//           animation: fadeIn 0.17s ease;
//         }
//         @keyframes fadeIn { from { opacity: 0; } }

//         .modal {
//           width: 100%; max-width: 330px;
//           background: #09000f;
//           border-radius: 10px;
//           border-top: 3px solid;
//           padding: 1.7rem 1.5rem;
//           position: relative;
//           animation: slideUp 0.27s cubic-bezier(0.34,1.56,0.64,1);
//         }
//         @keyframes slideUp {
//           from { transform: translateY(24px) scale(0.96); opacity: 0; }
//         }
//         .m-close {
//           position: absolute; top: 0.85rem; right: 0.95rem;
//           background: none; border: none;
//           color: rgba(200,150,150,0.38); font-size: 0.95rem;
//           cursor: pointer; transition: color 0.15s;
//         }
//         .m-close:hover { color: #b91c1c; }

//         .m-icon { font-size: 2.6rem; text-align: center; margin-bottom: 0.8rem; }
//         .m-title {
//           font-family: 'Cinzel Decorative', serif;
//           font-size: 0.95rem; color: #e8ddc8;
//           text-align: center; line-height: 1.3; margin-bottom: 0.3rem;
//         }
//         .m-diff {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.58rem; letter-spacing: 0.28em;
//           text-align: center; text-transform: uppercase; margin-bottom: 0.85rem;
//         }
//         .m-desc {
//           font-size: 0.8rem; color: rgba(220,200,180,0.55);
//           line-height: 1.65; text-align: center; margin-bottom: 1.1rem;
//         }
//         .m-xp {
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.68rem; text-align: center;
//           letter-spacing: 0.12em; margin-bottom: 1rem;
//         }
//         .m-btn {
//           width: 100%; padding: 0.62rem;
//           border: none; border-radius: 6px;
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
//           cursor: pointer;
//           transition: filter 0.18s, transform 0.14s;
//         }
//         .m-btn:hover { filter: brightness(1.2); transform: scale(1.02); }
//         .m-btn:active { transform: scale(0.98); }
//         .m-done {
//           text-align: center; margin-top: 0.65rem;
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.58rem; letter-spacing: 0.2em; color: #4ade80;
//         }

//         /* lore */
//         .lore {
//           text-align: center; padding: 0 1rem 2rem;
//           font-family: 'Share Tech Mono', monospace;
//           font-size: 0.65rem; letter-spacing: 0.13em;
//           color: rgba(139,0,0,0.28);
//         }
//       `}</style>

//       <div className="root">

//         {/* ── Audio (drop your clip src here) ── */}
//         <audio ref={audioRef} loop preload="auto">
//   <source src="/audio/horror-theme.mp3" type="audio/mpeg" />
// </audio>

//         {/* TOP BAR */}
//         <div className="top-bar">
//           <div className="bar-title">☠ CodeCrypt</div>
//           <div className="bar-right">
//             <div className="bar-stat">
//               <span className="bar-val">{completedCount}/{STAGES.length}</span>
//               <span className="bar-lbl">Stages</span>
//             </div>
//             <div className="bar-sep" />
//             <div className="bar-stat">
//               <span className="bar-val">{totalXP}</span>
//               <span className="bar-lbl">XP</span>
//             </div>
//           </div>
//         </div>

//         {/* PROGRESS STRIP */}
//         <div className="prog-strip">
//           <div className="prog-fill" style={{ width: `${(completedCount / STAGES.length) * 100}%` }} />
//         </div>

//         {/* MAP */}
//         <div className="map-area">

//           <div className={`heading ${revealed ? "vis" : ""}`}>
//             <div className="heading-eye">⛧ enter the cursed territory ⛧</div>
//             <h1 className="heading-title">The Haunted<br />Learning Map</h1>
//             <p className="heading-sub">Code or be consumed.</p>
//           </div>

//           <div className="path-wrap" style={{ height: totalH }}>

//             {/* SVG PATH */}
//             <svg
//               viewBox={`0 0 360 ${totalH}`}
//               width="360"
//               style={{ position: "absolute", inset: 0, width: "100%", height: totalH, pointerEvents: "none" }}
//             >
//               <defs>
//                 <filter id="fg">
//                   <feGaussianBlur stdDeviation="2.5" result="b" />
//                   <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
//                 </filter>
//               </defs>
//               {/* dark shadow */}
//               <path d={svgPath} fill="none" stroke="rgba(0,0,0,0.6)" strokeWidth="6" strokeLinecap="round" />
//               {/* glow */}
//               <path d={svgPath} fill="none" stroke="rgba(139,0,0,0.15)" strokeWidth="9" filter="url(#fg)" strokeLinecap="round" />
//               {/* dim solid base */}
//               <path d={svgPath} fill="none" stroke="rgba(80,0,0,0.32)" strokeWidth="2.2" strokeLinecap="round" />
//               {/* animated dashes */}
//               <path d={svgPath} fill="none"
//                 stroke="rgba(185,28,28,0.52)" strokeWidth="2.4"
//                 strokeDasharray="9 7" strokeLinecap="round"
//                 style={{ animation: "dashScroll 1.6s linear infinite" }} />
//             </svg>

//             {/* NODES */}
//             {STAGES.map((stage, i) => {
//               const col     = CAT[stage.category] || CAT.html;
//               const locked  = !stage.unlocked;
//               const done    = stage.completed;
//               const sx      = nodeX(i);
//               const sy      = nodeY(i);
//               const leftPct = (sx / 360) * 100;

//               return (
//                 <div
//                   key={stage._id}
//                   className="node-outer"
//                   style={{
//                     left: `${leftPct}%`,
//                     top: sy,
//                     animationDelay: `${0.2 + i * 0.13}s`,
//                   }}
//                 >
//                   <button
//                     className={`node-btn ${locked ? "locked" : ""}`}
//                     style={{
//                       background: locked
//                         ? "radial-gradient(circle, #191919 0%, #0d0d0d 100%)"
//                         : `radial-gradient(circle at 38% 38%, ${col.dark} 0%, #06000e 100%)`,
//                       borderColor: done ? "#4ade80" : locked ? "#252525" : col.main,
//                       boxShadow: locked ? "none"
//                         : done
//                           ? `0 0 0 3px rgba(74,222,128,0.12), 0 0 18px rgba(74,222,128,0.16), 0 4px 14px rgba(0,0,0,0.65)`
//                           : `0 0 0 3px ${col.main}1a, 0 0 16px ${col.main}2a, 0 4px 14px rgba(0,0,0,0.65)`,
//                     }}
//                     onClick={() => !locked && setSelected(stage)}
//                   >
//                     <span style={{ filter: locked ? "none" : `drop-shadow(0 0 4px ${col.glow})` }}>
//                       {locked ? "🔒" : stage.icon}
//                     </span>

//                     {/* pulse ring for current active node */}
//                     {!locked && !done && (
//                       <div className="pulse-ring" style={{ borderColor: col.main }} />
//                     )}

//                     {/* done badge */}
//                     {done && <div className="done-tick">✓</div>}
//                   </button>

//                   <div className="node-lbl" style={{
//                     color: locked
//                       ? "rgba(255,255,255,0.16)"
//                       : done ? "rgba(74,222,128,0.65)"
//                       : `${col.glow}aa`,
//                   }}>
//                     {stage.title}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>

//           <div className="lore">⚰ Only the worthy shall master all six chambers ⚰</div>
//         </div>

//         {/* AUDIO BUTTON */}
//         <button
//           className={`audio-btn ${playing ? "on" : ""}`}
//           onClick={toggleAudio}
//           title={playing ? "Pause" : "Play horror music"}
//         >
//           {playing ? "🔊" : "🔇"}
//         </button>

//         {/* MODAL */}
//         {selected && (() => {
//           const col = CAT[selected.category] || CAT.html;
//           return (
//             <div className="overlay" onClick={() => setSelected(null)}>
//               <div
//                 className="modal"
//                 style={{ borderColor: col.main, boxShadow: `0 0 28px ${col.main}1a` }}
//                 onClick={e => e.stopPropagation()}
//               >
//                 <button className="m-close" onClick={() => setSelected(null)}>✕</button>
//                 <div className="m-icon" style={{ filter: `drop-shadow(0 0 9px ${col.glow})` }}>{selected.icon}</div>
//                 <div className="m-title">{selected.title}</div>
//                 <div className="m-diff" style={{ color: col.glow }}>{selected.difficulty}</div>
//                 <p className="m-desc">{selected.desc}</p>
//                 <div className="m-xp" style={{ color: col.glow }}>+{selected.xp} XP souls on completion</div>
//                 <button
//                   className="m-btn"
//                   style={{
//                     background: `linear-gradient(135deg, ${col.dark}, ${col.main}88)`,
//                     color: col.glow,
//                     border: `1px solid ${col.main}44`,
//                   }}
//                   onClick={() => router.push(`/stages/${selected.category}/${selected._id}`)}
//                 >
//                   Enter the Chamber →
//                 </button>
//                 {selected.completed && <div className="m-done">✓ Already conquered</div>}
//               </div>
//             </div>
//           );
//         })()}
//       </div>
//     </>
//   );
// }




import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";

const STAGES = [
  {
    _id: "1", title: "Haunted HTML Gate",
    desc: "The gatekeeper demands proof of HTML mastery. Forge a button to breach the cursed entrance.",
    icon: "🕯️", category: "html", difficulty: "Initiate", xp: 50, unlocked: true, completed: true,
  },
  {
    _id: "2", title: "CSS Shadow Room",
    desc: "Style the cursed artefacts with Tailwind spells. The shadows bend to those who know the incantations.",
    icon: "🧪", category: "css", difficulty: "Apprentice", xp: 80, unlocked: true, completed: false,
  },
  {
    _id: "3", title: "React Awakening",
    desc: "Breathe life into dead components. The React Necromancer watches your every keystroke.",
    icon: "⚛️", category: "react", difficulty: "Practitioner", xp: 120, unlocked: false, completed: false,
  },
  {
    _id: "4", title: "Backend Crypt",
    desc: "Descend into server-side darkness. Node.js demons await those who dare enter.",
    icon: "🌐", category: "backend", difficulty: "Warlock", xp: 200, unlocked: false, completed: false,
  },
  {
    _id: "5", title: "CSS Demon Boss",
    desc: "A responsive grid layout stands between you and freedom. Defeat the demon or be consumed.",
    icon: "👹", category: "boss", difficulty: "Boss", xp: 350, unlocked: false, completed: false,
  },
  {
    _id: "6", title: "The Final Ritual",
    desc: "Combine all cursed knowledge in the ultimate full-stack sacrifice. None have survived.",
    icon: "☠️", category: "fullstack", difficulty: "Lich Lord", xp: 500, unlocked: false, completed: false,
  },
];

const CAT = {
  html:      { main: "#c0392b", glow: "#ff4d4d", dark: "#3d0000", text: "#ff8080" },
  css:       { main: "#8e24aa", glow: "#cc44ff", dark: "#280040", text: "#d966ff" },
  react:     { main: "#0277bd", glow: "#29b6f6", dark: "#001a33", text: "#64d8ff" },
  backend:   { main: "#2e7d32", glow: "#66ff88", dark: "#002200", text: "#66ff88" },
  boss:      { main: "#c2185b", glow: "#ff4da6", dark: "#3d0020", text: "#ff80c0" },
  fullstack: { main: "#e65100", glow: "#ffcc00", dark: "#2a1500", text: "#ffd740" },
};

const ZIGZAG_X = [180, 80, 280, 80, 280, 180];
const NODE_SPACING = 180;
const NODE_SIZE = 88;

export default function HorrorMap() {
  const router = useRouter();
  const [selected, setSelected] = useState(null);
  const [playing, setPlaying]   = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [flicker, setFlicker]   = useState(1);
  const audioRef = useRef(null);

  useEffect(() => {
    setTimeout(() => setRevealed(true), 120);

    // torch flicker
    const fid = setInterval(() => {
      setFlicker(0.7 + Math.random() * 0.55);
    }, 90 + Math.random() * 160);

    // auto-play on first interaction
    const startAudio = () => {
      const a = audioRef.current;
      if (!a) return;
      a.volume = 0.5;
      a.play().then(() => setPlaying(true)).catch(() => {});
      window.removeEventListener("click", startAudio);
    };
    window.addEventListener("click", startAudio);

    return () => {
      clearInterval(fid);
      window.removeEventListener("click", startAudio);
    };
  }, []);

  const toggleAudio = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.volume = 0.5; a.play().then(() => setPlaying(true)).catch(() => {}); }
  };

  const nodeY  = (i) => 100 + i * NODE_SPACING;
  const nodeX  = (i) => ZIGZAG_X[i] ?? 180;
  const totalH = STAGES.length * NODE_SPACING + 160;

  const svgPath = STAGES.map((_, i) => {
    const x = nodeX(i), y = nodeY(i);
    if (i === 0) return `M ${x} ${y}`;
    const px = nodeX(i - 1), py = nodeY(i - 1);
    const mid = (py + y) / 2;
    return `C ${px} ${mid}, ${x} ${mid}, ${x} ${y}`;
  }).join(" ");

  const completedCount = STAGES.filter(s => s.completed).length;
  const totalXP = STAGES.filter(s => s.completed).reduce((a, s) => a + s.xp, 0);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@400;700;900&family=MedievalSharp&family=Share+Tech+Mono&family=IM+Fell+English:ital@0;1&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        html { scroll-behavior: smooth; }
        body { background: #03000a; overflow-x: hidden; }

        :root {
          --blood:   #c0392b;
          --bone:    #e8d8b8;
          --void:    #03000a;
          --fog:     rgba(200,180,255,0.04);
        }

        .root {
          min-height: 100vh;
          background:
            radial-gradient(ellipse at 50% 0%,   rgba(100,0,0,0.35) 0%, transparent 55%),
            radial-gradient(ellipse at 20% 60%,  rgba(60,0,80,0.18) 0%, transparent 40%),
            radial-gradient(ellipse at 80% 40%,  rgba(80,0,0,0.22) 0%, transparent 40%),
            #03000a;
          font-family: 'IM Fell English', serif;
          color: var(--bone);
          position: relative;
          overflow-x: hidden;
        }

        /* stone tile pattern */
        .root::before {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background-image:
            repeating-linear-gradient(90deg,  transparent 0, transparent 79px, rgba(255,255,255,0.018) 79px, rgba(255,255,255,0.018) 80px),
            repeating-linear-gradient(180deg, transparent 0, transparent 79px, rgba(255,255,255,0.012) 79px, rgba(255,255,255,0.012) 80px);
        }

        /* heavy vignette */
        .root::after {
          content: '';
          position: fixed; inset: 0; z-index: 0; pointer-events: none;
          background: radial-gradient(ellipse at 50% 40%, transparent 25%, rgba(0,0,0,0.82) 100%);
        }

        /* ══ TOP BAR ══════════════════════════════ */
        .top-bar {
          position: sticky; top: 0; z-index: 50;
          display: flex; align-items: center; justify-content: space-between;
          padding: 1rem 2rem;
          background: rgba(3,0,10,0.95);
          border-bottom: 1px solid rgba(192,57,43,0.28);
          backdrop-filter: blur(14px);
        }

        .bar-brand {
          display: flex; align-items: center; gap: 0.7rem;
        }
        .bar-torch {
          font-size: 1.6rem;
          transition: filter 0.08s linear;
        }
        .bar-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(1rem, 2.8vw, 1.35rem);
          color: #c0392b;
          text-shadow: 0 0 18px rgba(192,57,43,0.6), 0 0 40px rgba(150,0,0,0.3);
          letter-spacing: 0.06em;
          font-weight: 700;
        }

        .bar-stats {
          display: flex; align-items: center; gap: 1.8rem;
        }
        .stat-block {
          display: flex; flex-direction: column; align-items: center; gap: 2px;
        }
        .stat-number {
          font-family: 'Cinzel Decorative', serif;
          font-size: 1.3rem;
          color: #c0392b;
          text-shadow: 0 0 12px rgba(192,57,43,0.55);
          font-weight: 700;
        }
        .stat-label {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.3em;
          color: rgba(220,160,140,0.5); text-transform: uppercase;
        }
        .stat-divider {
          width: 1px; height: 32px;
          background: linear-gradient(to bottom, transparent, rgba(192,57,43,0.3), transparent);
        }

        /* progress strip */
        .prog-strip {
          position: sticky; top: 62px; z-index: 49;
          height: 4px;
          background: rgba(192,57,43,0.08);
          border-bottom: 1px solid rgba(192,57,43,0.12);
        }
        .prog-fill {
          height: 100%;
          background: linear-gradient(90deg, #6b0000, #c0392b, #ff6b4a);
          box-shadow: 0 0 10px rgba(192,57,43,0.6), 0 0 20px rgba(192,57,43,0.3);
          transition: width 1.1s ease 0.6s;
        }

        /* ══ PAGE CONTENT ══════════════════════════ */
        .page {
          position: relative; z-index: 2;
          display: flex; flex-direction: column; align-items: center;
          padding-bottom: 6rem;
        }

        /* ══ HERO HEADING ══════════════════════════ */
        .hero {
          text-align: center;
          padding: 3.5rem 1.5rem 1rem;
          opacity: 0; transform: translateY(-18px);
          transition: opacity 1s ease, transform 1s ease;
        }
        .hero.vis { opacity: 1; transform: translateY(0); }

        .hero-eye {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.72rem; letter-spacing: 0.5em;
          color: rgba(192,57,43,0.5); text-transform: uppercase;
          margin-bottom: 0.8rem;
        }

        .hero-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: clamp(1.8rem, 5.5vw, 3.2rem);
          font-weight: 900;
          color: #c0392b;
          text-shadow:
            0 0 30px rgba(192,57,43,0.65),
            0 0 70px rgba(150,0,0,0.35),
            0 4px 8px rgba(0,0,0,0.9);
          line-height: 1.15;
          margin-bottom: 0.6rem;
        }

        .hero-sub {
          font-family: 'IM Fell English', serif;
          font-style: italic;
          font-size: clamp(0.95rem, 2vw, 1.15rem);
          color: rgba(210,185,160,0.45);
          letter-spacing: 0.1em;
        }

        /* divider */
        .hero-divider {
          display: flex; align-items: center; gap: 1.2rem;
          margin: 1.4rem auto;
          width: 360px; max-width: 92vw;
          opacity: 0; transition: opacity 0.8s ease 0.4s;
        }
        .hero-divider.vis { opacity: 1; }
        .div-line {
          flex: 1; height: 1px;
          background: linear-gradient(90deg, transparent, rgba(192,57,43,0.4), transparent);
        }
        .div-rune {
          font-family: 'Cinzel Decorative', serif;
          font-size: 1rem; color: rgba(192,57,43,0.45);
        }

        /* ══ PATH CONTAINER ════════════════════════ */
        .path-wrap {
          position: relative;
          width: 400px; max-width: 96vw;
        }

        /* ══ NODE ══════════════════════════════════ */
        .node-outer {
          position: absolute;
          transform: translate(-50%, -50%);
          display: flex; flex-direction: column; align-items: center;
          gap: 10px;
          opacity: 0;
          animation: nodeIn 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes nodeIn {
          from { opacity: 0; transform: translate(-50%, -50%) scale(0.4) rotate(-8deg); }
          to   { opacity: 1; transform: translate(-50%, -50%) scale(1) rotate(0deg); }
        }

        .node-btn {
          width: ${NODE_SIZE}px; height: ${NODE_SIZE}px;
          border-radius: 50%;
          border: 3px solid;
          display: flex; align-items: center; justify-content: center;
          font-size: 2rem;
          cursor: pointer;
          position: relative;
          transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.25s ease;
          outline: none;
          background: none;
        }
        .node-btn:not(.locked):hover {
          transform: scale(1.18) translateY(-3px);
        }
        .node-btn:not(.locked):active {
          transform: scale(0.95);
        }
        .node-btn.locked {
          cursor: not-allowed;
          filter: grayscale(1) brightness(0.28);
        }

        /* outer halo */
        .node-halo {
          position: absolute; inset: -14px;
          border-radius: 50%;
          border: 1px solid;
          animation: haloBreath 3s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes haloBreath {
          0%, 100% { opacity: 0.08; transform: scale(1); }
          50%       { opacity: 0.28; transform: scale(1.06); }
        }

        /* inner pulse ring */
        .node-ring {
          position: absolute; inset: -10px;
          border-radius: 50%; border: 2px solid;
          animation: ringPulse 2s ease-in-out infinite;
          pointer-events: none;
        }
        @keyframes ringPulse {
          0%, 100% { opacity: 0.2; transform: scale(1); }
          50%       { opacity: 0.55; transform: scale(1.1); }
        }

        /* done check */
        .done-badge {
          position: absolute; bottom: -4px; right: -4px;
          width: 26px; height: 26px; border-radius: 50%;
          background: #021a0a; border: 2.5px solid #4ade80;
          display: flex; align-items: center; justify-content: center;
          font-size: 0.75rem; color: #4ade80; font-weight: 900;
          pointer-events: none;
          box-shadow: 0 0 10px rgba(74,222,128,0.4);
        }

        /* stage name */
        .node-name {
          font-family: 'Cinzel Decorative', serif;
          font-size: 0.75rem; letter-spacing: 0.06em;
          text-align: center;
          max-width: 120px; line-height: 1.4;
          font-weight: 400;
        }

        /* xp chip */
        .node-xp {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.6rem; letter-spacing: 0.2em;
          padding: 2px 8px;
          border-radius: 20px;
          border: 1px solid;
          opacity: 0.75;
        }

        /* ══ SVG PATH ANIMATIONS ═══════════════════ */
        @keyframes dashScroll { to { stroke-dashoffset: -32; } }

        /* ══ AUDIO BTN ══════════════════════════════ */
        .audio-btn {
          position: fixed; bottom: 1.8rem; right: 1.8rem; z-index: 60;
          width: 50px; height: 50px; border-radius: 50%;
          background: rgba(3,0,10,0.92);
          border: 1.5px solid rgba(192,57,43,0.4);
          color: #c0392b; font-size: 1.3rem;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
          transition: border-color 0.2s, box-shadow 0.2s, transform 0.15s;
          backdrop-filter: blur(10px);
          box-shadow: 0 4px 20px rgba(0,0,0,0.6);
        }
        .audio-btn:hover {
          border-color: rgba(192,57,43,0.7);
          box-shadow: 0 0 18px rgba(192,57,43,0.3), 0 4px 20px rgba(0,0,0,0.6);
          transform: scale(1.08);
        }
        .audio-btn.on {
          border-color: rgba(192,57,43,0.65);
          animation: audioPulse 3s ease-in-out infinite;
        }
        @keyframes audioPulse {
          0%, 100% { box-shadow: 0 0 12px rgba(192,57,43,0.3), 0 4px 20px rgba(0,0,0,0.6); }
          50%       { box-shadow: 0 0 26px rgba(192,57,43,0.55), 0 4px 20px rgba(0,0,0,0.6); }
        }

        /* ══ MODAL ══════════════════════════════════ */
        .overlay {
          position: fixed; inset: 0; z-index: 80;
          background: rgba(0,0,0,0.88);
          backdrop-filter: blur(6px);
          display: flex; align-items: center; justify-content: center;
          padding: 1.5rem;
          animation: fadeIn 0.2s ease;
        }
        @keyframes fadeIn { from { opacity: 0; } }

        .modal {
          width: 100%; max-width: 380px;
          background:
            radial-gradient(ellipse at 50% 0%, rgba(60,0,0,0.4) 0%, transparent 60%),
            #0a0012;
          border-radius: 14px;
          border-top: 3px solid;
          border-left: 1px solid rgba(255,255,255,0.06);
          border-right: 1px solid rgba(255,255,255,0.06);
          border-bottom: 1px solid rgba(255,255,255,0.04);
          padding: 2.2rem 2rem 2rem;
          position: relative;
          animation: modalIn 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes modalIn {
          from { transform: translateY(30px) scale(0.94); opacity: 0; }
        }

        .m-close {
          position: absolute; top: 1.1rem; right: 1.2rem;
          background: none; border: none;
          color: rgba(200,150,150,0.35); font-size: 1.1rem;
          cursor: pointer; transition: color 0.15s, transform 0.15s;
          font-family: 'Share Tech Mono', monospace;
        }
        .m-close:hover { color: #c0392b; transform: scale(1.2); }

        .m-icon {
          font-size: 3.5rem; text-align: center;
          margin-bottom: 1rem; display: block;
        }
        .m-title {
          font-family: 'Cinzel Decorative', serif;
          font-size: 1.15rem; color: #e8d8b8;
          text-align: center; line-height: 1.3;
          margin-bottom: 0.45rem; font-weight: 700;
        }
        .m-diff {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.68rem; letter-spacing: 0.38em;
          text-align: center; text-transform: uppercase;
          margin-bottom: 1.2rem;
          padding: 0.3rem 1rem;
          border-radius: 3px;
          display: inline-block;
          width: 100%;
        }
        .m-desc {
          font-family: 'IM Fell English', serif;
          font-style: italic;
          font-size: 0.95rem; color: rgba(220,200,175,0.6);
          line-height: 1.7; text-align: center;
          margin-bottom: 1.5rem;
        }
        .m-xp-row {
          display: flex; align-items: center; justify-content: center;
          gap: 0.6rem; margin-bottom: 1.5rem;
        }
        .m-xp {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.85rem; letter-spacing: 0.15em;
          padding: 0.35rem 1rem;
          border-radius: 4px;
          border: 1px solid;
        }
        .m-btn {
          width: 100%; padding: 0.85rem;
          border: none; border-radius: 8px;
          font-family: 'Cinzel Decorative', serif;
          font-size: 0.85rem; letter-spacing: 0.12em;
          cursor: pointer;
          transition: filter 0.2s, transform 0.15s, box-shadow 0.2s;
          font-weight: 700;
        }
        .m-btn:hover {
          filter: brightness(1.22);
          transform: scale(1.03) translateY(-1px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.5);
        }
        .m-btn:active { transform: scale(0.98); filter: brightness(0.95); }
        .m-done {
          text-align: center; margin-top: 0.9rem;
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.65rem; letter-spacing: 0.28em; color: #4ade80;
          text-transform: uppercase;
        }

        /* ══ LORE FOOTER ════════════════════════════ */
        .lore-footer {
          text-align: center;
          padding: 0.5rem 1.5rem 2rem;
          font-family: 'IM Fell English', serif;
          font-style: italic;
          font-size: 0.9rem;
          color: rgba(192,57,43,0.3);
          letter-spacing: 0.1em;
          border-top: 1px solid rgba(192,57,43,0.1);
          width: 360px; max-width: 92vw;
          margin-top: 1rem;
        }

        @media (max-width: 480px) {
          .bar-stats { gap: 1rem; }
          .stat-number { font-size: 1.1rem; }
          .top-bar { padding: 0.9rem 1.2rem; }
        }
      `}</style>

      <div className="root">

        <audio ref={audioRef} loop preload="auto">
          <source src="/audio/horror-theme.mp3" type="audio/mpeg" />
        </audio>

        {/* ══ TOP BAR ══ */}
        <div className="top-bar">
          <div className="bar-brand">
            <span
              className="bar-torch"
              style={{ filter: `brightness(${flicker}) drop-shadow(0 0 10px rgba(255,140,0,0.8))` }}
            >🔦</span>
            <span className="bar-title">CodeCrypt</span>
          </div>

          <div className="bar-stats">
            <div className="stat-block">
              <span className="stat-number">{completedCount}/{STAGES.length}</span>
              <span className="stat-label">Conquered</span>
            </div>
            <div className="stat-divider" />
            <div className="stat-block">
              <span className="stat-number">{totalXP}</span>
              <span className="stat-label">XP Souls</span>
            </div>
          </div>
        </div>

        {/* ══ PROGRESS ══ */}
        <div className="prog-strip">
          <div className="prog-fill" style={{ width: `${(completedCount / STAGES.length) * 100}%` }} />
        </div>

        {/* ══ PAGE ══ */}
        <div className="page">

          {/* Hero */}
          <div className={`hero ${revealed ? "vis" : ""}`}>
            <p className="hero-eye">⛧ &nbsp; enter the cursed territory &nbsp; ⛧</p>
            <h1 className="hero-title">The Haunted<br />Learning Map</h1>
            <p className="hero-sub">Code your way through — or be consumed.</p>
          </div>

          <div className={`hero-divider ${revealed ? "vis" : ""}`}>
            <div className="div-line" />
            <span className="div-rune">☠</span>
            <div className="div-line" />
          </div>

          {/* Path + Nodes */}
          <div className="path-wrap" style={{ height: totalH }}>

            {/* SVG path */}
            <svg
              viewBox={`0 0 400 ${totalH}`}
              width="400"
              style={{
                position: "absolute", inset: 0,
                width: "100%", height: totalH,
                pointerEvents: "none",
              }}
            >
              <defs>
                <filter id="glow-path">
                  <feGaussianBlur stdDeviation="3" result="b" />
                  <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
                </filter>
              </defs>

              {/* deep shadow */}
              <path d={svgPath} fill="none" stroke="rgba(0,0,0,0.7)" strokeWidth="8" strokeLinecap="round" />
              {/* blood glow */}
              <path d={svgPath} fill="none" stroke="rgba(192,57,43,0.18)" strokeWidth="12"
                filter="url(#glow-path)" strokeLinecap="round" />
              {/* solid dim base */}
              <path d={svgPath} fill="none" stroke="rgba(100,10,10,0.4)" strokeWidth="3" strokeLinecap="round" />
              {/* animated dashes */}
              <path d={svgPath} fill="none"
                stroke="rgba(192,57,43,0.65)" strokeWidth="2.8"
                strokeDasharray="10 8" strokeLinecap="round"
                style={{ animation: "dashScroll 1.8s linear infinite" }}
              />
            </svg>

            {/* Nodes */}
            {STAGES.map((stage, i) => {
              const col    = CAT[stage.category] || CAT.html;
              const locked = !stage.unlocked;
              const done   = stage.completed;
              const sx     = (nodeX(i) / 400) * 100; // % within 400px viewbox
              const sy     = nodeY(i);

              return (
                <div
                  key={stage._id}
                  className="node-outer"
                  style={{
                    left: `${sx}%`,
                    top: sy,
                    animationDelay: `${0.15 + i * 0.14}s`,
                  }}
                >
                  <button
                    className={`node-btn ${locked ? "locked" : ""}`}
                    style={{
                      background: locked
                        ? "radial-gradient(circle at 38% 38%, #1a1a1a 0%, #0d0d0d 100%)"
                        : `radial-gradient(circle at 38% 38%, ${col.dark} 0%, #03000a 100%)`,
                      borderColor: done ? "#4ade80" : locked ? "#1e1e1e" : col.main,
                      boxShadow: locked
                        ? "none"
                        : done
                          ? `0 0 0 4px rgba(74,222,128,0.1), 0 0 22px rgba(74,222,128,0.22), 0 6px 20px rgba(0,0,0,0.8)`
                          : `0 0 0 4px ${col.main}18, 0 0 24px ${col.main}30, 0 6px 20px rgba(0,0,0,0.8)`,
                    }}
                    onClick={() => !locked && setSelected(stage)}
                    aria-label={stage.title}
                  >
                    <span style={{
                      fontSize: "2rem",
                      filter: locked ? "none" : `drop-shadow(0 0 6px ${col.glow})`,
                    }}>
                      {locked ? "🔒" : stage.icon}
                    </span>

                    {/* outer halo — always show for unlocked */}
                    {!locked && (
                      <div className="node-halo" style={{ borderColor: col.main }} />
                    )}

                    {/* pulse ring — only for active (unlocked + not done) */}
                    {!locked && !done && (
                      <div className="node-ring" style={{ borderColor: col.glow }} />
                    )}

                    {/* done badge */}
                    {done && <div className="done-badge">✓</div>}
                  </button>

                  {/* stage name */}
                  <div className="node-name" style={{
                    color: locked
                      ? "rgba(255,255,255,0.18)"
                      : done
                        ? "rgba(74,222,128,0.75)"
                        : col.text,
                    textShadow: locked ? "none" : `0 0 12px ${col.glow}44`,
                  }}>
                    {stage.title}
                  </div>

                  {/* xp chip */}
                  {!locked && (
                    <div className="node-xp" style={{
                      color: done ? "#4ade80" : col.text,
                      borderColor: done ? "rgba(74,222,128,0.3)" : `${col.main}44`,
                      background: done ? "rgba(74,222,128,0.06)" : `${col.dark}88`,
                      textShadow: `0 0 8px ${col.glow}33`,
                    }}>
                      +{stage.xp} XP
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="lore-footer">
            ⚰ &nbsp; Only the worthy shall master all six chambers &nbsp; ⚰
          </div>
        </div>

        {/* ══ AUDIO BTN ══ */}
        <button
          className={`audio-btn ${playing ? "on" : ""}`}
          onClick={toggleAudio}
          title={playing ? "Pause music" : "Play horror music"}
        >
          {playing ? "🔊" : "🔇"}
        </button>

        {/* ══ MODAL ══ */}
        {selected && (() => {
          const col = CAT[selected.category] || CAT.html;
          return (
            <div className="overlay" onClick={() => setSelected(null)}>
              <div
                className="modal"
                style={{ borderColor: col.main, boxShadow: `0 0 40px ${col.main}22, 0 20px 60px rgba(0,0,0,0.8)` }}
                onClick={e => e.stopPropagation()}
              >
                <button className="m-close" onClick={() => setSelected(null)}>✕</button>

                <span className="m-icon" style={{ filter: `drop-shadow(0 0 12px ${col.glow})` }}>
                  {selected.icon}
                </span>

                <div className="m-title">{selected.title}</div>

                <div className="m-diff" style={{
                  color: col.glow,
                  background: `${col.dark}88`,
                  border: `1px solid ${col.main}33`,
                }}>
                  {selected.difficulty}
                </div>

                <p className="m-desc">{selected.desc}</p>

                <div className="m-xp-row">
                  <div className="m-xp" style={{
                    color: col.glow,
                    borderColor: `${col.main}44`,
                    background: `${col.dark}66`,
                  }}>
                    +{selected.xp} XP Souls
                  </div>
                </div>

                <button
                  className="m-btn"
                  style={{
                    background: `linear-gradient(135deg, ${col.dark}, ${col.main}cc)`,
                    color: col.glow,
                    boxShadow: `0 0 24px ${col.main}33, inset 0 1px 0 rgba(255,255,255,0.1)`,
                  }}
                  onClick={() => router.push(`/stages/${selected.category}/${selected._id}`)}
                >
                  Enter the Chamber →
                </button>

                {selected.completed && (
                  <div className="m-done">✓ &nbsp; Already Conquered</div>
                )}
              </div>
            </div>
          );
        })()}
      </div>
    </>
  );
}