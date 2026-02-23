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
      <ExpenseFilters
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
        onSearchChange={setSearchTerm}
        onCategoryChange={setSelectedCategory}
      />

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
