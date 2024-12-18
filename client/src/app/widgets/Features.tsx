'use client'
import { motion } from 'framer-motion'
import { PlayCircle, List, BarChart } from 'lucide-react'

const features = [
  {
    icon: <PlayCircle size={40} />,
    title: 'YouTube Playlist Integration',
    description: 'Easily import your favorite YouTube playlists for organized learning.'
  },
  {
    icon: <List size={40} />,
    title: 'AI-Powered Topic Segmentation',
    description: 'Our GenAI technology automatically divides videos into relevant topics.'
  },
  {
    icon: <BarChart size={40} />,
    title: 'Progress Tracking',
    description: 'Monitor your learning progress across different topics and videos.'
  }
]

export default function Features() {
  return (
    <section id="features" className="py-20 px-6 bg-gray-900 relative z-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="bg-black p-6 rounded-lg shadow-md hover:shadow-purple-500/50 transition-all duration-300"
            >
              <div className="text-purple-400 mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-purple-300">{feature.title}</h3>
              <p className="text-gray-300">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

