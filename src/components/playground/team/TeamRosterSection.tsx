'use client';

import { TeamProfileCard } from './TeamProfileCard';
import { MemberRosterList } from './MemberRosterList';

export function TeamRosterSection() {
  return (
    <div className="flex flex-col gap-0 h-full"> 
      <TeamProfileCard />
      <MemberRosterList />
    </div>
  );
}
