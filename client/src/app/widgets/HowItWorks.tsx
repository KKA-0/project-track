'use client'
import { motion } from 'framer-motion'

const steps = [
  {
    number: '1',
    title: 'Paste YouTube Playlist Link',
    description: 'Simply copy and paste the URL of your favorite YouTube playlist.'
  },
  {
    number: '2',
    title: 'AI Processing',
    description: 'Our GenAI technology analyzes and organizes the content into topics.'
  },
  {
    number: '3',
    title: 'Start Learning',
    description: 'Begin your distraction-free learning journey with organized content.'
  }
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-purple-400">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-center items-start space-y-8 md:space-y-0 md:space-x-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              whileHover={{
                scale: 1.05,
                transition: { duration: 0.2 },
              }}
              className="flex-1 text-center bg-black p-6 rounded-lg shadow-md hover:shadow-purple-500/50 transition-all duration-300"
            >
              <div className="bg-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {step.number}
              </div>
              <h3 className="text-xl font-semibold mb-2 text-purple-300">{step.title}</h3>
              <p className="text-gray-300">{step.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

