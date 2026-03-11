"use client";

import { useParams } from "next/navigation";

export default function StagePage() {

  const params = useParams();
  const id = params.id;

  return (
    <div className="p-10">
      <h1>Stage ID: {id}</h1>
      <p>This is the HTML challenge page.</p>
    </div>
  );
}