'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { ContactFormData, ContactResponse } from '@/lib/types'
import { CONTACT_API_ENDPOINT } from '@/lib/constants'

export default function Contact() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setStatus(null)

    try {
      const response = await fetch(CONTACT_API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const result: ContactResponse = await response.json()

      if (response.ok) {
        setStatus({ type: 'success', message: 'Mesajınız başarıyla gönderildi!' })
        setFormData({ name: '', email: '', message: '' })
      } else {
        setStatus({ type: 'error', message: result.error || 'Bir hata oluştu.' })
      }
    } catch {
      setStatus({ type: 'error', message: 'Bağlantı hatası. Lütfen tekrar deneyin.' })
    } finally {
      setLoading(false)
      setTimeout(() => setStatus(null), 5000)
    }
  }

  return (
    <section id="iletisim" className="section-padding section-glow bg-warm-white">
      <div className="container mx-auto px-4 max-w-xl">
        <div className="text-center mb-8">
          <motion.p
            className="section-eyebrow"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            İletişim
          </motion.p>

          <motion.h2
            className="section-heading"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Bizimle İletişime Geçin
          </motion.h2>

          <motion.p
            className="text-lg text-charcoal/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Suda Salt hakkında daha fazla bilgi almak, iş birliği teklifleriniz veya sorularınız için bizimle
            iletişime geçebilirsiniz.
          </motion.p>
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-6"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div>
            <label htmlFor="name" className="block text-sm font-accent text-gold tracking-wider mb-2">
              Ad Soyad
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Adınız Soyadınız"
              className="w-full px-5 py-4 bg-parchment border-2 border-gold/30 rounded-lg text-navy placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-accent text-gold tracking-wider mb-2">
              E-posta
            </label>
            <input
              type="email"
              id="email"
              required
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="ornek@email.com"
              className="w-full px-5 py-4 bg-parchment border-2 border-gold/30 rounded-lg text-navy placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-accent text-gold tracking-wider mb-2">
              Mesajınız
            </label>
            <textarea
              id="message"
              required
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Mesajınızı buraya yazın..."
              className="w-full px-5 py-4 bg-parchment border-2 border-gold/30 rounded-lg text-navy placeholder:text-charcoal/40 focus:outline-none focus:border-gold focus:ring-4 focus:ring-gold/10 transition-all resize-y min-h-[120px]"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-gold to-gold-light text-navy font-accent text-sm tracking-widest uppercase rounded-lg hover:shadow-lg hover:shadow-gold/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed crystal-glow"
          >
            {loading ? 'Gönderiliyor...' : 'Gönder'}
          </button>

          {status && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg text-center ${
                status.type === 'success'
                  ? 'bg-green-100 text-green-800 border border-green-200'
                  : 'bg-red-100 text-red-800 border border-red-200'
              }`}
            >
              {status.message}
            </motion.div>
          )}
        </motion.form>
      </div>
    </section>
  )
}
