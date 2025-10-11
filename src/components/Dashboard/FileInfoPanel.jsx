import React from "react";

const FileInfoPanel = ({ file, onClose }) => {
  if (!file) return null;
  return (
    <div className="file-info-panel" style={{
      position: "fixed",
      right: 32,
      top: 80,
      background: "#fff",
      borderRadius: 12,
      boxShadow: "0 4px 24px rgba(0,0,0,0.13)",
      minWidth: 260,
      maxWidth: 340,
      zIndex: 3000,
      padding: "1.5rem 1.5rem 1.2rem 1.5rem"
    }}>
      <button onClick={onClose} style={{ position: "absolute", top: 10, right: 14, background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#888" }}>&times;</button>
      <h3 style={{ margin: 0, marginBottom: 12, color: "#1a2236", fontWeight: 700 }}>{file.name}</h3>
      <div style={{ marginBottom: 8 }}><strong>Type:</strong> {file.type ? file.type.toUpperCase() : file.name.split('.').pop().toUpperCase()}</div>
      <div style={{ marginBottom: 8 }}><strong>Size:</strong> {file.size || '—'}</div>
      <div style={{ marginBottom: 8 }}><strong>Uploaded:</strong> {file.uploadedAt}</div>
      <div style={{ marginBottom: 8 }}><strong>Tags:</strong> {file.tags && file.tags.length ? file.tags.join(', ') : '—'}</div>
      <div style={{ marginBottom: 0 }}><strong>Summary:</strong> <div style={{ color: '#374151', marginTop: 4 }}>{file.summary}</div></div>
    </div>
  );
};

export default FileInfoPanel; 