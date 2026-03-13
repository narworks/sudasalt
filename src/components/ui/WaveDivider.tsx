interface WaveDividerProps {
  variant: 'hero-to-story' | 'story-to-product' | 'product-to-tradition' | 'tradition-to-hayriye' | 'hayriye-to-contact'
  reverse?: boolean
}

const backgrounds: Record<WaveDividerProps['variant'], string> = {
  'hero-to-story': '#0E2D4E',
  'story-to-product': '#FAF8F0', // warm-white
  'product-to-tradition': '#F5EFE0', // parchment
  'tradition-to-hayriye': '#0A2540', // navy
  'hayriye-to-contact': '#FAF8F0', // warm-white
}

const fills: Record<WaveDividerProps['variant'], string> = {
  'hero-to-story': '#FAF8F0',
  'story-to-product': '#F5EFE0',
  'product-to-tradition': '#0A2540',
  'tradition-to-hayriye': '#FAF8F0',
  'hayriye-to-contact': '#FAF8F0',
}

export default function WaveDivider({ variant, reverse = false }: WaveDividerProps) {
  return (
    <div
      className={`wave-divider ${reverse ? 'wave-divider--reverse' : ''}`}
      style={{ backgroundColor: backgrounds[variant] }}
    >
      <svg viewBox="0 0 1200 60" preserveAspectRatio="none">
        <path
          d="M0,30 C200,60 400,0 600,30 C800,60 1000,0 1200,30 L1200,60 L0,60 Z"
          fill={fills[variant]}
        />
      </svg>
    </div>
  )
}
