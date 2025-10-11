import React from "react";
import "./FileSummaryModal.css";

const FileSummaryModal = ({ file, onClose }) => {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleDownload = () => {
    console.log(`Downloading ${file.name}`);
  };

  const handleDelete = () => {
    console.log(`Deleting ${file.name}`);
    onClose();
  };

  return (
    <div className="modal-backdrop" onClick={handleBackdropClick}>
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="modal-title">File Summary</h2>
          <button onClick={onClose} className="modal-close-button">
            <span>&times;</span>
          </button>
        </div>
        
        <div className="modal-content">
          <div className="modal-file-header">
            <span className="modal-file-icon">&#128193;</span>
            <div className="modal-file-info">
              <h3>{file.name}</h3>
              <p>
                Uploaded on {file.uploadedAt} by {file.owner}
              </p>
            </div>
          </div>

          <div className="modal-section">
            <h4>AI-Generated Summary</h4>
            <p>
              {file.summary}
            </p>
          </div>

          <div className="modal-section">
            <h4>Tags</h4>
            <div className="modal-tags-container">
              {file.tags.map((tag, index) => (
                <span key={index} className="modal-tag">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-actions">
            <button onClick={handleDownload} className="modal-download-button">
              <span className="modal-button-icon">&#128229;</span>
              Download
            </button>
            <button onClick={handleDelete} className="modal-delete-button">
              <span className="modal-button-icon">&#128465;</span>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileSummaryModal; 