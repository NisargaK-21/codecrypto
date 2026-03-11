import { useState } from "react"

export default function useStage(){

  const [stage,setStage] = useState(null)

  return {stage,setStage}

}