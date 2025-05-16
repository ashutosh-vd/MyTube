import { v2 as cloudinary } from 'cloudinary'
import fs from 'fs';

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (imagePath, __id) => {

    if(!imagePath) 
        return null;
    imagePath = `./public/tmp/${imagePath.filename}`

    // Use the uploaded file's name as the asset's public ID and 
    // allow overwriting the asset with new versions
    const options = {
      use_filename: true,
      unique_filename: false,
      overwrite: true,
    };

    try {
      // Upload the image
      const result = await cloudinary.uploader.upload(imagePath, options);
      console.log(result.url);
      fs.unlinkSync(imagePath);
      return result.url;
    } catch (error) {
        console.error(error);
    }
};

export default uploadOnCloudinary