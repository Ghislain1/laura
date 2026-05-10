import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown, Play } from 'lucide-react';
import { EmberParticles } from '../effects/EmberParticles';

export function Hero() {
  const { t } = useTranslation();

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden">
      {/* Ken-Burns background */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: [1, 1.12], x: ['0%', '-2%'], y: ['0%', '-1%'] }}
        transition={{ duration: 22, repeat: Infinity, repeatType: 'reverse', ease: 'linear' }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              'url(https://images.unsplash.com/photo-1555939594-58d7cb561ad1?w=1800&q=85)',
          }}
        />
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_4%)] via-[hsl(0_0%_4%/0.65)] to-[hsl(0_0%_4%/0.3)]" />
      <div className="absolute inset-0 bg-gradient-to-r from-[hsl(0_0%_4%/0.5)] to-transparent" />

      {/* Ember particles */}
      <EmberParticles count={120} />

      {/* Glow orb */}
      <div className="pointer-events-none absolute bottom-[-10%] left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-(--color-main)/8 blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-[1400px] px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 inline-flex items-center gap-2 rounded-full border border-(--color-main)/40 bg-(--color-main)/10 px-5 py-2 text-sm font-medium text-(--color-main) backdrop-blur-sm"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-(--color-main) opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-(--color-main)" />
          </span>
          {t('hero.badge')}
        </motion.div>

        {/* Main heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.35 }}
          className="font-display text-[clamp(4rem,14vw,11rem)] uppercase leading-none tracking-wide text-white"
        >
          {t('hero.title').split('\n').map((line, i) => (
            <span key={i} className="block">
              {i === 1 ? (
                <span className="text-(--color-main)">{line}</span>
              ) : (
                line
              )}
            </span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-[hsl(0_0%_70%)] sm:text-lg"
        >
          {t('hero.subtitle')}
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65 }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <a
            href="#menu"
            className="group flex items-center gap-2 rounded-full bg-(--color-main) px-8 py-3.5 text-base font-semibold text-black transition-all hover:scale-105"
            style={{ boxShadow: '0 0 30px color-mix(in srgb, var(--color-main) 35%, transparent)' }}
            onMouseEnter={(e) => (e.currentTarget.style.boxShadow = '0 0 40px color-mix(in srgb, var(--color-main) 55%, transparent)')}
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = '0 0 30px color-mix(in srgb, var(--color-main) 35%, transparent)')}
          >
            {t('hero.cta_order')}
          </a>
          <a
            href="#about"
            className="flex items-center gap-2 rounded-full border border-[hsl(0_0%_30%)] px-8 py-3.5 text-base font-medium text-white backdrop-blur-sm transition-all hover:border-(--color-main) hover:text-(--color-main)"
          >
            <Play className="h-4 w-4 fill-current" />
            {t('hero.cta_discover')}
          </a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mx-auto mt-16 flex max-w-sm justify-around"
        >
          {[
            { val: '500+', label: 'Clients satisfaits' },
            { val: '5?', label: 'Note moyenne' },
            { val: '30min', label: 'Livraison' },
          ].map((stat) => (
            <div key={stat.val} className="text-center">
              <p className="font-display text-2xl text-(--color-main)">{stat.val}</p>
              <p className="mt-0.5 text-xs text-[hsl(0_0%_55%)]">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#menu"
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, y: [0, 8, 0] }}
        transition={{ opacity: { delay: 1.2 }, y: { repeat: Infinity, duration: 1.6, ease: 'easeInOut' } }}
      >
        <ChevronDown className="h-8 w-8 text-[hsl(0_0%_50%)]" />
      </motion.a>
    </section>
  );
}
