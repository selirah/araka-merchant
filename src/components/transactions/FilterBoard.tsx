import React from 'react';
import { DatePicker, Input, Select, Space } from 'antd';
import moment from 'moment';

interface FilterBoardProps {
  onSearch(value: string): void;
  onStatusFilter(value: string): void;
  onChannelFilter(value: string): void;
  // onDateFilter(value: string): string;
}

export const FilterBoard: React.FC<FilterBoardProps> = ({
  onSearch,
  onStatusFilter,
  onChannelFilter,
  // onDateFilter,
}) => {
  const { Search } = Input;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  return (
    <Space>
      <Search
        placeholder="Search by amount, transaction id"
        onSearch={(value: string) => onSearch(value)}
        style={{ width: 280 }}
        onChange={(e) => onSearch(e.target.value)}
      />
      <RangePicker
        format="YYYY-MM-DD HH:mm:ss"
        showTime={{
          hideDisabledOptions: true,
          defaultValue: [
            moment('00:00:00', 'HH:mm:ss'),
            moment('11:59:59', 'HH:mm:ss'),
          ],
        }}
        // onChange={onDateFilter}
      />
      <Select
        style={{ width: 150 }}
        onChange={onStatusFilter}
        showSearch
        placeholder="Search by Status"
      >
        <Option value="APPROVED">Approved</Option>
        <Option value="DECLINED">Declined</Option>
        <Option value="CANCELLED">Cancelled</Option>
      </Select>
      <Select
        style={{ width: 170 }}
        onChange={onChannelFilter}
        showSearch
        placeholder="Search by Channel"
      >
        <Option value="Card">Card</Option>
        <Option value="MPESA">Mpesa</Option>
      </Select>
    </Space>
  );
};
