'use client';

import { motion } from 'framer-motion';
import { Clock, Info } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface PlaygroundHeaderProps {
  title: string;
  game: string;
  host: string;
  timeLeft: string;
}

export function PlaygroundHeader({
  title = "발로란트 신인 오픈컵 시즌 4",
  game = "Valorant",
  host = "GMS_Creator",
  timeLeft = "01:23:45"
}: PlaygroundHeaderProps) {
  const { t } = useTranslation();

  return (
    <header className="h-[72px] border-b border-white/5 bg-[#0C0C0D]/50 backdrop-blur-md px-6">
      <div className="mx-auto flex h-full max-w-[1440px] items-center justify-between">
        {/* Title Section */}
        <div className="flex items-center gap-4">
          <div className="h-9 w-9 rounded-xl bg-neon-red shadow-[0_0_15px_rgba(224,92,92,0.3)] flex items-center justify-center border border-white/10 uppercase font-black text-[10px] text-white">
            V
          </div>
          <div className="flex flex-col">
            <h2 className="text-[17px] font-black italic tracking-tighter text-[#EEEEF0] leading-none mb-1">
              {title}
            </h2>
            <p className="text-[11px] font-bold text-[#5A5A65] tracking-tight uppercase tracking-[0.1em]">
              HOSTED BY {host}
            </p>
          </div>
        </div>

        {/* Timer Section */}
        <div className="flex items-center gap-3 rounded-2xl bg-white/5 border border-white/5 px-5 py-2 group hover:bg-white/10 transition-all cursor-default">
           <div className="flex h-1.5 w-1.5 rounded-full bg-neon-red animate-pulse" />
           <div className="flex flex-col items-end">
              <div className="flex items-center gap-1.5">
                <span className="text-[20px] font-black italic text-[#EEEEF0] leading-none tracking-tight tabular-nums">
                  {timeLeft}
                </span>
                <span className="text-[11px] font-black text-neon-red uppercase tracking-wider">{t('common.remaining')}</span>
              </div>
           </div>
        </div>
      </div>
    </header>
  );
}
