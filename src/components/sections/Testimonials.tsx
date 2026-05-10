import { useTranslation } from 'react-i18next';
import { Star, Quote } from 'lucide-react';
import { motion } from 'framer-motion';
import { FadeIn, SectionBadge } from '../effects/FadeIn';
import { testimonials } from '../../data';

export function Testimonials() {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_40%_at_50%_100%,hsl(354_79%_46%/0.06),transparent)]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <FadeIn className="mb-14 text-center">
          <SectionBadge>{t('testimonials.badge')}</SectionBadge>
          <h2 className="font-display mt-4 text-[clamp(2.8rem,6vw,5rem)] uppercase leading-none text-white">
            {t('testimonials.title').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-[hsl(24_100%_50%)]">{line}</span> : line}
              </span>
            ))}
          </h2>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-12 flex justify-center">
          <div className="flex items-center gap-6 rounded-2xl border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_8%)] px-8 py-5">
            <div className="text-center">
              <p className="font-display text-5xl text-[hsl(24_100%_50%)]">4.9</p>
              <p className="mt-1 text-xs text-[hsl(0_0%_50%)]">{t('testimonials.rating_label')}</p>
            </div>
            <div className="h-12 w-px bg-[hsl(0_0%_15%)]" />
            <div>
              <div className="flex gap-1">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} className="h-5 w-5 fill-[hsl(24_100%_50%)] text-[hsl(24_100%_50%)]" />
                ))}
              </div>
              <p className="mt-1 text-xs text-[hsl(0_0%_50%)]">127 {t('testimonials.reviews_count')}</p>
            </div>
          </div>
        </FadeIn>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="relative rounded-2xl border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_8%)] p-6"
            >
              <Quote className="absolute right-5 top-5 h-8 w-8 text-[hsl(24_100%_50%/0.15)]" />

              <div className="mb-4 flex items-center gap-3">
                <img
                  src={review.avatar}
                  alt={review.name}
                  className="h-11 w-11 rounded-full object-cover ring-2 ring-[hsl(24_100%_50%/0.3)]"
                />
                <div>
                  <p className="font-semibold text-white">{review.name}</p>
                  <div className="flex gap-0.5 mt-0.5">
                    {Array.from({ length: review.rating }).map((_, s) => (
                      <Star key={s} className="h-3.5 w-3.5 fill-[hsl(24_100%_50%)] text-[hsl(24_100%_50%)]" />
                    ))}
                  </div>
                </div>
              </div>

              <p className="text-sm leading-relaxed text-[hsl(0_0%_60%)]">
                {i18n.language === 'fr' ? review.comment : review.commentEn}
              </p>

              <p className="mt-4 text-xs text-[hsl(0_0%_35%)]">
                {new Date(review.date).toLocaleDateString(i18n.language === 'fr' ? 'fr-FR' : 'en-GB', {
                  year: 'numeric', month: 'long', day: 'numeric',
                })}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
