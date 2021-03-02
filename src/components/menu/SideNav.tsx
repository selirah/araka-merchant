import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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

  useEffect(() => {
    const { activeMenu } = utils;
    setActiveMenu(activeMenu);
  }, [utils]);

  const switchMenu = (menu: string, header: string) => {
    dispatch(changeMenu(menu));
    dispatch(changeMenuHeader(header));
  };

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={onCollapsed}>
      <div className="logo">
        {collapsed ? (
          <Image src={logo2} alt="logo" preview={false} />
        ) : (
          <Image src={logo} alt="logo" preview={false} width={150} />
        )}
      </div>
      <Menu theme="light" mode="inline" defaultSelectedKeys={[activeMenu]}>
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
            <Menu.Item
              key={menu.DASHBOARD_YEARLY}
              onClick={() =>
                switchMenu(menu.DASHBOARD_YEARLY, menuHeadings.DASHBOARDS)
              }
            >
              <Link to={path.home}>{menu.DASHBOARD_YEARLY}</Link>
            </Menu.Item>
            <Menu.Item
              key={menu.DASHBOARD_DAILY}
              onClick={() =>
                switchMenu(menu.DASHBOARD_DAILY, menuHeadings.DASHBOARDS)
              }
            >
              <Link to={path.home}>{menu.DASHBOARD_DAILY}</Link>
            </Menu.Item>
            <Menu.Item
              key={menu.DASHBOARD_WEEKLY}
              onClick={() =>
                switchMenu(menu.DASHBOARD_WEEKLY, menuHeadings.DASHBOARDS)
              }
            >
              <Link to={path.home}>{menu.DASHBOARD_WEEKLY}</Link>
            </Menu.Item>
            <Menu.Item
              key={menu.DASHBOARD_MONTHLY}
              onClick={() =>
                switchMenu(menu.DASHBOARD_MONTHLY, menuHeadings.DASHBOARDS)
              }
            >
              <Link to={path.home}>{menu.DASHBOARD_MONTHLY}</Link>
            </Menu.Item>
          </Menu.SubMenu>
        </Menu.ItemGroup>
        <Menu.ItemGroup
          key="g2"
          title={t('sideBar.payments').toLocaleUpperCase()}
        >
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
            <Link to={path.tranasctions}>{t('sideBar.transactions')}</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup
          key="g3"
          title={t('sideBar.commerce').toLocaleUpperCase()}
        >
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
            <Link to={path.paymentPages}>{t('sideBar.paymentPages')}</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup
          key="g4"
          title={t('sideBar.reports').toLocaleUpperCase()}
        >
          <Menu.Item
            key={menu.MY_PAYOUTS}
            icon={
              <FeatherIcons.CreditCard
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
            onClick={() => switchMenu(menu.MY_PAYOUTS, menuHeadings.REPORTS)}
          >
            <Link to={path.myPayouts}>{t('sideBar.myPayout')}</Link>
          </Menu.Item>
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
            <Link to={path.merchantsOverview}>
              {t('sideBar.merchantOverview')}
            </Link>
          </Menu.Item>
          <Menu.Item
            key={menu.MERCHANT_PAYOUTS}
            icon={
              <FeatherIcons.CreditCard
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
            onClick={() =>
              switchMenu(menu.MERCHANT_PAYOUTS, menuHeadings.REPORTS)
            }
          >
            <Link to={path.merchantPayouts}>
              {t('sideBar.merchantPayouts')}
            </Link>
          </Menu.Item>
          <Menu.Item
            key={menu.VAS_PROCESSED}
            icon={
              <FeatherIcons.Cpu
                className="ant-menu-item-icon anticon"
                size={14}
              />
            }
            onClick={() => switchMenu(menu.VAS_PROCESSED, menuHeadings.REPORTS)}
          >
            <Link to={path.vasProcessed}>{t('sideBar.VASProcessed')}</Link>
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
            <Link to={path.feeReports}>PCES Reports</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup
          key="g5"
          title={t('sideBar.configurations').toLocaleUpperCase()}
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
            <Link to={path.settings}>{t('sideBar.settings')}</Link>
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
