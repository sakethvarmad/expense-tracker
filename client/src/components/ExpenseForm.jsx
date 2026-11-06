import { useEffect, useState } from "react";
import { CATEGORIES, CATEGORY_NAMES } from "../categories";

const today = () => new Date().toISOString().slice(0, 10);
const empty = { title: "", amount: "", category: "Food", date: today(), note: "" };

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
      setForm({ ...empty, date: today() });
    }
  }, [editing]);

  const change = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  function submit(e) {
    e.preventDefault();
    onSubmit({ ...form, amount: Number(form.amount) });
    if (!editing) setForm({ ...empty, date: today() });
  }

  return (
    <form onSubmit={submit} className="form">
      <label>
        Title
        <input name="title" placeholder="e.g. Lunch" value={form.title} onChange={change} required />
      </label>
      <div className="row">
        <label>
          Amount (₹)
          <input name="amount" type="number" step="0.01" min="0.01" placeholder="0.00" value={form.amount} onChange={change} required />
        </label>
        <label>
          Date
          <input name="date" type="date" value={form.date} onChange={change} required />
        </label>
      </div>
      <label>
        Category
        <select name="category" value={form.category} onChange={change}>
          {CATEGORY_NAMES.map((c) => (
            <option key={c} value={c}>
              {CATEGORIES[c].emoji} {c}
            </option>
          ))}
        </select>
      </label>
      <label>
        Note
        <input name="note" placeholder="Optional" value={form.note} onChange={change} />
      </label>
      <div className="btn-row">
        <button type="submit" className="btn primary">{editing ? "Update expense" : "Add expense"}</button>
        {editing && (
          <button type="button" className="btn" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
