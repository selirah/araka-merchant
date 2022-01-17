import React from 'react';
import { Row, Select, Button } from 'antd';

interface LiveFilterProps {
  onSelectCurrency(value: string): void;
  onSelectPeriod(value: string): void;
  currency: string;
  fixedPeriod: string;
  onRefreshPage(): void;
  translate: any;
}

const { Option } = Select;

const LiveFilter: React.FC<LiveFilterProps> = ({
  onSelectCurrency,
  onSelectPeriod,
  currency,
  fixedPeriod,
  onRefreshPage,
  translate,
}) => {
  return (
    <Row
      style={{
        marginTop: 30,
        display: 'flex',
        marginBottom: 40,
        justifyContent: 'start',
      }}
    >
      <div style={{ marginRight: 20 }}>
        <h4 style={{ paddingTop: 2, fontSize: '15px', fontWeight: 400 }}>
          {translate('general.period')}:
        </h4>
      </div>
      <div>
        <Select
          defaultValue={fixedPeriod}
          onChange={onSelectPeriod}
          style={{ width: 150 }}
        >
          <Option key="daily" value="daily">
            {translate('general.daily').toUpperCase()}
          </Option>
          <Option key="weekly" value="weekly">
            {translate('general.weekly').toUpperCase()}
          </Option>
          <Option key="monthly" value="monthly">
            {translate('general.monthly').toUpperCase()}
          </Option>
          <Option key="overall" value="overall">
            {translate('general.overall').toUpperCase()}
          </Option>
        </Select>
      </div>
      <div style={{ marginRight: 20, marginLeft: 50 }}>
        <h4 style={{ paddingTop: 2, fontSize: '15px', fontWeight: 400 }}>
          {translate('general.currency')}:
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
      <div style={{ marginLeft: 'auto' }}>
        <Button
          className="refresh-btn"
          type="primary"
          onClick={() => onRefreshPage()}
        >
          {translate('general.refresh').toUpperCase()}
        </Button>
      </div>
    </Row>
  );
};

export default LiveFilter;
