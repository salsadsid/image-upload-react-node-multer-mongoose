const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const User = require("./models/User");
const upload = require("./middleware/uploader");
const path = require("path");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("server is alive!");
});
app.get("/file", async (req, res) => {
  const allData = await User.find();
  res.json(allData);
});

app.post("/", upload.single("image"), async (req, res, next) => {
  const obj = {
    name: req.body.name,
    email: req.body.email,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "/uploads/" + req.file.filename)
      ),
      contentType: req.file?.mimetype,
    },
  };
  try {
    const result = await User.create(obj);
    res.status(200).json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.deleteOne({ _id: id });
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
	console.log(error)
  }
});
module.exports = app;
