import "../css/addTransaction.css";
import AddExpenseForm from "../components/Add Transaction Components/AddExpenseForm.jsx";
import Suggestion from "../components/Add Transaction Components/Suggestion.jsx";

const AddTransaction = () => {
  return (
    <section className="add-transaction-page">
      <AddExpenseForm />
      <Suggestion />
    </section>
  );
};

export default AddTransaction;
