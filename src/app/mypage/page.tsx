'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { ProfileHero } from '@/components/mypage/ProfileHero';
import { GameAccountList } from '@/components/mypage/GameAccountList';
import { ContestHistory } from '@/components/mypage/ContestHistory';
import { NotificationPreview } from '@/components/mypage/NotificationPreview';
import { CreateContestCTA } from '@/components/mypage/CreateContestCTA';
import { motion } from 'framer-motion';

export default function MyPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-[#EEEEF0] selection:bg-neon-mint/30">
      <Navbar />
      
      <main className="flex-1 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Profile Hero Section */}
          <ProfileHero />
          
          {/* Linked Game Accounts */}
          <GameAccountList />
          
          {/* Contest History & Tabs */}
          <ContestHistory />
          
          {/* Recent Notifications */}
          <NotificationPreview />
          
          {/* Create Contest CTA banner */}
          <CreateContestCTA />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
