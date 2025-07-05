const express = require("express");
const multer = require("multer");
const {
  uploadByLink,
  uploadFiles,
} = require("../controllers/uploadController");

const router = express.Router();
const photosMiddleware = multer({ dest: "uploads/" });

router.post("/by-link", uploadByLink);
router.post("/", photosMiddleware.array("photos", 100), uploadFiles);

module.exports = router;
