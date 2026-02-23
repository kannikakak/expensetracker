import { Expense } from "@/types/expense";
import { CSSProperties } from "react";

type ExpenseSummaryProps = {
  expenses: Expense[];
  budget: number;
};

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD"
});

export function ExpenseSummary({ expenses, budget }: ExpenseSummaryProps) {
  const total = expenses.reduce((sum, item) => sum + item.amount, 0);
  const budgetUsagePercent = Math.min(Math.round((total / budget) * 100), 100);
  const remaining = Math.max(budget - total, 0);

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

  const ringStyle = {
    "--progress": `${budgetUsagePercent}%`
  } as CSSProperties;

  return (
    <section className="card summary-card">
      <div className="card-title-row">
        <h2>Budget Performance</h2>
        <p>{expenses.length} transactions</p>
      </div>

      <div className="summary-layout">
        <div className="progress-ring" style={ringStyle}>
          <div className="progress-ring-inner">
            <strong>{budgetUsagePercent}%</strong>
            <span>Budget used</span>
          </div>
        </div>

        <div className="summary-stats">
          <article className="metric-card">
            <p>Spent this month</p>
            <strong>{currency.format(total)}</strong>
          </article>
          <article className="metric-card">
            <p>Remaining budget</p>
            <strong>{currency.format(remaining)}</strong>
          </article>
        </div>
      </div>

      <div className="category-grid">
        {categoryEntries.length === 0 ? (
          <p className="empty-state">No category totals yet.</p>
        ) : (
          categoryEntries.slice(0, 4).map(([category, amount]) => {
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
