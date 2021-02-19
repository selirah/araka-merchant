import React from 'react';
import { Card } from 'antd';
import { AreaChart } from '../chart/AreaChart';

interface CardViewProps {
  value: any;
  title: string;
}

export const CardView: React.FC<CardViewProps> = ({ value, title }) => {
  return (
    <Card className="stats-padding">
      <div className="ecard">
        <div className="card-chunk">
          <h1>{title}</h1>
          <p>{value}</p>
          {/* <Statistic title={title} value={value} precision={2} /> */}
        </div>
        <div className="card-chunk">
          <AreaChart />
        </div>
      </div>
    </Card>
  );
};
