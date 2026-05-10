import { useTranslation } from 'react-i18next';
import { MessageCircle, Truck, Bell, Package } from 'lucide-react';
import { FadeIn, SectionBadge } from '../effects/FadeIn';
import { deliveryZones } from '../../data';
import { formatPrice } from '../../lib/utils';

export function Delivery() {
  const { t } = useTranslation();

  const infos = [
    { icon: Truck, titleKey: 'delivery.info1_title', descKey: 'delivery.info1_desc' },
    { icon: Bell, titleKey: 'delivery.info2_title', descKey: 'delivery.info2_desc' },
    { icon: Package, titleKey: 'delivery.info3_title', descKey: 'delivery.info3_desc' },
  ];

  return (
    <section id="delivery" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_20%_50%,hsl(24_100%_50%/0.06),transparent)]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <FadeIn className="mb-16 text-center">
          <SectionBadge>{t('delivery.badge')}</SectionBadge>
          <h2 className="font-display mt-4 text-[clamp(2.8rem,6vw,5rem)] uppercase leading-none text-white">
            {t('delivery.title').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-(--color-main)">{line}</span> : line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(0_0%_55%)]">{t('delivery.subtitle')}</p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn direction="right">
            <div className="rounded-3xl border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_8%)] overflow-hidden">
              <div className="border-b border-[hsl(0_0%_15%)] px-6 py-4">
                <h3 className="font-semibold text-white">{t('delivery.zones_title')}</h3>
              </div>
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[hsl(0_0%_12%)]">
                    {['zone_col_zone', 'zone_col_price', 'zone_col_min', 'zone_col_time'].map((col) => (
                      <th key={col} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wider text-[hsl(0_0%_45%)]">
                        {t('delivery.' + col)}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {deliveryZones.map((zone, i) => (
                    <tr key={zone.name} className={i % 2 === 0 ? '' : 'bg-[hsl(0_0%_6%)]'}>
                      <td className="px-5 py-3.5 text-sm font-medium text-white">{zone.name}</td>
                      <td className="px-5 py-3.5 text-sm text-(--color-main) font-semibold">
                        {zone.price === 0 ? t('delivery.free') : formatPrice(zone.price)}
                      </td>
                      <td className="px-5 py-3.5 text-sm text-[hsl(0_0%_60%)]">{formatPrice(zone.minOrder)}</td>
                      <td className="px-5 py-3.5 text-sm text-[hsl(0_0%_60%)]">{zone.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <a
              href="https://wa.me/33621370373"
              target="_blank"
              rel="noreferrer"
              className="mt-6 flex w-full items-center justify-center gap-3 rounded-2xl bg-[#25d366] py-4 text-base font-semibold text-white transition-opacity hover:opacity-90"
            >
              <MessageCircle className="h-5 w-5" />
              {t('delivery.whatsapp')}
            </a>
          </FadeIn>

          <div className="flex flex-col gap-5">
            {infos.map((info, i) => (
              <FadeIn key={info.titleKey} delay={i * 0.1}>
                <div className="flex gap-5 rounded-2xl border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_8%)] p-6">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-(--color-main)/15">
                    <info.icon className="h-5 w-5 text-(--color-main)" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">{t(info.titleKey)}</h4>
                    <p className="mt-1 text-sm text-[hsl(0_0%_55%)]">{t(info.descKey)}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
