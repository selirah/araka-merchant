import React from 'react';
import { Menu, Dropdown, Button, DatePicker, Input } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { StatusMenu } from './StatusMenu';

interface FilterMenuProps {}

export const FilterMenu: React.FC<FilterMenuProps> = () => {
  const { RangePicker } = DatePicker;
  const { Search } = Input;

  return (
    <Menu>
      <Menu.Item key="1">
        <Search
          placeholder="Search by amount, name, transaction id"
          onSearch={(value: string) => console.log(value)}
          style={{ width: 300 }}
        />
      </Menu.Item>
      <Menu.Item key="2">
        <Dropdown overlay={<StatusMenu />}>
          <Button block>
            Status <DownOutlined />
          </Button>
        </Dropdown>
      </Menu.Item>
      <Menu.Item key="3">
        <RangePicker />
      </Menu.Item>
      <Menu.Item key="4">
        <Dropdown overlay={<StatusMenu />}>
          <Button block>
            Channel <DownOutlined />
          </Button>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
};
