import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Lock,
  Eye,
  Mail,
  FileText,
  CheckCircle,
  Users,
  Database,
  BarChart3,
  Cookie,
} from "lucide-react";

const PrivacyPolicy = () => {
  const policySections = [
    {
      icon: Database,
      title: "Information We Collect",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      content: [
        "Personal details (name, email, phone) when reporting items",
        "Item information including images, descriptions, and locations",
        "Communication data from platform interactions",
        "Technical data like IP address, device type, and browser details",
      ],
    },
    {
      icon: BarChart3,
      title: "How We Use Your Information",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50",
      content: [
        "Facilitate item reunions and user notifications",
        "Improve platform services and user experience",
        "Send important updates and security alerts",
        "Conduct analytics for service enhancement",
      ],
    },
    {
      icon: Cookie,
      title: "Cookies & Tracking",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50",
      content: [
        "Essential cookies for session management",
        "Analytics cookies for performance tracking",
        "Optional cookies for personalized experience",
        "Browser controls available for cookie management",
      ],
    },
    {
      icon: Shield,
      title: "Data Protection",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50",
      content: [
        "Encrypted data transmission and storage",
        "Regular security audits and updates",
        "Limited access to authorized personnel only",
        "Compliance with data protection regulations",
      ],
    },
    {
      icon: Users,
      title: "Information Sharing",
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50",
      content: [
        "Only share necessary information for item recovery",
        "Selling personal data to third parties",
        "Anonymous data used for platform analytics",
        "Legal compliance when required by law",
      ],
    },
    {
      icon: Mail,
      title: "Contact & Support",
      color: "from-red-500 to-rose-500",
      bgColor: "bg-red-50",
      content: [
        <>
          Questions?{" "}
          <Link
            to="/contact"
            className="text-indigo-600 underline hover:text-indigo-800 font-medium"
          >
            Contact Our Team
          </Link>
        </>,
        <>
          Email:{" "}
          <a
            href="mailto:abishek.sathiyan.2002@gmail.com"
            className="text-indigo-600 underline hover:text-indigo-800 font-medium"
          >
            admin.com
          </a>
        </>,
        "Typically respond within 24 hours",
        "Dedicated privacy support available",
      ],
    },
  ];

  const features = [
    { icon: Lock, text: "End-to-End Encryption", color: "text-green-600" },
    { icon: Eye, text: "Transparent Policies", color: "text-blue-600" },
    { icon: CheckCircle, text: "GDPR Compliant", color: "text-purple-600" },
    { icon: FileText, text: "Regular Audits", color: "text-amber-600" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/30">
      {/* Header Section */}
      <div className="relative bg-gradient-to-r from-slate-800 via-purple-900 to-slate-900 text-white py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.3)_1px,transparent_0)] bg-[length:40px_40px]"></div>
        </div>

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-2xl px-6 py-3 mb-6 border border-white/20">
            <Shield className="w-6 h-6 text-blue-400" />
            <span className="font-semibold text-blue-100">Privacy First</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
            Privacy Policy
          </h1>

          <p className="text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
            Your trust is our priority. Learn how we protect and handle your data with transparency and security at every step.
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12 max-w-4xl mx-auto">
            {features.map((feature, index) => (
              <div
                key={index}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-lg rounded-2xl p-4 border border-white/20"
              >
                <feature.icon className={`w-5 h-5 ${feature.color}`} />
                <span className="text-sm font-medium text-white">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Policy Sections */}
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {policySections.map((section, index) => (
            <div
              key={index}
              className="group relative bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-8 hover:shadow-2xl transition-all duration-500 hover:scale-105"
            >
              <div className="relative z-10">
                <div
                  className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-r ${section.color} shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300`}
                >
                  <section.icon className="w-8 h-8 text-white" />
                </div>

                <h2 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                  {section.title}
                </h2>

                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-gray-700 leading-relaxed"
                    >
                      <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-sm md:text-base">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-3xl shadow-lg border border-gray-200/50 p-8">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Your Privacy Matters</h2>
            <p className="text-lg text-gray-700 mb-8 leading-relaxed">
              We're committed to protecting your personal information and being transparent about how we use it.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="flex items-center gap-2 text-green-600 font-semibold">
                <CheckCircle className="w-5 h-5" />
                <span>Last Updated: October 2025</span>
              </div>
              <div className="flex items-center gap-2 text-blue-600 font-semibold">
                <FileText className="w-5 h-5" />
                <span>Version 1.0</span>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-6">
            Have questions about our privacy practices?
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* Contact Privacy Team Button */}
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <Mail className="w-5 h-5" />
              Contact Privacy Team
            </Link>

            {/* Connect Terms Button */}
            <Link
              to="/terms"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <FileText className="w-5 h-5" />
              View Terms & Conditions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
