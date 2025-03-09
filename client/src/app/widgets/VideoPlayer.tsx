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
          src="https://www.loom.com/embed/dc9567c29ffd4624972c946bcda00a08?sid=b59083ba-bea0-476d-848b-5441d9a8b383"
          title="Diyan Intro Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="w-full h-[400px] relative z-10"
        ></iframe>
        {/* <div style={{position: "relative", paddingBottom: "56.25%", height: 0}}>
          <iframe
            src="https://www.loom.com/embed/9664423cab2141908f4b0e79bf965b33?sid=e18aab05-5a49-485a-84df-63a3c9a9f575"
            frameborder="0"
            webkitallowfullscreen
            mozallowfullscreen
            allowfullscreen
            style={{position: "absolute", top: "0", left: "0", width: "100%", height: "100%"}}
          ></iframe>
        </div> */}
      </motion.div>
    </section>
  )
}

