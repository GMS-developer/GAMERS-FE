'use client';

import { motion } from 'framer-motion';
import { Edit2 } from 'lucide-react';

export function TeamProfileCard() {
  return (
    <div className="flex flex-col gap-6 rounded-2xl border border-white/5 bg-[#0C0C0D] p-6 shadow-2xl">
      
      {/* Team Header */}
      <div className="flex items-center gap-5">
        <div className="flex h-16 w-16 items-center justify-center rounded-xl bg-neon-mint text-[24px] font-black text-black">
          TA
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-[20px] font-black tracking-tight text-[#EEEEF0]">Team Alpha</h2>
            <button className="rounded bg-white/5 p-1 text-[#5A5A65] transition-all hover:bg-white/10 hover:text-[#EEEEF0]">
              <Edit2 className="h-3 w-3" />
            </button>
          </div>
          <span className="text-[12px] font-bold text-[#5A5A65]">4명 · VALORANT · 주말 내전 파티</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <StatItem value="3W" label="이번 대회" color="text-neon-mint" />
        <StatItem value="0L" label="패배" color="text-ruby" />
        <StatItem value="준결" label="현재 라운드" color="text-gold" />
        <StatItem value="100%" label="승률" color="text-[#EEEEF0]" />
      </div>

    </div>
  );
}

function StatItem({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-1 rounded-xl bg-white/5 py-4 transition-all hover:bg-white/10">
      <span className={color + " text-[18px] font-black tracking-tighter"}>{value}</span>
      <span className="text-[10px] font-bold text-[#5A5A65] uppercase tracking-widest">{label}</span>
    </div>
  );
}
