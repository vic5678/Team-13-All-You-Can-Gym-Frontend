// UI-ONLY VERSION (no backend calls)

export default function Packages() {
  // Mock data instead of API call
  const items = [
    {
      id: "premium-monthly",
      name: "Premium",
      price: 49.99,
      durationDays: 30,
      sessionLimit: 12,
    },
    {
      id: "basic-monthly",
      name: "Basic",
      price: 29.99,
      durationDays: 30,
      sessionLimit: 4,
    },
  ];

  return (
    <div className="container">
      <h1>Subscription Packages</h1>
      <div className="grid">
        {items.map((p) => (
          <article className="card" key={p.id}>
            <h2>{p.name}</h2>
            <p>
              <strong>€{p.price}</strong>
            </p>
            <p>
              <small>
                {p.durationDays} days • {p.sessionLimit} sessions
              </small>
            </p>
            <button className="btn" onClick={() => alert("Pretend Buy")}>
              Buy
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
