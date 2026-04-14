// backend/models/Stage.js
const mongoose = require("mongoose");

const stageSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  instructions: String,
  difficulty: String,
  rewardXP: { type: Number, default: 50 },
  unlocked: { type: Boolean, default: false },
  meta: { type: Object, default: {} },
});

module.exports = mongoose.model("Stage", stageSchema);