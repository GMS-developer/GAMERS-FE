'use client';

import { motion } from 'framer-motion';
import { BookOpen, Edit2 } from 'lucide-react';
import { cn } from '@/lib/utils';

const AGENTS = [
  { name: 'Sage', role: '서포트', color: 'bg-emerald-500' },
  { name: 'Jett', role: '듀얼', color: 'bg-red-500' },
  { name: 'Sova', role: '이니', color: 'bg-blue-500' },
  { name: 'Brimstone', role: '컨트', color: 'bg-orange-500' },
];

export function StrategyNotes() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-white/5 bg-[#0C0C0D] p-6 shadow-2xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <BookOpen className="h-4 w-4 text-[#EEEEF0]" />
          <h3 className="text-[14px] font-black text-[#EEEEF0]">전략 노트</h3>
          <span className="rounded-full bg-neon-mint/10 px-2 py-0.5 text-[10px] font-black text-neon-mint uppercase tracking-widest">IGL 전용</span>
        </div>
        <button className="rounded px-3 py-1.5 text-[11px] font-black text-[#5A5A65] transition-all hover:bg-white/5 hover:text-[#EEEEF0]">
          편집
        </button>
      </div>

      <div className="flex flex-col gap-4 rounded-xl bg-black/40 p-5 border border-white/5">
        <div className="flex items-center gap-2">
           <span className="text-[11px] font-black text-ruby uppercase tracking-widest">vs Team Delta</span>
           <span className="text-[11px] font-bold text-[#5A5A65]">준결승 전략</span>
        </div>
        <p className="text-[13px] leading-relaxed text-[#EEEEF0]/80">
          공격: A 사이트 빠른 러시 위주. Reaper 인파이트 진입, AcePlayer 미드 컷 담당.<br />
          수비: B 사이트 3명 스택. SilverBullet 미드 정보 수집 후 로테.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <span className="text-[11px] font-black text-gold uppercase tracking-widest">주요 픽</span>
        <div className="flex flex-wrap gap-2">
          {AGENTS.map((agent) => (
            <div key={agent.name} className="flex items-center gap-2.5 rounded-full bg-white/5 pr-4 pl-1 py-1 transition-all hover:bg-white/10">
               <div className={cn("h-7 w-7 rounded-full", agent.color)} />
               <div className="flex flex-col">
                 <span className="text-[11px] font-black text-[#EEEEF0] leading-none">{agent.name}</span>
                 <span className="text-[9px] font-bold text-[#5A5A65] leading-none mt-1">{agent.role}</span>
               </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
