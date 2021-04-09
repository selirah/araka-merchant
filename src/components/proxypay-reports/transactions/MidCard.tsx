import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';
import { PieChartView } from './PieChartView';

interface MidCardProps {}

const MidCard: React.FC<MidCardProps> = () => {
  const info = {
    data: {
      labels: ['Successful', 'Failed'],
      datasets: [
        {
          data: [9440, 1000],
          backgroundColor: ['#46be8a', '#fb434a'],
          hoverOffset: 4,
          borderColor: ['#4b7cf3', '#4b7cf3'],
          borderWidth: [5, 2],
        },
      ],
    },
  };
  return (
    <div className="margin-top-small">
      <Row>
        <h4
          className="transaction-chart-text"
          style={{
            background: '#d9dee9',
            paddingLeft: 10,
            paddingRight: 10,
            color: '#595c97',
            fontWeight: 700,
          }}
        >
          Successful Transactions vs. Failed Transactions
        </h4>
      </Row>
      <Row>
        <Col span={12} sm={24} md={12} xs={24}>
          <PieChartView data={info} />
        </Col>
      </Row>
    </div>
  );
};

export default MidCard;
