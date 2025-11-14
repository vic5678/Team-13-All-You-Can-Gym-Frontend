import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function NavBar() {
  const { userId, logout } = useAuth();
  return (
    <nav>
      <strong>All You Can Gym</strong>
      {userId && (
        <>
          <Link to="/packages">Packages</Link>
          <Link to="/gyms">Gyms</Link>
          <Link to="/sessions">Sessions</Link>
          <Link to="/activity">My Activity</Link>
          <span style={{ marginLeft: "auto" }} />
          <small className="muted">User: {userId}</small>
          <button className="btn" onClick={logout}>Logout</button>
        </>
      )}
      {!userId && (
        <>
          <span style={{ marginLeft: "auto" }} />
          <Link to="/login">Login</Link>
        </>
      )}
    </nav>
  );
}
