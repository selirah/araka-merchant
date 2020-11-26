import React from 'react';
import { Menu } from 'antd';

interface GraphMenuProps {}

export const GraphMenu: React.FC<GraphMenuProps> = () => {
  return (
    <Menu>
      <Menu.Item key="1">Last 30 days</Menu.Item>
    </Menu>
  );
};
