// frontend/src/components/ai/AIFeedback.js
export default function AIFeedback({ result }) {
  if (!result) return null;

  return (
    <div className="mt-4 border p-4 border-green-500 rounded bg-black/60">
      <h3 className="font-semibold">AI Feedback</h3>
      <p className="mt-2">{result.feedback}</p>
      {result.improvement ? (
        <pre className="mt-2 p-2 bg-gray-900 text-sm rounded">{result.improvement}</pre>
      ) : null}
    </div>
  );
}