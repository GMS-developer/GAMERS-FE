'use client';

import { PostItem } from './PostItem';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
} from '@/components/ui/pagination';

const mockPosts = [
  {
    category: 'tips',
    game: 'Valorant',
    isHot: true,
    title: '아이언~골드 빠르게 탈출하는 에임 루틴 공유합니다 (2시간/일)',
    preview: '매일 2시간씩 3개월 동안 골드 2에서 플래티넘 1까지 올라간 방법을 공유합니다. 에임랩 루틴, 데스매치 활용법 등 실제 경험담과 매뉴얼을 포함하고 있습니다.',
    author: { name: 'GamingKing_KR', avatar: '', initials: 'GK' },
    timeAgo: { value: 2, unit: 'hours' as const },
    stats: { views: 2847, comments: 34, likes: 128 },
  },
  {
    category: 'recruiting',
    game: 'LoL',
    status: 'recruiting',
    title: '[팀원 모집] 5vs5 리그 대회 참가할 팀원 구합니다 — 골드 이상',
    preview: '포지션: 정글, 서폿 · 조건: 솔로랭크 골드 이상 · 활동: 주 3회 이상 가능하신 분. 현재 미드, 원딜, 탑은 확정이며 팀워크 위주로 즐겁게 하실 분 찾습니다.',
    author: { name: 'NexusGG', avatar: '', initials: 'NX' },
    timeAgo: { value: 5, unit: 'hours' as const },
    stats: { views: 531, comments: 8, likes: 42 },
  },
  {
    category: 'reviews',
    game: 'Valorant',
    title: '발로란트 신인 오픈컵 S3 참가 후기 — 첫 대회 4강까지 진출했습니다!',
    preview: '처음 GAMERS에서 대회를 찾아서 참가했는데 생각보다 운영이 정말 잘 되어있어서 깜짝 놀랐습니다. 브라켓 자동화가 정말 편하더라고요.',
    author: { name: 'StarPlayer_KR', avatar: '', initials: 'SP' },
    timeAgo: { value: 1, unit: 'days' as const },
    stats: { views: 1203, comments: 21, likes: 89 },
  },
  {
    category: 'free',
    title: 'GAMERS 플랫폼 쓰면서 달라진 점 — 대회 관리가 이렇게 편할 줄은 몰랐네요',
    preview: '디스코드로만 관리하다가 GAMERS로 넘어온 지 두 달째입니다. 특히 자동 브라켓이랑 경기 결과 자동 감지 기능이 혁명적이네요. 주최자분들은 꼭 써보시길.',
    author: { name: 'GMS_Creator', avatar: '', initials: 'GM' },
    timeAgo: { value: 2, unit: 'days' as const },
    stats: { views: 4521, comments: 67, likes: 215 },
  },
  {
    category: 'tips',
    game: 'LoL',
    title: '정글 초반 동선 정리 — 시즌 시작 전 꼭 알아야 할 챔피언 5개',
    preview: '그라가스, 비에고, 헤카림 위주로 초반 인베 동선과 갱 타이밍을 공유합니다. 시즌 초반 빠르게 랭크 안정화하고 싶으시면 꼭 정독해주세요.',
    author: { name: 'JungleMain_KR', avatar: '', initials: 'JG' },
    timeAgo: { value: 3, unit: 'days' as const },
    stats: { views: 892, comments: 15, likes: 57 },
  },
];

export function PostList() {
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
