import React from 'react';
import { Row, Col, /*Card,*/ Button, Table } from 'antd';
// import moment from 'moment-timezone';
import { MyPayout } from '../../interfaces';
// import { isEmpty } from '../../helpers/isEmpty';

interface DetailsProps {
  payouts: MyPayout[];
}

const Details: React.FC<DetailsProps> = ({ payouts }) => {
  const columns: any = [
    {
      title: 'Payout Date',
      dataIndex: 'payoutDate',
      key: 'payoutDate',
      align: 'left',
      className: 'column-text',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Fee',
      dataIndex: 'fee',
      key: 'fee',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Balance Before',
      dataIndex: 'balanceBefore',
      key: 'balanceBefore',
      align: 'center',
      className: 'column-text',
    },
    {
      title: 'Balance After',
      dataIndex: 'balanceAfter',
      key: 'balanceAfter',
      align: 'center',
      className: 'column-text',
    },
  ];

  let dataSource = [];
  for (let payout of payouts) {
    dataSource.push({
      key: Math.random(),
      payoutDate: payout.payoutDate,
      amount: `${payout.currency} ${payout.amount}`,
      fee: `${payout.currency} ${payout.fee}`,
      balanceBefore: `${payout.currency} ${payout.balanceBefore}`,
      balanceAfter: `${payout.currency} ${payout.balanceAfter}`,
    });
  }

  return (
    <div className="margin-top-small">
      <Row style={{ position: 'relative' }}>
        <h4 className="transaction-chart-text">Payouts Overview</h4>
        <div className="utility-buttons">
          <Button type="primary" className="export-buttons">
            Export to Excel
          </Button>
          <Button type="primary" className="export-buttons">
            Export to PDF
          </Button>
        </div>
      </Row>
      <Row gutter={20}>
        <Col span={24}>
          {/* <Card> */}
          <div className="table-padding">
            <Table dataSource={dataSource} columns={columns} />
          </div>
          {/* </Card> */}
        </Col>
      </Row>
    </div>
  );
};

export default Details;
