import express from "express";
import nodemailer from "nodemailer";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

// MongoDB connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ MongoDB connected successfully"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Contact Schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxlength: [100, "Name cannot exceed 100 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    lowercase: true,
    match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
  },
  phone: {
    type: String,
    trim: true,
    maxlength: [20, "Phone number cannot exceed 20 characters"],
  },
  subject: {
    type: String,
    required: [true, "Subject is required"],
    trim: true,
    maxlength: [200, "Subject cannot exceed 200 characters"],
  },
  message: {
    type: String,
    required: [true, "Message is required"],
    trim: true,
    maxlength: [5000, "Message cannot exceed 5000 characters"],
  },
  status: {
    type: String,
    enum: ["new", "read", "replied", "resolved"],
    default: "new",
  },
  referenceId: {
    type: String,
    unique: true,
    sparse: true,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Index for better query performance
contactSchema.index({ email: 1, createdAt: -1 });
contactSchema.index({ status: 1 });
contactSchema.index({ createdAt: -1 });
contactSchema.index({ referenceId: 1 });

// Pre-save middleware to generate referenceId
contactSchema.pre("save", function (next) {
  if (!this.referenceId) {
    this.referenceId =
      "CAMPUS-" +
      Date.now() +
      "-" +
      Math.random().toString(36).substr(2, 5).toUpperCase();
  }
  next();
});

const Contact = mongoose.model("Contact", contactSchema);

// Nodemailer transporter setup with better error handling
const createTransporter = () => {
  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    pool: true,
    maxConnections: 5,
    maxMessages: 100,
  });
};

let transporter;

try {
  transporter = createTransporter();

  // Verify transporter configuration
  transporter.verify((error) => {
    if (error) {
      console.error("❌ Email transporter configuration error:", error);
    } else {
      console.log("✅ Email transporter is ready to send messages");
    }
  });
} catch (error) {
  console.error("❌ Failed to create email transporter:", error);
}

