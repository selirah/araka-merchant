import React from 'react';
import { Card, Image } from 'antd';
import AreaChart from '../chart/AreaChart';
import CountUp from 'react-countup';
import spinner from '../../images/spinner.svg';

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
            <Image src={spinner} width={40} />
            <div>
              <small>loading..</small>
            </div>
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
              <AreaChart info={data} />
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default CardView;
