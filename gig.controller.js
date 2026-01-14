import Gig from "../models/Gig.js";

export const getGigs = async (req, res) => {
  res.json(await Gig.find({ status: "open" }));
};

export const createGig = async (req, res) => {
  await Gig.create({ ...req.body, ownerId: req.user.id });
  res.json({ message: "Gig created" });
};
