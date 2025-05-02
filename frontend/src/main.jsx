// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import { MainLayout } from "./layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css"
import UserProfile from "./pages/UserProfile";
import { Header } from "./components/Header";
import About from "./pages/About";
import './styles/colors.css'
import { myStore } from "./store";


import Dashboard from './pages/Dashboard';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      <Provider store={myStore}>
      <MainLayout />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>

);
