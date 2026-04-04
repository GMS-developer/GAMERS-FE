'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Match {
  round: string;
  opponent: string;
  map: string;
  date: string;
  result: 'win' | 'loss';
  score: string;
}

const MATCHES: Match[] = [
  { round: '8강', opponent: 'Team Beta', map: 'Ascent', date: '03.28 20:00', result: 'win', score: '13:7' },
  { round: '조별', opponent: 'Team Gamma', map: 'Bind', date: '03.27 21:00', result: 'win', score: '13:5' },
  { round: '조별', opponent: 'Team Hotel', map: 'Haven', date: '03.26 20:30', result: 'win', score: '13:9' },
];

export function PlaygroundRecentMatches() {
  return (
    <div className="flex flex-col gap-6 rounded-3xl border border-white/5 bg-[#141418] p-8 h-full">
      <div className="flex items-center justify-between">
        <h3 className="text-[17px] font-black italic tracking-tighter text-[#EEEEF0]">최근 경기 기록</h3>
        <button className="text-[11px] font-black uppercase tracking-widest text-[#4A4A55] hover:text-[#7A7A85]">상세보기</button>
      </div>

      <div className="flex flex-col gap-4">
        {MATCHES.map((match, i) => (
          <div key={i} className="flex items-center justify-between rounded-2xl bg-white/5 border border-white/5 p-4 group hover:bg-white/10 transition-all">
            <div className="flex items-center gap-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/20 text-[#4A4A55] border border-white/5 group-hover:text-neon-mint transition-colors">
                 <span className="text-[10px] font-black uppercase tracking-wider">{match.round}</span>
              </div>
              <div className="flex flex-col">
                <span className="text-[15px] font-black text-[#EEEEF0] leading-none mb-1">
                  vs {match.opponent}
                </span>
                <span className="text-[11px] font-bold text-[#5A5A65] tracking-tight uppercase tracking-[0.1em]">
                  {match.map} · {match.date}
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className={cn(
                "text-[17px] font-black italic tracking-tighter leading-none mb-1",
                match.result === 'win' ? "text-neon-mint" : "text-neon-red"
              )}>
                {match.result === 'win' ? '승' : '패'} {match.score}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
