import Header from "./components/Header";
import Pathways from "./utils/Pathways.jsx";
import Sidebar from "./components/Sidebar";
import { useLocation } from "react-router-dom";

const App = () => {
  const location = useLocation();
  const headerData = {
    addtransaction: {
      title: "Add Transaction",
      description: "Add your income or expense here",
    },
    transactions: {
      title: "All Transactions",
      description: "view and manage your transactions",
    },
    categories: {
      title: "Categories",
      description: "Manage your income and expense categories",
    },
    budget: {
      title: "Budget",
      description: "Plan your spending and stay on track",
    },
    reports: {
      title: "Reports",
      description: "Analyze your spending habits",
    },
    settings: {
      title: "Settings",
      description: "Customize your experience",
    },
  };
  const pathName = location.pathname.slice(1);

  return (
    <main>
      <Sidebar />
      <div className="layout">
        <Header props={headerData[pathName]} />
        <Pathways />
      </div>
    </main>
  );
};

export default App;
