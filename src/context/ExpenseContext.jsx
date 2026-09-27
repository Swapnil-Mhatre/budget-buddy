import { createContext, useState, useEffect } from "react";
import {
  convertToMonthName,
  getTodayString,
  convertDateToString,
} from "../utils/Date.jsx";
import { useNavigate } from "react-router-dom";
import {
  getCategoriesInfo,
  getPercentage,
  calcCategoryTotal,
} from "../utils/Calculation.jsx";

export const ExpenseContextData = createContext();

const ExpenseContext = (props) => {
  const navigate = useNavigate();
  const currentMonth = getTodayString().slice(0, 7);
  const [months, setMonths] = useState([]);
  const [filterBy, setFilterBy] = useState("This Month");

  function filterByRange(transactions, period, currentDate) {
    let startDate = currentDate;
    const endDate = currentDate;

    if (period === "Last 3 Months") {
      const current = new Date();
      current.setMonth(current.getMonth() - 2);
      startDate = convertDateToString(current).slice(0, 7);
    } else if (period === "This Year") {
      startDate = currentDate.slice(0, 5) + "01";
    }

    return transactions.filter((transaction) => {
      const transactionDate = convertDateToString(
        new Date(transaction.date),
      ).slice(0, 7);

      return transactionDate >= startDate && transactionDate <= endDate;
    });
  }

  function populateMonths(transactions) {
    let monthsList = transactions.map((transaction) =>
      transaction.date.slice(0, 7),
    );
    monthsList = [...new Set(monthsList)];
    monthsList.sort((a, b) => b.localeCompare(a));
    monthsList.unshift("");
    const newMonthList = monthsList.map((month) => {
      return {
        value: month,
        label: convertToMonthName(month),
      };
    });

    setMonths(newMonthList);
  }

  // Category
  const [categoryTotal, setCategoryTotal] = useState(new Map());
  const [categoryType, setCategoryType] = useState("expense");
  const defaultCategories = [
    {
      value: "Food & Dining",
      type: "expense",
      icon: "restaurant",
      color: "red",
    },
    {
      value: "Transport",
      type: "expense",
      icon: "car",
      color: "blue",
    },
    {
      value: "Shopping",
      type: "expense",
      icon: "shopping",
      color: "purple",
    },
    {
      value: "Bills & Utilities",
      type: "expense",
      icon: "receipt",
      color: "orange",
    },
    {
      value: "Entertainment",
      type: "expense",
      icon: "movie",
      color: "pink",
    },
    {
      value: "Health",
      type: "expense",
      icon: "health",
      color: "green",
    },
    {
      value: "Education",
      type: "expense",
      icon: "school",
      color: "indigo",
    },
    {
      value: "Other Expenses",
      type: "expense",
      icon: "other",
      color: "gray",
    },
    {
      value: "Salary",
      type: "income",
      icon: "work",
      color: "green",
    },
    {
      value: "Freelance",
      type: "income",
      icon: "code",
      color: "blue",
    },
    {
      value: "Investments",
      type: "income",
      icon: "trendingUp",
      color: "purple",
    },
    {
      value: "Business",
      type: "income",
      icon: "business",
      color: "orange",
    },
    {
      value: "Rental Income",
      type: "income",
      icon: "home",
      color: "teal",
    },
    {
      value: "Gifts",
      type: "income",
      icon: "gift",
      color: "pink",
    },
    {
      value: "Bonus",
      type: "income",
      icon: "events",
      color: "yellow",
    },
    {
      value: "Other Incomes",
      type: "income",
      icon: "other",
      color: "gray",
    },
  ];
  const [customCategories, setCustomCategories] = useState(
    JSON.parse(localStorage.getItem("categoriesList")) || [],
  );
  const categoriesList = [...defaultCategories, ...customCategories].map(
    (category) => {
      const info = categoryTotal.get(category.value);

      return {
        ...category,
        total: info?.amount || 0,
        transactions: info?.transactions || 0,
      };
    },
  );
  const [categoryBudgets, setCategoryBudgets] = useState(
    JSON.parse(localStorage.getItem("budget")) || [],
  );
  const [alerts, setAlerts] = useState([]);

  function checkAlerts() {
    const newAlerts = [];
    categoryBudgets.map((budget) => {
      if (budget.percentage >= 75) {
        const alert = {
          id: crypto.randomUUID(),
          category: budget.category,
          percentage: budget.percentage,
          type: budget.percentage >= 90 ? "danger" : "warning",
        };
        newAlerts.push(alert);
      }
    });
    setAlerts(newAlerts);
  }

  function deleteCustomCategory(categoryId) {
    const categoriesCopy = [...customCategories];
    const idx = categoriesCopy.findIndex(
      (category) => category.id === categoryId,
    );
    categoriesCopy.splice(idx, 1);
    setCustomCategories(categoriesCopy);
  }

  function updateCategoryBudget() {
    return categoryBudgets.map((budget) => {
      const spent = calcCategoryTotal(
        transactions,
        budget.category,
        currentMonth,
      );

      return {
        ...budget,
        spent,
        percentage: getPercentage(spent, budget.budget),
      };
    });
  }

  function deleteCategoryBudgets() {
    localStorage.removeItem("budget");
    setCategoryBudgets([]);
  }

  // transactions
  const [transactions, setTransactions] = useState(
    JSON.parse(localStorage.getItem("transactions")) || [],
  );
  const [transaction, setTransaction] = useState({
    id: crypto.randomUUID(),
    title: "",
    category: "",
    date: getTodayString(),
    amount: "",
    type: categoryType,
    note: "",
  });

  function deleteTransaction(transactionId) {
    const newTransactions = [...transactions];
    const index = newTransactions.findIndex(
      (transaction) => transaction.id === transactionId,
    );

    newTransactions.splice(index, 1);
    setTransactions(newTransactions);
  }

  function editTransaction(transactionId) {
    const index = transactions.findIndex(
      (transaction) => transaction.id === transactionId,
    );
    setTransaction(transactions[index]);
    setCategoryType(transactions[index].type);
    navigate("/edittransaction");
  }

  useEffect(() => {
    setTransaction({
      id: crypto.randomUUID(),
      title: "",
      category: "",
      date: getTodayString(),
      amount: "",
      type: categoryType,
      note: "",
    });
    populateMonths(transactions);
    getCategoriesInfo(transactions, setCategoryTotal);
    setCategoryBudgets(updateCategoryBudget());
    checkAlerts();
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions, categoryType]);

  useEffect(() => {
    localStorage.setItem("categoriesList", JSON.stringify(customCategories));

    localStorage.setItem("budget", JSON.stringify(categoryBudgets));
    checkAlerts();
  }, [customCategories, categoryBudgets]);

  return (
    <ExpenseContextData.Provider
      value={{
        transactions,
        months,
        filterBy,
        currentMonth,
        transaction,
        categoryType,
        categoriesList,
        categoryTotal,
        customCategories,
        categoryBudgets,
        alerts,
        setCategoryType,
        setFilterBy,
        setTransactions,
        deleteTransaction,
        editTransaction,
        setTransaction,
        filterByRange,
        deleteCustomCategory,
        setCustomCategories,
        deleteCategoryBudgets,
        setCategoryBudgets,
      }}
    >
      {props.children}
    </ExpenseContextData.Provider>
  );
};

export default ExpenseContext;
