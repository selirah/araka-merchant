import React from 'react';
import { Row, Select } from 'antd';

interface LiveFilterProps {
  onSelectCurrency(value: string): void;
  onSelectPeriod(value: string): void;
  currency: string;
  fixedPeriod: string;
}

const { Option } = Select;

const LiveFilter: React.FC<LiveFilterProps> = ({
  onSelectCurrency,
  onSelectPeriod,
  currency,
  fixedPeriod,
}) => {
  return (
    <Row style={{ marginTop: 30, display: 'flex', marginBottom: 40 }}>
      <div style={{ marginRight: 20 }}>
        <h4 style={{ paddingTop: 2, fontSize: '15px', fontWeight: 400 }}>
          Period:
        </h4>
      </div>
      <div>
        <Select
          defaultValue={fixedPeriod}
          onChange={onSelectPeriod}
          style={{ width: 100 }}
        >
          <Option key="daily" value="daily">
            DAILY
          </Option>
          <Option key="weekly" value="weekly">
            WEEKLY
          </Option>
          <Option key="monthly" value="monthly">
            MONTHLY
          </Option>
          <Option key="overall" value="overall">
            OVERALL
          </Option>
        </Select>
      </div>
      <div style={{ marginRight: 20, marginLeft: 50 }}>
        <h4 style={{ paddingTop: 2, fontSize: '15px', fontWeight: 400 }}>
          Currency:
        </h4>
      </div>
      <div>
        <Select defaultValue={currency} onChange={onSelectCurrency}>
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

export default LiveFilter;
