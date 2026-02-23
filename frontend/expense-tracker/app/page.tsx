"use client";

import { useEffect, useMemo, useState } from "react";
import { AddExpenseForm } from "@/components/add-expense-form";
import { ExpenseFilters } from "@/components/expense-filters";
import { ExpenseList } from "@/components/expense-list";
import { ExpenseSummary } from "@/components/expense-summary";
import { createExpense, deleteExpense, listExpenses } from "@/lib/expense-api";
import { Expense, ExpenseCategory, ExpenseInput } from "@/types/expense";

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedCategory, setSelectedCategory] =
    useState<ExpenseCategory | "All">("All");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  const filteredExpenses = useMemo(() => {
    return expenses
      .filter((expense) => {
        return selectedCategory === "All" || expense.category === selectedCategory;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [expenses, selectedCategory]);

  useEffect(() => {
    let isMounted = true;

    const loadExpenses = async () => {
      setIsLoading(true);
      try {
        const payload = await listExpenses();
        if (isMounted) {
          setExpenses(payload);
          setStatusMessage(null);
        }
      } catch {
        if (isMounted) {
          setStatusMessage(
            "Could not load expenses from backend. Set NEXT_PUBLIC_API_BASE_URL and ensure backend is running."
          );
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    void loadExpenses();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleAddExpense = async (expenseInput: ExpenseInput): Promise<boolean> => {
    setIsSaving(true);
    try {
      const createdExpense = await createExpense(expenseInput);
      setExpenses((current) => [createdExpense, ...current]);
      setStatusMessage(null);
      return true;
    } catch {
      setStatusMessage("Could not add expense. Please try again.");
      return false;
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteExpense = (id: string) => {
    void (async () => {
      try {
        await deleteExpense(id);
        setExpenses((current) => current.filter((item) => item.id !== id));
        setStatusMessage(null);
      } catch {
        setStatusMessage("Could not delete expense. Please try again.");
      }
    })();
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
          <AddExpenseForm onAddExpense={handleAddExpense} isSubmitting={isSaving} />
        </section>

        <ExpenseFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />

        {statusMessage ? (
          <p className="status-banner status-banner-error">{statusMessage}</p>
        ) : null}

        {isLoading ? (
          <section className="card">
            <p className="empty-state">Loading expenses from backend...</p>
          </section>
        ) : (
          <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
        )}
      </section>
    </main>
  );
}
