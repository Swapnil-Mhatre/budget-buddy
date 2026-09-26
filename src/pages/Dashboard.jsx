import "../css/dashboard.css";
import ExpenseOverview from "../components/Reports Components/ExpenseOverview";
import ExpenseTrend from "../components/Dashboard/ExpenseTrend";
import RecentTransactions from "../components/Dashboard/RecentTransactions";
import BudgetSummary from "../components/Dashboard/BudgetSummary";
import QuickAdd from "../components/Dashboard/QuickAdd";
import BalanceSummary from "../components/Dashboard/BalanceSummary";
import { useContext, useEffect, useState } from "react";
import { ExpenseContextData } from "../context/ExpenseContext";
import { getTodayString } from "../utils/Date";

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
