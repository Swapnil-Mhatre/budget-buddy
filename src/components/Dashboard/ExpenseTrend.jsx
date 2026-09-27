import { useContext, useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { convertToMonthName } from "../../utils/Date.jsx";
import { UIContextData } from "../../context/UIContext.jsx";

const ExpenseTrend = ({ transactions, period }) => {
  const { themeSettings } = useContext(UIContextData);
  const [uniquePeriod, setUniquePeriod] = useState([]);
  const trendData = [...uniquePeriod]
    .map((data) => data[1])
    .sort((a, b) => a.date.localeCompare(b.date));

  function populateTrendData(transactions) {
    const periodData = new Map();

    for (let transaction of transactions) {
      let periodCopy;
      if (period === "This Month") {
        periodCopy =
          `${transaction.date.slice(8, 10)} ${convertToMonthName(transaction.date.slice(0, 7))}`.slice(
            0,
            6,
          );
      } else {
        periodCopy = convertToMonthName(transaction.date.slice(0, 7));
      }
      const current = periodData.get(periodCopy) || {
        date: periodCopy,
        income: 0,
        expense: 0,
      };

      if (transaction.type === "expense") {
        current.expense += Number(transaction.amount);
      } else {
        current.income += Number(transaction.amount);
      }

      periodData.set(periodCopy, current);
    }

    setUniquePeriod(periodData);
  }

  useEffect(() => {
    populateTrendData(transactions);
  }, [transactions]);

  return (
    <section className="dashboard-card expense-trend">
      <div className="card-header">
        <h2>Expense Trend</h2>
      </div>
      <div className="trend-chart">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <CartesianGrid
              strokeDasharray="6"
              stroke="var(--color-palette-gray)"
              vertical={false}
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12, fill: "var(--color-palette-gray)" }}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: "var(--color-palette-gray)",
              }}
            />

            <Tooltip />

            <Area
              type="monotone"
              dataKey="expense"
              stroke={`var(--color-palette-${themeSettings.colorPalette})`}
              fillOpacity={1}
              fill={`var(--color-palette-${themeSettings.colorPalette}-transparent)`}
              strokeWidth={2}
              dot={{
                r: 2,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
};

export default ExpenseTrend;
