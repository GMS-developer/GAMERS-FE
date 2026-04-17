'use client';

import { useEffect, useRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDiscordCallback } from '@/hooks/use-auth';
import { Loader2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function DiscordCallbackPage() {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const router = useRouter();
  const { mutate, isPending, isError } = useDiscordCallback();
  const called = useRef(false);

  useEffect(() => {
    const code = searchParams.get('code');
    const state = searchParams.get('state') || undefined;

    if (code && !called.current) {
      called.current = true;
      mutate({ code, state });
    } else if (!code && !isPending) {
      // If no code, something is wrong, redirect to login
      router.push('/login');
    }
  }, [searchParams, mutate, router, isPending]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#0C0C0F] text-[#EEEEF0]">
      <div className="flex flex-col items-center gap-6">
        {isError ? (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-500 mb-2">
              {t('auth.login.error.title', 'Authentication Failed')}
            </h1>
            <p className="text-[#7A7A85]">
              {t('auth.login.error.message', 'There was an error during Discord authentication.')}
            </p>
            <button
              onClick={() => router.push('/login')}
              className="mt-6 rounded-lg bg-neon-mint px-6 py-2 font-bold text-deep-black shadow-lg shadow-neon-mint/20 hover:bg-neon-mint/90 transition-all"
            >
              {t('auth.login.back_to_login', 'Back to Login')}
            </button>
          </div>
        ) : (
          <>
            <Loader2 className="h-12 w-12 animate-spin text-neon-mint" />
            <div className="text-center">
              <h1 className="text-xl font-bold italic tracking-tight italic">
                {t('auth.login.processing', 'PROCESSING AUTHENTICATION...')}
              </h1>
              <p className="text-[#7A7A85] mt-1">
                {t('auth.login.almost_there', 'Almost there! Connecting to Discord...')}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
