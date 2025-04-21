import React, { useEffect } from "react";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import {SharedLayout } from "../sharedLayout/SharedLayout";
import CreateService from "../pages/CreateService";
import { ServiceDetailsPage } from "../pages/ServiceDetailsPage";


export function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="/servicedetails" element={<ServiceDetailsPage />} />
          <Route path="*" element={<NotFound />} />
          <Route path="/add/service" element={<CreateService/>} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}