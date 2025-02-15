'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function VideoPlayer() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="relative z-20 mx-auto max-w-5xl px-6 -mb-32" style={{height: "400px", borderRadius: "10px"}}>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`aspect-w-16 aspect-h-9 rounded-lg overflow-hidden shadow-2xl bg-black transition-all duration-300 ${
          isHovered ? 'shadow-purple-500/50 shadow-2xl' : ''
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className={`absolute inset-0 bg-purple-500 transition-opacity duration-300 ${
          isHovered ? 'opacity-30 blur-xl' : 'opacity-20 blur-lg'
        }`}></div>
        <iframe
          src="https://www.youtube.com/embed/dQw4w9WgXcQ"
          title="Diyan Intro Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-[400px] relative z-10"
        ></iframe>
      </motion.div>
    </section>
  )
}

