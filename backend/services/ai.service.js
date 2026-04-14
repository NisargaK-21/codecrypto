// backend/services/ai.service.js
const { validateHTMLStage, validateCSSStage } = require("../utils/validator");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const geminiApiKey = process.env.GEMINI_API_KEY;
const geminiModel = process.env.GEMINI_MODEL || "models/gemini-2.5-flash";
const gemini = geminiApiKey ? new GoogleGenerativeAI(geminiApiKey) : null;

function getStageType(stage, stageType) {
  const typeFromStage = stage && stage.meta && stage.meta.type;
  const titleGuess = stage && stage.title && stage.title.toLowerCase();

  return (
    (typeFromStage && typeFromStage.toLowerCase()) ||
    (stageType && stageType.toLowerCase()) ||
    (titleGuess && (titleGuess.includes("html") ? "html" : titleGuess.includes("css") ? "css" : null)) ||
    null
  );
}

function formatStageInfo(stage) {
  if (!stage) return "";
  const parts = [];
  if (stage.title) parts.push(`Title: ${stage.title}`);
  if (stage.description) parts.push(`Description: ${stage.description}`);
  if (stage.instructions) parts.push(`Instructions: ${stage.instructions}`);
  if (stage.difficulty) parts.push(`Difficulty: ${stage.difficulty}`);
  if (stage.meta && typeof stage.meta === "object") parts.push(`Meta: ${JSON.stringify(stage.meta)}`);
  return parts.join("\n");
}

async function askGeminiForFeedback({ stage, stageType, code, type }) {
  if (!gemini) return null;

  const model = gemini.getGenerativeModel({ model: geminiModel });

  const stageInfo = formatStageInfo(stage);
  const prompt = `You are a helpful code reviewer. Evaluate the user's code against the stage instructions.

${stageInfo ? `Stage info:\n${stageInfo}\n\n` : ""}Stage type: ${type || "unknown"}

User code:
${code || ""}

Respond with JSON only (no extra text) with these fields:
- passed: boolean (true if this submission satisfies the stage requirements)
- feedback: a concise explanation of what is correct / incorrect
- improvement: a suggested next step or fix (optional)

Return the JSON object only.`;

  try {
    const result = await model.generateContent({
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 500,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            passed: { type: "boolean" },
            feedback: { type: "string" },
            improvement: { type: "string" },
          },
          required: ["passed", "feedback"],
        },
      },
    });

    const candidate = result?.response?.candidates?.[0];
    const raw = candidate?.content?.parts?.map((p) => p.text || "").join("") || "";

    try {
      const parsed = JSON.parse(raw);
      return {
        passed: !!parsed.passed,
        feedback: String(parsed.feedback || ""),
        improvement: parsed.improvement || null,
      };
    } catch {
      // If parsing fails, fall back to a safe response while still returning the raw output.
      return {
        passed: false,
        feedback: raw || "Unable to parse Gemini response.",
        improvement: null,
      };
    }
  } catch (err) {
    console.error("Gemini API error:", err);
    return null;
  }
}

/**
 * reviewCode: central place to evaluate code.
 * - Prefer: stage.meta.type
 * - Fallback: stageType (sent from frontend)
 * - Fallback2: infer from stage.title if stage provided
 * - Default: returns "not implemented" message
 *
 * Integrates with Gemini (Google Generative AI) if a key is configured.
 */
async function reviewCode({ stage, stageType, code }) {
  const type = getStageType(stage, stageType);

  // Prefer Gemini feedback when possible.
  const geminiResult = await askGeminiForFeedback({ stage, stageType, code, type });
  if (geminiResult) {
    return geminiResult;
  }

  if (type === "html") {
    return validateHTMLStage(code);
  }

  if (type === "css") {
    return validateCSSStage(code);
  }

  // fallback generic: try HTML validator first, then CSS
  const htmlTry = validateHTMLStage(code);
  if (htmlTry.passed) return htmlTry;

  const cssTry = validateCSSStage(code);
  if (cssTry.passed) return cssTry;

  return {
    passed: false,
    feedback: "Auto-check not implemented for this stage type. Try to match the stage brief.",
  };
}

module.exports = { reviewCode };