// Beautiful HTML email templates
const createUserConfirmationEmail = (
  name,
  email,
  phone,
  subject,
  message,
  referenceId
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      margin: 0; 
      padding: 20px;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white; 
      border-radius: 20px; 
      overflow: hidden;
      box-shadow: 0 20px 40px rgba(0,0,0,0.1);
    }
    .header { 
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
      color: white; 
      padding: 40px 30px; 
      text-align: center;
    }
    .header h1 { 
      margin: 0; 
      font-size: 28px; 
      font-weight: 700;
    }
    .content { 
      padding: 40px 30px; 
    }
    .message-box { 
      background: #f8fafc; 
      border-left: 4px solid #667eea; 
      padding: 20px; 
      margin: 20px 0; 
      border-radius: 8px;
    }
    .details { 
      background: #f1f5f9; 
      padding: 20px; 
      border-radius: 12px; 
      margin: 25px 0;
    }
    .detail-item { 
      display: flex; 
      justify-content: space-between; 
      margin-bottom: 8px; 
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .detail-item:last-child { 
      border-bottom: none; 
    }
    .label { 
      font-weight: 600; 
      color: #475569;
    }
    .footer { 
      text-align: center; 
      padding: 30px; 
      background: #f8fafc; 
      color: #64748b;
      border-top: 1px solid #e2e8f0;
    }
    .logo { 
      font-size: 24px; 
      font-weight: bold; 
      color: #667eea; 
      margin-bottom: 10px;
    }
    .badge {
      display: inline-block;
      background: #10b981;
      color: white;
      padding: 8px 16px;
      border-radius: 20px;
      font-size: 14px;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .ticket-info {
      background: #dbeafe;
      padding: 15px;
      border-radius: 10px;
      margin: 20px 0;
      text-align: center;
      font-family: 'Courier New', monospace;
      font-weight: bold;
    }
    @media (max-width: 600px) {
      .container {
        border-radius: 10px;
      }
      .header {
        padding: 30px 20px;
      }
      .content {
        padding: 30px 20px;
      }
      .detail-item {
        flex-direction: column;
        gap: 5px;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🎉 Thank You for Contacting Campus Lost & Found!</h1>
      <p>We've received your message and will get back to you soon.</p>
    </div>
    
    <div class="content">
      <div class="badge">Message Received Successfully</div>
      
      <div class="ticket-info">
        <strong>Reference ID:</strong> ${referenceId}
      </div>

      <div class="details">
        <div class="detail-item">
          <span class="label">Name:</span>
          <span>${name}</span>
        </div>
        <div class="detail-item">
          <span class="label">Email:</span>
          <span>${email}</span>
        </div>
        <div class="detail-item">
          <span class="label">Phone:</span>
          <span>${phone || "Not provided"}</span>
        </div>
        <div class="detail-item">
          <span class="label">Subject:</span>
          <span><strong>${subject}</strong></span>
        </div>
      </div>

      <h3 style="color: #1e293b; margin-bottom: 15px;">Your Message:</h3>
      <div class="message-box">
        <p style="margin: 0; white-space: pre-line;">${message}</p>
      </div>

      <div style="background: #dbeafe; padding: 20px; border-radius: 12px; margin: 25px 0;">
        <h4 style="color: #1e40af; margin: 0 0 10px 0;">📅 What's Next?</h4>
        <p style="margin: 0; color: #374151;">
          Our campus team will review your message and get back to you within <strong>24 hours</strong> during business days.
        </p>
      </div>

      <div style="background: #f0fdf4; padding: 15px; border-radius: 10px; border-left: 4px solid #10b981;">
        <h4 style="color: #065f46; margin: 0 0 10px 0;">📍 Campus Lost & Found Office</h4>
        <p style="margin: 5px 0; color: #374151;">
          <strong>Location:</strong> Student Center, Room 101<br>
          <strong>Hours:</strong> Mon-Fri: 9:00 AM - 5:00 PM<br>
          <strong>Phone:</strong> +91 91508 04220
        </p>
      </div>
    </div>
    
    <div class="footer">
      <div class="logo">Campus Lost & Found</div>
      <p style="margin: 10px 0;">We're here to help reunite you with your lost items!</p>
      <p style="margin: 5px 0; font-size: 14px;">
        Phone: +91 91508 04220 | Email: ${process.env.SMTP_USER}
      </p>
    </div>
  </div>
</body>
</html>
`;

const createAdminNotificationEmail = (
  name,
  email,
  phone,
  subject,
  message,
  contactId,
  referenceId
) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { 
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; 
      line-height: 1.6; 
      color: #333; 
      background: #f8fafc;
      margin: 0; 
      padding: 20px;
    }
    .container { 
      max-width: 600px; 
      margin: 0 auto; 
      background: white; 
      border-radius: 16px; 
      overflow: hidden;
      box-shadow: 0 10px 25px rgba(0,0,0,0.1);
      border: 1px solid #e2e8f0;
    }
    .header { 
      background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); 
      color: white; 
      padding: 30px; 
      text-align: center;
    }
    .header h1 { 
      margin: 0; 
      font-size: 24px; 
      font-weight: 700;
    }
    .content { 
      padding: 30px; 
    }
    .alert-badge {
      background: #fee2e2;
      color: #dc2626;
      padding: 12px 20px;
      border-radius: 10px;
      font-weight: 600;
      margin-bottom: 20px;
      border-left: 4px solid #dc2626;
      text-align: center;
    }
    .user-details {
      background: #f8fafc;
      padding: 20px;
      border-radius: 12px;
      margin: 20px 0;
      border: 1px solid #e2e8f0;
    }
    .detail-row {
      display: flex;
      margin-bottom: 10px;
      padding: 8px 0;
    }
    .detail-label {
      font-weight: 600;
      color: #475569;
      min-width: 100px;
    }
    .message-box {
      background: #f1f5f9;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #3b82f6;
    }
    .action-buttons {
      text-align: center;
      margin: 30px 0 20px 0;
    }
    .btn {
      display: inline-block;
      padding: 12px 24px;
      background: #3b82f6;
      color: white;
      text-decoration: none;
      border-radius: 8px;
      font-weight: 600;
      margin: 5px;
      font-size: 14px;
      border: none;
      cursor: pointer;
    }
    .btn-secondary {
      background: #6b7280;
    }
    .btn-success {
      background: #10b981;
    }
    .footer {
      text-align: center;
      padding: 20px;
      background: #f8fafc;
      color: #64748b;
      font-size: 14px;
    }
    .ticket-id {
      background: #1e293b;
      color: white;
      padding: 10px 15px;
      border-radius: 8px;
      font-family: monospace;
      margin: 10px 0;
      text-align: center;
    }
    @media (max-width: 600px) {
      .container {
        border-radius: 10px;
      }
      .header {
        padding: 20px 15px;
      }
      .content {
        padding: 20px 15px;
      }
      .detail-row {
        flex-direction: column;
        gap: 5px;
      }
      .action-buttons {
        display: flex;
        flex-direction: column;
        gap: 10px;
      }
      .btn {
        margin: 0;
      }
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 New Campus Lost & Found Contact</h1>
      <p>You have received a new message from the website contact form</p>
    </div>
    
    <div class="content">
      <div class="alert-badge">
        ⚡ Immediate Attention Required - NEW CAMPUS MESSAGE
      </div>

      <div style="text-align: center; margin-bottom: 20px;">
        <div class="ticket-id">Database ID: ${contactId}</div>
        <div class="ticket-id">Reference: ${referenceId}</div>
      </div>

      <div class="user-details">
        <div class="detail-row">
          <span class="detail-label">From:</span>
          <span><strong>${name}</strong> (${email})</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Phone:</span>
          <span>${phone || "Not provided"}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Subject:</span>
          <span style="color: #dc2626; font-weight: 600;">${subject}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Time:</span>
          <span>${new Date().toLocaleString()}</span>
        </div>
      </div>

      <h3 style="color: #1e293b; margin-bottom: 15px;">Message Content:</h3>
      <div class="message-box">
        <p style="margin: 0; white-space: pre-line; line-height: 1.8;">${message}</p>
      </div>

      <div class="action-buttons">
        <a href="mailto:${email}?subject=Re: ${subject} (Ref: ${referenceId})" class="btn">📧 Reply to ${name}</a>
        ${
          phone
            ? `<a href="tel:${phone}" class="btn btn-success">📞 Call ${name}</a>`
            : ""
        }
        <button onclick="window.open('${
          process.env.ADMIN_DASHBOARD_URL || "#"
        }', '_blank')" class="btn btn-secondary">
          📊 View in Dashboard
        </button>
      </div>
    </div>
    
    <div class="footer">
      <p>This email was automatically generated from Campus Lost & Found contact form.</p>
      <p>© ${new Date().getFullYear()} Campus Lost & Found. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
`;

// POST /api/contact - Submit contact form

router.post("/", async (req, res) => {
  const { name, email, phone, subject, message } = req.body;

  console.log("📨 Received contact form submission:", { name, email, subject });

  // Validation
  if (!name || !email || !subject || !message) {
    return res.status(400).json({
      success: false,
      error: "Please fill in all required fields",
      details: {
        name: !name,
        email: !email,
        subject: !subject,
        message: !message,
      },
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      success: false,
      error: "Please provide a valid email address",
    });
  }

  // Validate message length
  if (message.length > 5000) {
    return res.status(400).json({
      success: false,
      error: "Message is too long. Maximum 5000 characters allowed.",
    });
  }

  try {
    // Create contact record in database
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      subject: subject.trim(),
      message: message.trim(),
    };

    const contact = new Contact(contactData);
    const savedContact = await contact.save();

    console.log(
      `✅ Contact saved to database. ID: ${savedContact._id}, Reference: ${savedContact.referenceId}`
    );

    let emailsSent = false;

    // Only send emails if transporter is configured
    if (transporter && process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        // Send confirmation email to the user
        const userMailOptions = {
          from: {
            name: "Campus Lost & Found",
            address: process.env.SMTP_USER,
          },
          to: email,
          subject: `✅ Thank you for contacting Campus Lost & Found, ${name}!`,
          html: createUserConfirmationEmail(
            name,
            email,
            phone,
            subject,
            message,
            savedContact.referenceId
          ),
        };

        // Send notification email to admin
        const adminMailOptions = {
          from: {
            name: "Campus Lost & Found Contact Form",
            address: process.env.SMTP_USER,
          },
          to: process.env.ADMIN_EMAIL || process.env.SMTP_USER,
          subject: `📧 New Campus Contact: ${subject} from ${name}`,
          html: createAdminNotificationEmail(
            name,
            email,
            phone,
            subject,
            message,
            savedContact._id,
            savedContact.referenceId
          ),
        };

        // Send both emails
        await Promise.all([
          transporter.sendMail(userMailOptions),
          transporter.sendMail(adminMailOptions),
        ]);

        emailsSent = true;
        console.log(
          `✅ Emails sent successfully for contact ID: ${savedContact._id}`
        );
      } catch (emailError) {
        console.error("❌ Email sending error:", emailError);
        // Continue even if email fails - the contact is still saved in database
      }
    } else {
      console.log(
        "ℹ️  Email transporter not configured, skipping email sending"
      );
    }

    res.status(200).json({
      success: true,
      message: emailsSent
        ? "Message sent successfully! We've emailed you a confirmation."
        : "Message received successfully! (Email confirmation skipped)",
      data: {
        contactId: savedContact._id,
        referenceId: savedContact.referenceId,
        name,
        email,
        subject,
        timestamp: savedContact.createdAt,
        emailsSent,
      },
    });
  } catch (err) {
    console.error("❌ Error processing contact form:", err);

    // Handle duplicate submissions or validation errors
    if (err.name === "ValidationError") {
      const errors = Object.values(err.errors).map((error) => error.message);
      return res.status(400).json({
        success: false,
        error: "Validation failed",
        details: errors,
      });
    }

    if (err.code === 11000) {
      return res.status(400).json({
        success: false,
        error:
          "Duplicate submission detected. Please wait a moment and try again.",
      });
    }

    res.status(500).json({
      success: false,
      error: "Failed to send message. Please try again later.",
      details: process.env.NODE_ENV === "development" ? err.message : undefined,
    });
  }
});

// GET /api/contact - Get all contacts (for admin dashboard)
router.get("/", async (req, res) => {
  try {
    const { page = 1, limit = 10, status, search } = req.query;

    const query = {};
    if (status && status !== "all") query.status = status;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { subject: { $regex: search, $options: "i" } },
        { referenceId: { $regex: search, $options: "i" } },
      ];
    }

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit))
      .select("-__v");

    const total = await Contact.countDocuments(query);

    res.status(200).json({
      success: true,
      data: contacts,
      pagination: {
        current: parseInt(page),
        totalPages: Math.ceil(total / parseInt(limit)),
        results: contacts.length,
        totalResults: total,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching contacts:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch contacts",
    });
  }
});

