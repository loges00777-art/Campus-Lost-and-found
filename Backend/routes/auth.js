// routes/auth.js
import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import admin from "firebase-admin";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

dotenv.config();

const router = express.Router();

// ======================== Firebase Admin Initialization ========================
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
    }),
  });
}

// ======================== REGISTER ROUTE ========================
router.post("/register", async (req, res) => {
  try {
    const {
      email,
      password,
      firstName,
      lastName,
      phone,
      campusId,
      department,
      year,
      userType,
    } = req.body;

    // 1️⃣ Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists." });
    }

    // 2️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3️⃣ Prepare Firebase user data
    const firebaseUserData = {
      email,
      password,
      displayName: `${firstName} ${lastName}`,
    };
    if (phone && /^\+\d{10,15}$/.test(phone)) {
      firebaseUserData.phoneNumber = phone;
    }

    // 4️⃣ Create user in Firebase
    const firebaseUser = await admin.auth().createUser(firebaseUserData);
    console.log("Firebase user created with UID:", firebaseUser.uid);

    // 5️⃣ Save user to MongoDB
    const newUser = new User({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      phone,
      campusId,
      department,
      year,
      userType,
      firebaseUid: firebaseUser.uid,
    });

    await newUser.save();

    // 6️⃣ Send welcome email
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    const mailOptions = {
      from: `"Campus Lost and Found" <${process.env.SMTP_USER}>`,
      to: email,
      subject: "🎉 Welcome to Campus Lost and Found!",
      html: `
      <div style="font-family: 'Arial', sans-serif; background-color: #f4f6f8; padding: 40px;">
        <div style="max-width: 600px; margin: auto; background-color: #ffffff; border-radius: 10px; overflow: hidden; box-shadow: 0 0 15px rgba(0,0,0,0.1);">

          <!-- Header -->
          <div style="background-color: #2E8B57; padding: 30px; text-align: center; color: #ffffff;">
            <h1 style="margin: 0; font-size: 28px;">Welcome, ${firstName}!</h1>
          </div>

          <!-- Body -->
          <div style="padding: 30px; color: #333333; line-height: 1.6;">
            <p>Hi ${firstName},</p>
            <p>Welcome to <strong>Campus Lost and Found</strong>! Your account has been successfully created. You can now access all the platform features.</p>
            <div style="text-align: center; margin: 30px 0;">
              <a href="http://your-platform-login-url.com" target="_blank" style="background-color: #2E8B57; color: #ffffff; padding: 12px 25px; border-radius: 6px; text-decoration: none; font-weight: bold;">Go to Dashboard</a>
            </div>
            <p>We're excited to have you join us!</p>
            <p>Warm regards,<br><strong>Campus Lost and Found Team</strong></p>
          </div>

          <!-- Footer -->
          <div style="background-color: #f4f6f8; padding: 20px; text-align: center; color: #888888; font-size: 12px;">
            <p>If you did not sign up for this account, please ignore this email.</p>
            <p>&copy; ${new Date().getFullYear()} Campus Lost and Found. All rights reserved.</p>
          </div>

        </div>
      </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    // 7️⃣ Respond to client
    res.status(201).json({
      message:
        "Registration successful, Firebase user created, and email sent!",
      userId: newUser._id,
      firebaseUid: firebaseUser.uid,
    });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ msg: error.message || "Registration failed." });
  }
});

// ======================== LOGIN ROUTE ========================
router.post("/login", async (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({
      success: false,
      msg: "Login failed. Missing token. Please try again.",
    });
  }

  try {
    // 1️⃣ Verify Firebase ID Token
    const decodedToken = await admin.auth().verifyIdToken(idToken);
    const { uid, email } = decodedToken;

    // 2️⃣ Find user in MongoDB
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        success: false,
        msg: "No account found for this email. Please sign up first.",
      });
    }

    // 3️⃣ Success response
    return res.status(200).json({
      success: true,
      msg: "Login successful.",
      firebaseUid: uid,
      user: {
        id: user._id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        userType: user.userType,
      },
    });
  } catch (error) {
    console.error("🔥 Firebase login error:", error);

    let msg = "Login failed. Please try again.";

    if (
      error.code === "auth/id-token-expired" ||
      error.message?.includes("expired")
    ) {
      msg = "Session expired. Please sign in again.";
    } else if (error.code === "auth/argument-error") {
      msg = "Invalid login request.";
    }

    return res.status(401).json({
      success: false,
      msg,
    });
  }
});

export default router;
