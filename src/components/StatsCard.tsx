import React from 'react'
import { motion } from 'framer-motion'

interface StatsCardProps {
  title: string
  value: string
  change: string
  icon: React.ElementType
  color: 'blue' | 'green' | 'purple' | 'orange'
  delay?: number
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon: Icon, color, delay = 0 }) => {
  const colorClasses = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  }

  const changeColor = change.startsWith('+') ? 'text-green-600' : 'text-red-600'

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="card hover:shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold text-gray-900">{value}</p>
          <p className={`text-sm font-medium ${changeColor} mt-1`}>
            {change} from last month
          </p>
        </div>
        <div className={`p-3 rounded-lg ${colorClasses[color]}`}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </motion.div>
  )
}

export default StatsCard