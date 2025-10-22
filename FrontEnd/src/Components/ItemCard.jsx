// components/ItemCard.jsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  MapPin,
  Mail,
  Phone,
  Heart,
  Share2,
  Smartphone,
  FileText,
  Shirt,
  Search,
  Eye,
  Clock,
  User,
  Calendar,
  Copy,
  Check,
} from "lucide-react";

const ItemCard = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  // Simple type styling - using item.type directly from database
  const getTypeStyle = (type) => {
    return type === "lost"
      ? "bg-rose-50 text-rose-700 border-rose-200"
      : "bg-emerald-50 text-emerald-700 border-emerald-200";
  };

  const getTypeIcon = (type) => {
    return type === "lost" ? Search : Eye;
  };

  const getTypeLabel = (type) => {
    return type === "lost" ? "Lost" : "Found";
  };

  const getTypeGradient = (type) => {
    return type === "lost"
      ? "from-rose-500 to-orange-500"
      : "from-emerald-500 to-teal-500";
  };

  // Category config remains simple
  const getCategoryIcon = (category) => {
    switch (category) {
      case "electronics":
        return Smartphone;
      case "documents":
        return FileText;
      case "clothing":
        return Shirt;
      default:
        return Search;
    }
  };

  const getCategoryBgColor = (category) => {
    switch (category) {
      case "electronics":
        return "bg-blue-500/10";
      case "documents":
        return "bg-amber-500/10";
      case "clothing":
        return "bg-purple-500/10";
      default:
        return "bg-gray-500/10";
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 1) return "Yesterday";
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`;

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: date.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
    });
  };

  // Share functionality
  const handleShare = async () => {
    const shareData = {
      title: item.title,
      text: item.description,
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(
          `${item.title}\n${item.description}\n${window.location.href}`
        );
        setCopiedField("share");
        setTimeout(() => setCopiedField(null), 2000);
      }
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  // Copy to clipboard functionality
  const handleCopy = async (text, field) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    } catch (error) {
      console.log("Error copying:", error);
    }
  };

  // Handle email click
  const handleEmailClick = (email) => {
    window.open(`mailto:${email}`, "_blank");
  };

  // Handle phone click
  const handlePhoneClick = (phone) => {
    window.open(`tel:${phone}`, "_blank");
  };

  const TypeIcon = getTypeIcon(item.type);
  const CategoryIcon = getCategoryIcon(item.category);

  return (
    <motion.div
      className="relative group bg-white rounded-2xl shadow-sm hover:shadow-2xl overflow-hidden border border-gray-100 transition-all duration-300 will-change-transform"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ scale: 1.02, y: -4 }}
      layout
    >
      {/* Header with gradient accent */}
      <div
        className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${getTypeGradient(
          item.type
        )}`}
      />

      {/* Image Section */}
      <div className="relative h-48 overflow-hidden bg-gradient-to-br from-slate-50 to-gray-100">
        {!imageError ? (
          <>
            <motion.img
              src={item.image}
              alt={item.title}
              className={`w-full h-full object-cover transition-all duration-700 ${
                isHovered ? "scale-110" : "scale-100"
              } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
              onError={handleImageError}
              onLoad={() => setImageLoaded(true)}
            />
            {!imageLoaded && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full"
                />
              </div>
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-gray-100">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className={`p-4 rounded-2xl ${getCategoryBgColor(
                item.category
              )} mb-3`}
            >
              <CategoryIcon className="w-8 h-8 text-gray-500" />
            </motion.div>
            <p className="text-sm font-medium text-gray-500 capitalize">
              {item.category}
            </p>
          </div>
        )}

        {/* Badges - Only Type Badge (Lost/Found) */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border flex items-center gap-1.5 shadow-sm ${getTypeStyle(
              item.type
            )}`}
          >
            <TypeIcon className="w-3 h-3" />
            {getTypeLabel(item.type)}
          </motion.div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-3 right-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-black/80 text-white text-xs px-3 py-1.5 rounded-lg backdrop-blur-sm flex items-center gap-1.5 shadow-lg"
          >
            <CategoryIcon className="w-3 h-3" />
            <span className="capitalize font-medium">{item.category}</span>
          </motion.div>
        </div>

        {/* Date Badge */}
        {item.date && (
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm text-gray-700 text-xs px-3 py-1.5 rounded-lg flex items-center gap-1.5 shadow-sm border border-gray-200"
          >
            <Calendar className="w-3 h-3" />
            <span className="font-medium">{formatDate(item.date)}</span>
          </motion.div>
        )}
      </div>

      {/* Hover Overlay - Full Details */}
      <motion.div
        className={`absolute inset-0 bg-white/95 backdrop-blur-lg flex flex-col p-6 transition-all duration-500 overflow-y-auto ${
          isHovered
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-5 pointer-events-none"
        }`}
        initial={false}
      >
        {/* Header Section */}
        <div className="space-y-4 mb-6">
          <div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">
              {item.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">{item.description}</p>
          </div>

          {/* Quick Info Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <div
                className={`p-2 rounded-lg mr-3 ${getCategoryBgColor(
                  item.category
                )}`}
              >
                <CategoryIcon className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-semibold capitalize">{item.category}</p>
              </div>
            </div>

            <div className="flex items-center text-sm text-gray-600">
              <div className={`p-2 rounded-lg mr-3 ${getTypeStyle(item.type)}`}>
                <TypeIcon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs text-gray-500">Type</p>
                <p className="font-semibold">{getTypeLabel(item.type)}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Location & Date Section */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start text-sm text-gray-600">
            <MapPin className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0 text-rose-500" />
            <div>
              <p className="font-semibold text-gray-700 mb-1">Location</p>
              <p className="text-gray-600">{item.location}</p>
            </div>
          </div>

          {item.date && (
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="w-5 h-5 mr-3 flex-shrink-0 text-blue-500" />
              <div>
                <p className="font-semibold text-gray-700 mb-1">Posted Date</p>
                <p className="text-gray-600">{formatDate(item.date)}</p>
              </div>
            </div>
          )}
        </div>

        {/* Contact Information */}
        {(item.contactemail || item.contactphone) && (
          <div className="mb-6">
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2 mb-3">
                <User className="w-4 h-4" />
                Contact Information
              </p>
              <div className="space-y-3">
                {item.contactemail && (
                  <div className="flex items-center justify-between group">
                    <button
                      onClick={() => handleEmailClick(item.contactemail)}
                      className="flex items-center text-sm text-gray-600 hover:text-blue-600 transition-colors flex-1"
                    >
                      <Mail className="w-4 h-4 mr-3 flex-shrink-0 text-blue-500" />
                      <div className="text-left">
                        <p className="text-xs text-gray-500 mb-1">Email</p>
                        <p className="font-medium truncate hover:underline">
                          {item.contactemail}
                        </p>
                      </div>
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(item.contactemail, "email")}
                      className="p-2 rounded-lg text-gray-400 hover:text-blue-600 hover:bg-blue-50 transition-all opacity-0 group-hover:opacity-100"
                      title="Copy email"
                    >
                      {copiedField === "email" ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </motion.button>
                  </div>
                )}
                {item.contactphone && (
                  <div className="flex items-center justify-between group">
                    <button
                      onClick={() => handlePhoneClick(item.contactphone)}
                      className="flex items-center text-sm text-gray-600 hover:text-green-600 transition-colors flex-1"
                    >
                      <Phone className="w-4 h-4 mr-3 flex-shrink-0 text-green-500" />
                      <div className="text-left">
                        <p className="text-xs text-gray-500 mb-1">Phone</p>
                        <p className="font-medium hover:underline">
                          {item.contactphone}
                        </p>
                      </div>
                    </button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => handleCopy(item.contactphone, "phone")}
                      className="p-2 rounded-lg text-gray-400 hover:text-green-600 hover:bg-green-50 transition-all opacity-0 group-hover:opacity-100"
                      title="Copy phone number"
                    >
                      {copiedField === "phone" ? (
                        <Check className="w-3 h-3 text-green-500" />
                      ) : (
                        <Copy className="w-3 h-3" />
                      )}
                    </motion.button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Action Buttons - Only Like and Share remain */}
        <div className="flex justify-end items-center pt-4 mt-auto border-t border-gray-200">
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => setIsLiked(!isLiked)}
              className={`p-3 rounded-xl shadow-sm hover:shadow-md transition-all border ${
                isLiked
                  ? "text-rose-500 border-rose-200 bg-rose-50"
                  : "text-gray-400 border-gray-200 hover:text-rose-500 hover:border-rose-200"
              }`}
              title="Save to favorites"
            >
              <Heart
                className={`w-4 h-4 transition-all duration-300 ${
                  isLiked ? "fill-current scale-110" : "scale-100"
                }`}
              />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={handleShare}
              className={`p-3 rounded-xl bg-white shadow-sm hover:shadow-md transition-all border ${
                copiedField === "share"
                  ? "text-green-500 border-green-200 bg-green-50"
                  : "text-gray-400 border-gray-200 hover:text-blue-600 hover:border-blue-200"
              }`}
              title="Share item"
            >
              {copiedField === "share" ? (
                <Check className="w-4 h-4" />
              ) : (
                <Share2 className="w-4 h-4" />
              )}
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Bottom Info (Visible when not hovered) */}
      <div className="p-5 space-y-3">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-gray-900 line-clamp-1 leading-tight">
            {item.title}
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center text-xs text-gray-500">
            <MapPin className="w-3 h-3 mr-1 flex-shrink-0 text-rose-500" />
            <span className="truncate font-medium">{item.location}</span>
          </div>
          {item.date && (
            <div className="text-xs text-gray-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {formatDate(item.date)}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ItemCard;
