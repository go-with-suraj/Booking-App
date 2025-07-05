const fs = require("fs");
const path = require("path");
const axios = require("axios");
const mime = require("mime-types");

exports.uploadByLink = async (req, res) => {
  const { link } = req.body;

  try {
    const response = await axios({
      method: "GET",
      url: link,
      responseType: "stream",
      headers: { "User-Agent": "Mozilla/5.0" },
    });

    const contentType = response.headers["content-type"];
    const extension = mime.extension(contentType);
    const allowedExtensions = [
      "jpg",
      "jpeg",
      "png",
      "webp",
      "gif",
      "svg",
      "tiff",
    ];

    if (!extension || !allowedExtensions.includes(extension)) {
      return res.status(400).json({ error: "Unsupported image type" });
    }

    const newName = "photo" + Date.now() + "." + extension;
    const filePath = path.join(__dirname, "../uploads", newName);
    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    writer.on("finish", () => res.json(newName));
    writer.on("error", () =>
      res.status(500).json({ error: "Failed to save image" })
    );
  } catch (error) {
    res.status(403).json({ error: "Could not download image" });
  }
};

exports.uploadFiles = (req, res) => {
  const uploadedFiles = [];
  for (let file of req.files) {
    const ext = path.extname(file.originalname);
    const newPath = file.path + ext;
    fs.renameSync(file.path, newPath);
    uploadedFiles.push(path.basename(newPath));
  }
  res.json(uploadedFiles);
};
