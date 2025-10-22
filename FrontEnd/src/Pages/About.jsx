// pages/About.jsx
import React from "react";
import {
  Heart,
  Shield,
  Zap,
  Users,
  ArrowRight,
  Star,
  Target,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Contact from "./Contact";
import DevInfo from "../Components/DevInfo"

// Animation components
const FadeIn = ({ children, delay = 0, className = "" }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const SlideIn = ({
  children,
  direction = "left",
  delay = 0,
  className = "",
}) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const x = direction === "left" ? -50 : 50;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.8, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const StaggerContainer = ({ children, className = "" }) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, threshold: 0.1 }}
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.2,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const About = () => {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "We understand how stressful losing things can be and approach every case with empathy.",
      color: "from-rose-500 to-pink-600",
      bgColor: "bg-rose-50",
      textColor: "text-rose-700",
    },
    {
      icon: Shield,
      title: "Trust",
      description:
        "Your privacy and security are our top priorities in every interaction.",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      textColor: "text-blue-700",
    },
    {
      icon: Zap,
      title: "Efficiency",
      description:
        "Quick reporting and smart matching to reunite items faster than ever.",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      textColor: "text-amber-700",
    },
    {
      icon: Users,
      title: "Community",
      description: "People helping people create positive change together.",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
  ];

  const stats = [
    { number: "15,000+", label: "Items Reported", delay: 0, icon: "📝" },
    { number: "12,000+", label: "Successful Returns", delay: 0.2, icon: "🎉" },
    { number: "50,000+", label: "Community Members", delay: 0.4, icon: "👥" },
    { number: "48h", label: "Average Return Time", delay: 0.6, icon: "⚡" },
  ];

  const contactInfo = [
    {
      icon: Mail,
      text: "loges00777@gmail.com",
      subtext: "Email us anytime",
    },
    { icon: MapPin, text: "Methaloadi,Ramanathapuram", subtext: "TamilNadu" },
    { icon: Phone, text: "+91 91508 04220", subtext: "Call us Mon-Fri" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-100/30">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            y: [0, -40, 0],
            x: [0, 20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-200/40 to-purple-200/40 rounded-full blur-4xl opacity-30"
        />
        <motion.div
          animate={{
            y: [0, 60, 0],
            x: [0, -30, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className="absolute bottom-32 right-16 w-96 h-96 bg-gradient-to-r from-green-200/30 to-cyan-200/30 rounded-full blur-4xl opacity-20"
        />
        {/* New floating particles */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -100, 0],
              x: [0, Math.random() * 50 - 25, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
            className="absolute w-2 h-2 bg-blue-300/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      {/* Enhanced Hero Section */}
      <div className="relative bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 text-white py-24 px-4 overflow-hidden">
        {/* Animated gradient overlay */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0 bg-gradient-to-br from-blue-600/90 via-purple-600/80 to-indigo-700/90"
        />

        {/* Floating elements */}
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-4 h-4 bg-white/30 rounded-full"
        />
        <motion.div
          animate={{
            y: [0, 15, 0],
            rotate: [0, -3, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-white/20 rounded-full"
        />

        <div className="max-w-6xl mx-auto text-center relative z-10">
          <FadeIn delay={0.2}>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-lg rounded-2xl px-6 py-3 mb-8 border border-white/30 shadow-lg"
            >
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Star className="w-5 h-5" />
              </motion.div>
              <span className="text-sm font-semibold tracking-wide">
                Our Story & Mission
              </span>
            </motion.div>
          </FadeIn>

          <FadeIn delay={0.4}>
            <motion.h1
              className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent leading-tight"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              About Lost &<br />
              Found Hub
            </motion.h1>
          </FadeIn>

          <FadeIn delay={0.6}>
            <p className="text-xl md:text-2xl text-blue-100 max-w-4xl mx-auto leading-relaxed font-light mb-8">
              Transforming lost items into found memories through cutting-edge
              technology and a compassionate global community.
            </p>
          </FadeIn>

          <FadeIn delay={0.8}>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              whileHover={{ y: -5 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-white text-blue-600 px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group shadow-lg hover:bg-blue-50"
              >
                Join Our Community
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-white/50 text-white px-8 py-4 rounded-2xl font-semibold backdrop-blur-sm hover:bg-white/10 transition-all duration-300 shadow-lg"
              >
                Learn More
              </motion.button>
            </motion.div>
          </FadeIn>
        </div>
      </div>

      {/* Enhanced Mission Section */}
      <div className="relative py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <SlideIn direction="left" delay={0.2}>
              <div className="space-y-8">
                <div>
                  <motion.div
                    className="inline-flex items-center gap-2 text-blue-600 font-semibold text-sm uppercase tracking-wide mb-4"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6 }}
                  >
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                    Our Purpose
                  </motion.div>
                  <motion.h2
                    className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.8 }}
                  >
                    Reuniting What's Lost with What's Loved
                  </motion.h2>
                  <motion.p
                    className="text-lg text-gray-700 mb-6 leading-relaxed font-medium"
                    whileInView={{ opacity: 1, x: 0 }}
                    initial={{ opacity: 0, x: -30 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Every lost item has a story, and every recovery creates a
                    new chapter of joy. We're here to transform moments of panic
                    into stories of celebration through innovative technology
                    and human connection.
                  </motion.p>
                </div>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                >
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-2xl font-semibold hover:shadow-2xl transition-all duration-300 flex items-center gap-3 group shadow-lg flex-1 justify-center"
                  >
                    Start Finding
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-2xl font-semibold hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-lg flex-1 justify-center"
                  >
                    Our Story
                  </motion.button>
                </motion.div>
              </div>
            </SlideIn>

            <SlideIn direction="right" delay={0.4}>
              <motion.div
                className="relative"
                whileHover={{ y: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                  {/* Background pattern */}
                  <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-purple-600" />
                  </div>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 mb-8">
                      <motion.div
                        className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg"
                        whileHover={{ rotate: 5, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <Target className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-2xl font-bold text-gray-900">
                          Our Vision
                        </h3>
                        <p className="text-gray-600 font-medium">
                          A world where no lost item stays lost
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      {[
                        { text: "Instant item reporting", emoji: "🚀" },
                        { text: "Secure communication", emoji: "🔒" },
                        { text: "Global community", emoji: "🌍" },
                      ].map((item, index) => (
                        <motion.div
                          key={item.text}
                          className="flex items-center gap-4 p-3 rounded-xl hover:bg-white/50 transition-colors duration-300"
                          initial={{ opacity: 0, x: 20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{
                            duration: 0.6,
                            delay: index * 0.1 + 0.6,
                          }}
                        >
                          <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 200 }}
                            className="text-2xl"
                          >
                            {item.emoji}
                          </motion.div>
                          <span className="text-gray-700 font-medium flex-1">
                            {item.text}
                          </span>
                          <motion.div
                            initial={{ scale: 0 }}
                            whileInView={{ scale: 1 }}
                            transition={{ delay: index * 0.1 + 0.8 }}
                          >
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                          </motion.div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating badges */}
                <motion.div
                  initial={{ scale: 0, rotate: -180 }}
                  whileInView={{ scale: 1, rotate: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1 }}
                  className="absolute -top-4 -right-4 bg-gradient-to-r from-emerald-500 to-green-600 text-white px-6 py-3 rounded-2xl shadow-2xl z-20"
                >
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    <span className="font-bold text-sm">80% Success Rate</span>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ scale: 0, y: 50 }}
                  whileInView={{ scale: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 200, delay: 1.2 }}
                  className="absolute -bottom-4 -left-4 bg-gradient-to-r from-orange-500 to-red-500 text-white px-6 py-3 rounded-2xl shadow-2xl z-20"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span className="font-bold text-sm">Fast Returns</span>
                  </div>
                </motion.div>
              </motion.div>
            </SlideIn>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="py-20 px-4 bg-gradient-to-br from-slate-50/50 to-blue-50/50">
        <div className="max-w-6xl mx-auto">
          <FadeIn className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Making a Difference
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
              Join thousands of satisfied users who've experienced the joy of
              reunion
            </p>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{
                  scale: 1.05,
                  y: -8,
                }}
                className="text-center group"
              >
                <div className="bg-white/80 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 h-full">
                  <motion.div
                    className="text-3xl mb-4"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: stat.delay,
                    }}
                  >
                    {stat.icon}
                  </motion.div>
                  <motion.div
                    className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-3"
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: stat.delay + 0.1,
                    }}
                  >
                    {stat.number}
                  </motion.div>
                  <div className="text-gray-600 font-semibold text-sm uppercase tracking-wide group-hover:text-gray-900 transition-colors">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </StaggerContainer>
        </div>
      </div>

      {/* Enhanced Values Section */}
      <div className="py-24 px-4">
        <div className="max-w-6xl mx-auto">
          <FadeIn>
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Our Core Values
              </h2>
              <p className="text-gray-600 text-lg max-w-2xl mx-auto font-medium">
                The principles that guide our mission and shape every
                interaction in our community
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{
                  y: -12,
                  scale: 1.03,
                }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                  type: "spring",
                  stiffness: 300,
                }}
                className="group"
              >
                <div
                  className={`${value.bgColor} rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 h-full relative overflow-hidden`}
                >
                  {/* Animated background element */}
                  <motion.div
                    className={`absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-r ${value.color} rounded-full opacity-10 group-hover:opacity-20 transition-opacity duration-500`}
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 20,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <div className="relative z-10">
                    <motion.div
                      className={`p-4 rounded-2xl bg-gradient-to-r ${value.color} w-16 h-16 flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <value.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3
                      className={`text-xl font-bold ${value.textColor} mb-4 group-hover:${value.textColor}/80 transition-colors`}
                    >
                      {value.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed font-medium">
                      {value.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Contact CTA */}
      <div className="py-20 px-4">
        <FadeIn>
          <motion.div
            className="bg-gradient-to-br from-blue-600 via-purple-600 to-indigo-700 rounded-3xl p-12 text-white text-center shadow-2xl relative overflow-hidden"
            whileInView={{ scale: [0.95, 1] }}
            transition={{ duration: 0.8 }}
          >
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.15)_1px,transparent_0)] bg-[length:20px_20px]" />
            </div>

            <div className="relative z-10">
              <motion.h2
                className="text-4xl md:text-5xl font-bold mb-6"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 30 }}
                transition={{ duration: 0.6 }}
              >
                Ready to Get Started?
              </motion.h2>
              <motion.p
                className="text-blue-100 text-lg md:text-xl mb-12 max-w-2xl mx-auto font-light leading-relaxed"
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                Join our community today and experience the peace of mind that
                comes with knowing your lost items have a way home.
              </motion.p>

              <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12"
                variants={{
                  hidden: { opacity: 0 },
                  visible: {
                    opacity: 1,
                    transition: {
                      staggerChildren: 0.2,
                    },
                  },
                }}
                initial="hidden"
                whileInView="visible"
              >
                {contactInfo.map((item, index) => (
                  <motion.div
                    key={item.text}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    className="flex flex-col items-center gap-3 p-6 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/15 transition-all duration-300"
                  >
                    <item.icon className="w-8 h-8 text-blue-200" />
                    <div className="text-lg font-semibold">{item.text}</div>
                    <div className="text-blue-200 text-sm">{item.subtext}</div>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div
                className="flex flex-col sm:flex-row gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-blue-600 px-12 py-4 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all duration-300 shadow-2xl flex items-center gap-3 justify-center"
                >
                  Get Started Free
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </motion.button>
                <motion.button
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 20px 40px rgba(255,255,255,0.1)",
                  }}
                  whileTap={{ scale: 0.95 }}
                  className="border-2 border-white/50 text-white px-12 py-4 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all duration-300 shadow-2xl"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </FadeIn>
      </div>

      <Contact />
      <DevInfo/>
    </div>
  );
};

export default About;
