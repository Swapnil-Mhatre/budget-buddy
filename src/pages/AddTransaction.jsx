import "../css/addTransaction.css";
import AddExpenseForm from "../Components/Add Transaction Components/AddExpenseForm";
import Suggestion from "../Components/Add Transaction Components/Suggestion";

const AddTransaction = () => {
  return (
    <section className="add-transaction-page">
      <AddExpenseForm />
      <Suggestion />
    </section>
  );
};

export default AddTransaction;
