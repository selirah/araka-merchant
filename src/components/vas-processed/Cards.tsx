import React from 'react';
import { Row, Col } from 'antd';
import CardView from '../cards/CardView';
import { VASProcessedReport } from '../../interfaces';
import { getAreaOptions } from '../../helpers/functions';

interface CardsProps {
  vas: VASProcessedReport | null;
  currency: string;
  loading: boolean;
  translate: any;
}

const Cards: React.FC<CardsProps> = ({ vas, currency, loading, translate }) => {
  const vasProcessed = vas
    ? getAreaOptions(
        vas.vasProcessed.graph.labels,
        vas.vasProcessed.graph.values,
        '#FBC02D',
        '#FFF176'
      )
    : {};

  const vasFees = vas
    ? getAreaOptions(
        vas.vasFees.graph.labels,
        vas.vasFees.graph.values,
        '#FBC02D',
        '#FFF176'
      )
    : {};

  const vasIncome = vas
    ? getAreaOptions(
        vas.vasIncome.graph.labels,
        vas.vasIncome.graph.values,
        '#FBC02D',
        '#FFF176'
      )
    : {};

  return (
    <div className="margin-top-small">
      <Row>
        <h4 className="transaction-chart-text">
          {translate('general.VASProcessed')}
        </h4>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          <Row gutter={20}>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value={translate('general.VASProcessed')}
                title={vas ? vas.vasProcessed.value : 0}
                data={vasProcessed}
                loading={loading}
              />
            </Col>
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value={translate('general.vasIncome')}
                title={vas ? vas.vasIncome.value : 0}
                data={vasIncome}
                currency={currency}
                loading={loading}
              />
            </Col>
            {/* <Col span={6} sm={24} md={6} xs={24}>
              <CardView
                value="Annual Fees"
                title={totalAnnualFees}
                data={annualFeesAreaChart}
                currency={currency}
                 loading={loading}
              />
            </Col> */}
            <Col span={8} sm={24} md={8} xs={24}>
              <CardView
                value={translate('general.feesCharged')}
                title={vas ? vas.vasFees.value : 0}
                data={vasFees}
                currency={currency}
                loading={loading}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Cards;
