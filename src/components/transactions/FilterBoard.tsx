import React from 'react';
import { DatePicker, Input, Select, Space } from 'antd';
import moment from 'moment';
import { useTranslation } from 'react-i18next';

interface FilterBoardProps {
  onSearch(value: string): void;
  onStatusFilter(value: string): void;
  onChannelFilter(value: string): void;
  onDateFilter(value: any): void;
}

export const FilterBoard: React.FC<FilterBoardProps> = ({
  onSearch,
  onStatusFilter,
  onChannelFilter,
  onDateFilter,
}) => {
  const { Search } = Input;
  const { Option } = Select;
  const { RangePicker } = DatePicker;
  const { t } = useTranslation();
  return (
    <Space>
      <Search
        placeholder={t('transactions.filterBoard.search')}
        onSearch={(value: string) => onSearch(value)}
        style={{ width: 300 }}
        onChange={(e) => onSearch(e.target.value)}
      />
      <RangePicker
        format="MMMM D, YYYY (h:mm a)"
        showTime={{
          hideDisabledOptions: true,
          defaultValue: [
            moment('00:00:00', 'HH:mm:ss'),
            moment('11:59:59', 'HH:mm:ss'),
          ],
        }}
        onChange={onDateFilter}
        style={{ width: 500 }}
      />
      <Select
        style={{ width: 200 }}
        onChange={onStatusFilter}
        showSearch
        placeholder={t('transactions.filterBoard.statusSearch')}
      >
        <Option value="">{t('transactions.filterBoard.all')}</Option>
        <Option value="APPROVED">{t('transactions.table.approved')}</Option>
        <Option value="DECLINED">{t('transactions.table.declined')}</Option>
        <Option value="CANCELED">{t('transactions.table.canceled')}</Option>
      </Select>
      <Select
        style={{ width: 200 }}
        onChange={onChannelFilter}
        showSearch
        placeholder={t('transactions.filterBoard.channelSearch')}
      >
        <Option value="">{t('transactions.filterBoard.all')}</Option>
        <Option value="Card">{t('transactions.filterBoard.card')}</Option>
        <Option value="MPESA">{t('transactions.filterBoard.mpesa')}</Option>
      </Select>
    </Space>
  );
};
