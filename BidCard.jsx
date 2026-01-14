export default function BidCard({ bid, isOwner, onHire }) {
  return (
    <div className="card border-l-4 border-blue-500">
      <div className="flex justify-between items-center">
        <div>
          <p className="font-semibold">Bid Message</p>
          <p className="text-gray-600">{bid.message}</p>
          <p className="text-green-600 font-bold mt-1">₹{bid.price}</p>

          <span
            className={`inline-block mt-2 px-3 py-1 text-sm rounded-full
            ${
              bid.status === "pending"
                ? "bg-yellow-100 text-yellow-700"
                : bid.status === "hired"
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {bid.status}
          </span>
        </div>

        {isOwner && bid.status === "pending" && (
          <button
            className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800"
            onClick={() => onHire(bid._id)}
          >
            Hire
          </button>
        )}
      </div>
    </div>
  );
}
