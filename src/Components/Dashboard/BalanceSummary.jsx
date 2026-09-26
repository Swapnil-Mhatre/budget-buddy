import { useContext } from "react";
import {
  MdAccountBalanceWallet,
  MdFileUpload,
  MdPayments,
  MdSavings,
} from "react-icons/md";
import { SummaryCard } from "../CardLayout";
import { ExpenseContextData } from "../../context/ExpenseContext";
import { calcTypeTotal } from "../../utils/Calculation";

const BalanceSummary = ({ periodTransactions }) => {
  const { transactions } = useContext(ExpenseContextData);

  const totalIncome = calcTypeTotal(transactions, "income");
  const totalExpense = calcTypeTotal(transactions, "expense");
  const totalBalance = totalIncome - totalExpense;
  const savings =
    calcTypeTotal(periodTransactions, "income") -
    calcTypeTotal(periodTransactions, "expense");

  return (
    <div className="balance-summary">
      <SummaryCard
        title={"Total Balance"}
        amount={totalBalance}
        icon={<MdAccountBalanceWallet className="custom" />}
        color="purple"
      />
      <SummaryCard
        title={"Total Income"}
        amount={totalIncome}
        icon={<MdFileUpload className="custom" />}
        color="green"
      />
      <SummaryCard
        title={"Total Expense"}
        amount={totalExpense}
        icon={<MdPayments className="custom" />}
        color="red"
      />
      <SummaryCard
        title={"Savings"}
        amount={savings}
        icon={<MdSavings className="custom" />}
        color="blue"
      />
    </div>
  );
};

export default BalanceSummary;
