import React, { useState, useRef, useEffect } from "react";

const FileActionMenu = ({ onDelete, onRename, onDownload, onShowInfo, file }) => {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <div className="file-action-menu" style={{ position: "relative", display: "inline-block" }} ref={menuRef}>
      <button
        className="file-action-menu-btn"
        onClick={e => { e.stopPropagation(); setOpen((prev) => !prev); }}
        aria-label="File actions"
        style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}
      >
        <span style={{ fontSize: "1.3rem", verticalAlign: "middle" }}>⋮</span>
      </button>
      {open && (
        <div className="file-action-menu-dropdown" style={{
          position: "absolute",
          right: 0,
          top: "100%",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.13)",
          borderRadius: "8px",
          minWidth: "140px",
          zIndex: 2000,
          marginTop: "0.5rem",
          padding: "0.3rem 0"
        }}>
          <button className="file-action-menu-item" onClick={() => { setOpen(false); onDelete(file); }}>Delete</button>
          <button className="file-action-menu-item" onClick={() => { setOpen(false); onRename(file); }}>Rename</button>
          <button className="file-action-menu-item" onClick={() => { setOpen(false); onDownload(file); }}>Download</button>
          <button className="file-action-menu-item" onClick={() => { setOpen(false); onShowInfo(file); }}>File Info</button>
        </div>
      )}
    </div>
  );
};

export default FileActionMenu; 