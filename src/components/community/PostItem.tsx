'use client';

import { useTranslation } from 'react-i18next';
import { Eye, MessageSquare, Star, Flame } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PostItemProps {
  category: string;
  game?: string;
  isHot?: boolean;
  status?: string;
  title: string;
  preview: string;
  author: {
    name: string;
    avatar: string;
    initials: string;
  };
  timeAgo: {
    value: number;
    unit: 'hours' | 'days';
  };
  stats: {
    views: number;
    comments: number;
    likes: number;
  };
}

export function PostItem({
  category,
  game,
  isHot,
  status,
  title,
  preview,
  author,
  timeAgo,
  stats,
}: PostItemProps) {
  const { t } = useTranslation();

  return (
    <div className="group flex flex-col gap-5 bg-white/[0.01] p-8 hover:bg-white/[0.03] transition-all cursor-pointer rounded-2xl border border-white/5 hover:border-white/10 hover:shadow-[0_8px_40px_rgba(0,0,0,0.4)]">
      <div className="flex items-center gap-3">
        <span className="rounded-lg bg-white/5 px-3 py-1 text-xs font-bold text-muted-gray border border-white/5 uppercase tracking-wide">
          {t(`community.categories.${category}`)}
        </span>
        {game && (
          <span className="rounded-lg bg-white/5 px-3 py-1 text-xs font-bold text-muted-gray border border-white/5 tracking-wide">
            {game}
          </span>
        )}
        {status === 'recruiting' && (
          <span className="rounded-lg bg-neon-mint/10 px-3 py-1 text-xs font-black text-neon-mint border border-neon-mint/20 shadow-[0_0_12px_rgba(110,231,183,0.1)]">
            {t('community.post.recruiting_status')}
          </span>
        )}
        {isHot && (
          <span className="flex items-center gap-1 rounded-lg bg-red-500/10 px-3 py-1 text-xs font-black text-red-500 border border-red-500/20 italic shadow-[0_0_12px_rgba(239,68,68,0.1)]">
            <Flame className="h-3.5 w-3.5 fill-red-500" />
            {t('community.post.hot')}
          </span>
        )}
      </div>

      <div className="flex flex-col gap-3">
        <h3 className="text-2xl font-bold text-white group-hover:text-neon-mint transition-colors line-clamp-1 tracking-tight">
          {title}
        </h3>
        <p className="text-base text-muted-gray line-clamp-2 leading-relaxed opacity-80">
          {preview}
        </p>
      </div>

      <div className="flex items-center justify-between mt-4">
        <div className="flex items-center gap-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 text-xs font-bold text-muted-gray border border-white/10 group-hover:border-white/20 transition-all">
            {author.initials}
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-bold text-white/90">{author.name}</span>
            <span className="text-[11px] font-medium text-muted-gray/60 mt-0.5">
              {t(`community.post.time_ago.${timeAgo.unit}`, { count: timeAgo.value })}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="flex items-center gap-2 text-muted-gray/40 group-hover:text-muted-gray transition-colors">
            <Eye className="h-4 w-4" />
            <span className="text-xs font-semibold">{t('community.post.views')} {stats.views.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-muted-gray/40 group-hover:text-muted-gray transition-colors">
            <MessageSquare className="h-4 w-4" />
            <span className="text-xs font-semibold">{t('community.post.comments')} {stats.comments.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-2 text-neon-mint/60 group-hover:text-neon-mint transition-colors font-bold bg-neon-mint/5 px-2.5 py-1 rounded-lg border border-neon-mint/10">
            <Star className="h-4 w-4 fill-neon-mint/20" />
            <span className="text-xs font-space tracking-wider">{stats.likes.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
