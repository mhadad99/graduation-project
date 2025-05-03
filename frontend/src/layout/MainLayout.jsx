// src/layout/MainLayout.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { SharedLayout } from "../sharedLayout/SharedLayout";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import { RegisterPage } from "../pages/RegisterPage";
import CreateService from "../pages/CreateService";
import { ServiceDetailsPage } from "../pages/ServiceDetailsPage";
import UserProfile from "../pages/UserProfile";
import About from "../pages/About";
import LoginPage from "../pages/Login";

export function MainLayout() {
  return (
    <Routes>
      <Route path="/" element={<SharedLayout />}>
        <Route index element={<Home />} />
        <Route path="*" element={<NotFound />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="register" element={<RegisterPage />} />
        <Route path="about" element={<About />} />
        <Route path="servicedetails" element={<ServiceDetailsPage />} />
        <Route path="add/service" element={<CreateService />} />
        <Route path="profile" element={<UserProfile />} />
        <Route path="services/:serviceSlug" element={<ServiceDetailsPage />} />
      </Route>
    </Routes>
  );
}
