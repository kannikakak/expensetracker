export type ExpenseCategory =
  | "Food"
  | "Transport"
  | "Rent"
  | "Utilities"
  | "Entertainment"
  | "Other";

export interface Expense {
  id: string;
  title: string;
  category: ExpenseCategory;
  amount: number;
  date: string;
}
