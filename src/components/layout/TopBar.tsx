
import { Search } from 'lucide-react';
import { Page, ProfileTab } from '../../types';

interface TopBarProps {
    onNavigate: (page: Page, tab?: ProfileTab) => void;
}

export const TopBar = ({ onNavigate }: TopBarProps) => {
    return (
        <header className="fixed top-0 left-0 w-full h-16 bg-stone-50/80 backdrop-blur-md z-50 flex items-center justify-between px-8 border-b border-ink/5">
            {/* Left: Logo */}
            <div className="flex-1 flex justify-start">
                <button
                    onClick={() => onNavigate('landing')}
                    className="font-semibold text-lg tracking-tight text-ink hover:opacity-70 transition-opacity"
                >
                    Monolith
                </button>
            </div>

            {/* Center: Search */}
            <div className="flex-1 flex justify-center max-w-md mx-4">
                <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-ink/30">
                        <Search className="w-4 h-4" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search artifacts..."
                        className="w-full pl-9 pr-4 py-2 bg-white rounded-[4px] border border-ink/5 text-sm text-ink placeholder:text-ink/30 focus:outline-none focus:border-accent/50 focus:ring-1 focus:ring-accent/20 transition-all"
                    />
                </div>
            </div>

            {/* Right: Profile & Stats */}
            <div className="flex-1 flex justify-end items-center gap-6">

                {/* Artifacts Counter */}
                <button
                    onClick={() => onNavigate('profile', 'billing')}
                    className="text-xs font-medium text-ink/40 hover:text-accent transition-colors"
                    title="Artifacts created today"
                >
                    0/100
                </button>

                {/* Profile Avatar */}
                <div
                    onClick={() => onNavigate('profile', 'collection')}
                    className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold tracking-wider cursor-pointer hover:bg-ink/5 transition-colors text-[#1D1D1F] border border-[#1D1D1F]"
                >
                    JB
                </div>
            </div>
        </header>
    );
};
