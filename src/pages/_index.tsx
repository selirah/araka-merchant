import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Dropdown, Button, Divider, Row, Col, Progress } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { GraphMenu } from '../components/home/GraphMenu';

interface IndexProps {}

const Index: React.FC<IndexProps> = () => {
  const { Content } = Layout;

  return (
    <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 280,
      }}
    >
      <Row>
        <Col span={16} className="b-right">
          <Dropdown overlay={<GraphMenu />}>
            <Button>
              Last 30 days <DownOutlined />
            </Button>
          </Dropdown>
          <Divider />
          <div className="total-amount">USD 0.00</div>
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <Divider>No activity for this period</Divider>
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <Divider />
          <div className="summaryHolder">
            <div className="bg-placeholder">
              <h3>Success Rate </h3>
              <p>
                This chart shows how many attempted transactions become
                successful
              </p>
            </div>
            <Divider type="vertical" />
            <div className="bg-placeholder">
              <h3>Payment Issues</h3>
              <p>
                This chart breaks down the reasons why your transactions fail
              </p>
            </div>
          </div>
          <Divider />
          <p className="dash-summary text-center">
            0 transactions · 0 abandoned{' '}
          </p>
        </Col>
        <Col span={8}>
          <h3 className="stats text-muted text-center">Statistics</h3>
          <Divider />
          <h3 className="text-muted text-center">Next Payout</h3>
          <p className="payout-desc">
            There's no pending payout for your business
          </p>
          <Button type="primary" disabled>
            View past payouts
          </Button>
          <Divider />
          <h2 className="text-muted text-center">Payout Limit</h2>
          <Progress
            percent={0}
            format={(percent) => `${percent}/50,000.00 USD`}
          />
          <Button type="primary">Upgrade your business</Button>
        </Col>
      </Row>
    </Content>
  );
};

export default withRouter(Index);
