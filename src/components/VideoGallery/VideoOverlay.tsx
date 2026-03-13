'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function VideoOverlay() {
  return (
    <>
      {/* Top gradient overlay */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-black/60 to-transparent pointer-events-none z-10" />

      {/* Bottom gradient overlay */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent pointer-events-none z-10" />

      {/* Logo - Top Left */}
      <motion.div
        className="absolute top-6 left-6 z-20"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        <div className="flex items-center gap-3 px-4 py-2 bg-black/30 backdrop-blur-sm rounded-full">
          <Image
            src="/assets/images/logo.webp"
            alt="Suda Salt"
            width={32}
            height={32}
            className="w-8 h-8 object-contain"
          />
          <span className="text-gold font-accent text-sm tracking-wider hidden sm:block">
            SUDA SALT
          </span>
        </div>
      </motion.div>
    </>
  )
}
