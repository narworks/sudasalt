'use client'

import { motion } from 'framer-motion'
import { VALUE_CARDS } from '@/lib/constants'

const iconMap: Record<string, JSX.Element> = {
  droplet: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z" />
    </svg>
  ),
  mountain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  ),
  crown: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-10 h-10">
      <path d="M2 20h20M4 8l4 4 4-6 4 6 4-4-2 12H6L4 8z" />
    </svg>
  ),
}

export default function Story() {
  return (
    <section id="hikaye" className="section-padding section-glow bg-warm-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Binlerce Yıllık Miras
          </motion.p>

          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Anadolu'nun Derinliklerinden
            <br />
            Sofralarınıza
          </motion.h2>

          <motion.p
            className="text-lg text-charcoal/80 leading-relaxed mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Suda Salt, Anadolu topraklarının binlerce yıllık tuz kaynaklarından elde edilen, doğal ve saf Türk kaynak
            tuzudur. Medeniyetlerin beşiği olan bu topraklarda, tuz her zaman yaşamın, bereketin ve misafirperverliğin
            simgesi olmuştur.
          </motion.p>

          <motion.p
            className="text-lg text-charcoal/80 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Biz de bu kadim geleneği, modern standartlarla buluşturarak sizlere sunuyoruz.
          </motion.p>
        </div>

        {/* Value Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          {VALUE_CARDS.map((card, index) => (
            <motion.div
              key={card.title}
              className="group p-8 bg-parchment/50 rounded-2xl border border-gold/10 hover:border-gold/30 transition-all duration-500 hover:shadow-xl hover:shadow-gold/5"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <div className="text-gold mb-4 group-hover:scale-110 transition-transform duration-300">
                {iconMap[card.icon]}
              </div>
              <h3 className="font-display text-xl text-navy mb-3">{card.title}</h3>
              <p className="text-charcoal/70 leading-relaxed">{card.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
