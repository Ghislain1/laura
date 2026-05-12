import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MessageCircle, MapPin, Clock, Send } from 'lucide-react';
import { FadeIn, SectionBadge } from '../effects/FadeIn';

export function Contact() {
  const { t } = useTranslation();
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = encodeURIComponent(
      'Bonjour L-Cuisine !\n\nNom: ' + form.name + '\nEmail: ' + form.email + '\n\nMessage:\n' + form.message
    );
    window.open('https://wa.me/4915219507682?text=' + text, '_blank');
  };

  const infos = [
    { icon: MessageCircle, valueKey: 'contact.phone', href: 'https://wa.me/4915219507682' },
    { icon: MapPin, valueKey: 'contact.location' },
    { icon: Clock, valueKey: 'contact.hours' },
  ];

  return (
    <section id="contact" className="relative py-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,hsl(24_100%_50%/0.05),transparent)]" />

      <div className="relative mx-auto max-w-[1400px] px-6">
        <FadeIn className="mb-14 text-center">
          <SectionBadge>{t('contact.badge')}</SectionBadge>
          <h2 className="font-display mt-4 text-[clamp(2.8rem,6vw,5rem)] uppercase leading-none text-white">
            {t('contact.title').split('\n').map((line, i) => (
              <span key={i} className="block">
                {i === 1 ? <span className="text-(--color-main)">{line}</span> : line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-[hsl(0_0%_55%)]">{t('contact.subtitle')}</p>
        </FadeIn>

        <div className="grid gap-12 lg:grid-cols-2">
          <FadeIn direction="right">
            <form onSubmit={handleWhatsApp} className="space-y-5">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(0_0%_75%)]">
                  {t('contact.name_label')}
                </label>
                <input
                  type="text"
                  required
                  placeholder={t('contact.name_placeholder')}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-xl border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_8%)] px-4 py-3 text-sm text-white placeholder-[hsl(0_0%_40%)] outline-none transition-colors focus:border-(--color-main)"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(0_0%_75%)]">
                  {t('contact.email_label')}
                </label>
                <input
                  type="email"
                  required
                  placeholder={t('contact.email_placeholder')}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-xl border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_8%)] px-4 py-3 text-sm text-white placeholder-[hsl(0_0%_40%)] outline-none transition-colors focus:border-(--color-main)"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-[hsl(0_0%_75%)]">
                  {t('contact.message_label')}
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder={t('contact.message_placeholder')}
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full resize-none rounded-xl border border-[hsl(0_0%_20%)] bg-[hsl(0_0%_8%)] px-4 py-3 text-sm text-white placeholder-[hsl(0_0%_40%)] outline-none transition-colors focus:border-(--color-main)"
                />
              </div>

              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="submit"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-[#25d366] py-3.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                  <MessageCircle className="h-5 w-5" />
                  {t('contact.send_whatsapp')}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    window.location.href = 'mailto:contact@laurac.fr?subject=Message depuis le site&body=' + encodeURIComponent(form.message);
                  }}
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-[hsl(0_0%_20%)] py-3.5 text-sm font-semibold text-[hsl(0_0%_65%)] transition-colors hover:border-(--color-main) hover:text-white"
                >
                  <Send className="h-4 w-4" />
                  {t('contact.send_email')}
                </button>
              </div>
            </form>
          </FadeIn>

          <FadeIn delay={0.15}>
            <div className="lg:pl-8">
              <h3 className="mb-6 font-semibold text-white">{t('contact.info_title')}</h3>
              <div className="space-y-5">
                {infos.map((info) => {
                  const content = (
                    <>
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-(--color-main)/15">
                        <info.icon className="h-5 w-5 text-(--color-main)" />
                      </div>
                      <span className="text-sm text-[hsl(0_0%_65%)]">{t(info.valueKey)}</span>
                    </>
                  );
                  return info.href ? (
                    <a
                      key={info.valueKey}
                      href={info.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-4 transition-opacity hover:opacity-80"
                    >
                      {content}
                    </a>
                  ) : (
                    <div key={info.valueKey} className="flex items-center gap-4">
                      {content}
                    </div>
                  );
                })}
              </div>

              <div
                className="mt-10 h-56 overflow-hidden rounded-2xl border border-[hsl(0_0%_15%)] bg-[hsl(0_0%_8%)] bg-cover bg-center"
                style={{ backgroundImage: 'url(https://media.istockphoto.com/id/1594168691/photo/cityscape-of-mainz-with-mainz-cathedral.jpg)' }}
              >
                <div className="flex h-full items-center justify-center bg-black/40">
                  <div className="rounded-xl bg-[hsl(0_0%_8%/0.9)] px-4 py-2 text-sm text-white backdrop-blur-sm">
                    Mainz, Deutschland
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
