'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'

export default function Product() {
  return (
    <section id="urun" className="section-padding section-glow bg-parchment">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Product Image */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent rounded-3xl" />
              <Image
                src="/assets/images/sirketihayriye_kutu_archive_paper.png"
                alt="Suda Salt — Şirket-i Hayriye Koleksiyon Kutusu"
                fill
                className="object-contain p-8"
              />
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            className="text-center lg:text-left"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="section-eyebrow">Özel Koleksiyon</p>

            <h2 className="section-heading">
              Şirket-i Hayriye
              <br />
              <span className="text-gold">1851</span>
            </h2>

            <p className="text-lg text-charcoal/80 leading-relaxed mb-6">
              Osmanlı Denizcilik Tarihine saygıyla hazırlanan özel koleksiyon kutusu. Boğaz'ın iki yakasını birleştiren
              ilk modern ulaşım sistemi Şirket-i Hayriye'nin mirasını yaşatan bu özel ürün, Kadir Gecesi sofranızda
              bereketin simgesi olsun.
            </p>

            <div className="flex flex-wrap gap-4 justify-center lg:justify-start mb-8">
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                %100 Doğal
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Katkısız
              </div>
              <div className="flex items-center gap-2 text-sm text-charcoal/60">
                <svg className="w-5 h-5 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Premium Kalite
              </div>
            </div>

            <motion.a
              href="#iletisim"
              className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-gold to-gold-light text-navy font-accent text-sm tracking-widest uppercase rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 crystal-glow"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Sipariş Ver
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
