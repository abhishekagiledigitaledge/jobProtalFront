// "use client";
// import React, { useState } from "react";
// import { FaArrowLeft } from "react-icons/fa";
// import "./CreateJob.css";
// import { fetcher } from "../fetcher";

// const CreateSection = ({ handleCloseForm }) => {
//   const [formData, setFormData] = useState({
//     display_name: "",
//     url: "",
//   });

//   const [errors, setErrors] = useState({});
//   const [message, setMessage] = useState({ type: "", text: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
//   };

//   // ✅ Validation
//   const validateForm = () => {
//     const newErrors = {};

//     if (!formData.display_name.trim()) newErrors.title = "Display Name is required";
//     if (!formData.url) newErrors.postDate = "URL is required";

//     setErrors(newErrors);
//     return Object.keys(newErrors).length === 0;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage({ type: "", text: "" });

//     if (!validateForm()) return;

//     try {
//       const payload = {
//         ...formData,
//       };

//       const result = await fetcher("/section", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(payload),
//         credentials: "include",
//       });

//       if (result.success) {
//         setMessage({ type: "success", text: "Job created successfully!" });
//         setFormData({ display_name: "", url: "" });
//         setErrors({});
//         handleCloseForm();
//       } else {
//         setMessage({ type: "error", text: result.message || "Failed to create job" });
//       }
//     } catch (error) {
//       setMessage({ type: "error", text: error.message || "Failed to create job" });
//     }
//   };

//   return (
//     <div className="create-job-container">
//       <div className="header-links">
//         <a className="back-link" onClick={handleCloseForm}>
//           <FaArrowLeft /> Back
//         </a>
//       </div>

//       <div className="form-card">
//         <h2>Create Section</h2>

//         {message.text && (
//           <div className={`message ${message.type}`}>{message.text}</div>
//         )}

//         <form onSubmit={handleSubmit}>
//           {/* Basic Job Info */}
//           <div className="form-group">
//             <label>Display Name</label>
//             <input
//               type="text"
//               name="display_name"
//               value={formData.display_name}
//               onChange={handleChange}
//               placeholder="Enter Display Name..."
//             />
//             {errors.display_name && <span className="error">{errors.display_name}</span>}
//           </div>

//           <div className="form-group">
//             <label>URL</label>
//             <input
//               type="text"
//               name="url"
//               value={formData.url}
//               onChange={handleChange}
//               placeholder="Enter URL..."
//             />
//             {errors.url && <span className="error">{errors.url}</span>}
//           </div>


//           <button type="submit" className="submit-btn">
//             Create Section
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateSection;
"use client";
import React, { useState } from "react";
import { FaArrowLeft } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const CreateSection = ({ handleCloseForm }) => {
  const [formData, setFormData] = useState({
    display_name: "",
    url: "",
    img_url: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });

  // ✅ Handle input & compress image if large
  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];

      // If image is large, compress it
      const options = {
        maxSizeMB: 0.5, // Target max size (500KB)
        maxWidthOrHeight: 800, // Resize longer side if large
        useWebWorker: true,
      };

      try {
        let compressedFile = file;

        // Compress only if larger than 1MB
        if (file.size / 1024 / 1024 > 1) {
          compressedFile = await imageCompression(file, options);
          console.log(
            `Compressed from ${(file.size / 1024 / 1024).toFixed(2)} MB → ${(compressedFile.size / 1024 / 1024).toFixed(2)} MB`
          );
        }

        setFormData({ ...formData, img_url: compressedFile });
        setPreview(URL.createObjectURL(compressedFile));
      } catch (error) {
        console.error("Image compression failed:", error);
        setMessage({ type: "error", text: "Image compression failed" });
      }
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // ✅ Validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.display_name.trim())
      newErrors.display_name = "Display Name is required";
    if (!formData.url.trim()) newErrors.url = "URL is required";
    if (!formData.img_url) newErrors.img_url = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    try {
      const data = new FormData();
      data.append("display_name", formData.display_name);
      data.append("url", formData.url);
      data.append("img_url", formData.img_url);

      const result = await fetcher("/section", {
        method: "POST",
        body: data,
        credentials: "include",
      });

      if (result.success) {
        setMessage({ type: "success", text: "Section created successfully!" });
        setFormData({ display_name: "", url: "", img_url: null });
        setPreview(null);
        setErrors({});
        handleCloseForm();
      } else {
        setMessage({
          type: "error",
          text: result.message || "Failed to create section",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Failed to create section",
      });
    }
  };

  return (
    <div className="create-job-container">
      <div className="header-links">
        <a className="back-link" onClick={handleCloseForm}>
          <FaArrowLeft /> Back
        </a>
      </div>

      <div className="form-card">
        <h2>Create Section</h2>

        {message.text && (
          <div className={`message ${message.type}`}>{message.text}</div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
          <div className="form-group">
            <label>Display Name</label>
            <input
              type="text"
              name="display_name"
              value={formData.display_name}
              onChange={handleChange}
              placeholder="Enter Display Name..."
            />
            {errors.display_name && (
              <span className="error">{errors.display_name}</span>
            )}
          </div>

          <div className="form-group">
            <label>URL</label>
            <input
              type="text"
              name="url"
              value={formData.url}
              onChange={handleChange}
              placeholder="Enter URL..."
            />
            {errors.url && <span className="error">{errors.url}</span>}
          </div>

          <div className="form-group">
            <label>Section Image</label>
            <input
              type="file"
              name="img_url"
              accept="image/*"
              onChange={handleChange}
            />
            {errors.img_url && <span className="error">{errors.img_url}</span>}
            {preview && (
              <img
                src={preview}
                alt="Preview"
                style={{
                  marginTop: "10px",
                  width: "120px",
                  height: "auto",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>

          <button type="submit" className="submit-btn">
            Create Section
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSection;

