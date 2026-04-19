'use client';

import React from 'react';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { WritePostForm } from '@/components/community/WritePostForm';
import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

export default function WritePostPage() {
  const { t } = useTranslation();

  return (
    <div className="flex min-h-screen flex-col bg-deep-black text-foreground selection:bg-neon-mint selection:text-deep-black">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="mx-auto max-w-4xl px-6">
          {/* Breadcrumb / Back Navigation */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-8"
          >
            <Link 
              href="/community" 
              className="group inline-flex items-center gap-2 text-muted-gray hover:text-neon-mint transition-colors font-bold uppercase tracking-wider text-sm"
            >
              <div className="flex items-center justify-center h-8 w-8 rounded-full border border-white/10 bg-white/5 group-hover:border-neon-mint/50 transition-all">
                <ChevronLeft className="h-4 w-4" />
              </div>
              {t('common.back')}
            </Link>
          </motion.div>

          {/* Form Container */}
          <WritePostForm />
        </div>
      </main>

      <Footer />
    </div>
  );
}
