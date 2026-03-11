"use client"

import { useState } from "react"
import { useParams } from "next/navigation"

import CodeEditor from "@/components/editor/CodeEditor"
import SubmitCode from "@/components/editor/SubmitCode"
import AIFeedback from "@/components/ai/AIFeedback"
import RewardPopup from "@/components/game/RewardPopup"

import useXP from "@/hooks/useXP"

export default function StagePage(){

 const params = useParams()

 const stageId = params.id

 const [code,setCode] = useState("")
 const [result,setResult] = useState(null)
 const [completed,setCompleted] = useState(false)

 const { addXP } = useXP()

 const handleResult = (data)=>{

   setResult(data)

   if(data.passed){
     addXP(50)
     setCompleted(true)
   }

 }

 return(

  <div className="p-10">

   <h1 className="text-3xl text-red-500">
    Haunted HTML Gate
   </h1>

   <CodeEditor
    code={code}
    setCode={setCode}
   />

   <SubmitCode
    code={code}
    stageId={stageId}
    setResult={handleResult}
   />

   <AIFeedback result={result}/>

   <RewardPopup show={completed}/>

  </div>

 )

}