'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'

interface WelcomeScreenProps {
  onStart: () => void
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-navy-deep"
    >
      {/* Karşılama görseli */}
      <Image
        src="/assets/images/welcome.png"
        alt="Suda Salt - Hoş Geldiniz"
        fill
        className="object-contain"
        priority
        sizes="100vw"
      />

      {/* Tam ekran tıklanabilir alan */}
      <button
        onClick={onStart}
        className="absolute inset-0 z-10 cursor-pointer bg-transparent"
        aria-label="Başlat"
      />

      {/* Sesi Aç Butonu */}
      <motion.button
        onClick={onStart}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="absolute bottom-12 md:bottom-20 z-20 flex items-center gap-4 px-12 py-8 md:px-16 md:py-10 bg-black/70 backdrop-blur-sm rounded-2xl border border-white/30 text-white"
      >
        {/* Nabız animasyonlu ses ikonu */}
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <svg
            className="w-8 h-8 md:w-10 md:h-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M11 5L6 9H2v6h4l5 4V5z" />
            <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
          </svg>
        </motion.div>
        <span className="font-accent text-lg md:text-xl tracking-widest uppercase">
          Sesi Aç
        </span>
      </motion.button>
    </motion.div>
  )
}
