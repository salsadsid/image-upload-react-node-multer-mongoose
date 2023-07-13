const mongoose = require('mongoose');

const userSchema= mongoose.Schema({
    name:String,
    email:String,
    img:
    {
        data: Buffer,
        contentType: String
    }
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;