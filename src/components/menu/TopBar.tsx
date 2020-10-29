import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Layout, Menu, Dropdown, Button } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  DownOutlined,
  BellOutlined,
  UserOutlined,
  RightOutlined,
} from '@ant-design/icons';
import { StarterMenu } from './StarterMenu';
// import { TestMenu } from './TestMenu';
import { NotificationsMenu } from './NotificationsMenu';
import { SettingsMenu } from './SettingsMenu';
import { path } from '../../helpers/path';

interface TopBarProps {
  collapsed: boolean;
  toggle(): void;
}

export const TopBar: React.FC<TopBarProps> = ({ collapsed, toggle }) => {
  const history = useHistory();
  const { Header } = Layout;
  const [header, setHeader] = useState(<Link to={path.home}>Dashboard</Link>);
  const { pathname } = history.location;

  useEffect(() => {
    switch (pathname) {
      case path.home:
        setHeader(<Link to={path.home}>Dashboard</Link>);
        break;
      case path.tranasctions:
        setHeader(<Link to={path.tranasctions}>Transactions</Link>);
        break;
      case path.paymentPages:
        setHeader(<Link to={path.paymentPages}>Payment Pages</Link>);
        break;
      case path.page:
        setHeader(
          <React.Fragment>
            <Link to={path.page}>Pages</Link> <RightOutlined />
          </React.Fragment>
        );
    }
  }, [pathname]);

  return (
    <Header className="site-layout-background" style={{ padding: 0 }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: 'trigger',
        onClick: toggle,
      })}
      <span className="portal-title">{header}</span>
      <Menu mode="horizontal" className="f-right">
        <Menu.Item key="1">
          <Dropdown overlay={<StarterMenu />}>
            <Button danger>
              Starter Business <DownOutlined />
            </Button>
          </Dropdown>
        </Menu.Item>
        {/* <Menu.Item key="2">
          <Dropdown overlay={<TestMenu />}>
            <Button danger>
              Test Mode <DownOutlined />
            </Button>
          </Dropdown>
        </Menu.Item> */}
        <Menu.Item key="3">
          <Dropdown overlay={<NotificationsMenu />}>
            <BellOutlined />
          </Dropdown>
        </Menu.Item>
        <Menu.Item key="4">
          <Dropdown overlay={<SettingsMenu />}>
            <UserOutlined />
          </Dropdown>
        </Menu.Item>
      </Menu>
    </Header>
  );
};
