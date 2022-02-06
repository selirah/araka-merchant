import React from 'react';
import { Row, Select } from 'antd';

interface FixedPeriodFilterProps {
  onSelectPeriod(value: string): void;
  fixedPeriod: string;
}

const { Option } = Select;

const FixedPeriodFilter: React.FC<FixedPeriodFilterProps> = ({
  fixedPeriod,
  onSelectPeriod,
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
          style={{ width: 150 }}
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
    </Row>
  );
};

export default FixedPeriodFilter;
