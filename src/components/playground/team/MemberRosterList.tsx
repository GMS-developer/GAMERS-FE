'use client';

import { motion } from 'framer-motion';
import { UserPlus, MoreHorizontal } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

interface Member {
  name: string;
  rank: string;
  rr: string;
  kda: string;
  winRate: string;
  acs: string;
  role: 'IGL' | 'Entry' | 'Duelist' | 'Support';
  initials: string;
  color: string;
}

const MEMBERS: Member[] = [
  { name: 'Antigravity', rank: 'playground.ranks.dia2', rr: '1,823 RR', kda: '3.2', winRate: '64%', acs: '22.4', role: 'IGL', initials: 'AG', color: 'bg-emerald-500' },
  { name: 'AcePlayer', rank: 'playground.ranks.plat1', rr: '1,460 RR', kda: '2.8', winRate: '58%', acs: '19.7', role: 'Entry', initials: 'AP', color: 'bg-blue-500' },
  { name: 'Reaper', rank: 'playground.ranks.dia1', rr: '1,650 RR', kda: '4.1', winRate: '61%', acs: '24.1', role: 'Duelist', initials: 'RP', color: 'bg-red-500' },
  { name: 'SilverBullet', rank: 'playground.ranks.plat2', rr: '1,820 RR', kda: '2.5', winRate: '52%', acs: '17.3', role: 'Support', initials: 'SB', color: 'bg-yellow-500' },
];

export function MemberRosterList() {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-4 mt-6">
      <div className="flex items-center justify-between px-2">
        <h3 className="text-[13px] font-black text-[#EEEEF0] uppercase tracking-wider">{t('playground.team.roster_title')}</h3>
        <button className="flex items-center gap-1.5 rounded-md bg-neon-mint px-3 py-1.5 text-[11px] font-black text-black transition-all hover:brightness-110 active:scale-95">
          <UserPlus className="h-3 w-3" />
          <span>{t('playground.team.invite_member')}</span>
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {MEMBERS.map((member, idx) => (
          <MemberItem key={member.name} member={member} index={idx} />
        ))}
      </div>
    </div>
  );
}

function MemberItem({ member, index }: { member: Member; index: number }) {
  const { t } = useTranslation();
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      className="group relative flex flex-col gap-3 rounded-2xl border border-white/5 bg-[#0C0C0D] p-5 transition-all hover:border-white/10 hover:bg-white/5 hover:translate-x-1"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
           <div className={cn("flex h-10 w-10 items-center justify-center rounded-full text-[13px] font-black text-[#EEEEF0]", member.color)}>
             {member.initials}
           </div>
           <div className="flex flex-col">
             <span className="text-[14px] font-black text-[#EEEEF0]">{member.name}</span>
             <span className="text-[11px] font-bold text-[#5A5A65]">{t(member.rank)} · {member.rr}</span>
           </div>
        </div>
        <div className="flex items-center gap-2">
           <RoleBadge role={member.role} />
           <button className="text-[#5A5A65] transition-all hover:text-[#EEEEF0]">
             <MoreHorizontal className="h-4 w-4" />
           </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2 px-1 mt-4">
        <div className="flex flex-col gap-0.5">
           <span className="text-[13px] font-black text-[#EEEEF0] tracking-tight">{member.kda}</span>
           <span className="text-[9px] font-bold text-[#5A5A65] tracking-widest leading-none">KDA</span>
        </div>
        <div className="flex flex-col gap-0.5 border-l border-white/5 pl-2">
           <span className="text-[13px] font-black text-neon-mint tracking-tight">{member.winRate}</span>
           <span className="text-[9px] font-bold text-[#5A5A65] tracking-widest leading-none text-neon-mint/50">{t('playground.team.win_rate')}</span>
        </div>
        <div className="flex flex-col gap-0.5 border-l border-white/5 pl-2">
           <span className="text-[13px] font-black text-[#EEEEF0] tracking-tight">{member.acs}</span>
           <span className="text-[9px] font-bold text-[#5A5A65] tracking-widest leading-none">ACS</span>
        </div>
      </div>
    </motion.div>
  );
}

function RoleBadge({ role }: { role: string }) {
  const styles: Record<string, string> = {
    IGL: "border-neon-mint/30 text-neon-mint bg-neon-mint/5",
    Entry: "border-sky-500/30 text-sky-500 bg-sky-500/5",
    Duelist: "border-ruby/30 text-ruby bg-ruby/5",
    Support: "border-gold/30 text-gold bg-gold/5",
  };

  const currentStyle = styles[role] || "border-white/10 text-[#EEEEF0] bg-white/5";

  return (
    <div className={cn("px-2.5 py-0.5 rounded border text-[10px] font-black tracking-widest", currentStyle)}>
      {role}
    </div>
  );
}
