import React from 'react';
import { Row, Col, Form, Input, Select, Button } from 'antd';

interface PayFormProps {}

export const PayForm: React.FC<PayFormProps> = () => {
  const { Option } = Select;

  const handleChange = (value: any) => {
    console.log(value);
  };

  return (
    <Row
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        marginTop: '10px',
      }}
    >
      <Col span={6} className="pay-form-col">
        <Form layout="vertical">
          <Row gutter={10}>
            <Col span={12}>
              <Form.Item
                name="FirstName"
                label="First Name"
                style={{ marginBottom: '2px' }}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="LastName"
                label="Last Name"
                style={{ marginBottom: '2px' }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="EmailAddress"
                label="Email Address"
                style={{ marginBottom: '2px' }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <Form.Item
                name="PhoneNumber"
                label="Phone Number"
                style={{ marginBottom: '2px' }}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={10}>
            <Col span={8}>
              <Form.Item name="Currency" label="Amount to Charge">
                <Select defaultValue="USD" onChange={handleChange}>
                  <Option value="GHS">GHS</Option>
                  <Option value="USD">USD</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={16}>
              <Form.Item name="Amount" label="Amount" className="hide-label">
                <Input placeholder="2,600.00" />
              </Form.Item>
            </Col>
          </Row>
          <Row
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            <Button type="primary" htmlType="submit">
              Pay Now
            </Button>
          </Row>
        </Form>
      </Col>
    </Row>
  );
};
