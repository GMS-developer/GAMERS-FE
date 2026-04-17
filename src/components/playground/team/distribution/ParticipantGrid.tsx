'use client';

import { motion } from 'framer-motion';
import { User, CheckCircle2, AlertCircle } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

export type Role = 'TOP' | 'JG' | 'MID' | 'ADC' | 'SUP';
export type Tier = 'IRON' | 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM' | 'EMERALD' | 'DIAMOND' | 'MASTER' | 'GRANDMASTER' | 'CHALLENGER';

export interface Participant {
  id: string;
  name: string;
  role: Role | null;
  tier: Tier | null;
}

interface ParticipantGridProps {
  participants: Participant[];
  onUpdate: (index: number, data: Partial<Participant>) => void;
  className?: string;
}

const ROLES: Role[] = ['TOP', 'JG', 'MID', 'ADC', 'SUP'];
const TIERS: Tier[] = [
  'IRON', 'BRONZE', 'SILVER', 'GOLD', 'PLATINUM', 
  'EMERALD', 'DIAMOND', 'MASTER', 'GRANDMASTER', 'CHALLENGER'
];

export function ParticipantGrid({ participants, onUpdate, className }: ParticipantGridProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 gap-6", className)}>
      {Array.from({ length: 10 }).map((_, i) => {
        const p = participants[i] || { id: `${i}`, name: '', role: null, tier: null };
        const isFilled = !!p.name;
        const isReady = isFilled && !!p.role && !!p.tier;

        return (
          <motion.div
            key={p.id || i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className={cn(
              "group relative flex flex-col gap-5 p-6 rounded-[32px] border transition-all h-[160px] shadow-sm",
              isFilled 
                ? "bg-[#141418] border-white/5 hover:border-neon-mint/20 hover:bg-[#1A1A20] shadow-xl" 
                : "bg-white/[0.02] border-dashed border-white/5 opacity-50"
            )}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={cn(
                  "flex h-12 w-12 items-center justify-center rounded-2xl text-[16px] font-black transition-all",
                  isFilled ? "bg-neon-mint/10 text-neon-mint border border-neon-mint/20" : "bg-white/5 text-[#3A3A45] border border-white/5"
                )}>
                  {isFilled ? p.name[0]?.toUpperCase() : (i + 1)}
                </div>
                <div className="flex flex-col">
                  <span className={cn(
                    "text-[18px] font-black tracking-tight transition-all leading-tight",
                    isFilled ? "text-[#EEEEF0]" : "text-[#3A3A45]"
                  )}>
                    {isFilled ? p.name : `${t('playground.team_distribution.participants.empty_slot')}`}
                  </span>
                  <div className="flex items-center gap-1.5 mt-1">
                    {isFilled ? (
                      isReady ? (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-neon-mint tracking-tight uppercase">
                          <CheckCircle2 className="h-3 w-3" />
                          {t('playground.team_distribution.participants.ready')}
                        </span>
                      ) : (
                        <span className="flex items-center gap-1 text-[11px] font-bold text-ruby tracking-tight uppercase">
                          <AlertCircle className="h-3 w-3" />
                          {t('playground.team_distribution.participants.incomplete')}
                        </span>
                      )
                    ) : (
                       <span className="text-[11px] font-bold text-[#3A3A45] uppercase tracking-wider">{t('playground.team_distribution.participants.waiting')}</span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative flex-1">
                <select
                  disabled={!isFilled}
                  value={p.role || ''}
                  onChange={(e) => onUpdate(i, { role: e.target.value as Role })}
                  className="w-full h-11 bg-white/5 border border-white/5 rounded-2xl px-4 text-[13px] font-bold text-[#EEEEF0] focus:outline-none focus:border-neon-mint/30 hover:bg-white/10 transition-all appearance-none cursor-pointer disabled:cursor-not-allowed"
                >
                  <option value="" disabled>{t('playground.team_distribution.participants.select_role')}</option>
                  {ROLES.map(r => (
                    <option key={r} value={r}>{t(`playground.team_distribution.roles.${r}`)}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A5A65]">
                   <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>

              <div className="relative flex-1">
                <select
                  disabled={!isFilled}
                  value={p.tier || ''}
                  onChange={(e) => onUpdate(i, { tier: e.target.value as Tier })}
                  className="w-full h-11 bg-white/5 border border-white/5 rounded-2xl px-4 text-[13px] font-bold text-[#EEEEF0] focus:outline-none focus:border-neon-mint/30 hover:bg-white/10 transition-all appearance-none cursor-pointer disabled:cursor-not-allowed"
                >
                  <option value="" disabled>{t('playground.team_distribution.participants.select_tier')}</option>
                  {TIERS.map(tKey => (
                    <option key={tKey} value={tKey}>{t(`playground.team_distribution.tiers.${tKey}`)}</option>
                  ))}
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-[#5A5A65]">
                   <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
