export default function Sessions() {
  const sessions = [
    { id: 1, title: "Yoga", trainer: "Maria", time: "10:00", spots: 5 },
    { id: 2, title: "Pilates", trainer: "Nikos", time: "12:00", spots: 2 },
    { id: 3, title: "HIIT", trainer: "Anna", time: "18:00", spots: 0 },
  ];

  return (
    <div className="container">
      <h1>Sessions</h1>
      <div className="grid">
        {sessions.map((s) => (
          <article className="card" key={s.id}>
            <h2>{s.title}</h2>
            <p>Trainer: {s.trainer}</p>
            <p>Time: {s.time}</p>
            <p>Spots left: {s.spots}</p>
            <button className="btn" onClick={() => alert("Pretend Book")}>
              Book
            </button>
          </article>
        ))}
      </div>
    </div>
  );
}
