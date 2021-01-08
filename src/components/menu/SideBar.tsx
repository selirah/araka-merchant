import React, { useState, useEffect } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import { Layout, Menu } from 'antd';
import {
  HomeOutlined,
  CreditCardOutlined,
  InboxOutlined,
} from '@ant-design/icons';
import { path } from '../../helpers/path';
import { useTranslation } from 'react-i18next';

interface SideBarProps {
  collapsed: boolean;
}

interface ParamProps {
  pageId: string;
}

export const SideBar: React.FC<SideBarProps> = ({ collapsed }) => {
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
    <Sider trigger={null} collapsible collapsed={collapsed}>
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={active}>
        <Menu.Item key="1" icon={<HomeOutlined />}>
          <Link to={path.home}>{t('topBar.home')}</Link>
        </Menu.Item>
        <Menu.ItemGroup key="g1" title={t('sideBar.payments').toUpperCase()}>
          <Menu.Item key="2" icon={<CreditCardOutlined />}>
            <Link to={path.tranasctions}>{t('sideBar.transactions')}</Link>
          </Menu.Item>
        </Menu.ItemGroup>
        <Menu.ItemGroup key="g2" title={t('sideBar.commerce').toUpperCase()}>
          <Menu.Item key="3" icon={<InboxOutlined />}>
            <Link to={path.paymentPages}>{t('sideBar.paymentPages')}</Link>
          </Menu.Item>
        </Menu.ItemGroup>
      </Menu>
    </Sider>
  );
};
