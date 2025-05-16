import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import uploadOnCloudinary from '../utils/cloudinary.js';
import User from '../models/user.model.js';

import debug from 'debug';
const log = debug('development:register');

const registerUser = async (req, res) => {
	//take and validate fields
	//if user exists -> fail
	//check for avatar, cI -> upload to cloudinary
	//crypt password ans -> doing it in database 
	try {
		const {username, fullname, email, password} = req.body;
		if(!username || !fullname || !email || !password) {
			return res.status(400).send('required fields cannot be empty');
		}
		let avatarURI = '',
			coverImageURI = '';
		const existingUser = await User.findOne({email});
		if(existingUser) {
			return res.status(400).send('user exists');
		}
		// log(req.files);
		if(req.files.avatar && req.files['avatar'].length > 0) {
			try{
				avatarURI = await uploadOnCloudinary(req.files['avatar'][0], username+'avatar');
			}
			catch (err) {
				return console.log('avatar upload error', err);
			}
		}
		if(req.files.coverImage && req.files['coverImage'].length > 0) {
			try {
				coverImageURI = await uploadOnCloudinary(req.files['coverImage'][0], username+'cI');
			}
			catch (err) {
				return log('coverImage upload error', err);
			}
		}
		log(avatarURI, coverImageURI);
		let user = await User.create({
			email: email,
			fullname: fullname.trim(),
			password: password,
			username: username.trim(),
			avatar: avatarURI,
			coverImage: coverImageURI,
		});
		if(!user) {
			return res.status(400).send('error while creating user');
		}
		return res.json(user);
	} catch (error) {
		console.log(error);
		res.status(400).json({'registerUser_error' : error});
	}
}

export {registerUser};