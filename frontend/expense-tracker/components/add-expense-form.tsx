"use client";

import { FormEvent, useState } from "react";
import {
  ExpenseCategory,
  ExpenseInput,
  EXPENSE_CATEGORIES
} from "@/types/expense";

type AddExpenseFormProps = {
  onAddExpense: (expense: ExpenseInput) => void;
};

const initialState: ExpenseInput = {
  title: "",
  amount: 0,
  category: "Food",
  date: new Date().toISOString().slice(0, 10)
};

export function AddExpenseForm({ onAddExpense }: AddExpenseFormProps) {
  const [title, setTitle] = useState(initialState.title);
  const [amount, setAmount] = useState(initialState.amount);
  const [category, setCategory] = useState<ExpenseCategory>(initialState.category);
  const [date, setDate] = useState(initialState.date);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || amount <= 0 || !date) {
      return;
    }

    onAddExpense({
      title: title.trim(),
      amount,
      category,
      date
    });

    setTitle("");
    setAmount(0);
    setCategory("Food");
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <section className="card add-card">
      <div className="card-title-row">
        <h2>Add Expense</h2>
        <p>Capture spend instantly</p>
      </div>
      <form className="expense-form" onSubmit={handleSubmit}>
        <label className="field">
          <span>Title</span>
          <input
            required
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="Groceries"
            maxLength={60}
          />
        </label>

        <label className="field">
          <span>Amount (USD)</span>
          <input
            required
            type="number"
            min="0.01"
            step="0.01"
            value={amount === 0 ? "" : amount}
            onChange={(event) => setAmount(Number(event.target.value))}
            placeholder="25.50"
          />
        </label>

        <div className="field-row">
          <label className="field">
            <span>Category</span>
            <select
              value={category}
              onChange={(event) =>
                setCategory(event.target.value as ExpenseCategory)
              }
            >
              {EXPENSE_CATEGORIES.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>
          </label>

          <label className="field">
            <span>Date</span>
            <input
              required
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="primary-button">
          Add Expense
        </button>
      </form>
    </section>
  );
}
