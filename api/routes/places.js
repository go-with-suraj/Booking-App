const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const Place = require("../models/Place");

const jwtSecret = process.env.SECRET; 

// Helper to extract user data from token
function getUserDataFromReq(req) {
  return new Promise((resolve, reject) => {
    jwt.verify(req.cookies.token, jwtSecret, {}, (err, userData) => {
      if (err) reject(err);
      else resolve(userData);
    });
  });
}

// Get places owned by the logged-in user
router.get("/user-places", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const places = await Place.find({ owner: userData.id });
    res.json(places);
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Get all places (public)
router.get("/", async (req, res) => {
  const places = await Place.find();
  res.json(places);
});

// Get place by id (public)
router.get("/:id", async (req, res) => {
  const place = await Place.findById(req.params.id);
  res.json(place);
});

// Create new place (authenticated)
router.post("/", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const placeData = req.body;
    const placeDoc = await Place.create({
      owner: userData.id,
      ...placeData,
    });
    res.json(placeDoc);
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

// Update place (authenticated & owner only)
router.put("/", async (req, res) => {
  try {
    const userData = await getUserDataFromReq(req);
    const { id, ...placeData } = req.body;
    const placeDoc = await Place.findById(id);

    if (!placeDoc) return res.status(404).json({ error: "Place not found" });

    if (placeDoc.owner.toString() !== userData.id) {
      return res.status(403).json({ error: "Forbidden" });
    }

    Object.assign(placeDoc, placeData);
    await placeDoc.save();
    res.json("ok");
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
});

module.exports = router;
