import { useEffect, useState } from "react"
import axios from "axios"
import StageCard from "../../components/game/StageCard"

export default function MapPage() {

  const [stages, setStages] = useState([])

  useEffect(()=>{

    const fetchStages = async ()=>{

      const res = await axios.get("http://localhost:5000/api/stages")

      setStages(res.data)
    }

    fetchStages()

  },[])

  return (

    <div className="min-h-screen bg-black text-white p-10">

      <h1 className="text-4xl text-red-500 mb-8 font-bold">
        🧟 The Haunted Learning Map
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {stages.map(stage=>(
          <StageCard key={stage._id} stage={stage}/>
        ))}

      </div>

    </div>

  )

}