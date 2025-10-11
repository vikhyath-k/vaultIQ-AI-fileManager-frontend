import React, { useState } from "react";
import "./TagFilter.css";

const TagFilter = () => {
  // Simulated tag data
  const [availableTags] = useState([
    "proposal", "pdf", "meeting", "notes", "new", "uploaded", "document", "report"
  ]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleTagToggle = (tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return (
    <div className="tag-filter-container">
      <div className="tag-filter-header">
        <span>Available Tags</span>
      </div>
      <div className="tag-filter-tags">
        {availableTags.map((tag) => (
          <label key={tag} className="tag-filter-label">
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagToggle(tag)}
              className="tag-filter-checkbox"
            />
            <span className="tag-filter-text">{tag}</span>
          </label>
        ))}
      </div>
      {selectedTags.length > 0 && (
        <div className="tag-filter-selected">
          <span>Selected:</span>
          <div className="tag-filter-selected-tags">
            {selectedTags.map((tag) => (
              <span key={tag} className="tag-filter-selected-tag">
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TagFilter; 