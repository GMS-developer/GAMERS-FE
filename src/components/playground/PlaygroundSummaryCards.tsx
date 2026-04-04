'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Trophy, Users, Clock, Zap } from 'lucide-react';

interface SummaryCardProps {
  label: string;
  value: string;
  subValue: string;
  icon: React.ReactNode;
}

function SummaryCard({ label, value, subValue, icon }: SummaryCardProps) {
  return (
    <div className="flex flex-col gap-4 rounded-3xl border border-white/5 bg-[#141418] p-6 group hover:bg-[#1A1A22] hover:border-white/10 transition-all transition-duration-300">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-black uppercase tracking-widest text-[#4A4A55] group-hover:text-[#7A7A85] transition-colors">{label}</span>
        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-[#4A4A55] group-hover:text-neon-mint transition-colors border border-white/5 shadow-inner">
          {icon}
        </div>
      </div>
      <div className="flex flex-col">
        <span className="text-[28px] font-black italic text-[#EEEEF0] leading-none mb-2 tracking-tighter">
          {value}
        </span>
        <span className="text-[13px] font-black text-[#5A5A65] uppercase tracking-tight">
          {subValue}
        </span>
      </div>
    </div>
  );
}

export function PlaygroundSummaryCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 w-full">
      <SummaryCard 
        label="현재 라운드"
        value="준결승"
        subValue="8강 완료 · 2경기 남음"
        icon={<Trophy className="w-4 h-4" />}
      />
      <SummaryCard 
        label="팀 성적"
        value="3승 0패"
        subValue="승률 100% · 평균 라운드 13.0"
        icon={<Zap className="w-4 h-4 text-neon-mint" />}
      />
      <SummaryCard 
        label="다음 경기"
        value="vs Team Delta"
        subValue="오늘 21:00 · 자동 매치"
        icon={<Clock className="w-4 h-4 text-neon-blue" />}
      />
      <SummaryCard 
        label="팀 준비 상태"
        value="4/4"
        subValue="전원 준비 완료"
        icon={<Users className="w-4 h-4 text-neon-mint" />}
      />
    </div>
  );
}
