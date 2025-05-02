// src/layouts/DashboardLayout.js
import React from 'react';
import '../styles/DashboardLayout.css'
import '../styles/dashboard.css';
import { Footer } from '../components/Footer';

export default function DashboartdLayout({ children }) {
  return (
    <div className="flex dashboard-container h-screen">
        {/*  Header for Dashboard */}
        <header className="bg-white dashboard-header p-4 shadow text-2xl font-semibold">
          Admin Dashboard
        </header>
        


        <main className="p-6 bg-gray-100 flex-1 ">
          {children}
        </main>

        <Footer />
    </div>
  );
}
