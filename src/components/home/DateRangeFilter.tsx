import React from 'react';
import { DatePicker, Space } from 'antd';

interface DateRangeFilterProps {
  filterDate(value: any): void;
  dateRange: any;
}

export const DateRangeFilter: React.FC<DateRangeFilterProps> = ({
  filterDate,
  dateRange,
}) => {
  const { RangePicker } = DatePicker;
  return (
    <Space>
      <RangePicker
        format="MMMM D, YYYY"
        picker="date"
        onChange={filterDate}
        size="large"
        value={dateRange !== '' ? dateRange : ''}
        allowClear={true}
      />
    </Space>
  );
};
