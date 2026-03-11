"use client"

import axios from "axios"

export default function SubmitCode({ code, stageId, setResult }) {

  const handleSubmit = async () => {

    const res = await axios.post(
      "http://localhost:5000/api/code/submit",
      {
        stageId,
        code
      }
    )

    setResult(res.data)

  }

  return (
    <button
      onClick={handleSubmit}
      className="bg-red-600 px-6 py-3 mt-4 rounded"
    >
      Submit Code
    </button>
  )
}