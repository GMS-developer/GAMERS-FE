'use client';

import { motion } from 'framer-motion';
import { RefreshCcw, Copy, RotateCcw, Share2, TrendingUp, Trophy, Check } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';
import type { Participant } from './ParticipantGrid';
import { useRecordMatchResult } from '@/hooks/use-lol';
import { LolMatchWinner } from '@/types/enums';

interface DistributionResultViewProps {
  matchId: number | null;
  blueTeam: Participant[];
  redTeam: Participant[];
  onReroll: () => void;
  onNewSession: () => void;
  className?: string;
}

export function DistributionResultView({ matchId, blueTeam, redTeam, onReroll, onNewSession, className }: DistributionResultViewProps) {
  const { t } = useTranslation();
  const recordResultMutation = useRecordMatchResult();

  const handleCopy = () => {
    const text = [
      `[${t('playground.team_distribution.result.blue_side')}]`,
      ...blueTeam.map(p => `${t(`playground.team_distribution.roles.${p.role}`)}: ${p.name} (${t(`playground.team_distribution.tiers.${p.tier}`)})`),
      '',
      `[${t('playground.team_distribution.result.red_side')}]`,
      ...redTeam.map(p => `${t(`playground.team_distribution.roles.${p.role}`)}: ${p.name} (${t(`playground.team_distribution.tiers.${p.tier}`)})`),
    ].join('\n');
    
    navigator.clipboard.writeText(text);
    alert(t('playground.team.copied'));
  };

  const handleRecordResult = async (winner: LolMatchWinner) => {
    if (!matchId || recordResultMutation.isPending || recordResultMutation.isSuccess) return;

    try {
      await recordResultMutation.mutateAsync({
        matchId,
        data: { winner }
      });
      alert(t('playground.team_distribution.result.save_success'));
    } catch (error) {
      console.error('Failed to record match result:', error);
    }
  };

  return (
    <div className={cn("flex flex-col gap-12", className)}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 relative">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden lg:block">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-[#0C0C0D] border border-white/10 rounded-full h-16 w-16 flex items-center justify-center text-[20px] font-black text-white italic tracking-widest shadow-2xl"
          >
            {t('playground.team_distribution.result.vs')}
          </motion.div>
        </div>

        {/* Blue Team */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-6 py-4 rounded-[24px] bg-sky-500/10 border border-sky-500/20">
            <div className="h-3 w-3 rounded-full bg-sky-500 shadow-[0_0_12px_rgba(14,165,233,0.5)]" />
            <h4 className="text-[18px] font-black text-sky-500 uppercase tracking-tight italic">{t('playground.team_distribution.result.blue_side')}</h4>
          </div>

          <div className="flex flex-col gap-3">
            {blueTeam.map((p, i) => (
              <TeamMemberCard key={p.id} participant={p} side="blue" delay={i * 0.1} />
            ))}
          </div>

          <button
            onClick={() => handleRecordResult(LolMatchWinner.TEAM_A)}
            disabled={!matchId || recordResultMutation.isPending || recordResultMutation.isSuccess}
            className={cn(
              "mt-2 flex items-center justify-center gap-2 h-12 rounded-2xl text-[14px] font-black transition-all active:scale-95",
              recordResultMutation.isSuccess && recordResultMutation.variables?.data.winner === LolMatchWinner.TEAM_A
                ? "bg-neon-mint text-black"
                : "bg-sky-500/10 text-sky-500 border border-sky-500/20 hover:bg-sky-500/20 disabled:opacity-50"
            )}
          >
            {recordResultMutation.isSuccess && recordResultMutation.variables?.data.winner === LolMatchWinner.TEAM_A ? (
              <Check className="h-4 w-4" />
            ) : (
              <Trophy className="h-4 w-4" />
            )}
            <span>{t('playground.team_distribution.result.team_a_win')}</span>
          </button>
        </div>

        {/* Red Team */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-4 px-6 py-4 rounded-[24px] bg-ruby/10 border border-ruby/20 flex-row-reverse">
            <div className="h-3 w-3 rounded-full bg-ruby shadow-[0_0_12px_rgba(224,92,92,0.5)]" />
            <h4 className="text-[18px] font-black text-ruby uppercase tracking-tight italic">{t('playground.team_distribution.result.red_side')}</h4>
          </div>

          <div className="flex flex-col gap-3">
            {redTeam.map((p, i) => (
              <TeamMemberCard key={p.id} participant={p} side="red" delay={i * 0.1} />
            ))}
          </div>

          <button
            onClick={() => handleRecordResult(LolMatchWinner.TEAM_B)}
            disabled={!matchId || recordResultMutation.isPending || recordResultMutation.isSuccess}
            className={cn(
              "mt-2 flex items-center justify-center gap-2 h-12 rounded-2xl text-[14px] font-black transition-all active:scale-95 flex-row-reverse",
              recordResultMutation.isSuccess && recordResultMutation.variables?.data.winner === LolMatchWinner.TEAM_B
                ? "bg-neon-mint text-black"
                : "bg-ruby/10 text-ruby border border-ruby/20 hover:bg-ruby/20 disabled:opacity-50"
            )}
          >
            {recordResultMutation.isSuccess && recordResultMutation.variables?.data.winner === LolMatchWinner.TEAM_B ? (
              <Check className="h-4 w-4" />
            ) : (
              <Trophy className="h-4 w-4" />
            )}
            <span>{t('playground.team_distribution.result.team_b_win')}</span>
          </button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-8 p-10 rounded-[40px] bg-[#0C0C0D] border border-white/5 shadow-2xl mt-8">
         <div className="flex flex-col gap-1">
            <span className="text-[13px] font-bold text-[#5A5A65] tracking-tight uppercase">{t('playground.team_distribution.result.match_quality')}</span>
            <div className="flex items-center gap-3">
               <div className="p-2 rounded-xl bg-neon-mint/10">
                 <TrendingUp className="h-6 w-6 text-neon-mint" />
               </div>
               <span className="text-[32px] font-black text-[#EEEEF0] italic tracking-tighter shadow-sm">
                 {t('playground.team_distribution.result.match_quality_format', { value: 94.2 })}
               </span>
            </div>
         </div>

         <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={onReroll}
              className="group flex items-center gap-3 bg-[#1A1A20] border border-white/5 text-[#EEEEF0] h-14 px-8 rounded-2xl text-[15px] font-black transition-all hover:bg-[#25252D] active:scale-95 shadow-lg"
            >
              <RefreshCcw className="h-5 w-5 text-[#5A5A65] group-hover:rotate-180 transition-transform duration-500" />
              <span>{t('playground.team_distribution.result.reroll')}</span>
            </button>
            <button
              onClick={handleCopy}
              className="flex items-center gap-3 bg-[#1A1A20] border border-white/5 text-[#EEEEF0] h-14 px-8 rounded-2xl text-[15px] font-black transition-all hover:bg-[#25252D] active:scale-95 shadow-lg"
            >
              <Copy className="h-5 w-5 text-[#5A5A65]" />
              <span>{t('playground.team_distribution.result.copy_result')}</span>
            </button>
            <button
              onClick={onNewSession}
              className="flex items-center gap-3 bg-neon-mint text-black h-14 px-10 rounded-2xl text-[15px] font-black transition-all hover:scale-[1.02] active:scale-95 shadow-[0_8px_24px_rgba(0,212,122,0.2)]"
            >
              <RotateCcw className="h-5 w-5" />
              <span>{t('playground.team_distribution.result.new_session')}</span>
            </button>
         </div>
      </div>
    </div>
  );
}

function TeamMemberCard({ participant, side, delay }: { participant: Participant; side: 'blue' | 'red'; delay: number }) {
  const { t } = useTranslation();
  
  return (
    <motion.div
      initial={{ opacity: 0, x: side === 'blue' ? -40 : 40 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, type: "spring", stiffness: 100, damping: 20 }}
      className={cn(
        "group relative flex items-center justify-between p-5 rounded-[24px] border transition-all truncate shadow-sm hover:shadow-xl",
        side === 'blue' 
          ? "bg-[#141418] border-white/5 hover:border-sky-500/30" 
          : "bg-[#141418] border-white/5 hover:border-ruby/30 flex-row-reverse"
      )}
    >
      <div className={cn("flex items-center gap-4", side === 'red' && "flex-row-reverse")}>
         <div className={cn(
           "flex h-12 w-12 items-center justify-center rounded-2xl text-[16px] font-black shadow-inner",
           side === 'blue' ? "bg-sky-500/10 text-sky-500 border border-sky-500/20" : "bg-ruby/10 text-ruby border border-ruby/20"
         )}>
           {participant.name[0]?.toUpperCase()}
         </div>
         <div className={cn("flex flex-col", side === 'red' && "items-end")}>
           <span className="text-[17px] font-black text-[#EEEEF0] tracking-tight">{participant.name}</span>
           <span className="text-[11px] font-bold text-[#5A5A65] tracking-widest uppercase mt-0.5">
              {t(`playground.team_distribution.tiers.${participant.tier}`)}
           </span>
         </div>
      </div>

      <div className={cn(
        "flex h-9 px-5 items-center justify-center rounded-xl text-[12px] font-black tracking-widest shadow-sm",
        side === 'blue' ? "bg-sky-500/10 text-sky-500 border border-sky-500/20" : "bg-ruby/10 text-ruby border border-ruby/20"
      )}>
        {t(`playground.team_distribution.roles.${participant.role}`)}
      </div>
      
      {/* Dynamic Glow Effect */}
      <div className={cn(
        "absolute inset-0 rounded-[24px] opacity-0 group-hover:opacity-100 transition-opacity blur-2xl -z-10",
        side === 'blue' ? "bg-sky-500/10" : "bg-ruby/10"
      )} />
    </motion.div>
  );
}
