import { useContext, useEffect, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";
import {
  calcOverall,
  getCategoriesInfo,
  getPercentage,
} from "../../utils/Calculation.jsx";
import { UIContextData } from "../../context/UIContext.jsx";

const colorMap = {
  "Food & Dining": "red",
  Transport: "blue",
  Shopping: "purple",
  "Bills & Utilities": "orange",
  Entertainment: "pink",
  Health: "green",
  Education: "indigo",
  "Other Expenses": "gray",
};

const ExpenseOverview = ({ transactions }) => {
  const totalExpense = calcOverall(transactions, "amount");
  const [uniqueCategories, setUniqueCategories] = useState([]);
  const [expenseData, setExpenseData] = useState([]);
  const { width } = useContext(UIContextData);

  function populateExpenses() {
    const newData = [...uniqueCategories].map((category) => {
      return {
        name: category[0],
        value: category[1].amount,
        percentage: getPercentage(category[1].amount, totalExpense),
        color: `var(--color-palette-${colorMap[category[0]] || "gray"})`,
      };
    });
    setExpenseData(newData);
  }

  useEffect(() => {
    getCategoriesInfo(transactions, setUniqueCategories);
  }, [transactions]);

  useEffect(() => {
    populateExpenses();
  }, [uniqueCategories]);

  return (
    <section className="report-card">
      <div className="report-card-header">
        <h2>Expense Overview</h2>
      </div>

      <div className="expense-overview">
        <div className="donut-container">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                innerRadius={width > 1035 ? 60 : 50}
                outerRadius={width > 1035 ? 90 : 75}
                paddingAngle={1}
              >
                {expenseData.map((item) => (
                  <Cell key={item.name} fill={item.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>

          <div className="donut-center">
            <strong>₹{totalExpense}</strong>
            <span>Total Expense</span>
          </div>
        </div>

        <div className="expense-category">
          {expenseData.map((item) => (
            <div className="category-item" key={item.name}>
              <div className="category-name">
                <span
                  className="category-dot"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
                <span>{item.name}</span>
              </div>

              <strong>₹{item.value.toLocaleString()}</strong>

              <span>{item.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExpenseOverview;
