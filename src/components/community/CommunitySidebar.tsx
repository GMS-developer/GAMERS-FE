'use client';

import { useTranslation } from 'react-i18next';
import { Star, MessageSquare, ChevronRight, Users, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function CommunitySidebar() {
  const { t } = useTranslation();

  const popularPosts = [
    { id: 1, rank: '01', title: 'GAMERS 플랫폼 쓰면서 달라진 점', likes: 215, comments: 67 },
    { id: 2, rank: '02', title: '아이언~골드 빠르게 탈출하는 에임 루틴', likes: 128, comments: 34 },
    { id: 3, rank: '03', title: '발로란트 신인 오픈컵 S3 참가 후기', likes: 89, comments: 21 },
  ];

  const recruitmentPosts = [
    { id: 1, title: 'LoL 5vs5 팀원 모집', tags: '정글 · 서폿 · 골드 이상' },
    { id: 2, title: 'Valorant 듀오 파트너', tags: '플래티넘 이상 · 주 4회 이상' },
  ];

  return (
    <div className="flex flex-col gap-10">
      {/* Popular Posts */}
      <section className="rounded-[32px] border border-white/5 bg-white/[0.02] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.25)] relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Flame className="h-5 w-5 text-red-500 fill-red-500/20" />
            {t('community.sidebar.popular_posts')}
          </h2>
          <ChevronRight className="h-4 w-4 text-muted-gray cursor-pointer hover:text-white transition-colors" />
        </div>
        <div className="flex flex-col gap-8">
          {popularPosts.map((post, idx) => (
            <div key={post.id} className="flex gap-6 group cursor-pointer">
              <span className="font-barlow text-4xl font-black text-white/5 group-hover:text-neon-mint/20 transition-all duration-300 py-1 flex-shrink-0">
                {post.rank}
              </span>
              <div className="flex flex-col gap-2.5 flex-1 pt-1">
                <h3 className="text-[15px] font-bold text-white/90 group-hover:text-neon-mint transition-colors line-clamp-2 leading-tight">
                  {post.title}
                </h3>
                <div className="flex items-center gap-4 text-[11px] font-bold text-muted-gray/40">
                  <div className="flex items-center gap-1.5">
                    <Star className="h-3 w-3 fill-neon-mint/10 text-neon-mint/40" />
                    <span>{t('community.post.likes')} {post.likes}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <MessageSquare className="h-3 w-3 text-muted-gray/40" />
                    <span>{t('community.post.comments')} {post.comments}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team Recruitment */}
      <section className="rounded-[32px] border border-white/5 bg-white/[0.02] p-8 shadow-[0_8px_40px_rgba(0,0,0,0.25)] relative overflow-hidden">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Users className="h-5 w-5 text-neon-mint" />
            {t('community.sidebar.team_recruiting')}
          </h2>
          <div className="flex items-center justify-center h-6 w-6 rounded-lg bg-neon-mint text-deep-black text-[11px] font-black shadow-[0_0_12px_rgba(110,231,183,0.3)]">
            2
          </div>
        </div>
        <div className="flex flex-col gap-4">
          {recruitmentPosts.map((post) => (
            <div key={post.id} className="flex flex-col gap-2.5 p-6 rounded-2xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-neon-mint/30 transition-all cursor-pointer group">
              <div className="flex items-center justify-between gap-4">
                <h3 className="text-sm font-bold text-white group-hover:text-neon-mint transition-colors line-clamp-1">{post.title}</h3>
                <div className="flex-shrink-0 rounded-md bg-neon-mint/10 px-2.5 py-0.5 text-[9px] font-black text-neon-mint uppercase tracking-widest border border-neon-mint/20">
                  {t('community.post.recruiting_status')}
                </div>
              </div>
              <p className="text-[11px] font-semibold text-muted-gray/60 leading-relaxed italic">{post.tags}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Card */}
      <section className="rounded-[32px] bg-gradient-to-br from-neon-mint/30 via-deep-black to-deep-black p-10 border border-neon-mint/20 shadow-[0_12px_60px_rgba(110,231,183,0.2)] relative overflow-hidden group/cta">
        {/* Glow effect */}
        <div className="absolute -top-10 -right-10 h-40 w-40 bg-neon-mint/20 blur-[100px] rounded-full group-hover/cta:scale-150 transition-transform duration-1000" />
        <div className="absolute -bottom-10 -left-10 h-40 w-40 bg-neon-mint/10 blur-[80px] rounded-full" />
        
        <div className="relative z-10 flex flex-col items-center text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-neon-mint text-deep-black shadow-[0_0_30px_rgba(110,231,183,0.4)] mb-8 transform group-hover/cta:scale-110 group-hover/cta:rotate-3 transition-all duration-500">
            <Users className="h-8 w-8 stroke-[2.5px]" />
          </div>
          
          <h2 className="font-barlow text-2xl font-black text-white mb-3 uppercase tracking-tight leading-tight">
            {t('community.sidebar.cta.title')}
          </h2>
          <p className="text-sm font-medium text-muted-gray/80 mb-10 leading-relaxed px-2">
            {t('community.sidebar.cta.subtitle')}
          </p>
          
          <Button className="w-full bg-white text-deep-black font-black uppercase text-base hover:bg-neon-mint hover:scale-[1.02] active:scale-95 transition-all duration-300 h-16 rounded-[20px] shadow-[0_8px_30px_rgba(0,0,0,0.4)]">
            {t('community.sidebar.cta.button')}
          </Button>
        </div>
      </section>
    </div>
  );
}
