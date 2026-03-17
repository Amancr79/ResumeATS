const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username:{
    type: String,
    required: true,
    unique: true,
    },
    password:{
    type: String,
    required: true,
    minlength: [6,"password must be at least 6 characters long"]
    },
    email:{
        type: String,
        unique: true,
        reuquired: true,
    }
})

const userModel = mongoose.model("User", userSchema);
module.exports = userModel;