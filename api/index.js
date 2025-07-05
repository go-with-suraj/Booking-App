// const express = require("express");
// const cors = require("cors");
// const bcrypt = require("bcryptjs");
// const mongoose = require("mongoose");
// const cookieParser = require("cookie-parser");
// require("dotenv").config();
// const jwt = require("jsonwebtoken");
// const User = require("./models/User.js");
// const Place = require("./models/Place.js");
// const Booking = require("./models/Booking.js");
// const imageDownloader = require("image-downloader");
// const mime = require("mime-types");
// const multer = require("multer");

// const app = express();
// const fs = require("fs");
// const path = require("path");
// const axios = require("axios");

// const bcryptSalt = bcrypt.genSaltSync(10);
// const jwtSecret = "fffffff";
// app.use(express.json());
// app.use(cookieParser());
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));
// app.use(
//   cors({
//     credentials: true,
//     origin: "http://localhost:5173",
//   })
// );

// function getUserDataFromReq(req) {
//   return new Promise((resolve, reject) => {
//     jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) => {
//       if (err) throw err;
//       resolve(userData);
//     });
//   });
// }

// mongoose.connect(process.env.MONGO_URL);
// app.get("/test", (req, res) => {
//   res.json("test ok");
// });

// app.post("/register", async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const userDoc = await User.create({
//       name,
//       email,
//       password: bcrypt.hashSync(password, bcryptSalt),
//     });
//     res.status(200).json(userDoc);
//   } catch (error) {
//     res.status(422).json(error);
//   }
// });

// app.post("/login", async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const userDoc = await User.findOne({ email });
//     if (userDoc) {
//       const passOk = bcrypt.compareSync(password, userDoc.password);
//       if (passOk) {
//         jwt.sign(
//           { email: userDoc.email, id: userDoc._id, name: userDoc.name },
//           jwtSecret,
//           { expiresIn: "1d" },
//           (err, token) => {
//             if (err) throw err;
//             res.cookie("token", token).json(userDoc);
//           }
//         );
//       } else {
//         res.status(422).json("Invalid email or password");
//       }
//     } else {
//       res.json("not found");
//     }
//   } catch (error) {
//     res.status(422).json(error);
//   }
// });

// app.get("/profile", async (req, res) => {
//   const { token } = req.cookies;
//   if (token) {
//     jwt.verify(token, jwtSecret, {}, async (err, user) => {
//       if (err) throw err;
//       const userDoc = await User.findById(user.id).select("-password");
//       res.json(userDoc);
//     });
//   } else {
//     res.json(null);
//   }
// });

// app.post("/logout", async (req, res) => {
//   res.cookie("token", "").json(true);
// });

// app.post("/upload-by-link", async (req, res) => {
//   const { link } = req.body;

//   // await imageDownloader.image({
//   //   url: link,
//   //   dest: __dirname + '/uploads/' +newName
//   // })
//   // res.json(newName)

//   try {
//     const response = await axios({
//       method: "GET",
//       url: link,
//       responseType: "stream",
//       headers: {
//         "User-Agent": "Mozilla/5.0",
//       },
//     });

//     const contentType = response.headers["content-type"];
//     const extension = mime.extension(contentType);

//     console.log("Content-Type:", contentType);
//     console.log("Detected extension:", extension);

//     const allowedExtensions = [
//       "jpg",
//       "jpeg",
//       "png",
//       "webp",
//       "gif",
//       "svg",
//       "tiff",
//     ];

//     if (!extension || !allowedExtensions.includes(extension)) {
//       return res.status(400).json({ error: "Unsupported image type" });
//     }
//     const newName = "photo" + Date.now() + "." + extension;
//     const filePath = path.join(__dirname, "uploads", newName);

//     const writer = fs.createWriteStream(filePath);
//     response.data.pipe(writer);

//     writer.on("finish", () => {
//       res.json(newName);
//     });

//     writer.on("error", (err) => {
//       console.error("stream error:", err);
//       res.status(500).json({ error: "Failed to save image" });
//     });
//   } catch (error) {
//     console.error("Download failed:", error.message);
//     res.status(403).json({ error: "Could not download image" });
//   }
// });

// const photosMiddleware = multer({ dest: "uploads/" });
// app.post("/upload", photosMiddleware.array("photos", 100), (req, res) => {
//   const uploadedFiles = [];
//   for (let file of req.files) {
//     const ext = path.extname(file.originalname);
//     const newPath = file.path + ext;
//     fs.renameSync(file.path, newPath);
//     uploadedFiles.push(path.basename(newPath));
//   }
//   res.json(uploadedFiles);
// });

// app.post("/places", async (req, res) => {
//   const { token } = req.cookies;
//   const {
//     title,
//     address,
//     addedPhotos,
//     description,
//     perks,
//     extraInfo,
//     checkIn,
//     checkOut,
//     maxGuests,
//     price,
//   } = req.body;
//   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//     if (err) throw err;
//     const placeDoc = await Place.create({
//       owner: userData.id,
//       title,
//       address,
//       photos: addedPhotos,
//       description,
//       perks,
//       extraInfo,
//       checkIn,
//       checkOut,
//       maxGuests,
//       price,
//     });
//     res.json(placeDoc);
//   });
// });

// app.get("/user-places", (req, res) => {
//   const { token } = req.cookies;
//   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//     const { id } = userData;
//     res.json(await Place.find({ owner: id }));
//   });
// });

// app.get("/places/:id", async (req, res) => {
//   const { id } = req.params;
//   res.json(await Place.findById(id));
// });

// app.put("/places", async (req, res) => {
//   const { token } = req.cookies;
//   const {
//     id,
//     title,
//     address,
//     addedPhotos,
//     description,
//     perks,
//     extraInfo,
//     checkIn,
//     checkOut,
//     maxGuests,
//     price,
//   } = req.body;

//   jwt.verify(token, jwtSecret, {}, async (err, userData) => {
//     if (err) throw err;
//     const placeDoc = await Place.findById(id);

//     if (userData.id === placeDoc.owner.toString()) {
//       placeDoc.set({
//         title,
//         address,
//         photos: addedPhotos,
//         description,
//         perks,
//         extraInfo,
//         checkIn,
//         checkOut,
//         maxGuests,
//         price,
//       });
//       await placeDoc.save();
//       res.json("ok");
//     }
//   });
// });

// app.get("/places", async (req, res) => {
//   res.json(await Place.find());
// });

// app.post("/bookings", async (req, res) => {
//   const userData = await getUserDataFromReq(req);
//   const { place, checkIn, checkOut, numberOfGuests, name, phone, price } =
//     req.body;
//   const bookingDoc = await Booking.create({
//     place,
//     checkIn,
//     checkOut,
//     numberOfGuests,
//     name,
//     phone,
//     price,
//     user: userData.id,
//   });
//   res.json(bookingDoc);
// });

// app.get("/bookings", async (req, res) => {
//   const userData = await getUserDataFromReq(req);
//   res.json(await Booking.find({ user: userData.id }).populate("place"));
// });

// app.listen(4000, (req, res) => {
//   console.log("server is running on port 4000");
// });
