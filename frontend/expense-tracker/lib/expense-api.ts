import { Expense, ExpenseInput } from "@/types/expense";

type ApiExpense = {
  id: string;
  title: string;
  amount: number | string;
  category: string;
  date: string;
};

const fallbackApiBaseUrl = process.env.NODE_ENV === "development"
  ? "http://localhost:8080"
  : "https://expense-backend-latest-ze9i.onrender.com";

const apiBaseUrl = (
  process.env.NEXT_PUBLIC_API_BASE_URL?.trim() || fallbackApiBaseUrl
).replace(/\/+$/, "");

const toExpense = (value: ApiExpense): Expense => ({
  id: value.id,
  title: value.title,
  amount: Number(value.amount),
  category: value.category as Expense["category"],
  date: value.date
});

const requestJson = async <T>(path: string, init?: RequestInit): Promise<T> => {
  const response = await fetch(`${apiBaseUrl}${path}`, init);

  if (!response.ok) {
    let message = `Request failed: ${response.status}`;
    try {
      const errorPayload = (await response.json()) as { message?: string };
      if (errorPayload.message) {
        message = errorPayload.message;
      }
    } catch {
      // Use fallback status message when JSON body is missing.
    }
    throw new Error(message);
  }

  return (await response.json()) as T;
};

export const listExpenses = async (): Promise<Expense[]> => {
  const payload = await requestJson<ApiExpense[]>("/api/expenses");
  return payload.map(toExpense);
};

export const createExpense = async (input: ExpenseInput): Promise<Expense> => {
  const payload = await requestJson<ApiExpense>("/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(input)
  });

  return toExpense(payload);
};

export const deleteExpense = async (id: string): Promise<void> => {
  const response = await fetch(`${apiBaseUrl}/api/expenses/${id}`, {
    method: "DELETE"
  });

  if (!response.ok) {
    throw new Error(`Delete failed: ${response.status}`);
  }
};
