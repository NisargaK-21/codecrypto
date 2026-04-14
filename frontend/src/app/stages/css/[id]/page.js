"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CodeEditor from "@/components/editor/CodeEditor";
import SubmitCode from "@/components/editor/SubmitCode";
import AIFeedback from "@/components/ai/AIFeedback";
import RewardPopup from "@/components/game/RewardPopup";
import useXP from "@/hooks/useXP";

const lessons = [
  {
    icon: "🎨",
    title: "What is CSS?",
    body: `CSS — Cascading Style Sheets — is the dark art of beautification. Where HTML builds the skeleton, CSS dresses it in flesh. It controls colour, shape, spacing, and shadow. Without it, every page is a bare, grey corpse.`,
    sub: "CSS tells the browser not just what to show — but how it should look and feel.",
  },
  {
    icon: "🩸",
    title: "Selectors — Targeting Your Prey",
    body: `A CSS rule begins with a selector — it identifies which HTML element to curse. Then come the declarations, wrapped in curly braces. Each declaration is a property and value pair separated by a colon.`,
    code: `selector {
  property: value;
  property: value;
}

/* Examples */
h1 { color: crimson; }
p  { font-size: 1.2rem; }
button { background: black; }`,
    sub: "The selector hunts the element. The declaration transforms it.",
  },
  {
    icon: "☠",
    title: "The Three Ways to Apply CSS",
    body: `CSS can be summoned in three ways. Inline — written directly on the element as a style attribute. Internal — placed inside a <style> tag in the <head>. External — linked as a separate .css file. External is the most powerful and preferred ritual.`,
    code: `<!-- 1. Inline -->
<h1 style="color: red;">Cursed Heading</h1>

<!-- 2. Internal -->
<style>
  h1 { color: red; }
</style>

<!-- 3. External -->
<link rel="stylesheet" href="style.css">`,
    sub: null,
  },
  {
    icon: "💀",
    title: "The Box Model — Every Element is a Coffin",
    body: `Every HTML element is a rectangular box. The Box Model governs it. Content sits at the centre. Padding is the space inside the walls. Border is the wall itself. Margin is the void outside — separating one coffin from the next.`,
    code: `div {
  /* Space inside, between content and border */
  padding: 20px;

  /* The border wall */
  border: 2px solid #8b0000;

  /* Space outside, separating from neighbours */
  margin: 16px;

  /* Total size of the element */
  width: 300px;
  height: 200px;
}`,
    sub: "Use box-sizing: border-box to make width include padding and border — far less maddening.",
  },
  {
    icon: "🕷",
    title: "Common Properties You Must Know",
    tags: [
      { tag: "color", desc: "Sets the text colour — hex, rgb, or named values" },
      { tag: "background", desc: "Background colour or image of an element" },
      { tag: "font-size", desc: "How large the text appears — px, rem, em, %" },
      { tag: "font-family", desc: "The typeface — a soul for your words" },
      { tag: "margin / padding", desc: "Space outside / inside the element" },
      { tag: "border", desc: "A line drawn around the element's edge" },
      { tag: "width / height", desc: "The dimensions of the element's box" },
      { tag: "display", desc: "block, inline, flex, grid — how it flows" },
      { tag: "border-radius", desc: "Rounds the corners — from sharp to circular" },
    ],
  },
  {
    icon: "🔮",
    title: "Colours — Painting with Darkness",
    body: `Colour in CSS can be written in several forms. Named colours are simple but limited. Hex codes give you 16 million shades. RGB lets you mix red, green, and blue. RGBA adds opacity — let the darkness bleed through.`,
    code: `/* Named */
color: crimson;

/* Hex */
color: #8b0000;

/* RGB */
color: rgb(139, 0, 0);

/* RGBA — with transparency */
background: rgba(0, 0, 0, 0.75);`,
    sub: "Hex and RGBA are the most widely used. Master them and you command the full spectrum of shadow.",
  },
  {
    icon: "⛧",
    title: "Selectors — Advanced Dark Arts",
    body: `Beyond the simple tag selector lie more precise incantations. Class selectors target elements by their class attribute. ID selectors summon a single unique element. Descendant selectors reach into nested structures. Pseudo-classes activate on states like hover or focus.`,
    code: `/* Class selector — targets class="dark-card" */
.dark-card { background: #1a0000; }

/* ID selector — targets id="skull" */
#skull { color: #cc3333; }

/* Descendant — <p> inside .card */
.card p { line-height: 1.8; }

/* Pseudo-class — on hover */
button:hover { background: #8b0000; }

/* Pseudo-class — first child */
li:first-child { font-weight: bold; }`,
    sub: "Classes are reusable. IDs are unique. Pseudo-classes respond to user interaction.",
  },
];

