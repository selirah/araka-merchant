import React from 'react';
import { Row, Col, Button } from 'antd';
import CardView from '../cards/CardView';
import RawCardView from '../cards/RawCardView';
import { PayoutTableData, PayoutReport } from '../../interfaces';
import { isEmpty } from '../../helpers/isEmpty';
import { getAreaOptions } from '../../helpers/functions';
import { roles } from '../../helpers/constants';

interface CardProps {
  isNewPayout: boolean;
  onOpenRecordView(): void;
  payouts: PayoutTableData[];
  payoutReport: PayoutReport | null;
  currency: string;
  role: string | undefined;
}

const Card: React.FC<CardProps> = ({
  isNewPayout,
  onOpenRecordView,
  payouts,
  payoutReport,
  currency,
  role,
}) => {
  let processedTrx: any = {};
  if (payoutReport) {
    processedTrx = getAreaOptions(
      payoutReport.processedTransactions.graph.labels,
      payoutReport.processedTransactions.graph.values,
      '#FFA000',
      '#FFE082'
    );
  }

  return (
    <div className="margin-top-small">
      <Row>
        <Col span={12}>
          <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
            {!isEmpty(payouts) && payoutReport ? (
              <h4 className="transaction-chart-text">Payouts Overview</h4>
            ) : null}
          </div>
        </Col>

        {role !== undefined && role === roles.SuperMerchant ? (
          <Col
            span={12}
            style={{ display: 'flex', justifyContent: 'flex-end' }}
            className="new-payout"
          >
            <Button
              type="primary"
              className="export-buttons-excel"
              onClick={() => onOpenRecordView()}
              style={{ marginBottom: 10 }}
              disabled={!isNewPayout}
            >
              New Payout
            </Button>
          </Col>
        ) : null}
      </Row>
      {payoutReport ? (
        <Row gutter={10}>
          <Col span={8} sm={24} md={8} xs={24}>
            <CardView
              value="Processed Transactions"
              title={payoutReport.processedTransactions.value}
              data={processedTrx}
              currency={currency}
            />
          </Col>
          <Col span={6} sm={24} md={6} xs={24}>
            <RawCardView
              value="Total Paid Out"
              title={payoutReport.totalPaidOut.value}
              currency={currency}
            />
          </Col>
          <Col span={4} sm={24} md={4} xs={24}>
            <RawCardView
              value="Fees Paid"
              title={payoutReport.feesPaid.value}
              currency={currency}
            />
          </Col>
          <Col span={6} sm={24} md={6} xs={24}>
            <RawCardView
              value="Outstanding. Fee incld."
              title={payoutReport.outstanding.value}
              currency={currency}
            />
          </Col>
        </Row>
      ) : null}
    </div>
  );
};

export default Card;
