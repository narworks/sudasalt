'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ANIMATION_CONFIG } from '@/lib/constants'

export default function Hero() {
  const particlesRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = particlesRef.current
    if (!container) return

    const isMobile = window.innerWidth < 768
    const count = isMobile
      ? ANIMATION_CONFIG.particles.countMobile
      : ANIMATION_CONFIG.particles.countDesktop

    for (let i = 0; i < count; i++) {
      const crystal = document.createElement('div')

      const typeRand = Math.random()
      let crystalType = 'normal'
      if (typeRand > 0.9) {
        crystalType = 'sparkle'
      } else if (typeRand > 0.75) {
        crystalType = 'large'
      }

      crystal.classList.add('salt-crystal')
      if (crystalType !== 'normal') {
        crystal.classList.add(`salt-crystal--${crystalType}`)
      }

      let size
      switch (crystalType) {
        case 'large':
          size = Math.random() * 4 + 5
          break
        case 'sparkle':
          size = Math.random() * 3 + 3
          break
        default:
          size = Math.random() * 3 + 2
      }

      const left = Math.random() * 100
      const duration = Math.random() * 20 + 15
      const delay = Math.random() * 20
      const opacity = crystalType === 'sparkle' ? Math.random() * 0.4 + 0.2 : Math.random() * 0.25 + 0.05
      const rotation = Math.random() * 360
      const isSquare = Math.random() > 0.4

      crystal.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${left}%;
        animation-duration: ${duration}s;
        animation-delay: -${delay}s;
        opacity: ${opacity};
        border-radius: ${isSquare ? '1px' : '50%'};
        transform: rotate(${rotation}deg);
      `

      container.appendChild(crystal)
    }

    return () => {
      container.innerHTML = ''
    }
  }, [])

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-center p-8"
      style={{
        background: `
          radial-gradient(ellipse at 50% 20%, rgba(212,168,67,0.08) 0%, transparent 60%),
          linear-gradient(180deg, #061829 0%, #0A2540 50%, #0E2D4E 100%)
        `,
      }}
    >
      {/* Particles Container */}
      <div
        ref={particlesRef}
        id="heroParticles"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      />

      {/* Hero Content */}
      <motion.div
        className="relative z-10 flex flex-col items-center"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        {/* Logo */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.2 }}
        >
          <Image
            src="/assets/images/logo.webp"
            alt="Suda Salt Logo"
            width={200}
            height={200}
            className="w-32 h-32 md:w-48 md:h-48 object-contain animate-pulse-glow"
            priority
          />
        </motion.div>

        {/* Brand Name */}
        <motion.h1
          className="font-accent text-4xl md:text-6xl lg:text-7xl tracking-[0.3em] uppercase mb-4"
          style={{
            background: 'linear-gradient(135deg, #D4A843 0%, #E8C776 50%, #D4A843 100%)',
            backgroundSize: '200% auto',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            animation: 'shimmer 3s infinite',
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Suda Salt
        </motion.h1>

        {/* Tagline */}
        <motion.p
          className="font-body text-lg md:text-xl text-warm-white/80 tracking-widest uppercase"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          Türk Kaynak Tuzu
        </motion.p>

        {/* Decorative Line */}
        <motion.div
          className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-gold to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
        />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.a
        href="#hikaye"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gold/60 hover:text-gold transition-colors"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <span className="animate-bounce-scroll">
          <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
        </span>
        <span className="text-xs tracking-widest uppercase font-accent">Keşfet</span>
      </motion.a>
    </section>
  )
}
