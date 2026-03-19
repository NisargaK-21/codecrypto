// import { useRouter } from "next/router"
// export default function CSSStage(){
// const router = useRouter()
// const handleSubmit = () => {

//   setTimeout(()=>{
//     router.push("/stages/react/stage1")
//   },2000)

// }
//  return (
//   <div className="p-10">
//    <h1 className="text-3xl text-purple-500">
//     CSS Shadow Room
//    </h1>

//    <p>Style the button using Tailwind</p>
//    <button onClick={handleSubmit}>
// Submit Code
// </button>
//   </div>
  
//  )

// }



"use client"

import { useState } from "react"
import { useRouter } from "next/router"

import CodeEditor from "../../../components/editor/CodeEditor"
import SubmitCode from "../../../components/editor/SubmitCode"
import AIFeedback from "../../../components/ai/AIFeedback"
import RewardPopup from "../../../components/game/RewardPopup"

import useXP from "../../../hooks/useXP"

export default function CSSStage(){

 const router = useRouter()

 const [code,setCode] = useState("")
 const [result,setResult] = useState(null)
 const [completed,setCompleted] = useState(false)

 const { addXP } = useXP()

 const handleResult = (data)=>{

  setResult(data)

  if(data.passed){

    addXP(50)

    setCompleted(true)

    setTimeout(()=>{
      router.push("/stages/react/stage1")
    },2000)

  }

 }

 return (

  <div className="p-10">

   <h1 className="text-3xl text-purple-500">
    CSS Shadow Room
   </h1>

   <p className="mb-4">
    Style the button using Tailwind
   </p>

   <CodeEditor
    code={code}
    setCode={setCode}
   />

   <SubmitCode
    code={code}
    stageId={"css-stage"}
    setResult={handleResult}
   />

   <AIFeedback result={result}/>

   <RewardPopup show={completed}/>

  </div>

 )

}