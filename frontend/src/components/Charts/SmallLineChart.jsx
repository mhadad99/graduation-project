import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  PointElement, LineElement, Tooltip
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip);

const data = {
  labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
  datasets: [
    {
      data: [12, 19, 10, 22, 15],
      borderColor: '#f59e0b',
      tension: 0.4,
    },
  ],
};

const options = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { y: { display: false }, x: { display: false } },
};

export default function SmallLineChart() {
  return <div style={{ height: '100px' }}><Line data={data} options={options} /></div>;
}
