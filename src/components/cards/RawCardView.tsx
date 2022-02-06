import React from 'react';
import { Card, Spin } from 'antd';
import CountUp from 'react-countup';

interface RawCardViewProps {
  value: any;
  title: any;
  desc?: string;
  currency?: string;
  loading: boolean;
}

const RawCardView: React.FC<RawCardViewProps> = ({
  title,
  value,
  currency,
  desc,
  loading,
}) => {
  return (
    <Card className="stats-padding">
      <div className="ecard">
        {loading ? (
          <div className="card-spinner">
            <Spin size="small" />
          </div>
        ) : (
          <>
            <div className="card-chunk-raw">
              <h1>
                {currency !== undefined ? currency : null}{' '}
                <CountUp
                  end={title}
                  decimals={currency !== undefined ? 2 : 0}
                  separator=","
                />
              </h1>
              <p className={`value ${!desc ? 'padding' : null}`}>{value}</p>
              <p className="desc">{desc}</p>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default RawCardView;
