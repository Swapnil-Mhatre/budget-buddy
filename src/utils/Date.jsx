export const getTodayString = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const convertDateToString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export const convertToMonthName = (str) => {
  if (!str) return "All transactions";
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const monthName = months[Number(str.slice(5, 7)) - 1];

  return `${monthName} ${str.slice(0, 4)}`;
};

export const formatDate = (dateStr, format) => {
  const date = new Date(`${dateStr}T00:00:00`);

  switch (format) {
    case "DD MMM, YYYY":
      return date.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });

    case "DD/MM/YYYY":
      return date.toLocaleDateString("en-GB");

    case "MM/DD/YYYY":
      return date.toLocaleDateString("en-US");

    case "YYYY-MM-DD":
      return dateStr;

    default:
      return date.toLocaleDateString("en-GB");
  }
};
