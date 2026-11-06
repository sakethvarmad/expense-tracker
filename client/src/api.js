const BASE = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

async function request(path, options = {}) {
  const res = await fetch(BASE + path, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || "Request failed");
  }
  return res.status === 204 ? null : res.json();
}

export const getExpenses = () => request("/expenses");
export const createExpense = (data) => request("/expenses", { method: "POST", body: JSON.stringify(data) });
export const updateExpense = (id, data) => request(`/expenses/${id}`, { method: "PUT", body: JSON.stringify(data) });
export const deleteExpense = (id) => request(`/expenses/${id}`, { method: "DELETE" });
