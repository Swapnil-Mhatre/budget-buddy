import { useContext } from "react";
import { Link } from "react-router-dom";
import { ProgressBarCard } from "../CardLayout";
import { ExpenseContextData } from "../../Context/ExpenseContext";

const BudgetSummary = () => {
  const { categoryBudgets } = useContext(ExpenseContextData);

  return (
    <section className="dashboard-card">
      <div className="card-header">
        <h2>Budget Summary</h2>
        <Link className="link-tag" to={"/budget"}>
          View All
        </Link>
      </div>
      <div className="budget-list">
        {categoryBudgets?.slice(0, 3)?.map((budget) => (
          <ProgressBarCard budget={budget} key={budget.category} />
        ))}
      </div>
    </section>
  );
};

export default BudgetSummary;
