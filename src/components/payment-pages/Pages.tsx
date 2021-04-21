import React from 'react';
import { Table, Row, Col /*, Card*/ } from 'antd';
import { Page } from '../../interfaces';
import moment from 'moment-timezone';
import { timeZones } from '../../helpers/constants';

interface PagesProps {
  pages: Page[];
  copyLink(processId: string): void;
  isCopied: boolean;
  processId: string;
  onClickRow(pageId: number): void;
  onPreviewClick(processId: string): void;
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
  createdWhen: string;
}

const Pages: React.FC<PagesProps> = ({
  pages,
  copyLink,
  isCopied,
  processId,
  onClickRow,
  onPreviewClick,
}) => {
  const columns: any[] = [
    {
      title: <span style={{ fontSize: '2rem', color: '#868686' }}>&bull;</span>,
      dataIndex: 'status',
      key: 'status',
      align: 'center',
      className: 'column-text',
      render: (status: string) => {
        // let color: string;
        // switch (status) {
        //   case transactionStatus.APPROVED:
        //     color = '#41b883';
        //     break;
        //   case transactionStatus.DECLINED:
        //     color = '#ff2e2e';
        //     break;
        //   case transactionStatus.CANCELED:
        //     color = '#868686';
        //     break;
        //   default:
        //     color = '#868686';
        //     break;
        // }
        return (
          <span style={{ fontSize: '2rem', color: '#41b883' }}>&bull;</span>
        );
      },
    },
    {
      title: 'Page Name',
      dataIndex: 'pageName',
      key: 'pageName',
      align: 'left',
      render: (pageName: string, page: TableData) => (
        <span
          style={{ color: '#35b9e6' }}
          onClick={() => onClickRow(page.paymentPageId)}
        >
          {pageName}
        </span>
      ),
    },
    {
      title: 'Page Description',
      dataIndex: 'description',
      key: 'description',
      align: 'left',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
    },
    {
      title: 'Created At',
      dataIndex: 'createdWhen',
      key: 'createdWhen',
      align: 'center',
    },
    {
      title: 'Link',
      dataIndex: '',
      key: 'x',
      render: (page: TableData) => (
        <span onClick={() => onPreviewClick(page.processId)}>Preview</span>
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
        page.amount !== ''
          ? `${page.currency} ${parseFloat(page.amount).toFixed(2)}`
          : page.amount,
      phoneNumber: page.phoneNumber,
      emailAddress: page.emailAddress,
      currency: page.currency,
      processId: page.processId,
      createdWhen: moment(page.createdWhen, 'MM/DD/YYYY HH:mm:ss')
        .tz(timeZones.kinshasa)
        .format(`MMMM D, YYYY (h:mm a)`),
    });
  }

  return (
    <Row gutter={20}>
      <Col span={24}>
        {/* <Card> */}
        <div className="table-padding">
          <Table
            dataSource={data}
            columns={columns}
            bordered
            pagination={{
              hideOnSinglePage: true,
              total: data.length,
              showTotal: (total, range) => {
                return `Showing ${range[0]} - ${range[1]} of ${total} results`;
              },
            }}
          />
        </div>
        {/* </Card> */}
      </Col>
    </Row>
  );
};

export default Pages;
