import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,  // your cloudinary cloud name
  api_key: process.env.CLOUDINARY_API_KEY,        // your cloudinary api key
  api_secret: process.env.CLOUDINARY_API_SECRET_KEY,  // your cloudinary api secret
});

export default cloudinary;