function LessonCard({ lesson, index }) {
  const [open, setOpen] = useState(index === 0);

  return (
    <div
      style={{
        border: "1px solid rgba(180,30,30,0.35)",
        borderLeft: "3px solid #8b0000",
        borderRadius: "4px",
        marginBottom: "1.5rem",
        background: "rgba(10,0,0,0.55)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen((p) => !p)}
        style={{
          width: "100%",
          background: "none",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: "1rem",
          padding: "1.1rem 1.4rem",
          textAlign: "left",
        }}
      >
        <span style={{ fontSize: "2rem", lineHeight: 1 }}>{lesson.icon}</span>
        <span
          style={{
            flex: 1,
            fontFamily: "'Cinzel', serif",
            fontSize: "1.35rem",
            color: "#e8c8a0",
            letterSpacing: "0.04em",
          }}
        >
          {lesson.title}
        </span>
        <span
          style={{
            color: "#8b0000",
            fontSize: "1.4rem",
            transition: "transform 0.3s",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
        >
          ▾
        </span>
      </button>

      {open && (
        <div style={{ padding: "0 1.4rem 1.4rem" }}>
          {lesson.body && (
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: "1.25rem",
                lineHeight: "1.85",
                color: "#c9b8a8",
                marginBottom: lesson.code || lesson.tags ? "1rem" : 0,
              }}
            >
              {lesson.body}
            </p>
          )}

          {lesson.code && (
            <pre
              style={{
                background: "rgba(0,0,0,0.7)",
                border: "1px solid rgba(139,0,0,0.4)",
                borderRadius: "3px",
                padding: "1rem 1.2rem",
                overflowX: "auto",
                fontFamily: "'Courier Prime', monospace",
                fontSize: "1.1rem",
                color: "#f08080",
                marginBottom: lesson.sub ? "1rem" : 0,
                lineHeight: "1.6",
              }}
            >
              {lesson.code}
            </pre>
          )}

          {lesson.tags && (
            <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "0.5rem" }}>
              <tbody>
                {lesson.tags.map((t, i) => (
                  <tr key={i} style={{ borderBottom: "1px solid rgba(139,0,0,0.2)" }}>
                    <td
                      style={{
                        padding: "0.55rem 0.8rem 0.55rem 0",
                        fontFamily: "'Courier Prime', monospace",
                        fontSize: "1.05rem",
                        color: "#f08080",
                        whiteSpace: "nowrap",
                        verticalAlign: "top",
                        width: "30%",
                      }}
                    >
                      {t.tag}
                    </td>
                    <td
                      style={{
                        padding: "0.55rem 0 0.55rem 0.8rem",
                        fontFamily: "'IM Fell English', serif",
                        fontSize: "1.15rem",
                        color: "#b8a898",
                        lineHeight: "1.5",
                      }}
                    >
                      {t.desc}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {lesson.sub && (
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontStyle: "italic",
                fontSize: "1.1rem",
                color: "#7a6a5a",
                margin: 0,
                paddingTop: "0.5rem",
                borderTop: lesson.code ? "1px solid rgba(139,0,0,0.2)" : "none",
              }}
            >
              {lesson.sub}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function BoneDivider() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        margin: "2.5rem 0",
        opacity: 0.45,
      }}
    >
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to right, transparent, #8b0000)" }} />
      <span style={{ fontSize: "1.3rem" }}>✦</span>
      <div style={{ flex: 1, height: "1px", background: "linear-gradient(to left, transparent, #8b0000)" }} />
    </div>
  );
}

/** A small live preview panel that renders the submitted CSS against a fixed HTML skeleton */
function LivePreview({ css }) {
  const skeleton = `<!DOCTYPE html>
<html>
<head>
<style>
  body { margin: 0; padding: 1rem; font-family: sans-serif; background: #fff; }
  ${css}
</style>
</head>
<body>
  <h1 class="title">The Haunted Bistro</h1>
  <p class="subtitle">A dining experience beyond the grave.</p>
  <ul class="menu">
    <li>Phantom Pasta</li>
    <li>Cursed Curry</li>
    <li>Ghostly Gelato</li>
  </ul>
  <button class="reserve-btn">Reserve a Table</button>
</body>
</html>`;

  return (
    <div
      style={{
        border: "1px solid rgba(139,0,0,0.3)",
        borderRadius: "3px",
        overflow: "hidden",
        marginBottom: "1.5rem",
        background: "rgba(5,0,0,0.6)",
      }}
    >
      <div
        style={{
          background: "rgba(80,0,0,0.35)",
          padding: "0.45rem 1rem",
          fontFamily: "'Cinzel', serif",
          fontSize: "0.85rem",
          letterSpacing: "0.15em",
          color: "#5a3030",
          borderBottom: "1px solid rgba(139,0,0,0.2)",
          display: "flex",
          alignItems: "center",
          gap: "0.5rem",
        }}
      >
        <span>👁</span>
        <span>◈ LIVE PREVIEW</span>
      </div>
      <iframe
        srcDoc={skeleton}
        title="Live CSS Preview"
        sandbox="allow-scripts"
        style={{
          width: "100%",
          height: "260px",
          border: "none",
          display: "block",
          background: "#fff",
        }}
      />
    </div>
  );
}

export default function CssStagePage() {
  const router = useRouter();
  const params = useParams();
  const stageId = params?.id;

  const [css, setCss] = useState(`/* Style the Haunted Bistro restaurant page */

body {
  background-color: #1a0a0a;
  color: #e8d5b0;
  font-family: Georgia, serif;
  padding: 2rem;
}

.title {
  font-size: 2.5rem;
  color: #cc3333;
  text-align: center;
  border-bottom: 2px solid #8b0000;
  padding-bottom: 0.5rem;
}

.subtitle {
  font-style: italic;
  color: #a08070;
  text-align: center;
}

.menu {
  list-style: none;
  padding: 0;
}

.menu li {
  padding: 0.4rem 0;
  border-bottom: 1px solid rgba(139, 0, 0, 0.3);
  color: #c9b8a8;
}

.reserve-btn {
  display: block;
  margin: 1.5rem auto 0;
  padding: 0.75rem 2rem;
  background: #8b0000;
  color: #f5ddb0;
  border: none;
  border-radius: 3px;
  font-size: 1rem;
  cursor: pointer;
}

.reserve-btn:hover {
  background: #cc3333;
}`);

  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(false);
  const [showPreview, setShowPreview] = useState(true);
  const { addXP } = useXP();

  const handleResult = (data) => {
    if (!data) return;
    setResult(data);

    if (data.passed) {
      addXP(75);
      setCompleted(true);

      setTimeout(() => {
        router.push("/stages/js/stage1");
      }, 1500);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=IM+Fell+English:ital@0;1&family=Courier+Prime:ital@0;1&display=swap');

        body { background: #080000 !important; }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0000; }
        ::-webkit-scrollbar-thumb { background: #5a0000; border-radius: 3px; }

        @keyframes flicker {
          0%,100% { opacity:1; }
          92% { opacity:1; }
          93% { opacity:0.4; }
          94% { opacity:1; }
          96% { opacity:0.6; }
          97% { opacity:1; }
        }

        @keyframes drip {
          0%   { transform: scaleY(0); opacity: 0; }
          30%  { opacity: 1; }
          100% { transform: scaleY(1); opacity: 0.7; }
        }

        /* Paintbrush sweep — CSS-themed entrance */
        @keyframes brushSweep {
          0%   { clip-path: inset(0 100% 0 0); opacity: 0; }
          100% { clip-path: inset(0 0% 0 0);   opacity: 1; }
        }

        .flicker { animation: flicker 5s infinite; }

        .brush-reveal {
          animation: brushSweep 1.1s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .horror-btn {
          background: linear-gradient(135deg, #5a0000 0%, #1a0000 100%);
          color: #f5ddb0;
          border: 1px solid #8b0000;
          font-family: 'Cinzel', serif;
          letter-spacing: 0.1em;
          font-size: 1.1rem;
          padding: 0.75rem 2rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s, transform 0.1s;
        }
        .horror-btn:hover {
          background: linear-gradient(135deg, #8b0000 0%, #3a0000 100%);
          transform: scale(1.02);
        }
        .horror-btn:active { transform: scale(0.98); }

        .toggle-preview-btn {
          background: rgba(80,0,0,0.3);
          color: #a07060;
          border: 1px solid rgba(139,0,0,0.35);
          font-family: 'Cinzel', serif;
          font-size: 0.78rem;
          letter-spacing: 0.12em;
          padding: 0.3rem 0.85rem;
          border-radius: 2px;
          cursor: pointer;
          transition: background 0.2s;
        }
        .toggle-preview-btn:hover {
          background: rgba(139,0,0,0.35);
          color: #e8c8a0;
        }
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#080000",
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(60,0,80,0.12) 0%, transparent 55%), radial-gradient(ellipse at 80% 80%, rgba(100,0,0,0.1) 0%, transparent 50%), url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23330000' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          padding: "0 0 5rem",
        }}
      >
        {/* Blood drip bar */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(to right, #3a0000, #6a006a, #8b0000, #3a0000)",
            boxShadow: "0 2px 20px rgba(139,0,0,0.5)",
          }}
        />

        {/* Blood drips */}
        <div style={{ display: "flex", justifyContent: "space-around", height: "28px", overflow: "hidden" }}>
          {[18, 38, 55, 70, 85].map((_, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                height: `${10 + (i % 4) * 7}px`,
                background: i % 2 === 0 ? "#8b0000" : "#6a006a",
                borderRadius: "0 0 3px 3px",
                animation: `drip ${1.2 + i * 0.3}s ease-out ${i * 0.35}s forwards`,
                transformOrigin: "top",
              }}
            />
          ))}
        </div>

        {/* Hero Header */}
        <header style={{ textAlign: "center", padding: "3rem 2rem 2rem" }}>
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.35em",
              color: "#5a3050",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Stage II · The Second Rite
          </p>

          <h1
            className="flicker"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 6vw, 3.8rem)",
              fontWeight: 700,
              color: "#e8c8a0",
              textShadow: "0 0 40px rgba(100,0,120,0.5), 0 0 80px rgba(139,0,0,0.3), 0 2px 0 #3a0000",
              letterSpacing: "0.06em",
              margin: "0 0 1rem",
              lineHeight: 1.15,
            }}
          >
            The <span style={{ color: "#b44fc8" }}>CSS</span> Crypt
          </h1>

          <p
            style={{
              fontFamily: "'IM Fell English', serif",
              fontStyle: "italic",
              fontSize: "1.35rem",
              color: "#7a5a6a",
              maxWidth: "540px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            The skeleton is built. Now clothe it in darkness. Learn the art of style — then paint the walls of the crypt.
          </p>

          {/* Stage badge strip */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "0.6rem",
              marginTop: "1.75rem",
              flexWrap: "wrap",
            }}
          >
            {[
              { label: "HTML", done: true },
              { label: "CSS", done: false, active: true },
              { label: "JS", done: false },
            ].map((s) => (
              <span
                key={s.label}
                style={{
                  fontFamily: "'Cinzel', serif",
                  fontSize: "0.75rem",
                  letterSpacing: "0.15em",
                  padding: "0.25rem 0.75rem",
                  border: s.active
                    ? "1px solid #b44fc8"
                    : s.done
                    ? "1px solid #3a3a2a"
                    : "1px solid rgba(139,0,0,0.25)",
                  borderRadius: "2px",
                  color: s.active ? "#b44fc8" : s.done ? "#5a6a3a" : "#3a2a2a",
                  background: s.active ? "rgba(100,0,120,0.12)" : "transparent",
                }}
              >
                {s.done ? "✓ " : ""}{s.label}
              </span>
            ))}
          </div>
        </header>

        <main style={{ maxWidth: "860px", margin: "0 auto", padding: "0 1.5rem" }}>
          <BoneDivider />

          {/* Lesson section header */}
          <div style={{ marginBottom: "2rem" }}>
            <h2
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "1.2rem",
                letterSpacing: "0.25em",
                color: "#8b0000",
                textTransform: "uppercase",
                marginBottom: "0.4rem",
              }}
            >
              ◈ The Style Grimoire
            </h2>
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: "1.15rem",
                color: "#5a4a3a",
                margin: 0,
              }}
            >
              Study each scroll. Understand the incantations before you dare attempt the challenge below.
            </p>
          </div>

          {lessons.map((lesson, i) => (
            <LessonCard key={i} lesson={lesson} index={i} />
          ))}

          <BoneDivider />

          {/* Challenge header */}
          <div style={{ marginBottom: "1.2rem" }}>
            <h2
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "1.2rem",
                letterSpacing: "0.25em",
                color: "#8b0000",
                textTransform: "uppercase",
                marginBottom: "0.5rem",
              }}
            >
              ◈ The Challenge
            </h2>
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: "1.3rem",
                color: "#7a6a5a",
                lineHeight: "1.7",
                margin: 0,
              }}
            >
              The Haunted Bistro has bones — now give it beauty. Write CSS to style the restaurant page: give the title a striking colour and size, style the menu list, and make the reservation button stand out. The darkness demands elegance.
            </p>
          </div>

          {/* Target spec hint */}
          <div
            style={{
              border: "1px solid rgba(100,0,120,0.25)",
              borderLeft: "3px solid #6a006a",
              borderRadius: "3px",
              background: "rgba(30,0,40,0.45)",
              padding: "0.9rem 1.2rem",
              marginBottom: "1.5rem",
            }}
          >
            <p
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.8rem",
                letterSpacing: "0.2em",
                color: "#7a4a8a",
                margin: "0 0 0.5rem",
                textTransform: "uppercase",
              }}
            >
              ◈ Requirements
            </p>
            <ul style={{ margin: 0, padding: "0 0 0 1.2rem" }}>
              {[
                "Style the .title with a notable color and font-size",
                "Style .menu li with padding and a border or separator",
                "Style .reserve-btn with background, color, and padding",
                "Apply at least one :hover effect to the button",
              ].map((req, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: "'IM Fell English', serif",
                    fontSize: "1.1rem",
                    color: "#9a7aaa",
                    lineHeight: "1.8",
                  }}
                >
                  {req}
                </li>
              ))}
            </ul>
          </div>

          {/* Live preview toggle */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "0.5rem",
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: "0.78rem",
                letterSpacing: "0.15em",
                color: "#5a3030",
                textTransform: "uppercase",
              }}
            >
              ◈ Live Preview
            </span>
            <button
              className="toggle-preview-btn"
              onClick={() => setShowPreview((p) => !p)}
            >
              {showPreview ? "Hide Preview" : "Show Preview"}
            </button>
          </div>

          {/* Live preview iframe */}
          {showPreview && <LivePreview css={css} />}

          {/* Code editor */}
          <div
            style={{
              border: "1px solid rgba(139,0,0,0.3)",
              borderRadius: "3px",
              overflow: "hidden",
              marginBottom: "1rem",
              background: "rgba(5,0,0,0.6)",
            }}
          >
            <div
              style={{
                background: "rgba(80,0,0,0.35)",
                padding: "0.45rem 1rem",
                fontFamily: "'Cinzel', serif",
                fontSize: "0.85rem",
                letterSpacing: "0.15em",
                color: "#5a3030",
                borderBottom: "1px solid rgba(139,0,0,0.2)",
                display: "flex",
                alignItems: "center",
                gap: "0.6rem",
              }}
            >
              <span>◈ STYLE CRYPT</span>
              <span
                style={{
                  marginLeft: "auto",
                  fontSize: "0.7rem",
                  color: "#4a2a4a",
                  letterSpacing: "0.1em",
                }}
              >
                style.css
              </span>
            </div>
            <CodeEditor code={css} setCode={setCss} language="css" />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <SubmitCode code={css} stageId={stageId} setResult={handleResult} />
          </div>

          {result && (
            <div
              style={{
                border: `1px solid ${result.passed ? "rgba(0,100,0,0.4)" : "rgba(139,0,0,0.4)"}`,
                borderLeft: `3px solid ${result.passed ? "#006400" : "#8b0000"}`,
                borderRadius: "3px",
                background: result.passed ? "rgba(0,20,0,0.5)" : "rgba(20,0,0,0.5)",
                padding: "1rem 1.2rem",
                marginBottom: "1rem",
              }}
            >
              <AIFeedback result={result} />
            </div>
          )}
        </main>
      </div>

      <RewardPopup show={completed} />
    </>
  );
}