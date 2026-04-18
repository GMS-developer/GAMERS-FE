'use client';

import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Users, ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';

import { NicknameParsingPanel } from './NicknameParsingPanel';
import { ParticipantGrid, type Participant, type Role, type Tier } from './ParticipantGrid';
import { DistributionResultView } from './DistributionResultView';
import { useBalanceTeams } from '@/hooks/use-lol';
import { lolApi } from '@/api/lol';
import { LolTemporalPlayerV2, LolTemporalAssignedPlayer } from '@/types/lol';

type Phase = 'participating' | 'result';

export function TemporalTeamDistribution() {
  const { t } = useTranslation();
  const [phase, setPhase] = useState<Phase>('participating');
  const [participants, setParticipants] = useState<Participant[]>(
    Array.from({ length: 10 }, (_, i) => ({ id: `${i}`, name: '', role: null, tier: null }))
  );
  const [result, setResult] = useState<{ blueTeam: Participant[]; redTeam: Participant[] } | null>(null);
  const [matchId, setMatchId] = useState<number | null>(null);
  const [isLookupLoading, setIsLookupLoading] = useState(false);

  const balanceTeamsMutation = useBalanceTeams();

  const handleLookupSummoner = useCallback(async (name: string, index: number) => {
    if (!name) return;

    // Set searching state
    setParticipants(prev => {
      const next = [...prev];
      next[index] = { ...next[index], isSearching: true };
      return next;
    });

    try {
      // Logic for Riot ID: if no #, try #KR1 as default for Korean users
      const riotId = name.includes('#') ? name : `${name}#KR1`;
      const [username, tag] = riotId.split('#');
      
      const response = await lolApi.summonerLookup({ name: username, tag });
      const data = response;
      
      if (data && data.tier) {
        setParticipants(prev => {
          const next = [...prev];
          next[index] = { 
            ...next[index], 
            tier: data.tier.toUpperCase() as Tier,
            rankName: data.rank,
            profileIconId: data.profile_icon_id,
            isSearching: false
          };
          return next;
        });
      } else {
        // Stop searching even if no data found
        setParticipants(prev => {
          const next = [...prev];
          next[index] = { ...next[index], isSearching: false };
          return next;
        });
      }
    } catch (error) {
      console.error(`Failed to lookup summoner ${name}:`, error);
      setParticipants(prev => {
        const next = [...prev];
        next[index] = { ...next[index], isSearching: false };
        return next;
      });
    }
  }, []);

  const handleParseNicknames = useCallback(async (nicknames: string[]) => {
    setIsLookupLoading(true);
    
    // Set names first
    setParticipants(prev => {
      const newParticipants = [...prev];
      nicknames.forEach((name, i) => {
        if (i < 10) {
          newParticipants[i] = { ...newParticipants[i], name };
        }
      });
      for (let i = nicknames.length; i < 10; i++) {
        newParticipants[i] = { id: `${i}`, name: '', role: null, tier: null };
      }
      return newParticipants;
    });

    // Lookup ranks for Name#Tag formats
    await Promise.all(
      nicknames.slice(0, 10).map((name, i) => handleLookupSummoner(name, i))
    );
    
    setIsLookupLoading(false);
  }, [handleLookupSummoner]);

  const handleUpdateParticipant = useCallback((index: number, data: Partial<Participant>) => {
    setParticipants(prev => {
      const next = [...prev];
      next[index] = { ...next[index], ...data };
      
      // If name was updated manually and has #, try lookup
      if (data.name && data.name.includes('#')) {
        handleLookupSummoner(data.name, index);
      }
      
      return next;
    });
  }, [handleLookupSummoner]);

  const isReady = useMemo(() => {
    return participants.every(p => p.name && p.role && p.tier);
  }, [participants]);

  const mapToParticipant = (p: LolTemporalAssignedPlayer): Participant => ({
    id: `${p.username}#${p.tag}`,
    name: `${p.username}#${p.tag}`,
    role: p.position as Role,
    tier: p.rank as Tier
  });

  const distributeTeams = useCallback(async () => {
    if (!isReady) return;

    const members: LolTemporalPlayerV2[] = participants.map(p => {
      const parts = p.name.split('#');
      return {
        username: parts[0],
        tag: parts[1] || 'KR1',
        rank: p.tier!,
        positions: [p.role!]
      };
    });

    try {
      const response = await balanceTeamsMutation.mutateAsync({ members });
      const data = response;
      
      if (data) {
        setResult({
          blueTeam: data.team_a.map(mapToParticipant),
          redTeam: data.team_b.map(mapToParticipant),
        });
        setMatchId(data.match_id);
        setPhase('result');
      }
    } catch (error) {
      console.error('Failed to balance teams:', error);
      alert(t('playground.team_distribution.error_balancing'));
    }
  }, [participants, isReady, balanceTeamsMutation, t]);

  const resetSession = () => {
    setPhase('participating');
    setResult(null);
    setMatchId(null);
  };

  return (
    <div className="max-w-[1000px] mx-auto py-16 px-6">
      <div className="flex flex-col gap-4 mb-16 text-center md:text-left">
        <h2 className="text-[40px] md:text-[56px] font-black text-[#EEEEF0] tracking-tight leading-[1.1]">
          {t('playground.team_distribution.title')}
        </h2>
        <p className="text-[16px] md:text-[20px] font-medium text-[#7A7A85] tracking-tight max-w-[600px]">
          {t('playground.team_distribution.subtitle')}
        </p>
      </div>

      <AnimatePresence mode="wait">
        {phase === 'participating' ? (
          <motion.div
            key="participating"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="flex flex-col gap-12"
          >
            <NicknameParsingPanel onParse={handleParseNicknames} />

            <div className="flex flex-col gap-10">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 border border-white/10">
                      <Users className="h-6 w-6 text-neon-mint" />
                    </div>
                    <div className="flex flex-col">
                      <h3 className="text-[20px] font-black text-[#EEEEF0] tracking-tight">{t('playground.team_distribution.participants.title')}</h3>
                      {isLookupLoading && (
                        <span className="text-[12px] text-neon-mint animate-pulse font-bold uppercase tracking-widest">{t('common.loading')}</span>
                      )}
                    </div>
                 </div>
                 <button 
                  onClick={distributeTeams}
                  disabled={!isReady || balanceTeamsMutation.isPending}
                  className={cn(
                    "flex items-center gap-3 h-14 px-10 rounded-2xl text-[16px] font-black transition-all active:scale-95 shadow-xl",
                    isReady && !balanceTeamsMutation.isPending
                      ? "bg-neon-mint text-black shadow-neon-mint/20 hover:scale-[1.02]" 
                      : "bg-white/5 text-[#5A5A65] cursor-not-allowed opacity-50"
                  )}
                 >
                   {balanceTeamsMutation.isPending ? (
                     <>
                        <Loader2 className="h-5 w-5 animate-spin" />
                        <span>{t('playground.team_distribution.balancing')}</span>
                     </>
                   ) : (
                     <>
                        <span>{t('playground.team_distribution.start_button')}</span>
                        <ArrowRight className="h-5 w-5" />
                     </>
                   )}
                 </button>
              </div>

              <ParticipantGrid 
                participants={participants} 
                onUpdate={handleUpdateParticipant}
                onLookup={(index: number) => handleLookupSummoner(participants[index].name, index)} 
              />
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4 }}
          >
            {result && (
              <DistributionResultView 
                matchId={matchId}
                blueTeam={result.blueTeam} 
                redTeam={result.redTeam} 
                onReroll={distributeTeams}
                onNewSession={resetSession}
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
