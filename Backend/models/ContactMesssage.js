import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  referenceId: {
    type: String,
    required: true,
    unique: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// 👇 Model name: "ContactMessage" → Collection: "contactmessages"
const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

export default ContactMessage;
