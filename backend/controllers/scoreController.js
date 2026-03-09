// const Score = require("../models/Score");
// const User = require("../models/User");

// exports.createScore = async (req, res) => {
//   try {
//     const score = await Score.create(req.body);
//     res.status(201).json(score);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// exports.getUserScores = async (req, res) => {
//   try {
//     const scores = await Score.find({
//       userId: req.params.userId
//     });
//     res.status(200).json(scores);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };

// const Score = require("../models/Score");

// // CREATE SCORE
// const createScore = async (req, res) => {
//   try {
//     const { userId, score } = req.body;

//     const newScore = new Score({
//       userId,
//       score
//     });

//     await newScore.save();

//     res.status(201).json(newScore);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // GET USER SCORES
// const getUserScores = async (req, res) => {
//   try {

//     const scores = await Score.find({
//       userId: req.params.userId
//     });

//     res.json(scores);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// // LEADERBOARD
// const getLeaderboard = async (req, res) => {
//   try {

//     const leaderboard = await Score.aggregate([
//       {
//         $group: {
//           _id: "$userId",
//           totalPoints: { $sum: "$score" }
//         }
//       },
//       { $sort: { totalPoints: -1 } },
//       { $limit: 10 }
//     ]);

//     res.json(leaderboard);

//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };


// module.exports = {
//   createScore,
//   getUserScores,
//   getLeaderboard
// };


const Score = require("../models/Score");
const User = require("../models/User");

// SAVE GAME SCORE
const createScore = async (req, res) => {
  try {

    const {  userId, username, avatar, points, level } = req.body;

    const newScore = new Score({
       userId,
      username,
      avatar,
      points,
      level
    });

    await newScore.save();

    res.status(201).json(newScore);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// USER SCORES
const getUserScores = async (req, res) => {
  try {

    const scores = await Score.find({
      userId: req.params.userId
    });

    res.json(scores);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// GLOBAL LEADERBOARD
const getLeaderboard = async (req, res) => {
  try {

    const leaderboard = await Score.aggregate([
      {
        $group: {
          _id: "$userId",
          totalPoints: { $sum: "$points" },
          maxLevel: { $max: "$level" }
        }
      },
      {
        $sort: { totalPoints: -1 }
      },
      {
        $limit: 20
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      {
        $unwind: "$user"
      }
    ]);

    // const ranked = leaderboard.map((player, index) => ({
    //   rank: index + 1,
    //   // name: player.user.username,
    //   name: player.user?.username || player.user?.name || "Unknown"
    //   avatar: player.user.avatar || "👤",
    //   points: player.totalPoints,
    //   level: player.maxLevel
    // }));
    const ranked = leaderboard.map((player, index) => ({
  rank: index + 1,
  name: player.user?.username || player.user?.name || "Unknown",
  avatar: player.user?.avatar || "👤",
  points: player.totalPoints,
  level: player.maxLevel
}));

    res.json(ranked);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// WEEKLY LEADERBOARD
const getWeeklyLeaderboard = async (req, res) => {
  try {

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const leaderboard = await Score.aggregate([
      {
        $match: {
          createdAt: { $gte: oneWeekAgo }
        }
      },
      {
        $group: {
          _id: "$userId",
          totalPoints: { $sum: "$points" }
        }
      },
      { $sort: { totalPoints: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },
      { $unwind: "$user" }
    ]);
    // console.log("Leaderboard RAW:", leaderboard);

    const ranked = leaderboard.map((player, index) => ({
  rank: index + 1,
  name: player.user?.username || player.user?.name || "Unknown",
  avatar: player.user?.avatar || "👤",
  points: player.totalPoints,
  level: player.maxLevel
}));
    res.json(ranked);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  createScore,
  getUserScores,
  getLeaderboard,
  getWeeklyLeaderboard
};