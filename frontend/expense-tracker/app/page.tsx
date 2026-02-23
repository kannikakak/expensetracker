"use client";

import { useMemo, useState } from "react";
import { AddExpenseForm } from "@/components/add-expense-form";
import { ExpenseFilters } from "@/components/expense-filters";
import { ExpenseList } from "@/components/expense-list";
import { ExpenseSummary } from "@/components/expense-summary";
import { mockExpenses } from "@/data/mock-expenses";
import { ExpenseCategory, ExpenseInput } from "@/types/expense";

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const WEEK_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const SIDEBAR_ITEMS = [
  "Dashboard",
  "Transactions",
  "Categories",
  "Reports",
  "Settings"
];

export default function HomePage() {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | "All">("All");

  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const normalizedSearch = searchTerm.trim().toLowerCase();
      const titleMatches = expense.title.toLowerCase().includes(normalizedSearch);
      const categoryMatches =
        selectedCategory === "All" || expense.category === selectedCategory;

      return titleMatches && categoryMatches;
    });
  }, [expenses, searchTerm, selectedCategory]);

  const sortedExpenses = useMemo(() => {
    return [...filteredExpenses].sort((a, b) => b.date.localeCompare(a.date));
  }, [filteredExpenses]);

  const monthlyBudget = 2500;

  const totalSpent = useMemo(
    () => sortedExpenses.reduce((sum, item) => sum + item.amount, 0),
    [sortedExpenses]
  );

  const remainingBudget = Math.max(monthlyBudget - totalSpent, 0);
  const averageExpense =
    sortedExpenses.length === 0 ? 0 : totalSpent / sortedExpenses.length;

  const weeklySpend = useMemo(() => {
    const totals = new Array<number>(WEEK_LABELS.length).fill(0);

    sortedExpenses.forEach((expense) => {
      const parts = expense.date.split("-").map((part) => Number.parseInt(part, 10));

      if (parts.length !== 3 || parts.some((part) => Number.isNaN(part))) {
        return;
      }

      const [year, month, day] = parts;
      const dayOfWeek = new Date(year, month - 1, day).getDay();
      const mondayFirstIndex = (dayOfWeek + 6) % 7;
      totals[mondayFirstIndex] += expense.amount;
    });

    const highestValue = Math.max(...totals, 1);

    return totals.map((amount, index) => ({
      label: WEEK_LABELS[index],
      amount,
      height: amount === 0 ? 5 : Math.max(Math.round((amount / highestValue) * 100), 14)
    }));
  }, [sortedExpenses]);

  const strongestDay = weeklySpend.reduce((previous, current) =>
    current.amount > previous.amount ? current : previous
  );

  const handleAddExpense = (expenseInput: ExpenseInput) => {
    const nextExpense = {
      ...expenseInput,
      id: crypto.randomUUID()
    };

    setExpenses((current) => [nextExpense, ...current]);
  };

  const handleDeleteExpense = (id: string) => {
    setExpenses((current) => current.filter((item) => item.id !== id));
  };

  return (
    <main className="dashboard-page">
      <div className="bg-orb orb-one" />
      <div className="bg-orb orb-two" />

      <div className="dashboard-shell">
        <aside className="sidebar">
          <div className="brand-block">
            <p>Expense Tracker</p>
            <h2>FlowLedger</h2>
          </div>

          <nav className="sidebar-nav" aria-label="Dashboard sections">
            {SIDEBAR_ITEMS.map((item, index) => (
              <button
                key={item}
                type="button"
                className={`nav-item${index === 0 ? " active" : ""}`}
              >
                {item}
              </button>
            ))}
          </nav>

          <section className="sidebar-budget">
            <p>Monthly Budget</p>
            <strong>{currency.format(monthlyBudget)}</strong>
            <span>{currency.format(remainingBudget)} left</span>
          </section>
        </aside>

        <section className="workspace">
          <header className="workspace-header">
            <div>
              <p className="kicker">Expense Tracker</p>
              <h1>Finance Command Center</h1>
              <p className="hero-copy">
                Track spending trends, add transactions fast, and keep your
                monthly budget under control.
              </p>
            </div>

            <div className="quick-stats">
              <article className="quick-stat">
                <span>Total Spent</span>
                <strong>{currency.format(totalSpent)}</strong>
              </article>
              <article className="quick-stat">
                <span>Avg Transaction</span>
                <strong>{currency.format(averageExpense)}</strong>
              </article>
              <article className="quick-stat">
                <span>Remaining</span>
                <strong>{currency.format(remainingBudget)}</strong>
              </article>
            </div>
          </header>

          <ExpenseFilters
            searchTerm={searchTerm}
            selectedCategory={selectedCategory}
            onSearchChange={setSearchTerm}
            onCategoryChange={setSelectedCategory}
          />

          <div className="dashboard-grid">
            <ExpenseSummary expenses={sortedExpenses} budget={monthlyBudget} />
            <AddExpenseForm onAddExpense={handleAddExpense} />

            <section className="card chart-card">
              <div className="card-title-row">
                <h2>Weekly Spend Rhythm</h2>
                <p>
                  Peak: {strongestDay.label} ({currency.format(strongestDay.amount)})
                </p>
              </div>

              <div className="bar-chart">
                {weeklySpend.map((day) => (
                  <div key={day.label} className="bar-slot">
                    <div className="bar-track">
                      <div
                        className="bar-fill"
                        style={{ height: `${day.height}%` }}
                        title={`${day.label}: ${currency.format(day.amount)}`}
                      />
                    </div>
                    <strong>{day.label}</strong>
                    <span>{currency.format(day.amount)}</span>
                  </div>
                ))}
              </div>
            </section>

            <ExpenseList
              expenses={sortedExpenses.slice(0, 8)}
              onDeleteExpense={handleDeleteExpense}
            />
          </div>
        </section>
      </div>
    </main>
  );
}
