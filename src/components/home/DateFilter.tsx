import React from 'react';
import { DatePicker, Space } from 'antd';

interface DateFilterProps {
  filterVolume(value: any): void;
}

export const DateFilter: React.FC<DateFilterProps> = ({ filterVolume }) => {
  return (
    <Space>
      <DatePicker
        format="MMMM D, YYYY"
        picker="date"
        onChange={filterVolume}
        size="large"
        allowClear={true}
      />
    </Space>
  );
};
