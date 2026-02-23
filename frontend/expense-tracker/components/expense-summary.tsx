import { Expense } from "@/types/expense";

type ExpenseSummaryProps = {
  expenses: Expense[];
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export function ExpenseSummary({ expenses }: ExpenseSummaryProps) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);

  const totalsByCategory = expenses.reduce<Record<string, number>>(
    (acc, item) => {
      const current = acc[item.category] ?? 0;
      acc[item.category] = current + item.amount;
      return acc;
    },
    {}
  );

  const categoryEntries = Object.entries(totalsByCategory).sort(
    (left, right) => right[1] - left[1]
  );

  return (
    <section className="card summary-card">
      <div className="card-title-row">
        <h2>Spending Summary</h2>
        <p>{expenses.length} transactions</p>
      </div>

      <div className="total-card">
        <p>Total spending</p>
        <strong>{currency.format(total)}</strong>
      </div>

      <div className="category-summary">
        <h3>Totals by category</h3>
        {categoryEntries.length === 0 ? (
          <p className="empty-state">No expenses yet.</p>
        ) : (
          <ul className="category-list">
            {categoryEntries.map(([category, amount]) => (
              <li key={category}>
                <span>{category}</span>
                <strong>{currency.format(amount)}</strong>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
