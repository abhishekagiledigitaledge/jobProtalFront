"use client";
import React, { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import imageCompression from "browser-image-compression";
import "./CreateJob.css";
import { fetcher } from "../fetcher";

const CreateSection = ({ handleCloseForm, editData }) => {
  const [formData, setFormData] = useState({
    display_name: "",
    url: "",
    img_url: null,
  });

  const [preview, setPreview] = useState(null);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState({ type: "", text: "" });
  const isEditMode = !!editData;

  // ✅ Prefill data when editing
  useEffect(() => {
    if (isEditMode && editData) {
      setFormData({
        display_name: editData.display_name || "",
        url: editData.url || "",
        img_url: null, // File upload will replace this
      });
      // setPreview(`http://localhost:5500${editData.img_url}`);
      setPreview(`https://jobportalapp.agileappdemo.com/backend${editData.img_url}`);
    }
  }, [editData]);

  // ✅ Handle input & compress image if large
  const handleChange = async (e) => {
    const { name, value, type, files } = e.target;

    if (type === "file" && files.length > 0) {
      const file = files[0];
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      try {
        let compressedFile = file;

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
    if (!isEditMode && !formData.img_url)
      newErrors.img_url = "Image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Submit form (Create or Edit)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage({ type: "", text: "" });

    if (!validateForm()) return;

    try {
      const data = new FormData();
      data.append("display_name", formData.display_name);
      data.append("url", formData.url);

      if (formData.img_url instanceof File) {
        data.append("img_url", formData.img_url);
      }

      const method = isEditMode ? "PUT" : "POST";
      const endpoint = isEditMode
        ? `/section/${editData.section_id}`
        : "/section";

      const result = await fetcher(endpoint, {
        method,
        body: data,
        credentials: "include",
      });

      if (result.success) {
        setMessage({
          type: "success",
          text: `Section ${isEditMode ? "updated" : "created"} successfully!`,
        });

        // Reset form after success
        if (!isEditMode) {
          setFormData({ display_name: "", url: "", img_url: null });
          setPreview(null);
        }

        setErrors({});
        setTimeout(() => handleCloseForm(), 800);
      } else {
        setMessage({
          type: "error",
          text: result.message || "Operation failed",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: error.message || "Something went wrong",
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
        <h2>{isEditMode ? "Edit Section" : "Create Section"}</h2>

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
            {isEditMode ? "Update Section" : "Create Section"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateSection;


