import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';

interface Tab {
  id: string;
  name: string;
}

const TABS: Tab[] = [
  { id: 'overview', name: '개요' },
  { id: 'bracket', name: '대진표' },
  { id: 'team', name: '팀 관리' },
  { id: 'members', name: '멤버 현황' },
  { id: 'notice', name: '안내사항' },
  { id: 'withdrawal', name: '대회 탈퇴' },
];

export function PlaygroundSubNav() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeTab = searchParams.get('tab') || 'overview';

  const handleTabChange = (tabId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', tabId);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav className="h-11 border-b border-white/5 bg-[#0C0C0D] px-6">
      <div className="mx-auto flex h-full max-w-[1440px] items-center gap-10">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={cn(
              "relative flex h-full items-center text-[13px] font-black transition-all",
              activeTab === tab.id ? "text-[#EEEEF0]" : "text-[#5A5A65] hover:text-[#7A7A85]"
            )}
          >
            {tab.name}
            {activeTab === tab.id && (
              <motion.div
                layoutId="playgroundTabUnderline"
                className="absolute bottom-0 left-0 right-0 h-[2px] bg-neon-mint"
              />
            )}
          </button>
        ))}
      </div>
    </nav>
  );
}
