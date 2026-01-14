import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function CreateGig() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: "",
  });

  const navigate = useNavigate();

  const submitGig = async () => {
    await api.post("/api/gigs", form);
    navigate("/");
  };

  return (
    <div className="page-container">
      <h1>Create a Gig</h1>

      <input
        className="border p-2 w-full mb-2"
        placeholder="Title"
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />

      <textarea
        className="border p-2 w-full mb-2"
        placeholder="Description"
        onChange={(e) =>
          setForm({ ...form, description: e.target.value })
        }
      />

      <input
        type="number"
        className="border p-2 w-full mb-2"
        placeholder="Budget"
        onChange={(e) => setForm({ ...form, budget: e.target.value })}
      />

      <button
        className="bg-black text-white px-4 py-2 rounded"
        onClick={submitGig}
      >
        Post Gig
      </button>
    </div>
  );
}
