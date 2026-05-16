import React from 'react';
import { lettersData, sentencesData } from '../data';

const Sidebar = ({ activeItem, setActiveItem }) => {
  return (
    <div className="sidebar">
      <h2>English for Kids</h2>
      
      <div className="menu-section">
        <div className="menu-title">1. 认识字母 (Letters)</div>
        <div className="menu-items">
          {lettersData.map((item) => (
            <button
              key={item.letter}
              className={`menu-btn ${activeItem?.type === 'letter' && activeItem.data.letter === item.letter ? 'active' : ''}`}
              onClick={() => setActiveItem({ type: 'letter', data: item })}
            >
              {item.letter}
            </button>
          ))}
        </div>
      </div>

      <div className="menu-section">
        <div className="menu-title">2. 简单语句 (Sentences)</div>
        <div className="menu-items list-view">
          {sentencesData.map((item) => (
            <button
              key={item.id}
              className={`menu-btn list-item ${activeItem?.type === 'sentence' && activeItem.data.id === item.id ? 'active' : ''}`}
              onClick={() => setActiveItem({ type: 'sentence', data: item })}
            >
              {item.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
