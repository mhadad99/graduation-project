import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Coupon A', 'Coupon B', 'Coupon C'],
  datasets: [{
    data: [30, 50, 20],
    backgroundColor: ['#3b82f6', '#10b981', '#f59e0b'],
  }],
};

const options = {
  plugins: {
    legend: { position: 'right' },
    title: { display: true, text: 'Top Coupons' },
  },
};

export default function DoughnutChart() {
  return <div style={{ height: '250px' }}><Doughnut data={data} options={options} /></div>;
}
