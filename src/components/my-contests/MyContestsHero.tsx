'use client';

import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

interface HeroProps {
  participatingCount: number;
  completedCount: number;
}

export function MyContestsHero({ participatingCount, completedCount }: HeroProps) {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden bg-[#0C0C0F] pb-12 pt-40">
      {/* Background Decorative Elements */}
      <div className="absolute left-1/2 top-0 h-[600px] w-[1200px] -translate-x-1/2 bg-neon-mint/5 blur-[120px]" />
      <div className="absolute right-0 top-0 h-full w-1/3 bg-gradient-to-l from-neon-blue/5 to-transparent blur-[100px]" />
      
      <div className="container relative mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-white/5 pb-10">
          <div className="flex flex-col gap-3">
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="font-space text-[12px] font-black uppercase tracking-[0.4em] text-neon-mint"
            >
              {t('my_contests.subtitle')}
            </motion.span>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="font-barlow text-6xl font-black italic tracking-tighter text-[#EEEEF0] md:text-8xl leading-none"
            >
              {t('my_contests.title')}
            </motion.h1>
          </div>

          <div className="flex items-center gap-3 pb-2">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="group flex items-center gap-3 rounded-2xl bg-[#141418] border border-white/5 pl-5 pr-6 py-3 transition-colors hover:border-neon-mint/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <span className="text-[14px] font-black tracking-tight text-[#EEEEF0] flex items-center">
                <span className="text-neon-mint mr-2 text-[10px] drop-shadow-[0_0_8px_rgba(0,212,122,0.6)]">●</span>
                <span className="text-neon-mint mr-1.5">{participatingCount}</span>
                {t('my_contests.summary.participating')}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="group flex items-center gap-3 rounded-2xl bg-[#141418] border border-white/5 pl-5 pr-6 py-3 transition-colors hover:border-neon-blue/30 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
            >
              <span className="text-[14px] font-black tracking-tight text-[#EEEEF0] flex items-center">
                <span className="text-neon-blue mr-2 text-[10px] drop-shadow-[0_0_8px_rgba(43,127,255,0.6)]">●</span>
                <span className="text-neon-blue mr-1.5">{completedCount}</span>
                {t('my_contests.summary.completed')}
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
