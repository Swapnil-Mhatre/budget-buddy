import "../css/header.css";
import {
  MdClose,
  MdDateRange,
  MdMenu,
  MdNotificationsNone,
  MdPerson,
} from "react-icons/md";
import CustomDropdown from "./CustomDropdown.jsx"
import { useContext, useEffect, useState } from "react";
import { ExpenseContextData } from "../context/ExpenseContext.jsx";
import { UIContextData } from "../context/UIContext.jsx";

const Header = ({
  props = {
    title: "Hi, Guest",
    description: "Here's your overall overview",
  },
}) => {
  const { setFilterBy, alerts } = useContext(ExpenseContextData);
  const { themeSettings, width, setSidebarStatus } = useContext(UIContextData);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [alertsList, setAlertsList] = useState([]);

  function populateAlertList(alerts) {
    const list = [];
    alerts.map((alert) => {
      const alertData = {
        title: getTitle(alert.percentage),
        message: `${alert.category} is at ${alert.percentage}% of its budget.`,
      };
      list.push(alertData);
    });
    setAlertsList(list);
  }

  function getTitle(percentage) {
    if (percentage >= 101) return "🚨 Budget exceeded";
    if (percentage >= 90) return "🔶 Almost at limit";
    if (percentage >= 75) return "⚠️ Approaching budget";
  }

  useEffect(() => {
    populateAlertList(alerts);
  }, [alerts]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [themeSettings.budgetAlerts]);

  const dropdown = [
    { value: "This Month" },
    { value: "Last 3 Months" },
    { value: "This Year" },
  ];

  return (
    <header className="main-header">
      <div className="left">
        <h2>{props.title}</h2>
        <p>{props.description}</p>
      </div>

      <div className="right">
        {location.pathname === "/" ? (
          <CustomDropdown
            icon={<MdDateRange className="custom" />}
            options={dropdown}
            fnc={(e) => {
              setFilterBy(e.target.value);
            }}
          />
        ) : (
          ""
        )}

        <div className="right-icon">
          <div className="notification">
            <div className="notification-box">
              <MdNotificationsNone
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="custom"
              />
              {themeSettings.budgetAlerts && alertsList.length !== 0 && (
                <div className="alert-sign"></div>
              )}
            </div>
            {themeSettings.budgetAlerts && isMenuOpen && (
              <div className="menu">
                <div className="menu-header">
                  <h2>Notification</h2>
                  <MdClose
                    className="custom"
                    onClick={() => setIsMenuOpen(false)}
                  />
                </div>
                {alertsList.length > 0 ? (
                  alertsList.map((alert, idx) => (
                    <div key={idx} className="menu-item">
                      <h3>{alert.title}</h3>
                      <p>{alert.message}</p>
                    </div>
                  ))
                ) : (
                  <p className="empty-notification">you're going good!</p>
                )}
              </div>
            )}
          </div>
          {width < 500 ? (
            <MdMenu className="custom" onClick={() => setSidebarStatus(true)} />
          ) : (
            <MdPerson className="custom" />
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
