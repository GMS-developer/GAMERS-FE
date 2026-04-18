'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Eraser, UserSearch, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '@/lib/utils';

interface NicknameParsingPanelProps {
  onParse: (nicknames: string[]) => void;
  className?: string;
}

export function NicknameParsingPanel({ onParse, className }: NicknameParsingPanelProps) {
  const { t } = useTranslation();
  const [inputText, setInputText] = useState('');
  const [parsedList, setParsedList] = useState<string[]>([]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleParse = () => {
    if (!inputText.trim()) return;

    // Regex to match:
    // 1. Nickname#TAG (LoL/Valorant style)
    // 2. Just Nicknames (separated by newlines or commas)
    // 3. Chat log lines like "Nickname: message" or "Nickname joined..."
    
    // Simple but effective: split by common delimiters and filter
    const lines = inputText.split(/[\n,]/);
    const names = lines
      .map(line => {
        // 1. Check for Riot ID pattern (Name#Tag)
        const riotIdMatch = line.match(/([^\s#]+#[^\s:]+)/);
        if (riotIdMatch) return riotIdMatch[1].trim();

        // 2. Extract from "Name: message"
        const colonMatch = line.match(/^([^:]+):/);
        if (colonMatch) return colonMatch[1].trim();
        
        // 3. Extract from "Name joined/entered"
        const regexJoined = t('playground.team_distribution.parsing.regex_joined');
        const joinMatch = line.match(new RegExp(`^([^\\s]+)\\s+(${regexJoined}|joined|entered)`, 'i'));
        if (joinMatch) return joinMatch[1].trim();

        return line.trim();
      })
      .filter(name => name.length > 0 && name.length < 32)
      .slice(0, 10); // Limit to 10 for LoL 5v5 context

    setParsedList(names);
    onParse(names);
    
    if (names.length > 0) {
      setIsSuccess(true);
      setTimeout(() => setIsSuccess(false), 2000);
    }
  };

  const handleClear = () => {
    setInputText('');
    setParsedList([]);
    onParse([]);
  };

  return (
    <div className={cn("flex flex-col gap-6", className)}>
      <div className="flex flex-col gap-1.5 px-1">
        <h3 className="text-[20px] font-black text-[#EEEEF0] tracking-tight flex items-center gap-3">
          <div className="p-2 rounded-xl bg-neon-mint/10">
            <UserSearch className="h-5 w-5 text-neon-mint" />
          </div>
          {t('playground.team_distribution.parsing.title')}
        </h3>
        <p className="text-[14px] font-medium text-[#5A5A65]">
           {t('playground.team_distribution.parsing.parsed_count', { count: parsedList.length })}
        </p>
      </div>

      <div className="relative overflow-hidden rounded-[32px] bg-[#0C0C0D] border border-white/5 p-2 transition-all focus-within:border-neon-mint/30 focus-within:ring-4 focus-within:ring-neon-mint/5 group">
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder={t('playground.team_distribution.parsing.placeholder')}
          className="w-full h-40 bg-transparent rounded-2xl p-6 text-[15px] font-medium text-[#EEEEF0] placeholder:text-[#3A3A45] focus:outline-none transition-all resize-none leading-relaxed"
        />
        
        <div className="absolute bottom-4 right-4 flex items-center gap-3">
          <button
            onClick={handleClear}
            className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 text-[#5A5A65] hover:text-[#EEEEF0] hover:bg-white/10 transition-all active:scale-95"
            title={t('playground.team_distribution.parsing.clear_button')}
          >
            <Eraser className="h-5 w-5" />
          </button>
          <button
            onClick={handleParse}
            disabled={!inputText.trim()}
            className={cn(
              "flex items-center gap-3 px-8 h-12 rounded-2xl text-[14px] font-black transition-all active:scale-95 shadow-lg",
              isSuccess 
                ? "bg-neon-mint text-black" 
                : "bg-[#1A1A20] text-[#EEEEF0] border border-white/5 hover:bg-[#25252D] disabled:opacity-30 disabled:cursor-not-allowed"
            )}
          >
            {isSuccess ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>{t('playground.team_distribution.parsing.success')}</span>
              </>
            ) : (
              <>
                <Search className="h-4 w-4" />
                <span>{t('playground.team_distribution.parsing.parse_button')}</span>
              </>
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {parsedList.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="flex flex-wrap gap-2 p-4 rounded-2xl bg-white/[0.02] border border-white/5"
          >
            {parsedList.map((name, i) => (
              <motion.span
                key={`${name}-${i}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                className="px-3 py-1.5 rounded-lg bg-neon-mint/10 border border-neon-mint/20 text-neon-mint text-[11px] font-black"
              >
                {name}
              </motion.span>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
