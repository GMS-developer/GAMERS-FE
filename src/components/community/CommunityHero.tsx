'use client';

import { useTranslation } from 'react-i18next';
import { Plus } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export function CommunityHero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-deep-black pt-32 pb-16">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,rgba(110,231,183,0.08)_0%,transparent_50%)]" />
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/5 to-transparent" />
      
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col items-center justify-between gap-8 md:flex-row md:items-end">
          <div className="flex flex-col gap-4">
            <h1 className="font-barlow text-5xl font-black tracking-tighter text-white md:text-7xl uppercase leading-none">
              {t('community.title')}
            </h1>
            <p className="max-w-md text-lg md:text-xl text-muted-gray font-medium leading-relaxed">
              {t('community.subtitle')}
            </p>
          </div>
          
          <Link href="/community/write">
            <Button 
              className="group flex items-center gap-2 rounded-2xl bg-white/5 px-8 h-16 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-foreground font-bold text-lg shadow-[0_4px_20px_rgba(0,0,0,0.2)]"
            >
              <div className="flex items-center justify-center h-6 w-6 rounded bg-neon-mint/20 text-neon-mint group-hover:scale-110 transition-transform">
                <Plus className="h-4 w-4 stroke-[3px]" />
              </div>
              <span>{t('community.write_post')}</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
