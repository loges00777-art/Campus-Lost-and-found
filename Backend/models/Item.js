import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: Date, required: true },
  contactemail: { type: String },
  contactphone: { type: String },
  category: { type: String, required: true },
  status: { type: String, enum: ["found", "lost"], required: true }, // ✅ FIXED: changed from foundOrLost
  reporter: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  image: { type: String },
}, { timestamps: true });

export default mongoose.model("Item", ItemSchema);
