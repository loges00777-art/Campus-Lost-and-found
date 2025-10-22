import express from "express";
import admin from "../firebaseAdmin.js"; // Firebase Admin SDK
import User from "../models/User.js";
import bcrypt from "bcryptjs"; // for password hashing

const router = express.Router();

// ✅ Middleware to verify Firebase ID token
const verifyFirebaseToken = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Authorization token missing or invalid" });
  }

  const idToken = authHeader.split(" ")[1];
  try {
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    req.user = { uid: decodedToken.uid };
    next();
  } catch (err) {
    console.error("Firebase token error:", err);
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// ✅ GET user profile
router.get("/", verifyFirebaseToken, async (req, res) => {
  try {
    const user = await User.findOne({ firebaseUid: req.user.uid }).select("-password -firebaseUid");
    if (!user) return res.status(404).json({ error: "User not found" });
    return res.status(200).json(user);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

// ✅ UPDATE user profile
router.put("/", verifyFirebaseToken, async (req, res) => {
  try {
    const allowedUpdates = ["firstName", "lastName", "phone", "department", "year", "password"];
    const updates = {};

    for (let key of allowedUpdates) {
      if (req.body[key]) {
        updates[key] = req.body[key];
      }
    }

    // Hash password if it's being updated
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }

    const updatedUser = await User.findOneAndUpdate(
      { firebaseUid: req.user.uid },
      updates,
      { new: true, runValidators: true }
    ).select("-password -firebaseUid");

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    return res.status(200).json({
      message: "Profile updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "Server error" });
  }
});

export default router;
