import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard.jsx";
import Transactions from "../pages/Transactions.jsx";
import AddTransaction from "../pages/AddTransaction.jsx";
import Categories from "../pages/Categories.jsx";
import Budget from "../pages/Budget.jsx";
import Reports from "../pages/Reports.jsx";
import Settings from "../pages/Settings.jsx";

const Pathways = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/transactions" element={<Transactions />} />
      <Route path="/addtransaction" element={<AddTransaction />} />
      <Route path="/edittransaction" element={<AddTransaction />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/budget" element={<Budget />} />
      <Route path="/reports" element={<Reports />} />
      <Route path="/settings" element={<Settings />} />
    </Routes>
  );
};

export default Pathways;
