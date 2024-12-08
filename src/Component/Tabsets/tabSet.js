import React, { useState } from 'react';
import PropTypes from 'prop-types'; // Import PropTypes for validation
import Tab from './tab';
import './style.css';

const TabSet = (props) => {
  const [activeTab, setActiveTab] = useState(props.children[0].props.label);

  const onClickTab = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="tab-set">
      <ul className="tab-list">
        {props.children.map((child) => {
          const { label } = child.props;

          return (
            <Tab
              key={label}
              label={label}
              activeTab={activeTab}
              onClick={onClickTab}
            />
          );
        })}
      </ul>
      <div className="tab-content">
        {props.children.map((child) => {
          if (child.props.label !== activeTab) return undefined;
          return child.props.children;
        })}
      </div>
    </div>
  );
};

// PropTypes validation
TabSet.propTypes = {
  children: PropTypes.node.isRequired, // Validate that children are passed and are valid React nodes
};

export default TabSet;
