import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Layout, Menu, Image } from 'antd';
import {
  HomeOutlined,
  CreditCardOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import * as FeatherIcons from 'react-feather';
import { path } from '../../helpers/path';
import { useTranslation } from 'react-i18next';
import logo from '../../images/logo_symbol.png';
import logo2 from '../../images/logo_transparent_background.png';

interface SideBarProps {
  collapsed: boolean;
  onCollapsed(): void;
}

interface ParamProps {
  pageId: string;
}

export const SideBar: React.FC<SideBarProps> = ({ collapsed, onCollapsed }) => {
  const history = useHistory();
  const { Sider } = Layout;
  const { pathname } = history.location;
  const { pageId } = useParams<ParamProps>();
  const { t } = useTranslation();

  let act;
  switch (pathname) {
    case path.home:
      act = ['1'];
      break;
    case path.tranasctions:
      act = ['2'];
      break;
    case path.paymentPages:
      act = ['3'];
      break;
    case `${path.page}/${pageId}`:
      act = ['3'];
      break;
  }
  const [active, setActive] = useState(act);

  useEffect(() => {
    switch (pathname) {
      case path.home:
        setActive(['1']);
        break;
      case path.tranasctions:
        setActive(['2']);
        break;
      case path.paymentPages:
        setActive(['3']);
        break;
      case `${path.page}/${pageId}`:
        setActive(['3']);
        break;
    }
  }, [pathname, pageId]);

  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapsed}
    >
      <div className="logo">
        {collapsed ? (
          <Image src={logo2} alt="logo" preview={false} />
        ) : (
          <Image src={logo} alt="logo" preview={false} width={150} />
        )}
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={active}>
        <Menu.ItemGroup
          key="g1"
          title={t('dashboard.dashboards').toLocaleUpperCase()}
        >
          <Menu.SubMenu
            key="sub1"
            icon={
              <FeatherIcons.Home
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
            title="Dashboard Main"
          >
            <Menu.Item key="3">Daily Overview</Menu.Item>
            <Menu.Item key="4">Weekly Overview</Menu.Item>
            <Menu.Item key="5">Monthly Overview</Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="1" icon={<HomeOutlined />}>
            <Link to={path.home}>{t('topBar.home')}</Link>
          </Menu.Item>
        </Menu.ItemGroup>

        <Menu.Item key="2" icon={<CreditCardOutlined />}>
          <Link to={path.tranasctions}>{t('sideBar.transactions')}</Link>
        </Menu.Item>

        <Menu.Item key="3" icon={<InboxOutlined />}>
          <Link to={path.paymentPages}>{t('sideBar.paymentPages')}</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};
