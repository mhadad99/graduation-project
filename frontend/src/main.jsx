import { createRoot } from "react-dom/client";
import { Provider } from 'react-redux'
import { MainLayout } from "./layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css"
import UserProfile from "./pages/UserProfile";
import { Header } from "./components/Header";
import About from "./pages/About";
import './styles/colors.css'
import { myStore } from "./store";



createRoot(document.getElementById("root")).render(
  <>
    <Provider store={myStore}>
      <MainLayout />
    </Provider>
  </>
);
