import { useContext, useState } from "react";
import CustomDropdown from "./CustomDropdown";
import { ExpenseContextData } from "../context/ExpenseContext";
import { MdClose } from "react-icons/md";
import { calcCategoryTotal, getPercentage } from "../utils/Calculation";

const BudgetForm = ({ closeModal }) => {
  const { categoriesList, transactions, setCategoryBudgets, currentMonth } =
    useContext(ExpenseContextData);
  const [categoryName, setCategoryName] = useState("Food & Dining");
  const [budget, setBudget] = useState(0);

  function index(name) {
    return categoriesList.findIndex((category) => category.value === name);
  }

  function handleSubmition(e) {
    e.preventDefault();
    if (!budget || budget <= 0) return;
    const newBudget = {
      id: crypto.randomUUID(),
      category: categoryName,
      iconName: categoriesList[index(categoryName)].icon,
      color: categoriesList[index(categoryName)].color,
      spent: calcCategoryTotal(transactions, categoryName, currentMonth),
      budget: Number(budget),
    };

    newBudget.percentage = getPercentage(newBudget.spent, newBudget.budget);

    setCategoryBudgets((prev) => {
      const exists = prev.some((item) => item.category === categoryName);

      if (exists) {
        return prev.map((item) =>
          item.category === categoryName
            ? {
                ...item,
                budget: Number(budget),
                percentage: getPercentage(newBudget.spent, newBudget.budget),
              }
            : item,
        );
      }

      return [...prev, newBudget];
    });
    closeModal();
  }

  return (
    <div className="modal-overlay">
      <form className="budget-form">
        <div className="form-header">
          <div>
            <h2>Set Buget </h2>
          </div>
          <button type="button" className="close-btn" onClick={closeModal}>
            <MdClose />
          </button>
        </div>

        <div className="form-group">
          <label htmlFor="category-name">Category</label>
          <CustomDropdown
            options={categoriesList.filter(
              (category) => category.type === "expense",
            )}
            fnc={(e) => {
              setCategoryName(e.target.value);
            }}
          />
        </div>

        <div className="form-group">
          <label htmlFor="category-name">Monthly Budget</label>
          <input
            onInput={(e) => {
              setBudget(e.target.value);
            }}
            value={!budget ? "" : budget}
            type="number"
            name=""
            id=""
            placeholder="e.g 8000"
          />
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-btn" onClick={closeModal}>
            Cancel
          </button>

          <button
            type="submit"
            className="submit-btn"
            onClick={(e) => handleSubmition(e)}
          >
            Add Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default BudgetForm;
