import React from 'react';
import { Row, Col, Divider, Button, List /*, Avatar*/ } from 'antd';
import { XCircle } from 'react-feather';
import { TransactionHistory } from '../../interfaces';
import { transactionStatus, timeZones } from '../../helpers/constants';
import moment from 'moment-timezone';

interface TransactionDetailProps {
  onCloseScreen(): void;
  transaction: TransactionHistory;
  onDownloadReceiptClick(transactionId: number): void;
  isDownloading: boolean;
  translate: any;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  onCloseScreen,
  transaction,
  onDownloadReceiptClick,
  isDownloading,
  translate,
}) => {
  let classname = '';

  switch (transaction.status) {
    case transactionStatus.APPROVED:
      classname = 'trans-status-success';
      break;
    case transactionStatus.CANCELED:
      classname = 'trans-status-canceled';
      break;
    case transactionStatus.DECLINED:
      classname = 'trans-status-declined';
      break;
    default:
      classname = 'trans-status-canceled';
  }

  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>{translate('general.transactionDetails')}</h4>
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
              onClick={() => onDownloadReceiptClick(transaction.transactionId)}
            >
              {translate('general.printExport')}
            </Button>
          </div>
          <div className="trans-detail-info">
            <div className="trans-amount">
              <h4>Amount</h4>
              <h2>{`${transaction.currency} ${transaction.amountPaid.toFixed(
                2
              )}`}</h2>
            </div>
            <div className="trans-status">
              <Button className={classname}>
                {translate(`${transaction.status.toLowerCase()}`).toUpperCase()}
              </Button>
            </div>
          </div>
          <div className="trans-detail">
            <List className="list">
              <List.Item>
                <h4 className="key"> {translate('general.transactionId')}</h4>
                <h4 className="value">{transaction.transactionId}</h4>
              </List.Item>
              <List.Item>
                <h4 className="key">{translate('general.channel')}</h4>
                <h4 className="value">{transaction.channel}</h4>
              </List.Item>
              <List.Item>
                <h4 className="key">{translate('general.fees')}</h4>
                <h4 className="value">{`${
                  transaction.currency
                } ${transaction.charge.toFixed(2)}`}</h4>
              </List.Item>
              <List.Item>
                <h4 className="key">{translate('general.paidOn')}</h4>
                <h4 className="value">
                  {moment(transaction.createdAt, 'MM/DD/YYYY HH:mm:ss')
                    .tz(timeZones.kinshasa)
                    .format(`MMMM D, YYYY (h:mm a)`)}
                </h4>
              </List.Item>
              <List.Item>
                <h4 className="key">{translate('general.description')}</h4>
                <h4 className="value">{transaction.transactionDescription}</h4>
              </List.Item>
            </List>
          </div>
          {/* <div className="trans-detail-footer">
            <div className="avatar">
              <Avatar style={{ backgroundColor: '#42baf9' }}>JG</Avatar>
            </div>
            <div className="customer-name">
              <h4>John Gotti</h4>
              <h6>john@gotti.com</h6>
            </div>
          </div>
          <div className="blacklist-customer">
            <h4>Blacklist customer</h4>
          </div> */}
        </Col>
      </Row>
    </>
  );
};

export default TransactionDetail;
