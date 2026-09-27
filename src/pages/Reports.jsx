import { useContext, useEffect, useState } from "react";
import "../css/report.css";
import ExpenseOverview from "../components/Reports Components/ExpenseOverview.jsx";
import IncomeVsExpense from "../components/Reports Components/IncomeExpense.jsx";
import MonthlyTrend from "../components/Reports Components/MonthlyTrend.jsx";
import TopExpenses from "../components/Reports Components/TopExpense.jsx";
import { ExpenseContextData } from "../context/ExpenseContext.jsx";
import CustomDropdown from "../components/CustomDropdown.jsx";
import { MdCalendarMonth } from "react-icons/md";
import { getTodayString } from "../utils/Date.jsx";

const Reports = () => {
  const { months, transactions, filterByRange, filterBy, setFilterBy } =
    useContext(ExpenseContextData);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [currentDate, setCurrentDate] = useState(getTodayString().slice(0, 7));

  useEffect(() => {
    setFilteredTransactions(filterByRange(transactions, filterBy, currentDate));
  }, [filterBy, currentDate]);

  return (
    <div className="report-container">
      <div className="report-header">
        <div className="filter-buttons">
          <button
            onClick={(e) => {
              setFilterBy(e.target.textContent);
            }}
            className={filterBy === "This Month" ? "active" : ""}
          >
            This Month
          </button>
          <button
            onClick={(e) => {
              setFilterBy(e.target.textContent);
            }}
            className={filterBy === "Last 3 Months" ? "active" : ""}
          >
            Last 3 Months
          </button>
          <button
            onClick={(e) => {
              setFilterBy(e.target.textContent);
            }}
            className={filterBy === "This Year" ? "active" : ""}
          >
            This Year
          </button>
        </div>
        <CustomDropdown
          icon={<MdCalendarMonth className="custom" />}
          options={months.slice(1)}
          fnc={(e) => {
            setCurrentDate(e.target.value);
            setFilterBy("This Month");
          }}
        />
      </div>
      <div className="report-content">
        <ExpenseOverview
          transactions={filteredTransactions.filter(
            (transaction) => transaction.type === "expense",
          )}
        />
        <IncomeVsExpense transactions={filteredTransactions} />
        <MonthlyTrend transactions={filteredTransactions} period={filterBy} />
        <TopExpenses
          transactions={filteredTransactions.filter(
            (transaction) => transaction.type === "expense",
          )}
        />
      </div>
    </div>
  );
};

export default Reports;
