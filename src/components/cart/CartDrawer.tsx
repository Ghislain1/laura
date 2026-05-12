import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Flower2 } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../lib/utils';
import { CheckoutFlow } from './CheckoutFlow';
import { products } from '../../data';

export function CartDrawer() {
  const { t } = useTranslation();
  const { items, isOpen, closeCart, removeItem, updateQty, total, itemCount, addItem } = useCart();
  const [checkingOut, setCheckingOut] = useState(false);

  const deliveryFee = total >= 30 ? 0 : total > 0 ? 3 : 0;
  const upsellProducts = products.filter((p) => !items.find((i) => i.product.id === p.id)).slice(0, 2);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeCart}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-[hsl(0_0%_6%)] shadow-2xl"
          >
            {checkingOut ? (
              <CheckoutFlow onBack={() => setCheckingOut(false)} onClose={closeCart} />
            ) : (
              <>
                <div className="flex items-center justify-between border-b border-[hsl(0_0%_14%)] px-6 py-5">
                  <div className="flex items-center gap-3">
                    <ShoppingBag className="h-5 w-5 text-(--color-main)" />
                    <h2 className="text-lg font-semibold text-white">{t('cart.title')}</h2>
                    {itemCount > 0 && (
                      <span className="rounded-full bg-(--color-main) px-2 py-0.5 text-xs font-bold text-black">
                        {itemCount}
                      </span>
                    )}
                  </div>
                  <button
                    onClick={closeCart}
                    className="rounded-full bg-[hsl(0_0%_12%)] p-2 text-[hsl(0_0%_55%)] transition-colors hover:text-white"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {items.length === 0 ? (
                    <div className="flex flex-col items-center justify-center gap-5 py-20 text-center">
                      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(0_0%_10%)]">
                        <ShoppingBag className="h-9 w-9 text-[hsl(0_0%_35%)]" />
                      </div>
                      <div>
                        <p className="font-medium text-white">{t('cart.empty')}</p>
                      </div>
                      <button
                        onClick={closeCart}
                        className="rounded-full border border-[hsl(0_0%_20%)] px-6 py-2.5 text-sm font-medium text-[hsl(0_0%_65%)] hover:text-white"
                      >
                        {t('cart.empty_cta')}
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <AnimatePresence initial={false}>
                        {items.map((item) => (
                          <motion.div
                            key={item.product.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
                            transition={{ duration: 0.25 }}
                            className="flex gap-4 rounded-2xl border border-[hsl(0_0%_14%)] bg-[hsl(0_0%_9%)] p-4"
                          >
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="rounded-xl object-cover"
                              style={{ width: 72, height: 72 }}
                            />
                            <div className="flex flex-1 flex-col gap-2">
                              <div className="flex items-start justify-between gap-2">
                                <p className="text-sm font-medium text-white leading-tight">{item.product.name}</p>
                                <button
                                  onClick={() => removeItem(item.product.id)}
                                  className="text-[hsl(0_0%_40%)] hover:text-[hsl(354_79%_46%)] shrink-0"
                                >
                                  <X className="h-4 w-4" />
                                </button>
                              </div>
                              <p className="text-sm font-semibold text-(--color-main)">
                                {formatPrice(item.product.price * item.quantity)}
                              </p>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQty(item.product.id, item.quantity - 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(0_0%_14%)] text-[hsl(0_0%_55%)] hover:text-white"
                                >
                                  <Minus className="h-3.5 w-3.5" />
                                </button>
                                <span className="w-6 text-center text-sm font-semibold text-white">
                                  {item.quantity}
                                </span>
                                <button
                                  onClick={() => updateQty(item.product.id, item.quantity + 1)}
                                  className="flex h-7 w-7 items-center justify-center rounded-full bg-[hsl(0_0%_14%)] text-[hsl(0_0%_55%)] hover:text-white"
                                >
                                  <Plus className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>

                      {upsellProducts.length > 0 && (
                        <div className="mt-4 pt-4 border-t border-[hsl(0_0%_12%)]">
                          <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[hsl(0_0%_45%)]">
                            <Flower2 className="h-3.5 w-3.5 text-(--color-main)" />
                            {t('cart.upsell')}
                          </p>
                          <div className="flex flex-col gap-2">
                            {upsellProducts.map((p) => (
                              <button
                                key={p.id}
                                onClick={() => addItem(p)}
                                className="flex items-center gap-3 rounded-xl border border-[hsl(0_0%_14%)] bg-[hsl(0_0%_9%)] p-3 text-left transition-colors hover:border-(--color-main)/40"
                              >
                                <img src={p.image} alt={p.name} className="h-12 w-12 rounded-lg object-cover" />
                                <div className="flex-1 min-w-0">
                                  <p className="text-sm font-medium text-white truncate">{p.name}</p>
                                  <p className="text-xs text-(--color-main)">{formatPrice(p.price)}</p>
                                </div>
                                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-(--color-main)/15 text-(--color-main)">
                                  <Plus className="h-4 w-4" />
                                </div>
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {items.length > 0 && (
                  <div className="border-t border-[hsl(0_0%_14%)] px-6 py-5 space-y-3">
                    <div className="flex justify-between text-sm text-[hsl(0_0%_55%)]">
                      <span>{t('cart.subtotal')}</span>
                      <span className="text-white">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm text-[hsl(0_0%_55%)]">
                      <span>{t('cart.delivery')}</span>
                      <span className={deliveryFee === 0 ? 'text-[hsl(142_71%_45%)]' : 'text-white'}>
                        {deliveryFee === 0 ? t('cart.free') : formatPrice(deliveryFee)}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-[hsl(0_0%_14%)] pt-3 text-base font-bold">
                      <span className="text-white">{t('cart.total')}</span>
                      <span className="text-(--color-main)">{formatPrice(total + deliveryFee)}</span>
                    </div>
                    <button
                      onClick={() => setCheckingOut(true)}
                      className="flex w-full items-center justify-center gap-2 rounded-2xl bg-(--color-main) py-4 text-base font-semibold text-black transition-all hover:brightness-110"
                      style={{ boxShadow: '0 0 25px color-mix(in srgb, var(--color-main) 30%, transparent)' }}
                    >
                      {t('cart.checkout')}
                      <ArrowRight className="h-5 w-5" />
                    </button>
                    <button onClick={closeCart} className="w-full py-2 text-sm text-[hsl(0_0%_45%)] hover:text-white">
                      {t('cart.continue')}
                    </button>
                  </div>
                )}
              </>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
