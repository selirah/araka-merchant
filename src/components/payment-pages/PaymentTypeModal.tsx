import React from 'react';
import { Button, Modal, List } from 'antd';
import { CreditCardOutlined, ShoppingCartOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  const paymentTypeData: ModalProps[] = [
    {
      title: `${t('paymentPages.paymentTypeModal.oneTimePayment')}`,
      icon: <CreditCardOutlined style={{ fontSize: '30px' }} />,
      description: (
        <div className="option-desc">
          <span>{t('paymentPages.paymentTypeModal.oneTimePaymentDesc')}</span>
          <Button onClick={() => choosePaymentPage()}>
            {t('paymentPages.paymentTypeModal.choose')}
          </Button>
        </div>
      ),
    },
    {
      title: `${t('paymentPages.paymentTypeModal.paymentProduct')}`,
      icon: <ShoppingCartOutlined style={{ fontSize: '30px' }} />,
      description: (
        <div className="option-desc">
          <span>{t('paymentPages.paymentTypeModal.paymentProductDesc')}</span>
          <Button>{t('paymentPages.paymentTypeModal.choose')}</Button>
        </div>
      ),
    },
  ];
  return (
    <Modal
      title={t('paymentPages.paymentTypeModal.title')}
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
