import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "This field is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "This field is required"],
    minLength: [6, "Password can't be less than 6 characters"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
