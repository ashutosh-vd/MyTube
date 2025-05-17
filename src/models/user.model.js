import mongoose from "mongoose";
import bcrypt from 'bcrypt'


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

userSchema.pre('save', async function(next) {
  if(this.isModified('password')) {
    try {
    this.password = await bcrypt.hash(this.password, 10);
    return next();
    }
    catch(err) {
      return next(err);
    }
  }
  else {
    return next(err);
  }
})

userSchema.methods.isPasswordCorrect = async function(givenpassword) {
  return await bcrypt.compare(givenpassword, this.password);
}

const User = mongoose.model("User", userSchema);

export default User;
