import React, { useState } from "react";
import { Laptop, Github, Mail, Linkedin, Globe, X } from "lucide-react";

const DevInfo = () => {
  const [open, setOpen] = useState(false);

  const devInfo = {
    name: "Abishek Sathiyan ML",
    role: "Software Developer",
    education: "MCA",
    village: "Methalodai",
    email: "abishek.sathiyan@gmail.com",
    linkedin: "https://linkedin.com/in/abishek04/",
    github: "https://github.com/AbishekSathiyan",
    portfolio: "https://abishek-portfolio-front-end.vercel.app/",
    techStack: [
      {
        name: "React",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg",
        color: "from-cyan-500 to-blue-600",
      },
      {
        name: "Node.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg",
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "Express.js",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg",
        color: "from-gray-600 to-gray-800",
      },
      {
        name: "MongoDB",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg",
        color: "from-green-500 to-emerald-600",
      },
      {
        name: "Tailwind",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg",
        color: "from-cyan-400 to-blue-500",
      },
      {
        name: "Python",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",
        color: "from-yellow-500 to-blue-600",
      },
      {
        name: "TypeScript",
        logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg",
        color: "from-blue-500 to-blue-700",
      },
    ],
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {/* Gradient text + fire flicker styles */}
      <style>
        {`
          .gradient-text {
            background: linear-gradient(90deg, #0000ff, #00ff00);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            display: inline-block;
          }
          .fire-flicker {
            display: inline-block;
            animation: flicker 1s infinite alternate;
          }
          @keyframes flicker {
            0% { transform: scale(1); opacity: 1; }
            25% { transform: scale(1.1); opacity: 0.9; }
            50% { transform: scale(0.95); opacity: 1; }
            75% { transform: scale(1.05); opacity: 0.95; }
            100% { transform: scale(1); opacity: 1; }
          }
        `}
      </style>

      {/* Short Card */}
      {!open && (
        <div
          onClick={() => setOpen(true)}
          className="cursor-pointer bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-3 rounded-2xl shadow-lg text-white text-center hover:scale-105 transition-transform"
        >
          <h1 className="font-bold">{devInfo.name}</h1>
          <p className="text-sm opacity-90">{devInfo.role}</p>
        </div>
      )}

      {/* Full Details Card */}
      {open && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-5 max-w-xs w-full shadow-2xl relative">
            <button
              onClick={() => setOpen(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-900"
            >
              <X size={20} />
            </button>

            {/* Header */}
            <div className="flex flex-col items-center gap-1 mb-4">
              <div className="flex items-center gap-2">
                <Laptop className="w-5 h-5 text-indigo-600" />
                <h2 className="font-bold text-lg">{devInfo.name}</h2>
              </div>
              <p className="text-sm text-gray-500">{devInfo.education}</p>
              <p className="text-sm text-gray-600">{devInfo.role}</p>

              {/* Village Name with Gradient + flickering Fire emojis */}
              <p className="text-sm font-bold mt-1">
                <span className="fire-flicker">🔥</span>
                <span className="gradient-text"> {devInfo.village} </span>
                <span className="fire-flicker">🔥</span>
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mb-4">
              <p className="text-xs font-bold uppercase mb-2 flex items-center gap-1">
                <Laptop className="w-3.5 h-3.5 text-blue-600" />
                Tech Stack - MERN Stack 
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {devInfo.techStack.map((tech) => (
                  <div
                    key={tech.name}
                    className="flex flex-col items-center text-xs"
                  >
                    <div
                      className={`p-1 rounded-lg bg-gradient-to-br ${tech.color} flex items-center justify-center`}
                    >
                      <img
                        src={tech.logo}
                        alt={tech.name}
                        className={`w-5 h-5 object-contain ${
                          tech.name === "Express.js"
                            ? "filter invert brightness-200"
                            : ""
                        }`}
                      />
                    </div>
                    <span className="mt-1 text-gray-700">{tech.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="grid grid-cols-2 gap-2">
              <a
                href={`mailto:${devInfo.email}`}
                className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
              >
                <Mail className="w-4 h-4 text-blue-600" /> Email
              </a>
              <a
                href={devInfo.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 transition"
              >
                <Github className="w-4 h-4 text-gray-800" /> GitHub
              </a>
              <a
                href={devInfo.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-blue-50 rounded-lg hover:bg-blue-100 transition"
              >
                <Linkedin className="w-4 h-4 text-blue-700" /> LinkedIn
              </a>
              <a
                href={devInfo.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 bg-purple-50 rounded-lg hover:bg-purple-100 transition"
              >
                <Globe className="w-4 h-4 text-purple-600" /> Portfolio
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DevInfo;
