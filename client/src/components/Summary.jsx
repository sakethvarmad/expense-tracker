export default function Summary({ expenses }) {
  const total = expenses.reduce((sum, e) => sum + e.amount, 0);
  const byCategory = expenses.reduce((acc, e) => {
    acc[e.category] = (acc[e.category] || 0) + e.amount;
    return acc;
  }, {});

  return (
    <div>
      <h2>Summary</h2>
      <p className="total">₹{total.toFixed(2)}</p>
      <p className="muted">Total spent ({expenses.length} expenses)</p>
      {Object.entries(byCategory).map(([cat, amt]) => (
        <div key={cat} className="bar-row">
          <span>{cat}</span>
          <div className="bar"><div style={{ width: `${(amt / total) * 100}%` }} /></div>
          <span>₹{amt.toFixed(0)}</span>
        </div>
      ))}
    </div>
  );
}
