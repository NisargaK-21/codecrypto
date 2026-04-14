// "use client";
// import { useRouter } from "next/navigation"; 
// import { useEffect, useState } from "react";
// import {use} from "react";
// import CodeEditor from "@components/editor/CodeEditor";
// import SubmitCode from "@components/editor/SubmitCode";
// import AIFeedback from "@components/ai/AIFeedback";
// import RewardPopup from "@components/game/RewardPopup";
// import useXP from "@hooks/useXP";
// import axios from "axios";


//  export default function CSSStagePage({ params }) {
//   const router = useRouter();
//   const { id } = use(params); 

//   const [code, setCode] = useState(
//     '<button class="bg-red-600 hover:bg-red-800 text-white px-6 py-3 rounded-lg">Enter Dungeon</button>'
//   );
//   const [result, setResult] = useState(null);
//   const [completed, setCompleted] = useState(false);
//   const { addXP } = useXP();

//   useEffect(() => {
//     if (result?.passed) {
//       addXP(50);
//       setCompleted(true);

//       const timer = setTimeout(() => {
//         router.push("/stages/react/stage1");
//       }, 1200);

//       return () => clearTimeout(timer);
//     }
//   }, [result, addXP, router]);

//   const handleResult = (data) => setResult(data);

//   // ⚠️ Prevent undefined crash on first render
//   if (!id) return <div className="p-10 text-white">Loading...</div>;

//   return (
//     <div className="p-10">
//       <h1 className="text-3xl text-purple-500">CSS Shadow Room</h1>
//       <p className="mb-4">Style the button using Tailwind</p>

//       <CodeEditor value={code} code={code} setCode={setCode} />

//       <SubmitCode code={code} stageId={id} setResult={handleResult} />

//       <AIFeedback result={result} />
//       <RewardPopup show={completed} />
//     </div>
//   );
// }





"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";

import CodeEditor from "@/components/editor/CodeEditor";
import SubmitCode from "@/components/editor/SubmitCode";
import AIFeedback from "@/components/ai/AIFeedback";
import RewardPopup from "@/components/game/RewardPopup";
import useXP from "@/hooks/useXP";

export default function StagePage() {
  const router = useRouter();
  const params = useParams();
  const stageId = params?.id;

  const [code, setCode] = useState(`
button {
  background-color: black;
  color: red;
}
  `);

  const [result, setResult] = useState(null);
  const [completed, setCompleted] = useState(false);
  const { addXP } = useXP();

  const handleResult = (data) => {
    if (!data) return;
    setResult(data);

    if (data.passed) {
      addXP(70); // slightly higher reward
      setCompleted(true);

      setTimeout(() => {
        router.push("/stages/react/stage1");
      }, 1500);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl text-purple-500">Cursed CSS Chamber</h1>

      <CodeEditor code={code} setCode={setCode} />

      <SubmitCode code={code} stageId={stageId} setResult={handleResult} />

      <AIFeedback result={result} />

      <RewardPopup show={completed} />
    </div>
  );
}