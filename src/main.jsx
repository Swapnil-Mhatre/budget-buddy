import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import ExpenseContext from "./context/ExpenseContext.jsx";
import UIContext from "./context/UIContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <UIContext>
      <ExpenseContext>
        <App />
      </ExpenseContext>
    </UIContext>
  </BrowserRouter>,
);
