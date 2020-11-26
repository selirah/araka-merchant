import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Layout, Row, Col } from "antd";
import { path } from "../helpers/path";
import { Merchant } from "../interfaces";

interface ExamplePayProps {}

const ExamplePay: React.FC<ExamplePayProps> = () => {
  const { Content } = Layout;

  const [values] = useState<Merchant>({
    pageTitle: "INRB COVID-19 TEST",
    pageLogo: "https://inrbcovid.com/images/inrb_logo.png",
    pageDescription: "Sample description",
    customerFullName: "Mike Wazowski",
    customerPhoneNumber: "+2430990998098",
    customerEmailAddress: "example@user.com",
    transactionReference: "TRW344232134",
    currency: "USD",
    amount: "40",
    redirectURL: "https://inrbcovid.com/transaction-status",
    processId: 'b255c76a-41cc-4398-bfd2-b2f9e3238c2d'
  });

  return (
    <Layout>
      <Content style={{ background: "#fff" }}>
        <Row
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "300px",
          }}
        >
          <form action={`${path.pay}/${values.processId}`} method="get">
            <Col span={24} style={{ textAlign: "center" }}>
              <input type="hidden" value={values.pageTitle} name="pageTitle" />
              <input type="hidden" value={values.pageLogo} name="pageLogo" />
              <input type="hidden" value={values.pageDescription} name="pageDescription" />
              <input type="hidden" value={values.customerFullName} name="customerFullName" />
              <input type="hidden" value={values.customerPhoneNumber} name="customerPhoneNumber" />
              <input type="hidden" value={values.customerEmailAddress} name="customerEmailAddress" />
              <input type="hidden" value={values.transactionReference} name="transactionReference" />
              <input type="hidden" value={values.currency} name="currency" />
              <input type="hidden" value={values.amount} name="amount" />
              <input type="hidden" value={values.redirectURL} name="redirectURL" />
              <button type="submit">Make Payment</button>
            </Col>
          </form>
        </Row>
      </Content>
    </Layout>
  );
};

export default withRouter(ExamplePay);
