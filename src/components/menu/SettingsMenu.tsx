import React from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';

interface SettingsMenuProps {
  logoutUser(): void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ logoutUser }) => {
  return (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={() => logoutUser()}>
        Logout
      </Menu.Item>
    </Menu>
  );
};
