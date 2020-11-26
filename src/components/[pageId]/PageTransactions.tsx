import React from 'react';
import { Tabs, Row, Col } from 'antd';
import { EmptyTransactions } from './EmptyTransactions';

interface PageTransactionsProps {}

export const PageTransactions: React.FC<PageTransactionsProps> = () => {
  const { TabPane } = Tabs;

  return (
    <Row>
      <Col span={24}>
        <Tabs defaultActiveKey="1">
          <TabPane tab="Recent Payments" key="1">
            <EmptyTransactions />
          </TabPane>
        </Tabs>
      </Col>
    </Row>
  );
};
