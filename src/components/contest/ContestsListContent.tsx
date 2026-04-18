'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ContestCard } from './ContestCard';
import { Button } from '@/components/ui/button';
import { ChevronDown, PlusCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';
import { useContests } from '@/hooks/use-contests';
import { GameType, ContestStatus } from '@/types/contest';
import { TemporalLoLBanner } from './TemporalLoLBanner';

const GAMES = ['All', 'Valorant', 'LoL'];

export function ContestsListContent() {
  const { t } = useTranslation();
  const [selectedGame, setSelectedGame] = useState('All');
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [currentPage] = useState(1);

  // Map UI values to API values
  const gameTypeMap: Record<string, GameType | undefined> = {
    'Valorant': GameType.VALORANT,
    'LoL': GameType.LOL,
    'All': undefined
  };

  const statusMap: Record<string, ContestStatus | undefined> = {
    'ONGOING': ContestStatus.ACTIVE,
    'UPCOMING': ContestStatus.PENDING,
    'COMPLETED': ContestStatus.FINISHED,
    'All': undefined
  };

  const { data, isLoading, isError } = useContests({
    page: currentPage,
    page_size: 9,
    game_type: gameTypeMap[selectedGame],
    status: statusMap[selectedStatus],
  });

  const STATUSES = [
    { key: 'All', label: t('contests.list.filters.all') },
    { key: 'ONGOING', label: t('contests.list.filters.ongoing') },
    { key: 'UPCOMING', label: t('contests.list.filters.recruiting') },
    { key: 'COMPLETED', label: t('contests.list.filters.finished') },
  ];

  // Helper to get game color and label
  const getGameInfo = (gameType: GameType | null) => {
    switch (gameType) {
      case GameType.VALORANT:
        return {
          label: 'Valorant',
          color: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20'
        };
      case GameType.LOL:
        return {
          label: 'League of Legends',
          color: 'bg-amber-500/10 text-amber-500 border-amber-500/20'
        };

      default:
        return {
          label: gameType || 'General',
          color: 'bg-purple-500/10 text-purple-500 border-purple-500/20'
        };
    }
  };

  if (isError) {
    return (
      <div className="flex h-[400px] w-full items-center justify-center text-[#7A7A85]">
        {t('common.error')}
      </div>
    );
  }

  const contests = data?.data || [];
  const totalCount = data?.total_count || 0;

  return (
    <div className="flex w-full flex-col gap-8 md:gap-12 px-4 md:px-16 pb-20">
      {/* Filters Section */}
      <div className="flex flex-col gap-6 md:gap-8 overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 md:gap-6">
          <div className="flex items-center gap-4 overflow-x-auto pb-2 lg:pb-0 scrollbar-hide no-scrollbar">
            {/* Game Filter */}
            <div className="flex items-center shrink-0 rounded-xl bg-[#141418] p-1.5 border border-white/5 shadow-lg">
              {GAMES.map((game) => (
                <button
                  key={game}
                  onClick={() => setSelectedGame(game)}
                  className={cn(
                    "px-4 md:px-6 py-2 text-xs md:text-sm font-bold transition-all rounded-lg whitespace-nowrap",
                    selectedGame === game 
                      ? "bg-neon-mint text-deep-black shadow-[0_0_15px_rgba(110,231,183,0.3)]" 
                      : "text-[#7A7A85] hover:text-[#EEEEF0]"
                  )}
                >
                  {game === 'All' ? t('contests.list.filters.all') : game}
                </button>
              ))}
            </div>

            <div className="h-8 w-px bg-white/5 mx-1 md:mx-2 shrink-0" />

            {/* Status Filter */}
            <div className="flex items-center shrink-0 rounded-xl bg-[#141418] p-1.5 border border-white/5 shadow-lg">
              {STATUSES.map((status) => (
                <button
                  key={status.key}
                  onClick={() => setSelectedStatus(status.key)}
                  className={cn(
                    "px-4 md:px-6 py-2 text-xs md:text-sm font-bold transition-all rounded-lg whitespace-nowrap",
                    selectedStatus === status.key
                      ? "bg-neon-mint text-deep-black shadow-[0_0_15px_rgba(110,231,183,0.3)]" 
                      : "text-[#7A7A85] hover:text-[#EEEEF0]"
                  )}
                >
                  {status.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between lg:justify-start gap-4">
            {/* Sort Dropdown */}
            <div className="flex items-center gap-2 rounded-xl bg-[#141418] px-4 md:px-5 py-2.5 border border-white/5 cursor-pointer hover:bg-[#1C1C21] transition-all group shadow-lg">
              <span className="text-[12px] md:text-[13px] font-bold text-[#EEEEF0] whitespace-nowrap">{t('contests.list.sort.recent')}</span>
              <ChevronDown className="h-4 w-4 text-[#7A7A85] group-hover:text-neon-mint transition-colors" />
            </div>

            {/* Result Count - Hidden on small mobile to save space, or placed better */}
            <div className="flex items-center gap-2">
              <span className="text-[12px] md:text-[13px] font-medium text-[#7A7A85]">
                {t('contests.list.result_count', { count: totalCount })}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Promotional Banner Section */}
      <TemporalLoLBanner />

      {/* Grid Section */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
        {isLoading ? (
          Array.from({ length: 9 }).map((_, i) => (
            <div key={i} className="h-[400px] md:h-[420px] w-full animate-pulse rounded-2xl bg-[#141418] border border-white/5" />
          ))
        ) : contests.length > 0 ? (
          contests.map((contest) => {
            const gameInfo = getGameInfo(contest.game_type);
            return (
              <ContestCard 
                key={contest.contest_id}
                id={contest.contest_id}
                title={contest.title}
                game={gameInfo.label}
                gameColor={gameInfo.color}
                status={contest.contest_status}
                creator="GAMERS"
                date={new Date(contest.started_at).toLocaleDateString()}
                prize={contest.total_point ? `₩${contest.total_point.toLocaleString()}` : 'TBD'}
                participants={contest.total_team_member}
                maxParticipants={contest.max_team_count}
              />
            );
          })
        ) : (
          <div className="col-span-full py-20 text-center text-[#7A7A85]">
            {t('contests.list.empty')}
          </div>
        )}
      </div>


      {/* CTA Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mt-8 md:mt-12 flex flex-col md:flex-row items-center justify-between rounded-3xl bg-gradient-to-br from-[#141418] to-[#1C1C21] p-8 md:p-12 border border-white/5 relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-64 h-64 bg-neon-mint/5 rounded-full blur-[100px] -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-neon-purple/5 rounded-full blur-[100px] -ml-32 -mb-32" />
        
        <div className="flex flex-col gap-3 relative z-10 mb-8 md:mb-0 text-center md:text-left">
          <h2 className="font-barlow text-3xl font-black italic tracking-tight text-[#EEEEF0] md:text-5xl leading-none">
            {t('contests.list.cta.title')}
          </h2>
          <p className="text-[#7A7A85] text-sm md:text-base font-medium max-w-md">
            {t('contests.list.cta.subtitle')}
          </p>
        </div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="relative z-10 w-full md:w-auto">
          <Button
            variant="neon"
            size="xl"
            className="group w-full md:w-auto flex items-center justify-center gap-3 bg-transparent border-2 border-neon-mint text-neon-mint hover:bg-neon-mint hover:text-black transition-all duration-300 shadow-[0_0_20px_rgba(110,231,183,0.1)] h-14 md:h-16 px-10 md:px-12 rounded-xl md:rounded-2xl"
          >
            <span className="font-black italic font-barlow text-lg uppercase tracking-wider">{t('contests.list.cta.button')}</span>
            <PlusCircle className="h-5 w-5 transition-transform group-hover:rotate-90" />
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}
