const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const jwtSecret = process.env.SECRET; 

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const userDoc = await User.create({
      name,
      email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)),
    });
    res.status(200).json(userDoc);
  } catch (error) {
    res.status(422).json(error);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const userDoc = await User.findOne({ email });
  if (!userDoc) return res.status(404).json("User not found");

  const passOk = bcrypt.compareSync(password, userDoc.password);
  if (!passOk) return res.status(401).json("Invalid credentials");

  jwt.sign(
    { email: userDoc.email, id: userDoc._id, name: userDoc.name },
    jwtSecret,
    { expiresIn: "1d" },
    (err, token) => {
      if (err) throw err;
      res.cookie("token", token).json(userDoc);
    }
  );
};

exports.profile = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.json(null);

  jwt.verify(token, jwtSecret, {}, async (err, user) => {
    if (err) throw err;
    const userDoc = await User.findById(user.id).select("-password");
    res.json(userDoc);
  });
};

exports.logout = async (req, res) => {
  res.cookie("token", "").json(true);
};
