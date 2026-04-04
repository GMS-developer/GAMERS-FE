'use client';

import { useTranslation } from 'react-i18next';
import { Button } from '@/components/ui/button';
import { Gamepad2, Link as LinkIcon, MessageSquare, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function GameAccountList() {
  const { t } = useTranslation();

  const accounts = [
    {
      id: 'valorant',
      name: 'VALORANT',
      account: 'StarPlayer_KR#KR01',
      status: 'Platinum 2 • ELO 1,253',
      linked: true,
      icon: <Gamepad2 className="w-5 h-5 text-[#FF4655]" />,
    },
    {
      id: 'lol',
      name: 'LEAGUE OF LEGENDS',
      account: t('mypage.accounts.not_linked', '계정 미연동'),
      status: '',
      linked: false,
      icon: <Gamepad2 className="w-5 h-5 text-[#0BC6E3]" />,
    },
    {
      id: 'discord',
      name: 'DISCORD',
      account: 'StarPlayer_KR#0001',
      status: t('mypage.accounts.discord_linked', '계정 연동 완료'),
      linked: true,
      icon: <MessageSquare className="w-5 h-5 text-[#5865F2]" />,
    }
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-12">
      <h3 className="text-[13px] font-black text-[#BBBBCB] uppercase tracking-[0.2em] mb-6">
        {t('mypage.accounts.title', '연동 게임 계정')}
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {accounts.map((acc) => (
          <div 
            key={acc.id}
            className="group relative flex items-center justify-between p-6 rounded-[24px] bg-[#141418] border border-white/5 transition-all hover:bg-[#1C1C21] hover:border-white/10 hover:shadow-2xl shadow-black/40 overflow-hidden"
          >
            {/* Background Decor */}
            <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/2 blur-[40px] rounded-full group-hover:bg-white/5 transition-colors" />
            
            <div className="flex items-center gap-5 z-10">
              <div className="w-12 h-12 rounded-xl bg-[#0C0C0F] border border-white/5 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                {acc.icon}
              </div>
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                   <span className="text-[11px] font-black text-[#7A7A85] uppercase tracking-wider">{acc.name}</span>
                   {acc.linked && <CheckCircle2 className="w-3 h-3 text-neon-mint" />}
                </div>
                <h4 className="text-[15px] font-black text-[#EEEEF0] leading-none mb-1">{acc.account}</h4>
                {acc.status && <p className="text-[12px] font-bold text-[#4A4A55] tracking-tight">{acc.status}</p>}
              </div>
            </div>

            <div className="z-10">
              {acc.linked ? (
                <div className="px-3 py-1.5 rounded-lg bg-neon-mint/10 border border-neon-mint/20 flex items-center gap-1.5">
                   <div className="w-1 h-1 rounded-full bg-neon-mint animate-pulse" />
                   <span className="text-[10px] font-black text-neon-mint uppercase tracking-widest">{t('mypage.accounts.linked', '연동됨')}</span>
                </div>
              ) : (
                <Button variant="riot" className="bg-[#1C1C21] hover:bg-neon-mint hover:text-deep-black border border-white/5 text-[10px] font-black uppercase px-4 h-8 transition-colors">
                   {t('mypage.accounts.link', '연동하기')}
                </Button>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
