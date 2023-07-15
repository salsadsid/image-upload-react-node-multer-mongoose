const express = require("express");
const app = express();
const cors = require("cors");
const fs = require("fs");
const User = require("./models/User");
const upload = require("./middleware/uploader");
const path = require("path");
const bodyParser = require("body-parser");
const uploader2 = require("./middleware/uploader2");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// app.post('/api/images', uploader2.single('image'), (req, res) => {
//   // 4
//   const imageName = req.file.filename
//   const description = req.body.description

//   // Save this data to a database probably

//   console.log(description, imageName)
//   res.send({description, imageName})
// })

app.get("/file", async (req, res) => {
  const allData = await User.find();
  res.json(allData);
});

app.get("/", (req, res) => {
  res.send("server is alive!");
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
      filename: req.file?.filename,
      path: req.file?.path,
      size: req.file?.size,
      destination: req.file?.destination,
    },
  };
  try {
    const result = await User.create(obj);
    res.status(200).json({
      success: true,
      data: result,
    });
    // const directory =
    //   __dirname + "/uploads/"
    // fs.readdir(directory, (err, files) => {
    //   if (err) throw err;

    //   for (const file of files) {
    //     fs.unlink(path.join(directory, file), (err) => {
    //       if (err) throw err;
    //     });
    //   }
    // });
  } catch (error) {
    console.log(error);
  }
});

// app.get('/images/:imageName', (req, res) => {
//   // do a bunch of if statements to make sure the user is
//   // authorized to view this image, then

//   const imageName = req.params.imageName
//   const readStream = fs.createReadStream(`images/${imageName}`)
//   readStream.pipe(res)
// })

// app.get("/:id", async (req, res) => {
//   const id =  req.params.id;
//   const result = await User.findOne({_id:id})
//   const{ path } =result.img;
//   console.log(`./uploads/image-1689259156177.webp`);
//   res.sendFile(`F:/projects/image-upload-react-node-multer-mongoose/server/uploads/image-1689274423964.png`)
// });

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const result = await User.deleteOne({ _id: id });
    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.log(error);
  }
});
module.exports = app;
