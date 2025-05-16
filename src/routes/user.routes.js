import { Router } from "express";
import upload from "../middlewares/multer.middleware.js";
import { registerUser } from "../controllers/user.controller.js";

const router = Router();

const uf = [
	{
		name: 'avatar',
		maxCount: 1,
	},
	{
		name: 'coverImage',
		maxCount: 1,
	}
];
router.post('/register', upload.fields(uf), registerUser)


export default router;