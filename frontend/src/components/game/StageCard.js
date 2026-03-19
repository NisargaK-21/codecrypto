// frontend/src/components/game/StageCard.js
"use client";

import { useRouter } from "next/navigation";

export default function StageCard({ stage }) {
  const router = useRouter();

  const enterStage = () => {
    // Use _id if available; fallback to id
    const id = stage._id || stage.id;
    router.push(`/stages/html/${id}`);
  };

  return (
    <div className="border border-red-600 p-5 rounded bg-neutral-900">
      <h2 className="text-xl text-red-400">{stage.title}</h2>

      <p className="text-gray-400">{stage.description}</p>

      <button
        onClick={enterStage}
        className="bg-red-600 px-4 py-2 mt-3 rounded"
      >
        Enter Stage
      </button>
    </div>
  );
}