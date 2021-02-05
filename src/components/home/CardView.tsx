import React from 'react';

interface CardViewProps {
  value: any;
  title: string;
  icon: any;
}

export const CardView: React.FC<CardViewProps> = ({ value, title, icon }) => {
  return (
    <div className="ratio-box card">
      <div className="card-body">
        <h6 className="ratio-title">{value}</h6>
        <div className="ratio-info d-flex justify-content-between align-items-center">
          <h1 className="ratio-point">{title}</h1>
          <span className="ratio-percentage color-success">{icon}</span>
        </div>
      </div>
    </div>
  );
};
