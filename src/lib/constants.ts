import { Video, ValueCard } from './types'

// Video Gallery Configuration
export const GALLERY_VIDEOS: Video[] = [
  {
    id: '1',
    title: 'Suda Salt - Hikaye',
    youtubeId: 'IH-Ntd8GlKE',
    duration: 60,
  },
]

// Value Cards Data
export const VALUE_CARDS: ValueCard[] = [
  {
    icon: 'droplet',
    title: 'Doğal Saflık',
    description: 'Hiçbir katkı maddesi içermez, doğanın sunduğu en saf haliyle sofranıza ulaşır.',
  },
  {
    icon: 'mountain',
    title: 'Anadolu Kaynağı',
    description: 'Binlerce yıllık Anadolu topraklarının derinliklerinden çıkarılan eşsiz mineral zenginliği.',
  },
  {
    icon: 'crown',
    title: 'Premium Kalite',
    description: 'Özenle seçilmiş, titizlikle işlenmiş, en yüksek standartlarda üretilmiş.',
  },
]

// Animation Configuration
export const ANIMATION_CONFIG = {
  particles: {
    countDesktop: 60,
    countMobile: 25,
  },
  sparkles: {
    count: 15,
  },
}

// Contact Form
export const CONTACT_API_ENDPOINT = '/api/contact'
