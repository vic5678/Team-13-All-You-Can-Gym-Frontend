export default function Gyms() {
  const gyms = [
    { id: 1, name: "FitZone", location: "Athens", rating: 4.5 },
    { id: 2, name: "PowerHouse", location: "Thessaloniki", rating: 4.0 },
    { id: 3, name: "FlexStudio", location: "Patra", rating: 4.8 },
  ];

  return (
    <div className="container">
      <h1>Gyms</h1>
      <div className="grid">
        {gyms.map((g) => (
          <article className="card" key={g.id}>
            <h2>{g.name}</h2>
            <p>{g.location}</p>
            <p>⭐ {g.rating}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
