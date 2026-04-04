'use client';

import { motion } from 'framer-motion';
import { Megaphone, GraduationCap, Calendar, HelpCircle, CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTranslation } from 'react-i18next';

// --- Data ---
const NOTICES = [
  {
    id: 1,
    title: '오늘 21:00 준결승 경기 안내',
    content: '경기 10분 전까지 게임 내 접속 완료 필수. 지각 시 몰수패 처리될 수 있습니다.',
    date: '2026.03.28',
    host: 'Antigravity',
  },
  {
    id: 2,
    title: '결승 진출 시 트로피 및 포인트 보상 안내',
    content: '결승 진출팀에게는 골드 트로피와 5,000 포인트가 지급됩니다. 우승팀은 추가로 10,000 포인트.',
    date: '2026.03.27',
    host: 'Antigravity',
  },
  {
    id: 3,
    title: '대회 중 비매너 행위 제재 안내',
    content: '욕설, 고의 트롤 등 비매너 행위 적발 시 즉시 실격 처리됩니다. 페어플레이를 부탁드립니다.',
    date: '2026.03.26',
    host: 'Antigravity',
  },
];

const RULES = [
  '경기는 VALORANT 공식 커스텀 서버에서 진행되며, 호스트가 초대 링크를 발송합니다.',
  '경기 방식은 단판제이며, 준결승 및 결승은 3판 2선승제로 진행됩니다.',
  '맵 선택은 랜덤으로 이루어지며, 조별 예선은 지정 맵, 본선 이후는 밴픽 방식으로 진행됩니다.',
  '경기 시작 시간 5분 이내에 팀원이 입장하지 않을 경우 자동 몰수패 처리됩니다.',
  '해킹, 버그 악용 등 부정행위 사용 시 즉시 실격 처리하며 향후 대회 참가를 제한합니다.',
];

const SCHEDULE = [
  {
    id: 1,
    title: '조별 예선 — 완료',
    time: '03.26 ~ 03.27',
    desc: 'Bind, Haven, Ascent',
    status: 'completed',
  },
  {
    id: 2,
    title: '8강 — 완료',
    time: '03.28 20:00',
    desc: 'vs Team Beta · 13:7 승',
    status: 'completed',
  },
  {
    id: 3,
    title: '준결승 — 오늘',
    time: '03.28 21:00',
    desc: 'vs Team Delta',
    status: 'active',
    badge: 'D-DAY',
  },
  {
    id: 4,
    title: '결승 — 미정',
    time: '03.29 예정',
    desc: '상대팀 미정',
    status: 'pending',
  },
];

const FAQS = [
  {
    q: '경기 중 팀원이 연결이 끊어지면 어떻게 되나요?',
    a: '재접속 시도 후 5분 이내 복귀가 불가능한 경우, 해당 팀의 선택에 따라 4vs5 또는 몰수패를 선택할 수 있습니다.',
  },
  {
    q: '대회 도중 멤버 교체가 가능한가요?',
    a: '조별 예선 종료 후에는 멤버 교체가 불가합니다. 교체가 필요한 경우 호스트에게 사전 문의 바랍니다.',
  },
  {
    q: '결과 오류 시 이의 제기 방법은?',
    a: '경기 종료 후 30분 이내에 호스트에게 스크린샷과 함께 이의 제기 메시지를 보내주세요. 이후 제기는 처리되지 않습니다.',
  },
];

// --- Sub-components ---

function SectionHeader({ title, icon: Icon, extra }: { title: string; icon: any; extra?: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-6">
      <div className="flex items-center gap-2">
        <div className="w-1 h-4 bg-neon-mint rounded-full" />
        <Icon className="w-4 h-4 text-neon-mint" />
        <h2 className="text-[15px] font-black tracking-tight text-[#EEEEF0]">{title}</h2>
      </div>
      {extra}
    </div>
  );
}

function NoticeCard({ notice }: { notice: typeof NOTICES[0] }) {
  const { t } = useTranslation();
  return (
    <div className="flex flex-col gap-2 p-5 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/[0.1] transition-all group">
      <h3 className="text-[14px] font-bold text-[#EEEEF0] group-hover:text-neon-mint transition-colors tracking-tight">
        {notice.title}
      </h3>
      <p className="text-[13px] leading-relaxed text-[#5A5A65] line-clamp-2">
        {notice.content}
      </p>
      <div className="flex items-center gap-2 mt-1 text-[11px] font-medium text-[#3A3A45]">
        <span>{notice.date}</span>
        <span className="w-0.5 h-0.5 rounded-full bg-[#3A3A45]" />
        <span>호스트: {notice.host}</span>
      </div>
    </div>
  );
}

