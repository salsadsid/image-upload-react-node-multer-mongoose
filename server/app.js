const express = require('express');
const app = express()
const cors = require('cors');
const fs = require('fs');
const User = require('./models/User');
const upload = require('./middleware/uploader');
const path = require('path');
const bodyParser = require('body-parser');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors());

app.get("/", (req, res) => {
    res.send("server is alive!");
});
app.get('/file',async (req,res)=>{
	const allData = await User.find()
	res.json(allData)
  })
  
app.post('/', upload.single('image'), (req, res, next) => {
    console.log(req.body,req.file)
	const obj = {
		name: req.body.name,
		img: {
			data: fs.readFileSync(path.join(__dirname + '/uploads/' + req.file.filename)),
			contentType: 'image/png'
		}
	}
	User.create(obj)
	.then ((err, item) => {
		if (err) {
			console.log(err);
		}
		else {
			// item.save();
			res.redirect('/');
		}
	});
});
module.exports = app;