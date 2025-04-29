import React from 'react';
import Sidebar from '../components/admin-dashboard/sidebar';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <p>Welcome to the admin control panel for your freelancer platform.</p>
      <Sidebar></Sidebar>
    </div>
  );
};

export default AdminDashboard;