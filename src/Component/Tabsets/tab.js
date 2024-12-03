import React from 'react';
import './style.css'

const Tab = (props) => {
  const { label, activeTab, onClick } = props;

  let className = 'tab-list-item';

  if (activeTab === label) {
    className += ' tab-list-active';
  }

  return (
    <li
    className={className}
    role="tab" // Add ARIA role
    tabIndex={0} // Make the element focusable
    aria-selected={activeTab === label} // Add ARIA state
    onClick={() => onClick(label)} // Handle mouse clicks
    onKeyDown={(e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        onClick(label); // Handle keyboard interaction
      }
    }}
  >

      {label}
    </li>
  );
}

export default Tab;
