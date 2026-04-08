'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export function TournamentAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1, repeatDelay: 2 });

      // Reset
      tl.set('.team-card', { opacity: 0, x: -10 });
      tl.set('.winner-card', { opacity: 0, scale: 0.8 });
      tl.set('.connector-line', { strokeDashoffset: 100, strokeDasharray: 100 });

      // Round 1
      tl.to('.round-1 .team-card', {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: 'power2.out',
      });

      // Draw lines from Round 1 to Semi Final
      tl.to('.line-r1', {
        strokeDashoffset: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: 'none',
      });

      // Semi Final winners appear
      tl.to('.semi-final .team-card', {
        opacity: 1,
        x: 0,
        duration: 0.4,
        stagger: 0.2,
        ease: 'power2.out',
      }, '-=0.2');

      // Draw lines from Semi Final to Final
      tl.to('.line-sf', {
        strokeDashoffset: 0,
        duration: 0.5,
        ease: 'none',
      });

      // Final winner appears with a pop
      tl.to('.final .winner-card', {
        opacity: 1,
        scale: 1,
        duration: 0.5,
        ease: 'back.out(1.7)',
      });

      // Shine effect on winner
      tl.to('.winner-glow', {
        opacity: 0.6,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
      });

      // Fade out for loop
      tl.to(containerRef.current, {
        opacity: 0,
        duration: 0.5,
        delay: 2,
      });
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="relative flex h-full w-full items-center justify-center overflow-hidden p-8"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:20px_20px]" />

      <svg
        ref={linesRef}
        className="absolute inset-0 h-full w-full pointer-events-none"
        viewBox="0 0 400 220"
      >
        {/* Round 1 -> Semi Final lines */}
        <path className="connector-line line-r1 stroke-neon-mint/30" d="M 120 45 L 140 45 L 140 75 L 160 75" fill="none" strokeWidth="1.5" />
        <path className="connector-line line-r1 stroke-neon-mint/30" d="M 120 105 L 140 105 L 140 75 L 160 75" fill="none" strokeWidth="1.5" />
        
        <path className="connector-line line-r1 stroke-neon-mint/30" d="M 120 165 L 140 165 L 140 135 L 160 135" fill="none" strokeWidth="1.5" />
        <path className="connector-line line-r1 stroke-neon-mint/30" d="M 120 225 L 140 225 L 140 135 L 160 135" fill="none" strokeWidth="1.5" />

        {/* Semi Final -> Final lines */}
        <path className="connector-line line-sf stroke-neon-mint" d="M 240 105 L 260 105 L 260 135 L 280 135" fill="none" strokeWidth="2" />
      </svg>

      <div className="relative z-10 flex w-full items-center justify-between gap-4 max-w-sm">
        {/* Round 1 */}
        <div className="round-1 flex flex-col gap-8">
          <div className="flex flex-col gap-2">
            <TeamCard name="TEAM ALPHA" score="13" isWinner />
            <TeamCard name="TEAM BETA" score="11" />
          </div>
          <div className="flex flex-col gap-2">
            <TeamCard name="TEAM GAMMA" score="13" isWinner />
            <TeamCard name="TEAM DELTA" score="9" />
          </div>
        </div>

        {/* Semi Final */}
        <div className="semi-final flex flex-col gap-16">
          <div className="flex flex-col gap-4">
            <TeamCard name="TEAM ALPHA" score="2" isWinner />
            <TeamCard name="TEAM GAMMA" score="1" />
          </div>
        </div>

        {/* Final */}
        <div className="final flex flex-col items-center">
          <div className="winner-glow absolute inset-0 bg-neon-mint/20 blur-3xl opacity-0 rounded-full" />
          <div className="winner-card flex flex-col items-center gap-2">
            <div className="text-[10px] font-bold text-neon-mint tracking-widest uppercase">Champion</div>
            <TeamCard name="TEAM ALPHA" score="WINNER" isWinner highlight />
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamCard({ name, score, isWinner, highlight }: { name: string, score: string, isWinner?: boolean, highlight?: boolean }) {
  return (
    <div className={`team-card min-w-[100px] rounded-md border p-2 text-[10px] backdrop-blur-sm transition-colors ${
      highlight ? 'border-neon-mint bg-neon-mint/10 ring-1 ring-neon-mint/50' : 
      isWinner ? 'border-white/20 bg-white/5' : 'border-white/10 bg-black/40 opacity-40'
    }`}>
      <div className="flex items-center justify-between gap-2">
        <span className={`font-medium ${isWinner ? 'text-white' : 'text-muted-gray'}`}>{name}</span>
        <span className={`font-bold ${isWinner ? 'text-neon-mint' : 'text-muted-gray'}`}>{score}</span>
      </div>
    </div>
  );
}
