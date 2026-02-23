import { Expense } from "@/types/expense";

type ExpenseListProps = {
  expenses: Expense[];
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export function ExpenseList({ expenses }: ExpenseListProps) {
  return (
    <section className="card">
      <h2>Recent Expenses</h2>
      <ul className="expense-list">
        {expenses.map((expense) => (
          <li key={expense.id} className="expense-item">
            <div>
              <p className="expense-title">{expense.title}</p>
              <p className="expense-meta">
                {expense.category} • {expense.date}
              </p>
            </div>
            <strong>{currency.format(expense.amount)}</strong>
          </li>
        ))}
      </ul>
    </section>
  );
}
