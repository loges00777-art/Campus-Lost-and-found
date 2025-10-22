// pages/Home.jsx
import React, { useEffect, useState } from "react";
import ItemCard from "../Components/ItemCard";
import {
  Search,
  Filter,
  Plus,
  RefreshCw,
  AlertCircle,
  TrendingUp,
  Clock,
  MapPin,
  Users,
  Shield,
  Heart,
  ArrowRight,
  Star,
  Award,
  Zap,
  MessageCircle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import Header from "../Components/Header";
import Footer from "../Components/Footer";
import DevInfo from "../Components/DevInfo";

// Skeleton Loader Component
const ItemCardSkeleton = () => {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden border border-gray-100 animate-pulse">
      {/* Header gradient */}
      <div className="h-1 bg-gray-200" />

      {/* Image Section */}
      <div className="relative h-48 bg-gray-200" />

      {/* Content Section */}
      <div className="p-5 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 rounded w-3/4"></div>

        {/* Description */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded"></div>
          <div className="h-3 bg-gray-200 rounded w-5/6"></div>
        </div>

        {/* Location and Date */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-gray-200 rounded-full mr-1"></div>
            <div className="h-3 bg-gray-200 rounded w-20"></div>
          </div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ icon: Icon, title, value, description, color }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
        <p className="text-2xl font-bold text-gray-900 mb-2">{value}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <div className={`p-3 rounded-xl ${color}`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
    </div>
  </div>
);

// Feature Card Component
const FeatureCard = ({ icon: Icon, title, description, color }) => (
  <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 group">
    <div
      className={`p-3 rounded-xl ${color} w-12 h-12 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}
    >
      <Icon className="w-6 h-6 text-white" />
    </div>
    <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
    <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
  </div>
);

// FAQ Item Component
const FAQItem = ({ question, answer, isOpen, onClick }) => (
  <div className="border border-gray-200 rounded-2xl bg-white hover:shadow-md transition-all duration-300">
    <button
      onClick={onClick}
      className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 rounded-2xl transition-colors"
    >
      <span className="font-semibold text-gray-900 pr-4">{question}</span>
      {isOpen ? (
        <ChevronUp className="w-5 h-5 text-gray-500 flex-shrink-0" />
      ) : (
        <ChevronDown className="w-5 h-5 text-gray-500 flex-shrink-0" />
      )}
    </button>
    {isOpen && (
      <div className="px-6 pb-4">
        <p className="text-gray-600 leading-relaxed">{answer}</p>
      </div>
    )}
  </div>
);

function Home() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchAttempts, setFetchAttempts] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterCategory, setFilterCategory] = useState("all");
  const [activeFAQ, setActiveFAQ] = useState(null);

  // Features data
  const features = [
    {
      icon: Shield,
      title: "Secure & Trusted",
      description:
        "All items are verified and contact information is protected. Your privacy is our priority.",
      color: "bg-blue-500",
    },
    {
      icon: Zap,
      title: "Quick Reporting",
      description:
        "Report lost or found items in seconds with our simple form. Get help faster.",
      color: "bg-amber-500",
    },
    {
      icon: Users,
      title: "Community Powered",
      description:
        "Join thousands of users helping each other reunite with lost belongings.",
      color: "bg-emerald-500",
    },
    {
      icon: CheckCircle,
      title: "High Success Rate",
      description:
        "Over 80% of reported found items are successfully returned to their owners.",
      color: "bg-purple-500",
    },
  ];

  // FAQ data
  const faqs = [
    {
      question: "How do I report a lost item?",
      answer:
        "Click the 'Report Item' button and fill out the simple form with details about your lost item, including description, location, and contact information.",
    },
    {
      question: "What should I do if I find something?",
      answer:
        "Report the found item immediately with as much detail as possible. Include clear photos and the location where you found it to help the owner identify their property.",
    },
    {
      question: "Is there a fee for using this service?",
      answer:
        "No, our lost and found service is completely free for everyone. We believe in helping our community without any charges.",
    },
    {
      question: "How long are items kept in the system?",
      answer:
        "Items remain active for 30 days. After this period, they are automatically archived but can still be searched in our database.",
    },
  ];

  // Success stories
  const successStories = [
    {
      item: "Vintage Watch",
      time: "2 days",
      story: "Found and returned within 48 hours",
    },
    {
      item: "College Diploma",
      time: "1 week",
      story: "Reunited graduate with important document",
    },
    {
      item: "Family Heirloom",
      time: "3 days",
      story: "Precious necklace returned to grateful owner",
    },
  ];

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/items");

      if (!response.ok) {
        throw new Error("Failed to fetch items");
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const itemsWithIds = data.map((item) => ({
          ...item,
          id: item._id,
          type: item.status,
          title: item.title || "Untitled Item",
          description: item.description || "No description available",
          location: item.location || "Location not specified",
          category: item.category || "other",
          image: item.image || "/api/placeholder/300/200",
          contactemail: item.contactemail || "",
          contactphone: item.contactphone || "",
          date: item.date || item.createdAt || new Date().toISOString(),
        }));
        setItems(itemsWithIds);
      } else {
        console.error("Expected array but got:", data);
        setItems([]);
      }
      setFetchAttempts(0);
    } catch (err) {
      console.error("Error fetching items:", err);
      if (fetchAttempts < 3) {
        setFetchAttempts((prev) => prev + 1);
        setTimeout(() => {
          fetchItems();
        }, 2000);
      } else {
        setItems([]);
      }
    } finally {
      setLoading(false);
    }
  };

  // Filter items based on search and filters
  const filteredItems = items.filter((item) => {
    const matchesSearch =
      searchTerm === "" ||
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesType = filterType === "all" || item.type === filterType;
    const matchesCategory =
      filterCategory === "all" || item.category === filterCategory;

    return matchesSearch && matchesType && matchesCategory;
  });

  // Calculate statistics
  const stats = {
    total: items.length,
    lost: items.filter((item) => item.type === "lost").length,
    found: items.filter((item) => item.type === "found").length,
    categories: new Set(items.map((item) => item.category)).size,
    // Calculate approximate success rate (mock data for demo)
    successRate:
      items.length > 0
        ? Math.min(
            85,
            Math.floor(
              (items.filter((item) => item.type === "found").length /
                items.length) *
                100
            )
          )
        : 0,
  };

  // Get all unique categories from your data for the filter dropdown
  const uniqueCategories = [
    ...new Set(items.map((item) => item.category)),
  ].sort();

  // Show skeleton if still loading OR if we're retrying due to server issues
  const showSkeleton = loading || fetchAttempts > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Hero Section */}
      <Header />
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-6">
            <Star className="w-4 h-4" />
            <span className="text-sm font-medium">
              Trusted by thousands of users
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Lost Something?
            <br />
            <span className="text-blue-200">We Can Help</span>
          </h1>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto mb-8 leading-relaxed">
            Join our community-driven platform to report lost items or help
            reunite found belongings with their owners. Fast, free, and
            effective.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => (window.location.href = "/form")}
              className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-2xl hover:scale-105 flex items-center gap-2 justify-center"
            >
              <Plus className="w-5 h-5" />
              Report an Item
            </button>
            <button
              onClick={() =>
                document
                  .getElementById("features")
                  .scrollIntoView({ behavior: "smooth" })
              }
              className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center gap-2 justify-center"
            >
              Learn More
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <div className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Stats Overview */}
          {!showSkeleton && items.length > 0 && (
            <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-12">
              <StatsCard
                icon={TrendingUp}
                title="Total Items"
                value={stats.total}
                description="Active reports"
                color="bg-blue-500"
              />
              <StatsCard
                icon={AlertCircle}
                title="Lost Items"
                value={stats.lost}
                description="Searching for owners"
                color="bg-rose-500"
              />
              <StatsCard
                icon={Clock}
                title="Found Items"
                value={stats.found}
                description="Waiting to be claimed"
                color="bg-emerald-500"
              />
              <StatsCard
                icon={MapPin}
                title="Categories"
                value={stats.categories}
                description="Different item types"
                color="bg-amber-500"
              />
              <StatsCard
                icon={Award}
                title="Success Rate"
                value={`${stats.successRate}%`}
                description="Items returned"
                color="bg-purple-500"
              />
            </div>
          )}

          {/* Features Section */}
          <div id="features" className="mb-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Why Choose Our Platform?
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                We've built the most effective lost and found platform with
                features designed to help you quickly reunite with your
                belongings.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {features.map((feature, index) => (
                <FeatureCard
                  key={index}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  color={feature.color}
                />
              ))}
            </div>
          </div>

          {/* Success Stories */}
          {!showSkeleton && items.length > 0 && (
            <div className="bg-gradient-to-r from-emerald-500 to-teal-600 rounded-3xl p-8 mb-12 text-white">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Success Stories</h2>
                <p className="text-emerald-100">
                  Recent happy reunions made possible by our community
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {successStories.map((story, index) => (
                  <div
                    key={index}
                    className="bg-white/20 rounded-2xl p-6 backdrop-blur-sm"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <Heart className="w-5 h-5 text-white" />
                      <h3 className="font-semibold text-lg">{story.item}</h3>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-emerald-100 text-sm">
                        {story.time}
                      </span>
                      <span className="text-white font-medium text-sm">
                        {story.story}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Search and Filter Section */}
          {!showSkeleton && items.length > 0 && (
            <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm mb-8">
              <div className="flex flex-col lg:flex-row gap-4 items-center">
                {/* Search Input */}
                <div className="flex-1 w-full">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search items by title, description, or location..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                {/* Filters */}
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="all">All Types</option>
                    <option value="lost">Lost Items</option>
                    <option value="found">Found Items</option>
                  </select>

                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  >
                    <option value="all">All Categories</option>
                    {uniqueCategories.map((category) => (
                      <option key={category} value={category}>
                        {category.charAt(0).toUpperCase() + category.slice(1)}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterType("all");
                      setFilterCategory("all");
                    }}
                    className="px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all font-medium flex items-center gap-2 justify-center"
                  >
                    <Filter className="w-4 h-4" />
                    Reset
                  </button>
                </div>
              </div>

              {/* Results Info */}
              <div className="mt-4 flex flex-col sm:flex-row justify-between items-center text-sm text-gray-600">
                <p>
                  Showing{" "}
                  <span className="font-semibold">{filteredItems.length}</span>{" "}
                  of <span className="font-semibold">{items.length}</span> items
                  {searchTerm && (
                    <span>
                      {" "}
                      for "<span className="font-semibold">{searchTerm}</span>"
                    </span>
                  )}
                </p>
                {filteredItems.length === 0 && items.length > 0 && (
                  <button
                    onClick={() => {
                      setSearchTerm("");
                      setFilterType("all");
                      setFilterCategory("all");
                    }}
                    className="text-blue-600 hover:text-blue-700 font-medium mt-2 sm:mt-0"
                  >
                    Clear filters to see all items
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Quick Actions */}
          {!showSkeleton && (
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={fetchItems}
                className="flex-1 bg-white border border-gray-300 rounded-2xl p-6 hover:border-blue-500 hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-100 rounded-xl group-hover:bg-blue-500 transition-colors">
                    <RefreshCw className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-gray-900 mb-1">
                      Refresh Items
                    </h3>
                    <p className="text-sm text-gray-600">
                      Get the latest updates
                    </p>
                  </div>
                </div>
              </button>

              <button
                onClick={() => (window.location.href = "/form")}
                className="flex-1 bg-blue-600 rounded-2xl p-6 hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-blue-500 rounded-xl group-hover:bg-white transition-colors">
                    <Plus className="w-6 h-6 text-white group-hover:text-blue-600 transition-colors" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-semibold text-white mb-1">
                      Report Item
                    </h3>
                    <p className="text-sm text-blue-100">
                      Lost or found something?
                    </p>
                  </div>
                </div>
              </button>
            </div>
          )}

          {/* Main Content */}
          {showSkeleton ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, index) => (
                  <ItemCardSkeleton key={index} />
                ))}
              </div>

              {/* Loading Indicator */}
              {fetchAttempts > 0 && (
                <div className="text-center mt-8">
                  <div className="inline-flex items-center gap-3 bg-blue-50 border border-blue-200 rounded-2xl px-6 py-4">
                    <RefreshCw className="w-5 h-5 text-blue-600 animate-spin" />
                    <div>
                      <p className="text-blue-800 font-medium">
                        {fetchAttempts < 3
                          ? `Connecting to server... (Attempt ${fetchAttempts}/3)`
                          : "Server unavailable - still trying..."}
                      </p>
                      <p className="text-blue-600 text-sm mt-1">
                        Please check your internet connection
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : (
            <>
              {filteredItems.length === 0 ? (
                <div className="text-center py-16">
                  <div className="max-w-md mx-auto">
                    <div className="text-6xl mb-6">🔍</div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-3">
                      {items.length === 0
                        ? "No Items Found"
                        : "No Matching Items"}
                    </h2>
                    <p className="text-gray-600 mb-8 leading-relaxed">
                      {items.length === 0
                        ? "There are no lost or found items to display at the moment. Be the first to report an item!"
                        : "No items match your current search criteria. Try adjusting your filters or search term."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <button
                        onClick={fetchItems}
                        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition font-medium flex items-center gap-2 justify-center"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                      </button>
                      <button
                        onClick={() => (window.location.href = "/form")}
                        className="px-6 py-3 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-medium flex items-center gap-2 justify-center"
                      >
                        <Plus className="w-4 h-4" />
                        Report New Item
                      </button>
                      {items.length > 0 && (
                        <button
                          onClick={() => {
                            setSearchTerm("");
                            setFilterType("all");
                            setFilterCategory("all");
                          }}
                          className="px-6 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition font-medium"
                        >
                          Clear Filters
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredItems.map((item) => (
                    <ItemCard key={item.id} item={item} />
                  ))}
                </div>
              )}
            </>
          )}

          {/* FAQ Section */}
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Get answers to common questions about our lost and found
                service.
              </p>
            </div>
            <div className="max-w-3xl mx-auto space-y-4">
              {faqs.map((faq, index) => (
                <FAQItem
                  key={index}
                  question={faq.question}
                  answer={faq.answer}
                  isOpen={activeFAQ === index}
                  onClick={() =>
                    setActiveFAQ(activeFAQ === index ? null : index)
                  }
                />
              ))}
            </div>
          </div>

          {/* Final CTA */}
          {!showSkeleton && (
            <div className="text-center mt-16">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-3xl p-12 text-white relative overflow-hidden">
                {/* Background pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute -top-24 -right-24 w-48 h-48 bg-white rounded-full"></div>
                  <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white rounded-full"></div>
                </div>

                <div className="relative z-10">
                  <h3 className="text-3xl font-bold mb-4">
                    Ready to Help Someone Today?
                  </h3>
                  <p className="text-blue-100 mb-8 max-w-2xl mx-auto text-lg">
                    Join our community of helpful individuals. Whether you've
                    lost something precious or found an item, your action could
                    make someone's day.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => (window.location.href = "/form")}
                      className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:bg-blue-50 transition-all shadow-2xl hover:shadow-2xl hover:scale-105 flex items-center gap-2 justify-center"
                    >
                      <Plus className="w-5 h-5" />
                      Report an Item Now
                    </button>
                    <button
                      onClick={fetchItems}
                      className="border-2 border-white text-white px-8 py-4 rounded-2xl font-semibold hover:bg-white hover:text-blue-600 transition-all flex items-center gap-2 justify-center"
                    >
                      <MessageCircle className="w-5 h-5" />
                      Browse All Items
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
      <div>
         <DevInfo/>
      </div>
        </div>
  
    
  );
}

export default Home;
