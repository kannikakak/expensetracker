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
      <section className="card activity-card">
        <div className="card-title-row">
          <h2>Recent Activity</h2>
          <p>0 records</p>
        </div>
        <p className="empty-state">No expenses yet. Add your first expense above.</p>
      </section>
    );
  }

  return (
    <section className="card activity-card">
      <div className="card-title-row">
        <h2>Recent Activity</h2>
        <p>{expenses.length} records</p>
      </div>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <div className="expense-detail">
              <p className="expense-title">{expense.title}</p>
              <p className="expense-meta">
                <span className="category-pill">{expense.category}</span>
                <span>{expense.date}</span>
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
