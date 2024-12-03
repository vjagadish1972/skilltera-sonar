import React from "react";
import PropTypes from "prop-types"; // Import PropTypes
import "./style.css";

export default function MasterLayout({ children }) {
  return <div className="master_layout">{children}</div>;
}

// Define PropTypes
MasterLayout.propTypes = {
  children: PropTypes.node.isRequired, // Validate 'children' as a required node
};
