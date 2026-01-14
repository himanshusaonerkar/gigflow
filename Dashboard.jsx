import { useEffect, useState } from "react";
import api from "../services/api";

export default function Dashboard() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    api.get("/api/gigs").then(res => setGigs(res.data));
  }, []);

  return (
    <div className="page-container">
      <h1>Dashboard</h1>

      <div className="dashboard-section">
        <h2 className="mb-2">My Posted Gigs</h2>

        {gigs.length === 0 && (
          <p className="text-gray-500">You haven’t posted any gigs yet.</p>
        )}

        {gigs.map(gig => (
          <div key={gig._id} className="card">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold">{gig.title}</h3>
                <p className="text-gray-600">{gig.description}</p>
              </div>

              <span
                className={`px-3 py-1 rounded-full text-sm font-semibold
                ${
                  gig.status === "open"
                    ? "bg-blue-100 text-blue-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {gig.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
