export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-navy text-warm-white py-12">
      <div className="container mx-auto px-4">
        {/* Decorative Ornament */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <span className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
          <span className="w-2 h-2 bg-gold rotate-45" />
          <span className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
        </div>

        {/* Logo & Brand */}
        <div className="text-center mb-8">
          <h3 className="font-accent text-2xl tracking-[0.2em] text-gold mb-2">Suda Salt</h3>
          <p className="text-sm text-warm-white/60 tracking-wider">Türk Kaynak Tuzu</p>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-warm-white/40">
          <p>&copy; {currentYear} Suda Salt. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
