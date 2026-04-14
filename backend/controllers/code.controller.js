const Stage = require("../models/Stage");
const { reviewCode } = require("../services/ai.service");

exports.submitCode = async (req, res) => {
  try {
    const { code, stageId, stageType, stage } = req.body;

    if (!code) {
      return res.status(400).json({ passed: false, feedback: "No code provided" });
    }

    // Use stage data from request if provided, otherwise try to fetch from DB
    let stageData = stage || null;
    if (!stageData && stageId) {
      try {
        stageData = await Stage.findById(stageId);
      } catch (err) {
        stageData = null;
      }
    }

    const result = await reviewCode({ stage: stageData, stageType, code });

    return res.json({
      passed: !!result.passed,
      feedback: result.feedback || "",
      improvement: result.improvement || null,
    });
  } catch (error) {
    console.error("submitCode error:", error);
    return res.status(500).json({ passed: false, feedback: "Server error evaluating code" });
  }
};

exports.getHint = async (req, res) => {
  try {
    const { stageId, stageType, code, stage } = req.body;

    let stageData = stage || null;
    if (!stageData && stageId) {
      try {
        stageData = await Stage.findById(stageId);
      } catch (err) {
        stageData = null;
      }
    }

    // Use the same validation logic; it returns helpful feedback that can be treated as a hint.
    const result = await reviewCode({ stage: stageData, stageType, code: code || "" });

    return res.json({ hint: result.feedback || "Try adjusting your code to match the stage instructions." });
  } catch (error) {
    console.error("getHint error:", error);
    return res.status(500).json({ hint: "Server error generating hint" });
  }
};