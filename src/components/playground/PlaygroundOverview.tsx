'use client';

import { motion } from 'framer-motion';
import { PlaygroundSummaryCards } from '@/components/playground/PlaygroundSummaryCards';
import { PlaygroundRecentMatches } from '@/components/playground/PlaygroundRecentMatches';
import { PlaygroundTeamMembersMini } from '@/components/playground/PlaygroundTeamMembersMini';
import { PlaygroundBracketPreview } from '@/components/playground/PlaygroundBracketPreview';
import { PlaygroundNoticeBanner } from '@/components/playground/PlaygroundNoticeBanner';
import { PlaygroundQuickLinks } from '@/components/playground/PlaygroundQuickLinks';

export function PlaygroundOverview() {
  return (
    <main className="flex-1 bg-[#09090B] p-8">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        
        {/* Notice Banner */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5 }}
        >
          <PlaygroundNoticeBanner />
        </motion.div>

        {/* Summary Cards */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.1 }}
        >
          <PlaygroundSummaryCards />
        </motion.div>

        {/* Triple Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Matches & Records - Left 8 Units */}
          <motion.div 
            className="lg:col-span-8 flex flex-col gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 h-full">
              <PlaygroundRecentMatches />
              <PlaygroundBracketPreview />
            </div>
          </motion.div>

          {/* Team Members - Right 4 Units */}
          <motion.div 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <PlaygroundTeamMembersMini />
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.4 }}
        >
          <PlaygroundQuickLinks />
        </motion.div>

      </div>
    </main>
  );
}
