// // frontend/src/app/stages/html/[id]/page.js
// "use client";

// import { useState } from "react";
// import { useParams, useRouter } from "next/navigation";

// import CodeEditor from "@/components/editor/CodeEditor";
// import SubmitCode from "@/components/editor/SubmitCode";
// import AIFeedback from "@/components/ai/AIFeedback";
// import RewardPopup from "@/components/game/RewardPopup";
// import useXP from "@/hooks/useXP";

// export default function StagePage() {
//   const router = useRouter();
//   const params = useParams();
//   const stageId = params?.id;

//   const [code, setCode] = useState("<button>Enter Dungeon</button>");
//   const [result, setResult] = useState(null);
//   const [completed, setCompleted] = useState(false);
//   const { addXP } = useXP();

//   const handleResult = (data) => {
//     if (!data) return;
//     setResult(data);

//     if (data.passed) {
//       addXP(50);
//       setCompleted(true);

//       setTimeout(() => {
//         router.push("/stages/css/stage1");
//       }, 1500);
//     }
//   };

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl text-red-500">Haunted HTML Gate</h1>

//       <CodeEditor code={code} setCode={setCode} />

//       <SubmitCode code={code} stageId={stageId} setResult={handleResult} />

//       <AIFeedback result={result} />

//       <RewardPopup show={completed} />
//     </div>
//   );
// }






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
    icon: "☠",
    title: "What is HTML?",
    body: `HTML stands for HyperText Markup Language. It is the skeleton of every webpage — the bare bones that give structure to what you see in a browser. Without HTML, a page is nothing but an empty void.`,
    sub: "Every site you've ever visited was built on HTML. It is the first language of the web.",
  },
  {
    icon: "🩸",
    title: "Tags — The Spells of HTML",
    body: `An HTML tag is a command wrapped in angle brackets < >. Most tags come in pairs: an opening tag and a closing tag. Together they wrap content like a coffin wraps what lies within.`,
    code: `<tagname>  your content here  </tagname>`,
    sub: "The opening tag starts the spell. The closing tag (with /) ends it.",
  },
  {
    icon: "💀",
    title: "The Anatomy of a Page",
    body: `Every HTML page shares the same cursed structure. The <!DOCTYPE html> declaration wakes the browser. The <html> tag is the body. Inside live two children: <head> (hidden secrets) and <body> (what mortals see).`,
    code: `<!DOCTYPE html>
<html>
  <head>
    <title>My Dark Page</title>
  </head>
  <body>
    <h1>Welcome to the dungeon</h1>
  </body>
</html>`,
    sub: null,
  },
  {
    icon: "🕷",
    title: "Common Tags You Must Know",
    tags: [
      { tag: "<h1> … <h6>", desc: "Headings — from the loudest scream to a whisper" },
      { tag: "<p>", desc: "Paragraph — a block of text, a tombstone inscription" },
      { tag: "<a href='…'>", desc: "Anchor — a portal to another realm (link)" },
      { tag: "<img src='…'>", desc: "Image — a vision conjured from a file path" },
      { tag: "<ul> / <ol>", desc: "Lists — unordered chaos or ordered ritual" },
      { tag: "<div>", desc: "Division — an invisible container, like a sealed crypt" },
      { tag: "<button>", desc: "Button — a lever that triggers dark forces" },
    ],
  },
  {
    icon: "🔮",
    title: "Attributes — Whispering Power into Tags",
    body: `Attributes are extra instructions placed inside an opening tag. They modify the tag's behaviour or appearance. They are written as key="value" pairs.`,
    code: `<a href="https://dungeon.com" target="_blank">Enter the Dungeon</a>

<img src="skull.png" alt="A grinning skull" width="200">

<button class="evil-btn" id="summon">Summon</button>`,
    sub: "href, src, alt, class, id — these are the most common attributes you will encounter.",
  },
];

