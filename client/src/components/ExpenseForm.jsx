import { useEffect, useState } from "react";

const CATEGORIES = ["Food", "Transport", "Shopping", "Bills", "Health", "Other"];
const empty = { title: "", amount: "", category: "Food", date: new Date().toISOString().slice(0, 10), note: "" };

export default function ExpenseForm({ onSubmit, editing, onCancel }) {
  const [form, setForm] = useState(empty);

  useEffect(() => {
    if (editing) {
      setForm({
        title: editing.title,
        amount: editing.amount,
        category: editing.category,
        date: editing.date.slice(0, 10),
        note: editing.note || "",
      });
    } else {
      setForm(empty);
    }
  }, [editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function submit(e) {
    e.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
    if (!editing) setForm(empty);
  }

  return (
    <form onSubmit={submit} className="form">
      <input name="title" placeholder="Title (e.g. Lunch)" value={form.title} onChange={change} required />
      <input name="amount" type="number" step="0.01" min="0.01" placeholder="Amount" value={form.amount} onChange={change} required />
      <select name="category" value={form.category} onChange={change}>
        {CATEGORIES.map((c) => (
          <option key={c}>{c}</option>
        ))}
      </select>
      <input name="date" type="date" value={form.date} onChange={change} required />
      <input name="note" placeholder="Note (optional)" value={form.note} onChange={change} />
      <div className="btn-row">
        <button type="submit" className="btn primary">{editing ? "Update" : "Add"}</button>
        {editing && <button type="button" className="btn" onClick={onCancel}>Cancel</button>}
      </div>
    </form>
  );
}
