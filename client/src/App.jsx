import { useEffect, useMemo, useState } from "react";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "./api";
import { CATEGORIES } from "./constants";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

const SORTS = {
  newest: (a, b) => new Date(b.date) - new Date(a.date),
  oldest: (a, b) => new Date(a.date) - new Date(b.date),
  highest: (a, b) => b.amount - a.amount,
  lowest: (a, b) => a.amount - b.amount,
};

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function load() {
    try {
      setError("");
      setExpenses(await getExpenses());
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  async function handleSubmit(data) {
    try {
      setError("");
      if (editing) {
        const updated = await updateExpense(editing._id, data);
        setExpenses((prev) => prev.map((e) => (e._id === updated._id ? updated : e)));
        setEditing(null);
      } else {
        const created = await createExpense(data);
        setExpenses((prev) => [created, ...prev]);
      }
    } catch (err) {
      setError(err.message);
    }
  }

  async function handleDelete(id) {
    if (!window.confirm("Delete this expense?")) return;
    try {
      await deleteExpense(id);
      setExpenses((prev) => prev.filter((e) => e._id !== id));
    } catch (err) {
      setError(err.message);
    }
  }

  const visible = useMemo(() => {
    const q = search.trim().toLowerCase();
    return expenses
      .filter((e) => filter === "All" || e.category === filter)
      .filter((e) => !q || e.title.toLowerCase().includes(q) || (e.note || "").toLowerCase().includes(q))
      .sort(SORTS[sort]);
  }, [expenses, filter, search, sort]);

  return (
    <>
      <header className="hero">
        <h1>💰 Expense Tracker</h1>
        <p>Know where every rupee goes.</p>
      </header>

      <main className="container">
        {error && <div className="error">⚠️ {error}</div>}

        <div className="layout">
          <section className="card">
            <h2>{editing ? "✏️ Edit expense" : "➕ Add expense"}</h2>
            <ExpenseForm onSubmit={handleSubmit} editing={editing} onCancel={() => setEditing(null)} />
          </section>

          <section className="card">
            <Summary expenses={expenses} />
          </section>
        </div>

        <section className="card">
          <h2>🧾 Expenses</h2>
          <div className="toolbar">
            <input
              type="search"
              placeholder="Search by title or note…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={filter} onChange={(e) => setFilter(e.target.value)}>
              <option>All</option>
              {CATEGORIES.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </select>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="newest">Newest first</option>
              <option value="oldest">Oldest first</option>
              <option value="highest">Highest amount</option>
              <option value="lowest">Lowest amount</option>
            </select>
          </div>
          {loading ? (
            <p className="muted">Loading…</p>
          ) : (
            <ExpenseList expenses={visible} onEdit={setEditing} onDelete={handleDelete} />
          )}
        </section>
      </main>

      <footer className="footer">Built with React, Express &amp; MongoDB</footer>
    </>
  );
}
