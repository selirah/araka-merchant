import React from 'react';
import { Menu } from 'antd';
import { LogoutOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

interface SettingsMenuProps {
  logoutUser(): void;
}

export const SettingsMenu: React.FC<SettingsMenuProps> = ({ logoutUser }) => {
  const { t } = useTranslation();

  return (
    <Menu>
      <Menu.Item key="1" icon={<LogoutOutlined />} onClick={() => logoutUser()}>
        {t('general.logout')}
      </Menu.Item>
    </Menu>
  );
};
