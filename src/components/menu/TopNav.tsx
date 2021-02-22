import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Layout, Menu, Dropdown, Button, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import { UserOutlined, DownOutlined, BellOutlined } from '@ant-design/icons';
import * as FeatherIcons from 'react-feather';
import { logout } from '../../store/auth/actions';
import { secure } from '../../utils/secure';
import { AppDispatch } from '../../helpers/appDispatch';
import { appSelector } from '../../helpers/appSelector';

interface TopNavProps {
  collapsed: boolean;
  toggle(): void;
}

export const TopNav: React.FC<TopNavProps> = ({ collapsed, toggle }) => {
  const dispatch: AppDispatch = useDispatch();
  const { Header } = Layout;
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState<string | null>(
    localStorage.getItem('i18nextLng')
  );
  const { activeMenu, menuHeader } = appSelector((state) => state.utils);

  const logoutUser = () => {
    secure.removeAll();
    dispatch(logout());
  };

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setActive(lang);
  };

  const menu = (
    <Menu>
      <Menu.Item key="1" onClick={() => onChangeLanguage('en')}>
        EN
      </Menu.Item>
      <Menu.Item key="2" onClick={() => onChangeLanguage('fr')}>
        FR
      </Menu.Item>
    </Menu>
  );

  const settingsMenu = (
    <Menu>
      <Menu.Item key="1" onClick={() => logoutUser()}>
        {t('topBar.logout')}
      </Menu.Item>
    </Menu>
  );

  return (
    <Header className="site-layout-background">
      <Row>
        <Col span={24}>
          <div className="header-box">
            <div className="top-nav-first">
              <div className="topNavIcons">
                <FeatherIcons.Star className="top-nav-icons" size={25} />
                <FeatherIcons.Search className="top-nav-icons" size={25} />
              </div>
              <div className="topNavHeaders">
                <h4>{menuHeader}</h4>
              </div>
              <div className="topNavHeaderSub">
                <h4>{activeMenu}</h4>
              </div>
            </div>
            <div className="user-box">
              <Dropdown overlay={menu}>
                <Button className="lang-buton">
                  {active === 'en' ? 'EN' : 'FR'} <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={menu}>
                <Button className="lang-buton">
                  <BellOutlined />
                  <DownOutlined />
                </Button>
              </Dropdown>
              <Dropdown overlay={settingsMenu}>
                <Button className="lang-buton">
                  <UserOutlined className="grey-bg" />
                  <DownOutlined />
                </Button>
              </Dropdown>
            </div>
          </div>
        </Col>
      </Row>
    </Header>
  );
};
