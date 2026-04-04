'use client';

import { PlaygroundNavbar } from '@/components/playground/PlaygroundNavbar';
import { PlaygroundHeader } from '@/components/playground/PlaygroundHeader';
import { PlaygroundSubNav } from '@/components/playground/PlaygroundSubNav';

export default function PlaygroundLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F] text-[#EEEEF0] selection:bg-neon-mint/30">
      <PlaygroundNavbar />
      <PlaygroundHeader 
        title="발로란트 신인 오픈컵 시즌 4"
        game="Valorant"
        host="GMS_Creator"
        timeLeft="01:23:45"
      />
      <PlaygroundSubNav />
      {children}
    </div>
  );
}
