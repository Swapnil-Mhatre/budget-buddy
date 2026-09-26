const TopExpenses = ({ transactions }) => {
  transactions.sort((a, b) => b.amount - a.amount);

  return (
    <article className="report-card top-expenses">
      <div className="report-card-header">
        <h2>Top Expenses</h2>
      </div>
      <div className="top-expense-list">
        {transactions.slice(0, 5).map((transaction, index) => (
          <div className="top-expense-item" key={transaction.id}>
            <div className="expense-left">
              <div className="expense-rank">{index + 1}</div>
              <span className="expense-title">{transaction.title}</span>
            </div>
            <strong>₹ {transaction.amount.toLocaleString("en-IN")}</strong>
          </div>
        ))}
      </div>
    </article>
  );
};

export default TopExpenses;
