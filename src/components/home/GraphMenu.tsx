import React from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

interface GraphMenuProps {}

export const GraphMenu: React.FC<GraphMenuProps> = () => {
  const { t } = useTranslation();
  const { Option } = Select;
  return (
    <Select style={{ width: 200 }} placeholder={t('dashboard.last30Days')}>
      <Option value={`${t('dashboard.last30Days')}`}>
        {t('dashboard.last30Days')}
      </Option>
    </Select>
  );
};
