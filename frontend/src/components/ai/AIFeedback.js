export default function AIFeedback({ result }) {

  if (!result) return null

  return (

    <div className="mt-4 p-4 border border-green-500">

      <h3>Result</h3>

      <p>{result.feedback}</p>

      {result.passed && (
        <p className="text-green-500">
          Stage Completed
        </p>
      )}

    </div>

  )
}