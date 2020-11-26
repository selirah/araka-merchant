import React from 'react';
import { Menu } from 'antd';
import { PieChartOutlined } from '@ant-design/icons';

interface NotificationsMenuProps {}

export const NotificationsMenu: React.FC<NotificationsMenuProps> = () => {
  return (
    <Menu>
      <Menu.Item key="1" icon={<PieChartOutlined />}>
        1st menu item
      </Menu.Item>
      <Menu.Item key="2" icon={<PieChartOutlined />}>
        2nd menu item
      </Menu.Item>
      <Menu.Item key="3" icon={<PieChartOutlined />}>
        3rd item
      </Menu.Item>
    </Menu>
  );
};
