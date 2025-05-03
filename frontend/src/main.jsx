// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import "bootstrap/dist/css/bootstrap.min.css";
import './styles/colors.css';
import { myStore } from "./store";

import { MainLayout } from "./layout/MainLayout";
import DashboardLayout from "./layout/DashboardLayout";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={myStore}>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard/*" element={<DashboardLayout />} />
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
