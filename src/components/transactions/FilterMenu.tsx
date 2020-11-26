import React from 'react';
import { Menu, Dropdown, Button, DatePicker } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { StatusMenu } from './StatusMenu';

interface FilterMenuProps {}

export const FilterMenu: React.FC<FilterMenuProps> = () => {
  const { RangePicker } = DatePicker;

  return (
    <Menu>
      <Menu.Item key="0">
        <Dropdown overlay={<StatusMenu />}>
          <Button block>
            Status <DownOutlined />
          </Button>
        </Dropdown>
      </Menu.Item>
      <Menu.Item key="1">
        <RangePicker />
      </Menu.Item>
    </Menu>
  );
};
