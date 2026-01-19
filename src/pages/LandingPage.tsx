import React from 'react';
import { Page } from '../types';
import { TopBar } from '../components/layout/TopBar';

interface LandingPageProps {
    onNavigate: (page: Page) => void;
}

const LandingPage = ({ onNavigate }: LandingPageProps) => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center p-8 bg-stone-50 text-ink font-sans pt-24">

            <TopBar onNavigate={onNavigate} />

            {/* CONTENT AREA */}
            <div className="w-full max-w-4xl flex flex-col items-center justify-center min-h-[60vh] text-center animate-in fade-in duration-700">
                <h1 className="text-4xl font-semibold tracking-tight text-ink mb-6">
                    Welcome to Monolith.
                </h1>
                <p className="text-faded text-lg max-w-md mb-12">
                    A permanent body of work. Start by creating a new artifact or exploring the collection.
                </p>

                {/* Navigation to Create */}
                <button
                    onClick={() => onNavigate('create')}
                    className="px-8 py-3 bg-ink text-canvas rounded-[2px] font-medium text-sm tracking-wide hover:bg-ink/80 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
                >
                    Create Artifact
                </button>
            </div>

        </div>
    );
};

export default LandingPage;
