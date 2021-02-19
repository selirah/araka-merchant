import React from 'react';
import { Card } from 'antd';
import { AreaChart } from '../chart/AreaChart';

interface ProfitCardProps {
  mainTitle: string;
  paragraph: string;
  amount: string;
}

export const ProfitCard: React.FC<ProfitCardProps> = ({
  mainTitle,
  paragraph,
  amount,
}) => {
  return (
    <Card>
      <React.Fragment>
        <div className="profit-card">
          <h4>{mainTitle}</h4>
          <p>{paragraph}</p>
          <h1>{amount}</h1>
        </div>
        <div>
          <AreaChart />
        </div>
      </React.Fragment>
    </Card>
  );
};
