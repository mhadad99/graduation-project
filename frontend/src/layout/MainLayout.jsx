/** @format */

import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Layouts
import { SharedLayout } from "../sharedLayout/SharedLayout";
import AdminLayout from "../sharedLayout/AdminLayout";

// Pages
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import CreateService from "../pages/CreateService";
import CreateProject from "../pages/CreateProject";
import { ServiceDetailsPage } from "../pages/ServiceDetailsPage";
import UserProfile from "../pages/UserProfile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import ServicesPage from "../pages/ServicesPage";
import Chat from "../pages/Chat";
import Proposals from "../pages/Proposals";
import AdminDashboard from "../pages/admin/AdminDashboard";
import AdminUsers from "../pages/admin/AdminUsers";
import AdminServices from "../pages/admin/AdminServices";
import EditProfile from "../pages/EditProfile";
import Settings from "../pages/Settings";
import SavedServices from "../pages/SavedServices";
import Help from "../pages/Help";

export function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="services" element={<ServicesPage />} />
          <Route
            path="service-details/:serviceId"
            element={<ServiceDetailsPage />}
          />
          <Route path="profile/:id" element={<UserProfile />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes for all authenticated users */}
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="admin"
            element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            }
          />

          <Route
            path="create-service"
            element={
              <ProtectedRoute>
                <CreateService />
              </ProtectedRoute>
            }
          />

          <Route
            path="create-project"
            element={
              <ProtectedRoute>
                <CreateProject />
              </ProtectedRoute>
            }
          />

          <Route
            path="chat"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          <Route
            path="chat/:conversationId"
            element={
              <ProtectedRoute>
                <Chat />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes for Freelancers */}
          <Route
            path="add/service"
            element={
              <ProtectedRoute allowedRoles={["freelancer"]}>
                <CreateService />
              </ProtectedRoute>
            }
          />

          <Route
            path="edit/service/:serviceId"
            element={
              <ProtectedRoute allowedRoles={["freelancer"]}>
                <CreateService />
              </ProtectedRoute>
            }
          />

          {/* Protected Routes for Clients */}
          <Route
            path="proposals"
            element={
              <ProtectedRoute allowedRoles={["client"]}>
                <Proposals />
              </ProtectedRoute>
            }
          />

          <Route path="*" element={<NotFound />} />
        </Route>

        {/* Admin Routes */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={["admin"]}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboard />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="services" element={<AdminServices />} />
        </Route>

        {/* New Routes for Additional Pages */}
        <Route
          path="edit-profile"
          element={
            <ProtectedRoute>
              <EditProfile />
            </ProtectedRoute>
          }
        />

        <Route
          path="settings"
          element={
            <ProtectedRoute>
              <Settings />
            </ProtectedRoute>
          }
        />

        <Route
          path="saved-services"
          element={
            <ProtectedRoute>
              <SavedServices />
            </ProtectedRoute>
          }
        />

        <Route path="help" element={<Help />} />
      </Routes>
    </BrowserRouter>
  );
}
