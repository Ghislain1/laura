import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ShoppingCart, Menu, X, Flame, Globe } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../hooks/useCart';
import { cn } from '../../lib/utils';

const navLinks = [
  { key: 'menu', href: '#menu' },
  { key: 'about', href: '#about' },
  { key: 'delivery', href: '#delivery' },
  { key: 'contact', href: '#contact' },
];

export function Navbar() {
  const { t, i18n } = useTranslation();
  const { itemCount, openCart } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleLang = () => {
    i18n.changeLanguage(i18n.language === 'fr' ? 'en' : 'fr');
  };

  return (
    <>
      <motion.header
        className={cn(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled
            ? 'bg-[hsl(0_0%_4%/0.95)] backdrop-blur-md border-b border-[hsl(0_0%_20%)]'
            : 'bg-transparent'
        )}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4">
          <a href="#" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[hsl(24_100%_50%)]">
              <Flame className="h-5 w-5 text-black" />
            </div>
            <span className="font-display text-2xl tracking-wide text-white">
              L-<span className="text-[hsl(24_100%_50%)]">Cuisine</span>
            </span>
          </a>

          <nav className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <a
                key={link.key}
                href={link.href}
                className="text-sm font-medium text-[hsl(0_0%_65%)] transition-colors hover:text-white"
              >
                {t('nav.' + link.key)}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={toggleLang}
              className="hidden items-center gap-1.5 rounded-full border border-[hsl(0_0%_20%)] px-3 py-1.5 text-xs font-medium text-[hsl(0_0%_65%)] transition-colors hover:border-[hsl(24_100%_50%)] hover:text-white md:flex"
            >
              <Globe className="h-3.5 w-3.5" />
              {i18n.language.toUpperCase()}
            </button>

            <button
              onClick={openCart}
              className="relative flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(0_0%_10%)] text-white transition-colors hover:bg-[hsl(24_100%_50%)] hover:text-black"
            >
              <ShoppingCart className="h-5 w-5" />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span
                    key="badge"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[hsl(24_100%_50%)] text-[10px] font-bold text-black"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <a
              href="#menu"
              className="hidden rounded-full bg-[hsl(24_100%_50%)] px-5 py-2 text-sm font-semibold text-black transition-opacity hover:opacity-90 md:block"
            >
              {t('nav.order')}
            </a>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-[hsl(0_0%_10%)] text-white md:hidden"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[73px] z-40 border-b border-[hsl(0_0%_20%)] bg-[hsl(0_0%_4%/0.98)] backdrop-blur-md md:hidden"
          >
            <nav className="flex flex-col px-6 py-4 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.key}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="rounded-lg px-4 py-3 text-base font-medium text-[hsl(0_0%_65%)] transition-colors hover:bg-[hsl(0_0%_10%)] hover:text-white"
                >
                  {t('nav.' + link.key)}
                </a>
              ))}
              <div className="mt-3 flex items-center gap-3 border-t border-[hsl(0_0%_15%)] pt-4">
                <button
                  onClick={toggleLang}
                  className="flex items-center gap-1.5 rounded-full border border-[hsl(0_0%_20%)] px-3 py-1.5 text-xs text-[hsl(0_0%_65%)]"
                >
                  <Globe className="h-3.5 w-3.5" />
                  {i18n.language === 'fr' ? 'EN' : 'FR'}
                </button>
                <a
                  href="#menu"
                  onClick={() => setMobileOpen(false)}
                  className="rounded-full bg-[hsl(24_100%_50%)] px-5 py-2 text-sm font-semibold text-black"
                >
                  {t('nav.order')}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
