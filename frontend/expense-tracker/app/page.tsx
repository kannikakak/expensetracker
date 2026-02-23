"use client";

import { useMemo, useState } from "react";
import { AddExpenseForm } from "@/components/add-expense-form";
import { ExpenseList } from "@/components/expense-list";
import { ExpenseSummary } from "@/components/expense-summary";
import { mockExpenses } from "@/data/mock-expenses";
import { ExpenseInput } from "@/types/expense";

export default function HomePage() {
  const [expenses, setExpenses] = useState(mockExpenses);

  const sortedExpenses = useMemo(() => {
    return [...expenses].sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses]);

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
    <main className="container">
      <header className="hero">
        <p className="kicker">Expense Tracker</p>
        <h1>Personal Finance Dashboard</h1>
        <p>
          Starter project for homework CI/CD. This frontend is ready for GitHub
          Actions + Vercel deployment.
        </p>
      </header>

      <AddExpenseForm onAddExpense={handleAddExpense} />

      <div className="grid">
        <ExpenseSummary expenses={sortedExpenses} />
        <ExpenseList
          expenses={sortedExpenses}
          onDeleteExpense={handleDeleteExpense}
        />
      </div>
    </main>
  );
}
