import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { convertDateToString, convertToMonthName } from "../../utils/Date";

const MonthlyTrend = ({ transactions, period }) => {
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
    <article className="report-card monthly-trend">
      <div className="report-card-header">
        <h2>Monthly Trend</h2>
        <div className="chart-legend">
          <span>
            <i className="legend-income" />
            Income
          </span>
          <span>
            <i className="legend-expense" />
            Expense
          </span>
        </div>
      </div>
      <div className="report-chart">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={trendData}
            margin={{
              top: 10,
              right: 5,
              left: -15,
              bottom: 0,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />
            <Tooltip formatter={(value) => `₹ ${value}`} />
            <Line
              type="monotone"
              dataKey="income"
              stroke="var(--color-palette-green)"
              strokeWidth={3}
              dot={true}
            />
            <Line
              type="monotone"
              dataKey="expense"
              stroke="var(--color-palette-purple"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
};

export default MonthlyTrend;
