import React from 'react';
import { Layout, Row, Col, Dropdown, Divider, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { FilterOutlined } from '@ant-design/icons';
import { FilterMenu } from '../components/transactions/FilterMenu';
import { EmptyBox } from '../components/transactions/EmptyBox';

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
  const { Content } = Layout;
  const { Search } = Input;

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
        <Col span={24}>
          <Dropdown overlay={<FilterMenu />}>
            <a
              href="/"
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              <FilterOutlined /> Filters
            </a>
          </Dropdown>
          <Divider type="vertical" />
          <Search
            placeholder="Search transactions"
            onSearch={(value) => console.log(value)}
            style={{ width: 300 }}
          />
        </Col>
        <Divider />
        <Col span={24}>
          <EmptyBox
            header="No Transactions"
            description="There're no transactions for this query. Please try another
                  query or clear your filters."
          />
        </Col>
      </Row>
    </Content>
  );
};

export default withRouter(Transactions);
