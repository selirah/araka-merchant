import React from 'react';
import { withRouter } from 'react-router-dom';
import { Layout, Row, Col, Image } from 'antd';
import { PayForm } from '../components/[pay]/PayForm';
import visa from '../images/visa.png';
import mastercard from '../images/master-card.png';

interface PayProps {}

const Pay: React.FC<PayProps> = () => {
  const { Content } = Layout;
  return (
    <Layout>
      <Content style={{ background: '#fff' }}>
        <Row
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '10px',
          }}
        >
          <Col span={6}>
            <div className="pay-details">
              <Image width={100} src="https://via.placeholder.com/150" />
              <h2>ACME GROUP LLC.</h2>
              <h4>BY MERCHANT COMPANY NAME</h4>
              <p>Payment for one time contract to develop payment platform</p>
            </div>
          </Col>
        </Row>
        <PayForm />
        <Row
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            marginTop: '50px',
          }}
        >
          <div className="pay-logos">
            <Image width={80} src={visa} />
            <Image width={80} src={mastercard} />
          </div>
        </Row>
      </Content>
    </Layout>
  );
};

export default withRouter(Pay);
