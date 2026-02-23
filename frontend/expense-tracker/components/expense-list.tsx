import { Expense } from "@/types/expense";

type ExpenseListProps = {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <section className="card">
        <h2>Recent Expenses</h2>
        <p className="empty-state">No expenses yet. Add your first expense above.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Recent Expenses</h2>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <div>
              <p className="expense-title">{expense.title}</p>
              <p className="expense-meta">
                {expense.category} | {expense.date}
              </p>
            </div>
            <div className="expense-actions">
              <strong>{currency.format(expense.amount)}</strong>
              <button
                type="button"
                className="danger-button"
                onClick={() => onDeleteExpense(expense.id)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
