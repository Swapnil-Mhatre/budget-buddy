import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { calcTypeTotal } from "../../utils/Calculation.jsx";

const IncomeVsExpense = ({ transactions }) => {
  const data = [
    {
      name: "Income",
      amount: calcTypeTotal(transactions, "income"),
    },
    {
      name: "Expense",
      amount: calcTypeTotal(transactions, "expense"),
    },
  ];

  return (
    <article className="report-card income-expense">
      <div className="report-card-header">
        <h2>Income vs Expense</h2>
      </div>
      <div className="report-chart">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 5,
              left: -15,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="0" vertical={false} />

            <XAxis dataKey="name" axisLine={false} tickLine={false} />

            <YAxis
              axisLine={false}
              tickLine={false}
              tickFormatter={(value) => `${value / 1000}k`}
            />

            <Tooltip formatter={(value) => [`₹ ${value}`, "Amount"]} />

            <Bar dataKey="amount" radius={[5, 5, 0, 0]} barSize={45}>
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index === 0 ? "#22b573" : "#6947ff"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </article>
  );
};

export default IncomeVsExpense;
