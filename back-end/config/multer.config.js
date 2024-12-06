// import multer from 'multer';
// import { v2 as cloudinaryV2 } from 'cloudinary';
// import { CloudinaryStorage } from 'multer-storage-cloudinary';

// // coudinary image store setup

// console.log("cloud name", process.env.CLOUDINARY_NAME)
// console.log("api key", process.env.CLOUDINARY_API_KEY)
// console.log("api secret", process.env.CLOUDINARY_SECRET_KEY)

// cloudinaryV2.config({
//   cloud_name: process.env.CLOUDINARY_NAME, // Your Cloudinary Cloud Name
//   api_key: process.env.CLOUDINARY_API_KEY,       // Your Cloudinary API Key
//   api_secret: process.env.CLOUDINARY_SECRET_KEY, // Your Cloudinary API Secret
// });

// //  image storage setup

// const storage = new CloudinaryStorage({
//   cloudinary: cloudinaryV2,
//   params: async (req, file) => {
//     return {
//       folder: 'uploads',  // Specify the folder in Cloudinary
//       format: file.mimetype.split('/')[1], // Use the file's original extension
//       public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}` // Generate a unique filename
//     };
//   },
// });

// const upload = multer({ storage });

// export default upload;


import multer from 'multer';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Cloudinary Configuration
cloudinaryV2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET_KEY ,
});

// Image Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinaryV2,
  params: async (req, file) => {
    const extension = file.mimetype?.split('/')[1] || 'jpg'; // Handle missing mimetype
    return {
      folder: 'uploads',
      format: extension,
      public_id: `${Date.now()}-${Math.round(Math.random() * 1e9)}`, // Unique filename
    };
  },
});

const upload = multer({ storage });

export default upload;
