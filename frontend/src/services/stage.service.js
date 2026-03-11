import axios from "axios"

export async function getStages(){

  const res = await axios.get(
    "http://localhost:5000/api/stages"
  )

  return res.data
}