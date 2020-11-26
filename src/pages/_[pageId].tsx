import React from 'react';
import { withRouter /*useParams*/ } from 'react-router-dom';
import { Layout, Row, Col } from 'antd';
import { PageDetails } from '../components/[pageId]/PageDetails';
import { PageTransactions } from '../components/[pageId]/PageTransactions';

interface PageProps {}

// interface ParamProps {
//   pageId: string;
// }

const Page: React.FC<PageProps> = () => {
  const { Content } = Layout;
  // const { pageId } = useParams<ParamProps>();

  // console.log(pageId);

  return (
    <Content
      style={{
        margin: '24px 16px',
        padding: 0,
        minHeight: 280,
      }}
    >
      <Row>
        <Col
          span={12}
          style={{ padding: 24 }}
          className="site-layout-background"
        >
          <PageDetails />
        </Col>
        <Col span={12} className="bg-gray" style={{ padding: 24 }}>
          <PageTransactions />
        </Col>
      </Row>
    </Content>
  );
};

export default withRouter(Page);
