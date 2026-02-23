export type ExpenseCategory =
  | "Food"
  | "Transport"
  | "Rent"
  | "Utilities"
  | "Entertainment"
  | "Other";

export const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Food",
  "Transport",
  "Rent",
  "Utilities",
  "Entertainment",
  "Other"
];

export interface Expense {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
}

export interface ExpenseInput {
  title: string;
  amount: number;
  category: ExpenseCategory;
  date: string;
}
