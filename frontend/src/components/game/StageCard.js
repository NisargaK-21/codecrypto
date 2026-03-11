import { useRouter } from "next/router";

export default function StageCard({ stage }) {

  const router = useRouter();

  const handleEnterStage = () => {
    if (!stage.unlocked) return;

    router.push(`/stages/html/stage${stage._id}`)
  };

  return (
    <div
      className={`border rounded-xl p-6 transition duration-300
      ${
        stage.unlocked
          ? "border-red-600 hover:bg-red-900 cursor-pointer"
          : "border-gray-700 opacity-50"
      }`}
    >
      <h2 className="text-xl text-red-400 font-semibold mb-2">
        {stage.title}
      </h2>

      <p className="text-gray-400 mb-4">
        {stage.description || "Locked stage"}
      </p>

      {stage.unlocked ? (
        <button
          onClick={handleEnterStage}
          className="bg-red-600 px-4 py-2 rounded hover:bg-red-700"
        >
          Enter Stage
        </button>
      ) : (
        <span className="text-gray-500">🔒 Locked</span>
      )}
    </div>
  );
}