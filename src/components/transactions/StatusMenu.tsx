import React from 'react';
import { Menu } from 'antd';

interface StatusMenuProps {}

export const StatusMenu: React.FC<StatusMenuProps> = () => {
  return (
    <Menu>
      <Menu.Item key="1">Active</Menu.Item>
      <Menu.Item key="2">Inactive</Menu.Item>
    </Menu>
  );
};
