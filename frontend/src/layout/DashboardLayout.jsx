
  import Sidebar from "../components/Sidebar";
  import Services from "../components/ServicesTable";
  import UsersTable from "../components/UsersTable";
  import Proposals from "../components/ProposalsTable";
  import Projects from "../components/ProjectsTable";
  import { Outlet } from "react-router-dom";
  
  function DashboardLayout() {
    return (
      <div style={{ display: "flex" }}>
        <Sidebar />
        <div style={{ flex: 1, padding: "10px" }}>
          <Outlet /> {/* Displays the current route component (e.g., UsersTable) */}
        </div>
      </div>
    );
  }
  
  export default DashboardLayout;
  