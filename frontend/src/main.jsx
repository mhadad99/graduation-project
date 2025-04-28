/** @format */

import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from 'react-redux'
import { MainLayout } from "./layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css"

import { myStore } from "./store";


import "./styles/designSystem.css"; // Core design tokens
import "./styles/theme.css"; // Theme variables
import "./styles/components/Chat.css"; // Component styles

// Initialize theme from localStorage
const savedTheme = localStorage.getItem("theme") || "light";
document.body.setAttribute("data-theme", savedTheme);

// Subscribe to theme changes
myStore.subscribe(() => {
  const currentTheme = myStore.getState().themeSlice.theme;
  document.body.setAttribute("data-theme", currentTheme);
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={myStore}>
    <MainLayout />
  </Provider>
);
