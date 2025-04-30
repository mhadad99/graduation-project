import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS, CategoryScale, LinearScale,
  BarElement, Title, Tooltip, Legend
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const data = {
  labels: ['Orders', 'Sales', 'Returns'],
  datasets: [
    {
      label: 'This Week',
      data: [150, 200, 30],
      backgroundColor: ['#3b82f6', '#10b981', '#ef4444'],
    },
  ],
};

const options = {
  responsive: true,
  plugins: {
    legend: { display: false },
    title: { display: true, text: 'Weekly Summary' },
  },
};

export default function BarChart() {
  return <div style={{ height: '200px' }}><Bar data={data} options={options} /></div>;
}
