import { useContext, useState, useEffect } from "react";
import "../css/transaction.css";
import { ExpenseContextData } from "../context/ExpenseContext.jsx";
import CustomDropdown from "../components/CustomDropdown.jsx";
import { TransactionCard } from "../components/CardLayout.jsx";
import {
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
  MdSearch,
} from "react-icons/md";
import { UIContextData } from "../context/UIContext";

const Transactions = () => {
  const {
    months,
    transactions,
    categoriesList,
    deleteTransaction,
    editTransaction,
  } = useContext(ExpenseContextData);
  const { width } = useContext(UIContextData);
  const [searchTransaction, setSearchTransaction] = useState("");
  const [categoryType, setCategoryType] = useState("all");
  const [categoryName, setCategoryName] = useState("");
  const [monthName, setMonthName] = useState("All transactions");
  const [filteredTransactions, setFilteredTransactions] = useState([]);

  // pagination
  let [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);
  let startIndex = (currentPage - 1) * itemsPerPage;
  let endIndex = startIndex + itemsPerPage;

  function getPaginationPages(currentPage, totalPages) {
    const pages = [];

    if (totalPages <= 7) {
      return Array.from({ length: totalPages }, (_, index) => index + 1);
    }

    pages.push(1);

    if (currentPage > 4) {
      pages.push("...");
    }

    const startPage = Math.max(2, currentPage - 1);
    const endPage = Math.min(totalPages - 1, currentPage + 1);

    for (let page = startPage; page <= endPage; page++) {
      pages.push(page);
    }

    if (currentPage < totalPages - 3) {
      pages.push("...");
    }

    pages.push(totalPages);

    return pages;
  }

  function filterByValue(transactions, property, value) {
    if (!value || value === "all") return transactions;

    return transactions.filter(
      (transaction) => transaction[property] === value,
    );
  }

  function filterBySelection(transactions, property, selectorVal) {
    if (!selectorVal || selectorVal === "All transactions") return transactions;

    return transactions.filter((transaction) =>
      transaction[property].toLowerCase().includes(selectorVal.toLowerCase()),
    );
  }

  function sortTransactions(transactions) {
    return transactions.sort((a, b) => b.date.localeCompare(a.date));
  }

  useEffect(() => {
    let result = transactions;
    result = filterByValue(result, "type", categoryType);
    result = filterByValue(result, "category", categoryName);
    result = filterBySelection(result, "date", monthName);
    result = filterBySelection(result, "title", searchTransaction);
    result = sortTransactions(result);

    setCurrentPage(1);
    setFilteredTransactions(result);
  }, [transactions, categoryType, categoryName, monthName, searchTransaction]);

  return (
    <section className="transaction-container">
      <header className="transaction-header">
        <div className="search-bar">
          <label htmlFor="searchInput">
            <MdSearch />
          </label>
          <input
            onInput={(e) => {
              setSearchTransaction(e.target.value);
            }}
            value={searchTransaction}
            id="searchInput"
            type="text"
            placeholder="Search transactions..."
          />
        </div>
        <div className="filter-buttons">
          <button
            onClick={(e) => {
              setCategoryType(e.target.textContent);
            }}
            className={categoryType === "all" ? "active" : ""}
          >
            all
          </button>
          <button
            onClick={(e) => {
              setCategoryType(e.target.textContent);
            }}
            className={categoryType === "income" ? "active" : ""}
          >
            income
          </button>
          <button
            onClick={(e) => {
              setCategoryType(e.target.textContent);
            }}
            className={categoryType === "expense" ? "active" : ""}
          >
            expense
          </button>
        </div>
        <div className="drop-down-filters">
          <CustomDropdown
            options={categoriesList}
            fnc={(e) => {
              setCategoryName(e.target.value);
            }}
          />
          <CustomDropdown
            options={months}
            fnc={(e) => setMonthName(e.target.value)}
          />
        </div>
      </header>
      <div className="transaction-list-container">
        <div className="list-heading">
          {width > 426 && <span></span>}
          <strong>Title</strong>
          {width > 426 && <strong>Category</strong>}
          {width > 426 && <strong>Date</strong>}
          <strong>Amount</strong>
          <strong>Actions</strong>
        </div>
        {filteredTransactions.length !== 0 ? (
          <div className="list-container">
            {filteredTransactions
              .slice(startIndex, endIndex)
              .map((transaction) => (
                <TransactionCard
                  transaction={transaction}
                  key={transaction.id}
                  deleteFnc={() => {
                    deleteTransaction(transaction.id);
                  }}
                  editFnc={() => {
                    editTransaction(transaction.id);
                  }}
                />
              ))}
          </div>
        ) : (
          <div className="empty-container">
            <p>No Transaction's Availabe</p>
          </div>
        )}
      </div>
      <div className="pagination">
        <button className="pagination-el">
          <MdKeyboardArrowLeft
            onClick={() => {
              if (currentPage === 1) return;
              setCurrentPage(currentPage - 1);
            }}
            disabled={currentPage === 1}
            className="custom"
          />
        </button>
        {width > 375 && (
          <div className="list-number">
            {getPaginationPages(currentPage, totalPages).map((page, index) => {
              if (page === "...") {
                return (
                  <span
                    className="pagination-ellipsis"
                    key={`ellipsis-${index}`}
                  >
                    ...
                  </span>
                );
              }

              return (
                <button
                  key={page}
                  className={`pagination-el ${
                    currentPage === page ? "active" : ""
                  }`}
                  onClick={() => setCurrentPage(page)}
                >
                  {page}
                </button>
              );
            })}
          </div>
        )}
        <button className="pagination-el">
          <MdKeyboardArrowRight
            onClick={() => {
              if (currentPage === totalPages) return;
              setCurrentPage(currentPage + 1);
            }}
            className="custom"
          />
        </button>
      </div>
    </section>
  );
};

export default Transactions;
