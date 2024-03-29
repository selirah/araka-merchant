import React from 'react';
import { Row, Col, Card } from 'antd';
import PieChart from '../../chart/PieChart';
import { numberWithCommas } from '../../../helpers/helperFunctions';

interface PieChartViewProps {
  data: any;
  load: any;
}

export const PieChartView: React.FC<PieChartViewProps> = ({ data, load }) => {
  return (
    <Card className="stats-padding">
      <Row style={{ marginBottom: 10 }}>
        <div>
          <h4 style={{ fontSize: '15px', fontWeight: 700 }}>
            Transaction Ratio
          </h4>
          <p style={{ fontSize: '11px', fontWeight: 700 }}>
            Total successful vs. Failed transactions
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
              <h4 style={{ fontSize: '11px' }}>Successful</h4>
            </div>
            <div style={{ width: '5%' }}>
              <h4 style={{ fontSize: '11px' }}>=</h4>
            </div>
            <div style={{ width: '60%' }}>
              <h4 style={{ fontSize: '11px' }}>
                {numberWithCommas(load.successful)} Transactions,{' '}
                {((load.successful / load.total) * 100).toFixed(2)} %
              </h4>
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
              <h4 style={{ fontSize: '11px' }}>Failed</h4>
            </div>
            <div style={{ width: '5%' }}>
              <h4 style={{ fontSize: '11px' }}>=</h4>
            </div>
            <div style={{ width: '60%' }}>
              <h4 style={{ fontSize: '11px' }}>
                {numberWithCommas(load.failed)} Transactions,{' '}
                {((load.failed / load.total) * 100).toFixed(2)} %
              </h4>
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
              <h4 style={{ fontSize: '11px' }}>
                {numberWithCommas(load.total)} Transactions
              </h4>
            </div>
          </div>
        </Col>
      </Row>
    </Card>
  );
};
