import React from 'react';
import { Row, Col } from 'antd';
import { XCircle } from 'react-feather';

interface TransactionDetailProps {
  onCloseScreen(): void;
}

const TransactionDetail: React.FC<TransactionDetailProps> = ({
  onCloseScreen,
}) => {
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
    </>
  );
};

export default TransactionDetail;
