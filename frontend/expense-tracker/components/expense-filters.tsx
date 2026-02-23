"use client";

import { ExpenseCategory, EXPENSE_CATEGORIES } from "@/types/expense";

type ExpenseFiltersProps = {
  searchTerm: string;
  selectedCategory: ExpenseCategory | "All";
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: ExpenseCategory | "All") => void;
};

export function ExpenseFilters({
  searchTerm,
  selectedCategory,
  onSearchChange,
  onCategoryChange
}: ExpenseFiltersProps) {
  return (
    <section className="card filters-card">
      <div className="card-title-row">
        <h2>Find Transactions</h2>
        <p>Filter by text or category</p>
      </div>
      <div className="field-row filters-row">
        <label className="field">
          <span>Search title</span>
          <input
            value={searchTerm}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search groceries, rent, internet..."
            maxLength={60}
          />
        </label>

        <label className="field">
          <span>Category</span>
          <select
            value={selectedCategory}
            onChange={(event) =>
              onCategoryChange(event.target.value as ExpenseCategory | "All")
            }
          >
            <option value="All">All categories</option>
            {EXPENSE_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  );
}
