# 💰 Budget Buddy

A modern and responsive **Expense Tracker** built with **React.js** to help users manage their income and expenses, organize transactions by category, track budgets, and view spending summaries.

The project was built as a practical React application to demonstrate component-based development, state management, routing, reusable components, filtering, and responsive UI design.

---

## 🚀 Live Demo

🔗 **Live Website:** [(https://budget-buddy-swart-phi.vercel.app/)]

🔗 **GitHub Repository:** [(https://github.com/Swapnil-Mhatre/budget-buddy)]

---

## ✨ Features

### 📊 Dashboard

- Filter dashboard data
- View recent transactions
- Quick overview of financial activity

### 💳 Transaction Management

- Add new income and expense transaction
- Categorize transactions
- Search transactions by title
- Filter transactions by:
  - Income / Expense
  - Category
  - Month

- Display transactions in a clean, organized list
- Pagination for transaction records

### 🗂️ Categories

- Separate income and expense categories
- Display transaction count for each category
- Display total amount spent/earned per category
- Category-specific icons
- Create New Categories with customization

### 💰 Budget

- Set and monitor spending budgets
- Track spending against budget limits
- Organize budgets by category

### 🎨 User Interface

- Responsive layout
- Sidebar navigation
- Reusable UI components
- Clean dashboard design
- Consistent icons and styling
- Interactive form controls
- Mobile-friendly layout

---

## 🛠️ Tech Stack

### Frontend

- **React.js**
- **JavaScript (ES6+)**
- **HTML5**
- **CSS3**

### Libraries

- **React Router** — Application routing
- **React Icons** — Icons throughout the application
- **recharts** — Charts for Displaying Data

### Development Tools

- **Vite**
- **ESLint**
- **Git & GitHub**

### Deployment 

- **Vercel**

---

## 📁 Project Structure

```text
Budget Buddy
├───public
│       favicon.png
│
├───src
│   │   App.jsx
│   │   index.css
│   │   main.jsx
│   │
│   ├───components
│   │   │   BudgetForm.jsx
│   │   │   CardLayout.jsx
│   │   │   CategoryForm.jsx
│   │   │   CustomButtons.jsx
│   │   │   CustomDropdown.jsx
│   │   │   Header.jsx
│   │   │   Sidebar.jsx
│   │   │
│   │   ├───Add Transaction Components
│   │   │       AddExpenseForm.jsx
│   │   │       Suggestion.jsx
│   │   │
│   │   ├───Dashboard
│   │   │       BalanceSummary.jsx
│   │   │       BudgetSummary.jsx
│   │   │       ExpenseTrend.jsx
│   │   │       QuickAdd.jsx
│   │   │       RecentTransactions.jsx
│   │   │
│   │   └───Reports Components
│   │           ExpenseOverview.jsx
│   │           IncomeExpense.jsx
│   │           MonthlyTrend.jsx
│   │           TopExpense.jsx
│   │
│   ├───context
│   │       ExpenseContext.jsx
│   │       UIContext.jsx
│   │
│   ├───css
│   │       addTransaction.css
│   │       budget.css
│   │       cardLayout.css
│   │       category.css
│   │       customButtons.css
│   │       dashboard.css
│   │       dropdown.css
│   │       header.css
│   │       report.css
│   │       Settings.css
│   │       sidebar.css
│   │       transaction.css
│   │
│   ├───pages
│   │       AddTransaction.jsx
│   │       Budget.jsx
│   │       Categories.jsx
│   │       Dashboard.jsx
│   │       Reports.jsx
│   │       Settings.jsx
│   │       Transactions.jsx
│   │
│   └───utils
│           Calculation.jsx
│           Date.jsx
│           Pathways.jsx
│
├───.gitignore
├───eslint.config.js
├───index.html
├───package-lock.json
├───package.json
├───README.md
└───vite
```

---

## 🧭 Application Routes

| Route             | Page            | Description                          |
| ----------------- | --------------- | ------------------------------------ |
| `/`               | Dashboard       | Overview of financial activity       |
| `/transactions`   | Transactions    | View and filter transactions         |
| `/addtransaction` | Add Transaction | Add income or expense                |
| `/categories`     | Categories      | Manage and view categories           |
| `/budget`         | Budget          | Track spending budgets               |
| `/reports`        | Reports         | Track Reports By filtering           |
| `/settings`       | Settings        | Customize UI According to preference |

---

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/your-username/expense-tracker.git
```

### 2. Navigate to the project

```bash
cd expense-tracker
```

### 3. Install dependencies

```bash
npm install
```

### 4. Start the development server

```bash
npm run dev
```

The application will be available at the local development URL shown in your terminal, usually:

```text
http://localhost:5173
```

---

## 🏗️ Production Build

To create an optimized production build:

```bash
npm run build
```

To preview the production build locally:

```bash
npm run preview
```

The production files will be generated inside the `dist` directory.

---

## 🧠 React Concepts Practiced

This project helped implement several important React concepts:

- Functional components
- Props
- `useState`
- `useEffect`
- React Router
- `NavLink`
- Conditional rendering
- Controlled form inputs
- Event handling
- Array methods such as:
  - `map()`
  - `filter()`
  - `reduce()`
  - `sort()`

- Reusable components
- Dynamic rendering
- Derived state
- Data filtering
- State organization
- Component composition

## 🎯 Project Goals

The main goals of this project were to:

- Build a complete React application from scratch
- Practice React component architecture
- Work with application state
- Implement client-side routing
- Create reusable components
- Practice filtering and data manipulation
- Build a responsive user interface
- Create a project suitable for deployment and a developer portfolio

---

## 📚 What I Learned

Building this project provided practical experience with:

- Structuring a medium-sized React application
- Managing state across multiple components
- Creating reusable components
- Handling forms and controlled inputs
- Implementing filtering and pagination
- Working with dates and transaction data
- Designing a consistent UI
- Organizing React routes
- Preparing a React application for production deployment

---

## 👨‍💻 Author

**Swapnil Mhatre**
Frontend / Web Development

- GitHub: [https://github.com/Swapnil-Mhatre]
- LinkedIn: [https://www.linkedin.com/in/swapnil-mhatre-5160b3296/]