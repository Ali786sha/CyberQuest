// const mongoose = require("mongoose");

// const scoreSchema = new mongoose.Schema({
//   userId: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "User"
//   },
//    username: {
//     type: String,
//     required: true
//   },

//   email: String,

//   password: String,

//   avatar: {
//     type: String,
//     default: "👤"
//   },

//   points: Number,
//   level: Number,

//   createdAt: {
//     type: Date,
//     default: Date.now
//   }
// });

// module.exports = mongoose.model("Score", scoreSchema);

const mongoose = require("mongoose");

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },

  username: {
    type: String,
    required: true
  },

  avatar: {
    type: String,
    default: "https://api.dicebear.com/7.x/identicon/svg?seed=player"
  },

  points: {
    type: Number,
    default: 0
  },

  level: {
    type: Number,
    default: 1
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Score", scoreSchema);