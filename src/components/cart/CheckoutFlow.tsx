import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, CheckCircle, CreditCard, MessageCircle, Flame } from 'lucide-react';
import { useCart } from '../../hooks/useCart';
import { formatPrice } from '../../lib/utils';
import { cn } from '../../lib/utils';
import type { CheckoutStep, DeliveryInfo } from '../../types';

interface Props {
  onBack: () => void;
  onClose: () => void;
}

const steps: CheckoutStep[] = ['cart', 'delivery', 'payment', 'confirmation'];

const slideVariants = {
  enter: (dir: number) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -60 : 60, opacity: 0 }),
};

export function CheckoutFlow({ onBack, onClose }: Props) {
  const { t } = useTranslation();
  const { items, total, clearCart } = useCart();
  const [step, setStep] = useState<CheckoutStep>('cart');
  const [direction, setDirection] = useState(1);
  const [orderNum] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());

  const [info, setInfo] = useState<DeliveryInfo>({
    fullName: '', phone: '', address: '', city: '', postalCode: '', instructions: '', timeSlot: '',
  });

  const deliveryFee = total >= 30 ? 0 : 3;
  const grandTotal = total + deliveryFee;

  const goTo = (next: CheckoutStep) => {
    const currentIdx = steps.indexOf(step);
    const nextIdx = steps.indexOf(next);
    setDirection(nextIdx > currentIdx ? 1 : -1);
    setStep(next);
  };

  const handleConfirm = () => {
    clearCart();
    goTo('confirmation');
  };

  const stepIdx = steps.indexOf(step);

  const deliveryFields: Array<{ key: keyof DeliveryInfo; labelKey: string; type: string }> = [
    { key: 'fullName', labelKey: 'checkout.name', type: 'text' },
    { key: 'phone', labelKey: 'checkout.phone', type: 'tel' },
    { key: 'address', labelKey: 'checkout.address', type: 'text' },
    { key: 'city', labelKey: 'checkout.city', type: 'text' },
    { key: 'postalCode', labelKey: 'checkout.postal', type: 'text' },
  ];

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 border-b border-[hsl(0_0%_14%)] px-6 py-5">
        {step !== 'confirmation' && (
          <button
            onClick={step === 'cart' ? onBack : () => goTo(steps[stepIdx - 1] as CheckoutStep)}
            className="rounded-full bg-[hsl(0_0%_12%)] p-2 text-[hsl(0_0%_55%)] hover:text-white"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <h2 className="text-lg font-semibold text-white">{t('checkout.title')}</h2>
      </div>

      <div className="flex gap-1 px-6 py-4">
        {steps.map((s, i) => (
          <div key={s} className="flex flex-1 flex-col items-center gap-1.5">
            <div className={cn('h-1 w-full rounded-full transition-colors', i <= stepIdx ? 'bg-[hsl(24_100%_50%)]' : 'bg-[hsl(0_0%_15%)]')} />
            <span className={cn('text-[10px] font-medium', i === stepIdx ? 'text-[hsl(24_100%_50%)]' : 'text-[hsl(0_0%_40%)]')}>
              {t('checkout.step_' + s)}
            </span>
          </div>
        ))}
      </div>

      <div className="relative flex-1 overflow-hidden">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={step}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.28, ease: 'easeInOut' }}
            className="absolute inset-0 overflow-y-auto px-6 py-4"
          >
            {step === 'cart' && (
              <div className="space-y-4">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-3 rounded-xl bg-[hsl(0_0%_9%)] p-3">
                    <img src={item.product.image} alt={item.product.name} className="h-14 w-14 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-white">{item.product.name}</p>
                      <p className="text-xs text-[hsl(0_0%_50%)]">x{item.quantity}</p>
                    </div>
                    <p className="text-sm font-semibold text-[hsl(24_100%_50%)]">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                ))}
                <div className="rounded-xl border border-[hsl(0_0%_14%)] p-4 space-y-2">
                  <div className="flex justify-between text-sm text-[hsl(0_0%_55%)]">
                    <span>{t('cart.subtotal')}</span><span className="text-white">{formatPrice(total)}</span>
                  </div>
                  <div className="flex justify-between text-sm text-[hsl(0_0%_55%)]">
                    <span>{t('cart.delivery')}</span>
                    <span className={deliveryFee === 0 ? 'text-[hsl(142_71%_45%)]' : 'text-white'}>
                      {deliveryFee === 0 ? t('cart.free') : formatPrice(deliveryFee)}
                    </span>
                  </div>
                  <div className="flex justify-between border-t border-[hsl(0_0%_14%)] pt-2 font-bold">
                    <span className="text-white">{t('cart.total')}</span>
                    <span className="text-[hsl(24_100%_50%)]">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>
            )}

            {step === 'delivery' && (
              <div className="space-y-4">
                <h3 className="font-semibold text-white">{t('checkout.delivery_title')}</h3>
                {deliveryFields.map(({ key, labelKey, type }) => (
                  <div key={key}>
                    <label className="mb-1.5 block text-xs font-medium text-[hsl(0_0%_65%)]">{t(labelKey)}</label>
                    <input
                      type={type}
                      value={info[key]}
                      onChange={(e) => setInfo({ ...info, [key]: e.target.value })}
                      className="w-full rounded-xl border border-[hsl(0_0%_18%)] bg-[hsl(0_0%_9%)] px-4 py-3 text-sm text-white outline-none focus:border-[hsl(24_100%_50%)]"
                    />
                  </div>
                ))}
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-[hsl(0_0%_65%)]">{t('checkout.instructions')}</label>
                  <textarea
                    rows={2}
                    placeholder={t('checkout.instructions_placeholder')}
                    value={info.instructions}
                    onChange={(e) => setInfo({ ...info, instructions: e.target.value })}
                    className="w-full resize-none rounded-xl border border-[hsl(0_0%_18%)] bg-[hsl(0_0%_9%)] px-4 py-3 text-sm text-white outline-none focus:border-[hsl(24_100%_50%)]"
                  />
                </div>
              </div>
            )}

            {step === 'payment' && (
              <div className="space-y-5">
                <h3 className="font-semibold text-white">{t('checkout.payment_title')}</h3>
                <div className="rounded-xl border border-[hsl(24_100%_50%/0.3)] bg-[hsl(24_100%_50%/0.08)] p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <CreditCard className="h-5 w-5 text-[hsl(24_100%_50%)]" />
                    <p className="font-medium text-white">{t('checkout.card')}</p>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-lg border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_9%)] px-4 py-3 text-sm text-[hsl(0_0%_40%)]">1234 5678 9012 3456</div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-lg border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_9%)] px-4 py-3 text-sm text-[hsl(0_0%_40%)]">MM/AA</div>
                      <div className="rounded-lg border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_9%)] px-4 py-3 text-sm text-[hsl(0_0%_40%)]">CVV</div>
                    </div>
                  </div>
                  <p className="mt-3 flex items-center gap-1.5 text-xs text-[hsl(0_0%_45%)]">
                    <Flame className="h-3.5 w-3.5 text-[hsl(24_100%_50%)]" />
                    {t('checkout.secure')}
                  </p>
                </div>
                <div className="rounded-xl bg-[hsl(0_0%_9%)] p-4 text-sm text-[hsl(0_0%_55%)] space-y-1.5">
                  <div className="flex justify-between"><span>{t('cart.subtotal')}</span><span className="text-white">{formatPrice(total)}</span></div>
                  <div className="flex justify-between"><span>{t('cart.delivery')}</span><span className={deliveryFee === 0 ? 'text-[hsl(142_71%_45%)]' : 'text-white'}>{deliveryFee === 0 ? t('cart.free') : formatPrice(deliveryFee)}</span></div>
                  <div className="flex justify-between border-t border-[hsl(0_0%_14%)] pt-1.5 font-bold text-base"><span className="text-white">{t('cart.total')}</span><span className="text-[hsl(24_100%_50%)]">{formatPrice(grandTotal)}</span></div>
                </div>
              </div>
            )}

            {step === 'confirmation' && (
              <div className="flex flex-col items-center text-center py-8 gap-5">
                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[hsl(142_71%_45%/0.15)]">
                  <CheckCircle className="h-10 w-10 text-[hsl(142_71%_45%)]" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{t('checkout.success_title')}</h3>
                  <p className="mt-2 text-sm text-[hsl(0_0%_55%)]">{t('checkout.success_text')}</p>
                </div>
                <div className="rounded-xl border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_9%)] px-6 py-4">
                  <p className="text-xs text-[hsl(0_0%_45%)]">{t('checkout.order_number')}</p>
                  <p className="mt-1 font-display text-2xl text-[hsl(24_100%_50%)]">#{orderNum}</p>
                </div>
                <a
                  href={'https://wa.me/33621370373?text=' + encodeURIComponent('Bonjour L-Cuisine ! Commande #' + orderNum)}
                  target="_blank"
                  rel="noreferrer"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[#25d366] py-3.5 font-semibold text-white"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t('checkout.whatsapp_confirm')}
                </a>
                <button onClick={onClose} className="text-sm text-[hsl(0_0%_45%)] hover:text-white">
                  Fermer
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {step !== 'confirmation' && (
        <div className="border-t border-[hsl(0_0%_14%)] px-6 py-5">
          {step === 'payment' ? (
            <button
              onClick={handleConfirm}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[hsl(24_100%_50%)] py-4 text-base font-semibold text-black shadow-[0_0_25px_hsl(24_100%_50%/0.3)]"
            >
              {t('checkout.pay')} — {formatPrice(grandTotal)}
            </button>
          ) : (
            <button
              onClick={() => goTo(steps[stepIdx + 1] as CheckoutStep)}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-[hsl(24_100%_50%)] py-4 text-base font-semibold text-black"
            >
              {t('checkout.next')}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
