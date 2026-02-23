import { Expense } from "@/types/expense";

type ExpenseListProps = {
  expenses: Expense[];
  onDeleteExpense: (id: string) => void;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric"
});

const formatDate = (value: string) => {
  const [year, month, day] = value
    .split("-")
    .map((part) => Number.parseInt(part, 10));

  if (!year || !month || !day) {
    return value;
  }

  return dateFormatter.format(new Date(year, month - 1, day));
};

export function ExpenseList({ expenses, onDeleteExpense }: ExpenseListProps) {
  if (expenses.length === 0) {
    return (
      <section className="card">
        <div className="card-title-row">
          <h2>Expenses</h2>
          <p>0 records</p>
        </div>
        <p className="empty-state">No expenses yet.</p>
      </section>
    );
  }

  return (
    <section className="card">
      <div className="card-title-row">
        <h2>Expenses</h2>
        <p>{expenses.length} records</p>
      </div>
      <div className="table-wrap">
        <table className="expense-table">
          <thead>
            <tr>
              <th>Title</th>
              <th>Category</th>
              <th>Date</th>
              <th>Amount</th>
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense.id}>
                <td>{expense.title}</td>
                <td>
                  <span className="category-pill">{expense.category}</span>
                </td>
                <td>{formatDate(expense.date)}</td>
                <td className="amount-cell">{currency.format(expense.amount)}</td>
                <td className="actions-cell">
                  <button
                    type="button"
                    className="danger-button"
                    onClick={() => onDeleteExpense(expense.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
