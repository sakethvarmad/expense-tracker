import { useEffect, useMemo, useState } from "react";
import { getExpenses, createExpense, updateExpense, deleteExpense } from "./api";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Summary from "./components/Summary";

export default function App() {
  const [expenses, setExpenses] = useState([]);
  const [editing, setEditing] = useState(null);
  const [filter, setFilter] = useState("All");
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

  const visible = useMemo(
    () => (filter === "All" ? expenses : expenses.filter((e) => e.category === filter)),
    [expenses, filter]
  );

  return (
    <div className="container">
      <header>
        <h1>💰 Expense Tracker</h1>
        <p>Track where your money goes.</p>
      </header>

      {error && <div className="error">{error}</div>}

      <div className="layout">
        <section className="card">
          <h2>{editing ? "Edit expense" : "Add expense"}</h2>
          <ExpenseForm onSubmit={handleSubmit} editing={editing} onCancel={() => setEditing(null)} />
        </section>

        <section className="card">
          <Summary expenses={expenses} />
        </section>
      </div>

      <section className="card">
        <div className="list-header">
          <h2>Expenses</h2>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            {["All", "Food", "Transport", "Shopping", "Bills", "Health", "Other"].map((c) => (
              <option key={c}>{c}</option>
            ))}
          </select>
        </div>
        {loading ? <p>Loading…</p> : <ExpenseList expenses={visible} onEdit={setEditing} onDelete={handleDelete} />}
      </section>
    </div>
  );
}
