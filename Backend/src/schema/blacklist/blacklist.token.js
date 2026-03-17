const mongoose = require("mongoose");

const blacklistSchema = new mongoose.Schema({
  token: {
    type: String,
    required: [true, " token to be blacklist"],
  },
}, {
  timestamps: true,
});

const blacklistTokenModel = mongoose.model("blacklistToken", blacklistSchema);

module.exports = blacklistTokenModel;
