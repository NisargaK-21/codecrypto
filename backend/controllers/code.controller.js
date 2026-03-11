const { validateHTMLStage } = require("../utils/validator")

exports.submitCode = async (req, res) => {

  const { stageId, code } = req.body

  let result

  if(stageId == 1){
    result = validateHTMLStage(code)
  }

  if(result.passed){
    return res.json({
      passed:true,
      xpEarned:50,
      feedback: result.feedback
    })
  }

  res.json({
    passed:false,
    feedback: result.feedback
  })

}