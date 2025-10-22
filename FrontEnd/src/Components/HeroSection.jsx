// components/HeroSection.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="bg-gradient-to-br from-blue-50 to-indigo-100 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mb-6">
            Lost Something
            <span className="text-blue-600 block">Important?</span>
          </h1>
          
          {/* Subtitle */}
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
            Don't worry! Our community-powered Lost & Found platform helps reunite people with their belongings. 
            Report lost items or help others find what they've lost.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">1,000+</div>
              <div className="text-gray-600">Items Reunited</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Active Users</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link 
              to="/form" 
              className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-colors font-semibold text-lg shadow-lg hover:shadow-xl transition-shadow"
            >
              Report Lost Item
            </Link>
            <Link 
              to="/form" 
              className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-600 hover:text-white transition-colors font-semibold text-lg"
            >
              Report Found Item
            </Link>
          </div>

          {/* Quick Search */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Quick Search</h3>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="text" 
                placeholder="Search for lost items (e.g., 'iPhone', 'Wallet')"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold whitespace-nowrap">
                Search Items
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;