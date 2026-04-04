'use client';

import { StrategyNotes } from './StrategyNotes';
import { PracticeSchedule } from './PracticeSchedule';

export function StrategyAndScheduleSection() {
  return (
    <div className="flex flex-col gap-0 h-full">
      <StrategyNotes />
      <PracticeSchedule />
    </div>
  );
}
