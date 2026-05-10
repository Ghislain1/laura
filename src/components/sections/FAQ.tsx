import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ChevronDown } from 'lucide-react';
import { FadeIn, SectionBadge } from '../effects/FadeIn';
import { faqItems } from '../../data';
import { cn } from '../../lib/utils';

export function FAQ() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState<string | null>(null);

  return (
    <section className="relative py-24 bg-[hsl(0_0%_6%)]">
      <div className="relative mx-auto max-w-3xl px-6">
        <FadeIn className="mb-14 text-center">
          <SectionBadge>{t('faq.badge')}</SectionBadge>
          <h2 className="font-display mt-4 text-[clamp(2.8rem,6vw,5rem)] uppercase leading-none text-white">
            {t('faq.title').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-(--color-main)">{line}</span> : line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(0_0%_55%)]">{t('faq.subtitle')}</p>
        </FadeIn>

        <div className="space-y-3">
          {faqItems.map((item, i) => {
            const isOpen = open === item.id;
            const question = i18n.language === 'fr' ? item.question : item.questionEn;
            const answer = i18n.language === 'fr' ? item.answer : item.answerEn;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className={cn(
                  'rounded-2xl border transition-colors',
                  isOpen
                    ? 'border-(--color-main)/30 bg-(--color-main)/5'
                    : 'border-[hsl(0_0%_15%)] bg-[hsl(0_0%_8%)]'
                )}
              >
                <button
                  onClick={() => setOpen(isOpen ? null : item.id)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <span className={cn('font-medium', isOpen ? 'text-white' : 'text-[hsl(0_0%_75%)]')}>
                    {question}
                  </span>
                  <ChevronDown
                    className={cn(
                      'h-5 w-5 shrink-0 text-(--color-main) transition-transform duration-300',
                      isOpen && 'rotate-180'
                    )}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: 'easeInOut' }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-sm leading-relaxed text-[hsl(0_0%_55%)]">{answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
