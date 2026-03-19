// frontend/src/services/ai.service.js
import axios from "axios";

export async function reviewCode(stageId, code) {
  const res = await axios.post("http://localhost:5000/api/code/submit", {
    stageId,
    code,
  });
  return res.data;
}