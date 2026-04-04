'use client';

import { InviteManagement } from './InviteManagement';
import { MatchHistory } from './MatchHistory';

export function HistoryAndInvitesSection() {
  return (
    <div className="flex flex-col gap-0 h-full">
      <InviteManagement />
      <MatchHistory />
    </div>
  );
}
