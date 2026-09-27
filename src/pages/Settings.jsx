import { useContext } from "react";
import "../css/Settings.css";
import { MdLightMode, MdDarkMode } from "react-icons/md";
import { UIContextData } from "../context/UIContext.jsx";
import { Selector } from "../components/CustomDropdown.jsx";
import { CheckButton } from "../components/CustomButtons.jsx";
import { ExpenseContextData } from "../context/ExpenseContext.jsx";

const Settings = () => {
  const { themeSettings, setThemeSettings } = useContext(UIContextData);
  const {
    transactions,
    setCategoryBudgets,
    setCustomCategories,
    setTransaction,
  } = useContext(ExpenseContextData);

  const formatsList = [
    "DD MMM, YYYY",
    "DD/MM/YYYY",
    "MM/DD/YYYY",
    "YYYY-MM-DD",
  ];

  function exportTransactionsToCSV(transactions) {
    if (transactions.length === 0) return;
    const headers = [
      "Sr.No",
      "Title",
      "Category",
      "Date",
      "Amount",
      "Type",
      "Note",
    ];

    const rows = transactions.map((transaction, idx) => [
      idx + 1,
      transaction.title,
      transaction.category,
      transaction.date,
      transaction.amount,
      transaction.type,
      transaction.note,
    ]);

    const csvContent = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "expense-tracker-transactions.csv";

    link.click();

    URL.revokeObjectURL(url);
  }

  function clearAllData() {
    localStorage.removeItem("budget");
    localStorage.removeItem("categoriesList");
    localStorage.removeItem("themeSettings");
    localStorage.removeItem("transactions");

    setCategoryBudgets([]);
    setCustomCategories([]);
    setThemeSettings({
      mode: "Light",
      colorPalette: "purple",
      budgetAlerts: true,
      dateFormat: "YYYY-MM-DD",
    });
    setTransaction([]);
  }

  return (
    <div className="settings">
      <div className="setting-card">
        <h2>Apperance</h2>
        <div className="theme">
          <span>Theme</span>
          <div className="theme-buttons">
            <button
              onClick={(e) => {
                setThemeSettings({
                  ...themeSettings,
                  mode: e.currentTarget.textContent.trim(),
                });
              }}
              className={`theme-button ${themeSettings.mode === "Light" ? "active" : ""}`}
            >
              <MdLightMode />
              Light
            </button>
            <button
              onClick={(e) => {
                setThemeSettings({
                  ...themeSettings,
                  mode: e.currentTarget.textContent.trim(),
                });
              }}
              className={`theme-button ${themeSettings.mode === "Dark" ? "active" : ""}`}
            >
              <MdDarkMode />
              Dark
            </button>
          </div>
        </div>
        <div className="theme">
          <span>Primary Color</span>
          <div className="color-buttons">
            <div
              className={`outer ${themeSettings.colorPalette === "purple" ? "active" : ""}`}
            >
              <button
                onClick={() => {
                  setThemeSettings({
                    ...themeSettings,
                    colorPalette: "purple",
                  });
                }}
                className="color-button"
              ></button>
            </div>
            <div
              className={`outer ${themeSettings.colorPalette === "blue" ? "active" : ""}`}
            >
              <button
                onClick={() => {
                  setThemeSettings({
                    ...themeSettings,
                    colorPalette: "blue",
                  });
                }}
                className="color-button"
              ></button>
            </div>
            <div
              className={`outer ${themeSettings.colorPalette === "green" ? "active" : ""}`}
            >
              <button
                onClick={() => {
                  setThemeSettings({
                    ...themeSettings,
                    colorPalette: "green",
                  });
                }}
                className="color-button"
              ></button>
            </div>
            <div
              className={`outer ${themeSettings.colorPalette === "orange" ? "active" : ""}`}
            >
              <button
                onClick={() => {
                  setThemeSettings({
                    ...themeSettings,
                    colorPalette: "orange",
                  });
                }}
                className="color-button"
              ></button>
            </div>
            <div
              className={`outer ${themeSettings.colorPalette === "red" ? "active" : ""}`}
            >
              <button
                onClick={() => {
                  setThemeSettings({
                    ...themeSettings,
                    colorPalette: "red",
                  });
                }}
                className="color-button"
              ></button>
            </div>
          </div>
        </div>
      </div>
      <div className="setting-card">
        <h2>Preferences</h2>
        <div className="preference">
          <span>Show budget Alerts</span>
          <div className="switch-button">
            <CheckButton
              value={themeSettings.budgetAlerts}
              fnc={() => {
                setThemeSettings((setting) => {
                  setting.budgetAlerts = !setting.budgetAlerts;
                  return {
                    ...themeSettings,
                  };
                });
              }}
              label={"budgetAlerts"}
            />
          </div>
        </div>
        <div className="preference">
          <span>Date Format</span>
          <div className="color-buttons">
            <Selector
              options={formatsList}
              selectedVal={themeSettings.dateFormat}
              fnc={(e) => {
                setThemeSettings({
                  ...themeSettings,
                  dateFormat: e.target.value,
                });
              }}
            />
          </div>
        </div>
      </div>
      <div className="setting-card">
        <h2>Data & Export </h2>
        <div className="dataset">
          <div className="data">
            <div className="desc">
              <h3>Export Data (CSV)</h3>
              <p>
                Download Your transactions in CSV Format for backup or analysis
              </p>
            </div>
            <button
              onClick={() => {
                exportTransactionsToCSV(transactions);
              }}
              className="data-button"
            >
              Export Data (CSV)
            </button>
          </div>
          <div className="data">
            <div className="desc">
              <h3>Clear All Data</h3>
              <p>
                This will permanently delete all your data from this device.
                This action cannot be undone
              </p>
            </div>
            <button
              onClick={() => {
                clearAllData();
              }}
              className="data-button"
            >
              Clear Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
