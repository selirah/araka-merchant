import React from 'react';
import { Link } from 'react-router-dom';
import { Layout } from 'antd';

interface FooterLayoutProps {}

const { Footer } = Layout;

export const FooterLayout: React.FC<FooterLayoutProps> = () => {
  return (
    <Footer>
      <h4>PROXYPAY &#11044;</h4>
      <p>
        Copyright &copy; 2020 - {new Date().getFullYear()} |{' '}
        <Link to="#">Privacy Policy</Link>
      </p>
    </Footer>
  );
};
