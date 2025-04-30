import { Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS, ArcElement, Tooltip, Legend
} from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const data = {
  labels: ['Paying', 'Non-Paying'],
  datasets: [{
    data: [70, 30],
    backgroundColor: ['#10b981', '#f43f5e'],
    borderWidth: 1,
  }],
};

const options = {
  circumference: 180,
  rotation: -90,
  plugins: {
    legend: { position: 'bottom' },
    title: { display: true, text: 'Customer Payment Status' },
  },
};

export default function HalfDoughnutChart() {
  return <div style={{ height: '200px' }}><Doughnut data={data} options={options} /></div>;
}
