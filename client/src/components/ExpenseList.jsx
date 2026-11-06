export default function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) return <p className="muted">No expenses yet.</p>;

  return (
    <ul className="list">
      {expenses.map((e) => (
        <li key={e._id} className="item">
          <div className="item-main">
            <strong>{e.title}</strong>
            <span className="tag">{e.category}</span>
            <small className="muted">
              {new Date(e.date).toLocaleDateString()} {e.note && `· ${e.note}`}
            </small>
          </div>
          <div className="item-side">
            <span className="amount">₹{e.amount.toFixed(2)}</span>
            <button className="btn" onClick={() => onEdit(e)}>Edit</button>
            <button className="btn danger" onClick={() => onDelete(e._id)}>Delete</button>
          </div>
        </li>
      ))}
    </ul>
  );
}
