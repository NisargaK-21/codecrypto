const express = require("express")
const router = express.Router()

const { submitCode, getHint } = require("../controllers/code.controller")

router.post("/submit", submitCode)
router.post("/hint", getHint)

module.exports = router