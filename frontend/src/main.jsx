import { createRoot } from "react-dom/client";
import { MainLayout } from "./layout/MainLayout";
import "bootstrap/dist/css/bootstrap.min.css"
import UserProfile from "./pages/UserProfile";
import { Header } from "./components/Header";
import About from "./pages/About";


createRoot(document.getElementById("root")).render(
  <>
        <MainLayout />
  </>
);
