import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../../cards/CardView';
import { PieChartView } from './PieChartView';

interface MidCardProps {
  areadata: any;
}

const MidCard: React.FC<MidCardProps> = ({ areadata }) => {
  const info = {
    data: {
      labels: ['Active', 'Inactive'],
      datasets: [
        {
          data: [8, 4],
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
        <h4 className="transaction-chart-text">External Subscribers</h4>
      </Row>
      <Row gutter={30}>
        <Col span={12} sm={24} md={12} xs={24}>
          <Row>
            <Col span={24} sm={24} md={24} xs={24}>
              <CardView value="Total" title={12} data={areadata} />
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={12} sm={24} md={12} xs={24}>
              <CardView value="Active" title={8} data={areadata} />
            </Col>
            <Col span={12} sm={24} md={12} xs={24}>
              <CardView value="Inactive" title={4} data={areadata} />
            </Col>
          </Row>
        </Col>
        <Col span={12} sm={24} md={12} xs={24}>
          <PieChartView data={info} />
        </Col>
      </Row>
    </div>
  );
};

export default MidCard;
