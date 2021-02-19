import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Layout, Menu, Dropdown, Button, Row, Col } from 'antd';
import { useDispatch } from 'react-redux';
import {
  UserOutlined,
  RightOutlined,
  DownOutlined,
  BellOutlined,
} from '@ant-design/icons';
import * as FeatherIcons from 'react-feather';
import { path } from '../../helpers/path';
import { logout } from '../../store/auth/actions';
import { secure } from '../../utils/secure';
import { AppDispatch } from '../../helpers/appDispatch';
import { useTranslation } from 'react-i18next';

interface TopNavProps {
  collapsed: boolean;
  toggle(): void;
}

interface ParamProps {
  pageId: string;
}

export const TopNav: React.FC<TopNavProps> = ({ collapsed, toggle }) => {
  const dispatch: AppDispatch = useDispatch();
  const history = useHistory();
  const { Header } = Layout;
  const [header, setHeader] = useState(<Link to={path.home}>Dashboard</Link>);
  const { pathname } = history.location;
  const { pageId } = useParams<ParamProps>();
  const { t, i18n } = useTranslation();
  const [active, setActive] = useState<string | null>(
    localStorage.getItem('i18nextLng')
  );

  const logoutUser = () => {
    secure.removeAll();
    dispatch(logout());
  };

  const onChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setActive(lang);
  };

  useEffect(() => {
    switch (pathname) {
      case path.home:
        setHeader(<Link to={path.home}>{t('topBar.home')}</Link>);
        break;
      case path.tranasctions:
        setHeader(
          <Link to={path.tranasctions}>{t('topBar.transactions')}</Link>
        );
        break;
      case path.paymentPages:
        setHeader(
          <Link to={path.paymentPages}>{t('topBar.paymentPages')}</Link>
        );
        break;
      case `${path.page}/${pageId}`:
        setHeader(
          <React.Fragment>
            <Link to={path.paymentPages}>{t('topBar.page')}</Link>{' '}
            <RightOutlined /> {pageId}
          </React.Fragment>
        );
        break;
    }
  }, [pathname, pageId, t]);

  function handleMenuClick() {}

  const menu = (
    <Menu onClick={handleMenuClick}>
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
                <h4>Dashboards</h4>
              </div>
              <div className="topNavHeaderSub">
                <h4>Daily Overview</h4>
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
