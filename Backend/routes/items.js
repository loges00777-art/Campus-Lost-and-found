import express from "express";
import parser from "../utils/multer.js";
import Item from "../models/Item.js";
import User from "../models/User.js"; // Assuming you have a User model
import nodemailer from "nodemailer";

const router = express.Router();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "Gmail", // or any email service
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS, // use App Password for Gmail
  },
});

router.post("/", parser.single("image"), async (req, res) => {
  try {
    const itemData = req.body;

    if (req.file) {
      itemData.image = req.file.path; // multer path
    }

    const newItem = new Item(itemData);
    const savedItem = await newItem.save();

    // ✅ Fetch all users' emails
    const users = await User.find({}, "email"); // get only emails
    const emailList = users.map((user) => user.email);

    // Email content
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: emailList, // all users
      subject: `New Item Added: ${savedItem.title} (${savedItem.status})`,
      html: `
        <h2>New Item Alert!</h2>
        <p><strong>Title:</strong> ${savedItem.title}</p>
        <p><strong>Description:</strong> ${savedItem.description}</p>
        <p><strong>Location:</strong> ${savedItem.location}</p>
        <p><strong>Date:</strong> ${new Date(savedItem.date).toDateString()}</p>
        <p><strong>Contact Email:</strong> ${savedItem.contactemail}</p>
        <p><strong>Contact Phone:</strong> ${savedItem.contactphone}</p>
        <p><strong>Category:</strong> ${savedItem.category}</p>
        <p><strong>Status:</strong> ${savedItem.status}</p>
        <p><img src="${savedItem.image}" alt="Item Image" width="200"/></p>
        <p>Added At: ${new Date(savedItem.createdAt).toLocaleString()}</p>
      `,
    };

    // Send email
    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.log("❌ Error sending email:", err);
      } else {
        console.log("✅ Email sent:", info.response);
      }
    });

    res.status(201).json(savedItem);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

// GET all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
