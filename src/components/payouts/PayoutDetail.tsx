import React from 'react';
import { Row, Col, Divider, Button, List, Avatar } from 'antd';
import { XCircle } from 'react-feather';

interface PayoutDetailProps {
  payout: any;
  onCloseScreen(): void;
  onDownloadReceiptClick(transactionId: number): void;
  isDownloading: boolean;
}

const PayoutDetail: React.FC<PayoutDetailProps> = ({
  isDownloading,
  onCloseScreen,
  onDownloadReceiptClick,
  payout,
}) => {
  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>Payout Details</h4>
            <h6>
              <XCircle
                size={30}
                onClick={() => onCloseScreen()}
                style={{ cursor: 'pointer' }}
              />
            </h6>
          </div>
        </Col>
      </Row>
      <Row gutter={10} className="margin-top-small">
        <Divider />
      </Row>
      <Row
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Col span={12} sm={24} xs={24} md={12}>
          <div className="trans-detail-header-box">
            <Button style={{ visibility: 'hidden' }}>Refund</Button>
            <Button
              loading={isDownloading}
              onClick={() => onDownloadReceiptClick(payout.transactionId)}
            >
              Print/Export
            </Button>
          </div>
          <div className="trans-detail-info">
            <div className="trans-amount">
              <h4>Amount</h4>
              <h2>{payout.amount}</h2>
            </div>
          </div>
          <div className="trans-detail">
            <List className="list">
              <List.Item>
                <h4 className="key">Fees Paid</h4>
                <h4 className="value">{payout.feesPaid}</h4>
              </List.Item>
              <List.Item>
                <h4 className="key">Net Amount</h4>
                <h4 className="value">{payout.netAmount}</h4>
              </List.Item>
              <List.Item>
                <h4 className="key">Paid on</h4>
                <h4 className="value">{payout.paidOn}</h4>
              </List.Item>
              <List.Item>
                <h4 className="key">Merchant</h4>
                <h4 className="value">{payout.merchant}</h4>
              </List.Item>
            </List>
          </div>
          <div className="merchant-box">
            <div className="avatar">
              <Avatar style={{ backgroundColor: '#42baf9' }}>
                {payout.merchant.substring(0, 2).toUpperCase()}
              </Avatar>
            </div>
            <div className="merchant-amount">
              <h2>{payout.netAmount}</h2>
            </div>
            <Divider />
            <div className="footer-box">
              <div className="footer">
                <h4>Net amount received by {payout.merchant}</h4>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </>
  );
};

export default PayoutDetail;
