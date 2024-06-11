import User from "../models/user.js";
import createSecretToken from "../utils/createToken.js";
import bcrypt from "bcryptjs";

const signup = async (req, res, next) => {
  const { username, email, password, role } = req.body;

  try {
    const isPresent = await User.findOne({ email });
    if (isPresent) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role,
    });

    const token = createSecretToken(user._id);

    res.status(201).json({
      token,
      message: "User signed up successfully",
      success: true,
      user,
    });
    next();
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).send("Server error");
  }
};

export default signup;
