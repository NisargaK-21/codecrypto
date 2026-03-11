exports.validateHTMLStage = (code) => {

  if(code.includes("<button") && code.includes("Enter Dungeon")){
    return {
      passed: true,
      feedback: "Correct button implementation"
    }
  }

  return {
    passed: false,
    feedback: "Make sure to create a button with text 'Enter Dungeon'"
  }

}