// GET /api/contact/stats - Get contact statistics
router.get("/stats", async (req, res) => {
  try {
    const totalContacts = await Contact.countDocuments();
    const newContacts = await Contact.countDocuments({ status: "new" });
    const todayContacts = await Contact.countDocuments({
      createdAt: { $gte: new Date().setHours(0, 0, 0, 0) },
    });

    const statusStats = await Contact.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    // Get last 7 days contacts
    const last7Days = await Contact.aggregate([
      {
        $match: {
          createdAt: { $gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) },
        },
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
      { $sort: { _id: 1 } },
    ]);

    res.status(200).json({
      success: true,
      data: {
        total: totalContacts,
        new: newContacts,
        today: todayContacts,
        byStatus: statusStats,
        last7Days: last7Days,
      },
    });
  } catch (err) {
    console.error("❌ Error fetching stats:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch statistics",
    });
  }
});

// PUT /api/contact/:id - Update contact status
router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    if (!status || !["new", "read", "replied", "resolved"].includes(status)) {
      return res.status(400).json({
        success: false,
        error: "Valid status is required: new, read, replied, or resolved",
      });
    }

    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: new Date() },
      { new: true, runValidators: true }
    );

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
      message: `Contact status updated to ${status}`,
    });
  } catch (err) {
    console.error("❌ Error updating contact:", err);
    res.status(500).json({
      success: false,
      error: "Failed to update contact",
    });
  }
});

// GET /api/contact/:id - Get single contact
router.get("/:id", async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id).select("-__v");

    if (!contact) {
      return res.status(404).json({
        success: false,
        error: "Contact not found",
      });
    }

    res.status(200).json({
      success: true,
      data: contact,
    });
  } catch (err) {
    console.error("❌ Error fetching contact:", err);
    res.status(500).json({
      success: false,
      error: "Failed to fetch contact",
    });
  }
});

// Health check endpoint
router.get("/health", async (req, res) => {
  try {
    // Check database connection
    await mongoose.connection.db.admin().ping();

    const dbStatus =
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected";
    const emailStatus = transporter ? "Configured" : "Not Configured";

    res.status(200).json({
      status: "OK",
      service: "Campus Lost & Found Contact API",
      database: dbStatus,
      email: emailStatus,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
    });
  } catch (err) {
    res.status(500).json({
      status: "Error",
      service: "Campus Lost & Found Contact API",
      database: "Disconnected",
      error: err.message,
      timestamp: new Date().toISOString(),
    });
  }
});

export default router;
