import { useTranslation } from 'react-i18next';
import { Flame } from 'lucide-react';

export function AnnouncementBar() {
  const { t } = useTranslation();

  const items = [
    t('announcement.text1'),
    t('announcement.text2'),
    t('announcement.text3'),
    t('announcement.text4'),
    t('announcement.text5'),
    t('announcement.text6'),
  ];

  const doubled = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-[hsl(0_0%_15%)]  pt-12">
      <div className="flex animate-[marquee_22s_linear_infinite]" style={{ width: 'max-content' }}>
        {doubled.map((text, i) => (
          <span key={i} className="flex items-center gap-3 px-8 text-sm font-medium text-[hsl(0_0%_65%)] whitespace-nowrap">
            <Flame className="h-3.5 w-3.5 shrink-0 text-(--color-main)" />
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
