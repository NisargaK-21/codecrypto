// backend/utils/validator.js

exports.validateHTMLStage = (code) => {
  if (!code || typeof code !== "string") {
    return { passed: false, feedback: "No code provided." };
  }

  // Simple but robust checks:
  const hasButtonTag = /<button\b[^>]*>[\s\S]*?<\/button>/i.test(code);
  const hasText = /enter\s+dungeon/i.test(code);

  if (hasButtonTag && hasText) {
    return {
      passed: true,
      feedback: "Correct — found a <button> with text 'Enter Dungeon'.",
    };
  }

  if (!hasButtonTag) {
    return {
      passed: false,
      feedback: "Add a <button> element. Example: <button>Enter Dungeon</button>",
    };
  }

  return {
    passed: false,
    feedback: "The button is present but missing the text 'Enter Dungeon' (case-insensitive).",
  };
};

exports.validateCSSStage = (code) => {
  if (!code || typeof code !== "string") {
    return { passed: false, feedback: "No code provided." };
  }

  // Look for Tailwind classes commonly requested
  const hasBgRed = /bg-?red-?\d{1,3}/i.test(code); // bg-red-600 etc
  const hasHover = /hover:bg-?red-?\d{1,3}/i.test(code);
  const hasTextWhite = /text-?white/i.test(code);

  // Very common expected solution:
  if (hasBgRed && hasHover && hasTextWhite) {
    return {
      passed: true,
      feedback: "Nice — Tailwind classes detected (bg-red, hover:bg-red, text-white).",
    };
  }

  // partial hints:
  if (!hasBgRed) {
    return {
      passed: false,
      feedback: "Add a background color like `bg-red-600` to the button.",
    };
  }
  if (!hasTextWhite) {
    return {
      passed: false,
      feedback: "Add `text-white` so the button text is visible on the red background.",
    };
  }
  if (!hasHover) {
    return {
      passed: false,
      feedback: "Add a hover state like `hover:bg-red-800` for interaction feedback.",
    };
  }

  return { passed: false, feedback: "Your code didn't match expected Tailwind classes." };
};