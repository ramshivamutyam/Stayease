import {v2 as cloudinary} from 'cloudinary';

cloudinary.config({ 
  cloud_name: 'dhrdsr2bm', 
  api_key: '718399779498991', 
  api_secret: 'd3xSSve2K_e9zLu0Oudcux8kBbA' 
});

const uploadToCloudinary = async (path, folder = "my-profile") => {
    try {
      const data = await cloudinary.uploader.upload(path, { folder: folder });
      return { url: data.secure_url, publicId: data.public_id };
    } catch (err) {
      console.log(err);
      throw err;
    }
  };
  
  export default uploadToCloudinary