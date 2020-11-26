import React from 'react';
import { Row, Col, Image, Input, Switch, List, Button } from 'antd';
import {
  EditOutlined,
  PlusSquareFilled,
  DeleteFilled,
} from '@ant-design/icons';

interface PageDetailsProps {}

export const PageDetails: React.FC<PageDetailsProps> = () => {
  return (
    <Row>
      <Col span={24}>
        <div className="page-header">
          <div className="page-image">
            <Image width={100} src="https://via.placeholder.com/150" />
          </div>
          <div className="page-name">
            <h4>Page Name</h4>
            <h4>ACME GROUP LLC.</h4>
          </div>
          <div className="page-url">
            <Input
              addonBefore="Copy Link"
              value="https://araka.com/pay/acme-group"
              addonAfter="Visit Link"
            />
          </div>
        </div>

        <List className="list">
          <List.Item>
            <h4 className="key">Status</h4>
            <h4 className="value">
              <span>
                <Switch defaultChecked />
              </span>{' '}
              <span>Published</span>
            </h4>
          </List.Item>
          <List.Item>
            <h4 className="key">Page Type</h4>
            <h4 className="value">Payment</h4>
          </List.Item>
          <List.Item>
            <h4 className="key">Currency</h4>
            <h4 className="value">USD</h4>
          </List.Item>
          <List.Item>
            <h4 className="key">Page Amount</h4>
            <h4 className="value">USD 26,600.00</h4>
          </List.Item>
          <List.Item>
            <h4 className="key">Description</h4>
            <h4 className="value">
              Payment for one time contract to develop payment platform
            </h4>
          </List.Item>
          <List.Item>
            <h4 className="key">Redirect URL</h4>
            <h4 className="value">https://mywebsite.com</h4>
          </List.Item>
          <List.Item>
            <h4 className="key">Send Notifications To</h4>
            <h4 className="value">billing@webcontra.co</h4>
          </List.Item>
          <List.Item>
            <h4 className="key">Success Message</h4>
            <h4 className="value">
              Payment received. We will contact you shortly
            </h4>
          </List.Item>
          <List.Item>
            <h4 className="key">Created On</h4>
            <h4 className="value">Oct 28, 2020 9:20 AM</h4>
          </List.Item>
        </List>
      </Col>
      <Col span={24}>
        <div className="page-buttons">
          <Button type="default">
            <EditOutlined /> Edit Page
          </Button>
          <Button type="default">
            <PlusSquareFilled /> Duplicate
          </Button>
          <Button type="primary" danger>
            <DeleteFilled /> Delete
          </Button>
        </div>
      </Col>
    </Row>
  );
};
