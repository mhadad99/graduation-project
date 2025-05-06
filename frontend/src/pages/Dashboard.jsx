import Charts from '../components/Charts/Charts';
import BarChart from '../components/Charts/BarChart';
import SmallLineChart from '../components/Charts/SmallLineChart';
import DoughnutChart from '../components/Charts/DoughnutChart';
import HalfDoughnutChart from '../components/Charts/HalfDoughnutChart';
import '../styles/dashboard.css';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch('/data/dashboardData.json')
      .then(res => res.json())
      .then(data => setCards(data.statCards || []));
  }, []);

  return (
    <div className="container mt-4">
      <div className="stats-container">
        {cards.map((card, index) => (
          <div className="stat-card" key={index}>
            <div className="stat-icon">
              {index === 0 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H6z" />
                  <path d="M4 2v14a2 2 0 0 0 2 2h12" />
                </svg>
              )}
              {index === 1 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              )}
              {index === 2 && (
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              )}
            </div>
            <div className="stat-content">
              <h3>{card.title}</h3>
              <p className="text-muted">{card.subtitle}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="dashboard-grid">
        <div className="main-chart">
          <Charts />
        </div>
        <div className="side-grid">
          <div className="chart-item"><BarChart /></div>
          <div className="chart-item"><DoughnutChart /></div>
          <div className="chart-item"><SmallLineChart /></div>
          <div className="chart-item"><HalfDoughnutChart /></div>
        </div>
      </div>
    </div>
  );
}
