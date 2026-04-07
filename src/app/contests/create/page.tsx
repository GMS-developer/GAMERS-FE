import { ContestCreateContent } from '@/components/contest/create/ContestCreateContent';
import { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';

export const metadata: Metadata = {
  title: '새 대회 만들기 | GAMERS',
  description: 'GAMERS에서 나만의 게임 대회를 개최하세요.',
};

export default function ContestCreatePage() {
  return (
    <div className="flex min-h-screen flex-col bg-[#0C0C0F]">
      <Navbar />
      <main className="flex-1">
        <ContestCreateContent />
      </main>
      <Footer />
    </div>
  );
}
