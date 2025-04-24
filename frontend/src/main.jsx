import { createRoot } from "react-dom/client";
import { MainLayout } from "./layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css";
import { Provider } from 'react-redux';
import { store } from './redux/store';
import { initializeAuth } from './redux/slices/authInitializer';
import './styles/colors.css';
import './styles/global.css';
import './styles/theme.css';

// Initialize authentication state from localStorage
initializeAuth(store);

// Initialize theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'light';
document.body.setAttribute('data-theme', savedTheme);

// Subscribe to theme changes
store.subscribe(() => {
  const currentTheme = store.getState().theme.theme;
  document.body.setAttribute('data-theme', currentTheme);
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <MainLayout />
  </Provider>
);
