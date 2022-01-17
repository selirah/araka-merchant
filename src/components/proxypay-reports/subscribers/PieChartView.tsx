import React from 'react';
import { Row, Col, Card } from 'antd';
import PieChart from '../../chart/PieChart';

interface PieChartViewProps {
  data: any;
}

export const PieChartView: React.FC<PieChartViewProps> = ({ data }) => {
  return (
    <Card className="stats-padding">
      <Row style={{ marginBottom: 10 }}>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700 }}>
            Subscriber Ratio
          </h4>
          <p style={{ fontSize: '11px', fontWeight: 700 }}>
            Total Subscribers vs. Active subscribers vs. Inactive subscribers
          </p>
        </div>
      </Row>
      <Row gutter={20}>
        <Col
          span={12}
          md={12}
          sm={24}
          xs={24}
          style={{
            position: 'relative',
            display: 'block',
            paddingBottom: 25,
          }}
        >
          <PieChart info={data} />
        </Col>
        <Col
          span={12}
          md={12}
          sm={24}
          xs={24}
          style={{
            position: 'relative',
            display: 'block',
            paddingTop: 40,
          }}
        >
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '15%',
                height: '10px',
                background: '#46be8a',
                borderRadius: '5px',
                marginRight: '20px',
                marginTop: '1px',
              }}
            ></div>
            <div style={{ width: '20%' }}>
              <h4 style={{ fontSize: '11px' }}>Active</h4>
            </div>
            <div style={{ width: '5%' }}>
              <h4 style={{ fontSize: '11px' }}>=</h4>
            </div>
            <div style={{ width: '60%' }}>
              <h4 style={{ fontSize: '11px' }}>0 Subscribers, 0%</h4>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '15%',
                height: '10px',
                background: '#fb434a',
                borderRadius: '5px',
                marginRight: '20px',
                marginTop: '1px',
              }}
            ></div>
            <div style={{ width: '20%' }}>
              <h4 style={{ fontSize: '11px' }}>Inactive</h4>
            </div>
            <div style={{ width: '5%' }}>
              <h4 style={{ fontSize: '11px' }}>=</h4>
            </div>
            <div style={{ width: '60%' }}>
              <h4 style={{ fontSize: '11px' }}>0 Subscribers, 0%</h4>
            </div>
          </div>

          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '15%',
                height: '10px',
                background: '#4b7cf3',
                borderRadius: '5px',
                marginRight: '20px',
                marginTop: '1px',
              }}
            ></div>
            <div style={{ width: '20%' }}>
              <h4 style={{ fontSize: '11px' }}>Total</h4>
            </div>
            <div style={{ width: '5%' }}>
              <h4 style={{ fontSize: '11px' }}>=</h4>
            </div>
            <div style={{ width: '60%' }}>
              <h4 style={{ fontSize: '11px' }}>0 Subscribers</h4>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
