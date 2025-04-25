
import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./redux/store"; // adjust path if needed
import { MainLayout } from "./layout/MainLayout";
import "./styles/designSystem.css";
import './styles/theme.css';


// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

// Subscribe to theme changes
store.subscribe(() => {
  const currentTheme = store.getState().theme.theme;
  document.body.setAttribute('data-theme', currentTheme);
});


ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MainLayout />
  </Provider>
);
