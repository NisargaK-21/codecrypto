import { useState } from "react"

export default function useXP(){

 const [xp,setXP] = useState(0)

 const addXP = (amount)=>{
   setXP(prev => prev + amount)
 }

 return {xp,addXP}

}