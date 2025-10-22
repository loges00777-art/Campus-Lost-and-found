import React from "react";
import { Link } from "react-router-dom";
import {
  FileText,
  Shield,
  UserCheck,
  Copyright,
  Ban,
  Scale,
  RefreshCw,
  Mail,
  CheckCircle,
  AlertTriangle,
  BookOpen,
  Gavel,
  ArrowLeft,
  Download,
  Clock,
  Globe,
} from "lucide-react";

const Terms = () => {
  const termsSections = [
    {
      icon: CheckCircle,
      title: "Acceptance of Terms",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      content: [
        "By using Campus Lost & Found, you agree to comply with and be bound by these Terms & Conditions.",
        "If you do not agree with any part of these terms, please do not use our platform.",
        "Continued use of the platform constitutes ongoing acceptance of these terms.",
      ],
    },
    {
      icon: UserCheck,
      title: "User Responsibilities",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      content: [
        "Provide accurate and truthful information when reporting items.",
        "Maintain security of your account credentials.",
        "Respect other users and their property.",
        "Report suspicious activity immediately.",
      ],
    },
    {
      icon: Copyright,
      title: "Content Ownership",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      content: [
        "All user-uploaded content remains the property of the user.",
        "Grant platform license to display and share content for recovery purposes.",
        "Retain rights to remove your content at any time.",
        "Platform may use anonymized data for improvement.",
      ],
    },
    {
      icon: Ban,
      title: "Prohibited Activities",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      content: [
        "No illegal, offensive, or harmful content.",
        "No hacking, interference, or platform disruption.",
        "No spam, fraud, or deceptive practices.",
        "No harassment of other users.",
      ],
    },
    {
      icon: Shield,
      title: "Limitation of Liability",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      content: [
        "Not responsible for loss, damage, or inconvenience.",
        "No guarantee of item recovery or information accuracy.",
        "Use platform at your own discretion and risk.",
        "Verify item ownership before transfer.",
      ],
    },
    {
      icon: RefreshCw,
      title: "Modifications to Terms",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      content: [
        "Terms may be updated periodically.",
        "Significant changes communicated via platform/email.",
        "Regular review of terms recommended.",
        "Continued use after changes implies acceptance.",
      ],
    },
    {
      icon: Gavel,
      title: "Governing Law",
      color: "from-gray-600 to-slate-700",
      bgColor: "bg-gray-50",
      content: [
        "Governed by laws of platform's operating jurisdiction.",
        "Disputes resolved according to applicable laws.",
        "International users subject to local compliance.",
        "Legal proceedings in designated courts.",
      ],
    },
    {
      icon: Mail,
      title: "Contact & Support",
      color: "from-cyan-500 to-teal-500",
      bgColor: "bg-cyan-50",
      content: [
        "Questions? Contact our legal team for clarification.",
        <>
          Email:{" "}
          <a
            href="mailto:admin@campuslostfound.com"
            className="text-blue-600 underline hover:text-blue-800 font-medium text-[15px]"
          >
            admin@campuslostfound.com
          </a>
        </>,
        "Legal inquiries processed within 48 hours.",
        "Emergency support available for critical issues.",
      ],
    },
  ];

  const keyPoints = [
    {
      icon: BookOpen,
      text: "Read Carefully",
      color: "text-purple-600",
      bg: "bg-purple-100",
    },
    {
      icon: AlertTriangle,
      text: "Binding Agreement",
      color: "text-amber-600",
      bg: "bg-amber-100",
    },
    {
      icon: FileText,
      text: "Legal Document",
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      icon: CheckCircle,
      text: "Updated Regularly",
      color: "text-green-600",
      bg: "bg-green-100",
    },
  ];

  const stats = [
    {
      icon: Clock,
      value: "Last Updated",
      label: "Today",
      color: "text-blue-600",
    },
    { icon: FileText, value: "Version", label: "1.0", color: "text-green-600" },
    {
      icon: Globe,
      value: "Effective",
      label: "Campus",
      color: "text-purple-600",
    },
  ];

  const handleDownloadPDF = () => {
    const link = document.createElement("a");
    link.href = "/terms-and-conditions.pdf";
    link.download = "Campus-Lost-Found-Terms-Conditions.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/20">
      {/* Header Section */}
      <div className="relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-16 md:py-24 px-4 overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(120,119,198,0.1),transparent_50%)]"></div>
          <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        </div>

        {/* Navigation */}
        <div className="absolute top-6 left-4 right-4 z-20 flex justify-between items-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-lg text-white px-4 py-2.5 rounded-xl hover:bg-white/20 transition-all duration-300 border border-white/20 text-[14px] font-medium hover:scale-105"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <div className="text-[12px] text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
            Legal Document
          </div>
        </div>

        {/* Hero Content */}
        <div className="max-w-6xl mx-auto text-center relative z-10 pt-16">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 mb-8 border border-white/20">
            <FileText className="w-6 h-6 text-blue-300" />
            <span className="font-semibold text-blue-100 text-[18px]">
              Terms & Conditions
            </span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent leading-tight">
            Terms of Service
          </h1>

          <p className="text-[18px] sm:text-[20px] md:text-[22px] text-blue-100/90 max-w-4xl mx-auto leading-relaxed font-light mb-12">
            Please read these terms carefully before using our platform. Your
            access and use of Campus Lost & Found constitutes agreement to these
            terms.
          </p>

          {/* Key Points Grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto mb-12">
            {keyPoints.map((point, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 group"
              >
                <div
                  className={`p-2 rounded-lg ${point.bg} group-hover:scale-110 transition-transform duration-300`}
                >
                  <point.icon className={`w-5 h-5 ${point.color}`} />
                </div>
                <span className="text-[14px] font-semibold text-white whitespace-nowrap">
                  {point.text}
                </span>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 max-w-2xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="flex justify-center mb-2">
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <div className="text-[12px] text-blue-200/80 font-medium mb-1">
                  {stat.value}
                </div>
                <div className="text-[14px] font-bold text-white">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto py-16 md:py-20 px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        {/* Terms Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {termsSections.map((section, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl shadow-lg border border-gray-100 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden min-h-[340px] flex flex-col"
            >
              {/* Header with Gradient */}
              <div className={`bg-gradient-to-r ${section.color} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                    <section.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-[18px] font-bold text-white leading-tight">
                    {section.title}
                  </h3>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <ul className="space-y-3 flex-1">
                  {section.content.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-700 text-[14px] leading-relaxed"
                    >
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-[9px] flex-shrink-0"></div>
                      <span className="flex-1">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Hover Effect */}
              <div className="absolute inset-0 border-2 border-transparent bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-5 transition-opacity duration-500 -z-10"></div>
            </div>
          ))}
        </div>

        {/* Important Notice */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl border border-amber-200 p-8 mb-12 shadow-lg">
          <div className="flex items-start gap-6 max-w-6xl mx-auto">
            <div className="flex-shrink-0 w-16 h-16 bg-amber-100 rounded-2xl flex items-center justify-center shadow-sm">
              <AlertTriangle className="w-8 h-8 text-amber-600" />
            </div>
            <div className="flex-1">
              <h3 className="text-[24px] font-bold text-amber-900 mb-4">
                Important Legal Notice
              </h3>
              <p className="text-amber-800 leading-relaxed text-[16px]">
                These Terms & Conditions constitute a legally binding agreement
                between you and Campus Lost & Found. By accessing or using our
                platform, you acknowledge that you have read, understood, and
                agree to be bound by these terms. If you do not agree with any
                part of these terms, you must discontinue use of our services
                immediately.
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-white rounded-2xl border border-gray-100 p-12 shadow-lg">
          <h2 className="text-[28px] font-bold text-gray-900 mb-4">
            Questions About Our Terms?
          </h2>
          <p className="text-gray-600 text-[18px] mb-8 max-w-2xl mx-auto leading-relaxed">
            Our legal team is here to help clarify any aspects of our Terms &
            Conditions and address your concerns.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
            <Link
              to="/contact"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg text-[16px] min-w-[200px] justify-center"
            >
              <Mail className="w-5 h-5" />
              Contact Legal Team
            </Link>

            <Link
              to="/privacy"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105 shadow-lg text-[16px] min-w-[200px] justify-center"
            >
              <Shield className="w-5 h-5" />
              Privacy Policy
            </Link>
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap gap-6 justify-center text-[14px] text-gray-500 pt-6 border-t border-gray-200">
            <Link
              to="/"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Contact
            </Link>
            <Link
              to="/privacy"
              className="hover:text-blue-600 transition-colors font-medium"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
