import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const createBid = async (req, res) => {
  await Bid.create({
    ...req.body,
    freelancerId: req.user.id
  });
  res.json({ message: "Bid submitted" });
};

export const getBidsByGig = async (req, res) => {
  const bids = await Bid.find({ gigId: req.params.gigId });
  res.json(bids);
};

export const hireBid = async (req, res) => {
  try {
    const { bidId } = req.params;

    // 1️⃣ Find bid
    const bid = await Bid.findById(bidId);
    if (!bid) {
      return res.status(404).json({ error: "Bid not found" });
    }

    // 2️⃣ Find gig (check owner + open status)
    const gig = await Gig.findOne({
      _id: bid.gigId,
      ownerId: req.user.id,
      status: "open"
    });

    if (!gig) {
      return res.status(400).json({
        error: "Gig already assigned or unauthorized"
      });
    }

    // 3️⃣ Hire selected bid
    await Bid.findByIdAndUpdate(bid._id, { status: "hired" });

    // 4️⃣ Reject all other bids
    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" }
    );

    // 5️⃣ Mark gig as assigned
    await Gig.findByIdAndUpdate(gig._id, { status: "assigned" });

    res.json({ message: "Hired successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
