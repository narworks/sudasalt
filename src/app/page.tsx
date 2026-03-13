'use client'

import { useEffect, useState } from 'react'
import VideoGallery from '@/components/VideoGallery'
import Hero from '@/components/sections/Hero'
import Story from '@/components/sections/Story'
import Product from '@/components/sections/Product'
import Tradition from '@/components/sections/Tradition'
import Hayriye from '@/components/sections/Hayriye'
import Contact from '@/components/sections/Contact'
import Footer from '@/components/sections/Footer'
import WaveDivider from '@/components/ui/WaveDivider'

export default function Home() {
  const [showVideoGallery, setShowVideoGallery] = useState(true)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Grain overlay ekle
    const grain = document.createElement('div')
    grain.className = 'grain-overlay'
    document.body.appendChild(grain)

    return () => {
      grain.remove()
    }
  }, [])

  const handleGalleryClose = () => {
    setShowVideoGallery(false)
  }

  if (!mounted) return null

  return (
    <>
      {showVideoGallery && (
        <VideoGallery onClose={handleGalleryClose} />
      )}

      <main>
        <Hero />
        <WaveDivider variant="hero-to-story" />
        <Story />
        <WaveDivider variant="story-to-product" reverse />
        <Product />
        <WaveDivider variant="product-to-tradition" />
        <Tradition />
        <WaveDivider variant="tradition-to-hayriye" reverse />
        <Hayriye />
        <WaveDivider variant="hayriye-to-contact" />
        <Contact />
        <Footer />
      </main>
    </>
  )
}
