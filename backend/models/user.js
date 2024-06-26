import mongoose from "mongoose";
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: Number, default: 0 }, // 0 for regular user, 1 for admin
  problemsSolved :{type:[String]},
});


const User = mongoose.model("User", UserSchema);
export default User;
