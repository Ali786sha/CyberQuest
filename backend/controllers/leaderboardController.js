const Score = require("../models/Score");
const User = require("../models/User");

exports.getLeaderboard = async (req, res) => {
  try {

    const leaderboard = await Score.aggregate([
      {
        $group: {
          _id: "$userId",
          totalPoints: { $sum: "$points" },
          level: { $max: "$level" }
        }
      },
      {
        $sort: { totalPoints: -1 }
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
      },
      {
        $project: {
          username: "$user.username",
          avatar: "$user.avatar",
          points: "$totalPoints",
          level: 1
        }
      }
    ]);

    const ranked = leaderboard.map((player, index) => ({
      ...player,
      rank: index + 1
    }));

    res.json(ranked);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Leaderboard error" });
  }
};