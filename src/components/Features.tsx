import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Shield, Target, Clock, Brain, Network } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Brain,
      title: 'Multi-Agent Intelligence',
      description: 'Specialized AI agents for cardiology, psychology, and pulmonology working in harmony.',
    },
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Concurrent processing delivers comprehensive diagnoses in seconds, not hours.',
    },
    {
      icon: Shield,
      title: 'Medical Grade Accuracy',
      description: 'Built on proven medical knowledge bases with continuous learning capabilities.',
    },
    {
      icon: Target,
      title: 'Precision Diagnostics',
      description: 'Advanced pattern recognition identifies subtle symptoms others might miss.',
    },
    {
      icon: Clock,
      title: 'Real-time Analysis',
      description: 'Instant processing of medical reports with immediate actionable insights.',
    },
    {
      icon: Network,
      title: 'Collaborative Intelligence',
      description: 'Team-based approach mirrors real-world medical consultation practices.',
    },
  ];

  return (
    <section id="features" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            Revolutionary Features
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Experience the future of medical diagnostics with our cutting-edge AI technology
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="border-gradient rounded-2xl p-8 hover-lift group"
            >
              <div className="mb-6">
                <div className="bg-white/5 p-3 rounded-xl w-fit group-hover:bg-white/10 transition-colors duration-300">
                  <feature.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-4 text-white">
                {feature.title}
              </h3>
              <p className="text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;