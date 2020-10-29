import React from 'react';
import { Menu } from 'antd';

interface GraphMenuProps {}

export const GraphMenu: React.FC<GraphMenuProps> = () => {
  return (
    <Menu>
      <Menu.Item key="1">Last 30 days</Menu.Item>
      <Menu.Item key="2">Last 90 days</Menu.Item>
      <Menu.Item key="3">All time</Menu.Item>
      <Menu.Item key="4">Custom period</Menu.Item>
      <Menu.Item key="5">This month</Menu.Item>
      <Menu.Item key="6">Today</Menu.Item>
      <Menu.Item key="7">This week</Menu.Item>
      <Menu.Item key="8">This year</Menu.Item>
    </Menu>
  );
};
