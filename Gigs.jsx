import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

export default function Gigs() {
  const [gigs, setGigs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api
      .get("/api/gigs")
      .then((res) => setGigs(res.data))
      .catch(() => setError("Failed to load gigs"))
      .finally(() => setLoading(false));
  }, []);

  // ✅ RETURNS MUST BE INSIDE THE FUNCTION
  if (loading) return <Loader text="Loading gigs..." />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="page-container">
      <h1>Open Gigs</h1>

      {gigs.length === 0 && (
        <p className="text-gray-500">No gigs available.</p>
      )}

      {gigs.map((gig) => (
        <div key={gig._id} className="card">
          <h2>{gig.title}</h2>
          <p>{gig.description}</p>
          <p className="gig-budget">₹{gig.budget}</p>

          <Link
            to={`/gig/${gig._id}`}
            className="inline-block mt-2 text-blue-600 font-semibold"
          >
            View Details →
          </Link>
        </div>
      ))}
    </div>
  );
}
