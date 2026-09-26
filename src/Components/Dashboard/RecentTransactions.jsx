import { Link } from "react-router-dom";
import { TransactionCard } from "../CardLayout";
import { MdArrowForward } from "react-icons/md";
import { useContext } from "react";
import { ExpenseContextData } from "../../Context/ExpenseContext";

const RecentTransactions = () => {
  const { transactions } = useContext(ExpenseContextData);

  const recentTrasactions = transactions
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 5);

  return (
    <section className="dashboard-card">
      <div className="card-header">
        <h2>Recent Transactions</h2>
        <Link className="link-tag" to={"/transactions"}>
          View All
        </Link>
      </div>
      <div className="transaction-list">
        {recentTrasactions.map((transaction) => (
          <TransactionCard key={transaction.id} transaction={transaction} />
        ))}
      </div>
      <div className="all-transactions">
        <Link to={"/transactions"} className="link-tag">
          View all transactions <MdArrowForward />
        </Link>
      </div>
    </section>
  );
};

export default RecentTransactions;
