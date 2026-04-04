'use client';

import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { CommunityHero } from '@/components/community/CommunityHero';
import { CategoryTabs } from '@/components/community/CategoryTabs';
import { PostList } from '@/components/community/PostList';
import { CommunitySidebar } from '@/components/community/CommunitySidebar';
import { motion } from 'framer-motion';

export default function CommunityPage() {
  return (
    <div className="flex min-h-screen flex-col bg-deep-black text-foreground selection:bg-neon-mint selection:text-deep-black">
      <Navbar />
      
      <main className="flex-1">
        <CommunityHero />
        <CategoryTabs />
        
        <div className="mx-auto max-w-7xl px-6 py-16 lg:py-24">
          <div className="flex flex-col gap-16 lg:flex-row lg:gap-20">
            {/* Main Content: Post List */}
            <motion.div 
              className="flex-1"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <PostList />
            </motion.div>

            {/* Sidebar */}
            <motion.aside 
              className="w-full lg:w-[400px] flex-shrink-0"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            >
              <div className="sticky top-32">
                <CommunitySidebar />
              </div>
            </motion.aside>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
