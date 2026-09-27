import {
  MdWarning,
  MdArrowUpward,
  MdArrowDownward,
  MdEdit,
  MdDeleteOutline,
  MdRestaurant,
  MdDirectionsCar,
  MdShoppingBag,
  MdReceipt,
  MdMovie,
  MdHealthAndSafety,
  MdSchool,
  MdMoreHoriz,
  MdWork,
  MdCode,
  MdTrendingUp,
  MdBusiness,
  MdHome,
  MdCardGiftcard,
  MdEmojiEvents,
} from "react-icons/md";
import "../css/cardLayout.css";
import { useLocation } from "react-router-dom";
import { formatDate } from "../utils/Date.jsx";
import { useContext } from "react";
import { UIContextData } from "../context/UIContext.jsx";

const iconMap = {
  restaurant: MdRestaurant,
  car: MdDirectionsCar,
  shopping: MdShoppingBag,
  receipt: MdReceipt,
  movie: MdMovie,
  health: MdHealthAndSafety,
  school: MdSchool,
  work: MdWork,
  code: MdCode,
  trendingUp: MdTrendingUp,
  business: MdBusiness,
  home: MdHome,
  gift: MdCardGiftcard,
  events: MdEmojiEvents,
  other: MdMoreHoriz,
};

export const SummaryCard = ({
  icon,
  title,
  amount,
  percentage,
  showProgress = false,
  color,
}) => {
  return (
    <div className="money-card">
      <div className="upper">
        <div className="left">
          <p>{title}</p>
          <h3>{amount.toLocaleString()}</h3>
        </div>
        {icon && <div className={`right ${color}`}>{icon}</div>}
      </div>

      {showProgress && (
        <div className={"progress-background"}>
          <div
            className={`progress ${percentage >= 90 ? "critical" : percentage >= 70 ? "warning" : "normal"}`}
            style={{
              width: `${percentage}%`,
            }}
          />
        </div>
      )}
    </div>
  );
};

export const TransactionCard = ({ transaction, editFnc, deleteFnc }) => {
  const location = useLocation();
  const { themeSettings, width } = useContext(UIContextData);

  return (
    <div className="transaction">
      {width > 426 && (
        <div className="transaction-icon">
          {transaction.type === "income" ? (
            <MdArrowUpward className="custom" />
          ) : (
            <MdArrowDownward className="custom" />
          )}
        </div>
      )}

      <div className="content-box">
        <div className="transaction-info">
          <strong>{transaction.title}</strong>
          <span>{transaction.category}</span>
        </div>

        <span className="transaction-date">
          {formatDate(transaction.date, themeSettings.dateFormat)}
        </span>
      </div>

      <strong className={transaction.type === "income" ? "income" : "expense"}>
        {transaction.type === "income" ? "+ " : "- "}₹
        {transaction?.amount?.toLocaleString()}
      </strong>

      {location.pathname === "/transactions" ? (
        <div className="transaction-menu">
          <MdEdit onClick={editFnc} className="custom" />
          <MdDeleteOutline onClick={deleteFnc} className="custom" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export const ProgressBarCard = ({ budget }) => {
  const Icon = iconMap[budget.iconName];

  return (
    <div className="budget-item">
      <div className="budget-icon">
        <Icon className={`custom ${budget.color}`} />
      </div>

      <div className="budget-layout">
        <div className="budget-top">
          <strong>{budget.category}</strong>
          <span>
            ₹{budget.spent.toLocaleString()}
            {" / "}₹{budget.budget.toLocaleString()}
          </span>
        </div>

        <div className="budget-bottom">
          <div className={"progress-background"}>
            <div
              className={`progress ${budget.percentage >= 90 ? "critical" : budget.percentage >= 70 ? "warning" : "normal"}`}
              style={{
                width: `${budget.percentage}%`,
              }}
            />
          </div>
          <span>{budget?.percentage}%</span>
        </div>
      </div>
    </div>
  );
};

export const CategoryCard = ({ category, fnc }) => {
  const Icon = iconMap[category.icon];
  return (
    <div className="category-card" id={category.id || ""}>
      <div className="icon">
        <Icon className={`custom ${category.color}`} />
        {category.id && (
          <button onClick={(e) => fnc(e)} className="delete-button">
            <MdDeleteOutline />
          </button>
        )}
      </div>
      <strong className="title">{category.value}</strong>
      <span className="transactions">{category.transactions} transactions</span>
      <h3 className="amount">₹ {category.total}</h3>
    </div>
  );
};

export const AlertCard = ({ alert }) => {
  return (
    <div className={`alert ${alert.type}`} key={alert.id}>
      <div className="alert-icon">
        <MdWarning />
      </div>

      <div className="alert-info">
        <strong>{alert.category}</strong>
        <span>{alert.percentage}% of budget used</span>
      </div>
    </div>
  );
};
