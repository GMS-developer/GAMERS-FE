'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ChevronRight, Trophy, Calendar, Users } from 'lucide-react';

export function ContestHistory() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('participating');

  const tabs = [
    { id: 'participating', label: t('mypage.contests.tabs.participating', '참가 중') },
    { id: 'completed', label: t('mypage.contests.tabs.completed', '완료') },
    { id: 'hosted', label: t('mypage.contests.tabs.hosted', '주최') }
  ];

  const contestData = {
    participating: [
      {
        id: 1,
        title: '발로란트 신인 오픈컵 시즌 3',
        info: 'Team Alpha · 4강 진출',
        status: 'ONGOING',
        date: '2026-04-05',
        color: 'neon-mint'
      },
      {
        id: 2,
        title: '리그 오브 레전드 커뮤니티 5vs5',
        info: 'NexusGG · 참가 신청 완료',
        status: 'UPCOMING',
        date: '2026-04-12',
        color: 'sky-400'
      }
    ],
    completed: [
      {
        id: 3,
        title: 'Apex Legends 듀오 챌린지',
        info: 'ApexDuo · 16강 탈락',
        status: 'ENDED',
        date: '2026-03-15',
        color: 'gray-500'
      }
    ],
    hosted: []
  };

  const currentContests = contestData[activeTab as keyof typeof contestData] || [];

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-[13px] font-black text-[#BBBBCB] uppercase tracking-[0.2em]">
          {t('mypage.contests.title', '내 대회')}
        </h3>
        
        {/* Custom Tabs */}
        <div className="flex items-center p-1 bg-[#141418] border border-white/5 rounded-xl">
           {tabs.map((tab) => (
             <button
               key={tab.id}
               onClick={() => setActiveTab(tab.id)}
               className={cn(
                 "relative px-6 py-2 rounded-lg text-[13px] font-black transition-all",
                 activeTab === tab.id ? "text-neon-mint" : "text-[#7A7A85] hover:text-[#EEEEF0]"
               )}
             >
               {activeTab === tab.id && (
                 <motion.div 
                   layoutId="activeTab" 
                   className="absolute inset-0 bg-neon-mint/5 border border-neon-mint/10 rounded-lg"
                 />
               )}
               {tab.label}
             </button>
           ))}
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <AnimatePresence mode="wait">
          {currentContests.length > 0 ? (
            currentContests.map((contest, index) => (
              <motion.div
                key={contest.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ delay: index * 0.05 }}
                className="group flex items-center justify-between p-6 rounded-[24px] bg-[#141418] border border-white/5 hover:border-white/10 hover:bg-[#1C1C21] transition-all"
              >
                <div className="flex items-center gap-6">
                  {/* Status Indicator Dot */}
                  <div className={cn(
                    "w-1.5 h-1.5 rounded-full",
                    contest.status === 'ONGOING' ? "bg-neon-mint animate-pulse shadow-[0_0_8px_rgba(110,231,183,1)]" : 
                    contest.status === 'UPCOMING' ? "bg-sky-400" : "bg-gray-500"
                  )} />
                  
                  <div className="flex flex-col gap-1">
                    <h4 className="text-[17px] font-black text-[#EEEEF0] tracking-tight group-hover:text-neon-mint transition-colors underline-offset-4 decoration-neon-mint/30 group-hover:underline">
                      {contest.title}
                    </h4>
                    <div className="flex items-center gap-4 text-[12px] font-bold text-[#4A4A55]">
                      <span className="flex items-center gap-1.5">
                         <Users className="w-3.5 h-3.5" />
                         {contest.info}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-8">
                  <div className="flex flex-col items-end gap-1">
                    <div className={cn(
                      "px-2 py-0.5 rounded text-[10px] font-black uppercase tracking-widest border",
                      contest.status === 'ONGOING' ? "bg-neon-mint/10 text-neon-mint border-neon-mint/20" : 
                      contest.status === 'UPCOMING' ? "bg-sky-400/10 text-sky-400 border-sky-400/20" : 
                      "bg-gray-500/10 text-gray-500 border-gray-500/20 shadow-inner"
                    )}>
                       {contest.status}
                    </div>
                    <span className="text-[12px] font-bold text-[#4A4A55] tabular-nums font-mono opacity-60">
                       <Calendar className="inline-block w-3 h-3 mr-1 mb-0.5" />
                       {contest.date}
                    </span>
                  </div>

                  <Button 
                    variant="riot" 
                    className="bg-[#0C0C0F] border border-white/5 text-[11px] font-black px-5 h-9 flex items-center gap-2 group-hover:bg-neon-mint group-hover:text-deep-black transition-colors"
                  >
                    {t('mypage.contests.view_details', '상세 보기')}
                    <ChevronRight className="w-3 h-3" />
                  </Button>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="py-24 flex flex-col items-center justify-center gap-4 text-center">
               <div className="w-20 h-20 rounded-full bg-[#1C1C21] flex items-center justify-center text-[#4A4A55]">
                  <Trophy className="w-8 h-8 opacity-20" />
               </div>
               <p className="text-[#4A4A55] font-black uppercase tracking-widest">
                  {t('mypage.contests.no_data', '등록된 대회가 없습니다.')}
               </p>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
