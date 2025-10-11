import React from "react";
import TagFilter from "../Dashboard/TagFilter";
import "./Sidebar.css";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-top">
        <div className="sidebar-title">
          Quick Access
        </div>
        <ul className="sidebar-links">
          <li><a href="#upload" className="sidebar-link">Upload File</a></li>
          <li><a href="#recent" className="sidebar-link">Recent Files</a></li>
          <li><a href="#starred" className="sidebar-link">Starred</a></li>
        </ul>
        <div className="sidebar-section-title">
          Filter by Tag
        </div>
      </div>
      <div className="sidebar-scrollable">
        <TagFilter />
      </div>
    </aside>
  );
};

export default Sidebar; 