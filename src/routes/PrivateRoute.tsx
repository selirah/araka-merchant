import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { path } from '../helpers/path';
import { SideBar } from '../components/menu/SideBar';
import { TopBar } from '../components/menu/TopBar';

const PrivateRoute: React.FC<any> = ({ component: Component, ...rest }) => {
  const auth = appSelector((state) => state.auth);
  const { isAuthenticated } = auth;
  const [collapsed, setCollapsed] = useState(false);

  const toggle = () => {
    setCollapsed(!collapsed);
  };

  return (
    <React.Fragment>
      <Route
        {...rest}
        render={(props) =>
          isAuthenticated ? (
            <Layout className="min-height-vh">
              <SideBar collapsed={collapsed} />
              <Layout className="site-layout">
                <TopBar collapsed={collapsed} toggle={toggle} />
                <Component {...props} />
              </Layout>
            </Layout>
          ) : (
            <Redirect to={path.login} />
          )
        }
      />
    </React.Fragment>
  );
};

export { PrivateRoute };
