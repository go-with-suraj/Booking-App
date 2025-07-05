const express = require("express");
const {
  createPlace,
  getUserPlaces,
  getPlace,
  updatePlace,
  getAllPlaces,
} = require("../controllers/placeController");

const router = express.Router();

router.post("/", createPlace);
router.get("/user-places", getUserPlaces);
router.get("/:id", getPlace);
router.put("/", updatePlace);
router.get("/", getAllPlaces);

module.exports = router;
