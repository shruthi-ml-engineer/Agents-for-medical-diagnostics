import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Stethoscope, Brain, Database, Activity, Users, TrendingUp, CheckCircle } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const HomePage: React.FC = () => {
  const navigate = useNavigate()
  const [recentDiagnoses] = useState([
    { id: '12345', patient: 'John Doe', condition: 'Common Cold', confidence: 92, status: 'completed', timestamp: '2 min ago' },
    { id: '12346', patient: 'Jane Smith', condition: 'Flu', confidence: 87, status: 'completed', timestamp: '15 min ago' },
    { id: '12347', patient: 'Mike Johnson', condition: 'Allergic Rhinitis', confidence: 94, status: 'completed', timestamp: '1 hour ago' },
  ])

  const systemMetrics = [
    { label: 'Total Diagnoses Today', value: '47', icon: Stethoscope, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'AI Model Accuracy', value: '94.2%', icon: Brain, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'Active Patients', value: '23', icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
    { label: 'System Uptime', value: '99.9%', icon: Activity, color: 'text-orange-600', bg: 'bg-orange-50' },
  ]

  const quickActions = [
    {
      title: 'Symptom Checker',
      description: 'Analyze patient symptoms using AI-powered diagnostic algorithms',
      icon: Stethoscope,
      color: 'bg-blue-500',
      hoverColor: 'hover:bg-blue-600',
      path: '/symptom-checker',
      features: ['Multi-symptom analysis', 'Probability scoring', 'Treatment recommendations']
    },
    {
      title: 'Diagnosis Explainer',
      description: 'Get detailed explanations of medical conditions and diagnoses',
      icon: Brain,
      color: 'bg-green-500',
      hoverColor: 'hover:bg-green-600',
      path: '/diagnosis-explainer',
      features: ['Condition definitions', 'Symptom mapping', 'Treatment options']
    },
    {
      title: 'Patient Data Management',
      description: 'Access and manage comprehensive patient records and history',
      icon: Database,
      color: 'bg-purple-500',
      hoverColor: 'hover:bg-purple-600',
      path: '/patient-data',
      features: ['Patient records', 'Medical history', 'Data analytics']
    }
  ]

  return (
    <div className="space-y-8">
      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gradient-to-r from-blue-50 to-white rounded-2xl p-8 border border-blue-100"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Medical Diagnostics AI Platform
            </h1>
            <p className="text-xl text-gray-600 mb-4">
              Intelligent agents for medical diagnostics using LLMs and structured knowledge bases
            </p>
            <div className="flex items-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>System Online</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                <span>AI Models Active</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                <span>Knowledge Base Updated</span>
              </div>
            </div>
          </div>
          <div className="hidden lg:block">
            <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center">
              <Stethoscope className="w-16 h-16 text-blue-600" />
            </div>
          </div>
        </div>
      </motion.div>

      {/* System Metrics */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {systemMetrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{metric.label}</p>
                <p className="text-3xl font-bold text-gray-900">{metric.value}</p>
              </div>
              <div className={`p-3 rounded-lg ${metric.bg}`}>
                <metric.icon className={`w-6 h-6 ${metric.color}`} />
              </div>
            </div>
          </div>
        ))}
      </motion.div>

      {/* Main Features */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-xl p-8 border border-gray-100 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Core Diagnostic Features</h2>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {quickActions.map((action, index) => (
            <motion.div
              key={action.title}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="group cursor-pointer"
              onClick={() => navigate(action.path)}
            >
              <div className="bg-gray-50 rounded-xl p-6 border border-gray-100 hover:border-gray-200 transition-all duration-200 hover:shadow-md">
                <div className={`w-12 h-12 ${action.color} ${action.hoverColor} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <action.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{action.title}</h3>
                <p className="text-gray-600 mb-4">{action.description}</p>
                <div className="space-y-2">
                  {action.features.map((feature, idx) => (
                    <div key={idx} className="flex items-center space-x-2 text-sm text-gray-500">
                      <CheckCircle className="w-4 h-4 text-green-500" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Recent Activity Dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Diagnoses */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Recent Diagnoses</h3>
            <button 
              onClick={() => navigate('/patient-data')}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View All
            </button>
          </div>
          <div className="space-y-4">
            {recentDiagnoses.map((diagnosis) => (
              <div key={diagnosis.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <Stethoscope className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{diagnosis.patient}</p>
                    <p className="text-sm text-gray-600">{diagnosis.condition}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-sm font-medium text-green-600">{diagnosis.confidence}%</span>
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  </div>
                  <p className="text-xs text-gray-500">{diagnosis.timestamp}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* System Status */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">System Status</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">AI Models</p>
                  <p className="text-sm text-gray-600">All diagnostic models operational</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">Online</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900">Knowledge Base</p>
                  <p className="text-sm text-gray-600">Medical data synchronized</p>
                </div>
              </div>
              <span className="text-sm font-medium text-green-600">Updated</span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
              <div className="flex items-center space-x-3">
                <Activity className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900">Processing Queue</p>
                  <p className="text-sm text-gray-600">2 diagnoses in progress</p>
                </div>
              </div>
              <span className="text-sm font-medium text-blue-600">Active</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Knowledge Base Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Medical Knowledge Base</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Database className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">2,847</p>
            <p className="text-sm text-gray-600">Medical Conditions</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Brain className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">15,692</p>
            <p className="text-sm text-gray-600">Symptom Patterns</p>
          </div>
          <div className="text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
            <p className="text-2xl font-bold text-gray-900">94.2%</p>
            <p className="text-sm text-gray-600">Accuracy Rate</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage