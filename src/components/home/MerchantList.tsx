import React from 'react';
import { Select } from 'antd';

interface MerchantListProps {
  merchants: string[];
  onSelectMerchant(value: string): void;
}

export const MerchantList: React.FC<MerchantListProps> = ({
  merchants,
  onSelectMerchant,
}) => {
  const { Option } = Select;
  return (
    <Select
      style={{ width: 200 }}
      onChange={onSelectMerchant}
      showSearch
      placeholder="Select Merchant"
      size="large"
    >
      <Option value="">All</Option>
      {merchants.map((m) => (
        <Option value={m} key={Math.random()}>
          {m}
        </Option>
      ))}
    </Select>
  );
};
