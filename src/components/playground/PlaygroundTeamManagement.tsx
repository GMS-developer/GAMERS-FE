'use client';

import { motion } from 'framer-motion';
import { TeamLeaderPrivilegeBar } from '@/components/playground/team/TeamLeaderPrivilegeBar';
import { TeamRosterSection } from '@/components/playground/team/TeamRosterSection';
import { StrategyAndScheduleSection } from '@/components/playground/team/StrategyAndScheduleSection';
import { HistoryAndInvitesSection } from '@/components/playground/team/HistoryAndInvitesSection';

export function PlaygroundTeamManagement() {
  return (
    <main className="flex-1 bg-[#09090B] p-8 overflow-hidden">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-6">
        
        {/* Top: Leader Privilege Bar */}
        <motion.div
           initial={{ opacity: 0, y: -20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.4 }}
        >
          <TeamLeaderPrivilegeBar />
        </motion.div>

        {/* Main Content: Triple Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch min-h-[800px]">
          
          {/* Left: Team Profile & Member Roster (Col span 3) */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
             <TeamRosterSection />
          </motion.div>

          {/* Middle: Strategy & Schedule (Col span 6) */}
          <motion.div 
            className="lg:col-span-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
             <StrategyAndScheduleSection />
          </motion.div>

          {/* Right: History & Invites (Col span 3) */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
             <HistoryAndInvitesSection />
          </motion.div>

        </div>

      </div>
    </main>
  );
}
