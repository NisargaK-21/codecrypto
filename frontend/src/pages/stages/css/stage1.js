import { useRouter } from "next/router"
export default function CSSStage(){
const router = useRouter()
const handleSubmit = () => {

  setTimeout(()=>{
    router.push("/stages/react/stage1")
  },2000)

}
 return (
  <div className="p-10">
   <h1 className="text-3xl text-purple-500">
    CSS Shadow Room
   </h1>

   <p>Style the button using Tailwind</p>
   <button onClick={handleSubmit}>
Submit Code
</button>
  </div>
  
 )

}