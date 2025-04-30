import DashboardLayout from '../layout/DashboardLayout';
import Charts from '../components/Charts/Charts';
import BarChart from '../components/Charts/BarChart';
import SmallLineChart from '../components/Charts/SmallLineChart';
import DoughnutChart from '../components/Charts/DoughnutChart';
import HalfDoughnutChart from '../components/Charts/HalfDoughnutChart';
import '../styles/dashboard.css';

export default function Dashboard() {
  return (
    <DashboardLayout>
      <div className="container mt-4">
        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-success">24 new jobs</h5>
                <p className="card-text text-muted">Posted today</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-warning">12 pending applications</h5>
                <p className="card-text text-muted">Awaiting review</p>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card shadow-sm">
              <div className="card-body">
                <h5 className="card-title text-danger">8 disputes</h5>
                <p className="card-text text-muted">Require attention</p>
              </div>
            </div>
          </div>
        </div>
  
        <div className="row">
          <div className="col-md-8 mb-4">
            <div className="card shadow-sm h-100">
              <div className="card-body">
                <h5 className="card-title">Total Earnings</h5>
                <Charts />
              </div>
            </div>
          </div>
  
          <div className="col-md-4">
            <div className="row">
              <div className="col-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">Jobs Posted</h6>
                    <BarChart />
                  </div>
                </div>
              </div>
              <div className="col-6 mb-4">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">New Freelancers</h6>
                    <SmallLineChart />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">Top Categories</h6>
                    <DoughnutChart />
                  </div>
                </div>
              </div>
              <div className="col-6">
                <div className="card shadow-sm">
                  <div className="card-body">
                    <h6 className="card-title">Verified vs Unverified</h6>
                    <HalfDoughnutChart />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
  
}  
///if we have time and make it dynamically with api 
//