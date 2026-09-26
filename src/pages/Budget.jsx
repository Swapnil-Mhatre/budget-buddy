import { MdAdd, MdClose, MdLightbulb } from "react-icons/md";
import "../css/budget.css";
import { AlertCard, ProgressBarCard } from "../Components/CardLayout";
import { SummaryCard } from "../Components/CardLayout";
import BudgetForm from "../Components/BudgetForm";
import { useContext, useState } from "react";
import { ExpenseContextData } from "../Context/ExpenseContext";
import { calcOverall, getPercentage } from "../utils/Calculation";
import { UIContextData } from "../Context/UIContext";

export default function Budget() {
  const { categoryBudgets, deleteCategoryBudgets, alerts } =
    useContext(ExpenseContextData);
  const { themeSettings } = useContext(UIContextData);

  const monthlyBudget = calcOverall(categoryBudgets, "budget");
  const spent = calcOverall(categoryBudgets, "spent");
  const remaining = monthlyBudget - spent;
  const progress = getPercentage(spent, monthlyBudget);

  const [isFormOpen, setIsFormOpen] = useState(false);

  function getBudgetMessage(percentage) {
    if (percentage < 50) return "Great start! You're well within budget 🌱";

    if (percentage < 75)
      return "You're on track! Keep an eye on your spending 👀";

    if (percentage < 90)
      return "Careful! You're getting close to your budget limit ⚠️";

    if (percentage <= 100) return "You're very close to your budget limit! ⚠️";

    return "You've exceeded your budget! 🚨";
  }

  return (
    <div className="budget-page">
      <section className="budget-summary">
        <SummaryCard title={"Monthly Budget"} amount={monthlyBudget} />
        <SummaryCard title={"Spent So Far"} amount={spent} />
        <SummaryCard title={"Remaining"} amount={remaining} />
        <SummaryCard
          title={"Progress"}
          amount={(progress || 0) + "%"}
          percentage={progress || 0}
          showProgress={true}
        />
      </section>
      <section className="budget-content">
        <div className="category-budget-card">
          <div className="section-header">
            <div>
              <h2>Category Budgets</h2>
              <p>Track your spending by category</p>
            </div>
            <div className="budget-btns">
              {categoryBudgets.length > 0 && (
                <button className="budget-btn" onClick={deleteCategoryBudgets}>
                  <MdClose />
                  Clear Budgets
                </button>
              )}
              <button
                className="budget-btn"
                onClick={() => setIsFormOpen(true)}
              >
                <MdAdd />
                Set Budget
              </button>
            </div>
          </div>
          {categoryBudgets.length !== 0 ? (
            <div className="category-list">
              {categoryBudgets.map((category) => (
                <ProgressBarCard budget={category} key={category.id} />
              ))}
            </div>
          ) : (
            <div className="empty-container">
              <p>Click Set Budget to add budget for the month</p>
            </div>
          )}
        </div>
        <div className="budget-right">
          <div className="spending-card">
            <h2>Spending Insight</h2>
            <div className="donut-wrapper">
              <div
                className="donut"
                style={{
                  background: `conic-gradient(
                    var(--color-palette) ${(progress || 0) * 3.6}deg,
                    var(--background-color) ${(progress || 0) * 3.6}deg
                  )`,
                }}
              >
                <div className="donut-inner">
                  <strong>{progress || 0}%</strong>
                  <span>Total Expense</span>
                </div>
              </div>
            </div>

            <p className="insight-text">of monthly budget used</p>

            <strong className="insight-message">{getBudgetMessage(30)}</strong>
          </div>
          <div className="alerts-card">
            <h2>Alerts</h2>

            <div className="alerts-list">
              {themeSettings.budgetAlerts ? (
                alerts.map((alert) => (
                  <AlertCard alert={alert} key={alert.id} />
                ))
              ) : (
                <div className="alert-box">
                  Budget alerts are disabled
                </div>
              )}
            </div>
          </div>
        </div>
        <p className="suggestion">
          <span>💡Tip : </span>
          To change an existing category budget, select the same category and
          enter the new amount. The existing budget will be updated
          automatically
        </p>
      </section>
      {isFormOpen && <BudgetForm closeModal={() => setIsFormOpen(false)} />}
    </div>
  );
}
