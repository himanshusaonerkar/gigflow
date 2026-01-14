// Navbar.jsx
import { Link } from "react-router-dom";
export default () => (
  <nav className="p-4 bg-white shadow flex justify-between">
    <Link to="/">GigFlow</Link>
    <div>
      <Link className="mr-3" to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </div>
  </nav>
);
