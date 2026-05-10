import { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { products } from '../../data';
import { ProductCard } from './ProductCard';
import { FadeIn, SectionBadge } from '../effects/FadeIn';

type Category = 'all' | 'fish' | 'chicken' | 'sides';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export function Menu() {
  const { t } = useTranslation();
  const [category, setCategory] = useState<Category>('all');

  const categories: { id: Category; label: string }[] = [
    { id: 'all', label: t('menu.all') },
    { id: 'fish', label: t('menu.fish') },
    { id: 'chicken', label: t('menu.chicken') },
    { id: 'sides', label: t('menu.sides') },
  ];

  const filtered = category === 'all' ? products : products.filter((p) => p.category === category);

  return (
    <section id="menu" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,hsl(24_100%_50%/0.04),transparent)]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <FadeIn className="mb-14 text-center">
          <SectionBadge>{t('nav.menu')}</SectionBadge>
          <h2 className="font-display mt-4 text-[clamp(2.8rem,6vw,5rem)] uppercase leading-none text-white">
            {t('menu.title')}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(0_0%_55%)]">{t('menu.subtitle')}</p>
        </FadeIn>

        <FadeIn delay={0.1} className="mb-10 flex justify-center gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={'relative rounded-full px-6 py-2.5 text-sm font-medium transition-colors ' + (category === cat.id ? 'text-black' : 'text-[hsl(0_0%_55%)] hover:text-white')}
            >
              {category === cat.id && (
                <motion.span
                  layoutId="cat-pill"
                  className="absolute inset-0 rounded-full bg-[hsl(24_100%_50%)]"
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                />
              )}
              <span className="relative">{cat.label}</span>
            </button>
          ))}
        </FadeIn>

        <motion.div
          key={category}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          {filtered.map((product) => (
            <motion.div key={product.id} variants={itemVariants}>
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
