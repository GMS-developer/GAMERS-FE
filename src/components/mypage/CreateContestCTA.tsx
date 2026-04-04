'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { PlusCircle, Trophy, Sparkles } from 'lucide-react';
import Link from 'next/link';

export function CreateContestCTA() {
  const { t } = useTranslation();

  return (
    <section className="max-w-[1280px] mx-auto px-6 mb-24">
      <div className="relative overflow-hidden rounded-[32px] bg-gradient-to-br from-[#1C1C21] to-[#0C0C0F] border border-white/5 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 group">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-neon-mint/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/4 group-hover:bg-neon-mint/10 transition-colors" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-sky-400/5 blur-[100px] rounded-full translate-y-1/2 -translate-x-1/4 group-hover:bg-sky-400/10 transition-colors" />
        
        <div className="relative z-10 flex flex-col items-center md:items-start text-center md:text-left gap-4 max-w-[600px]">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neon-mint/10 border border-neon-mint/20">
             <Trophy className="w-3.5 h-3.5 text-neon-mint" />
             <span className="text-[10px] font-black text-neon-mint uppercase tracking-[0.2em]">{t('mypage.cta.badge')}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-[#EEEEF0] leading-tight">
             {t('mypage.cta.title', '당신만의 대회를 열어보세요')}
          </h2>
          <p className="text-[15px] font-bold text-[#7A7A85] leading-relaxed">
             {t('mypage.cta.description', 'GAMERS 플랫폼의 강력한 도구들을 사용하여 누구나 쉽게 게임 대회를 개최하고 운영할 수 있습니다. 지금 바로 시작해보세요!')}
          </p>
        </div>

        <div className="relative z-10 flex flex-col items-center gap-4">
           <Link href="/contest/create">
             <Button 
               variant="riot" 
               className="h-16 px-10 rounded-[20px] bg-neon-mint text-deep-black text-[15px] font-black uppercase tracking-widest gap-3 shadow-[0_10px_30px_rgba(110,231,183,0.3)] hover:scale-105 hover:shadow-[0_15px_40px_rgba(110,231,183,0.4)] transition-all active:scale-95"
             >
               <PlusCircle className="w-5 h-5" />
               {t('mypage.cta.button', '대회 개최하기')}
             </Button>
           </Link>
           <div className="flex items-center gap-2 text-[11px] font-black text-[#4A4A55] uppercase tracking-widest">
              <Sparkles className="w-3 h-3" />
              <span>{t('mypage.cta.free_info')}</span>
           </div>
        </div>
      </div>
    </section>
  );
}
