import { Routes, Route } from "react-router-dom";
import Dashboard from "../Pages/Dashboard.jsx";
import Transactions from "../Pages/Transactions.jsx";
import AddTransaction from "../Pages/AddTransaction.jsx";
import Categories from "../Pages/Categories.jsx";
import Budget from "../Pages/Budget.jsx";
import Reports from "../Pages/Reports.jsx";
import Settings from "../Pages/Settings.jsx";

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
