"use client";

import { ExpenseCategory, EXPENSE_CATEGORIES } from "@/types/expense";

type ExpenseFiltersProps = {
  selectedCategory: ExpenseCategory | "All";
  onCategoryChange: (value: ExpenseCategory | "All") => void;
};

export function ExpenseFilters({
  selectedCategory,
  onCategoryChange
}: ExpenseFiltersProps) {
  return (
    <section className="card">
      <div className="card-title-row">
        <h2>Filter Expenses</h2>
        <p>{selectedCategory === "All" ? "Showing all categories" : selectedCategory}</p>
      </div>
      <label className="field filter-control">
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
    </section>
  );
}
