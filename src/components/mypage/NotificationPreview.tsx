'use client';

import { useTranslation } from 'react-i18next';
import { Bell, Trophy, UserPlus, Info, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

export function NotificationPreview() {
  const { t } = useTranslation();

  const notifications = [
    {
      id: 1,
      type: 'contest',
      title: '참가하신 [발로란트 오픈컵] 대진표가 확정되었습니다.',
      time: '2 hours ago',
      icon: <Trophy className="w-4 h-4 text-neon-mint" />,
      tag: 'CONTEST'
    },
    {
      id: 2,
      type: 'team',
      title: 'Team Alpha 에서 새로운 멤버 가입 신청이 왔습니다.',
      time: '5 hours ago',
      icon: <UserPlus className="w-4 h-4 text-sky-400" />,
      tag: 'TEAM'
    },
    {
      id: 3,
      type: 'system',
      title: 'GAMERS 플랫폼 업데이트: 개인 프로필 설정 기능이 강화되었습니다.',
      time: '1 day ago',
      icon: <Info className="w-4 h-4 text-purple-400" />,
      tag: 'SYSTEM'
    }
  ];

  return (
    <section className="max-w-[1280px] mx-auto px-6 py-6 pb-24">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
           <Bell className="w-5 h-5 text-white/40" />
           <h3 className="text-[13px] font-black text-[#BBBBCB] uppercase tracking-[0.2em]">
             {t('mypage.notifications.title', '최근 알림')}
           </h3>
        </div>
        
        <button className="text-[12px] font-black text-neon-mint/60 hover:text-neon-mint transition-colors flex items-center gap-1.5 uppercase tracking-wider">
           {t('mypage.notifications.view_all', '전체 보기')}
           <ExternalLink className="w-3.5 h-3.5" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {notifications.map((notif, index) => (
          <motion.div
            key={notif.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex items-center gap-5 p-5 rounded-[20px] bg-[#141418] border border-white/5 hover:border-white/10 hover:bg-[#1C1C21] transition-all cursor-pointer overflow-hidden group"
          >
            <div className="relative">
               <div className="w-10 h-10 rounded-xl bg-[#0C0C0F] flex items-center justify-center border border-white/5 relative z-10">
                  {notif.icon}
               </div>
               <div className="absolute inset-0 bg-white/5 blur-[10px] transform scale-150 rotate-45 group-hover:bg-white/10 transition-colors" />
            </div>

            <div className="flex-1 flex flex-col gap-0.5">
               <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[9px] font-black tracking-widest text-[#4A4A55] uppercase border border-white/10 px-1.5 py-0.5 rounded">
                     {notif.tag}
                  </span>
                  <span className="text-[11px] font-bold text-[#4A4A55]">{notif.time}</span>
               </div>
               <p className="text-[14px] font-black text-[#EEEEF0] leading-snug line-clamp-1 group-hover:text-neon-mint transition-colors">
                  {notif.title}
               </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
