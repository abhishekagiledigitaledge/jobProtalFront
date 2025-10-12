// "use client";

// import React, { useState } from "react";
// import CkEditor from "../CustomEditor/CkEditor";

// const CreateJob = () => {
//   const [editorData, setEditorData] = useState("");
//   const [data, setData] = useState("");
//   const [formData, setFormData] = useState({title: '', isResult: false, isAdmitCard: false, postDate: null })

//   const handleOnUpdate = (editor, field) => {
//     if (field === "description") {
//       console.log("Editor data field:", editor);
//       setData(editor);
//     }
//   };

//   return (
//     <div >
//       <CkEditor
//         editorData={editorData}
//         setEditorData={setEditorData}
//         handleOnUpdate={handleOnUpdate}
//       />
//       {/* <div className="text-black" dangerouslySetInnerHTML={{ __html: data }} /> */}
//     </div>
//   );
// };

// export default CreateJob;
"use client";
import React, { useState } from "react";
import CkEditor from "../CustomEditor/CkEditor";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import "./CreateJob.css";

const CreateJob = () => {
  const [editorData, setEditorData] = useState("");
  const [data, setData] = useState("");
  const [formData, setFormData] = useState({
    title: "",
    isResult: false,
    isAdmitCard: false,
    postDate: "",
  });

  const handleOnUpdate = (editor, field) => {
    if (field === "description") {
      setData(editor);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ ...formData, description: data });
    alert("Job Created Successfully!");
  };

  return (
    <div className="create-job-container">
      {/* Header Links */}
      <div className="header-links">
        <a href="#" className="back-link">
          <FaArrowLeft /> Back
        </a>
        <a href="#" className="view-link">
          <FaEye /> View All
        </a>
      </div>

      <div className="form-card">
        <h2>Create Job Post</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title..."
              required
            />
          </div>

          <div className="form-group">
            <label>Post Date</label>
            <input
              type="date"
              name="postDate"
              value={formData.postDate}
              onChange={handleChange}
            />
          </div>

          <div className="checkbox-group">
            <label>
              <input
                type="checkbox"
                name="isResult"
                checked={formData.isResult}
                onChange={handleChange}
              />
              Is Result Available
            </label>

            <label>
              <input
                type="checkbox"
                name="isAdmitCard"
                checked={formData.isAdmitCard}
                onChange={handleChange}
              />
              Is Admit Card Available
            </label>
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <CkEditor
              editorData={editorData}
              setEditorData={setEditorData}
              handleOnUpdate={handleOnUpdate}
            />
          </div>

          <button type="submit" className="submit-btn">
            Create Job
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
