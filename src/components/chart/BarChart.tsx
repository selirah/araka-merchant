import React from 'react';
import { Bar } from 'react-chartjs-2';

interface BarChartProps {
  info: any;
}

const BarChart: React.FC<BarChartProps> = ({ info }) => {
  const [chartData] = React.useState(info);

  const { datasets, height, labels, options } = chartData;

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

export default BarChart;
