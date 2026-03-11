export default function RewardPopup({show}){

 if(!show) return null

 return(

  <div className="fixed top-10 right-10
  bg-green-600 text-white p-4 rounded">

   🎉 Stage Completed  
   +50 XP

  </div>

 )

}