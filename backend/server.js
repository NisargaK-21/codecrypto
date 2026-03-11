const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")

const stageRoutes = require("./routes/stage.routes")
const codeRoutes = require("./routes/code.routes")

const app = express()

connectDB()

app.use(cors())
app.use(express.json())

app.use("/api/stages", stageRoutes)
app.use("/api/code", codeRoutes)

const PORT = 5000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})