exports.submitCode = async (req,res)=>{
  res.json({
    passed:true,
    feedback:"Code submitted"
  })
}

exports.getHint = async (req,res)=>{
  res.json({
    hint:"Try using a button element"
  })
}