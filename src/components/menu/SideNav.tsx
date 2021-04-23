import React, { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Layout, Menu, Image, Button } from 'antd';
import * as FeatherIcons from 'react-feather';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import logo from '../../images/logo_symbol.png';
import logo2 from '../../images/logo_transparent_background.png';
import { changeMenu, changeMenuHeader } from '../../store/utils';
import { menu, menuHeadings } from '../../helpers/menu';
import { appSelector } from '../../helpers/appSelector';
import { AppDispatch } from '../../helpers/appDispatch';
import { path } from '../../helpers/path';
import { roles } from '../../helpers/constants';

interface SideNavProps {
  collapsed: boolean;
  onCollapsed(): void;
}

const { Sider } = Layout;

export const SideNav: React.FC<SideNavProps> = ({ collapsed, onCollapsed }) => {
  const dispatch: AppDispatch = useDispatch();
  const { t } = useTranslation();
  const utils = appSelector((state) => state.utils);
  const [activeMenu, setActiveMenu] = useState(utils.activeMenu);
  const { user } = appSelector((state) => state.auth);
  let role;

  if (user) {
    role = user.roles.find((r) => r === roles.SuperMerchant);
  } else {
    role = roles.SuperMerchant;
  }

  useEffect(() => {
    const { activeMenu } = utils;
    setActiveMenu(activeMenu);
  }, [utils]);

  const switchMenu = (menu: string, header: string) => {
    dispatch(changeMenu(menu));
    dispatch(changeMenuHeader(header));
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={onCollapsed}
      collapsedWidth="0"
      breakpoint="lg"
    >
      <div className="logo">
        {collapsed ? (
          <Image src={logo2} alt="logo" preview={false} />
        ) : (
          <Image src={logo} alt="logo" preview={false} width={150} />
        )}
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={[activeMenu]}>
        <Menu.ItemGroup key="g1" title={t('sideBar.dashboards').toUpperCase()}>
          <Menu.Item
            key={menu.DASHBOARD}
            icon={
              <FeatherIcons.Home
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
            onClick={() => switchMenu(menu.DASHBOARD, menuHeadings.DASHBOARD)}
          >
            <NavLink to={path.dashboard}>Dashboard</NavLink>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title={t('sideBar.payments').toUpperCase()}>
          <Menu.Item
            key={menu.TRANSACTIONS}
            icon={
              <FeatherIcons.ShoppingBag
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
            onClick={() => switchMenu(menu.TRANSACTIONS, menuHeadings.PAYMENTS)}
          >
            <NavLink to={path.tranasctions}>
              {t('sideBar.transactions')}
            </NavLink>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g3" title={t('sideBar.commerce').toUpperCase()}>
          <Menu.Item
            key={menu.PAYMENT_PAGES}
            icon={
              <FeatherIcons.Layers
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
            onClick={() =>
              switchMenu(menu.PAYMENT_PAGES, menuHeadings.COMMERCE)
            }
          >
            <NavLink to={path.paymentPages}>
              {t('sideBar.paymentPages')}
            </NavLink>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g4" title={t('sideBar.payouts').toUpperCase()}>
          <Menu.Item
            key={menu.PAYOUTS}
            icon={
              <FeatherIcons.ShoppingBag
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
            onClick={() => switchMenu(menu.PAYOUTS, menuHeadings.PAYOUTS)}
          >
            <NavLink to={path.payouts}>{t('sideBar.payouts')}</NavLink>
          </Menu.Item>
        </Menu.ItemGroup>
        {role !== undefined && role === roles.SuperMerchant ? (
          <Menu.ItemGroup key="g5" title={t('sideBar.reports').toUpperCase()}>
            <Menu.Item
              key={menu.MERCHANT_OVERVIEW}
              icon={
                <FeatherIcons.Users
                  className="ant-menu-item-icon anticon"
                  size={14}
                />
              }
              onClick={() =>
                switchMenu(menu.MERCHANT_OVERVIEW, menuHeadings.REPORTS)
              }
            >
              <NavLink to={path.merchantsOverview}>
                {t('sideBar.merchantOverview')}
              </NavLink>
            </Menu.Item>

            <Menu.Item
              key={menu.VAS_PROCESSED}
              icon={
                <FeatherIcons.Cpu
                  className="ant-menu-item-icon anticon"
                  size={14}
                />
              }
              onClick={() =>
                switchMenu(menu.VAS_PROCESSED, menuHeadings.REPORTS)
              }
            >
              <NavLink to={path.vasProcessed}>
                {t('sideBar.VASProcessed')}
              </NavLink>
            </Menu.Item>

            <Menu.Item
              key={menu.FEE_REPORTS}
              icon={
                <FeatherIcons.BarChart2
                  className="ant-menu-item-icon anticon"
                  size={14}
                />
              }
              onClick={() => switchMenu(menu.FEE_REPORTS, menuHeadings.REPORTS)}
            >
              <NavLink to={path.feeReports}>PCES Reports</NavLink>
            </Menu.Item>

            <Menu.SubMenu
              key="sub2"
              icon={
                <FeatherIcons.BarChart
                  className="ant-menu-item-icon anticon"
                  size={14}
                />
              }
              title="ProxyPay Reports"
            >
              <Menu.Item
                key={menu.PROXYPAY_OVERVIEW}
                onClick={() =>
                  switchMenu(menu.PROXYPAY_OVERVIEW, menuHeadings.REPORTS)
                }
              >
                <NavLink to={path.proxyPayOverview}>
                  {menu.PROXYPAY_OVERVIEW}
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key={menu.PROXYPAY_SUBSCRIBERS}
                onClick={() =>
                  switchMenu(menu.PROXYPAY_SUBSCRIBERS, menuHeadings.REPORTS)
                }
              >
                <NavLink to={path.proxyPaySubscribers}>
                  {menu.PROXYPAY_SUBSCRIBERS}
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key={menu.PROXYPAY_TRANSACTIONS}
                onClick={() =>
                  switchMenu(menu.PROXYPAY_TRANSACTIONS, menuHeadings.REPORTS)
                }
              >
                <NavLink to={path.proxyPayTransactions}>
                  {menu.PROXYPAY_TRANSACTIONS}
                </NavLink>
              </Menu.Item>
              <Menu.Item
                key={menu.PROXYPAY_VOLUMES}
                onClick={() =>
                  switchMenu(menu.PROXYPAY_VOLUMES, menuHeadings.REPORTS)
                }
              >
                <NavLink to={path.proxyPayVolumes}>
                  {menu.PROXYPAY_VOLUMES}
                </NavLink>
              </Menu.Item>
            </Menu.SubMenu>
          </Menu.ItemGroup>
        ) : null}
        <Menu.ItemGroup
          key="g6"
          title={t('sideBar.configurations').toUpperCase()}
        >
          <Menu.Item
            key={menu.SETTINGS}
            icon={
              <FeatherIcons.Settings
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
            onClick={() =>
              switchMenu(menu.SETTINGS, menuHeadings.CONFIGURATION)
            }
          >
            <NavLink to={path.settings}>{t('sideBar.settings')}</NavLink>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
      {!collapsed ? (
        <div className="menu-info">
          <p>{t('sideBar.menuInfo')}</p>
          <a href="mailto://info@proxypay.africa">
            <Button type="primary" className="menu-info-btn">
              {t('sideBar.apiAssistance')}
            </Button>
          </a>
        </div>
      ) : null}
    </Sider>
  );
};
