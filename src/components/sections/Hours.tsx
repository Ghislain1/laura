import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Clock, CheckCircle } from 'lucide-react';
import { FadeIn, SectionBadge } from '../effects/FadeIn';
import { timeSlots } from '../../data';
import { cn } from '../../lib/utils';

export function Hours() {
  const { t } = useTranslation();
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-[hsl(0_0%_6%)]">
      <div className="relative mx-auto max-w-[1400px] px-6">
        <FadeIn className="mb-14 text-center">
          <SectionBadge>{t('hours.badge')}</SectionBadge>
          <h2 className="font-display mt-4 text-[clamp(2.8rem,6vw,5rem)] uppercase leading-none text-white">
            {t('hours.title').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-(--color-main)">{line}</span> : line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(0_0%_55%)]">{t('hours.subtitle')}</p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2 items-start">
          {/* Hours Info */}
          <FadeIn direction="right">
            <div className="rounded-3xl border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_8%)] p-8">
              <div className="flex items-center gap-4 mb-8">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-(--color-main)/15">
                  <Clock className="h-7 w-7 text-(--color-main)" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="rounded-full bg-[hsl(142_71%_45%/0.2)] px-2.5 py-1 text-xs font-semibold text-[hsl(142_71%_50%)]">
                      {t('hours.open')}
                    </span>
                    <span className="text-sm text-[hsl(0_0%_55%)]">{t('hours.everyday')}</span>
                  </div>
                  <p className="mt-1 text-xl font-semibold text-white">12:00 — 21:00</p>
                </div>
              </div>

              <div className="space-y-4 border-t border-[hsl(0_0%_15%)] pt-6">
                <div className="flex justify-between text-sm">
                  <span className="text-[hsl(0_0%_55%)]">{t('hours.from')}</span>
                  <span className="font-medium text-white">12:00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-[hsl(0_0%_55%)]">{t('hours.until')}</span>
                  <span className="font-medium text-white">21:00</span>
                </div>
              </div>

              {selected && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 flex items-center gap-3 rounded-2xl border border-(--color-main)/30 bg-(--color-main)/10 p-4"
                >
                  <CheckCircle className="h-5 w-5 text-(--color-main)" />
                  <span className="text-sm font-medium text-white">
                    {t('hours.selected')}: <span className="text-(--color-main)">{selected}</span>
                  </span>
                </motion.div>
              )}

              {selected && (
                <a
                  href="#menu"
                  className="mt-4 block w-full rounded-2xl bg-(--color-main) py-3.5 text-center text-base font-semibold text-black"
                >
                  {t('hours.order_now')}
                </a>
              )}
            </div>
          </FadeIn>

          {/* Time Slots */}
          <FadeIn delay={0.15}>
            <div>
              <p className="mb-5 font-semibold text-white">{t('hours.slots_title')}</p>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {timeSlots.map((slot) => (
                  <button
                    key={slot.id}
                    disabled={!slot.available}
                    onClick={() => setSelected(slot.label)}
                    className={cn(
                      'rounded-xl border py-3.5 text-center text-sm font-medium transition-all',
                      !slot.available && 'opacity-35 cursor-not-allowed',
                      slot.available && selected === slot.label
                        ? 'border-(--color-main) bg-(--color-main)/15 text-(--color-main)'
                        : slot.available
                        ? 'border-[hsl(0_0%_18%)] bg-[hsl(0_0%_8%)] text-[hsl(0_0%_65%)] hover:border-(--color-main)/50 hover:text-white'
                        : 'border-[hsl(0_0%_15%)] bg-[hsl(0_0%_6%)] text-[hsl(0_0%_30%)]'
                    )}
                  >
                    {slot.label}
                    {!slot.available && (
                      <span className="mt-0.5 block text-xs text-[hsl(0_0%_35%)]">{t('hours.unavailable')}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
