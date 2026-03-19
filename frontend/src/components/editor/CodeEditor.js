// frontend/src/components/editor/CodeEditor.js
"use client";

import Editor from "@monaco-editor/react";

export default function CodeEditor({ code, setCode }) {
  return (
    <Editor
      height="400px"
      defaultLanguage="html"
      theme="vs-dark"
      value={code}
      onChange={(value) => setCode(value || "")}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        automaticLayout: true,
      }}
    />
  );
}