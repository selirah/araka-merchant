import React from 'react';
import { Row, Col, Card } from 'antd';
import { CardView } from '../cards/CardView';
import { BarChart } from '../chart/BarChart';
import { ProfitCard } from '../cards/ProfitCard';

interface YearlyOverviewProps {
  barchartdata: any;
  areachartdata: any;
}

const YearlyOverview: React.FC<YearlyOverviewProps> = ({
  barchartdata,
  areachartdata,
}) => {
  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>OVERALL STATISTICS</h4>
            <h6>01/01/2021, 11:35AM</h6>
          </div>
        </Col>
      </Row>
      <div className="margin-top">
        <Row gutter={20}>
          <Col span={24}>
            <Row gutter={20}>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Transactions"
                  title="50000"
                  data={areachartdata}
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Approved"
                  title="$826,056.12"
                  data={areachartdata}
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Declined"
                  title="$50,056.12"
                  data={areachartdata}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="margin-top">
        <Row>
          <h4 className="transaction-chart-text">Transactions Chart</h4>
        </Row>
        <Row gutter={20}>
          <Col span={24}>
            <Card>
              <div className="chart-padding">
                <BarChart info={barchartdata} />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
      <div className="margin-top">
        <Row>
          <h4 className="transaction-chart-text">Profits by Merchants</h4>
        </Row>
        <Row gutter={40}>
          <Col span={8}>
            <ProfitCard
              mainTitle="#1 Top Merchant"
              paragraph="3% of revenue by INRB"
              amount="$25000.00"
              data={areachartdata}
            />
          </Col>
          <Col span={8}>
            <ProfitCard
              mainTitle="#2 Top Merchant"
              paragraph="3% of revenue by VAS DStv"
              amount="$10,952.00"
              data={areachartdata}
            />
          </Col>
          <Col span={8}>
            <ProfitCard
              mainTitle="#3 Top Merchant"
              paragraph="3% of revenue by Vodacom"
              amount="$7,800.32"
              data={areachartdata}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default YearlyOverview;