'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { MyContestsHero } from '@/components/my-contests/MyContestsHero';
import { MyContestsContent } from '@/components/my-contests/MyContestsContent';
import { motion } from 'framer-motion';

export default function MyContestsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-[#EEEEF0] selection:bg-neon-mint/30">
      <Navbar />
      
      <main className="flex-1">
        <motion.div
           initial={{ opacity: 0 }}
           animate={{ opacity: 1 }}
           transition={{ duration: 0.5 }}
        >
          {/* Hero Section with Summary Stats */}
          <MyContestsHero participatingCount={2} completedCount={7} />
          
          {/* Main Content with Tabs & Lists */}
          <MyContestsContent />
        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
