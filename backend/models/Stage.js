const mongoose = require("mongoose")

const stageSchema = new mongoose.Schema({
  title: String,
  description: String,
  difficulty: String,
  rewardXP: Number,
  unlocked: Boolean
})

module.exports = mongoose.model("Stage", stageSchema)