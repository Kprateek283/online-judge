import problem from "../models/problem.js";

const getbydifficulty = async (req, res) => {
    const { difficulty } = req.query;
    if (!difficulty) {
      return res.status(400).json({ message: "Difficulty is required" });
    }
    try {
      const problems = await problem.find({ difficulty });
      res.json(problems);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

  export default getbydifficulty;