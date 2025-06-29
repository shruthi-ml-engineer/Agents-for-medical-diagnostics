import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, FileText, Brain, Heart, Lungs, Users, CheckCircle } from 'lucide-react';

const Demo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  const demoSteps = [
    {
      icon: FileText,
      title: 'Medical Report Loaded',
      description: 'Patient: Michael Johnson, 29M - Chest pain, palpitations, shortness of breath',
      status: 'completed',
    },
    {
      icon: Heart,
      title: 'Cardiologist Analysis',
      description: 'Normal ECG, cardiac enzymes within limits. Ruling out structural heart disease.',
      status: activeStep >= 1 ? 'completed' : 'pending',
    },
    {
      icon: Brain,
      title: 'Psychology Assessment',
      description: 'History of anxiety disorder. Symptoms consistent with panic attacks.',
      status: activeStep >= 2 ? 'completed' : 'pending',
    },
    {
      icon: Lungs,
      title: 'Pulmonology Review',
      description: 'Clear breath sounds. Anxiety-induced hyperventilation suspected.',
      status: activeStep >= 3 ? 'completed' : 'pending',
    },
    {
      icon: Users,
      title: 'Team Synthesis',
      description: 'Final diagnosis: Panic Disorder with GERD contribution.',
      status: activeStep >= 4 ? 'completed' : 'pending',
    },
  ];

  const runDemo = () => {
    setIsRunning(true);
    setActiveStep(0);
    
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsRunning(false);
          return prev;
        }
        return prev + 1;
      });
    }, 1500);
  };

  return (
    <section id="demo" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            See It In Action
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Watch our AI agents collaborate to diagnose a real medical case
          </p>
          
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            <Play className="h-5 w-5" />
            <span>{isRunning ? 'Running Analysis...' : 'Run Demo'}</span>
          </button>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <div className="border-gradient rounded-2xl p-8">
            <div className="space-y-6">
              {demoSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0.5 }}
                  animate={{ 
                    opacity: step.status === 'completed' ? 1 : 0.5,
                    scale: activeStep === index && isRunning ? 1.02 : 1
                  }}
                  transition={{ duration: 0.3 }}
                  className={`flex items-start space-x-4 p-4 rounded-xl transition-all duration-300 ${
                    step.status === 'completed' ? 'bg-white/5' : 'bg-transparent'
                  }`}
                >
                  <div className={`p-2 rounded-lg ${
                    step.status === 'completed' ? 'bg-green-500/20' : 'bg-white/10'
                  }`}>
                    {step.status === 'completed' ? (
                      <CheckCircle className="h-6 w-6 text-green-400" />
                    ) : (
                      <step.icon className="h-6 w-6 text-gray-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className={`font-semibold mb-1 ${
                      step.status === 'completed' ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h3>
                    <p className={`text-sm ${
                      step.status === 'completed' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                  </div>
                  {activeStep === index && isRunning && (
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>

            {activeStep >= 4 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mt-8 p-6 bg-green-500/10 border border-green-500/20 rounded-xl"
              >
                <h4 className="font-semibold text-green-400 mb-2">Final Diagnosis Complete</h4>
                <p className="text-sm text-gray-300">
                  • Panic Disorder/Anxiety-Related Episodes<br/>
                  • Gastroesophageal Reflux Disease (GERD)<br/>
                  • Anxiety-Induced Hyperventilation
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Demo;