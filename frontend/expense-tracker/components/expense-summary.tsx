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

  const largestCategoryTotal = categoryEntries[0]?.[1] ?? 1;

  return (
    <section className="card">
      <div className="summary-head">
        <h2>Monthly Summary</h2>
        <p className="summary-caption">{expenses.length} expenses</p>
      </div>
      <p className="total">{currency.format(total)}</p>
      <div className="category-grid">
        {categoryEntries.length === 0 ? (
          <p className="empty-state">No category totals yet.</p>
        ) : (
          categoryEntries.map(([category, amount]) => {
            const widthPercent = Math.round((amount / largestCategoryTotal) * 100);

            return (
              <div key={category} className="category-item">
                <div className="category-content">
                  <span>{category}</span>
                  <strong>{currency.format(amount)}</strong>
                </div>
                <div className="category-track">
                  <div className="category-fill" style={{ width: `${widthPercent}%` }} />
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
