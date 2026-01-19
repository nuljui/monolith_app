
import { Page } from '../types';
import { TopBar } from '../components/layout/TopBar';

import yourMonolithImg from '../assets/landing/yourmonolith.png';

interface LandingPageProps {
    onNavigate: (page: Page) => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center bg-stone-50 text-ink font-sans pt-24 overflow-x-hidden relative">

            <TopBar onNavigate={onNavigate} />

            <div className="w-full max-w-6xl z-10 flex flex-col items-center justify-center text-center px-6 mt-12 md:mt-20">

                {/* HERO SECTION */}
                <div className="flex flex-col items-center gap-6 mb-16 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <h1 className="text-6xl md:text-8xl tracking-tight text-ink font-bold">
                        Monolith
                    </h1>
                    <p className="text-xl md:text-2xl text-ink font-light tracking-wide opacity-90">
                        Your work. Your mark. Forever.
                    </p>
                </div>

                {/* VISUAL CENTERPIECE */}
                <div className="relative w-full max-w-4xl flex justify-center mb-16">
                    <div className="relative w-full max-w-[600px] aspect-square md:aspect-[16/9] flex items-center justify-center">
                        {/* Displaying 'yourmonolith' as the hero aesthetic image */}
                        <img
                            src={yourMonolithImg}
                            alt="Monolith Collection"
                            className="w-full h-full object-contain drop-shadow-2xl opacity-100 transform hover:scale-105 transition-transform duration-1000 ease-in-out"
                        />
                    </div>
                </div>

                {/* TEXT CONTENT */}
                <div className="max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-300">
                    <p className="text-2xl md:text-3xl text-ink leading-relaxed">
                        Create your Monolith.
                    </p>
                    <p className="text-lg text-faded uppercase tracking-widest font-medium">
                        What you want the world to know about your work, no matter where it ends up.
                    </p>
                </div>

                {/* CTA */}
                <div className="mt-16 mb-24 animate-in fade-in duration-1000 delay-500">
                    <button
                        onClick={() => onNavigate('create')}
                        className="px-12 py-4 bg-accent text-white rounded-full font-bold text-lg tracking-wide hover:bg-accent/80 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 transform active:scale-95"
                    >
                        Start Creating
                    </button>
                </div>

            </div>

            {/* Optional: Subtle background texture/grain could go here if needed */}
        </div>
    );
};

export default LandingPage;
