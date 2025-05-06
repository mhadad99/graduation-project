
import { Nav } from "react-bootstrap";
import { GoHome } from "react-icons/go";
import { FaUserTie, FaUserCheck, FaClipboardList, FaComments } from "react-icons/fa";
import { NavLink } from "react-router-dom";

function Sidebar() {
  return (
    <Nav className="flex-column bg-light sidebar p-3" style={{ minHeight: "100vh" }}>
      <NavLink to="/dashboard" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        <GoHome className="text-danger m-2 fs-4" />
        Dashboard
      </NavLink>

      <NavLink to="/dashboard/users" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        <FaUserTie className="text-danger m-2 fs-4" />
        Users
      </NavLink>

      <NavLink to="/dashboard/proposals" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        <FaUserCheck className="text-danger m-2 fs-4" />
        Proposals
      </NavLink>

      <NavLink to="/dashboard/projects" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        <FaClipboardList className="text-danger m-2 fs-4" />
        Projects
      </NavLink>

      <NavLink to="/dashboard/services" className={({ isActive }) => isActive ? "sidebar-link active" : "sidebar-link"}>
        <FaComments className="text-danger m-2 fs-4" />
        Services
      </NavLink>
    </Nav>
  );
}

export default Sidebar;
