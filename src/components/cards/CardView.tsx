import React from 'react';
import { Card } from 'antd';
import { AreaChart } from '../chart/AreaChart';
// import CountUp from 'react-countup';

interface CardViewProps {
  value: any;
  title: any;
  data: any;
}

export const CardView: React.FC<CardViewProps> = ({ value, title, data }) => {
  return (
    <Card className="stats-padding">
      <div className="ecard">
        <div className="card-chunk">
          <h1>
            {/* <CountUp end={parseInt(title)} /> */}
            {title}
          </h1>
          <p>{value}</p>
        </div>
        <div className="card-chunk">
          <AreaChart info={data} />
        </div>
      </div>
    </Card>
  );
};
