"use client";

import { useMemo, useState } from "react";
import { AddExpenseForm } from "@/components/add-expense-form";
import { ExpenseFilters } from "@/components/expense-filters";
import { ExpenseList } from "@/components/expense-list";
import { ExpenseSummary } from "@/components/expense-summary";
import { mockExpenses } from "@/data/mock-expenses";
import { ExpenseCategory, ExpenseInput } from "@/types/expense";

export default function HomePage() {
  const [expenses, setExpenses] = useState(mockExpenses);
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | "All">("All");

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) => {
        return selectedCategory === "All" || expense.category === selectedCategory;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses, selectedCategory]);

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
    <main className="page">
      <section className="app-shell">
        <header className="page-header">
          <p className="kicker">Expense Tracker</p>
          <h1>Simple Spending Dashboard</h1>
          <p className="subtitle">
            Add expenses, track totals, filter by category, and manage entries.
          </p>
        </header>

        <section className="top-grid">
          <ExpenseSummary expenses={expenses} />
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </section>

        <ExpenseFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
      </section>
    </main>
  );
}
