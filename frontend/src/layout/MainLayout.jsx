import React from "react";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {  SharedLayout } from "../sharedLayout/SharedLayout";
import { RegisterPage } from "../pages/RegisterPage";
import CreateService from "../pages/CreateService";
import { ServiceDetailsPage } from "../pages/ServiceDetailsPage";
import UserProfile from "../pages/UserProfile";
import About from "../pages/About";
import LoginPage from "../pages/Login";


export function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="servicedetails" element={<ServiceDetailsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="add/service" element={<CreateService />} />
          <Route path="profile/:id" element={<UserProfile/>} />
          <Route path="/services/:serviceSlug" element={<ServiceDetailsPage />} />
          <Route path="/about" element={<About />} />

        </Route>
      </Routes>
    </BrowserRouter>
  );
}