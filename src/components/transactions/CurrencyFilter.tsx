import React from 'react';
import { Row, Select, Button } from 'antd';

interface CurrencyFilterProps {
  onSelectCurrency(value: string): void;
  onLoadMore(): void;
  translate: any;
}

const { Option } = Select;

const CurrencyFilter: React.FC<CurrencyFilterProps> = ({
  onSelectCurrency,
  onLoadMore,
  translate,
}) => {
  return (
    <Row style={{ marginTop: 30, display: 'flex', marginBottom: 40 }}>
      <div style={{ marginRight: 20 }}>
        <h4 style={{ paddingTop: 2, fontSize: '18px', fontWeight: 400 }}>
          {translate('general.currency')}:
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
      <div style={{ marginLeft: 20 }}>
        <Button
          type="primary"
          style={{
            borderRadius: '20px',
            backgroundColor: '#35b9e6',
            border: '1px solid #35b9e6',
            textTransform: 'uppercase',
          }}
          onClick={() => onLoadMore()}
        >
          {translate('general.loadMore')}
        </Button>
      </div>
    </Row>
  );
};

export default CurrencyFilter;
