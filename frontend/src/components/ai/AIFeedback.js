export default function AIFeedback({ result }){

 if(!result) return null

 return(

  <div className="mt-4 border p-4 border-green-500">

   <h3>AI Feedback</h3>

   <p>{result.feedback}</p>

  </div>

 )

}