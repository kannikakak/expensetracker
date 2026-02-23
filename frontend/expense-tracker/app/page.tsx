import { ExpenseList } from "@/components/expense-list";
import { ExpenseSummary } from "@/components/expense-summary";
import { mockExpenses } from "@/data/mock-expenses";

export default function HomePage() {
  return (
    <main className="container">
      <header className="hero">
        <p className="kicker">Expense Tracker</p>
        <h1>Personal Finance Dashboard</h1>
        <p>
          Starter project for homework CI/CD. This frontend is ready for GitHub
          Actions + Vercel deployment.
        </p>
      </header>

      <div className="grid">
        <ExpenseSummary expenses={mockExpenses} />
        <ExpenseList expenses={mockExpenses} />
      </div>
    </main>
  );
}
