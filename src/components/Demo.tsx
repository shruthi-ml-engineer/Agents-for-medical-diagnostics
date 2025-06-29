import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, FileText, Brain, Heart, Settings as Lungs, Users, CheckCircle, ArrowRight, Download } from 'lucide-react';

const Demo = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const agentResults = {
    cardiologist: {
      title: "Cardiologist Analysis",
      possibleCauses: [
        {
          condition: "Anxiety-induced cardiac symptoms",
          description: "The patient's symptoms of chest pain, palpitations, and feeling of impending doom, combined with normal cardiac workup, strongly suggest anxiety-related cardiac manifestations"
        },
        {
          condition: "GERD-related chest pain",
          description: "Given the patient's history of GERD, acid reflux could be contributing to chest pain that mimics cardiac symptoms"
        },
        {
          condition: "Caffeine/lifestyle-induced palpitations",
          description: "Irregular exercise, caffeine use, and high-stress job may contribute to palpitations and PVCs noted on Holter monitor"
        }
      ],
      recommendations: [
        "Continue monitoring with periodic ECGs if symptoms persist",
        "Consider stress testing if symptoms worsen or change in character",
        "Lifestyle modifications: reduce caffeine intake, regular exercise, stress management",
        "Coordinate with psychology for anxiety management as primary intervention"
      ]
    },
    psychologist: {
      title: "Psychology Assessment",
      mentalHealthIssues: [
        {
          condition: "Panic Disorder",
          description: "The patient's episodes of intense chest pain, palpitations, shortness of breath, dizziness, sweating, and feeling of impending doom lasting 10-20 minutes are classic panic attack symptoms"
        },
        {
          condition: "Generalized Anxiety Disorder",
          description: "Pre-existing anxiety diagnosis with family history (mother with GAD) and high-stress occupation contributing to overall anxiety levels"
        },
        {
          condition: "Health Anxiety/Cardiac Anxiety",
          description: "Fear of having a heart attack despite normal cardiac workup indicates specific health-related anxiety"
        }
      ],
      recommendations: [
        "Increase frequency of CBT sessions focusing on panic disorder management",
        "Consider panic-specific CBT techniques (interoceptive exposure, breathing exercises)",
        "Evaluate current benzodiazepine use - consider tapering with proper support",
        "Stress management techniques for work-related stressors",
        "Psychoeducation about panic attacks vs. heart attacks to reduce health anxiety"
      ]
    },
    pulmonologist: {
      title: "Pulmonology Assessment",
      respiratoryIssues: [
        {
          condition: "Anxiety-induced hyperventilation",
          description: "Shortness of breath during panic episodes likely due to hyperventilation syndrome associated with anxiety"
        },
        {
          condition: "GERD-related respiratory symptoms",
          description: "Acid reflux can cause respiratory symptoms including shortness of breath and chest discomfort"
        },
        {
          condition: "Stress-related breathing patterns",
          description: "High-stress lifestyle may contribute to irregular breathing patterns and perceived shortness of breath"
        }
      ],
      recommendations: [
        "Breathing exercises and diaphragmatic breathing training",
        "Pulmonary function tests if symptoms persist or worsen",
        "Consider sleep study if sleep disturbances are present",
        "Coordinate with GERD management to address potential respiratory impact",
        "Monitor for any changes in respiratory symptoms that might indicate other conditions"
      ]
    }
  };

  const finalDiagnosis = {
    primaryDiagnoses: [
      {
        condition: "Panic Disorder",
        description: "Recurrent panic attacks with characteristic symptoms of chest pain, palpitations, shortness of breath, dizziness, sweating, and feeling of impending doom"
      },
      {
        condition: "Generalized Anxiety Disorder",
        description: "Underlying anxiety condition exacerbated by high-stress work environment"
      },
      {
        condition: "GERD with cardiac symptom mimicry",
        description: "Gastroesophageal reflux contributing to chest pain and potentially triggering anxiety episodes"
      }
    ],
    contributingFactors: [
      "High-stress occupation as investment banker",
      "Family history of anxiety disorders",
      "Lifestyle factors (irregular exercise, caffeine use)",
      "Health anxiety focused on cardiac concerns"
    ],
    treatmentPlan: [
      {
        priority: "Primary",
        treatment: "Intensive CBT for panic disorder with panic-specific interventions"
      },
      {
        priority: "Secondary",
        treatment: "GERD optimization with dietary modifications and PPI management"
      },
      {
        priority: "Supportive",
        treatment: "Lifestyle modifications including stress management, regular exercise, and caffeine reduction"
      },
      {
        priority: "Monitoring",
        treatment: "Periodic cardiac follow-up for reassurance and symptom tracking"
      }
    ],
    prognosis: "Excellent with proper anxiety management and lifestyle modifications. Symptoms should significantly improve with targeted panic disorder treatment."
  };

  const demoSteps = [
    {
      icon: FileText,
      title: 'Medical Report Loaded',
      description: 'Patient: Michael Johnson, 29M - Chest pain, palpitations, shortness of breath',
      status: 'completed',
      details: 'Processing medical history, symptoms, and diagnostic test results...'
    },
    {
      icon: Heart,
      title: 'Cardiologist Analysis',
      description: 'Analyzing cardiac symptoms, ECG results, and cardiovascular risk factors',
      status: activeStep >= 1 ? 'completed' : 'pending',
      details: 'Evaluating normal ECG, cardiac enzymes, and ruling out structural heart disease...'
    },
    {
      icon: Brain,
      title: 'Psychology Assessment',
      description: 'Evaluating mental health factors, anxiety patterns, and behavioral symptoms',
      status: activeStep >= 2 ? 'completed' : 'pending',
      details: 'Analyzing panic attack symptoms, anxiety history, and psychological triggers...'
    },
    {
      icon: Lungs,
      title: 'Pulmonology Review',
      description: 'Assessing respiratory symptoms and breathing patterns',
      status: activeStep >= 3 ? 'completed' : 'pending',
      details: 'Examining shortness of breath, hyperventilation, and respiratory function...'
    },
    {
      icon: Users,
      title: 'Team Synthesis',
      description: 'Integrating all specialist analyses for comprehensive diagnosis',
      status: activeStep >= 4 ? 'completed' : 'pending',
      details: 'Correlating findings across specialties and generating final diagnosis...'
    },
  ];

  const runDemo = () => {
    setIsRunning(true);
    setActiveStep(0);
    setShowResults(false);
    
    const interval = setInterval(() => {
      setActiveStep((prev) => {
        if (prev >= 4) {
          clearInterval(interval);
          setIsRunning(false);
          setShowResults(true);
          return prev;
        }
        return prev + 1;
      });
    }, 2000);
  };

  const downloadReport = () => {
    const reportContent = generateReportContent();
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Medical_Diagnosis_Report_Michael_Johnson.txt';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const generateReportContent = () => {
    const date = new Date().toLocaleDateString();
    return `
MEDICAL AI DIAGNOSTIC REPORT
Generated on: ${date}

PATIENT INFORMATION
Name: Michael Johnson
Age: 29
Gender: Male
Patient ID: 345678

CARDIOLOGIST ANALYSIS
${agentResults.cardiologist.possibleCauses.map((cause, index) => 
  `${index + 1}. ${cause.condition}
   ${cause.description}`
).join('\n\n')}

Recommended Next Steps:
${agentResults.cardiologist.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

PSYCHOLOGY ASSESSMENT
${agentResults.psychologist.mentalHealthIssues.map((issue, index) => 
  `${index + 1}. ${issue.condition}
   ${issue.description}`
).join('\n\n')}

Recommended Next Steps:
${agentResults.psychologist.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

PULMONOLOGY ASSESSMENT
${agentResults.pulmonologist.respiratoryIssues.map((issue, index) => 
  `${index + 1}. ${issue.condition}
   ${issue.description}`
).join('\n\n')}

Recommended Next Steps:
${agentResults.pulmonologist.recommendations.map((rec, index) => `${index + 1}. ${rec}`).join('\n')}

FINAL MULTIDISCIPLINARY DIAGNOSIS

Primary Diagnoses:
${finalDiagnosis.primaryDiagnoses.map((diagnosis, index) => 
  `${index + 1}. ${diagnosis.condition}
   ${diagnosis.description}`
).join('\n\n')}

Contributing Factors:
${finalDiagnosis.contributingFactors.map((factor, index) => `${index + 1}. ${factor}`).join('\n')}

Integrated Treatment Plan:
${finalDiagnosis.treatmentPlan.map((plan, index) => 
  `${index + 1}. ${plan.priority}: ${plan.treatment}`
).join('\n')}

Prognosis:
${finalDiagnosis.prognosis}

---
This report was generated by MedAI Diagnostics multi-agent system.
For medical decisions, please consult with qualified healthcare professionals.
    `.trim();
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
            AI Analysis in Action
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Watch our specialized AI agents collaborate to analyze the medical case step by step
          </p>
          
          <button
            onClick={runDemo}
            disabled={isRunning}
            className="bg-white text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-200 transition-all duration-300 hover-lift disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 mx-auto"
          >
            <Play className="h-5 w-5" />
            <span>{isRunning ? 'Running Analysis...' : 'Run AI Analysis'}</span>
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Analysis Steps */}
          <div className="border-gradient rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-white">Analysis Progress</h3>
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
                    <h4 className={`font-semibold mb-1 ${
                      step.status === 'completed' ? 'text-white' : 'text-gray-400'
                    }`}>
                      {step.title}
                    </h4>
                    <p className={`text-sm mb-2 ${
                      step.status === 'completed' ? 'text-gray-300' : 'text-gray-500'
                    }`}>
                      {step.description}
                    </p>
                    {activeStep === index && isRunning && (
                      <p className="text-xs text-blue-400 italic">
                        {step.details}
                      </p>
                    )}
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
          </div>

          {/* Agent Results */}
          <div className="border-gradient rounded-2xl p-8">
            <h3 className="text-2xl font-semibold mb-6 text-white">Agent Analysis Results</h3>
            
            {activeStep >= 1 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Heart className="h-5 w-5 text-red-400" />
                    <h4 className="font-semibold text-red-400">Cardiologist Report</h4>
                  </div>
                  {activeStep > 1 ? (
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-white mb-2">Possible Causes:</h5>
                        <div className="space-y-2">
                          {agentResults.cardiologist.possibleCauses.map((cause, index) => (
                            <div key={index} className="bg-white/5 rounded p-3">
                              <h6 className="font-medium text-red-300 mb-1">{cause.condition}</h6>
                              <p className="text-sm text-gray-300">{cause.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-white mb-2">Recommendations:</h5>
                        <ul className="space-y-1">
                          {agentResults.cardiologist.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start">
                              <span className="text-red-400 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 bg-red-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span>Analyzing cardiac symptoms...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeStep >= 2 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Brain className="h-5 w-5 text-blue-400" />
                    <h4 className="font-semibold text-blue-400">Psychology Report</h4>
                  </div>
                  {activeStep > 2 ? (
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-white mb-2">Mental Health Issues:</h5>
                        <div className="space-y-2">
                          {agentResults.psychologist.mentalHealthIssues.map((issue, index) => (
                            <div key={index} className="bg-white/5 rounded p-3">
                              <h6 className="font-medium text-blue-300 mb-1">{issue.condition}</h6>
                              <p className="text-sm text-gray-300">{issue.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-white mb-2">Recommendations:</h5>
                        <ul className="space-y-1">
                          {agentResults.psychologist.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start">
                              <span className="text-blue-400 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span>Evaluating psychological factors...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {activeStep >= 3 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6"
              >
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <Lungs className="h-5 w-5 text-green-400" />
                    <h4 className="font-semibold text-green-400">Pulmonology Report</h4>
                  </div>
                  {activeStep > 3 ? (
                    <div className="space-y-4">
                      <div>
                        <h5 className="font-medium text-white mb-2">Respiratory Issues:</h5>
                        <div className="space-y-2">
                          {agentResults.pulmonologist.respiratoryIssues.map((issue, index) => (
                            <div key={index} className="bg-white/5 rounded p-3">
                              <h6 className="font-medium text-green-300 mb-1">{issue.condition}</h6>
                              <p className="text-sm text-gray-300">{issue.description}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h5 className="font-medium text-white mb-2">Recommendations:</h5>
                        <ul className="space-y-1">
                          {agentResults.pulmonologist.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm text-gray-300 flex items-start">
                              <span className="text-green-400 mr-2">•</span>
                              {rec}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-sm text-gray-400">
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse"></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                        <div className="w-1 h-1 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                      </div>
                      <span>Assessing respiratory symptoms...</span>
                    </div>
                  )}
                </div>
              </motion.div>
            )}

            {!showResults && activeStep < 4 && (
              <div className="text-center py-8 text-gray-500">
                <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Waiting for specialist analyses to complete...</p>
              </div>
            )}
          </div>
        </div>

        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mt-12"
          >
            <div className="border-gradient rounded-2xl p-8">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-500/20 p-3 rounded-lg">
                    <Users className="h-8 w-8 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-semibold text-white">Final Multidisciplinary Diagnosis</h3>
                    <p className="text-gray-400">Integrated analysis from all specialists</p>
                  </div>
                </div>
                <button
                  onClick={downloadReport}
                  className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition-all duration-300 hover-lift flex items-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Report</span>
                </button>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-purple-500/10 border border-purple-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-purple-300 mb-4">Primary Diagnoses</h4>
                    <div className="space-y-3">
                      {finalDiagnosis.primaryDiagnoses.map((diagnosis, index) => (
                        <div key={index} className="bg-white/5 rounded p-3">
                          <h5 className="font-medium text-white mb-1">{diagnosis.condition}</h5>
                          <p className="text-sm text-gray-300">{diagnosis.description}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-orange-500/10 border border-orange-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-orange-300 mb-4">Contributing Factors</h4>
                    <ul className="space-y-2">
                      {finalDiagnosis.contributingFactors.map((factor, index) => (
                        <li key={index} className="text-sm text-gray-300 flex items-start">
                          <span className="text-orange-400 mr-2">•</span>
                          {factor}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-green-300 mb-4">Integrated Treatment Plan</h4>
                    <div className="space-y-3">
                      {finalDiagnosis.treatmentPlan.map((plan, index) => (
                        <div key={index} className="bg-white/5 rounded p-3">
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`px-2 py-1 rounded text-xs font-medium ${
                              plan.priority === 'Primary' ? 'bg-red-500/20 text-red-300' :
                              plan.priority === 'Secondary' ? 'bg-yellow-500/20 text-yellow-300' :
                              plan.priority === 'Supportive' ? 'bg-blue-500/20 text-blue-300' :
                              'bg-gray-500/20 text-gray-300'
                            }`}>
                              {plan.priority}
                            </span>
                          </div>
                          <p className="text-sm text-gray-300">{plan.treatment}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-6">
                    <h4 className="text-lg font-semibold text-blue-300 mb-4">Prognosis</h4>
                    <p className="text-gray-300">{finalDiagnosis.prognosis}</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-center space-x-6">
                <div className="flex items-center space-x-2 text-green-400">
                  <CheckCircle className="h-5 w-5" />
                  <span className="text-sm font-medium">Analysis Complete</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="flex items-center space-x-2 text-blue-400">
                  <FileText className="h-5 w-5" />
                  <span className="text-sm font-medium">Report Generated</span>
                </div>
                <ArrowRight className="h-4 w-4 text-gray-400" />
                <div className="flex items-center space-x-2 text-purple-400">
                  <Download className="h-5 w-5" />
                  <span className="text-sm font-medium">Ready for Download</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default Demo;