import React from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';

import { BarChartData } from './chart.mock';

const BarChart = () => {
  const [barData] = React.useState(BarChartData);

  const { datasets, height, labels, options } = barData;

  const data = {
    datasets,
    labels,
  };

  return (
    <div className="chart">
      <Bar data={data} height={height} options={options} />
    </div>
  );
};

export { BarChart };
