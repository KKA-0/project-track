'use client'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-black shadow-md relative z-10"
    >
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-400">
          Project Tracking
        </Link>
        <div className="space-x-4">
          <Link href="#features" className="text-gray-300 hover:text-purple-400">Features</Link>
          <Link href="#how-it-works" className="text-gray-300 hover:text-purple-400">How It Works</Link>
        </div>
      </nav>
    </motion.header>
  )
}

