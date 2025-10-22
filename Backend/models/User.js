import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firebaseUid: { type: String, required: false, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  phone: { type: String },
  campusId: { type: String, unique: true, sparse: true },
  department: { type: String },
  year: { type: String },
  userType: { type: String, default: "student" },
  registrationDate: { type: Date, default: Date.now },
});

export default mongoose.model("User", userSchema);
