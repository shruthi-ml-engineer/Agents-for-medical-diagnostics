import React from 'react';
import { motion } from 'framer-motion';
import { Brain, Heart, Settings as Lungs, Users } from 'lucide-react';

const Hero = () => {
  const scrollToUpload = () => {
    document.getElementById('upload')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-white/3 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            <span className="gradient-text">AI-Powered</span>
            <br />
            Medical Diagnostics
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto leading-relaxed">
            Revolutionary multi-agent system combining specialized medical expertise 
            for comprehensive patient diagnosis and treatment recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <button 
            onClick={scrollToUpload}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover-lift"
          >
            Start Diagnosis
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
        >
          {[
            { icon: Heart, label: 'Cardiology', color: 'text-red-400' },
            { icon: Brain, label: 'Psychology', color: 'text-blue-400' },
            { icon: Lungs, label: 'Pulmonology', color: 'text-green-400' },
            { icon: Users, label: 'Team Analysis', color: 'text-purple-400' },
          ].map((item, index) => (
            <div key={item.label} className="flex flex-col items-center space-y-3">
              <div className="relative">
                <div className="absolute inset-0 pulse-ring border border-white/20 rounded-full"></div>
                <div className="relative bg-white/5 p-4 rounded-full border border-white/10">
                  <item.icon className={`h-8 w-8 ${item.color}`} />
                </div>
              </div>
              <span className="text-sm font-medium text-gray-300">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;