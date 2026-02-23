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

  const totalsByCategory = expenses.reduce<Record<string, number>>((acc, item) => {
    const current = acc[item.category] ?? 0;
    acc[item.category] = current + item.amount;
    return acc;
  }, {});

  return (
    <section className="card">
      <h2>Monthly Summary</h2>
      <p className="total">{currency.format(total)}</p>
      <div className="category-grid">
        {Object.entries(totalsByCategory).map(([category, amount]) => (
          <div key={category} className="category-item">
            <span>{category}</span>
            <strong>{currency.format(amount)}</strong>
          </div>
        ))}
      </div>
    </section>
  );
}
