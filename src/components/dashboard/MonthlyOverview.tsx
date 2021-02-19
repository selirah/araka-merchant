import React from 'react';
import { Row, Col, Card } from 'antd';
import { CardView } from '../cards/CardView';
import { BarChart } from '../chart/BarChart';
import { ProfitCard } from '../cards/ProfitCard';

interface MonthlyOverviewProps {
  barchartdata: any;
  areachartdata: any;
}

const MonthlyOverview: React.FC<MonthlyOverviewProps> = ({
  barchartdata,
  areachartdata,
}) => {
  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>MONTHLY STATISTICS</h4>
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
                  title="906"
                  data={areachartdata}
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Approved"
                  title="$20,140.10"
                  data={areachartdata}
                />
              </Col>
              <Col span={8} sm={24} md={8} xs={24}>
                <CardView
                  value="Declined"
                  title="$25,512.10"
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
              amount="$4,906.40"
              data={areachartdata}
            />
          </Col>
          <Col span={8}>
            <ProfitCard
              mainTitle="#2 Top Merchant"
              paragraph="3% of revenue by LEON HOTEL"
              amount="$200.12"
              data={areachartdata}
            />
          </Col>
          <Col span={8}>
            <ProfitCard
              mainTitle="#3 Top Merchant"
              paragraph="3% of revenue by Vodacom"
              amount="$185.32"
              data={areachartdata}
            />
          </Col>
        </Row>
      </div>
    </>
  );
};

export default MonthlyOverview;
