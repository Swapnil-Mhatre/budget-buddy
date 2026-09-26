import { useContext } from "react";
import { InputButton } from "../CustomButtons.jsx";
import { MdCategory } from "react-icons/md";
import CustomDropdown from "../CustomDropdown.jsx";
import { ExpenseContextData } from "../../context/ExpenseContext.jsx";
import { useLocation, useNavigate } from "react-router-dom";

const AddExpenseForm = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    transactions,
    transaction,
    categoryType,
    categoriesList,
    setCategoryType,
    setTransactions,
    setTransaction,
  } = useContext(ExpenseContextData);

  function changeType(e) {
    const type = e.target.value;
    setCategoryType(type);
    setTransaction({ ...transaction, type: type });
  }

  function handleSubmittion(e) {
    e.preventDefault();
    const newTransactions = [...transactions];

    if (location.pathname === "/edittransaction") {
      const index = newTransactions.findIndex(
        (newTransaction) => newTransaction.id === transaction.id,
      );
      newTransactions.splice(index, 1);
    }

    newTransactions.push(transaction);
    setTransactions(newTransactions);
  }

  return (
    <form onSubmit={(e) => handleSubmittion(e)} className="transaction-form">
      <div className="type">
        <InputButton
          text={"expense"}
          style={transaction.type === "expense" ? "red" : ""}
          fnc={changeType}
        />
        <InputButton
          text={"income"}
          style={transaction.type === "income" ? "green" : ""}
          fnc={changeType}
        />
      </div>

      <div className="form-group">
        <label htmlFor="title">Title / Description</label>
        <input
          onInput={(e) => {
            setTransaction({ ...transaction, title: e.target.value });
          }}
          value={transaction.title}
          id="title"
          type="text"
          placeholder="e.g. McDonald's"
        />
      </div>

      <div className="form-group">
        <label htmlFor="amount">Amount</label>
        <div className="amount-input">
          <span>₹</span>
          <input
            onChange={(e) => {
              let amount = e.target.value;
              if (amount == 0) amount = "";
              setTransaction({
                ...transaction,
                amount: amount,
              });
            }}
            value={transaction.amount}
            placeholder="0"
            id="amount"
            type="number"
          />
        </div>
      </div>

      <div className="form-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <CustomDropdown
            icon={<MdCategory className="custom" />}
            options={categoriesList.filter(
              (category) => category.type === categoryType,
            )}
            fnc={(e) => {
              setTransaction({ ...transaction, category: e.target.value });
            }}
            category={transaction.category}
          />
        </div>

        <div className="form-group">
          <label htmlFor="date">Date</label>
          <input
            onChange={(e) => {
              setTransaction({ ...transaction, date: e.target.value });
            }}
            value={transaction.date}
            id="date"
            type="date"
          />
        </div>
      </div>

      <div className="form-group">
        <label htmlFor="note">Note (optional)</label>
        <textarea
          id="note"
          placeholder="Add a note..."
          value={transaction.note}
          onChange={(e) =>
            setTransaction({ ...transaction, note: e.target.value })
          }
        />
      </div>

      <div className="form-actions">
        <button
          onClick={() => navigate(-1)}
          type="button"
          className="cancel-btn"
        >
          Cancel
        </button>

        <button
          onClick={() => navigate(-1)}
          type="submit"
          className="submit-btn"
        >
          {location.pathname === "/addtransaction" ? "Add" : "Edit"}{" "}
          {categoryType}
        </button>
      </div>
    </form>
  );
};

export default AddExpenseForm;
