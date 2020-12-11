import React from 'react';
import { Table, Tag, Space, Button } from 'antd';
import { Link } from 'react-router-dom';
import { EyeOutlined, LinkOutlined } from '@ant-design/icons';
import { Page } from '../../interfaces';
import { path } from '../../helpers/path';

interface PagesProps {
  pages: Page[];
  copyLink(processId: string): void;
  isCopied: boolean;
  processId: string;
}

interface TableData {
  key: number;
  paymentPageId: number;
  pageName: string;
  description: string;
  customerName: string;
  amount: string;
  phoneNumber: string;
  emailAddress: string;
  currency: string;
  processId: string;
}

export const Pages: React.FC<PagesProps> = ({
  pages,
  copyLink,
  isCopied,
  processId,
}) => {
  const columns: any[] = [
    {
      title: 'Page Name',
      dataIndex: 'pageName',
      key: 'pageName',
      align: 'left',
    },
    {
      title: 'Page Description',
      dataIndex: 'description',
      key: 'description',
      align: 'left',
    },
    {
      title: 'Customer Name',
      dataIndex: 'customerName',
      key: 'customerName',
      align: 'center',
      render: (customer: string) => {
        let tag;
        if (customer === 'true') {
          tag = (
            <Tag color="green" key={customer}>
              Yes
            </Tag>
          );
        } else if (customer === 'false') {
          tag = (
            <Tag color="volcano" key={customer}>
              No
            </Tag>
          );
        }
        return tag;
      },
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      align: 'center',
      render: (phone: string) => {
        let tag;
        if (phone === 'true') {
          tag = (
            <Tag color="green" key={phone}>
              Yes
            </Tag>
          );
        } else if (phone === 'false') {
          tag = (
            <Tag color="volcano" key={phone}>
              No
            </Tag>
          );
        }
        return tag;
      },
    },
    {
      title: 'Email Address',
      dataIndex: 'emailAddress',
      key: 'emailAddress',
      align: 'center',
      render: (email: string) => {
        let tag;
        if (email === 'true') {
          tag = (
            <Tag color="green" key={email}>
              Yes
            </Tag>
          );
        } else if (email === 'false') {
          tag = (
            <Tag color="volcano" key={email}>
              No
            </Tag>
          );
        }
        return tag;
      },
    },
    {
      title: 'Currency',
      dataIndex: 'currency',
      key: 'currency',
      align: 'center',
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      render: (page: TableData) => (
        <Space>
          <Link to={`${path.page}/${page.paymentPageId}`}>
            <Button type="default" icon={<EyeOutlined />}>
              View
            </Button>
          </Link>
          <Button
            type="primary"
            icon={<LinkOutlined />}
            onClick={() => copyLink(page.processId)}
          >
            {isCopied && processId === page.processId ? 'Copied!' : 'Copy Link'}
          </Button>
        </Space>
      ),
    },
  ];

  let data: TableData[] = [];
  for (let page of pages) {
    data.push({
      key: page.paymentPageId,
      paymentPageId: page.paymentPageId,
      pageName: page.pageName,
      description: page.description,
      customerName: page.customerName,
      amount:
        page.amount !== '' ? parseFloat(page.amount).toFixed(2) : page.amount,
      phoneNumber: page.phoneNumber,
      emailAddress: page.emailAddress,
      currency: page.currency,
      processId: page.processId,
    });
  }

  return (
    <Table dataSource={data} columns={columns} pagination={{ pageSize: 10 }} />
  );
};
