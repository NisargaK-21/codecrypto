// frontend/src/hooks/useXP.js
import { useState } from "react";

export default function useXP() {
  const [xp, setXP] = useState(0);

  const addXP = (amount) => {
    setXP((prev) => prev + amount);
    // You could also persist to backend here in the future
    console.log("XP earned:", amount);
  };

  return { xp, addXP };
}