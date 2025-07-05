const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const path = require("path");
const placesRouter = require("./routes/places");

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  cors({
    credentials: true,
    origin: "http://localhost:5173",
  })
);

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/places", require("./routes/placeRoutes"));
app.use("/api/bookings", require("./routes/bookingRoutes"));
app.use("/api/uploads", require("./routes/uploadRoutes"));
app.use("/api/places", placesRouter);

// DB connect + Server start
// In your places router or index.js backend file


  
mongoose.connect(process.env.MONGO_URL).then(() => {
  app.listen(4000, () => console.log("Server running on port 4000"));
});
