import React from 'react';
import { Row, Col, Button, Collapse, Select, Form, DatePicker } from 'antd';

interface CurrencyFilterProps {
  onSelectCurrency(value: string): void;
}

const { Option } = Select;

const CurrencyFilter: React.FC<CurrencyFilterProps> = ({
  onSelectCurrency,
}) => {
  return (
    <Row style={{ marginTop: 30, display: 'flex', marginBottom: 40 }}>
      <div style={{ marginRight: 20 }}>
        <h4 style={{ paddingTop: 2, fontSize: '18px', fontWeight: 400 }}>
          Currency:
        </h4>
      </div>
      <div>
        <Select defaultValue="USD" onChange={onSelectCurrency}>
          <Option key="USD" value="USD">
            USD
          </Option>
          <Option key="CDF" value="CDF">
            CDF
          </Option>
        </Select>
      </div>
    </Row>
  );
};

export default CurrencyFilter;
