import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    address: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;
