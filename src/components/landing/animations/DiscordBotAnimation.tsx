'use client';

import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Bot, User, Hash } from 'lucide-react';

export function DiscordBotAnimation() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ repeat: -1 });

      // Initial state
      tl.set('.discord-msg', { opacity: 0, x: -10 });
      tl.set('.bot-embed', { opacity: 0, scaleY: 0, transformOrigin: 'top' });
      tl.set('.typing-indicator', { opacity: 0 });

      // 1. User Message (Command)
      tl.to('.msg-1', {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
        delay: 0.5,
      });

      // 2. Typing Indicator
      tl.to('.typing-indicator', {
        opacity: 1,
        duration: 0.2,
      }, '+=0.3');

      tl.to('.typing-dot', {
        y: -3,
        stagger: 0.1,
        duration: 0.3,
        yoyo: true,
        repeat: 3,
      });

      tl.to('.typing-indicator', {
        opacity: 0,
        duration: 0.2,
      });

      // 3. Bot Response
      tl.to('.msg-2', {
        opacity: 1,
        x: 0,
        duration: 0.4,
        ease: 'power2.out',
      });

      tl.to('.bot-embed', {
        opacity: 1,
        scaleY: 1,
        duration: 0.6,
        ease: 'power4.out',
      }, '-=0.1');

      // 4. Glow pulse
      tl.to('.bot-accent', {
        boxShadow: '0 0 20px rgba(0,212,122,0.6)',
        duration: 0.4,
        yoyo: true,
        repeat: 3,
      });

      // 5. Fade out for loop
      tl.to('.discord-content', {
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
      className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden p-6"
    >
      <div className="discord-content flex flex-col gap-4 w-full max-w-[320px]">
        {/* Discord Simulation */}
        <div className="rounded-xl bg-[#313338] p-4 shadow-2xl border border-white/5">
          <div className="mb-4 flex items-center gap-2 border-b border-white/5 pb-2">
            <Hash className="h-4 w-4 text-muted-gray" />
            <span className="text-xs font-bold text-white/90"># tournament-announce</span>
          </div>

          <div className="space-y-4">
            {/* User Message */}
            <div className="discord-msg msg-1 flex gap-3">
              <div className="h-8 w-8 rounded-full bg-neon-purple/20 flex items-center justify-center flex-shrink-0">
                <User className="h-4 w-4 text-neon-purple" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-white">Owner</span>
                  <span className="text-[9px] text-muted-gray">Today at 4:20 PM</span>
                </div>
                <div className="mt-1 text-[12px] text-white/80">
                  <span className="text-neon-cyan">/tournament</span> create
                </div>
              </div>
            </div>

            {/* Typing UI */}
            <div className="typing-indicator flex items-center gap-1.5 px-11">
              <span className="text-[10px] text-muted-gray italic">GAMERS Bot is typing</span>
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <div key={i} className="typing-dot h-1 w-1 rounded-full bg-muted-gray" />
                ))}
              </div>
            </div>

            {/* Bot Message */}
            <div className="discord-msg msg-2 flex gap-3">
              <div className="h-8 w-8 rounded-full bg-neon-mint flex items-center justify-center flex-shrink-0">
                <Bot className="h-5 w-5 text-deep-black" />
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-bold text-white">GAMERS Bot</span>
                  <span className="rounded bg-neon-mint/20 px-1 py-0.5 text-[8px] font-bold text-neon-mint">APP</span>
                </div>
                
                {/* Embed Area */}
                <div className="bot-embed mt-2 overflow-hidden rounded-md border-l-4 border-neon-mint bg-[#2b2d31] p-3 shadow-lg">
                  <div className="text-[10px] font-bold text-white mb-1">🎮 VALORANT Champions Tour</div>
                  <div className="text-[9px] text-white/60 mb-2 leading-tight">
                    トーナメントが正常に生成されました。参加者は以下のリンクから申し込むことができます。
                  </div>
                  <div className="flex gap-2">
                    <div className="rounded bg-neon-mint/10 border border-neon-mint/20 px-2 py-1 text-[8px] text-neon-mint font-bold hover:bg-neon-mint hover:text-deep-black transition-colors cursor-pointer">
                      参加する
                    </div>
                    <div className="rounded bg-white/5 border border-white/10 px-2 py-1 text-[8px] text-white/60 font-bold">
                      詳細
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Floating Accent */}
        <div className="bot-accent absolute -bottom-4 -right-4 h-16 w-16 rounded-full bg-neon-mint/10 blur-xl opacity-50" />
      </div>
    </div>
  );
}
