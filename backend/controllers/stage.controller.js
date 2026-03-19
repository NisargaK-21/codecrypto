// backend/controllers/stage.controller.js
const Stage = require("../models/Stage");

exports.getStages = async (req, res) => {
  try {
    const stages = await Stage.find();
    res.json(stages);
  } catch (error) {
    console.error("getStages error:", error);
    res.status(500).json({ error: "Failed to fetch stages" });
  }
};

exports.getStageById = async (req, res) => {
  try {
    const stage = await Stage.findById(req.params.id);
    if (!stage) return res.status(404).json({ error: "Stage not found" });
    res.json(stage);
  } catch (error) {
    console.error("getStageById error:", error);
    res.status(500).json({ error: "Stage not found" });
  }
};