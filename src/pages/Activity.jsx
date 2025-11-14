export default function Activity() {
  const upcoming = [
    { id: 1, title: "Yoga", time: "Tomorrow 10:00" },
    { id: 2, title: "HIIT", time: "Sunday 18:00" },
  ];

  const announcements = [
    { id: 1, text: "New gym opening in Kalamaria!" },
    { id: 2, text: "Black Friday: 20% off all packages" },
  ];

  return (
    <div className="container">
      <h1>My Activity</h1>

      <h2>Upcoming Sessions</h2>
      <ul>
        {upcoming.map((u) => (
          <li key={u.id}>{u.title} — {u.time}</li>
        ))}
      </ul>

      <h2>Announcements</h2>
      <ul>
        {announcements.map((a) => (
          <li key={a.id}>{a.text}</li>
        ))}
      </ul>
    </div>
  );
}
