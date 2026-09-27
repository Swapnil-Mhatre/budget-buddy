import "../css/dashboard.css";
import ExpenseOverview from "../components/Reports Components/ExpenseOverview.jsx";
import ExpenseTrend from "../components/Dashboard/ExpenseTrend.jsx";
import RecentTransactions from "../components/Dashboard/RecentTransactions.jsx";
import BudgetSummary from "../components/Dashboard/BudgetSummary.jsx";
import QuickAdd from "../components/Dashboard/QuickAdd.jsx";
import BalanceSummary from "../components/Dashboard/BalanceSummary.jsx";
import { useContext, useEffect, useState } from "react";
import { ExpenseContextData } from "../context/ExpenseContext.jsx";
import { getTodayString } from "../utils/Date.jsx";

const Dashboard = () => {
  const { transactions, filterByRange, filterBy } =
    useContext(ExpenseContextData);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const currentDate = getTodayString().slice(0, 7);

  useEffect(() => {
    setFilteredTransactions(filterByRange(transactions, filterBy, currentDate));
  }, [filterBy, currentDate]);

  return (
    <div className="dashboard">
      <BalanceSummary periodTransactions={filteredTransactions} />

      <ExpenseOverview
        transactions={filteredTransactions.filter(
          (transaction) => transaction.type === "expense",
        )}
      />
      <ExpenseTrend
        transactions={filteredTransactions.filter(
          (transaction) => transaction.type === "expense",
        )}
        period={filterBy}
      />

      <RecentTransactions />
      <div className="right-bottom">
        <BudgetSummary />
        <QuickAdd />
      </div>
    </div>
  );
};

export default Dashboard;
