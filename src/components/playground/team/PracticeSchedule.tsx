'use client';

import { motion } from 'framer-motion';
import { Calendar, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

export function PracticeSchedule() {
  const { t } = useTranslation();

  const SCHEDULE = [
    { date: '28', day: t('common.today'), title: t('playground.schedule.match_vs', { opponent: 'Team Delta' }), time: t('playground.schedule.auto_match', { time: '21:00' }), dDay: 'D-DAY', active: true },
    { date: '29', day: t('common.days.thu'), title: t('playground.schedule.final_if_advance'), time: t('playground.schedule.tbd_opponent', { time: '22:30' }), dDay: 'D-1', active: false },
    { date: '31', day: t('common.days.sat'), title: t('playground.schedule.internal_practice'), time: t('playground.schedule.internal_desc', { time: '20:00' }), dDay: 'D-3', active: false },
  ];
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-white/5 bg-[#0C0C0D] p-6 shadow-2xl mt-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
          <Calendar className="h-4 w-4 text-[#EEEEF0]" />
          <h3 className="text-[14px] font-black text-[#EEEEF0]">{t('playground.team.practice_schedule')}</h3>
        </div>
        <button className="flex items-center gap-1.5 rounded-md bg-white/5 px-3 py-1.5 text-[11px] font-black text-[#EEEEF0] transition-all hover:bg-white/10 active:scale-95">
          <Plus className="h-3 w-3" />
          <span>{t('playground.team.add_schedule')}</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {SCHEDULE.map((item, idx) => (
          <div 
            key={item.date} 
            className={cn("flex items-center justify-between rounded-xl border border-white/5 bg-black/20 p-4 transition-all hover:bg-black/40", item.active && "border-neon-mint/30 bg-neon-mint/5")}
          >
            <div className="flex items-center gap-4">
               <div className="flex flex-col items-center justify-center border-r border-white/10 pr-4">
                 <span className={cn("text-[20px] font-black leading-none", item.active ? "text-neon-mint" : "text-[#EEEEF0]")}>{item.date}</span>
                 <span className="text-[10px] font-black text-[#5A5A65] mt-1">{item.day}</span>
               </div>
               <div className="flex flex-col gap-1">
                 <span className={cn("text-[13px] font-black leading-none", item.active ? "text-neon-mint" : "text-[#EEEEF0]")}>{item.title}</span>
                 <span className="text-[11px] font-bold text-[#5A5A65]">{item.time}</span>
               </div>
            </div>
            <div className={cn("rounded-md px-3 py-1 text-[11px] font-black tracking-widest", item.active ? "bg-neon-mint text-black" : "bg-white/5 text-[#5A5A65]")}>
              {item.dDay}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
