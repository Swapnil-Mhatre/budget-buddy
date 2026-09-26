import { useContext } from "react";
import { QuickActionButton } from "../CustomButtons.jsx";
import { MdArrowDownward, MdArrowUpward, MdMoney } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { ExpenseContextData } from "../../Context/ExpenseContext.jsx";

const QuickAdd = () => {
  const { setCategoryType, setTransaction, transaction } =
    useContext(ExpenseContextData);
  const navigate = useNavigate();

  return (
    <section className="dashboard-card">
      <div className="card-header">
        <h2>Quick Add</h2>
      </div>

      <div className="quick-actions">
        <QuickActionButton
          fnc={() => {
            navigate("/addtransaction");
            setCategoryType("expense");
          }}
          icon={<MdArrowDownward />}
          name="Expense"
          color="red"
        />
        <QuickActionButton
          fnc={() => {
            navigate("/addtransaction");
            setCategoryType("income");
          }}
          icon={<MdArrowUpward />}
          name="Income"
          color="green"
        />
        <QuickActionButton
          fnc={() => {
            navigate("/addtransaction");
            setCategoryType("expense");
            setTransaction({ ...transaction, category: "Bills & Utilities" });
          }}
          icon={<MdMoney />}
          name="Bill"
          color="blue"
        />
      </div>
    </section>
  );
};

export default QuickAdd;
