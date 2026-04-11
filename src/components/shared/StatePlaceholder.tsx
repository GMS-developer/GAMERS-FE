'use client';

import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  AlertTriangle, 
  Search, 
  Clock, 
  RotateCcw, 
  WifiOff, 
  PackageOpen,
  ArrowRight
} from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

export type StatePlaceholderType = 'no-data' | 'error' | 'timeout';

interface StatePlaceholderProps {
  type: StatePlaceholderType;
  title?: string;
  description?: string;
  onRetry?: () => void;
  fullScreen?: boolean;
  className?: string;
}

export function StatePlaceholder({ 
  type, 
  title, 
  description, 
  onRetry, 
  fullScreen = false,
  className 
}: StatePlaceholderProps) {
  const { t } = useTranslation();
  const containerRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const actionRef = useRef<HTMLDivElement>(null);

  const displayTitle = title || t(`common.state.${type}.title`);
  const displayDesc = description || t(`common.state.${type}.desc`);

  useGSAP(() => {
    const tl = gsap.timeline();

    // Entrance Animation
    tl.from(iconRef.current, {
      scale: 0.5,
      opacity: 0,
      duration: 0.8,
      ease: 'back.out(1.7)'
    })
    .from(textRef.current?.children || [], {
      y: 20,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'power2.out'
    }, '-=0.4')
    .from(actionRef.current, {
      y: 10,
      opacity: 0,
      duration: 0.4
    }, '-=0.2');

    // Type-specific looping animations
    if (type === 'no-data') {
      // Gentle floating for no-data
      gsap.to(iconRef.current, {
        y: -10,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    } else if (type === 'error') {
      // Glitch shake for error
      const glitchTl = gsap.timeline({ repeat: -1, repeatDelay: 2 });
      glitchTl.to(iconRef.current, { x: 2, duration: 0.05, repeat: 5, yoyo: true })
              .to(iconRef.current, { x: 0, duration: 0.05 });
    } else if (type === 'timeout') {
      // Pulsating for timeout
      gsap.to('.timeout-pulse', {
        scale: 1.5,
        opacity: 0,
        duration: 2,
        repeat: -1,
        ease: 'power1.out',
        stagger: 0.5
      });
    }
  }, { scope: containerRef });

  const getIcon = () => {
    switch (type) {
      case 'no-data':
        return <PackageOpen className="w-16 h-16 text-neon-mint" />;
      case 'error':
        return <AlertTriangle className="w-16 h-16 text-rose-500" />;
      case 'timeout':
        return (
          <div className="relative flex items-center justify-center">
            <div className="timeout-pulse absolute w-16 h-16 rounded-full border border-blue-500/50" />
            <div className="timeout-pulse absolute w-16 h-16 rounded-full border border-blue-500/30" />
            <WifiOff className="w-16 h-16 text-blue-500 relative z-10" />
          </div>
        );
    }
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "flex flex-col items-center justify-center text-center p-8",
        fullScreen ? "min-h-[70vh]" : "min-h-[400px]",
        className
      )}
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 pointer-events-none opacity-20">
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[radial-gradient(circle,rgba(110,231,183,0.05)_0%,transparent_70%)]" />
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Icon Section */}
      <div ref={iconRef} className="mb-8 relative">
        <div className={cn(
          "absolute inset-0 blur-2xl opacity-20",
          type === 'no-data' ? "bg-neon-mint" : 
          type === 'error' ? "bg-rose-500" : "bg-blue-500"
        )} />
        {getIcon()}
      </div>

      {/* Text Section */}
      <div ref={textRef} className="flex flex-col gap-3 max-w-md relative z-10">
        <h3 className="text-3xl font-black text-[#EEEEF0] tracking-tight italic uppercase font-barlow">
          {displayTitle}
        </h3>
        <p className="text-base text-[#7A7A85] font-medium leading-relaxed">
          {displayDesc}
        </p>
      </div>

      {/* Action Section */}
      {onRetry && (
        <div ref={actionRef} className="mt-10 relative z-10">
          <Button 
            onClick={onRetry}
            className={cn(
              "h-14 px-10 font-black uppercase tracking-widest text-[11px] rounded-2xl group transition-all active:scale-95",
              type === 'error' ? "bg-rose-500 hover:bg-rose-400 text-white" : "bg-neon-mint hover:bg-white text-deep-black"
            )}
          >
            <RotateCcw className="w-4 h-4 mr-2 transition-transform group-hover:rotate-180 duration-500" />
            {t('common.state.retry')}
            <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      )}

      {/* Minimal Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" />
    </div>
  );
}
