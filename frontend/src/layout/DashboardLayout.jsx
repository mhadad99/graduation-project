// src/layouts/DashboardLayout.js
import React from 'react';
import { Footer } from '../components/Footer';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen">
        {/*  Header for Dashboard */}
        <header className="bg-white p-4 shadow text-2xl font-semibold">
          Admin Dashboard
        </header>

        <main className="p-6 bg-gray-100 flex-1 overflow-y-auto">
          {children}
        </main>

        <Footer />
    </div>
  );
}
