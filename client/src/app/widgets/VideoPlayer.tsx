'use client'
import { motion } from 'framer-motion'

export default function VideoPlayer() {
  return (
    <section id="video-player" className="py-20 px-6 relative z-10">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-lg"
        >
          <iframe
            src="https://www.youtube.com/embed/dQw4w9WgXcQ"
            title="Project Tracking Intro Video"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </motion.div>
      </div>
    </section>
  )
}

