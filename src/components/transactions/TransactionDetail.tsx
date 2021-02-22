import React from 'react';
import { Row, Col, Divider, Button, List, Avatar } from 'antd';
import { XCircle } from 'react-feather';
import { TransactionHistory } from '../../interfaces';
import { transactionStatus, timeZones } from '../../helpers/constants';
import moment from 'moment-timezone';

interface TransactionDetailProps {
  onCloseScreen(): void;
  transaction: TransactionHistory;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  onCloseScreen,
  transaction,
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
            <h4>Transaction Details</h4>
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
        <Col span={12}>
          <div className="trans-detail-header-box">
            <Button>Refund</Button>
            <Button>Print/Export</Button>
          </div>
          <div className="trans-detail-info">
            <div className="trans-amount">
              <h4>Amount</h4>
              <h2>{`${transaction.currency} ${transaction.amountPaid.toFixed(
                2
              )}`}</h2>
            </div>
            <div className="trans-status">
              <Button className={classname}>{transaction.status}</Button>
            </div>
          </div>
          <div className="trans-detail">
            <List className="list">
              <List.Item>
                <h4 className="key">Transaction ID</h4>
                <h4 className="value">{transaction.transactionId}</h4>
              </List.Item>
              <List.Item>
                <h4 className="key">Channel</h4>
                <h4 className="value">{transaction.channel}</h4>
              </List.Item>
              <List.Item>
                <h4 className="key">Fees</h4>
                <h4 className="value">{`${
                  transaction.currency
                } ${transaction.charge.toFixed(2)}`}</h4>
              </List.Item>
              <List.Item>
                <h4 className="key">Paid At</h4>
                <h4 className="value">
                  {moment(transaction.createdAt, 'MM/DD/YYYY HH:mm:ss')
                    .tz(timeZones.kinshasa)
                    .format(`MMMM D, YYYY (h:mm a)`)}
                </h4>
              </List.Item>
              <List.Item>
                <h4 className="key">Description</h4>
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
