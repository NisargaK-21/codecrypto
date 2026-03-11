const { reviewCode } = require("../services/ai.service")

exports.submitCode = async (req,res)=>{

 const { code } = req.body

 const prompt = `
User challenge:
Create a button that says Enter Dungeon.

User code:
${code}

Evaluate the solution.
Return JSON:

{
 "passed": true/false,
 "feedback":"..."
}
`

 const ai = await reviewCode(prompt)

 res.json({
   feedback: ai,
   passed:true
 })

}