function RuleItem({ rule, index }: { rule: string; index: number }) {
  return (
    <div className="flex gap-4 p-4 rounded-xl hover:bg-white/[0.02] transition-colors group">
      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-neon-mint flex items-center justify-center text-deep-black text-[11px] font-black group-hover:scale-110 transition-transform">
        {index + 1}
      </div>
      <p className="text-[13px] leading-relaxed text-[#5A5A65] group-hover:text-[#8A8A95] transition-colors">
        {rule}
      </p>
    </div>
  );
}

function ScheduleItem({ item, isLast }: { item: typeof SCHEDULE[0]; isLast: boolean }) {
  const { t } = useTranslation();
  return (
    <div className="flex gap-4 relative pb-8 group last:pb-0">
      {!isLast && (
        <div className="absolute left-[7px] top-[14px] bottom-0 w-px bg-white/[0.05]" />
      )}
      <div className={cn(
        "relative z-10 flex-shrink-0 w-3.5 h-3.5 rounded-full border-2 mt-1 transition-all",
        item.status === 'completed' && "bg-neon-mint border-neon-mint",
        item.status === 'active' && "bg-[#FFB800] border-[#FFB800] shadow-[0_0_10px_rgba(255,184,0,0.4)]",
        item.status === 'pending' && "bg-transparent border-[#3A3A45]"
      )} />
      <div className="flex flex-col gap-1">
        <div className="flex items-center gap-2">
          <span className={cn(
            "text-[14px] font-black tracking-tight",
            item.status === 'pending' ? "text-[#5A5A65]" : "text-[#EEEEF0]"
          )}>
            {item.title}
          </span>
          {item.badge && (
            <span className="px-1.5 py-0.5 rounded-sm bg-[#FFB800] text-deep-black text-[9px] font-black">
              {item.badge}
            </span>
          )}
        </div>
        <p className="text-[12px] font-medium text-[#5A5A65]">
          {item.time} {item.desc && `· ${item.desc}`}
        </p>
      </div>
    </div>
  );
}

// --- Main Component ---

export function PlaygroundNotice() {
  const { t } = useTranslation();

  return (
    <main className="flex-1 bg-[#09090B] p-8 overflow-y-auto">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-10">
        
        {/* Top Section: Notices, Rules, Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Notices (4 Columns) */}
          <motion.section 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader 
              title={t('playground.notice.title')} 
              icon={Megaphone} 
              extra={
                <div className="px-2 py-0.5 rounded-md bg-white/[0.05] border border-white/[0.1] text-[#FFB800] text-[11px] font-bold">
                  {t('playground.notice.notice_count', { count: NOTICES.length })}
                </div>
              }
            />
            <div className="flex flex-col gap-4">
              {NOTICES.map((n) => (
                <NoticeCard key={n.id} notice={n} />
              ))}
            </div>
          </motion.section>

          {/* Middle: Rules (4 Columns) */}
          <motion.section 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <SectionHeader title={t('playground.notice.rules_title')} icon={GraduationCap} />
            <div className="flex flex-col rounded-2xl bg-white/[0.02] border border-white/[0.05] overflow-hidden">
              {RULES.map((rule, idx) => (
                <RuleItem key={idx} rule={rule} index={idx} />
              ))}
            </div>
          </motion.section>

          {/* Right: Schedule (4 Columns) */}
          <motion.section 
            className="lg:col-span-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <SectionHeader title={t('playground.notice.schedule_title')} icon={Calendar} />
            <div className="p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05]">
              {SCHEDULE.map((item, idx) => (
                <ScheduleItem key={item.id} item={item} isLast={idx === SCHEDULE.length - 1} />
              ))}
            </div>
          </motion.section>

        </div>

        {/* Bottom Section: FAQ */}
        <motion.section
          className="p-10 rounded-2xl bg-white/[0.02] border border-white/[0.05]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SectionHeader title={t('playground.notice.faq_title')} icon={HelpCircle} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {FAQS.map((faq, idx) => (
              <div key={idx} className="flex flex-col gap-4 group">
                <div className="flex items-start gap-2">
                  <span className="text-neon-mint font-black text-[14px]">Q.</span>
                  <h4 className="text-[14px] font-bold text-[#EEEEF0] group-hover:text-neon-mint transition-colors tracking-tight">
                    {faq.q}
                  </h4>
                </div>
                <div className="flex items-start gap-2">
                  <span className="opacity-0 font-black text-[14px]">Q.</span>
                  <p className="text-[13px] leading-relaxed text-[#5A5A65]">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.section>

      </div>
    </main>
  );
}
