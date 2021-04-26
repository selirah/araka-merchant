import React, { lazy, Suspense } from 'react';
import { Card, Spin } from 'antd';
// import AreaChart from '../chart/AreaChart';
import CountUp from 'react-countup';

const AreaChart = lazy(() => import('../chart/AreaChart'));

interface CardViewProps {
  value: any;
  title: any;
  data: any;
  currency?: string;
  loading: boolean;
}

const CardView: React.FC<CardViewProps> = ({
  value,
  title,
  data,
  currency,
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
            <div className="card-chunk">
              <h1>
                {currency !== undefined ? currency : null}{' '}
                <CountUp
                  end={title}
                  decimals={currency !== undefined ? 2 : 0}
                  separator=","
                />
              </h1>
              <p>{value}</p>
            </div>
            <div className="card-chunk">
              <Suspense
                fallback={
                  <div className="card-spinner">
                    <Spin size="small" />
                  </div>
                }
              >
                <AreaChart info={data} />
              </Suspense>
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default CardView;
