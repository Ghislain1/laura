import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Plus, Check, Flame, X } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { cn, formatPrice } from '../../lib/utils';
import type { Product, ProductOption } from '../../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { t, i18n } = useTranslation();
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedSpice, setSelectedSpice] = useState<'mild' | 'medium' | 'hot'>('mild');
  const [selectedOption, setSelectedOption] = useState<ProductOption | null>(
    product.options?.[0] ?? null
  );

  const name = i18n.language === 'fr' ? product.name : product.nameEn;
  const description = i18n.language === 'fr' ? product.description : product.descriptionEn;

  const handleQuickAdd = () => {
    if (product.options && product.options.length > 0) {
      setShowOptions(true);
      return;
    }
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  const handleAddWithOptions = () => {
    addItem(product, selectedSpice, selectedOption ? [selectedOption] : []);
    setShowOptions(false);
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  };

  return (
    <>
      <motion.div
        className="group relative flex flex-col overflow-hidden rounded-2xl bg-[hsl(0_0%_10%)] border border-[hsl(0_0%_15%)]"
        whileHover={{ y: -4, boxShadow: '0 20px 60px hsl(0 0% 0% / 0.4)' }}
        transition={{ duration: 0.25 }}
      >
        <div className="relative h-52 overflow-hidden">
          <motion.img
            src={product.image}
            alt={name}
            className="h-full w-full object-cover"
            whileHover={{ scale: 1.06 }}
            transition={{ duration: 0.4 }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(0_0%_10%)] via-transparent to-transparent" />
          {product.popular && (
            <div className="absolute left-3 top-3 flex items-center gap-1 rounded-full bg-(--color-special) px-2.5 py-1 text-xs font-semibold text-white">
              <Flame className="h-3 w-3" />
              {t('menu.popular')}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col gap-3 p-5">
          <div>
            <h3 className="font-display text-xl leading-tight text-white">{name}</h3>
            <p className="mt-1.5 text-sm leading-relaxed text-[hsl(0_0%_55%)] line-clamp-2">{description}</p>
          </div>

          <div className="mt-auto flex items-center justify-between">
            <span className="font-display text-2xl text-(--color-main)">
              {formatPrice(product.price)}
            </span>
            <motion.button
              onClick={handleQuickAdd}
              className={cn(
                'flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                added
                  ? 'bg-[hsl(142_71%_45%)] text-white'
                  : 'bg-(--color-main) text-black hover:bg-[hsl(24_100%_45%)]'
              )}
              whileTap={{ scale: 0.93 }}
            >
              <AnimatePresence mode="wait" initial={false}>
                {added ? (
                  <motion.span
                    key="added"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Check className="h-4 w-4" />
                    {t('menu.added')}
                  </motion.span>
                ) : (
                  <motion.span
                    key="add"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="flex items-center gap-1"
                  >
                    <Plus className="h-4 w-4" />
                    {t('menu.add')}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showOptions && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 sm:items-center"
            onClick={() => setShowOptions(false)}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ type: 'spring', damping: 22, stiffness: 300 }}
              className="w-full max-w-md rounded-t-3xl bg-[hsl(0_0%_10%)] p-6 sm:rounded-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-5 flex items-start justify-between">
                <div>
                  <h3 className="font-display text-2xl text-white">{name}</h3>
                  <p className="text-(--color-main) font-semibold">{formatPrice(product.price)}</p>
                </div>
                <button onClick={() => setShowOptions(false)} className="rounded-full bg-[hsl(0_0%_15%)] p-2 text-[hsl(0_0%_55%)] hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="mb-5">
                <p className="mb-2 text-sm font-semibold text-[hsl(0_0%_75%)]">{t('menu.spice')}</p>
                <div className="flex gap-2">
                  {(['mild', 'medium', 'hot'] as const).map((level) => (
                    <button
                      key={level}
                      onClick={() => setSelectedSpice(level)}
                      className={cn(
                        'flex-1 rounded-xl border py-2.5 text-sm font-medium transition-colors',
                        selectedSpice === level
                          ? 'border-(--color-main) bg-(--color-main)/15 text-(--color-main)'
                          : 'border-[hsl(0_0%_20%)] text-[hsl(0_0%_55%)]'
                      )}
                    >
                      {t('menu.' + level)}
                    </button>
                  ))}
                </div>
              </div>

              {product.options && (
                <div className="mb-6">
                  <p className="mb-2 text-sm font-semibold text-[hsl(0_0%_75%)]">{t('menu.sauce')}</p>
                  <div className="flex flex-col gap-2">
                    {product.options.map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => setSelectedOption(opt)}
                        className={cn(
                          'rounded-xl border px-4 py-2.5 text-left text-sm font-medium transition-colors',
                          selectedOption?.id === opt.id
                            ? 'border-(--color-main) bg-(--color-main)/15 text-(--color-main)'
                            : 'border-[hsl(0_0%_20%)] text-[hsl(0_0%_55%)]'
                        )}
                      >
                        {i18n.language === 'fr' ? opt.name : opt.nameEn}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleAddWithOptions}
                className="w-full rounded-2xl bg-(--color-main) py-3.5 text-base font-semibold text-black"
              >
                {t('menu.addToCart')} — {formatPrice(product.price)}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
