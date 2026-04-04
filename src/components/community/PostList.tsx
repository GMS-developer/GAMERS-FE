'use client';

import { useTranslation } from 'react-i18next';
import { PostItem } from './PostItem';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination';

export function PostList() {
  const { t } = useTranslation();

  const mockPosts = [
    {
      category: 'tips',
      game: 'Valorant',
      isHot: true,
      title: t('community.mock_posts.post1.title'),
      preview: t('community.mock_posts.post1.preview'),
      author: { name: 'GamingKing_KR', avatar: '', initials: 'GK' },
      timeAgo: { value: 2, unit: 'hours' as const },
      stats: { views: 2847, comments: 34, likes: 128 },
    },
    {
      category: 'recruiting',
      game: 'LoL',
      status: 'recruiting',
      title: t('community.mock_posts.post2.title'),
      preview: t('community.mock_posts.post2.preview'),
      author: { name: 'NexusGG', avatar: '', initials: 'NX' },
      timeAgo: { value: 5, unit: 'hours' as const },
      stats: { views: 531, comments: 8, likes: 42 },
    },
    {
      category: 'reviews',
      game: 'Valorant',
      title: t('community.mock_posts.post3.title'),
      preview: t('community.mock_posts.post3.preview'),
      author: { name: 'StarPlayer_KR', avatar: '', initials: 'SP' },
      timeAgo: { value: 1, unit: 'days' as const },
      stats: { views: 1203, comments: 21, likes: 89 },
    },
    {
      category: 'free',
      title: t('community.mock_posts.post4.title'),
      preview: t('community.mock_posts.post4.preview'),
      author: { name: 'GMS_Creator', avatar: '', initials: 'GM' },
      timeAgo: { value: 2, unit: 'days' as const },
      stats: { views: 4521, comments: 67, likes: 215 },
    },
    {
      category: 'tips',
      game: 'LoL',
      title: t('community.mock_posts.post5.title'),
      preview: t('community.mock_posts.post5.preview'),
      author: { name: 'JungleMain_KR', avatar: '', initials: 'JG' },
      timeAgo: { value: 3, unit: 'days' as const },
      stats: { views: 892, comments: 15, likes: 57 },
    },
  ];

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-6">
        {mockPosts.map((post, index) => (
          <PostItem key={index} {...post} />
        ))}
      </div>

      <div className="mt-16 mb-24">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationLink isActive>1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink>3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
