// components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";
import {
  MapPin,
  Phone,
  Mail,
  Heart,
  Shield,
  FileText,
  ExternalLink,
  Sparkles,
} from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-32 right-10 w-48 h-48 bg-gradient-to-r from-cyan-500/10 to-emerald-500/10 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      </div>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-3 mb-6">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-900"></div>
              </div>
              <div>
                <span className="text-2xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent">
                  Lost & Found Hub
                </span>
                <p className="text-sm text-blue-300 font-medium">
                  Reuniting what matters
                </p>
              </div>
            </div>
            <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-xl">
              Transforming lost items into found memories through cutting-edge
              technology and a compassionate global community. Every recovery
              tells a story.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-white to-blue-100 bg-clip-text text-transparent mb-6 flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {[
                { path: "/", label: "Home" },
                { path: "/lost-items", label: "Lost Items" },
                { path: "/", label: "Found Items" },
                { path: "/form", label: "Report Item" },
                { path: "/about", label: "About Us" },
                { path: "/contact", label: "Contact" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-slate-300 hover:text-white transition-all duration-300 hover:translate-x-2 group"
                  >
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Legal */}
          <div className="space-y-8">
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-white to-purple-100 bg-clip-text text-transparent mb-6 flex items-center gap-2">
                <Mail className="w-5 h-5 text-purple-400" />
                Get In Touch
              </h3>
              <ul className="space-y-4 text-slate-300">
                <li className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                  <Mail className="w-4 h-4 text-blue-400" />
                  <span>loges00777@gmail.com</span>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                  <Phone className="w-4 h-4 text-green-400" />
                  <span>+91 91508 04220</span>
                </li>
                <li className="flex items-center gap-3 hover:text-white transition-colors duration-300">
                  <MapPin className="w-4 h-4 text-amber-400" />
                  <span>Methalodai🔥, Ramanathapuram</span>
                </li>
              </ul>
            </div>

            {/* Legal Links */}
            <div>
              <h3 className="text-lg font-semibold text-slate-200 mb-4">
                Legal
              </h3>
              <div className="flex flex-wrap gap-4">
                {[
                  { path: "/privacy", name: "Privacy Policy", icon: Shield },
                  { path: "/terms", name: "Terms of Service", icon: FileText },
                ].map((item) => (
                  <Link
                    key={item.name}
                    to={item.path}
                    className="flex items-center gap-2 text-slate-400 hover:text-white transition-all duration-300 text-sm group"
                  >
                    <item.icon className="w-4 h-4" />
                    {item.name}
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 mt-12 pt-8 flex flex-col lg:flex-row justify-between items-center">
          <div className="flex items-center gap-4 text-slate-400 mb-4 lg:mb-0">
            <div className="flex items-center gap-2">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-400 fill-red-400 animate-pulse" />
              <span>by the Lost & Found Team</span>
            </div>
          </div>

          <div className="flex items-center gap-6 text-sm">
            <span className="text-slate-400">
              © {currentYear} Lost & Found Hub. All rights reserved.
            </span>
            <div className="flex items-center gap-2 text-slate-500">
              <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
