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
      className="w-full flex items-center justify-between rounded-2xl py-6 px-10 gap-6 border border-[#C89B3C]/30 relative overflow-hidden group"
      style={{ 
        background: 'linear-gradient(135deg, rgba(200, 155, 60, 0.1) 0%, rgba(200, 155, 60, 0.05) 100%)',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* Background Decorative Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-[#C89B3C]/5 rounded-full blur-[80px] -mr-32 -mt-32 transition-all duration-700 group-hover:bg-[#C89B3C]/10" />
      
      <div className="flex items-center gap-8 relative z-10">
        {/* LoL Badge Icon */}
        <div className="flex items-center justify-center shrink-0 rounded-full bg-[#C89B3C] w-16 h-16 shadow-[0_0_20px_rgba(200,155,60,0.3)] group-hover:scale-105 transition-transform duration-500">
          <span className="text-[#0D0D0D] font-barlow text-2xl font-black italic">LoL</span>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-bold text-white tracking-tight">
              {t('contests.list.temporal_banner.title')}
            </h3>
            <div className="rounded-full py-1 px-3 bg-[#39D98A]/10 border border-[#39D98A]/40">
              <span className="text-[#39D98A] text-xs font-semibold">
                {t('contests.list.temporal_banner.badge')}
              </span>
            </div>
          </div>
          <p className="text-[#FFFFFF73] text-sm md:text-base font-medium">
            {t('contests.list.temporal_banner.description')}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3 relative z-10">
        <Button 
          className="h-12 px-6 bg-[#C89B3C] hover:bg-[#D9A94D] text-[#0A1018] font-bold rounded-lg flex items-center gap-2 group/btn shadow-[0_4px_14px_rgba(200,155,60,0.3)]"
          onClick={handleEnter}
        >
          {t('contests.list.temporal_banner.btn_enter')}
          <ChevronRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>
        <Button 
          variant="outline"
          className="h-12 px-6 bg-white/5 border-white/10 hover:bg-white/10 text-[#E0E4E8] font-bold rounded-lg transition-all"
          onClick={handleCreate}
        >
          {t('contests.list.temporal_banner.btn_create')}
        </Button>
      </div>
    </motion.div>
  );
}
