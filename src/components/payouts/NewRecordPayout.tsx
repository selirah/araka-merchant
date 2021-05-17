import React from 'react';
import { Row, Col, Divider, Button, List, Input, Avatar } from 'antd';
import { XCircle } from 'react-feather';
import { MerchantData, Fee, PayoutNewRecord } from '../../interfaces';
import { numberWithCommas } from '../../helpers/helperFunctions';

const { TextArea } = Input;

interface NewRecordPayoutProps {
  onCloseScreen(): void;
  isPayingOut: boolean;
  merchant: MerchantData | null;
  onPayoutSubmit(values: any): void;
  currency: string;
  Form: any;
  form: any;
  values: PayoutNewRecord;
  fee: Fee | undefined;
  onCalculateFee(e: React.FormEvent<EventTarget>): void;
  amount: number;
  translate: any;
}

const NewRecordPayout: React.FC<NewRecordPayoutProps> = ({
  isPayingOut,
  merchant,
  onCloseScreen,
  onPayoutSubmit,
  currency,
  form,
  Form,
  values,
  onCalculateFee,
  fee,
  amount,
  translate,
}) => {
  return (
    <>
      <Row gutter={10}>
        <Col span={24}>
          <div className="upper-header">
            <h4>
              {translate('general.newPayoutFor')}{' '}
              {merchant ? merchant.name : ''}
            </h4>
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
      <Row gutter={10} className="margin-top-small">
        <Divider />
      </Row>
      <Row
        style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}
      >
        <Col span={10} sm={24} xs={24} md={10}>
          <Form
            form={form}
            initialValues={values}
            id="recordForm"
            onFinish={onPayoutSubmit}
          >
            <div className="new-record-box">
              <div className="amount-details">
                <h4>{translate('general.amount')}*</h4>
                <div style={{ display: 'flex' }}>
                  <h2>{currency}</h2>
                  <div style={{ marginLeft: 10, marginTop: 5 }}>
                    <Form.Item name="amount">
                      <Input
                        placeholder={translate('general.enterAmount')}
                        style={{ fontWeight: 700 }}
                        onBlur={(e) => onCalculateFee(e)}
                      />
                    </Form.Item>
                  </div>
                </div>
              </div>
              <div className="payout-button-box">
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={isPayingOut}
                  form="recordForm"
                >
                  {translate('general.payout')}
                </Button>
              </div>
            </div>
            <div className="trans-detail">
              <List className="list">
                <List.Item>
                  <h4 className="key">{translate('general.feesToBePaid')}:</h4>
                  <h4 className="value">
                    {currency}{' '}
                    {fee !== undefined
                      ? `(${fee.fee.toFixed(2)} + ${fee.vat.toFixed(2)} VAT)`
                      : `(0.00 + 0.00 VAT)`}
                  </h4>
                </List.Item>
                <List.Item>
                  <h4 className="key">{translate('general.description')}:</h4>
                  <h4 className="value">
                    {translate('general.newPayoutFor')}{' '}
                    {merchant ? merchant.name : ''}
                  </h4>
                </List.Item>
                <List.Item style={{ borderBottom: 0 }}>
                  <h4 className="key">{translate('general.comments')}:</h4>
                </List.Item>
                <List.Item className="comment-section">
                  <Form.Item name="comments" style={{ width: '100%' }}>
                    <TextArea rows={4} />
                  </Form.Item>
                </List.Item>
              </List>
            </div>
            <div className="merchant-box">
              <div className="avatar">
                <Avatar style={{ backgroundColor: '#42baf9' }}>
                  {merchant ? merchant.name.substring(0, 2).toUpperCase() : ''}
                </Avatar>
              </div>
              <div className="merchant-amount">
                <h2>
                  {currency}{' '}
                  {fee !== undefined
                    ? `${numberWithCommas(
                        (amount - (fee.fee + fee.vat)).toFixed(2)
                      )}`
                    : '0.00'}
                </h2>
              </div>
              <Divider />
              <div className="footer-box">
                <div className="footer">
                  <h4>
                    {translate('general.netAmountReceived')}{' '}
                    {merchant ? merchant.name : ''}
                  </h4>
                </div>
              </div>
            </div>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default NewRecordPayout;
