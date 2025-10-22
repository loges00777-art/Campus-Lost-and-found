// multerCloudinary.js (or in your utils folder)
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "campus-lostfound",  // optional folder name in your Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const parser = multer({ storage });

export default parser;
