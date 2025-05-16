import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
	{
		title: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: true,
		},
		thumbnail: {
			type: String,
			required: true,
		},
		videoUrl: {
			type: String,
			required: true,
		},
		isPublished: {
			type: Boolean,
			default: false,
		},
		duration: {
			type: Number,
			default: 0,
		},
		views: {
			type: Number,
			default: 0,
		},
		likes: {
			type: Number,
			default: 0,
		},
		dislikes: {
			type: Number,
			default: 0,
		},
		comments: {
			type: Number,
			default: 0,
		},
		owner: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
	},
	{timestamps: true}
);

const Video = mongoose.model("Video", videoSchema);

export default Video;	