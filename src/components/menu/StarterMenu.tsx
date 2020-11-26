import React from 'react';
import { Link } from 'react-router-dom';
import { Divider } from 'antd';

interface StarterMenuProps {}

export const StarterMenu: React.FC<StarterMenuProps> = () => {
  return (
    <div className="starter-text">
      <p>
        Your business is currently a starter business, and so there are limits
        on your total collections and available features
      </p>
      <Divider type="horizontal" />
      <Link to="/">Need help incorporating your business?</Link>
    </div>
  );
};
