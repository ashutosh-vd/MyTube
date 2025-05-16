import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    coverImage: {
      type: String,
      default: "",
    },
    fullname: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
    },
    watchHistory: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    likedVideos: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      },
    ],
    dislikedVideos: [
      {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video",
      },
    ],
    },
    {
      timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);

export default User;
