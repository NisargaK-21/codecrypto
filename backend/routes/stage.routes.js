// backend/routes/stage.routes.js
const express = require("express");
const router = express.Router();

const { getStages, getStageById } = require("../controllers/stage.controller");

router.get("/", getStages);
router.get("/:id", getStageById);

module.exports = router;