'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';
import { Search, User, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { key: 'find_contests', href: '/contests' },
  { key: 'my_contests', href: '/my-contests' },
  { key: 'community', href: '/community' },
];

export function Navbar() {
  const pathname = usePathname();
  const { t, i18n } = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on path change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <>
      <nav 
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
          scrolled 
            ? "border-white/10 bg-background/90 backdrop-blur-lg h-16" 
            : "border-transparent bg-transparent h-20"
        )}
      >
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-10">
            <Link href="/" className="flex items-center gap-2 group shrink-0">
              <span className="font-koulen text-3xl font-normal tracking-tight text-foreground uppercase italic text-glow-mint leading-none pt-1">
                GAMERS
              </span>
            </Link>

            <div className="hidden items-center gap-8 md:flex">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'text-sm font-medium transition-all hover:text-neon-mint relative py-1',
                    pathname === link.href ? 'text-neon-mint' : 'text-muted-gray'
                  )}
                >
                  {t(`navbar.${link.key}`)}
                  {pathname === link.href && (
                    <motion.div 
                      layoutId="nav-underline"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-neon-mint shadow-[0_0_8px_rgba(0,212,122,0.6)]"
                    />
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 md:gap-6">
            <div className="hidden md:flex items-center gap-1 text-muted-gray hover:text-foreground transition-colors cursor-pointer">
              <Search className="h-4 w-4" />
            </div>

            {/* Language Switcher - Desktop */}
            <div className="hidden sm:flex items-center relative overflow-hidden rounded-full bg-white/5 p-1 border border-white/10 w-[72px] h-[28px]">
              <motion.div
                initial={false}
                animate={{ x: i18n.language === 'ko' ? 0 : 32 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="absolute left-1 h-[20px] w-[32px] rounded-full bg-neon-mint shadow-[0_0_12px_rgba(0,212,122,0.3)]"
              />
              <button
                onClick={() => i18n.changeLanguage('ko')}
                className={cn(
                  'relative z-10 w-[32px] text-[10px] font-bold transition-colors',
                  i18n.language === 'ko' ? 'text-deep-black' : 'text-muted-gray hover:text-foreground'
                )}
              >
                KR
              </button>
              <button
                onClick={() => i18n.changeLanguage('ja')}
                className={cn(
                  'relative z-10 w-[32px] text-[10px] font-bold transition-colors',
                  i18n.language === 'ja' ? 'text-deep-black' : 'text-muted-gray hover:text-foreground'
                )}
              >
                JP
              </button>
            </div>

            <div className="hidden md:flex items-center gap-1 text-muted-gray hover:text-foreground transition-colors cursor-pointer">
              <User className="h-5 w-5" />
            </div>

            <div className="hidden md:flex items-center gap-4">
              <Link
                href="/login"
                className="text-sm font-medium text-muted-gray transition-colors hover:text-foreground"
              >
                {t('navbar.login')}
              </Link>
              <Button
                size="sm"
                className="bg-neon-mint font-bold text-deep-black hover:bg-neon-mint/90 shadow-[0_0_15px_rgba(0,212,122,0.2)]"
                asChild
              >
                <Link href="/signup">{t('navbar.get_started')}</Link>
              </Button>
            </div>

            {/* Mobile Menu Toggle */}
            <button 
              onClick={toggleMenu}
              className="flex items-center justify-center h-10 w-10 rounded-full bg-white/5 border border-white/10 md:hidden text-foreground hover:bg-white/10 active:scale-95 transition-all"
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 md:hidden pt-24 px-6 bg-background/95 backdrop-blur-xl"
          >
            <div className="flex flex-col gap-8 py-8">
              <div className="flex flex-col gap-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      'text-2xl font-bold transition-colors',
                      pathname === link.href ? 'text-neon-mint' : 'text-foreground/60'
                    )}
                  >
                    {t(`navbar.${link.key}`)}
                  </Link>
                ))}
              </div>

              <div className="h-[1px] w-full bg-white/10" />

              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-muted-gray">{t('navbar.language')}</span>
                <div className="flex items-center relative overflow-hidden rounded-full bg-white/5 p-1 border border-white/10 w-[90px] h-[36px]">
                  <motion.div
                    initial={false}
                    animate={{ x: i18n.language === 'ko' ? 0 : 40 }}
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    className="absolute left-1 h-[26px] w-[42px] rounded-full bg-neon-mint shadow-[0_0_12px_rgba(0,212,122,0.3)]"
                  />
                  <button
                    onClick={() => i18n.changeLanguage('ko')}
                    className={cn(
                      'relative z-10 w-[42px] text-xs font-bold transition-colors',
                      i18n.language === 'ko' ? 'text-deep-black' : 'text-muted-gray'
                    )}
                  >
                    KR
                  </button>
                  <button
                    onClick={() => i18n.changeLanguage('ja')}
                    className={cn(
                      'relative z-10 w-[42px] text-xs font-bold transition-colors',
                      i18n.language === 'ja' ? 'text-deep-black' : 'text-muted-gray'
                    )}
                  >
                    JP
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4">
                <Button variant="outline" className="border-white/10 text-foreground" asChild>
                  <Link href="/login">{t('navbar.login')}</Link>
                </Button>
                <Button className="bg-neon-mint text-deep-black font-bold h-10" asChild>
                  <Link href="/signup">{t('navbar.get_started')}</Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
