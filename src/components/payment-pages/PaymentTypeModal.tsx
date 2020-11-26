import React from 'react';
import { Button, Modal, List } from 'antd';
import { CreditCardOutlined, ShoppingCartOutlined } from '@ant-design/icons';

interface PaymentTypeModalProps {
  choosePaymentPage(): void;
  showPaymentTypeModal: boolean;
  onTogglePaymentTypeModal(): void;
}

type ModalProps = {
  title: string;
  icon: React.ReactNode;
  description: React.ReactNode;
};

export const PaymentTypeModal: React.FC<PaymentTypeModalProps> = ({
  choosePaymentPage,
  showPaymentTypeModal,
  onTogglePaymentTypeModal,
}) => {
  const paymentTypeData: ModalProps[] = [
    {
      title: 'One-time Payment',
      icon: <CreditCardOutlined style={{ fontSize: '30px' }} />,
      description: (
        <div className="option-desc">
          <span>Create a simple page for your customers to pay you</span>
          <Button onClick={() => choosePaymentPage()}>Choose</Button>
        </div>
      ),
    },
    {
      title: 'Payment Product',
      icon: <ShoppingCartOutlined style={{ fontSize: '30px' }} />,
      description: (
        <div className="option-desc">
          <span>
            Create a page to sell one or more products from your inventory
          </span>
          <Button onClick={() => choosePaymentPage()}>Choose</Button>
        </div>
      ),
    },
  ];
  return (
    <Modal
      title="New Payment Page"
      maskClosable={false}
      className="option-modal"
      centered
      visible={showPaymentTypeModal}
      onOk={() => onTogglePaymentTypeModal()}
      onCancel={() => onTogglePaymentTypeModal()}
    >
      <List
        itemLayout="horizontal"
        dataSource={paymentTypeData}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={item.icon}
              title={item.title}
              description={item.description}
            />
          </List.Item>
        )}
      />
    </Modal>
  );
};
