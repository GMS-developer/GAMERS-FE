'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { User, Check } from 'lucide-react';

export function MatchingAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 });

      // Initial state
      tl.set('.player-node', { 
        x: () => (Math.random() - 0.5) * 200,
        y: () => (Math.random() - 0.5) * 100,
        opacity: 0,
        scale: 0.5
      });
      tl.set('.match-status', { opacity: 0, y: 10 });
      tl.set('.team-box', { borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'transparent' });

      // 1. Players appear and float around
      tl.to('.player-node', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        stagger: 0.1,
        ease: 'back.out(1.7)',
      });

      tl.to('.player-node', {
        x: (i) => [-40, 40, -20, 20, 0][i],
        y: (i) => [-20, 20, 30, -30, 0][i],
        duration: 2,
        ease: 'sine.inOut',
      });

      // 2. Matching starts - move to slots
      tl.to('.player-node', {
        x: (i) => (i - 2) * 45, // Spread horizontally in slots
        y: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.inOut',
      }, '+=0.5');

      // 3. Highlight team box and show success
      tl.to('.team-box', {
        borderColor: 'rgba(0, 212, 122, 0.5)',
        backgroundColor: 'rgba(0, 212, 122, 0.05)',
        duration: 0.4,
      });

      tl.to('.match-status', {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'back.out',
      }, '-=0.2');

      // 4. Pulse effect
      tl.to('.team-box', {
        scale: 1.05,
        duration: 0.2,
        yoyo: true,
        repeat: 1,
      });

      // 5. Fade out for loop
      tl.to('.matching-content', {
        opacity: 0,
        duration: 0.5,
        delay: 1.5,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden p-8"
    >
      <div className="matching-content relative flex flex-col items-center gap-8 w-full">
        {/* Connection Lines (Simulated with CSS) */}
        <div className="absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-neon-mint/20 to-transparent blur-sm" />
        
        {/* Team Container */}
        <div className="team-box relative flex h-16 w-64 items-center justify-around rounded-full border border-white/10 px-4 transition-all duration-300">
           {/* Slots */}
           {[0, 1, 2, 3, 4].map((i) => (
             <div key={i} className="h-10 w-10 rounded-full border border-white/5 bg-white/2" />
           ))}
           
           {/* Players that will move into slots */}
           <div className="absolute inset-0 flex items-center justify-around px-4">
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} className="player-node flex h-10 w-10 items-center justify-center rounded-full bg-deep-black border border-neon-mint/50 shadow-[0_0_15px_rgba(0,212,122,0.2)]">
                  <User className="h-5 w-5 text-neon-mint" />
                </div>
              ))}
           </div>
        </div>

        {/* Status Text */}
        <div className="match-status flex items-center gap-2 rounded-full bg-neon-mint/20 px-4 py-1 border border-neon-mint/30">
          <div className="flex h-4 w-4 items-center justify-center rounded-full bg-neon-mint">
            <Check className="h-3 w-3 text-deep-black" />
          </div>
          <span className="text-xs font-bold text-neon-mint tracking-tight uppercase">Team Found</span>
        </div>
      </div>
      
      {/* Background Ambience */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none">
        <div className="h-32 w-32 rounded-full bg-neon-mint blur-[60px]" />
      </div>
    </div>
  );
}
