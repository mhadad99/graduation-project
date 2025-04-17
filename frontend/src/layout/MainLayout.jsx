import React, { useEffect } from "react";
import { Home } from "../pages/Home";
import { NotFound } from "../pages/NotFound";
import {
  BrowserRouter,
  Route,
  Routes,
} from "react-router-dom";
import { SharedLayout } from "../sharedLayout/SharedLayout";


export function MainLayout() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<Home />} />
          <Route path="*" element={<NotFound />} /> 
        </Route>
      </Routes>
    </BrowserRouter>
  );
}