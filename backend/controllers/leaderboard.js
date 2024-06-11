import Leaderboard from "../models/leaderboard.js";

const getleaderboard = async (req, res) => {
    try {
      const leaderboard = await Leaderboard.find().sort({ score: -1 }).limit(10);
      const formattedLeaderboard = leaderboard.map((user) => ({
        username: user.username,
        score: user.score,
        problemsSolved: user.problemsSolved,
      }));
      // console.log(formattedLeaderboard);
      res.json(formattedLeaderboard);
    } catch (err) {
      console.error("Error fetching leaderboard", err);
      res.status(500).json({ error: "Error fetching leaderboard" });
    }
  };

  export default getleaderboard;