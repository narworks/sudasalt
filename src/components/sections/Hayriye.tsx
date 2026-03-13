'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface CounterProps {
  target: number
  suffix?: string
  prefix?: string
}

function AnimatedCounter({ target, suffix = '', prefix = '' }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true
          const duration = 2000
          const start = performance.now()

          const update = (now: number) => {
            const elapsed = now - start
            const progress = Math.min(elapsed / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            setCount(Math.round(eased * target))

            if (progress < 1) {
              requestAnimationFrame(update)
            }
          }

          requestAnimationFrame(update)
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [target])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString('tr-TR')}
      {suffix}
    </span>
  )
}

export default function Hayriye() {
  return (
    <section id="hayriye" className="section-padding section-glow bg-warm-white relative overflow-hidden">
      {/* Animated Ferries Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-10">
        <svg
          className="absolute top-1/4 w-32 h-auto animate-sail-right"
          viewBox="0 0 100 50"
          fill="currentColor"
        >
          <path d="M10 40 L50 10 L90 40 L80 40 L50 20 L20 40 Z" className="text-navy" />
          <rect x="45" y="15" width="10" height="25" className="text-gold" />
        </svg>
        <svg
          className="absolute top-2/3 w-24 h-auto animate-sail-left"
          viewBox="0 0 100 50"
          fill="currentColor"
        >
          <path d="M10 40 L50 10 L90 40 L80 40 L50 20 L20 40 Z" className="text-navy" />
          <rect x="45" y="15" width="10" height="25" className="text-gold" />
        </svg>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Tarihi Miras
          </motion.p>

          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Şirket-i Hayriye
            <br />
            <span className="text-gold">1851 - 1945</span>
          </motion.h2>

          <motion.p
            className="text-lg text-charcoal/80 leading-relaxed max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Osmanlı İmparatorluğu'nun ilk anonim şirketi ve İstanbul Boğazı'nda vapur işletmeciliğinin öncüsü.
            Boğaz'ın iki yakasını birleştiren bu tarihi kurum, modern İstanbul'un temellerini attı.
          </motion.p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
          <motion.div
            className="text-center p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0 }}
          >
            <div className="text-4xl md:text-5xl font-display text-gold mb-2">
              <AnimatedCounter target={1851} />
            </div>
            <p className="text-sm text-charcoal/60 uppercase tracking-wider">Kuruluş</p>
          </motion.div>

          <motion.div
            className="text-center p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="text-4xl md:text-5xl font-display text-gold mb-2">
              <AnimatedCounter target={94} suffix=" yıl" />
            </div>
            <p className="text-sm text-charcoal/60 uppercase tracking-wider">Hizmet</p>
          </motion.div>

          <motion.div
            className="text-center p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="text-4xl md:text-5xl font-display text-gold mb-2">
              <AnimatedCounter target={36} suffix="+" />
            </div>
            <p className="text-sm text-charcoal/60 uppercase tracking-wider">Vapur</p>
          </motion.div>

          <motion.div
            className="text-center p-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="text-4xl md:text-5xl font-display text-gold mb-2">
              <AnimatedCounter target={2} prefix="" suffix=" Kıta" />
            </div>
            <p className="text-sm text-charcoal/60 uppercase tracking-wider">Bağlantı</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
