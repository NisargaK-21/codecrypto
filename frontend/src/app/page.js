// import { redirect } from "next/navigation"

// export default function Home() {
//   redirect("/map")
// }



"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"

export default function Home() {
  const router = useRouter()
  const [phase, setPhase] = useState("idle") // idle → awakening → glitch → redirect
  const [glitchText, setGlitchText] = useState("CODECRYPT")
  const [bloodDrops, setBloodDrops] = useState([])
  const [curseLines, setCurseLines] = useState([])

  const glitchChars = "░▒▓█▄▀■□▪▫◆◇○●◉⬛⬜🩸💀☠️"
  const originalText = "CODECRYPT"

  useEffect(() => {
    // Generate blood drops
    const drops = Array.from({ length: 18 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      delay: `${Math.random() * 4}s`,
      duration: `${1.5 + Math.random() * 2}s`,
      size: `${8 + Math.random() * 16}px`,
    }))
    setBloodDrops(drops)

    // Curse text lines that flicker in
    const lines = [
      { text: "// darkness initializing...", delay: 800 },
      { text: "> summoning the ancient code...", delay: 1600 },
      { text: "> your soul has been logged.", delay: 2400 },
      { text: "WARNING: escape is not permitted.", delay: 3000 },
    ]
    setCurseLines([])

    lines.forEach(({ text, delay }) => {
      setTimeout(() => {
        setCurseLines((prev) => [...prev, text])
      }, delay)
    })

    // Begin awakening
    setTimeout(() => setPhase("awakening"), 500)

    // Glitch effect
    setTimeout(() => {
      setPhase("glitch")
      let count = 0
      const glitchInterval = setInterval(() => {
        const corrupted = originalText
          .split("")
          .map((char) =>
            Math.random() < 0.35
              ? glitchChars[Math.floor(Math.random() * glitchChars.length)]
              : char
          )
          .join("")
        setGlitchText(corrupted)
        count++
        if (count > 14) {
          clearInterval(glitchInterval)
          setGlitchText(originalText)
          setPhase("redirect")
        }
      }, 120)
    }, 3800)

    // Redirect after animation
    setTimeout(() => {
      router.push("/map")
    }, 5600)
  }, [])

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Creepster&family=Share+Tech+Mono&family=Nosifer&display=swap');

        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

        :root {
          --blood: #8B0000;
          --blood-bright: #CC0000;
          --gore: #4A0000;
          --void: #050005;
          --rot: #1a0a00;
          --bone: #e8e0d0;
          --mold: #0a1a0a;
          --neon-green: #00ff41;
          --neon-red: #ff0033;
          --purple-deep: #1a0033;
        }

        html, body { width: 100%; height: 100%; overflow: hidden; }

        .stage {
          width: 100vw;
          height: 100vh;
          background: var(--void);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          cursor: none;
          font-family: 'Share Tech Mono', monospace;
        }

        /* ── Texture overlay ── */
        .stage::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(139,0,0,0.03) 2px,
              rgba(139,0,0,0.03) 4px
            );
          pointer-events: none;
          z-index: 1;
        }

        /* ── Vignette ── */
        .stage::after {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.85) 100%);
          pointer-events: none;
          z-index: 2;
        }

        /* ── Fog layers ── */
        .fog {
          position: absolute;
          bottom: 0;
          left: -50%;
          width: 200%;
          height: 220px;
          background: radial-gradient(ellipse at 50% 100%, rgba(60,0,0,0.55) 0%, transparent 70%);
          animation: fogDrift 8s ease-in-out infinite alternate;
          z-index: 3;
          pointer-events: none;
        }
        .fog2 {
          animation-delay: -4s;
          opacity: 0.6;
          height: 150px;
          background: radial-gradient(ellipse at 50% 100%, rgba(80,0,20,0.4) 0%, transparent 65%);
        }

        @keyframes fogDrift {
          0%   { transform: translateX(-4%) scaleY(1); }
          100% { transform: translateX(4%) scaleY(1.1); }
        }

        /* ── Blood drops ── */
        .blood-drop {
          position: absolute;
          top: -30px;
          width: var(--drop-size);
          height: calc(var(--drop-size) * 2.5);
          background: linear-gradient(180deg, var(--blood-bright) 0%, var(--blood) 60%, transparent 100%);
          border-radius: 0 0 50% 50%;
          animation: drip var(--drop-duration) var(--drop-delay) ease-in infinite;
          z-index: 4;
          filter: blur(0.3px);
        }
        .blood-drop::after {
          content: '';
          position: absolute;
          top: -40%;
          left: 50%;
          transform: translateX(-50%);
          width: 110%;
          height: 70%;
          background: var(--blood-bright);
          border-radius: 50%;
        }

        @keyframes drip {
          0%   { transform: translateY(0);    opacity: 0; }
          10%  { opacity: 1; }
          80%  { opacity: 1; }
          100% { transform: translateY(105vh); opacity: 0; }
        }

        /* ── Main content ── */
        .content {
          position: relative;
          z-index: 10;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        /* ── Skull icon ── */
        .skull-wrap {
          font-size: 3.5rem;
          animation: skullFloat 3s ease-in-out infinite;
          filter: drop-shadow(0 0 12px var(--blood-bright));
          margin-bottom: 1rem;
          opacity: 0;
          transition: opacity 0.8s ease;
        }
        .skull-wrap.visible { opacity: 1; }

        @keyframes skullFloat {
          0%, 100% { transform: translateY(0) rotate(-3deg); }
          50%       { transform: translateY(-10px) rotate(3deg); }
        }

        /* ── Main title ── */
        .title-wrap {
          position: relative;
          margin-bottom: 0.5rem;
        }

        .title {
          font-family: 'Nosifer', cursive;
          font-size: clamp(3rem, 9vw, 7rem);
          color: var(--blood-bright);
          letter-spacing: 0.08em;
          text-shadow:
            0 0 20px var(--blood),
            0 0 60px rgba(139,0,0,0.6),
            0 0 120px rgba(100,0,0,0.3),
            2px 2px 0 #000,
            -1px -1px 0 #3a0000;
          opacity: 0;
          transform: translateY(30px) scale(0.94);
          transition: opacity 1s ease, transform 1s ease;
          user-select: none;
        }
        .title.visible {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        .title.glitching {
          animation: titleGlitch 0.1s steps(1) infinite;
          color: var(--neon-red);
        }

        @keyframes titleGlitch {
          0%   { text-shadow: 0 0 20px var(--neon-red), -3px 0 var(--neon-green), 3px 0 var(--blood); clip-path: inset(10% 0 80% 0); }
          25%  { text-shadow: 0 0 20px var(--blood), 3px 0 var(--neon-green), -2px 0 var(--neon-red); clip-path: inset(60% 0 20% 0); }
          50%  { text-shadow: 2px 0 var(--neon-red), -2px 0 var(--neon-green); clip-path: inset(40% 0 40% 0); }
          75%  { text-shadow: -3px 0 var(--blood), 3px 0 var(--neon-red); clip-path: inset(80% 0 5% 0); }
          100% { text-shadow: 0 0 20px var(--blood); clip-path: inset(0); }
        }

        /* ── Subtitle ── */
        .subtitle {
          font-family: 'Creepster', cursive;
          font-size: clamp(0.9rem, 2vw, 1.3rem);
          color: rgba(200,150,150,0.75);
          letter-spacing: 0.35em;
          text-transform: uppercase;
          margin-bottom: 2.5rem;
          opacity: 0;
          transition: opacity 1s ease 0.5s;
        }
        .subtitle.visible { opacity: 1; }

        /* ── Terminal curse box ── */
        .curse-terminal {
          background: rgba(5, 0, 5, 0.85);
          border: 1px solid rgba(139,0,0,0.4);
          border-left: 3px solid var(--blood-bright);
          padding: 1rem 1.5rem;
          width: clamp(280px, 50vw, 520px);
          min-height: 100px;
          text-align: left;
          margin-bottom: 2.5rem;
          box-shadow: 0 0 30px rgba(139,0,0,0.2), inset 0 0 20px rgba(0,0,0,0.5);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.6s ease 1s, transform 0.6s ease 1s;
        }
        .curse-terminal.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .curse-line {
          font-family: 'Share Tech Mono', monospace;
          font-size: 0.78rem;
          color: var(--neon-green);
          line-height: 1.8;
          opacity: 0;
          animation: fadeInLine 0.4s ease forwards;
        }
        .curse-line:nth-child(2) { color: rgba(200,100,100,0.8); }
        .curse-line:nth-child(3) { color: rgba(200,100,100,0.8); }
        .curse-line:nth-child(4) { color: var(--neon-red); font-weight: bold; animation-delay: 0.1s; }

        .cursor-blink {
          display: inline-block;
          width: 8px;
          height: 14px;
          background: var(--neon-green);
          vertical-align: text-bottom;
          animation: blink 0.9s step-end infinite;
          margin-left: 2px;
        }

        @keyframes fadeInLine { from { opacity: 0; transform: translateX(-6px); } to { opacity: 1; transform: none; } }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }

        /* ── Progress bar ── */
        .enter-bar-wrap {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          opacity: 0;
          transition: opacity 0.6s ease 1.5s;
        }
        .enter-bar-wrap.visible { opacity: 1; }

        .bar-label {
          font-size: 0.72rem;
          letter-spacing: 0.3em;
          color: rgba(180,80,80,0.7);
          text-transform: uppercase;
        }

        .bar-track {
          width: 240px;
          height: 4px;
          background: rgba(139,0,0,0.2);
          border: 1px solid rgba(139,0,0,0.3);
          overflow: hidden;
          position: relative;
        }

        .bar-fill {
          height: 100%;
          background: linear-gradient(90deg, var(--blood) 0%, var(--blood-bright) 50%, #ff4444 100%);
          box-shadow: 0 0 8px var(--blood-bright);
          width: 0%;
          animation: barFill 4.8s ease forwards;
          animation-delay: 0.5s;
        }

        @keyframes barFill {
          0%   { width: 0%; }
          20%  { width: 15%; }
          50%  { width: 55%; }
          75%  { width: 78%; }
          90%  { width: 92%; }
          100% { width: 100%; }
        }

        /* ── Redirect flash ── */
        .flash-overlay {
          position: fixed;
          inset: 0;
          background: var(--blood);
          opacity: 0;
          z-index: 100;
          pointer-events: none;
          transition: opacity 0.4s ease;
        }
        .flash-overlay.active { opacity: 1; }

        /* ── Corner runes ── */
        .rune {
          position: absolute;
          font-size: 1.2rem;
          color: rgba(139,0,0,0.25);
          font-family: 'Creepster', cursive;
          animation: runePulse 4s ease-in-out infinite;
          z-index: 5;
          pointer-events: none;
          user-select: none;
        }
        .rune:nth-child(1) { top: 1.5rem; left: 2rem; animation-delay: 0s; }
        .rune:nth-child(2) { top: 1.5rem; right: 2rem; animation-delay: 1s; }
        .rune:nth-child(3) { bottom: 1.5rem; left: 2rem; animation-delay: 2s; }
        .rune:nth-child(4) { bottom: 1.5rem; right: 2rem; animation-delay: 0.5s; }

        @keyframes runePulse {
          0%,100% { opacity: 0.2; transform: scale(1); }
          50%      { opacity: 0.6; transform: scale(1.1); }
        }

        /* ── Eye veins ── */
        .veins {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 3;
          opacity: 0.12;
          background:
            radial-gradient(ellipse 120px 60px at 15% 20%, rgba(139,0,0,0.6) 0%, transparent 70%),
            radial-gradient(ellipse 80px 40px at 85% 15%, rgba(100,0,0,0.5) 0%, transparent 60%),
            radial-gradient(ellipse 100px 50px at 10% 80%, rgba(120,0,0,0.4) 0%, transparent 65%),
            radial-gradient(ellipse 90px 45px at 90% 85%, rgba(100,0,0,0.5) 0%, transparent 60%);
        }

        /* ── Firefly particles ── */
        .firefly {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: var(--blood-bright);
          box-shadow: 0 0 6px var(--blood-bright), 0 0 12px var(--blood);
          animation: fireflyFloat var(--ff-dur) var(--ff-delay) ease-in-out infinite alternate;
          z-index: 5;
          pointer-events: none;
          opacity: 0.7;
        }

        @keyframes fireflyFloat {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.3; }
          50%  { opacity: 0.9; }
          100% { transform: translate(var(--ff-tx), var(--ff-ty)) scale(1.5); opacity: 0.4; }
        }

        /* ── Redirect state ── */
        .stage.redirecting .title {
          animation: suckedIn 0.6s ease forwards;
        }
        @keyframes suckedIn {
          to { transform: scale(0.1); opacity: 0; filter: blur(8px); }
        }
      `}</style>

      <div className={`stage ${phase === "redirect" ? "redirecting" : ""}`}>

        {/* Corner runes */}
        {["☽⚰☾", "†∞†", "⚔☠⚔", "∞†∞"].map((r, i) => (
          <div key={i} className="rune">{r}</div>
        ))}

        {/* Edge vein stains */}
        <div className="veins" />

        {/* Fog */}
        <div className="fog" />
        <div className="fog fog2" />

        {/* Blood drips */}
        {bloodDrops.map((d) => (
          <div
            key={d.id}
            className="blood-drop"
            style={{
              left: d.left,
              "--drop-delay": d.delay,
              "--drop-duration": d.duration,
              "--drop-size": d.size,
            }}
          />
        ))}

        {/* Firefly embers */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={i}
            className="firefly"
            style={{
              left: `${10 + Math.random() * 80}%`,
              top: `${10 + Math.random() * 80}%`,
              "--ff-dur": `${3 + Math.random() * 4}s`,
              "--ff-delay": `${Math.random() * 3}s`,
              "--ff-tx": `${-30 + Math.random() * 60}px`,
              "--ff-ty": `${-30 + Math.random() * 60}px`,
            }}
          />
        ))}

        {/* Main content */}
        <div className="content">
          <div className={`skull-wrap ${phase !== "idle" ? "visible" : ""}`}>
            💀
          </div>

          <div className="title-wrap">
            <div className={`title ${phase !== "idle" ? "visible" : ""} ${phase === "glitch" ? "glitching" : ""}`}>
              {glitchText}
            </div>
          </div>

          <div className={`subtitle ${phase !== "idle" ? "visible" : ""}`}>
            Where Code Meets the Cursed
          </div>

          {/* Terminal */}
          <div className={`curse-terminal ${phase !== "idle" ? "visible" : ""}`}>
            {curseLines.map((line, i) => (
              <div key={i} className="curse-line">{line}</div>
            ))}
            {curseLines.length < 4 && <span className="cursor-blink" />}
          </div>

          {/* Progress bar */}
          <div className={`enter-bar-wrap ${phase !== "idle" ? "visible" : ""}`}>
            <span className="bar-label">Entering the Crypt</span>
            <div className="bar-track">
              <div className="bar-fill" />
            </div>
          </div>
        </div>

        {/* Flash on redirect */}
        <div className={`flash-overlay ${phase === "redirect" ? "active" : ""}`} />
      </div>
    </>
  )
}