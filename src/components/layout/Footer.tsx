import { useTranslation } from 'react-i18next';
import { Phone, MapPin, Clock, Share2, MessageCircle, Flower2 } from 'lucide-react';

export function Footer() {
  const { t } = useTranslation();
  const year = new Date().getFullYear();

  const quickLinks = [
    { href: '#menu', key: 'menu' },
    { href: '#about', key: 'about' },
    { href: '#delivery', key: 'delivery' },
    { href: '#contact', key: 'contact' },
  ];

  return (
    <footer className="border-t border-[hsl(0_0%_15%)] bg-[hsl(0_0%_3%)]">
      <div className="mx-auto max-w-[1400px] px-6 py-16">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-(--color-main)">
                <Flower2 className="h-5 w-5 text-black" />
              </div>
              <span className="font-display text-2xl text-white">
                L-<span className="text-(--color-main)">Cuisine</span>
              </span>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-[hsl(0_0%_55%)]">
              {t('footer.tagline')}
            </p>
            <div className="mt-6 flex gap-3">
              <a
                href="https://www.instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(0_0%_12%)] text-[hsl(0_0%_55%)] transition-colors hover:bg-(--color-main) hover:text-black"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="https://wa.me/4915219507682"
                target="_blank"
                rel="noreferrer"
                aria-label="WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-[hsl(0_0%_12%)] text-[hsl(0_0%_55%)] transition-colors hover:bg-(--color-main) hover:text-black"
              >
                <MessageCircle className="h-4 w-4" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.links_title')}
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link) => (
                <li key={link.key}>
                  <a
                    href={link.href}
                    className="text-sm text-[hsl(0_0%_55%)] transition-colors hover:text-(--color-main)"
                  >
                    {t('nav.' + link.key)}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-5 text-sm font-semibold uppercase tracking-wider text-white">
              {t('footer.contact_title')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3 text-sm text-[hsl(0_0%_55%)]">
                <Phone className="h-4 w-4 shrink-0 text-(--color-main)" />
                {t('contact.phone')}
              </li>
              <li className="flex items-center gap-3 text-sm text-[hsl(0_0%_55%)]">
                <MapPin className="h-4 w-4 shrink-0 text-(--color-main)" />
                {t('contact.location')}
              </li>
              <li className="flex items-center gap-3 text-sm text-[hsl(0_0%_55%)]">
                <Clock className="h-4 w-4 shrink-0 text-(--color-main)" />
                {t('contact.hours')}
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[hsl(0_0%_12%)] pt-8 sm:flex-row">
          <p className="text-xs text-[hsl(0_0%_40%)]">
            &copy; {year} L-Cuisine. {t('footer.rights')}
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-[hsl(0_0%_40%)] hover:text-white">
              {t('footer.legal')}
            </a>
            <a href="#" className="text-xs text-[hsl(0_0%_40%)] hover:text-white">
              {t('footer.privacy')}
            </a>
            <p className="text-xs text-[hsl(0_0%_40%)] hover:text-white">
              Created by <a href="https://ghislain1.github.io./home" rel="noreferrer" target="_blank"
                className="text-green-400">Ghislain Z.</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
