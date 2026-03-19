// backend/server.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const Stage = require("./models/Stage");

const stageRoutes = require("./routes/stage.routes");
const codeRoutes = require("./routes/code.routes");

const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/stages", stageRoutes);
app.use("/api/code", codeRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);

  // Simple seeding of stages if DB is empty (helpful for dev)
  try {
    const count = await Stage.countDocuments();
    if (count === 0) {
      await Stage.insertMany([
        {
          title: "Haunted HTML Gate",
          description: "Create a button that says 'Enter Dungeon'",
          difficulty: "easy",
          rewardXP: 50,
          unlocked: true,
          meta: { type: "html" },
        },
        {
          title: "CSS Shadow Room",
          description: "Style the button using Tailwind",
          difficulty: "easy",
          rewardXP: 50,
          unlocked: false,
          meta: { type: "css" },
        },
        {
          title: "React Awakening",
          description: "Create a React component with a button",
          difficulty: "medium",
          rewardXP: 75,
          unlocked: false,
          meta: { type: "react" },
        },
      ]);
      console.log("Seeded default stages.");
    }
  } catch (err) {
    console.error("Error seeding stages:", err);
  }
});