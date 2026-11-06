import { ICONS, COLORS } from "../constants";

export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="empty">
        <div className="empty-icon">🗒️</div>
        <p>No expenses found.</p>
      </div>
    );
  }

  return (
    <ul className="list">
      {expenses.map((e) => (
        <li key={e._id} className="item">
          <div className="badge" style={{ background: COLORS[e.category] + "22" }}>
            {ICONS[e.category]}
          </div>
          <div className="item-main">
            <strong>{e.title}</strong>
            <small className="muted">
              <span className="tag" style={{ color: COLORS[e.category], background: COLORS[e.category] + "1f" }}>
                {e.category}
              </span>{" "}
              {new Date(e.date).toLocaleDateString()} {e.note && `· ${e.note}`}
            </small>
          </div>
          <div className="item-side">
            <span className="amount">₹{e.amount.toFixed(2)}</span>
            <button className="btn small" onClick={() => onEdit(e)} aria-label="Edit">✏️</button>
            <button className="btn small danger" onClick={() => onDelete(e._id)} aria-label="Delete">🗑️</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
