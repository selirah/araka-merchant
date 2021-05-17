import React from 'react';
import { Button, Modal, List } from 'antd';
import {
  CreditCardOutlined /*, ShoppingCartOutlined*/,
} from '@ant-design/icons';

interface PaymentTypeModalProps {
  choosePaymentPage(): void;
  showPaymentTypeModal: boolean;
  onTogglePaymentTypeModal(): void;
  translate: any;
}

type ModalProps = {
  title: string;
  icon: React.ReactNode;
  description: React.ReactNode;
};

const PaymentTypeModal: React.FC<PaymentTypeModalProps> = ({
  choosePaymentPage,
  showPaymentTypeModal,
  onTogglePaymentTypeModal,
  translate,
}) => {
  const paymentTypeData: ModalProps[] = [
    {
      title: `${translate('general.oneTimePayment')}`,
      icon: <CreditCardOutlined style={{ fontSize: '30px' }} />,
      description: (
        <div className="option-desc">
          <span>{translate('general.oneTimePaymentDesc')}</span>
          <Button
            onClick={() => choosePaymentPage()}
            className="new-cancel-btn"
          >
            {translate('general.choose')}
          </Button>
        </div>
      ),
    },
    // {
    //   title: `${t('paymentPages.paymentTypeModal.paymentProduct')}`,
    //   icon: <ShoppingCartOutlined style={{ fontSize: '30px' }} />,
    //   description: (
    //     <div className="option-desc">
    //       <span>{t('paymentPages.paymentTypeModal.paymentProductDesc')}</span>
    //       <Button className="new-cancel-btn">
    //         {t('paymentPages.paymentTypeModal.choose')}
    //       </Button>
    //     </div>
    //   ),
    // },
  ];
  return (
    <Modal
      title={translate('general.title')}
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

export default PaymentTypeModal;
