import React, { useState } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Layout, Divider } from 'antd';
import { appSelector } from '../helpers/appSelector';
import { path } from '../helpers/path';
// import { SideBar } from '../components/menu/SideBar';
import { SideNav } from '../components/menu/SideNav';
// import { TopBar } from '../components/menu/TopBar';
import { TopNav } from '../components/menu/TopNav';
import { FooterLayout as Footer } from '../components/menu/Footer';

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
              <SideNav collapsed={collapsed} onCollapsed={toggle} />
              <Layout className="site-layout">
                <TopNav collapsed={collapsed} toggle={toggle} />
                <Component {...props} />

                <div className="footer-padding">
                  <Divider />
                  <Footer />
                </div>
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
