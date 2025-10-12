// "use client";
// import React, { useState } from "react";
// import RichTextEditor from "../CustomEditor/RichTextEditor";

// export default function CreateJob() {
//   const [content, setContent] = useState("<p>Initial content</p>");

//   const handleSave = () => {
//     console.log("Editor Content:", content);
//   };

//   return (
//     <div>
//       <RichTextEditor text={content} setText={setContent} />
//       <button onClick={handleSave} style={{ marginTop: "10px" }}>
//         Save
//       </button>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import CkEditor from "../CustomEditor/CkEditor";

const CreateJob = () => {
  const [editorData, setEditorData] = useState("");
  const [data, setData] = useState("");

  const handleOnUpdate = (editor, field) => {
    if (field === "description") {
      console.log("Editor data field:", editor);
      setData(editor);
    }
  };

  return (
    <div className="max-w-3xl mx-auto">
      <CkEditor
        editorData={editorData}
        setEditorData={setEditorData}
        handleOnUpdate={handleOnUpdate}
      />
      <div className="text-black" dangerouslySetInnerHTML={{ __html: data }} />
    </div>
  );
};

export default CreateJob;
