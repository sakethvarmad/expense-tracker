import { ICONS, COLORS } from "../constants";

export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);

  const now = new Date();
  const thisMonth = expenses
    .filter((e) => {
      const d = new Date(e.date);
      return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear();
    })
    .reduce((sum, e) => sum + e.amount, 0);

  const byCategory = Object.entries(
    expenses.reduce((acc, e) => {
      acc[e.category] = (acc[e.category] || 0) + e.amount;
      return acc;
    }, {})
  ).sort((a, b) => b[1] - a[1]);

  return (
    <div>
      <h2>📊 Summary</h2>
      <div className="stats">
        <div className="stat">
          <span className="muted">Total spent</span>
          <strong>₹{total.toFixed(2)}</strong>
        </div>
        <div className="stat">
          <span className="muted">This month</span>
          <strong>₹{thisMonth.toFixed(2)}</strong>
        </div>
        <div className="stat">
          <span className="muted">Entries</span>
          <strong>{expenses.length}</strong>
        </div>
      </div>

      {byCategory.length === 0 && <p className="muted">Add an expense to see your breakdown.</p>}
      {byCategory.map(([cat, amt]) => (
        <div key={cat} className="bar-row">
          <span>{ICONS[cat]} {cat}</span>
          <div className="bar">
            <div style={{ width: `${(amt / total) * 100}%`, background: COLORS[cat] }} />
          </div>
          <span>₹{amt.toFixed(0)}</span>
        </div>
      ))}
    </div>
  );
}
