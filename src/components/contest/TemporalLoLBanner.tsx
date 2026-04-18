'use client';

import { useRouter } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function TemporalLoLBanner() {
  const { t } = useTranslation();
  const router = useRouter();

  const handleEnter = () => {
    router.push('/temporal-team');
  };

  const handleCreate = () => {
    router.push('/temporal-team');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full flex flex-col md:flex-row md:items-center md:justify-between rounded-3xl p-6 md:px-10 md:py-8 gap-6 md:gap-8 border border-[#C89B3C]/30 relative overflow-hidden group"
      style={{ 
        background: 'linear-gradient(135deg, rgba(200, 155, 60, 0.12) 0%, rgba(200, 155, 60, 0.05) 100%)',
        backdropFilter: 'blur(12px)'
      }}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C89B3C]/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-[#C89B3C]/10" />
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-5 md:gap-8 relative z-10 text-center md:text-left">
        {/* LoL Badge Icon */}
        <div className="flex items-center justify-center shrink-0 rounded-2xl bg-gradient-to-br from-[#C89B3C] to-[#8E6E2E] w-14 h-14 md:w-16 md:h-16 shadow-[0_8px_20px_rgba(200,155,60,0.3)] group-hover:scale-105 transition-transform duration-500">
          <span className="text-[#0D0D0D] font-barlow text-xl md:text-2xl font-black italic">LoL</span>
        </div>

        <div className="flex flex-col gap-2 md:gap-3">
          <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4">
            <h3 className="text-xl md:text-2xl font-black text-white tracking-tight leading-none italic font-barlow">
              {t('contests.list.temporal_banner.title')}
            </h3>
            <div className="rounded-full py-0.5 px-3 bg-[#39D98A]/10 border border-[#39D98A]/30">
              <span className="text-[#39D98A] text-[10px] md:text-xs font-bold uppercase tracking-wider">
                {t('contests.list.temporal_banner.badge')}
              </span>
            </div>
          </div>
          <p className="text-[#FFFFFF73] text-sm md:text-base font-medium max-w-[280px] md:max-w-md">
            {t('contests.list.temporal_banner.description')}
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-3 relative z-10 w-full md:w-auto mt-2 md:mt-0">
        <Button 
          className="w-full sm:w-auto h-12 md:h-14 px-8 bg-[#C89B3C] hover:bg-[#D9A94D] text-[#0A1018] font-black uppercase text-xs md:text-sm tracking-widest rounded-xl flex items-center justify-center gap-2 group/btn shadow-[0_4px_14px_rgba(200,155,60,0.3)] transition-all active:scale-[0.98]"
          onClick={handleEnter}
        >
          {t('contests.list.temporal_banner.btn_enter')}
          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
        <Button 
          variant="outline"
          className="w-full sm:w-auto h-12 md:h-14 px-8 bg-white/5 border-white/10 hover:bg-white/10 text-[#E0E4E8] font-black uppercase text-xs md:text-sm tracking-widest rounded-xl transition-all active:scale-[0.98]"
          onClick={handleCreate}
        >
          {t('contests.list.temporal_banner.btn_create')}
        </Button>
      </div>
    </motion.div>
  );
}
