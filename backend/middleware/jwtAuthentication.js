import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/user.js";

// Load environment variables from .env file
dotenv.config();

const jwtAuth = async (req, res) => {
  const { token } = req.body;

  if (!token) {
    console.log("Token not provided");
    return res.json({ status: false });
  }

  console.log("Authenticating...");

  jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {
    if (err) {
      console.log("Token verification failed");
      return res.json({ status: false });
    } else {
      try {
        const user = await User.findById(data.id);
        if (user) {
          return res.json({ status: true, user: user.username });
        } else {
          return res.json({ status: false });
        }
      } catch (error) {
        console.error("Error fetching user:", error);
        return res.json({ status: false });
      }
    }
  });
};

export { jwtAuth };
