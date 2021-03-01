import React from 'react';
import { Line } from 'react-chartjs-2';

const AreaChart = ({ info }) => {
  const [barData] = React.useState(info);

  const { datasets, height, labels, options } = barData;

  const data = {
    datasets,
    labels,
  };

  return (
    <div className="chart">
      <Line data={data} height={height} options={options} />
    </div>
  );
};

export { AreaChart };
