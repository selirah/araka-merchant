import React from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

interface SettingsMenuProps {}

export const SettingsMenu: React.FC<SettingsMenuProps> = () => {
  return (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
};
