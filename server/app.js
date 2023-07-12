const express = require('express');
const app = express()
const cors = require('cors');


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
    res.send("server is alive!");
});

module.exports = app;