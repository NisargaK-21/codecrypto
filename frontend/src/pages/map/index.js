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
    _id: "6", title: "Thed Final Ritual",
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
const NODE_SPACING = 180;``
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