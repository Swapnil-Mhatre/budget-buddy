import "../css/dashboard.css";
import ExpenseOverview from "../Components/Reports Components/ExpenseOverview";
import ExpenseTrend from "../Components/Dashboard/ExpenseTrend";
import RecentTransactions from "../Components/Dashboard/RecentTransactions";
import BudgetSummary from "../Components/Dashboard/BudgetSummary";
import QuickAdd from "../Components/Dashboard/QuickAdd";
import BalanceSummary from "../Components/Dashboard/BalanceSummary";
import { useContext, useEffect, useState } from "react";
import { ExpenseContextData } from "../Context/ExpenseContext";
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
