// src/layout/MainLayout.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import { SharedLayout } from "../sharedLayout/SharedLayout";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import AddProject from '../pages/AddProject';
import ProjectDetails from '../pages/ProjectDetails';

import {
  BrowserRouter,
 
} from "react-router-dom";
import { RegisterPage } from "../pages/RegisterPage";
import CreateService from "../pages/CreateService";
import { ServiceDetailsPage } from "../pages/ServiceDetailsPage";
import UserProfile from "../pages/UserProfile";
import About from "../pages/About";
import LoginPage from "../pages/Login";
import Settings from "../pages/Setting";
import Chat from "../pages/Chat";
import ServicesPage from "../pages/ServicesPage";
import Help from "../components/Help";
import EditProfile from "../pages/EditProfile";
import Projects from "../pages/Projects";
import Chatbot from "../components/chatbot/Chatbot";

export function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} /> 
          <Route path="/project/:id" element={<ProjectDetails />} />
          <Route path="/add/project" element={<AddProject />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage  />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="/about" element={<About />} />
          <Route path="servicedetails" element={<ServiceDetailsPage />} />
          <Route path=":id/service" element={<CreateService />} />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="profile/edit/:id" element={<EditProfile />} />
          <Route path="/services/:id" element={<ServiceDetailsPage />} />          
          <Route path="/about" element={<About />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="chat" element={<Chat />} />
        <Route path="chat/:conversationId" element={<Chat />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="help" element={<Help />} />
        <Route path="projects" element={<Projects />} />
        <Route path="tanfeezbot" element={<Chatbot />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
