import { useTranslation } from 'react-i18next';
import { Flame } from 'lucide-react';
import { FadeIn, SectionBadge } from '../effects/FadeIn';

export function About() {
  const { t } = useTranslation();
  const about_bg = "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85"

  const stats = [
    { value: t('about.stat1_value'), label: t('about.stat1_label') },
    { value: t('about.stat2_value'), label: t('about.stat2_label') },
    { value: t('about.stat3_value'), label: t('about.stat3_label') },
  ];

  return (
    <section id="about" className="relative overflow-hidden py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_80%_50%,hsl(354_79%_46%/0.07),transparent)]" />

      <div className="relative mx-auto grid max-w-[1400px] items-center gap-16 px-6 lg:grid-cols-2">
        {/* Left ï¿½ Image stack */}
        <FadeIn direction="right">
          <div className="relative h-[500px]">
            <div
              className="absolute inset-0 rounded-3xl bg-cover bg-center"
              style={{
                backgroundImage: `url(${about_bg})`,
              }}
            />
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[hsl(0_0%_4%/0.5)] to-transparent" />

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-6 rounded-2xl bg-(--color-main) px-6 py-5 shadow-2xl">
              <p className="font-display text-4xl text-black">100%</p>
              <p className="text-sm font-semibold text-black/80">Fait Maison</p>
            </div>

            {/* Ember glow */}
            <div className="pointer-events-none absolute -top-8 -left-8 h-40 w-40 rounded-full bg-(--color-main)/15 blur-3xl" />
          </div>
        </FadeIn>

        {/* Right ï¿½ Text */}
        <div>
          <FadeIn delay={0.1}>
            <SectionBadge>{t('about.badge')}</SectionBadge>
          </FadeIn>
          <FadeIn delay={0.2}>
            <h2 className="font-display mt-4 text-[clamp(2.8rem,5vw,4.5rem)] uppercase leading-none text-white">
              {t('about.title').split('\n').map((line, i) => (
                <span key={i} className="block">
                  {i === 1 ? <span className="text-(--color-main)">{line}</span> : line}
                </span>
              ))}
            </h2>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-6 space-y-4 text-[hsl(0_0%_60%)] leading-relaxed">
              <p>{t('about.story1')}</p>
              <p className="flex items-start gap-2">
                <Flame className="mt-1 h-4 w-4 shrink-0 text-(--color-main)" />
                {t('about.story2')}
              </p>
              <p className="text-[hsl(0_0%_75%)] font-medium">{t('about.story3')}</p>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.4}>
            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-[hsl(0_0%_15%)] pt-10">
              {stats.map((stat) => (
                <div key={stat.label}>
                  <p className="font-display text-3xl text-(--color-main)">{stat.value}</p>
                  <p className="mt-1 text-sm text-[hsl(0_0%_55%)]">{stat.label}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
