import React from 'react';
import '../styles/StatsCard.css';

const StatsCard = ({ imageSrc, color, value, text }) => {
  return (
    <div className="stats-card">
      <img src={imageSrc} alt="icon" className="stats-card-image" style={{ backgroundColor: color }}/>
      <div className="stats-card-content">
        <span className="stats-card-value">{value}</span>
        <p className="stats-card-text">{text}</p>
      </div>
    </div>
  );
};

export default StatsCard;
