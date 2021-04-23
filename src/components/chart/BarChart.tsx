import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Image } from 'antd';
import spinner from '../../images/spinner.svg';

interface BarChartProps {
  info: any;
  loading: boolean;
}

const BarChart: React.FC<BarChartProps> = ({ info, loading }) => {
  const [chartData] = React.useState(info);

  const { datasets, height, labels, options } = chartData;

  const data = {
    datasets,
    labels,
  };

  return (
    <div className="chart">
      {loading ? (
        <div style={{ textAlign: 'center' }}>
          <Image src={spinner} width={40} />
          <div>
            <small>loading..</small>
          </div>
        </div>
      ) : (
        <Bar data={data} height={height} options={options} />
      )}
    </div>
  );
};

export default BarChart;
