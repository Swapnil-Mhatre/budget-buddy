import { useContext, useEffect } from "react";
import {
  MdDashboard,
  MdHome,
  MdReceipt,
  MdAdd,
  MdCategory,
  MdWallet,
  MdCrisisAlert,
  MdSettings,
  MdClose,
} from "react-icons/md";
import { UIContextData } from "../context/UIContext";
import { NavLink, useLocation } from "react-router-dom";
import "../css/sidebar.css";

const Sidebar = () => {
  const { sidebarStatus, setSidebarStatus, width } = useContext(UIContextData);
  const location = useLocation();

  useEffect(() => {
    if (window.innerWidth <= 426) setSidebarStatus(false);
  }, [location]);

  window.addEventListener("resize", () => {
    setSidebarStatus(window.innerWidth <= 910 ? false : true);
  });

  return (
    <nav className={`sidebar ${sidebarStatus ? "isOpen" : ""}`}>
      <div className="logo">
        <MdDashboard className="custom" />
        {sidebarStatus ? <h2>Expense Tracker</h2> : ""}
        {width <= 426 && (
          <MdClose className="custom" onClick={() => setSidebarStatus(false)} />
        )}
      </div>
      <ul className="nav-links">
        <li>
          <NavLink to={"/"} className="link-tag">
            <MdHome className="custom" />
            {sidebarStatus ? <span>Dashboard</span> : ""}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/transactions"} className="link-tag">
            <MdReceipt className="custom" />
            {sidebarStatus ? <span>Transactions</span> : ""}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/addtransaction"} className="link-tag">
            <MdAdd className="custom" />
            {sidebarStatus ? <span>Add Transactions</span> : ""}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/categories"} className="link-tag">
            <MdCategory className="custom" />
            {sidebarStatus ? <span>Categories</span> : ""}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/budget"} className="link-tag">
            <MdWallet className="custom" />
            {sidebarStatus ? <span>Budget</span> : ""}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/reports"} className="link-tag">
            <MdCrisisAlert className="custom" />
            {sidebarStatus ? <span>Reports</span> : ""}
          </NavLink>
        </li>
        <li>
          <NavLink to={"/settings"} className="link-tag">
            <MdSettings className="custom" />
            {sidebarStatus ? <span>Settings</span> : ""}
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Sidebar;
