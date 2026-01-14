import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import BidCard from "../components/BidCard";
import { useSelector } from "react-redux";

export default function GigDetails() {
  const { id } = useParams(); // gigId from route
  const user = useSelector((state) => state.auth.user);

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Bid form state
  const [message, setMessage] = useState("");
  const [price, setPrice] = useState("");

  const isOwner = user && gig && user.id === gig.ownerId;

  // Fetch gig + bids
  useEffect(() => {
    const fetchData = async () => {
      try {
        const gigRes = await api.get(`/api/gigs`);
        const selectedGig = gigRes.data.find((g) => g._id === id);
        setGig(selectedGig);

        const bidRes = await api.get(`/api/bids/${id}`);
        setBids(bidRes.data);
      } catch (err) {
        setError("Failed to load gig details");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Submit bid (Freelancer)
  const submitBid = async () => {
    if (!message || !price) return;

    try {
      await api.post("/api/bids", {
        gigId: id,
        message,
        price,
      });

      setMessage("");
      setPrice("");

      const res = await api.get(`/api/bids/${id}`);
      setBids(res.data);
    } catch {
      setError("Failed to submit bid");
    }
  };

  // Hire freelancer (Client)
  const hireFreelancer = async (bidId) => {
    try {
      await api.patch(`/api/bids/${bidId}/hire`);
      const res = await api.get(`/api/bids/${id}`);
      setBids(res.data);
    } catch {
      setError("Hiring failed");
    }
  };

  if (loading) return <Loader text="Loading gig..." />;
  if (error) return <ErrorMessage message={error} />;
  if (!gig) return <ErrorMessage message="Gig not found" />;

  return (
    <div className="page-container">
      {/* Gig Info */}
      <div className="card mb-6">
        <h1>{gig.title}</h1>
        <p className="text-gray-700">{gig.description}</p>
        <p className="text-green-600 font-bold mt-2">₹{gig.budget}</p>

        <span
          className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold
          ${
            gig.status === "open"
              ? "bg-blue-100 text-blue-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {gig.status}
        </span>
      </div>

      {/* Bid Form (Only if NOT owner & gig open) */}
      {!isOwner && gig.status === "open" && (
        <div className="card mb-6">
          <h2 className="mb-2">Submit a Bid</h2>

          <textarea
            className="border p-2 w-full mb-2"
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />

          <input
            type="number"
            className="border p-2 w-full mb-2"
            placeholder="Bid amount"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <button
            className="bg-black text-white px-4 py-2 rounded"
            onClick={submitBid}
          >
            Submit Bid
          </button>
        </div>
      )}

      {/* Bids Section */}
      <div>
        <h2 className="mb-3">Bids</h2>

        {bids.length === 0 && (
          <p className="text-gray-500">No bids yet.</p>
        )}

        {bids.map((bid) => (
          <BidCard
            key={bid._id}
            bid={bid}
            isOwner={isOwner}
            onHire={hireFreelancer}
          />
        ))}
      </div>
    </div>
  );
}
