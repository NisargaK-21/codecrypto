// frontend/src/components/editor/SubmitCode.js
"use client"

import axios from "axios"
import { stages } from "@/data/stages"

export default function SubmitCode({ code, stageId, setResult }) {
  const handleSubmit = async () => {
    try {
      // Find the stage data from the frontend
      const stage = stages.find(s => s.id === parseInt(stageId));
      
      const res = await axios.post("http://localhost:5000/api/code/submit", { 
        stageId, 
        code,
        stage, // Send the full stage data including instructions
        stageType: stage?.type // Also send stage type for fallback
      });
      setResult(res.data);
    } catch (err) {
      console.error("submit error:", err?.response?.data || err.message);
      setResult({ passed: false, feedback: err?.response?.data?.feedback || "Failed to submit code" });
    }
  };

  return (
    <button onClick={handleSubmit} className="bg-red-600 px-6 py-3 mt-4 rounded">
      Submit Code
    </button>
  );
}