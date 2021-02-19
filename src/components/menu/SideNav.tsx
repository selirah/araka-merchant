import React, { useState, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Layout, Menu, Image, Button } from 'antd';
import * as FeatherIcons from 'react-feather';
import { path } from '../../helpers/path';
import { useTranslation } from 'react-i18next';
import logo from '../../images/logo_symbol.png';
import logo2 from '../../images/logo_transparent_background.png';

interface SideNavProps {
  collapsed: boolean;
  onCollapsed(): void;
}

interface ParamProps {
  pageId: string;
}

export const SideNav: React.FC<SideNavProps> = ({ collapsed, onCollapsed }) => {
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
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
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
          title={t('sideBar.dashboards').toLocaleUpperCase()}
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
            <Menu.Item key="1">Daily Overview</Menu.Item>
            <Menu.Item key="2">Weekly Overview</Menu.Item>
            <Menu.Item key="3">Monthly Overview</Menu.Item>
          </Menu.SubMenu>
        </Menu.ItemGroup>
        <Menu.ItemGroup
          key="g2"
          title={t('sideBar.payments').toLocaleUpperCase()}
        >
          <Menu.Item
            key="4"
            icon={
              <FeatherIcons.ShoppingBag
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
          >
            {t('sideBar.transactions')}
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup
          key="g3"
          title={t('sideBar.commerce').toLocaleUpperCase()}
        >
          <Menu.Item
            key="5"
            icon={
              <FeatherIcons.Layers
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
          >
            {t('sideBar.paymentPages')}
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup
          key="g4"
          title={t('sideBar.reports').toLocaleUpperCase()}
        >
          <Menu.Item
            key="6"
            icon={
              <FeatherIcons.CreditCard
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
          >
            {t('sideBar.merchantPayouts')}
          </Menu.Item>
          <Menu.Item
            key="7"
            icon={
              <FeatherIcons.Cpu
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
          >
            {t('sideBar.VASProcessed')}
          </Menu.Item>
          <Menu.Item
            key="8"
            icon={
              <FeatherIcons.BarChart2
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
          >
            {t('sideBar.FEEReports')}
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup
          key="g5"
          title={t('sideBar.configurations').toLocaleUpperCase()}
        >
          <Menu.Item
            key="9"
            icon={
              <FeatherIcons.Settings
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
          >
            {t('sideBar.settings')}
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
      {!collapsed ? (
        <div className="menu-info">
          <p>{t('sideBar.menuInfo')}</p>
          <Button type="primary" className="menu-info-btn">
            {t('sideBar.apiAssistance')}
          </Button>
        </div>
      ) : null}
    </Sider>
  );
};
