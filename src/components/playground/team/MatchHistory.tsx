'use client';

import { motion } from 'framer-motion';
import { History, Trophy, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const MATCHES = [
  { round: '8강', opponent: 'vs Team Beta', map: 'Ascent', date: '03.28 20:00', score: '13:7', win: true },
  { round: '조', opponent: 'vs Team Gamma', map: 'Bind', date: '03.27 21:00', score: '13:5', win: true },
  { round: '조', opponent: 'vs Team Hotel', map: 'Haven', date: '03.26 20:30', score: '13:9', win: true },
];

export function MatchHistory() {
  return (
    <div className="flex flex-col gap-5 rounded-2xl border border-white/5 bg-[#0C0C0D] p-6 shadow-2xl mt-6">
      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-2.5">
          <History className="h-4 w-4 text-[#EEEEF0]" />
          <h3 className="text-[14px] font-black text-[#EEEEF0]">이번 대회 전적</h3>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 py-4 border-b border-white/5">
        <OverallStat value="3W" label="전송" color="text-neon-mint" />
        <OverallStat value="13.0" label="평균 라운드" color="text-[#EEEEF0]" />
        <OverallStat value="7.0" label="실점 평균" color="text-[#EEEEF0]" />
      </div>

      <div className="flex flex-col gap-1 mt-2">
        {MATCHES.map((match, idx) => (
          <div key={idx} className="flex flex-col gap-3 rounded-xl border border-white/5 bg-black/20 p-4 transition-all hover:bg-black/40">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <div className="flex h-6 items-center justify-center rounded bg-white/5 px-2 text-[10px] font-black text-[#5A5A65] uppercase">
                     {match.round}
                   </div>
                   <span className="text-[13px] font-black text-[#EEEEF0]">{match.opponent}</span>
                </div>
                <div className="flex items-center gap-2">
                   <span className="text-[12px] font-black text-neon-mint">승</span>
                </div>
             </div>
             <div className="flex items-center justify-between mt-1">
                <span className="text-[11px] font-bold text-[#5A5A65]">{match.map} · {match.date}</span>
                <span className="text-[13px] font-black text-[#EEEEF0] tracking-tighter">{match.score}</span>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OverallStat({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className={cn("text-[16px] font-black tracking-tight", color)}>{value}</span>
      <span className="text-[9px] font-bold text-[#5A5A65] text-center uppercase leading-none">{label}</span>
    </div>
  );
}
