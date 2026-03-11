const Stage = require("../models/Stage")

exports.getStages = async (req, res) => {

  try {
    const stages = await Stage.find()
    res.json(stages)
  } catch (error) {
    res.status(500).json({error:"Failed to fetch stages"})
  }

}

exports.getStageById = async (req, res) => {

  try {
    const stage = await Stage.findById(req.params.id)
    res.json(stage)
  } catch (error) {
    res.status(500).json({error:"Stage not found"})
  }

}