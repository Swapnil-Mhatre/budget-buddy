export function getCategoriesInfo(transactions, setCategoryTotal) {
  const categoryCopy = new Map();

  for (let transaction of transactions) {
    const category = transaction.category;
    const current = categoryCopy.get(category) || {
      amount: 0,
      transactions: 0,
    };
    current.amount += Number(transaction.amount);
    current.transactions += 1;

    categoryCopy.set(category, current);
  }

  setCategoryTotal(categoryCopy);
}

export function calcCategoryTotal(transactions, category, currentMonth) {
  return transactions
    .filter(
      (transaction) =>
        transaction.category === category &&
        transaction.date.includes(currentMonth),
    )
    .reduce((total, curr) => (total += Number(curr.amount)), 0);
}

export function calcOverall(categoryBudgets, value) {
  return categoryBudgets.reduce(
    (total, prev) => (total += Number(prev[value])),
    0,
  );
}

export function calcTypeTotal(transactions, typeVal) {
  return transactions
    .filter((transaction) => transaction.type === typeVal)
    .reduce((init, curr) => {
      return (init += Number(curr.amount));
    }, 0);
}

export function getPercentage(spent, budget) {
  return Math.round((spent / budget) * 100);
}
