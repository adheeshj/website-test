import { Music, Phone, Mail, MapPin } from 'lucide-react'

const quickLinks = [
  { href: '#about', label: 'About' },
  { href: '#products', label: 'Products' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#reviews', label: 'Reviews' },
  { href: '#contact', label: 'Contact' },
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-background border-t border-border/50">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-12 py-20">
        <div className="grid gap-12 lg:grid-cols-4">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center gap-2">
              <Music className="h-8 w-8 text-gold" />
              <span className="font-serif text-2xl font-semibold text-foreground">
                Jyoti Music
              </span>
            </a>
            <p className="mt-4 text-muted-foreground max-w-md leading-relaxed">
              Your trusted destination for premium guitars and music instruments
              in Pune. Bringing melody to life since generations.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="text-muted-foreground transition-colors hover:text-gold"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="tel:+917775060603"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
                >
                  <Phone className="h-4 w-4" />
                  077750 60603
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@jyotimusic.com"
                  className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-gold"
                >
                  <Mail className="h-4 w-4" />
                  contact@jyotimusic.com
                </a>
              </li>
              <li className="flex items-start gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4 mt-1 shrink-0" />
                <span>
                  Shop 12, Raheja Midas Complex,
                  <br />
                  325/14, MG Road, Camp,
                  <br />
                  Pune – 411001
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Jyoti Music. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              Made with passion for music lovers
            </span>
            <span className="text-gold">♪</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
