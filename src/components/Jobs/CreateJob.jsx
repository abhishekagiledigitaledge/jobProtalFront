// "use client";
// import React, { useState } from "react";
// import CkEditor from "../CustomEditor/CkEditor";
// import { FaArrowLeft, FaEye } from "react-icons/fa";
// import "./CreateJob.css";
// import { fetcher } from "../fetcher";

// const CreateJob = () => {
//   const [editorData, setEditorData] = useState("");
//   const [data, setData] = useState("");

//   const [formData, setFormData] = useState({
//     title: "",
//     isResult: false,
//     isAdmitCard: false,
//     postDate: "",
//   });

//   const [seoData, setSeoData] = useState({
//     seo_title: "",
//     seo_keywords: "",
//     seo_published_date: "",
//     seo_description: "",
//   });

//   const handleOnUpdate = (editor, field) => {
//     if (field === "description") {
//       setData(editor);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     if (name.startsWith("seo_")) {
//       setSeoData({
//         ...seoData,
//         [name]: type === "checkbox" ? checked : value,
//       });
//     } else {
//       setFormData({
//         ...formData,
//         [name]: type === "checkbox" ? checked : value,
//       });
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     console.log({
//       ...formData,
//       description: data,
//       ...seoData
//     });
//     try {
//       const response_data = await fetcher("/naukari", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...formData,
//           description: data,
//           ...seoData
//         }),
//         credentials: "include",
//       });

//       console.log("Created Successfully", response_data);
//     } catch (error) {
//       console.error("Creating failed:", error.message);
//     }
//   };

//   return (
//     <div className="create-job-container">
//       {/* Header Links */}
//       <div className="header-links">
//         <a href="#" className="back-link">
//           <FaArrowLeft /> Back
//         </a>
//         <a href="#" className="view-link">
//           <FaEye /> View All
//         </a>
//       </div>

//       <div className="form-card">
//         <h2>Create Job Post</h2>

//         <form onSubmit={handleSubmit}>
//           {/* Basic Job Info */}
//           <div className="form-group">
//             <label>Job Title</label>
//             <input
//               type="text"
//               name="title"
//               value={formData.title}
//               onChange={handleChange}
//               placeholder="Enter job title..."

//             />
//           </div>

//           <div className="form-group">
//             <label>Post Date</label>
//             <input
//               type="date"
//               name="postDate"
//               value={formData.postDate}
//               onChange={handleChange}
//             />
//           </div>

//           <div className="checkbox-group">
//             <label>
//               <input
//                 type="checkbox"
//                 name="isResult"
//                 checked={formData.isResult}
//                 onChange={handleChange}
//               />
//               Is Result Available
//             </label>

//             <label>
//               <input
//                 type="checkbox"
//                 name="isAdmitCard"
//                 checked={formData.isAdmitCard}
//                 onChange={handleChange}
//               />
//               Is Admit Card Available
//             </label>
//           </div>

//           <div className="form-group">
//             <label>Job Description</label>
//             <CkEditor
//               editorData={editorData}
//               setEditorData={setEditorData}
//               handleOnUpdate={(data) => handleOnUpdate(data, "description")}
//             />
//           </div>

//           {/* SEO Section */}
//           <div className="seo-section">
//             <h3>SEO Details</h3>

//             <div className="form-group">
//               <label>SEO Title</label>
//               <input
//                 type="text"
//                 name="seo_title"
//                 value={seoData.seo_title}
//                 onChange={handleChange}
//                 placeholder="Enter SEO title..."
//               />
//             </div>

//             <div className="form-group">
//               <label>SEO Keywords</label>
//               <input
//                 type="text"
//                 name="seo_keywords"
//                 value={seoData.seo_keywords}
//                 onChange={handleChange}
//                 placeholder="Enter comma-separated keywords..."
//               />
//             </div>

//             <div className="form-group">
//               <label>SEO Published Date</label>
//               <input
//                 type="date"
//                 name="seo_published_date"
//                 value={seoData.seo_published_date}
//                 onChange={handleChange}
//               />
//             </div>

//             <div className="form-group">
//               <label>SEO Description</label>
//               <input
//                 type="text"
//                 name="seo_description"
//                 value={seoData.seo_description}
//                 onChange={handleChange}
//                 placeholder="Enter SEO Description..."
//               />
//             </div>
//           </div>

//           <button type="submit" className="submit-btn">
//             Create Job
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateJob;
"use client";
import React, { useState } from "react";
import CkEditor from "../CustomEditor/CkEditor";
import { FaArrowLeft, FaEye } from "react-icons/fa";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const CreateJob = () => {
  const [editorData, setEditorData] = useState("");
  const [seoEditorData, setSeoEditorData] = useState("");
  const [data, setData] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    isResult: false,
    isAdmitCard: false,
    postDate: "",
  });

  const [seoData, setSeoData] = useState({
    seo_title: "",
    seo_keywords: "",
    seo_published_date: "",
    seo_description: "",
  });

  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  const handleOnUpdate = (editor, field) => {
    if (field === "description") setData(editor);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (name.startsWith("seo_")) {
      setSeoData({ ...seoData, [name]: type === "checkbox" ? checked : value });
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = "Job title is required";
    if (!formData.postDate) newErrors.postDate = "Post date is required";
    if (!data.trim()) newErrors.description = "Job description is required";

    // Optional SEO validation
    if (seoData.seo_title && seoData.seo_title.length < 5)
      newErrors.seo_title = "SEO title must be at least 5 characters";
    if (seoData.seo_keywords && seoData.seo_keywords.length < 3)
      newErrors.seo_keywords = "Enter valid SEO keywords";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    try {
      const response_data = await fetcher("/naukari", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, description: data, ...seoData, seo_description: seoEditorData }),
        credentials: "include",
      });

      setMessage({ type: "success", text: "Job created successfully!" });
      setFormData({ title: "", isResult: false, isAdmitCard: false, postDate: "" });
      setSeoData({ seo_title: "", seo_keywords: "", seo_published_date: "", seo_description: "" });
      setEditorData("");
      setSeoEditorData("");
      setData("");
      setErrors({});
    } catch (error) {
      setMessage({ type: "error", text: error.message || "Failed to create job" });
    }
  };

  return (
    <div className="create-job-container">
      {/* Header Links */}
      <div className="header-links">
        <a href="#" className="back-link"><FaArrowLeft /> Back</a>
        <a href="#" className="view-link"><FaEye /> View All</a>
      </div>

      <div className="form-card">
        <h2>Create Job Post</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Basic Job Info */}
          <div className="form-group">
            <label>Job Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter job title..."
            />
            {errors.title && <span className="error">{errors.title}</span>}
          </div>

          <div className="form-group">
            <label>Post Date</label>
            <input
              type="date"
              name="postDate"
              value={formData.postDate}
              onChange={handleChange}
            />
            {errors.postDate && <span className="error">{errors.postDate}</span>}
          </div>

          <div className="checkbox-group">
            <label>
              <input type="checkbox" name="isResult" checked={formData.isResult} onChange={handleChange} />
              Is Result Available
            </label>
            <label>
              <input type="checkbox" name="isAdmitCard" checked={formData.isAdmitCard} onChange={handleChange} />
              Is Admit Card Available
            </label>
          </div>

          <div className="form-group">
            <label>Job Description</label>
            <CkEditor editorData={editorData} setEditorData={setEditorData} handleOnUpdate={(data) => handleOnUpdate(data, "description")} />
            {errors.description && <span className="error">{errors.description}</span>}
          </div>

          {/* SEO Section */}
          <div className="seo-section">
            <h3>SEO Details</h3>

            <div className="form-group">
              <label>SEO Title</label>
              <input type="text" name="seo_title" value={seoData.seo_title} onChange={handleChange} placeholder="Enter SEO title..." />
              {errors.seo_title && <span className="error">{errors.seo_title}</span>}
            </div>

            <div className="form-group">
              <label>SEO Keywords</label>
              <input type="text" name="seo_keywords" value={seoData.seo_keywords} onChange={handleChange} placeholder="Enter comma-separated keywords..." />
              {errors.seo_keywords && <span className="error">{errors.seo_keywords}</span>}
            </div>

            <div className="form-group">
              <label>SEO Published Date</label>
              <input type="date" name="seo_published_date" value={seoData.seo_published_date} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>SEO Description</label>
              <input type="text" name="seo_description" value={seoData.seo_description} onChange={handleChange} placeholder="Enter SEO Description..." />
            </div>
          </div>

          <button type="submit" className="submit-btn">Create Job</button>
        </form>
      </div>
    </div>
  );
};

export default CreateJob;
