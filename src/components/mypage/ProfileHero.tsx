'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Settings, UserCircle, Trophy, Target, PlayCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export function ProfileHero() {
  const { t } = useTranslation();

  return (
    <section className="relative overflow-hidden pt-24 pb-12">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[300px] bg-neon-mint/5 blur-[120px] rounded-full -translate-y-1/2 pointer-events-none" />
      
      <div className="max-w-[1280px] mx-auto px-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-8">
        {/* Left Side: Avatar & Info */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 flex-1">
          {/* Avatar Area */}
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-neon-mint to-emerald-600 flex items-center justify-center text-4xl font-black text-deep-black shadow-[0_0_40px_rgba(110,231,183,0.2)]">
              SP
            </div>
            <div className="absolute -bottom-1 -right-1 w-10 h-10 rounded-full bg-[#141418] border-2 border-neon-mint/30 flex items-center justify-center text-neon-mint">
               <UserCircle className="w-6 h-6" />
            </div>
          </div>

          {/* User Info */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-3">
                <h1 className="text-3xl font-black text-[#EEEEF0] tracking-tight">StarPlayer_KR</h1>
                <span className="text-lg font-bold text-[#7A7A85]">#KR01</span>
                <div className="px-2 py-0.5 rounded bg-neon-mint/10 border border-neon-mint/20">
                  <span className="text-[10px] font-black text-neon-mint uppercase tracking-widest">{t('mypage.member_tag', 'MEMBER')}</span>
                </div>
              </div>
              <p className="text-[#BBBBCB] font-medium leading-relaxed max-w-xl">
                {t('mypage.bio_default')}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="riot" 
                className="bg-[#1C1C21] hover:bg-[#242428] border border-white/5 text-[13px] font-bold px-6 h-10 flex items-center gap-2"
              >
                {t('mypage.edit_profile')}
              </Button>
              <Button 
                variant="riot" 
                className="bg-[#1C1C21] hover:bg-[#242428] border border-white/10 p-2.5 h-10 w-10 flex items-center justify-center"
              >
                <Settings className="w-4 h-4 text-[#7A7A85]" />
              </Button>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Stats */}
        <div className="grid grid-cols-3 gap-3 md:w-[480px]">
          <StatCard 
            label={t('mypage.stats.contests')} 
            value="14" 
            icon={<Target className="w-5 h-5 text-[#7A7A85]" />} 
          />
          <StatCard 
            label={t('mypage.stats.win_rate')} 
            value="68%" 
            icon={<PlayCircle className="w-5 h-5 text-[#7A7A85]" />} 
            highlight
          />
          <StatCard 
            label={t('mypage.stats.trophies')} 
            value="3" 
            icon={<Trophy className="w-5 h-5 text-[#7A7A85]" />} 
          />

        </div>
      </div>
    </section>
  );
}

function StatCard({ label, value, icon, highlight = false }: { label: string, value: string, icon: React.ReactNode, highlight?: boolean }) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="relative flex flex-col items-center justify-center gap-2 rounded-2xl bg-[#0C0C0F] border border-white/5 p-6 min-h-[120px] transition-all hover:bg-[#111115] group overflow-hidden"
    >
      {highlight && (
        <div className="absolute inset-0 bg-neon-mint/5 opacity-50 pointer-events-none" />
      )}
      <div className="flex flex-col items-center gap-0.5">
        <span className={highlight ? "text-3xl font-black text-neon-mint" : "text-3xl font-black text-[#EEEEF0]"}>
          {value}
        </span>
        <span className="text-[11px] font-black text-[#4A4A55] uppercase tracking-widest text-center h-4 flex items-center">
          {label}
        </span>
      </div>
    </motion.div>
  );
}
