import { motion } from 'framer-motion';
import { Upload, Brain, Users, FileText } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Upload,
      title: 'Upload Medical Report',
      description: 'Securely upload patient medical reports and diagnostic data to our platform.',
      step: '01',
    },
    {
      icon: Brain,
      title: 'AI Agent Analysis',
      description: 'Specialized agents analyze the data from cardiology, psychology, and pulmonology perspectives.',
      step: '02',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Multi-disciplinary team agent synthesizes individual analyses for comprehensive insights.',
      step: '03',
    },
    {
      icon: FileText,
      title: 'Generate Diagnosis',
      description: 'Receive detailed diagnostic report with treatment recommendations and next steps.',
      step: '04',
    },
  ];

  return (
    <section id="how-it-works" className="py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
            How It Works
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Our streamlined process delivers comprehensive medical insights in four simple steps
          </p>
        </motion.div>

        <div className="relative">
          {/* Connection lines */}
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-y-1/2"></div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative text-center"
              >
                <div className="relative mb-6">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-8 hover-lift">
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-black border border-white/20 rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                      {step.step}
                    </div>
                    <step.icon className="h-12 w-12 text-white mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-white">
                      {step.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;