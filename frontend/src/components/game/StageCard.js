"use client"

import { useRouter } from "next/navigation"

export default function StageCard({ stage }) {

  const router = useRouter()

  const enterStage = () => {
    router.push(`/stages/html/${stage._id}`)
  }

  return (

    <div className="border border-red-600 p-5 rounded">

      <h2 className="text-xl text-red-400">
        {stage.title}
      </h2>

      <p className="text-gray-400">
        {stage.description}
      </p>

      <button
        onClick={enterStage}
        className="bg-red-600 px-4 py-2 mt-3 rounded"
      >
        Enter Stage
      </button>

    </div>

  )
}