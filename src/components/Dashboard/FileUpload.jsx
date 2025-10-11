import React, { useState } from "react";
import "./FileUpload.css";

const FileUpload = ({ onUpload }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploading, setUploading] = useState(false);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
  };

  const handleFiles = (files) => {
    if (files.length === 0) return;
    
    setUploading(true);
    // Simulate upload process
    setTimeout(() => {
      const file = files[0];
      const fileObj = {
        id: Date.now(),
        name: file.name,
        tags: ["new", "uploaded"],
        summary: `Summary of ${file.name}`,
        uploadedAt: new Date().toISOString().split('T')[0],
        owner: "user",
      };
      onUpload(fileObj);
      setUploading(false);
    }, 1500);
  };

  return (
    <div className="upload-container">
      <h3 className="upload-title">Upload File</h3>
      <div
        className={`upload-dropzone ${isDragOver ? 'drag-over' : ''}`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          onChange={handleFileSelect}
          className="upload-input"
          id="file-input"
        />
        <label htmlFor="file-input" className="upload-label">
          <span className="upload-icon">&#128193;</span>
          <div className="upload-text">
            {uploading ? (
              <div>Uploading...</div>
            ) : (
              <>
                <div className="upload-text-title">
                  Drop files here or click to browse
                </div>
                <div className="upload-text-subtitle">
                  Supports PDF, DOC, TXT, and more
                </div>
              </>
            )}
          </div>
        </label>
      </div>
      <div className="upload-encryption-notice">
        <span className="upload-encryption-icon">&#128274;</span>
        Files are encrypted with AES before upload
      </div>
    </div>
  );
};

export default FileUpload; 