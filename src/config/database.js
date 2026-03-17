const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

async function connectDatabase() {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
}

module.exports = connectDatabase;