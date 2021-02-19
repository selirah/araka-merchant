import React from 'react';
import { Line } from 'react-chartjs-2';

import { AreaChartData } from './chart.mock';

const AreaChart = () => {
  const [barData] = React.useState(AreaChartData);

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
