import { Metadata } from 'next';
import { Navbar } from '@/components/landing/Navbar';
import { Footer } from '@/components/landing/Footer';
import { TemporalTeamDistribution } from '@/components/playground/team/distribution/TemporalTeamDistribution';

export const metadata: Metadata = {
  title: 'Temporal Team Allocation | GAMERS',
  description: 'AI-powered fair team allocation for League of Legends.',
};

export default function TemporalTeamPage() {
  return (
    <div className="flex min-h-screen flex-col bg-deep-black">
      <Navbar />
      <main className="flex-1 mt-20">
        <section className="relative py-12 overflow-hidden">
          {/* Decorative background elements */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1440px] h-[500px] pointer-events-none">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[60%] bg-neon-mint/5 rounded-full blur-[120px]" />
            <div className="absolute top-[20%] right-[-10%] w-[40%] h-[60%] bg-ruby/5 rounded-full blur-[120px]" />
          </div>

          <div className="relative z-10">
            <TemporalTeamDistribution />
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
