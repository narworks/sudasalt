'use client'

import { motion } from 'framer-motion'

export default function Tradition() {
  return (
    <section id="diskirasi" className="section-padding section-glow bg-navy text-warm-white">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <motion.p
          className="section-eyebrow"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Anadolu Geleneği
        </motion.p>

        <motion.h2
          className="section-heading !text-warm-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Diş Kirası
        </motion.h2>

        <motion.div
          className="relative my-12 p-8 md:p-12 bg-navy-deep/50 rounded-2xl border border-gold/20"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          {/* Quote marks */}
          <div className="absolute -top-4 left-8 text-6xl text-gold/30 font-display">"</div>
          <div className="absolute -bottom-4 right-8 text-6xl text-gold/30 font-display rotate-180">"</div>

          <p className="text-xl md:text-2xl leading-relaxed text-warm-white/90 font-body italic">
            Anadolu'da misafire ikram edilen ilk şey tuz ve ekmektir. Bu gelenek, "tuz ekmek hakkı" olarak bilinir ve
            paylaşılan sofranın kutsallığını simgeler.
          </p>
        </motion.div>

        <motion.p
          className="text-lg text-warm-white/70 leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          "Diş Kirası" geleneği, konuğun ev sahibine sunduğu hediyedir. Bu hediye, paylaşılan sofranın ve misafirperverliğin
          bir karşılığı olarak verilir. Suda Salt, bu kadim geleneği yaşatmak ve sofralarınıza değer katmak için özenle
          hazırlanmıştır.
        </motion.p>

        <motion.p
          className="text-lg text-warm-white/70 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          Özel günlerinizde, bayramlarda ve değerli anlarınızda Suda Salt'ı sevdiklerinize hediye ederek bu güzel
          geleneği sürdürebilirsiniz.
        </motion.p>

        {/* Decorative elements */}
        <motion.div
          className="flex justify-center gap-4 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <span className="w-2 h-2 bg-gold/50 rounded-full" />
          <span className="w-2 h-2 bg-gold rounded-full" />
          <span className="w-2 h-2 bg-gold/50 rounded-full" />
        </motion.div>
      </div>
    </section>
  )
}
