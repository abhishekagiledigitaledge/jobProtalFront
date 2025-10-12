"use client";
import React, { useState } from "react";
import RichTextEditor from "../CustomEditor/RichTextEditor";

export default function CreateJob() {
  const [content, setContent] = useState("<p>Initial content</p>");

  const handleSave = () => {
    console.log("Editor Content:", content);
  };

  return (
    <div>
      <RichTextEditor text={content} setText={setContent} />
      <button onClick={handleSave} style={{ marginTop: "10px" }}>
        Save
      </button>
    </div>
  );
}
