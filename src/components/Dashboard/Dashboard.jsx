import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import FileUpload from "./FileUpload";
import FileSummaryModal from "./FileSummaryModal";
import FileActionMenu from "./FileActionMenu";
import FileInfoPanel from "./FileInfoPanel";
import { FiPlus } from "react-icons/fi";
import "./Dashboard.css";

const initialFiles = [
  {
    id: 1,
    name: "ProjectProposal.pdf",
    tags: ["proposal", "pdf"],
    summary: "A summary of the project proposal document.",
    uploadedAt: "2024-06-01",
    owner: "admin",
  },
  {
    id: 2,
    name: "MeetingNotes.docx",
    tags: ["meeting", "notes"],
    summary: "Key points from the last team meeting.",
    uploadedAt: "2024-06-02",
    owner: "user1",
  },
];

const Dashboard = () => {
  const [files, setFiles] = useState(initialFiles);
  const [searchResults, setSearchResults] = useState(initialFiles);
  const [selectedFile, setSelectedFile] = useState(null);
  const [currentPath, setCurrentPath] = useState(["MyVault"]);
  const [hoveredFileId, setHoveredFileId] = useState(null);
  const [showTooltipId, setShowTooltipId] = useState(null);
  const [tooltipCoords, setTooltipCoords] = useState({ x: 0, y: 0, width: 0 });
  const tooltipTimer = useRef(null);
  const filenameRefs = useRef({});
  const [renamingFileId, setRenamingFileId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  const [infoFileId, setInfoFileId] = useState(null);
  const [addDropdownOpen, setAddDropdownOpen] = useState(false);
  const addDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (addDropdownRef.current && !addDropdownRef.current.contains(event.target)) {
        setAddDropdownOpen(false);
      }
    };
    if (addDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [addDropdownOpen]);

  const handleBackTo = (index) => {
    setCurrentPath((prev) => prev.slice(0, index + 1));
  };

  // Tooltip logic for file row (filename cell)
  const handleFileNameEnter = (fileId) => {
    setHoveredFileId(fileId);
    const node = filenameRefs.current[fileId];
    if (node) {
      const rect = node.getBoundingClientRect();
      setTooltipCoords({ x: rect.left, y: rect.bottom, width: rect.width });
    }
    tooltipTimer.current = setTimeout(() => setShowTooltipId(fileId), 1000);
  };
  const handleFileNameLeave = () => {
    setHoveredFileId(null);
    setShowTooltipId(null);
    clearTimeout(tooltipTimer.current);
  };

  const handleDelete = (file) => {
    setFiles((prev) => prev.filter(f => f.id !== file.id));
    setSearchResults((prev) => prev.filter(f => f.id !== file.id));
  };
  const handleRename = (file) => {
    setRenamingFileId(file.id);
    setRenameValue(file.name);
  };
  const handleRenameChange = (e) => setRenameValue(e.target.value);
  const handleRenameSubmit = (file) => {
    setFiles((prev) => prev.map(f => f.id === file.id ? { ...f, name: renameValue } : f));
    setSearchResults((prev) => prev.map(f => f.id === file.id ? { ...f, name: renameValue } : f));
    setRenamingFileId(null);
  };
  const handleRenameBlur = (file) => handleRenameSubmit(file);
  const handleDownload = (file) => {
    // Simulate download (replace with real logic)
    alert(`Downloading ${file.name}`);
  };
  const handleShowInfo = (file) => setInfoFileId(file.id);
  const handleCloseInfo = () => setInfoFileId(null);

  return (
    <div className="dashboard" style={{ width: "100%", height: "100%" }}>
      {/* Breadcrumb Path - at the very top */}
      <div className="dashboard-breadcrumb">
        {currentPath.map((folder, idx) => (
          <span key={idx} className="breadcrumb-segment" onClick={() => handleBackTo(idx)}>
            {folder}
            {idx < currentPath.length - 1 && <span className="breadcrumb-separator"> &gt; </span>}
          </span>
        ))}
        <span className="breadcrumb-upload" title="Add" style={{ position: 'relative' }} ref={addDropdownRef}>
          <FiPlus onClick={() => setAddDropdownOpen((prev) => !prev)} style={{ cursor: 'pointer' }} />
          {addDropdownOpen && (
            <div style={{
              position: 'absolute',
              top: '110%',
              right: 0,
              background: '#fff',
              boxShadow: '0 2px 8px rgba(0,0,0,0.13)',
              borderRadius: 8,
              minWidth: 120,
              zIndex: 2000,
              padding: '0.3rem 0',
            }}>
              <button style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: '0.5rem 1rem', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setAddDropdownOpen(false); /* TODO: Add file logic */ }}>Add file</button>
              <button style={{ display: 'block', width: '100%', background: 'none', border: 'none', padding: '0.5rem 1rem', textAlign: 'left', cursor: 'pointer' }} onClick={() => { setAddDropdownOpen(false); /* TODO: Add folder logic */ }}>Add folder</button>
            </div>
          )}
        </span>
      </div>
      {/* File Table */}
      <div className="dashboard-table-container">
        <table className="dashboard-file-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Date Modified</th>
              <th>File Size</th>
              <th>File Type</th>
            </tr>
          </thead>
          <tbody>
            {searchResults.map((file) => (
              <tr key={file.id} className="dashboard-file-row">
                <td
                  style={{ position: "relative" }}
                  onMouseEnter={() => handleFileNameEnter(file.id)}
                  onMouseLeave={handleFileNameLeave}
                >
                  <span
                    className="filename-wrapper"
                    ref={el => (filenameRefs.current[file.id] = el)}
                  >
                    {renamingFileId === file.id ? (
                      <input
                        type="text"
                        value={renameValue}
                        autoFocus
                        onChange={handleRenameChange}
                        onBlur={() => handleRenameBlur(file)}
                        onKeyDown={e => { if (e.key === "Enter") handleRenameSubmit(file); }}
                        style={{ background: "#e3f2fd", color: "#1769aa", border: "1.5px solid #4fd1c5", borderRadius: 4, padding: "0.1rem 0.4rem", fontWeight: 600 }}
                      />
                    ) : (
                      file.name
                    )}
                  </span>        
                  {/* Tooltip rendered in portal */}
                  {showTooltipId === file.id && createPortal(
                    <div
                      className="dashboard-summary-tooltip"
                      style={{
                        position: "fixed",
                        left: tooltipCoords.x,
                        top: tooltipCoords.y + 4,
                        minWidth: "220px",
                        maxWidth: "340px",
                        zIndex: 1000,
                        pointerEvents: "none"
                      }}
                    >
                      <strong>Summary:</strong>
                      <div>{file.summary}</div>
                    </div>,
                    document.body
                  )}
                </td>
                <td>{file.uploadedAt}</td>
                <td>{file.size || "\u2014"}</td>
                <td>{file.type ? file.type.toUpperCase() : file.name.split(".").pop().toUpperCase()}</td>
                {/* 3-dots menu */}
                <td>
                <FileActionMenu
                  file={file}
                  onDelete={handleDelete}
                  onRename={handleRename}
                  onDownload={handleDownload}
                  onShowInfo={handleShowInfo}
                />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selectedFile && (
        <FileSummaryModal file={selectedFile} onClose={() => setSelectedFile(null)} />
      )}
      {infoFileId && (
        <FileInfoPanel
          file={files.find(f => f.id === infoFileId)}
          onClose={handleCloseInfo}
        />
      )}
    </div>
  );
};

export default Dashboard; 