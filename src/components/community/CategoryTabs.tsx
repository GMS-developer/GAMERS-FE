'use client';

import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'all', key: 'all' },
  { id: 'free', key: 'free' },
  { id: 'tips', key: 'tips' },
  { id: 'recruiting', key: 'recruiting' },
  { id: 'reviews', key: 'reviews' },
];

export function CategoryTabs() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState('all');

  return (
    <div className="flex border-b border-white/5 bg-deep-black sticky top-16 z-30 shadow-[0_4px_30px_rgba(0,0,0,0.4)]">
      <div className="mx-auto flex w-full max-w-7xl items-center px-6">
        <div className="flex gap-10 overflow-x-auto overflow-y-hidden no-scrollbar">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                'relative py-5 text-sm font-bold transition-all whitespace-nowrap px-1 group',
                activeCategory === category.id
                  ? 'text-neon-mint'
                  : 'text-muted-gray hover:text-foreground'
              )}
            >
              <span className="relative z-10">{t(`community.categories.${category.key}`)}</span>
              {activeCategory === category.id && (
                <div className="absolute bottom-0 left-0 h-1 w-full bg-neon-mint shadow-[0_0_12px_rgba(110,231,183,0.4)]" />
              )}
              {activeCategory !== category.id && (
                <div className="absolute bottom-0 left-1/2 h-1 w-0 -translate-x-1/2 bg-white/20 transition-all group-hover:w-full" />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