function GlitchText({ children }) {
  return (
    <span style={{ position: "relative", display: "inline-block" }}>
      <span style={{ position: "relative", zIndex: 1 }}>{children}</span>
    </span>
  );
}

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
        transition: "box-shadow 0.3s",
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

      {/* Body */}
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
                  <tr
                    key={i}
                    style={{
                      borderBottom: "1px solid rgba(139,0,0,0.2)",
                    }}
                  >
                    <td
                      style={{
                        padding: "0.55rem 0.8rem 0.55rem 0",
                        fontFamily: "'Courier Prime', monospace",
                        fontSize: "1.05rem",
                        color: "#f08080",
                        whiteSpace: "nowrap",
                        verticalAlign: "top",
                        width: "35%",
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

export default function StagePage() {
  const router = useRouter();
  const params = useParams();
  const stageId = params?.id;

  const [code, setCode] = useState(`<!DOCTYPE html>
<html>
  <head>
    <title>My Restaurant</title>
  </head>
  <body>
    <h1>The Haunted Bistro</h1>
    <p>A dining experience beyond the grave.</p>

    <h2>Menu</h2>
    <ul>
      <li>Phantom Pasta</li>
      <li>Cursed Curry</li>
      <li>Ghostly Gelato</li>
    </ul>

    <button>Reserve a Table</button>
  </body>
</html>`);
  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(false);
  const { addXP } = useXP();

  const handleResult = (data) => {
    if (!data) return;
    setResult(data);

    if (data.passed) {
      addXP(50);
      setCompleted(true);

      setTimeout(() => {
        router.push("/stages/css/stage1");
      }, 1500);
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@400;700&family=IM+Fell+English:ital@0;1&family=Courier+Prime:ital@0;1&display=swap');

        body {
          background: #080000 !important;
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #0a0000; }
        ::-webkit-scrollbar-thumb { background: #5a0000; border-radius: 3px; }

        /* Fog flicker on title */
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

        .flicker { animation: flicker 5s infinite; }

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
      `}</style>

      <div
        style={{
          minHeight: "100vh",
          background: "#080000",
          backgroundImage:
            "radial-gradient(ellipse at 50% 0%, rgba(100,0,0,0.18) 0%, transparent 60%), url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23330000' fill-opacity='0.12'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")",
          padding: "0 0 5rem",
        }}
      >
        {/* ── Top blood drip bar ── */}
        <div
          style={{
            height: "4px",
            background: "linear-gradient(to right, #3a0000, #8b0000, #3a0000)",
            boxShadow: "0 2px 20px rgba(139,0,0,0.5)",
          }}
        />

        {/* ── Blood drips ── */}
        <div style={{ display: "flex", justifyContent: "space-around", height: "28px", overflow: "hidden" }}>
          {[18, 42, 60, 75, 88].map((left, i) => (
            <div
              key={i}
              style={{
                width: "3px",
                height: `${12 + (i % 3) * 8}px`,
                background: "#8b0000",
                borderRadius: "0 0 3px 3px",
                animation: `drip ${1.2 + i * 0.3}s ease-out ${i * 0.4}s forwards`,
                transformOrigin: "top",
              }}
            />
          ))}
        </div>

        {/* ── Hero Header ── */}
        <header
          style={{
            textAlign: "center",
            padding: "3rem 2rem 2rem",
          }}
        >
          <p
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "0.9rem",
              letterSpacing: "0.35em",
              color: "#5a3030",
              textTransform: "uppercase",
              marginBottom: "0.75rem",
            }}
          >
            Stage I · The First Rite
          </p>

          <h1
            className="flicker"
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: "clamp(2rem, 6vw, 3.8rem)",
              fontWeight: 700,
              color: "#e8c8a0",
              textShadow: "0 0 40px rgba(139,0,0,0.6), 0 2px 0 #3a0000",
              letterSpacing: "0.06em",
              margin: "0 0 1rem",
              lineHeight: 1.15,
            }}
          >
            Haunted <span style={{ color: "#cc3333" }}>HTML</span> Gate
          </h1>

          <p
            style={{
              fontFamily: "'IM Fell English', serif",
              fontStyle: "italic",
              fontSize: "1.35rem",
              color: "#7a5a4a",
              maxWidth: "520px",
              margin: "0 auto",
              lineHeight: "1.7",
            }}
          >
            To open the gate, you must first understand its tongue. Learn the ancient markup — then prove your worth.
          </p>
        </header>

        <main
          style={{
            maxWidth: "860px",
            margin: "0 auto",
            padding: "0 1.5rem",
          }}
        >
          <BoneDivider />

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
              ◈ The Ancient Scrolls
            </h2>
            <p
              style={{
                fontFamily: "'IM Fell English', serif",
                fontSize: "1.15rem",
                color: "#5a4a3a",
                margin: 0,
              }}
            >
              Study each scroll before you attempt the challenge below.
            </p>
          </div>

          {lessons.map((lesson, i) => (
            <LessonCard key={i} lesson={lesson} index={i} />
          ))}

          <BoneDivider />

          <div style={{ marginBottom: "1.5rem" }}>
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
              The darkness hungers for a restaurant. Craft an HTML page for a restaurant — include a heading with the name, a short description, a menu list, and a reservation button. Submit when the feast is ready.
            </p>
          </div>

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
              }}
            >
              ◈ CODE CRYPT
            </div>
            <CodeEditor code={code} setCode={setCode} />
          </div>

          <div style={{ marginBottom: "1.5rem" }}>
            <SubmitCode code={code} stageId={stageId} setResult={handleResult} />
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