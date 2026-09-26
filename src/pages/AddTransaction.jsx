import "../css/addTransaction.css";
import AddExpenseForm from "../components/Add Transaction Components/AddExpenseForm";
import Suggestion from "../components/Add Transaction Components/Suggestion";

const AddTransaction = () => {
  return (
    <section className="add-transaction-page">
      <AddExpenseForm />
      <Suggestion />
    </section>
  );
};

export default AddTransaction;
