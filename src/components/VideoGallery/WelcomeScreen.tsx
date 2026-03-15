'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-b from-navy-deep via-navy to-navy-deep"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Decorative particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-gold/30 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 text-center px-8"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <Image
            src="/assets/images/logo.webp"
            alt="Suda Salt"
            width={150}
            height={150}
            className="w-24 h-24 md:w-32 md:h-32 mx-auto object-contain"
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="font-accent text-3xl md:text-5xl text-gold tracking-[0.3em] uppercase mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
        >
          Suda Salt
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-body text-lg md:text-xl text-warm-white/70 mb-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          Türk Kaynak Tuzu
        </motion.p>

        {/* Start Button */}
        <motion.button
          onClick={onStart}
          className="group relative px-12 py-5 bg-gradient-to-r from-gold to-gold-light text-navy font-accent text-sm md:text-base tracking-widest uppercase rounded-full overflow-hidden transition-all duration-500 hover:shadow-2xl hover:shadow-gold/40"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Glow effect */}
          <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <span className="relative flex items-center gap-3">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M8 5v14l11-7z" />
            </svg>
            Başlat
          </span>
        </motion.button>

        {/* Sound notice */}
        <motion.p
          className="mt-6 text-sm text-warm-white/40 flex items-center justify-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
          Sesli video deneyimi için tıklayın
        </motion.p>
      </motion.div>
    </motion.div>
  )
}
