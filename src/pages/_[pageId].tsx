import React, { useState, useEffect } from 'react';
import { withRouter, useParams } from 'react-router-dom';
import { Layout, Row, Col, Card } from 'antd';
import { PageDetails } from '../components/[pageId]/PageDetails';
import { PageTransactions } from '../components/[pageId]/PageTransactions';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../helpers/appDispatch';
import { appSelector } from '../helpers/appSelector';
import { getPageTranxRequest, clearStates } from '../store/payment-pages';
import { TransactionHistory } from '../interfaces';

interface PageProps {}

interface ParamProps {
  pageId: string;
}

const Page: React.FC<PageProps> = () => {
  const { Content } = Layout;
  const dispatch: AppDispatch = useDispatch();
  const { pageId } = useParams<ParamProps>();
  const page = appSelector((state) => state.page);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionHistory[]>([]);

  useEffect(() => {
    dispatch(clearStates());
    dispatch(getPageTranxRequest(parseInt(pageId)));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { pageTransactions, loading } = page;
    setLoading(loading);
    setTransactions(pageTransactions);
  }, [page]);

  return (
    <div className="padding-box">
      <Content className="site-layout-background site-box">
        <div className="margin-top">
          <Card>
            <Row>
              <Col
                span={12}
                style={{ padding: 24 }}
                className="site-layout-background"
              >
                <PageDetails />
              </Col>
              <Col span={12} className="bg-gray" style={{ padding: 24 }}>
                <PageTransactions
                  loading={loading}
                  transactions={transactions}
                />
              </Col>
            </Row>
          </Card>
        </div>
      </Content>
    </div>
  );
};

export default withRouter(Page);
