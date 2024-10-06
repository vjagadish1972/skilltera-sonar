import React from 'react';
import './style.css'

const Tab = (props) => {
  const { label, activeTab, onClick } = props;

  let className = 'tab-list-item';

  if (activeTab === label) {
    className += ' tab-list-active';
  }

  return (
    <li className={className} onClick={() => onClick(label)}>
      {label}
    </li>
  );
}

export default Tab;
