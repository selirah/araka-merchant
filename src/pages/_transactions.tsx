import React, { useState } from 'react';
import { Layout, Row, Col, Dropdown, Divider, Input } from 'antd';
import { withRouter } from 'react-router-dom';
import { FilterOutlined } from '@ant-design/icons';
import { FilterMenu } from '../components/transactions/FilterMenu';
import { EmptyBox } from '../components/transactions/EmptyBox';
import { Transactions as Trans } from '../components/transactions/Transactions';

interface TransactionsProps {}

const Transactions: React.FC<TransactionsProps> = () => {
  const { Content } = Layout;
  const { Search } = Input;
  const [isAvailable, setIsAvailable] = useState(false);

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

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
          {/* <EmptyBox
            header="No Transactions"
            description="There're no transactions for this query. Please try another
                  query or clear your filters."
          /> */}
          <Trans transactions={dataSource} columns={columns} />
        </Col>
      </Row>
    </Content>
  );
};

export default withRouter(Transactions);
